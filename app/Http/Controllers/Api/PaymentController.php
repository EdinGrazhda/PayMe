<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StorePaymentRequest;
use App\Models\Invoice;
use App\Services\BusinessContext;
use App\Services\PaymentService;
use Illuminate\Http\JsonResponse;

class PaymentController extends Controller
{
    public function store(StorePaymentRequest $request, Invoice $invoice, BusinessContext $context, PaymentService $payments): JsonResponse
    {
        $business = $context->forUser($request->user());
        abort_unless($invoice->business_id === $business->id, 404);

        $payment = $payments->record($invoice, $request->user(), $request->validated());

        return response()->json([
            'data' => [
                'id' => $payment->id,
                'invoice_id' => $invoice->id,
                'amount_minor' => (int) $payment->amount_minor,
                'currency' => $payment->currency,
                'paid_at' => $payment->paid_at->toIso8601String(),
            ],
        ], 201);
    }
}
