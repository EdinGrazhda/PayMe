<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('businesses', function (Blueprint $table): void {
            $table->id();
            $table->foreignId('owner_user_id')->unique()->constrained('users')->restrictOnDelete();
            $table->string('name');
            $table->char('currency', 3)->default('EUR');
            $table->char('country', 2)->nullable();
            $table->string('email')->nullable();
            $table->string('phone', 40)->nullable();
            $table->string('website')->nullable();
            $table->text('address')->nullable();
            $table->string('tax_number', 80)->nullable();
            $table->string('invoice_prefix', 20)->default('INV');
            $table->unsignedSmallInteger('default_payment_terms_days')->default(30);
            $table->timestamps();
        });

        Schema::create('business_user', function (Blueprint $table): void {
            $table->foreignId('business_id')->constrained()->cascadeOnDelete();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->string('role', 20)->default('owner');
            $table->timestamps();
            $table->primary(['business_id', 'user_id']);
            $table->index(['user_id', 'business_id']);
        });

        Schema::create('clients', function (Blueprint $table): void {
            $table->id();
            $table->foreignId('business_id')->constrained()->cascadeOnDelete();
            $table->string('name');
            $table->string('company')->nullable();
            $table->string('email')->nullable();
            $table->string('phone', 40)->nullable();
            $table->text('address')->nullable();
            $table->char('country', 2)->nullable();
            $table->char('currency', 3)->nullable();
            $table->text('notes')->nullable();
            $table->timestamps();
            $table->index(['business_id', 'name']);
            $table->index(['business_id', 'email']);
        });

        Schema::create('invoices', function (Blueprint $table): void {
            $table->id();
            $table->foreignId('business_id')->constrained()->cascadeOnDelete();
            $table->foreignId('client_id')->constrained()->restrictOnDelete();
            $table->string('invoice_number', 80);
            $table->uuid('public_token')->unique();
            $table->char('currency', 3);
            $table->string('status', 20)->default('draft');
            $table->unsignedBigInteger('subtotal_minor')->default(0);
            $table->unsignedBigInteger('tax_minor')->default(0);
            $table->unsignedBigInteger('discount_minor')->default(0);
            $table->unsignedBigInteger('total_minor')->default(0);
            $table->unsignedBigInteger('amount_paid_minor')->default(0);
            $table->unsignedBigInteger('balance_due_minor')->default(0);
            $table->date('issue_date');
            $table->date('due_date');
            $table->text('notes')->nullable();
            $table->text('payment_instructions')->nullable();
            $table->text('terms')->nullable();
            $table->boolean('reminders_enabled')->default(true);
            $table->timestamp('sent_at')->nullable();
            $table->timestamp('viewed_at')->nullable();
            $table->timestamp('first_overdue_at')->nullable();
            $table->timestamp('first_reminder_sent_at')->nullable();
            $table->timestamp('paid_at')->nullable();
            $table->timestamps();
            $table->unique(['business_id', 'invoice_number']);
            $table->index(['business_id', 'status', 'due_date']);
            $table->index(['business_id', 'status', 'created_at']);
            $table->index(['business_id', 'id']);
            $table->index(['business_id', 'client_id', 'created_at']);
            $table->index(['business_id', 'paid_at']);
        });

        Schema::create('invoice_items', function (Blueprint $table): void {
            $table->id();
            $table->foreignId('invoice_id')->constrained()->cascadeOnDelete();
            $table->unsignedSmallInteger('position');
            $table->string('description');
            $table->decimal('quantity', 12, 3);
            $table->unsignedBigInteger('unit_price_minor');
            $table->unsignedInteger('tax_rate_basis_points')->default(0);
            $table->unsignedBigInteger('subtotal_minor');
            $table->unsignedBigInteger('tax_minor')->default(0);
            $table->unsignedBigInteger('total_minor');
            $table->timestamps();
            $table->unique(['invoice_id', 'position']);
        });

        Schema::create('payments', function (Blueprint $table): void {
            $table->id();
            $table->foreignId('business_id')->constrained()->cascadeOnDelete();
            $table->foreignId('invoice_id')->constrained()->restrictOnDelete();
            $table->unsignedBigInteger('amount_minor');
            $table->char('currency', 3);
            $table->string('method', 40)->default('manual');
            $table->string('provider', 40)->nullable();
            $table->string('provider_event_id', 190)->nullable();
            $table->string('idempotency_key', 190)->nullable();
            $table->text('note')->nullable();
            $table->timestamp('paid_at');
            $table->timestamps();
            $table->unique(['provider', 'provider_event_id']);
            $table->unique(['business_id', 'idempotency_key']);
            $table->index(['invoice_id', 'paid_at']);
            $table->index(['business_id', 'paid_at']);
        });

        Schema::create('reminder_rules', function (Blueprint $table): void {
            $table->id();
            $table->foreignId('business_id')->constrained()->cascadeOnDelete();
            $table->unsignedSmallInteger('position');
            $table->unsignedSmallInteger('days_after_due');
            $table->string('tone', 20);
            $table->boolean('enabled')->default(true);
            $table->timestamps();
            $table->unique(['business_id', 'position']);
        });

        Schema::create('invoice_reminders', function (Blueprint $table): void {
            $table->id();
            $table->foreignId('business_id')->constrained()->cascadeOnDelete();
            $table->foreignId('invoice_id')->constrained()->cascadeOnDelete();
            $table->foreignId('reminder_rule_id')->nullable()->constrained()->nullOnDelete();
            $table->unsignedSmallInteger('sequence');
            $table->string('tone', 20);
            $table->string('status', 20)->default('scheduled');
            $table->timestamp('scheduled_at');
            $table->timestamp('queued_at')->nullable();
            $table->timestamp('sent_at')->nullable();
            $table->timestamp('failed_at')->nullable();
            $table->timestamp('cancelled_at')->nullable();
            $table->text('failure_reason')->nullable();
            $table->timestamps();
            $table->unique(['invoice_id', 'sequence']);
            $table->index(['status', 'scheduled_at']);
            $table->index(['business_id', 'status', 'scheduled_at']);
        });

        Schema::create('invoice_events', function (Blueprint $table): void {
            $table->id();
            $table->foreignId('business_id')->constrained()->cascadeOnDelete();
            $table->foreignId('invoice_id')->constrained()->cascadeOnDelete();
            $table->foreignId('actor_user_id')->nullable()->constrained('users')->nullOnDelete();
            $table->string('type', 50);
            $table->json('metadata')->nullable();
            $table->timestamp('occurred_at');
            $table->index(['invoice_id', 'occurred_at']);
            $table->index(['business_id', 'type', 'occurred_at']);
        });

        Schema::create('uploaded_documents', function (Blueprint $table): void {
            $table->id();
            $table->foreignId('business_id')->constrained()->cascadeOnDelete();
            $table->foreignId('invoice_id')->nullable()->constrained()->nullOnDelete();
            $table->foreignId('uploaded_by_user_id')->nullable()->constrained('users')->nullOnDelete();
            $table->string('disk', 40);
            $table->string('path');
            $table->string('original_name');
            $table->string('mime_type', 100);
            $table->unsignedBigInteger('size_bytes');
            $table->string('status', 20)->default('awaiting_confirmation');
            $table->json('extracted_data')->nullable();
            $table->json('extraction_confidence')->nullable();
            $table->timestamps();
            $table->index(['business_id', 'status', 'created_at']);
            $table->index(['business_id', 'invoice_id']);
        });

        Schema::create('plans', function (Blueprint $table): void {
            $table->id();
            $table->string('code', 30)->unique();
            $table->string('name');
            $table->unsignedInteger('monthly_price_minor')->default(0);
            $table->char('currency', 3)->default('EUR');
            $table->unsignedInteger('monthly_invoice_limit')->nullable();
            $table->json('features')->nullable();
            $table->boolean('active')->default(true);
            $table->timestamps();
        });

        Schema::create('subscriptions', function (Blueprint $table): void {
            $table->id();
            $table->foreignId('business_id')->constrained()->cascadeOnDelete();
            $table->foreignId('plan_id')->constrained()->restrictOnDelete();
            $table->string('status', 20)->default('active');
            $table->string('provider', 40)->nullable();
            $table->string('provider_subscription_id', 190)->nullable()->unique();
            $table->timestamp('starts_at');
            $table->timestamp('ends_at')->nullable();
            $table->timestamps();
            $table->index(['business_id', 'status', 'ends_at']);
        });

        Schema::create('notifications', function (Blueprint $table): void {
            $table->uuid('id')->primary();
            $table->morphs('notifiable');
            $table->string('type');
            $table->text('data');
            $table->timestamp('read_at')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        foreach (['notifications', 'subscriptions', 'plans', 'uploaded_documents', 'invoice_events', 'invoice_reminders', 'reminder_rules', 'payments', 'invoice_items', 'invoices', 'clients', 'business_user', 'businesses'] as $table) {
            Schema::dropIfExists($table);
        }
    }
};
