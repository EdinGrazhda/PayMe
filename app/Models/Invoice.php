<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Carbon;

/**
 * @property Carbon $issue_date
 * @property Carbon $due_date
 * @property Carbon|null $sent_at
 * @property Carbon|null $paid_at
 * @property Carbon|null $first_overdue_at
 * @property Carbon|null $first_reminder_sent_at
 */
class Invoice extends Model
{
    protected $fillable = [
        'business_id', 'client_id', 'invoice_number', 'public_token', 'currency', 'status',
        'subtotal_minor', 'tax_minor', 'discount_minor', 'total_minor', 'amount_paid_minor',
        'balance_due_minor', 'issue_date', 'due_date', 'notes', 'payment_instructions',
        'terms', 'reminders_enabled', 'sent_at', 'viewed_at', 'first_overdue_at',
        'first_reminder_sent_at', 'paid_at',
    ];

    protected function casts(): array
    {
        return [
            'issue_date' => 'date',
            'due_date' => 'date',
            'sent_at' => 'datetime',
            'viewed_at' => 'datetime',
            'first_overdue_at' => 'datetime',
            'first_reminder_sent_at' => 'datetime',
            'paid_at' => 'datetime',
            'reminders_enabled' => 'boolean',
        ];
    }

    /** @return BelongsTo<Business, $this> */
    public function business(): BelongsTo
    {
        return $this->belongsTo(Business::class);
    }

    /** @return BelongsTo<Client, $this> */
    public function client(): BelongsTo
    {
        return $this->belongsTo(Client::class);
    }

    /** @return HasMany<InvoiceItem, $this> */
    public function items(): HasMany
    {
        return $this->hasMany(InvoiceItem::class);
    }

    /** @return HasMany<Payment, $this> */
    public function payments(): HasMany
    {
        return $this->hasMany(Payment::class);
    }

    /** @return HasMany<InvoiceReminder, $this> */
    public function reminders(): HasMany
    {
        return $this->hasMany(InvoiceReminder::class);
    }

    /** @return HasMany<InvoiceEvent, $this> */
    public function events(): HasMany
    {
        return $this->hasMany(InvoiceEvent::class);
    }
}
