<?php

namespace App\Services;

use App\Http\Resources\InvoiceResource;
use App\Models\Business;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class DashboardService
{
    /** @return array<string, mixed> */
    public function data(Business $business, Request $request): array
    {
        $today = now()->toDateString();
        $upcoming = now()->addDays(7)->toDateString();

        $base = DB::table('invoices')
            ->where('business_id', $business->id)
            ->where('currency', $business->currency);

        $outstanding = (clone $base)->where('status', 'sent')->sum('balance_due_minor');
        $overdue = (clone $base)->where('status', 'sent')->where('due_date', '<', $today)->sum('balance_due_minor');
        $collected = DB::table('payments')
            ->where('business_id', $business->id)
            ->where('currency', $business->currency)
            ->whereBetween('paid_at', [now()->startOfMonth(), now()->endOfMonth()])
            ->sum('amount_minor');
        $recovered = (clone $base)
            ->where('status', 'paid')
            ->whereNotNull('first_overdue_at')
            ->whereNotNull('first_reminder_sent_at')
            ->whereColumn('paid_at', '>=', 'first_reminder_sent_at')
            ->sum('total_minor');

        $relations = [
            'client:id,name,company,email',
            'items' => fn ($query) => $query->select('id', 'invoice_id', 'description', 'position')->orderBy('position'),
            'reminders' => fn ($query) => $query->select('id', 'invoice_id', 'scheduled_at')->where('status', 'scheduled')->orderBy('scheduled_at'),
        ];

        $attention = $business->invoices()
            ->select('id', 'business_id', 'client_id', 'invoice_number', 'currency', 'status', 'total_minor', 'balance_due_minor', 'issue_date', 'due_date', 'sent_at', 'paid_at')
            ->with($relations)
            ->where('status', 'sent')
            ->where('balance_due_minor', '>', 0)
            ->where('due_date', '<=', $upcoming)
            ->orderBy('due_date')
            ->limit(20)
            ->get();

        $recent = $business->invoices()
            ->select('id', 'business_id', 'client_id', 'invoice_number', 'currency', 'status', 'total_minor', 'balance_due_minor', 'issue_date', 'due_date', 'sent_at', 'paid_at')
            ->with($relations)
            ->orderByDesc('id')
            ->limit(20)
            ->get();

        return [
            'business' => ['name' => $business->name, 'currency' => $business->currency],
            'metrics' => [
                'outstanding_minor' => (int) $outstanding,
                'overdue_minor' => (int) $overdue,
                'collected_month_minor' => (int) $collected,
                'recovered_minor' => (int) $recovered,
            ],
            'attention' => InvoiceResource::collection($attention)->resolve($request),
            'recent' => InvoiceResource::collection($recent)->resolve($request),
        ];
    }
}
