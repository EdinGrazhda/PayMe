import { Head, Link } from "@inertiajs/react";
import { Plus } from "lucide-react";
import { type FormEvent, useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import {
    EmptyState,
    fieldClass,
    PaymeCard,
    PaymePage,
    primaryClass,
} from "@/components/payme-page";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
    apiRequest,
    date,
    money,
    today,
    type Client,
    type CursorPage,
    type Invoice,
} from "@/lib/payme";

const filters = ["all", "outstanding", "draft", "overdue", "paid"] as const;
const defaultForm = {
    invoice_number: "",
    client_id: "",
    client_name: "",
    description: "",
    amount: "",
    due_date: "",
};

export default function Invoices() {
    const [invoices, setInvoices] = useState<Invoice[]>([]);
    const [clients, setClients] = useState<Client[]>([]);
    const [filter, setFilter] = useState<string>("all");
    const [query, setQuery] = useState("");
    const [next, setNext] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [form, setForm] = useState(defaultForm);
    const [createOpen, setCreateOpen] = useState(false);
    const [selected, setSelected] = useState<Invoice | null>(null);
    const [busy, setBusy] = useState(false);

    const load = useCallback(
        async (url?: string, append = false) => {
            setLoading(true);
            try {
                const params = new URLSearchParams();
                if (filter !== "all") params.set("status", filter);
                if (query.trim()) params.set("q", query.trim());
                const page = await apiRequest<CursorPage<Invoice>>(
                    url || `/api/invoices?${params}`,
                );
                setInvoices((current) => (append ? [...current, ...page.data] : page.data));
                setNext(page.links.next);
            } catch (error) {
                toast.error((error as Error).message);
            } finally {
                setLoading(false);
            }
        },
        [filter, query],
    );

    useEffect(() => {
        const timer = window.setTimeout(() => {
            void load();
        }, 250);
        return () => window.clearTimeout(timer);
    }, [load]);
    useEffect(() => {
        void apiRequest<CursorPage<Client>>("/api/clients")
            .then((page) => setClients(page.data))
            .catch(() => undefined);
    }, []);

    async function openInvoice(id: number) {
        try {
            const result = await apiRequest<{ data: Invoice }>(`/api/invoices/${id}`);
            setSelected(result.data);
        } catch (error) {
            toast.error((error as Error).message);
        }
    }

    async function create(event: FormEvent) {
        event.preventDefault();
        setBusy(true);
        try {
            await apiRequest("/api/invoices", {
                method: "POST",
                body: JSON.stringify({
                    invoice_number: form.invoice_number,
                    ...(form.client_id
                        ? { client_id: Number(form.client_id) }
                        : { client_name: form.client_name }),
                    description: form.description,
                    amount: form.amount,
                    due_date: form.due_date,
                }),
            });
            toast.success("Draft invoice created");
            setCreateOpen(false);
            setForm(defaultForm);
            await load();
        } catch (error) {
            toast.error((error as Error).message);
        } finally {
            setBusy(false);
        }
    }

    async function act(
        action: "send" | "payment" | "reminders",
        invoice: Invoice,
        enabled?: boolean,
    ) {
        setBusy(true);
        try {
            if (action === "send")
                await apiRequest(`/api/invoices/${invoice.id}/send`, { method: "PATCH" });
            if (action === "payment")
                await apiRequest(`/api/invoices/${invoice.id}/payments`, {
                    method: "POST",
                    body: JSON.stringify({ paid_at: today(), method: "manual" }),
                });
            if (action === "reminders")
                await apiRequest(`/api/invoices/${invoice.id}/reminders`, {
                    method: "PATCH",
                    body: JSON.stringify({ enabled }),
                });
            toast.success(
                action === "send"
                    ? "Invoice marked as sent"
                    : action === "payment"
                      ? "Payment recorded"
                      : enabled
                        ? "Reminders scheduled"
                        : "Reminders paused",
            );
            await load();
            await openInvoice(invoice.id);
        } catch (error) {
            toast.error((error as Error).message);
        } finally {
            setBusy(false);
        }
    }

    return (
        <>
            <Head title="Invoices" />
            <PaymePage
                title="Invoices"
                description="Track what is owed and keep every invoice moving."
                action={
                    <Button className={primaryClass} onClick={() => setCreateOpen(true)}>
                        <Plus className="mr-2 size-4" />
                        Add invoice
                    </Button>
                }
            >
                <PaymeCard
                    title="All invoices"
                    description="Search by invoice number or client name."
                >
                    <div className="mb-5 flex flex-wrap gap-3">
                        <Input
                            aria-label="Search invoices"
                            placeholder="Search invoices…"
                            value={query}
                            onChange={(event) => setQuery(event.target.value)}
                            className="max-w-xs"
                        />
                        <div className="flex flex-wrap gap-1">
                            {filters.map((item) => (
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
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[700px] text-left text-sm">
                            <thead className="border-b text-xs uppercase tracking-widest text-[#819188]">
                                <tr>
                                    <th className="py-3">Invoice</th>
                                    <th>Client</th>
                                    <th>Amount</th>
                                    <th>Due date</th>
                                    <th>Status</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {invoices.map((invoice) => (
                                    <tr
                                        key={invoice.id}
                                        className="border-b border-[#edf0ed] dark:border-[#2a4033]"
                                    >
                                        <td className="py-4 font-semibold">{invoice.number}</td>
                                        <td>{invoice.client?.name}</td>
                                        <td>{money(invoice.total_minor, invoice.currency)}</td>
                                        <td>{date(invoice.due_date)}</td>
                                        <td>
                                            <Status status={invoice.status} />
                                        </td>
                                        <td>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => void openInvoice(invoice.id)}
                                            >
                                                View
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    {!loading && invoices.length === 0 && (
                        <EmptyState
                            title="No invoices found"
                            description={
                                filter === "all" && !query
                                    ? "Create your first invoice to start tracking."
                                    : "Try a different search or status."
                            }
                        />
                    )}
                    {loading && (
                        <p className="py-8 text-center text-sm text-muted-foreground">
                            Loading invoices…
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
                <Dialog open={createOpen} onOpenChange={setCreateOpen}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Add invoice</DialogTitle>
                            <DialogDescription>
                                Create a draft now; mark it as sent when it has been delivered to
                                your client.
                            </DialogDescription>
                        </DialogHeader>
                        <form onSubmit={(event) => void create(event)} className="space-y-3">
                            <Input
                                required
                                placeholder="Invoice number"
                                value={form.invoice_number}
                                onChange={(e) =>
                                    setForm({ ...form, invoice_number: e.target.value })
                                }
                            />
                            <select
                                className={fieldClass}
                                value={form.client_id}
                                onChange={(e) => setForm({ ...form, client_id: e.target.value })}
                            >
                                <option value="">New client</option>
                                {clients.map((client) => (
                                    <option key={client.id} value={client.id}>
                                        {client.name}
                                    </option>
                                ))}
                            </select>
                            {!form.client_id && (
                                <Input
                                    required
                                    placeholder="Client name"
                                    value={form.client_name}
                                    onChange={(e) =>
                                        setForm({ ...form, client_name: e.target.value })
                                    }
                                />
                            )}
                            <Input
                                placeholder="Description"
                                value={form.description}
                                onChange={(e) => setForm({ ...form, description: e.target.value })}
                            />
                            <div className="grid grid-cols-2 gap-3">
                                <Input
                                    required
                                    type="number"
                                    min="0.01"
                                    step="0.01"
                                    placeholder="Amount"
                                    value={form.amount}
                                    onChange={(e) => setForm({ ...form, amount: e.target.value })}
                                />
                                <Input
                                    required
                                    type="date"
                                    min={today()}
                                    value={form.due_date}
                                    onChange={(e) => setForm({ ...form, due_date: e.target.value })}
                                />
                            </div>
                            <DialogFooter>
                                <Button type="submit" className={primaryClass} disabled={busy}>
                                    Create draft
                                </Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>
                <Dialog
                    open={selected !== null}
                    onOpenChange={(open) => {
                        if (!open) setSelected(null);
                    }}
                >
                    <DialogContent className="max-w-xl">
                        <DialogHeader>
                            <DialogTitle>{selected?.number}</DialogTitle>
                            <DialogDescription>Invoice details and actions</DialogDescription>
                        </DialogHeader>
                        {selected && (
                            <div className="space-y-5 text-sm">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-muted-foreground">Client</p>
                                        <p className="font-medium">{selected.client?.name}</p>
                                        <p>{selected.client?.email}</p>
                                    </div>
                                    <div>
                                        <p className="text-muted-foreground">Status</p>
                                        <Status status={selected.status} />
                                    </div>
                                    <div>
                                        <p className="text-muted-foreground">Total</p>
                                        <p className="font-semibold">
                                            {money(selected.total_minor, selected.currency)}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-muted-foreground">Balance due</p>
                                        <p className="font-semibold">
                                            {money(selected.balance_due_minor, selected.currency)}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-muted-foreground">Issued</p>
                                        {date(selected.issue_date)}
                                    </div>
                                    <div>
                                        <p className="text-muted-foreground">Due</p>
                                        {date(selected.due_date)}
                                    </div>
                                </div>
                                {selected.items?.map((item, index) => (
                                    <p
                                        key={index}
                                        className="rounded-lg bg-[#f1f6f1] p-3 dark:bg-[#203329]"
                                    >
                                        {item.description} ·{" "}
                                        {money(item.total_minor, selected.currency)}
                                    </p>
                                ))}
                                <div className="flex flex-wrap gap-2">
                                    {selected.status === "draft" && (
                                        <Button
                                            disabled={busy}
                                            className={primaryClass}
                                            onClick={() => void act("send", selected)}
                                        >
                                            Mark as sent
                                        </Button>
                                    )}
                                    {["sent", "due_soon", "overdue"].includes(selected.status) && (
                                        <>
                                            <Button
                                                disabled={busy}
                                                className={primaryClass}
                                                onClick={() => void act("payment", selected)}
                                            >
                                                Record full payment
                                            </Button>
                                            <Button
                                                variant="outline"
                                                disabled={busy}
                                                onClick={() =>
                                                    void act("reminders", selected, true)
                                                }
                                            >
                                                Schedule reminders
                                            </Button>
                                            <Button
                                                variant="outline"
                                                disabled={busy}
                                                onClick={() =>
                                                    void act("reminders", selected, false)
                                                }
                                            >
                                                Pause reminders
                                            </Button>
                                        </>
                                    )}
                                </div>
                                <Link href="/clients" className="text-[#126044] underline">
                                    View clients
                                </Link>
                            </div>
                        )}
                    </DialogContent>
                </Dialog>
            </PaymePage>
        </>
    );
}

function Status({ status }: { status: Invoice["status"] }) {
    const color =
        status === "paid"
            ? "bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-200"
            : status === "overdue"
              ? "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-200"
              : status === "draft"
                ? "bg-neutral-100 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-200"
                : "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-200";
    return (
        <span className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${color}`}>
            {status.replace("_", " ")}
        </span>
    );
}
