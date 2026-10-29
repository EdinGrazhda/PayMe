<?php

namespace App\Http\Requests;

use App\Models\Invoice;
use App\Support\Money;
use Closure;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use InvalidArgumentException;

class StorePaymentRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user() !== null;
    }

    /** @return array<string, array<int, mixed>> */
    public function rules(): array
    {
        return [
            'amount' => [
                'sometimes', 'string',
                function (string $attribute, mixed $value, Closure $fail): void {
                    try {
                        $invoice = $this->route('invoice');
                        $currency = $invoice instanceof Invoice ? $invoice->currency : 'EUR';
                        if (Money::toMinor((string) $value, $currency) <= 0) {
                            $fail('The amount must be greater than zero.');
                        }
                    } catch (InvalidArgumentException) {
                        $fail('The amount has too many digits or decimal places for the currency.');
                    }
                },
            ],
            'paid_at' => ['sometimes', 'date', 'before_or_equal:today'],
            'method' => ['sometimes', Rule::in(['manual', 'bank_transfer', 'cash', 'card', 'other'])],
            'note' => ['nullable', 'string', 'max:2000'],
        ];
    }
}
