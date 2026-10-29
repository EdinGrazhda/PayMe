<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\InvoiceResource;
use App\Http\Resources\ReminderResource;
use App\Models\Invoice;
use App\Models\InvoiceReminder;
use App\Models\ReminderRule;
use App\Services\BusinessContext;
use App\Services\ReminderService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Validation\Rule;

class ReminderController extends Controller
{
    public function index(Request $request, BusinessContext $context): AnonymousResourceCollection
    {
        $business = $context->forUser($request->user());
        $filters = $request->validate(['status' => ['sometimes', 'in:scheduled,queued,sending,sent,failed,cancelled']]);
        $query = InvoiceReminder::query()->where('business_id', $business->id)
            ->with('invoice:id,client_id,invoice_number,currency,balance_due_minor', 'invoice.client:id,name');

        if (isset($filters['status'])) {
            $query->where('status', $filters['status']);
        }

        return ReminderResource::collection($query->orderByDesc('id')->cursorPaginate(30));
    }

    public function rules(Request $request, BusinessContext $context): JsonResponse
    {
        $business = $context->forUser($request->user());

        return response()->json(['data' => $business->reminderRules()->orderBy('position')->get([
            'id', 'position', 'days_after_due', 'tone', 'enabled',
        ])]);
    }

    public function updateRule(Request $request, ReminderRule $rule, BusinessContext $context): JsonResponse
    {
        $business = $context->forUser($request->user());
        abort_unless($rule->business_id === $business->id, 404);
        $data = $request->validate([
            'days_after_due' => ['sometimes', 'integer', 'between:1,365'],
            'tone' => ['sometimes', Rule::in(['friendly', 'professional', 'firm'])],
            'enabled' => ['sometimes', 'boolean'],
        ]);
        $rule->update($data);

        return response()->json(['data' => $rule->only('id', 'position', 'days_after_due', 'tone', 'enabled')]);
    }

    public function setInvoiceReminders(Request $request, Invoice $invoice, BusinessContext $context, ReminderService $reminders): InvoiceResource
    {
        $business = $context->forUser($request->user());
        abort_unless($invoice->business_id === $business->id, 404);
        $data = $request->validate(['enabled' => ['required', 'boolean']]);

        return new InvoiceResource($reminders->setEnabled($invoice, $request->user(), (bool) $data['enabled'])->load('client'));
    }

    public function skip(Request $request, InvoiceReminder $reminder, BusinessContext $context, ReminderService $reminders): ReminderResource
    {
        $business = $context->forUser($request->user());
        abort_unless($reminder->business_id === $business->id, 404);

        return new ReminderResource($reminders->skip($reminder, $request->user())->load('invoice.client'));
    }
}
