import { Head, Link } from "@inertiajs/react";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import {
    EmptyState,
    fieldClass,
    PaymeCard,
    PaymePage,
    primaryClass,
} from "@/components/payme-page";
import { Button } from "@/components/ui/button";
import { apiRequest, date, money, type CursorPage } from "@/lib/payme";

type Rule = {
    id: number;
    position: number;
    days_after_due: number;
    tone: "friendly" | "professional" | "firm";
    enabled: boolean;
};
type Reminder = {
    id: number;
    sequence: number;
    tone: string;
    status: string;
    scheduled_at: string;
    sent_at: string | null;
    invoice: {
        id: number;
        number: string;
        currency: string;
        balance_due_minor: number;
        client: string;
    };
};

export default function Reminders() {
    const [rules, setRules] = useState<Rule[]>([]);
    const [reminders, setReminders] = useState<Reminder[]>([]);
    const [filter, setFilter] = useState("all");
    const [next, setNext] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [busy, setBusy] = useState<number | null>(null);

    const load = useCallback(
        async (url?: string, append = false) => {
            setLoading(true);
            try {
                const [page, ruleResult] = await Promise.all([
                    apiRequest<CursorPage<Reminder>>(
                        url || `/api/reminders${filter === "all" ? "" : `?status=${filter}`}`,
                    ),
                    apiRequest<{ data: Rule[] }>("/api/reminder-rules"),
                ]);
                setReminders((current) => (append ? [...current, ...page.data] : page.data));
                setNext(page.links.next);
                setRules(ruleResult.data);
            } catch (error) {
                toast.error((error as Error).message);
            } finally {
                setLoading(false);
            }
        },
        [filter],
    );
    useEffect(() => {
        void load();
    }, [load]);

    async function updateRule(rule: Rule, patch: Partial<Rule>) {
        setBusy(rule.id);
        try {
            const result = await apiRequest<{ data: Rule }>(`/api/reminder-rules/${rule.id}`, {
                method: "PATCH",
                body: JSON.stringify(patch),
            });
            setRules((current) =>
                current.map((item) => (item.id === rule.id ? result.data : item)),
            );
            toast.success("Reminder rule updated");
        } catch (error) {
            toast.error((error as Error).message);
        } finally {
            setBusy(null);
        }
    }
    async function skip(reminder: Reminder) {
        if (!window.confirm(`Skip the reminder for ${reminder.invoice.number}?`)) return;
        setBusy(reminder.id);
        try {
            await apiRequest(`/api/reminders/${reminder.id}/skip`, { method: "PATCH" });
            toast.success("Reminder skipped");
            await load();
        } catch (error) {
            toast.error((error as Error).message);
        } finally {
            setBusy(null);
        }
    }

    return (
        <>
            <Head title="Reminders" />
            <PaymePage
                title="Reminders"
                description="Plan follow-ups and manage each invoice's reminder schedule."
                action={
                    <Link href="/invoices">
                        <Button className={primaryClass}>View invoices</Button>
                    </Link>
                }
            >
                <div className="space-y-6">
                    <PaymeCard
                        title="Reminder rules"
                        description="These steps are scheduled after an invoice due date when reminders are enabled on that invoice."
                    >
                        <div className="divide-y divide-[#e7eee8] dark:divide-[#2a4033]">
                            {rules.map((rule) => (
                                <div
                                    key={rule.id}
                                    className="flex flex-wrap items-center gap-3 py-4"
                                >
                                    <span className="w-16 text-sm font-semibold">
                                        Step {rule.position}
                                    </span>
                                    <label className="flex items-center gap-2 text-sm">
                                        <span>After</span>
                                        <input
                                            aria-label={`Days after due for step ${rule.position}`}
                                            className={`${fieldClass} w-20`}
                                            type="number"
                                            min="1"
                                            max="365"
                                            defaultValue={rule.days_after_due}
                                            key={`${rule.id}-${rule.days_after_due}`}
                                            onBlur={(event) => {
                                                const days = Number(event.target.value);
                                                if (
                                                    days !== rule.days_after_due &&
                                                    days >= 1 &&
                                                    days <= 365
                                                )
                                                    void updateRule(rule, { days_after_due: days });
                                            }}
                                        />
                                        <span>days</span>
                                    </label>
                                    <select
                                        aria-label={`Tone for step ${rule.position}`}
                                        className={`${fieldClass} w-40`}
                                        value={rule.tone}
                                        disabled={busy === rule.id}
                                        onChange={(event) =>
                                            void updateRule(rule, {
                                                tone: event.target.value as Rule["tone"],
                                            })
                                        }
                                    >
                                        <option value="friendly">Friendly</option>
                                        <option value="professional">Professional</option>
                                        <option value="firm">Firm</option>
                                    </select>
                                    <label className="ml-auto flex items-center gap-2 text-sm">
                                        <input
                                            type="checkbox"
                                            checked={rule.enabled}
                                            disabled={busy === rule.id}
                                            onChange={(event) =>
                                                void updateRule(rule, {
                                                    enabled: event.target.checked,
                                                })
                                            }
                                        />
                                        Enabled
                                    </label>
                                </div>
                            ))}
                        </div>
                        {rules.length === 0 && !loading && (
                            <EmptyState
                                title="No reminder rules"
                                description="Your business has no reminder schedule yet."
                            />
                        )}
                        <p className="mt-4 text-xs text-muted-foreground">
                            Rule edits apply to newly scheduled reminders. Existing schedules can be
                            paused per invoice.
                        </p>
                    </PaymeCard>
                    <PaymeCard
                        title="Reminder activity"
                        description="Upcoming, sent, and skipped follow-ups."
                    >
                        <div className="mb-4 flex flex-wrap gap-2">
                            {["all", "scheduled", "sent", "cancelled", "failed"].map((item) => (
                                <Button
                                    key={item}
                                    size="sm"
                                    variant={filter === item ? "default" : "outline"}
                                    className={filter === item ? primaryClass : ""}
                                    onClick={() => setFilter(item)}
                                >
                                    {item[0].toUpperCase() + item.slice(1)}
                                </Button>
                            ))}
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full min-w-[650px] text-left text-sm">
                                <thead className="border-b text-xs uppercase tracking-widest text-[#819188]">
                                    <tr>
                                        <th className="py-3">Invoice</th>
                                        <th>Client</th>
                                        <th>Balance</th>
                                        <th>Scheduled</th>
                                        <th>Status</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {reminders.map((item) => (
                                        <tr
                                            key={item.id}
                                            className="border-b border-[#edf0ed] dark:border-[#2a4033]"
                                        >
                                            <td className="py-4 font-semibold">
                                                {item.invoice?.number}
                                            </td>
                                            <td>{item.invoice?.client}</td>
                                            <td>
                                                {money(
                                                    item.invoice?.balance_due_minor || 0,
                                                    item.invoice?.currency,
                                                )}
                                            </td>
                                            <td>{date(item.scheduled_at)}</td>
                                            <td className="capitalize">{item.status}</td>
                                            <td>
                                                {["scheduled", "queued"].includes(item.status) && (
                                                    <Button
                                                        size="sm"
                                                        variant="ghost"
                                                        disabled={busy === item.id}
                                                        onClick={() => void skip(item)}
                                                    >
                                                        Skip
                                                    </Button>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        {!loading && reminders.length === 0 && (
                            <EmptyState
                                title="No reminders found"
                                description="Enable reminders from a sent invoice to plan follow-ups."
                            />
                        )}
                        {loading && (
                            <p className="py-8 text-center text-sm text-muted-foreground">
                                Loading reminders…
                            </p>
                        )}
                        {next && (
                            <div className="mt-5 text-center">
                                <Button
                                    variant="outline"
                                    disabled={loading}
                                    onClick={() => void load(next, true)}
                                >
                                    Load more
                                </Button>
                            </div>
                        )}
                    </PaymeCard>
                </div>
            </PaymePage>
        </>
    );
}
