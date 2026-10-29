<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Carbon;

/** @property Carbon $scheduled_at */
class InvoiceReminder extends Model
{
    protected $fillable = ['business_id', 'invoice_id', 'reminder_rule_id', 'sequence', 'tone', 'status', 'scheduled_at', 'queued_at', 'sent_at', 'failed_at', 'cancelled_at', 'failure_reason'];

    protected function casts(): array
    {
        return [
            'scheduled_at' => 'datetime', 'queued_at' => 'datetime', 'sent_at' => 'datetime',
            'failed_at' => 'datetime', 'cancelled_at' => 'datetime',
        ];
    }

    /** @return BelongsTo<Invoice, $this> */
    public function invoice(): BelongsTo
    {
        return $this->belongsTo(Invoice::class);
    }
}
