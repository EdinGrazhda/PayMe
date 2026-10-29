<?php

namespace App\Http\Resources;

use App\Models\Invoice;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/** @mixin Invoice */
class InvoiceResource extends JsonResource
{
    /** @return array<string, mixed> */
    public function toArray(Request $request): array
    {
        $today = now()->startOfDay();
        $status = $this->status;

        if ($status === 'sent' && $this->due_date->isBefore($today)) {
            $status = 'overdue';
        } elseif ($status === 'sent' && $this->due_date->lessThanOrEqualTo($today->copy()->addDays(7))) {
            $status = 'due_soon';
        }

        return [
            'id' => $this->id,
            'number' => $this->invoice_number,
            'client' => $this->whenLoaded('client', fn () => new ClientResource($this->client)),
            'description' => $this->whenLoaded('items', fn () => $this->items->first()?->description),
            'currency' => $this->currency,
            'total_minor' => (int) $this->total_minor,
            'balance_due_minor' => (int) $this->balance_due_minor,
            'status' => $status,
            'issue_date' => $this->issue_date->toDateString(),
            'due_date' => $this->due_date->toDateString(),
            'sent_at' => $this->sent_at?->toIso8601String(),
            'paid_at' => $this->paid_at?->toIso8601String(),
            'next_reminder_at' => $this->whenLoaded('reminders', fn () => $this->reminders->first()?->scheduled_at?->toIso8601String()),
            'items' => $this->whenLoaded('items', fn () => $this->items->map(fn ($item) => [
                'description' => $item->description,
                'quantity' => $item->quantity,
                'unit_price_minor' => (int) $item->unit_price_minor,
                'total_minor' => (int) $item->total_minor,
            ])->values()),
            'payments' => $this->whenLoaded('payments', fn () => $this->payments->map(fn ($payment) => [
                'amount_minor' => (int) $payment->amount_minor,
                'method' => $payment->method,
                'paid_at' => $payment->paid_at->toIso8601String(),
            ])->values()),
            'events' => $this->whenLoaded('events', fn () => $this->events->map(fn ($event) => [
                'type' => $event->type,
                'occurred_at' => $event->occurred_at->toIso8601String(),
            ])->values()),
        ];
    }
}
