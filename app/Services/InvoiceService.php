<?php

namespace App\Services;

use App\Models\Business;
use App\Models\Invoice;
use App\Models\User;
use App\Support\Money;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;

class InvoiceService
{
    /** @param array<string, mixed> $data */
    public function create(Business $business, User $actor, array $data): Invoice
    {
        return DB::transaction(function () use ($business, $actor, $data): Invoice {
            $client = isset($data['client_id'])
                ? $business->clients()->findOrFail((int) $data['client_id'])
                : $business->clients()->create(['name' => $data['client_name']]);

            $amount = Money::toMinor($data['amount'], $business->currency);
            $invoice = $business->invoices()->create([
                'client_id' => $client->id,
                'invoice_number' => $data['invoice_number'],
                'public_token' => (string) Str::uuid(),
                'currency' => $business->currency,
                'status' => 'draft',
                'subtotal_minor' => $amount,
                'total_minor' => $amount,
                'balance_due_minor' => $amount,
                'issue_date' => $data['issue_date'] ?? now()->toDateString(),
                'due_date' => $data['due_date'],
                'reminders_enabled' => false,
            ]);

            $invoice->items()->create([
                'position' => 1,
                'description' => $data['description'] ?? 'Services',
                'quantity' => '1.000',
                'unit_price_minor' => $amount,
                'subtotal_minor' => $amount,
                'total_minor' => $amount,
            ]);

            $invoice->events()->create([
                'business_id' => $business->id,
                'actor_user_id' => $actor->id,
                'type' => 'created',
                'occurred_at' => now(),
            ]);

            return $invoice->load('client');
        }, 3);
    }

    public function markSent(Invoice $invoice, User $actor): Invoice
    {
        return DB::transaction(function () use ($invoice, $actor): Invoice {
            $invoice = Invoice::query()->lockForUpdate()->findOrFail($invoice->id);

            if ($invoice->status !== 'draft') {
                throw ValidationException::withMessages(['invoice' => 'Only a draft can be marked as sent.']);
            }

            $invoice->update(['status' => 'sent', 'sent_at' => now()]);
            $invoice->events()->create([
                'business_id' => $invoice->business_id,
                'actor_user_id' => $actor->id,
                'type' => 'marked_sent',
                'occurred_at' => now(),
            ]);

            return $invoice;
        }, 3);
    }
}
