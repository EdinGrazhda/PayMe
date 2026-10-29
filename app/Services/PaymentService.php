<?php

namespace App\Services;

use App\Models\Invoice;
use App\Models\Payment;
use App\Models\User;
use App\Support\Money;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;

class PaymentService
{
    /** @param array<string, mixed> $data */
    public function record(Invoice $invoice, User $actor, array $data): Payment
    {
        return DB::transaction(function () use ($invoice, $actor, $data): Payment {
            $invoice = Invoice::query()->lockForUpdate()->findOrFail($invoice->id);

            if (in_array($invoice->status, ['paid', 'cancelled'], true)) {
                throw ValidationException::withMessages(['invoice' => 'This invoice cannot accept another payment.']);
            }

            $amount = isset($data['amount'])
                ? Money::toMinor($data['amount'], $invoice->currency)
                : (int) $invoice->balance_due_minor;

            if ($amount <= 0 || $amount > $invoice->balance_due_minor) {
                throw ValidationException::withMessages(['amount' => 'The payment must be greater than zero and no more than the balance due.']);
            }

            $paidAt = $data['paid_at'] ?? now()->toDateString();
            $payment = $invoice->payments()->create([
                'business_id' => $invoice->business_id,
                'amount_minor' => $amount,
                'currency' => $invoice->currency,
                'method' => $data['method'] ?? 'manual',
                'note' => $data['note'] ?? null,
                'paid_at' => $paidAt,
            ]);

            $balance = (int) $invoice->balance_due_minor - $amount;
            $fullyPaid = $balance === 0;
            $invoice->update([
                'amount_paid_minor' => (int) $invoice->amount_paid_minor + $amount,
                'balance_due_minor' => $balance,
                'status' => $fullyPaid ? 'paid' : $invoice->status,
                'paid_at' => $fullyPaid ? $paidAt : null,
                'first_overdue_at' => $invoice->first_overdue_at ?? ($invoice->due_date->isBefore($paidAt) ? $invoice->due_date->addDay() : null),
                'reminders_enabled' => $fullyPaid ? false : $invoice->reminders_enabled,
            ]);

            if ($fullyPaid) {
                $invoice->reminders()->whereIn('status', ['scheduled', 'queued'])->update([
                    'status' => 'cancelled', 'cancelled_at' => now(),
                ]);
            }

            $invoice->events()->create([
                'business_id' => $invoice->business_id,
                'actor_user_id' => $actor->id,
                'type' => $fullyPaid ? 'paid' : 'payment_recorded',
                'metadata' => ['amount_minor' => $amount, 'payment_id' => $payment->id],
                'occurred_at' => now(),
            ]);

            return $payment;
        }, 3);
    }
}
