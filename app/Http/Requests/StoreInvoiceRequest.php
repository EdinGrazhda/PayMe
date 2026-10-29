<?php

namespace App\Http\Requests;

use App\Services\BusinessContext;
use App\Support\Money;
use Closure;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use InvalidArgumentException;

class StoreInvoiceRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user() !== null;
    }

    protected function prepareForValidation(): void
    {
        $this->mergeIfMissing(['issue_date' => now()->toDateString()]);
    }

    /** @return array<string, array<int, mixed>> */
    public function rules(): array
    {
        $business = app(BusinessContext::class)->forUser($this->user());

        return [
            'client_id' => [
                'nullable', 'integer',
                Rule::exists('clients', 'id')->where('business_id', $business->id),
            ],
            'client_name' => ['required_without:client_id', 'nullable', 'string', 'max:255'],
            'invoice_number' => [
                'required', 'string', 'max:80',
                Rule::unique('invoices', 'invoice_number')->where('business_id', $business->id),
            ],
            'description' => ['nullable', 'string', 'max:255'],
            'amount' => [
                'required', 'string',
                function (string $attribute, mixed $value, Closure $fail) use ($business): void {
                    try {
                        if (Money::toMinor((string) $value, $business->currency) <= 0) {
                            $fail('The amount must be greater than zero.');
                        }
                    } catch (InvalidArgumentException) {
                        $fail('The amount has too many digits or decimal places for the currency.');
                    }
                },
            ],
            'issue_date' => ['required', 'date'],
            'due_date' => ['required', 'date', 'after_or_equal:issue_date'],
        ];
    }
}
