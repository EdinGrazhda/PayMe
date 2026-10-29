<?php

namespace App\Http\Resources;

use App\Models\InvoiceReminder;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/** @mixin InvoiceReminder */
class ReminderResource extends JsonResource
{
    /** @return array<string, mixed> */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'sequence' => $this->sequence,
            'tone' => $this->tone,
            'status' => $this->status,
            'scheduled_at' => $this->scheduled_at->toIso8601String(),
            'sent_at' => $this->sent_at?->toIso8601String(),
            'invoice' => $this->whenLoaded('invoice', fn () => [
                'id' => $this->invoice->id,
                'number' => $this->invoice->invoice_number,
                'currency' => $this->invoice->currency,
                'balance_due_minor' => (int) $this->invoice->balance_due_minor,
                'client' => $this->invoice->relationLoaded('client') ? $this->invoice->client->name : null,
            ]),
        ];
    }
}
