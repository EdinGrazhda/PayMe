import { Head } from "@inertiajs/react";
import { Plus } from "lucide-react";
import { type FormEvent, useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { EmptyState, PaymeCard, PaymePage, primaryClass } from "@/components/payme-page";
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
import { apiRequest, money, type Client, type CursorPage, type Invoice } from "@/lib/payme";

type ClientDetail = {
    data: Client;
    summary: {
        currency: string;
        invoice_count: number;
        outstanding_minor: number;
        paid_minor: number;
    };
    recent_invoices: Invoice[];
};
const blank = { name: "", company: "", email: "", phone: "", address: "", notes: "" };

export default function Clients() {
    const [clients, setClients] = useState<Client[]>([]);
    const [query, setQuery] = useState("");
    const [next, setNext] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [form, setForm] = useState(blank);
    const [editing, setEditing] = useState<number | null>(null);
    const [formOpen, setFormOpen] = useState(false);
    const [detail, setDetail] = useState<ClientDetail | null>(null);
    const [busy, setBusy] = useState(false);

    const load = useCallback(
        async (url?: string, append = false) => {
            setLoading(true);
            try {
                const page = await apiRequest<CursorPage<Client>>(
                    url ||
                        (query.trim()
                            ? `/api/clients?q=${encodeURIComponent(query.trim())}`
                            : "/api/clients"),
                );
                setClients((current) => (append ? [...current, ...page.data] : page.data));
                setNext(page.links.next);
            } catch (error) {
                toast.error((error as Error).message);
            } finally {
                setLoading(false);
            }
        },
        [query],
    );
    useEffect(() => {
        const timer = window.setTimeout(() => {
            void load();
        }, 250);
        return () => window.clearTimeout(timer);
    }, [load]);

    async function openDetail(id: number) {
        try {
            setDetail(await apiRequest<ClientDetail>(`/api/clients/${id}`));
        } catch (error) {
            toast.error((error as Error).message);
        }
    }
    function openForm(client?: Client) {
        setEditing(client?.id ?? null);
        setForm(
            client
                ? {
                      name: client.name,
                      company: client.company || "",
                      email: client.email || "",
                      phone: client.phone || "",
                      address: client.address || "",
                      notes: client.notes || "",
                  }
                : blank,
        );
        setFormOpen(true);
    }
    async function save(event: FormEvent) {
        event.preventDefault();
        setBusy(true);
        try {
            await apiRequest(editing ? `/api/clients/${editing}` : "/api/clients", {
                method: editing ? "PATCH" : "POST",
                body: JSON.stringify(form),
            });
            toast.success(editing ? "Client updated" : "Client added");
            setFormOpen(false);
            await load();
            if (editing) await openDetail(editing);
        } catch (error) {
            toast.error((error as Error).message);
        } finally {
            setBusy(false);
        }
    }
    async function remove(client: Client) {
        if (!window.confirm(`Delete ${client.name}? This cannot be undone.`)) return;
        setBusy(true);
        try {
            await apiRequest(`/api/clients/${client.id}`, { method: "DELETE" });
            toast.success("Client deleted");
            setDetail(null);
            await load();
        } catch (error) {
            toast.error((error as Error).message);
        } finally {
            setBusy(false);
        }
    }

    return (
        <>
            <Head title="Clients" />
            <PaymePage
                title="Clients"
                description="Keep contact details and invoice history in one place."
                action={
                    <Button className={primaryClass} onClick={() => openForm()}>
                        <Plus className="mr-2 size-4" />
                        Add client
                    </Button>
                }
            >
                <PaymeCard title="Your clients" description="Search by name, company, or email.">
                    <Input
                        aria-label="Search clients"
                        className="mb-5 max-w-xs"
                        placeholder="Search clients…"
                        value={query}
                        onChange={(event) => setQuery(event.target.value)}
                    />
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[600px] text-left text-sm">
                            <thead className="border-b text-xs uppercase tracking-widest text-[#819188]">
                                <tr>
                                    <th className="py-3">Name</th>
                                    <th>Company</th>
                                    <th>Email</th>
                                    <th>Phone</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {clients.map((client) => (
                                    <tr
                                        key={client.id}
                                        className="border-b border-[#edf0ed] dark:border-[#2a4033]"
                                    >
                                        <td className="py-4 font-semibold">{client.name}</td>
                                        <td>{client.company || "—"}</td>
                                        <td>{client.email || "—"}</td>
                                        <td>{client.phone || "—"}</td>
                                        <td>
                                            <Button
                                                size="sm"
                                                variant="ghost"
                                                onClick={() => void openDetail(client.id)}
                                            >
                                                View
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    {!loading && clients.length === 0 && (
                        <EmptyState
                            title="No clients found"
                            description={
                                query ? "Try a different search." : "Add a client to get started."
                            }
                        />
                    )}
                    {loading && (
                        <p className="py-8 text-center text-sm text-muted-foreground">
                            Loading clients…
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
                <Dialog open={formOpen} onOpenChange={setFormOpen}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>{editing ? "Edit client" : "Add client"}</DialogTitle>
                            <DialogDescription>
                                Keep these details up to date for invoice follow-ups.
                            </DialogDescription>
                        </DialogHeader>
                        <form className="space-y-3" onSubmit={(event) => void save(event)}>
                            <Input
                                required
                                placeholder="Name"
                                value={form.name}
                                onChange={(e) => setForm({ ...form, name: e.target.value })}
                            />
                            <Input
                                placeholder="Company"
                                value={form.company}
                                onChange={(e) => setForm({ ...form, company: e.target.value })}
                            />
                            <Input
                                type="email"
                                placeholder="Email"
                                value={form.email}
                                onChange={(e) => setForm({ ...form, email: e.target.value })}
                            />
                            <Input
                                placeholder="Phone"
                                value={form.phone}
                                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                            />
                            <Input
                                placeholder="Address"
                                value={form.address}
                                onChange={(e) => setForm({ ...form, address: e.target.value })}
                            />
                            <textarea
                                className="w-full rounded-md border bg-background p-3 text-sm"
                                rows={3}
                                placeholder="Notes"
                                value={form.notes}
                                onChange={(e) => setForm({ ...form, notes: e.target.value })}
                            />
                            <DialogFooter>
                                <Button disabled={busy} className={primaryClass} type="submit">
                                    {editing ? "Save changes" : "Add client"}
                                </Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>
                <Dialog
                    open={detail !== null}
                    onOpenChange={(open) => {
                        if (!open) setDetail(null);
                    }}
                >
                    <DialogContent className="max-w-xl">
                        <DialogHeader>
                            <DialogTitle>{detail?.data.name}</DialogTitle>
                            <DialogDescription>
                                {detail?.data.company || "Client details"}
                            </DialogDescription>
                        </DialogHeader>
                        {detail && (
                            <div className="space-y-5 text-sm">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-muted-foreground">Email</p>
                                        {detail.data.email || "—"}
                                    </div>
                                    <div>
                                        <p className="text-muted-foreground">Phone</p>
                                        {detail.data.phone || "—"}
                                    </div>
                                    <div>
                                        <p className="text-muted-foreground">Invoices</p>
                                        {detail.summary.invoice_count}
                                    </div>
                                    <div>
                                        <p className="text-muted-foreground">Outstanding</p>
                                        {money(
                                            detail.summary.outstanding_minor,
                                            detail.summary.currency,
                                        )}
                                    </div>
                                </div>
                                {detail.data.notes && (
                                    <p className="rounded-lg bg-[#f1f6f1] p-3 dark:bg-[#203329]">
                                        {detail.data.notes}
                                    </p>
                                )}
                                <div>
                                    <h3 className="mb-2 font-semibold">Recent invoices</h3>
                                    {detail.recent_invoices.length ? (
                                        detail.recent_invoices.map((invoice) => (
                                            <div
                                                className="flex justify-between border-t py-2"
                                                key={invoice.id}
                                            >
                                                <span>{invoice.number}</span>
                                                <span>
                                                    {money(invoice.total_minor, invoice.currency)}
                                                </span>
                                            </div>
                                        ))
                                    ) : (
                                        <p className="text-muted-foreground">No invoices yet.</p>
                                    )}
                                </div>
                                <div className="flex gap-2">
                                    <Button
                                        className={primaryClass}
                                        onClick={() => openForm(detail.data)}
                                    >
                                        Edit client
                                    </Button>
                                    {detail.summary.invoice_count === 0 && (
                                        <Button
                                            variant="outline"
                                            disabled={busy}
                                            onClick={() => void remove(detail.data)}
                                        >
                                            Delete
                                        </Button>
                                    )}
                                </div>
                            </div>
                        )}
                    </DialogContent>
                </Dialog>
            </PaymePage>
        </>
    );
}
