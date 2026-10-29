<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreInvoiceRequest;
use App\Http\Resources\InvoiceResource;
use App\Models\Invoice;
use App\Services\BusinessContext;
use App\Services\InvoiceService;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class InvoiceController extends Controller
{
    public function index(Request $request, BusinessContext $context): AnonymousResourceCollection
    {
        $business = $context->forUser($request->user());
        $filters = $request->validate([
            'status' => ['sometimes', 'in:draft,sent,due_soon,overdue,paid,cancelled'],
            'client_id' => ['sometimes', 'integer'],
        ]);

        $query = $business->invoices()->with('client:id,name,company,email');

        if (isset($filters['client_id'])) {
            $query->where('client_id', $filters['client_id']);
        }

        if (isset($filters['status'])) {
            match ($filters['status']) {
                'overdue' => $query->where('status', 'sent')->where('due_date', '<', now()->toDateString()),
                'due_soon' => $query->where('status', 'sent')->whereBetween('due_date', [now()->toDateString(), now()->addDays(7)->toDateString()]),
                default => $query->where('status', $filters['status']),
            };
        }

        if (isset($filters['status']) || isset($filters['client_id'])) {
            $query->orderByDesc('created_at');
        }

        return InvoiceResource::collection($query->orderByDesc('id')->cursorPaginate(30));
    }

    public function store(StoreInvoiceRequest $request, BusinessContext $context, InvoiceService $invoices): InvoiceResource
    {
        $business = $context->forUser($request->user());
        $invoice = $invoices->create($business, $request->user(), $request->validated());

        return new InvoiceResource($invoice->load('items'));
    }

    public function show(Request $request, Invoice $invoice, BusinessContext $context): InvoiceResource
    {
        $business = $context->forUser($request->user());
        abort_unless($invoice->business_id === $business->id, 404);

        return new InvoiceResource($invoice->load(['client', 'items']));
    }

    public function markSent(Request $request, Invoice $invoice, BusinessContext $context, InvoiceService $invoices): InvoiceResource
    {
        $business = $context->forUser($request->user());
        abort_unless($invoice->business_id === $business->id, 404);

        return new InvoiceResource($invoices->markSent($invoice, $request->user())->load('client'));
    }
}
