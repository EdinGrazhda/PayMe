import { Head } from "@inertiajs/react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { EmptyState, PaymeCard, PaymePage } from "@/components/payme-page";
import { apiRequest, money } from "@/lib/payme";

type AnalyticsData = {
    currency: string;
    totals: {
        invoiced_minor: number;
        collected_minor: number;
        outstanding_minor: number;
        overdue_minor: number;
        recovered_minor: number;
        invoice_count: number;
        reminders_sent: number;
        average_payment_days: number;
    };
    monthly: { month: string; collected_minor: number }[];
    aging: { label: string; amount_minor: number }[];
};

export default function Analytics() {
    const [data, setData] = useState<AnalyticsData | null>(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        void apiRequest<AnalyticsData>("/api/analytics")
            .then(setData)
            .catch((error) => toast.error((error as Error).message))
            .finally(() => setLoading(false));
    }, []);
    const maxMonth = Math.max(1, ...(data?.monthly.map((item) => item.collected_minor) || [1]));
    const maxAging = Math.max(1, ...(data?.aging.map((item) => item.amount_minor) || [1]));
    return (
        <>
            <Head title="Analytics" />
            <PaymePage
                title="Analytics"
                description="A live view of cash collection and overdue invoices."
            >
                {loading && <p className="text-sm text-muted-foreground">Loading analytics…</p>}
                {data && (
                    <div className="space-y-6">
                        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                            {(
                                [
                                    ["Total invoiced", data.totals.invoiced_minor],
                                    ["Collected", data.totals.collected_minor],
                                    ["Outstanding", data.totals.outstanding_minor],
                                    ["Overdue", data.totals.overdue_minor],
                                ] as const
                            ).map(([label, amount]) => (
                                <div
                                    key={label}
                                    className="rounded-2xl border border-[#dce5dd] bg-[#edf6ef] p-6 dark:border-[#2a4033] dark:bg-[#1a3022]"
                                >
                                    <p className="text-sm text-[#708078] dark:text-[#a4b5aa]">
                                        {label}
                                    </p>
                                    <p className="mt-2 text-2xl font-semibold text-[#10241d] dark:text-[#edf8f0]">
                                        {money(amount, data.currency)}
                                    </p>
                                </div>
                            ))}
                        </div>
                        <div className="grid gap-6 xl:grid-cols-2">
                            <PaymeCard
                                title="Collected by month"
                                description="Payments received in the last six months."
                            >
                                {data.totals.invoice_count === 0 ? (
                                    <EmptyState
                                        title="No invoice data yet"
                                        description="Your chart will grow as you record payments."
                                    />
                                ) : (
                                    <div className="flex h-64 items-end gap-3 pt-6">
                                        {data.monthly.map((item) => (
                                            <div
                                                key={item.month}
                                                className="flex h-full flex-1 flex-col items-center justify-end gap-2"
                                            >
                                                <span className="text-xs font-medium">
                                                    {money(item.collected_minor, data.currency)}
                                                </span>
                                                <div
                                                    className="w-full max-w-14 rounded-t-lg bg-[#16714f] dark:bg-[#4eb889]"
                                                    style={{
                                                        height: `${Math.max(3, (item.collected_minor / maxMonth) * 82)}%`,
                                                    }}
                                                />
                                                <span className="text-center text-xs text-muted-foreground">
                                                    {item.month}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </PaymeCard>
                            <PaymeCard
                                title="Outstanding by age"
                                description="Open balances grouped by days past due."
                            >
                                <div className="space-y-5 py-2">
                                    {data.aging.map((item) => (
                                        <div key={item.label}>
                                            <div className="mb-2 flex justify-between text-sm">
                                                <span>{item.label}</span>
                                                <span className="font-semibold">
                                                    {money(item.amount_minor, data.currency)}
                                                </span>
                                            </div>
                                            <div className="h-2 rounded-full bg-[#e6eee8] dark:bg-[#263d2e]">
                                                <div
                                                    className="h-2 rounded-full bg-[#16714f] dark:bg-[#4eb889]"
                                                    style={{
                                                        width: `${(item.amount_minor / maxAging) * 100}%`,
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </PaymeCard>
                        </div>
                        <PaymeCard title="Collection signals">
                            <div className="grid gap-4 sm:grid-cols-3">
                                <Metric
                                    label="Recovered after reminders"
                                    value={money(data.totals.recovered_minor, data.currency)}
                                />
                                <Metric
                                    label="Reminders sent"
                                    value={String(data.totals.reminders_sent)}
                                />
                                <Metric
                                    label="Average time to payment"
                                    value={`${data.totals.average_payment_days} days`}
                                />
                            </div>
                        </PaymeCard>
                    </div>
                )}
            </PaymePage>
        </>
    );
}

function Metric({ label, value }: { label: string; value: string }) {
    return (
        <div className="rounded-xl bg-[#f4f8f4] p-5 dark:bg-[#203329]">
            <p className="text-sm text-muted-foreground">{label}</p>
            <p className="mt-2 text-xl font-semibold">{value}</p>
        </div>
    );
}
