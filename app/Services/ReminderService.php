<?php

namespace App\Services;

use App\Models\Invoice;
use App\Models\InvoiceReminder;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;

class ReminderService
{
    public function setEnabled(Invoice $invoice, User $actor, bool $enabled): Invoice
    {
        return DB::transaction(function () use ($invoice, $actor, $enabled): Invoice {
            $invoice = Invoice::query()->with('client')->lockForUpdate()->findOrFail($invoice->id);

            if ($invoice->status !== 'sent') {
                throw ValidationException::withMessages(['invoice' => 'Reminders are available only for sent invoices.']);
            }

            if ($enabled && blank($invoice->client->email)) {
                throw ValidationException::withMessages(['client' => 'Add a client email address before enabling reminders.']);
            }

            $invoice->update(['reminders_enabled' => $enabled]);

            if ($enabled) {
                $rules = $invoice->business->reminderRules()->where('enabled', true)->orderBy('position')->get();

                foreach ($rules as $rule) {
                    $scheduledAt = $invoice->due_date->copy()->addDays($rule->days_after_due)->setTime(9, 0);

                    if ($scheduledAt->lessThanOrEqualTo(now())) {
                        continue;
                    }

                    $reminder = $invoice->reminders()->where('sequence', $rule->position)->first();

                    if ($reminder !== null && in_array($reminder->status, ['sent', 'sending'], true)) {
                        continue;
                    }

                    $attributes = [
                        'business_id' => $invoice->business_id,
                        'reminder_rule_id' => $rule->id,
                        'tone' => $rule->tone,
                        'status' => 'scheduled',
                        'scheduled_at' => $scheduledAt,
                        'queued_at' => null,
                        'failed_at' => null,
                        'cancelled_at' => null,
                        'failure_reason' => null,
                    ];

                    if ($reminder === null) {
                        $invoice->reminders()->create(['sequence' => $rule->position, ...$attributes]);
                    } else {
                        $reminder->update($attributes);
                    }
                }
            } else {
                $invoice->reminders()->whereIn('status', ['scheduled', 'queued'])->update([
                    'status' => 'cancelled', 'cancelled_at' => now(),
                ]);
            }

            $invoice->events()->create([
                'business_id' => $invoice->business_id,
                'actor_user_id' => $actor->id,
                'type' => $enabled ? 'reminders_enabled' : 'reminders_paused',
                'occurred_at' => now(),
            ]);

            return $invoice->load('reminders');
        }, 3);
    }

    public function skip(InvoiceReminder $reminder, User $actor): InvoiceReminder
    {
        return DB::transaction(function () use ($reminder, $actor): InvoiceReminder {
            $invoice = Invoice::query()->lockForUpdate()->findOrFail($reminder->invoice_id);
            $reminder = InvoiceReminder::query()->lockForUpdate()->findOrFail($reminder->id);

            if (! in_array($reminder->status, ['scheduled', 'queued'], true)) {
                throw ValidationException::withMessages(['reminder' => 'This reminder can no longer be skipped.']);
            }

            $reminder->update(['status' => 'cancelled', 'cancelled_at' => now()]);
            $invoice->events()->create([
                'business_id' => $invoice->business_id,
                'actor_user_id' => $actor->id,
                'type' => 'reminder_skipped',
                'metadata' => ['reminder_id' => $reminder->id],
                'occurred_at' => now(),
            ]);

            return $reminder;
        }, 3);
    }
}
