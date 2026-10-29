<?php

namespace App\Services;

use App\Models\Business;
use Illuminate\Support\Facades\DB;

class AnalyticsService
{
    /** @return array<string, mixed> */
    public function data(Business $business): array
    {
        $today = now()->toDateString();
        $invoices = DB::table('invoices')
            ->where('business_id', $business->id)
            ->where('currency', $business->currency);
        $payments = DB::table('payments')
            ->where('business_id', $business->id)
            ->where('currency', $business->currency);

        $monthly = [];
        for ($offset = 5; $offset >= 0; $offset--) {
            $month = now()->startOfMonth()->subMonths($offset);
            $monthly[] = [
                'month' => $month->format('M Y'),
                'collected_minor' => (int) (clone $payments)->whereBetween('paid_at', [$month, $month->endOfMonth()])->sum('amount_minor'),
            ];
        }

        $aging = [];
        foreach ([
            ['label' => 'Current', 'from' => $today, 'to' => null],
            ['label' => '1–7 days', 'from' => now()->subDays(7)->toDateString(), 'to' => $today],
            ['label' => '8–30 days', 'from' => now()->subDays(30)->toDateString(), 'to' => now()->subDays(7)->toDateString()],
            ['label' => '31–60 days', 'from' => now()->subDays(60)->toDateString(), 'to' => now()->subDays(30)->toDateString()],
            ['label' => '60+ days', 'from' => null, 'to' => now()->subDays(60)->toDateString()],
        ] as $bucket) {
            $query = (clone $invoices)->where('status', 'sent');

            if ($bucket['from'] !== null) {
                $query->where('due_date', '>=', $bucket['from']);
            }
            if ($bucket['to'] !== null) {
                $query->where('due_date', '<', $bucket['to']);
            }

            $aging[] = ['label' => $bucket['label'], 'amount_minor' => (int) $query->sum('balance_due_minor')];
        }

        $averagePaymentDays = match (DB::getDriverName()) {
            'sqlite' => 'AVG(julianday(date(paid_at)) - julianday(issue_date))',
            'pgsql' => 'AVG(EXTRACT(EPOCH FROM (paid_at - issue_date)) / 86400)',
            default => 'AVG(DATEDIFF(paid_at, issue_date))',
        };

        return [
            'currency' => $business->currency,
            'totals' => [
                'invoiced_minor' => (int) (clone $invoices)->where('status', '!=', 'cancelled')->sum('total_minor'),
                'collected_minor' => (int) (clone $payments)->sum('amount_minor'),
                'outstanding_minor' => (int) (clone $invoices)->where('status', 'sent')->sum('balance_due_minor'),
                'overdue_minor' => (int) (clone $invoices)->where('status', 'sent')->where('due_date', '<', $today)->sum('balance_due_minor'),
                'recovered_minor' => (int) (clone $invoices)->where('status', 'paid')->whereNotNull('first_overdue_at')
                    ->whereNotNull('first_reminder_sent_at')->whereColumn('paid_at', '>=', 'first_reminder_sent_at')->sum('total_minor'),
                'invoice_count' => (int) (clone $invoices)->where('status', '!=', 'cancelled')->count(),
                'reminders_sent' => DB::table('invoice_reminders')->where('business_id', $business->id)->where('status', 'sent')->count(),
                'average_payment_days' => round((float) ((clone $invoices)->where('status', 'paid')->selectRaw($averagePaymentDays.' as average_days')->first()?->average_days), 1),
            ],
            'monthly' => $monthly,
            'aging' => $aging,
        ];
    }
}
