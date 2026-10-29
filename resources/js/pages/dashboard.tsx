import { Head, usePage } from '@inertiajs/react';
import {
    AlertCircle,
    Clock3,
    FileText,
    MoreHorizontal,
    Plus,
    RefreshCw,
    TrendingUp,
    Upload,
} from 'lucide-react';
import {
    type FormEvent,
    useCallback,
    useEffect,
    useMemo,
    useState,
} from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { dashboard } from '@/routes';

type InvoiceStatus =
    | 'Draft'
    | 'Sent'
    | 'Due soon'
    | 'Overdue'
    | 'Paid'
    | 'Cancelled';

type ApiInvoice = {
    id: number;
    number: string;
    client: { id: number; name: string; company: string | null };
    description: string | null;
    currency: string;
    total_minor: number;
    balance_due_minor: number;
    status: 'draft' | 'sent' | 'due_soon' | 'overdue' | 'paid' | 'cancelled';
    issue_date: string;
    due_date: string;
    next_reminder_at: string | null;
};

type DashboardData = {
    business: { name: string; currency: string };
    metrics: {
        outstanding_minor: number;
        overdue_minor: number;
        collected_month_minor: number;
        recovered_minor: number;
    };
    attention: ApiInvoice[];
    recent: ApiInvoice[];
};

type AttentionInvoice = {
    id: number;
    number: string;
    description: string;
    client: string;
    amount: string;
    dueDate: string;
    timing: string;
    status: 'Due soon' | 'Overdue';
    nextAction: string;
    actionDate: string;
};

type RecentInvoice = {
    id: number;
    number: string;
    client: string;
    amount: string;
    issued: string;
    dueDate: string;
    status: InvoiceStatus;
};

const currencyDigits = (currency: string) =>
    [
        'BIF',
        'CLP',
        'DJF',
        'GNF',
        'JPY',
        'KMF',
        'KRW',
        'PYG',
        'RWF',
        'UGX',
        'VND',
        'VUV',
        'XAF',
        'XOF',
        'XPF',
    ].includes(currency)
        ? 0
        : ['BHD', 'IQD', 'JOD', 'KWD', 'LYD', 'OMR', 'TND'].includes(currency)
          ? 3
          : 2;

function formatMoney(minor: number, currency: string): string {
    return new Intl.NumberFormat(undefined, {
        style: 'currency',
        currency,
    }).format(minor / 10 ** currencyDigits(currency));
}

function formatDate(value: string): string {
    return new Intl.DateTimeFormat(undefined, {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
    }).format(new Date(`${value.slice(0, 10)}T12:00:00`));
}

function statusLabel(status: ApiInvoice['status']): InvoiceStatus {
    return {
        draft: 'Draft',
        sent: 'Sent',
        due_soon: 'Due soon',
        overdue: 'Overdue',
        paid: 'Paid',
        cancelled: 'Cancelled',
    }[status] as InvoiceStatus;
}

async function apiRequest<T>(url: string, init?: RequestInit): Promise<T> {
    const token = document.querySelector<HTMLMetaElement>(
        'meta[name="csrf-token"]',
    )?.content;
    const headers = new Headers(init?.headers);
    headers.set('Accept', 'application/json');
    if (token) headers.set('X-CSRF-TOKEN', token);
    if (!(init?.body instanceof FormData))
        headers.set('Content-Type', 'application/json');

    const response = await fetch(url, {
        credentials: 'same-origin',
        ...init,
        headers,
    });
    const payload = await response.json();

    if (!response.ok) {
        const firstError = Object.values(payload.errors ?? {})[0];
        throw new Error(
            Array.isArray(firstError)
                ? String(firstError[0])
                : payload.message || 'Request failed',
        );
    }

    return payload as T;
}

const statusStyles: Record<InvoiceStatus, string> = {
    Draft: 'bg-neutral-100 text-neutral-700 dark:bg-[#29352f] dark:text-[#cbd5cf]',
    Sent: 'bg-[#e7f2ff] text-[#27679f] dark:bg-[#183348] dark:text-[#9ad0f5]',
    'Due soon':
        'bg-[#fff2d2] text-[#a85b04] dark:bg-[#3a2d16] dark:text-[#f3c979]',
    Overdue:
        'bg-[#fde5e5] text-[#c23832] dark:bg-[#412220] dark:text-[#f5a19c]',
    Paid: 'bg-[#e2f3e8] text-[#166442] dark:bg-[#19362a] dark:text-[#8ed1ad]',
    Cancelled:
        'bg-neutral-100 text-neutral-600 dark:bg-[#29352f] dark:text-[#a7b5ad]',
};

function StatusBadge({ status }: { status: InvoiceStatus }) {
    return (
        <span
            className={`inline-flex min-w-20 justify-center rounded-full px-3 py-1 text-xs font-semibold ${statusStyles[status]}`}
        >
            {status}
        </span>
    );
}

function InvoiceMenu({
    invoice,
    id,
    isDraft,
    canMarkPaid,
    onMarkSent,
    onMarkPaid,
}: {
    invoice: string;
    id: number;
    isDraft: boolean;
    canMarkPaid: boolean;
    onMarkSent: (id: number, number: string) => void;
    onMarkPaid: (id: number, number: string) => void;
}) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="ghost"
                    size="icon"
                    className="size-8 rounded-lg text-[#52605a] hover:bg-[#edf4ef] dark:text-[#a7b5ad] dark:hover:bg-[#223128]"
                    aria-label={`Actions for ${invoice}`}
                >
                    <MoreHorizontal className="size-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-44">
                {isDraft ? (
                    <DropdownMenuItem onSelect={() => onMarkSent(id, invoice)}>
                        Mark as sent
                    </DropdownMenuItem>
                ) : canMarkPaid ? (
                    <DropdownMenuItem onSelect={() => onMarkPaid(id, invoice)}>
                        Mark as paid
                    </DropdownMenuItem>
                ) : (
                    <DropdownMenuItem disabled>
                        No actions available
                    </DropdownMenuItem>
                )}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

export default function Dashboard() {
    const { auth } = usePage().props;
    const firstName = auth.user?.name?.split(' ')[0] || 'Alex';
    const [showAllAttention, setShowAllAttention] = useState(false);
    const [showAllRecent, setShowAllRecent] = useState(false);
    const [addOpen, setAddOpen] = useState(false);
    const [uploadOpen, setUploadOpen] = useState(false);
    const [data, setData] = useState<DashboardData | null>(null);
    const [loading, setLoading] = useState(true);
    const [loadError, setLoadError] = useState<string | null>(null);

    const loadDashboard = useCallback(async () => {
        try {
            const dashboardData =
                await apiRequest<DashboardData>('/api/dashboard');
            setData(dashboardData);
            setLoadError(null);
        } catch (error) {
            setLoadError(
                error instanceof Error
                    ? error.message
                    : 'Could not load dashboard',
            );
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        void loadDashboard();
    }, [loadDashboard]);

    const attentionInvoices = useMemo<AttentionInvoice[]>(
        () =>
            (data?.attention ?? []).map((invoice) => {
                const days = Math.round(
                    (new Date(`${invoice.due_date}T12:00:00`).getTime() -
                        new Date().setHours(12, 0, 0, 0)) /
                        86400000,
                );
                return {
                    id: invoice.id,
                    number: invoice.number,
                    description: invoice.description ?? 'Invoice',
                    client: invoice.client?.name ?? 'Client',
                    amount: formatMoney(
                        invoice.balance_due_minor,
                        invoice.currency,
                    ),
                    dueDate: formatDate(invoice.due_date),
                    timing:
                        days < 0
                            ? `${Math.abs(days)} days overdue`
                            : days === 0
                              ? 'Due today'
                              : `Due in ${days} days`,
                    status: days < 0 ? 'Overdue' : 'Due soon',
                    nextAction: invoice.next_reminder_at
                        ? 'Reminder scheduled'
                        : 'Review invoice',
                    actionDate: invoice.next_reminder_at
                        ? formatDate(invoice.next_reminder_at)
                        : 'No reminder scheduled',
                };
            }),
        [data],
    );

    const recentInvoices = useMemo<RecentInvoice[]>(
        () =>
            (data?.recent ?? []).map((invoice) => ({
                id: invoice.id,
                number: invoice.number,
                client: invoice.client?.name ?? 'Client',
                amount: formatMoney(invoice.total_minor, invoice.currency),
                issued: formatDate(invoice.issue_date),
                dueDate: formatDate(invoice.due_date),
                status: statusLabel(invoice.status),
            })),
        [data],
    );

    const currency = data?.business.currency ?? 'EUR';
    const metrics = [
        {
            label: 'Outstanding',
            value: data
                ? formatMoney(data.metrics.outstanding_minor, currency)
                : '—',
            icon: FileText,
        },
        {
            label: 'Overdue',
            value: data
                ? formatMoney(data.metrics.overdue_minor, currency)
                : '—',
            icon: AlertCircle,
            alert: true,
        },
        {
            label: 'Collected this month',
            value: data
                ? formatMoney(data.metrics.collected_month_minor, currency)
                : '—',
            icon: TrendingUp,
        },
        {
            label: 'Recovered after reminders',
            value: data
                ? formatMoney(data.metrics.recovered_minor, currency)
                : '—',
            icon: RefreshCw,
        },
    ];

    const visibleAttention = useMemo(
        () =>
            showAllAttention
                ? attentionInvoices
                : attentionInvoices.slice(0, 4),
        [showAllAttention],
    );
    const visibleRecent = useMemo(
        () => (showAllRecent ? recentInvoices : recentInvoices.slice(0, 5)),
        [recentInvoices, showAllRecent],
    );

    async function handleAddInvoice(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const form = new FormData(event.currentTarget);
        const target = event.currentTarget;

        try {
            await apiRequest('/api/invoices', {
                method: 'POST',
                body: JSON.stringify({
                    client_name: form.get('client'),
                    invoice_number: form.get('invoice_number'),
                    amount: form.get('amount'),
                    due_date: form.get('due_date'),
                }),
            });
            setAddOpen(false);
            toast.success('Invoice draft saved');
            target.reset();
            await loadDashboard();
        } catch (error) {
            toast.error(
                error instanceof Error
                    ? error.message
                    : 'Could not save invoice',
            );
        }
    }

    async function handleUpload(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const form = new FormData(event.currentTarget);
        const file = form.get('invoice_file');

        if (!(file instanceof File) || !file.name) {
            toast.error('Choose a PDF, JPG, or PNG invoice first');
            return;
        }

        const target = event.currentTarget;

        try {
            await apiRequest('/api/uploaded-documents', {
                method: 'POST',
                body: form,
            });
            setUploadOpen(false);
            toast.success(
                'File stored. Confirm its details before tracking this invoice.',
            );
            target.reset();
        } catch (error) {
            toast.error(
                error instanceof Error
                    ? error.message
                    : 'Could not upload invoice',
            );
        }
    }

    async function markPaid(id: number, number: string) {
        try {
            await apiRequest(`/api/invoices/${id}/payments`, {
                method: 'POST',
                body: '{}',
            });
            toast.success(`${number} marked as paid`);
            await loadDashboard();
        } catch (error) {
            toast.error(
                error instanceof Error
                    ? error.message
                    : 'Could not record payment',
            );
        }
    }

    async function markSent(id: number, number: string) {
        try {
            await apiRequest(`/api/invoices/${id}/send`, {
                method: 'PATCH',
                body: '{}',
            });
            toast.success(`${number} is now being tracked`);
            await loadDashboard();
        } catch (error) {
            toast.error(
                error instanceof Error
                    ? error.message
                    : 'Could not update invoice',
            );
        }
    }

    return (
        <>
            <Head title="Dashboard" />
            <div className="min-h-screen bg-[#fbfaf7] px-4 pt-5 pb-12 sm:px-6 lg:px-8 lg:pt-8 xl:px-10 dark:bg-[#0f1713]">
                <div className="mx-auto w-full max-w-[1380px]">
                    <header className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                        <div>
                            <h1 className="text-3xl font-semibold tracking-[-0.045em] text-[#111915] sm:text-4xl dark:text-[#f2f6f3]">
                                Good morning, {firstName}
                            </h1>
                            <p className="mt-2 text-base text-[#68736d] sm:text-lg dark:text-[#9caca2]">
                                Here’s what’s happening with your invoices
                                today.
                            </p>
                        </div>
                        <div className="xs:flex-row flex flex-col gap-3 sm:flex-row">
                            <Dialog open={addOpen} onOpenChange={setAddOpen}>
                                <DialogTrigger asChild>
                                    <Button className="h-12 rounded-xl bg-[#126044] px-5 text-sm font-semibold text-white shadow-[0_8px_24px_rgba(18,96,68,0.16)] hover:bg-[#0e5038] dark:bg-[#4fae80] dark:text-[#07110c] dark:hover:bg-[#64c293]">
                                        <Plus className="size-4" />
                                        Add invoice
                                    </Button>
                                </DialogTrigger>
                                <DialogContent className="rounded-2xl border-[#dce5de] sm:max-w-[520px] dark:border-[#2b3a32]">
                                    <DialogHeader>
                                        <DialogTitle className="text-xl tracking-[-0.025em]">
                                            Add an invoice
                                        </DialogTitle>
                                        <DialogDescription>
                                            Start with the essentials. You can
                                            add line items and reminders next.
                                        </DialogDescription>
                                    </DialogHeader>
                                    <form
                                        onSubmit={handleAddInvoice}
                                        className="space-y-4"
                                    >
                                        <div className="grid gap-4 sm:grid-cols-2">
                                            <div className="space-y-2">
                                                <Label htmlFor="client">
                                                    Client
                                                </Label>
                                                <Input
                                                    id="client"
                                                    name="client"
                                                    placeholder="Northstar Studio"
                                                    required
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="invoice_number">
                                                    Invoice number
                                                </Label>
                                                <Input
                                                    id="invoice_number"
                                                    name="invoice_number"
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div className="grid gap-4 sm:grid-cols-2">
                                            <div className="space-y-2">
                                                <Label htmlFor="amount">
                                                    Amount
                                                </Label>
                                                <Input
                                                    id="amount"
                                                    name="amount"
                                                    type="number"
                                                    min={
                                                        10 **
                                                        -currencyDigits(
                                                            currency,
                                                        )
                                                    }
                                                    step={
                                                        10 **
                                                        -currencyDigits(
                                                            currency,
                                                        )
                                                    }
                                                    placeholder="800"
                                                    required
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="due_date">
                                                    Due date
                                                </Label>
                                                <Input
                                                    id="due_date"
                                                    name="due_date"
                                                    type="date"
                                                    defaultValue={new Date(
                                                        Date.now() +
                                                            30 * 86400000,
                                                    )
                                                        .toISOString()
                                                        .slice(0, 10)}
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <DialogFooter>
                                            <Button
                                                type="button"
                                                variant="outline"
                                                onClick={() =>
                                                    setAddOpen(false)
                                                }
                                            >
                                                Cancel
                                            </Button>
                                            <Button
                                                type="submit"
                                                className="bg-[#126044] text-white hover:bg-[#0e5038] dark:bg-[#4fae80] dark:text-[#07110c] dark:hover:bg-[#64c293]"
                                            >
                                                Save draft
                                            </Button>
                                        </DialogFooter>
                                    </form>
                                </DialogContent>
                            </Dialog>

                            <Dialog
                                open={uploadOpen}
                                onOpenChange={setUploadOpen}
                            >
                                <DialogTrigger asChild>
                                    <Button
                                        variant="outline"
                                        className="h-12 rounded-xl border-[#b9c5bd] bg-white px-5 text-sm font-semibold text-[#17211b] hover:border-[#126044] hover:bg-[#f3f8f4] dark:border-[#405248] dark:bg-[#17221c] dark:text-[#edf3ef] dark:hover:border-[#59b88a] dark:hover:bg-[#213128]"
                                    >
                                        <Upload className="size-4" />
                                        Upload invoice
                                    </Button>
                                </DialogTrigger>
                                <DialogContent className="rounded-2xl border-[#dce5de] sm:max-w-[520px] dark:border-[#2b3a32]">
                                    <DialogHeader>
                                        <DialogTitle className="text-xl tracking-[-0.025em]">
                                            Upload an existing invoice
                                        </DialogTitle>
                                        <DialogDescription>
                                            We’ll store the file privately. It
                                            will not be tracked until its
                                            details are confirmed.
                                        </DialogDescription>
                                    </DialogHeader>
                                    <form
                                        onSubmit={handleUpload}
                                        className="space-y-5"
                                    >
                                        <Label
                                            htmlFor="invoice_file"
                                            className="flex min-h-44 cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed border-[#a9bbb0] bg-[#f6faf7] px-6 text-center transition hover:border-[#126044] hover:bg-[#eef6f0] dark:border-[#405248] dark:bg-[#111a16] dark:hover:border-[#59b88a] dark:hover:bg-[#1a2b22]"
                                        >
                                            <Upload className="mb-3 size-7 text-[#126044] dark:text-[#69c799]" />
                                            <span className="font-semibold text-[#17211b] dark:text-[#edf3ef]">
                                                Choose your invoice
                                            </span>
                                            <span className="mt-1 text-sm font-normal text-[#6b756f] dark:text-[#9caca2]">
                                                PDF, JPG, or PNG · up to 10 MB
                                            </span>
                                        </Label>
                                        <Input
                                            id="invoice_file"
                                            name="invoice_file"
                                            type="file"
                                            accept=".pdf,.jpg,.jpeg,.png"
                                            className="sr-only"
                                        />
                                        <DialogFooter>
                                            <Button
                                                type="button"
                                                variant="outline"
                                                onClick={() =>
                                                    setUploadOpen(false)
                                                }
                                            >
                                                Cancel
                                            </Button>
                                            <Button
                                                type="submit"
                                                className="bg-[#126044] text-white hover:bg-[#0e5038] dark:bg-[#4fae80] dark:text-[#07110c] dark:hover:bg-[#64c293]"
                                            >
                                                Stage upload
                                            </Button>
                                        </DialogFooter>
                                    </form>
                                </DialogContent>
                            </Dialog>
                        </div>
                    </header>

                    {loadError && (
                        <div
                            role="alert"
                            className="mt-6 flex items-center justify-between gap-4 rounded-xl border border-[#e9b9b5] bg-[#fff1ef] px-4 py-3 text-sm text-[#9e302a] dark:border-[#633a35] dark:bg-[#2d1d1b] dark:text-[#f5aaa3]"
                        >
                            <span>{loadError}</span>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => void loadDashboard()}
                            >
                                Retry
                            </Button>
                        </div>
                    )}

                    <section
                        id="metrics"
                        aria-label="Invoice summary"
                        className="mt-7 grid overflow-hidden rounded-2xl border border-[#d7e6db] bg-[#eef6f0] sm:grid-cols-2 xl:grid-cols-4 dark:border-[#2b4436] dark:bg-[#16251d]"
                    >
                        {metrics.map(
                            ({ label, value, icon: Icon, alert }, index) => (
                                <div
                                    key={label}
                                    className={`flex min-h-28 items-center gap-4 px-5 py-5 sm:px-7 ${index > 0 ? 'border-t border-[#d7e6db] sm:border-t-0 xl:border-l dark:border-[#2b4436] sm:[&:nth-child(2n)]:border-l' : ''} ${index > 1 ? 'sm:border-t xl:border-t-0' : ''}`}
                                >
                                    <Icon
                                        className={`size-6 shrink-0 ${alert ? 'text-[#e34b43] dark:text-[#f07870]' : 'text-[#126044] dark:text-[#69c799]'}`}
                                        strokeWidth={1.9}
                                    />
                                    <dl>
                                        <dt className="text-sm text-[#67736c] dark:text-[#9caca2]">
                                            {label}
                                        </dt>
                                        <dd className="mt-1 text-2xl font-semibold tracking-[-0.035em] text-[#111915] dark:text-[#f2f6f3]">
                                            {value}
                                        </dd>
                                    </dl>
                                </div>
                            ),
                        )}
                    </section>

                    <section
                        id="needs-attention"
                        className="mt-6 overflow-hidden rounded-2xl border border-[#dfe5df] bg-white shadow-[0_8px_28px_rgba(27,52,39,0.035)] dark:border-[#2a3931] dark:bg-[#151f1a] dark:shadow-none"
                    >
                        <div className="flex items-start justify-between gap-4 px-5 pt-5 pb-4 sm:px-6">
                            <div>
                                <h2 className="text-xl font-semibold tracking-[-0.03em] text-[#111915] dark:text-[#f2f6f3]">
                                    Needs attention
                                </h2>
                                <p className="mt-1 text-sm text-[#77817b] dark:text-[#93a49a]">
                                    Invoices that are overdue or need a
                                    follow-up soon.
                                </p>
                            </div>
                            <Button
                                variant="outline"
                                size="sm"
                                className="rounded-lg border-[#cdd6cf] bg-white dark:border-[#405248] dark:bg-[#17221c] dark:text-[#d9e3dd] dark:hover:bg-[#213128]"
                                disabled={attentionInvoices.length <= 4}
                                onClick={() =>
                                    setShowAllAttention((current) => !current)
                                }
                            >
                                {showAllAttention ? 'Show less' : 'Show more'}
                            </Button>
                        </div>
                        <div className="overflow-x-auto px-5 pb-4 sm:px-6">
                            <table className="w-full min-w-[900px] border-collapse text-left">
                                <thead>
                                    <tr className="border-b border-[#e2e7e3] text-[11px] font-semibold tracking-[0.12em] text-[#77817b] uppercase dark:border-[#2a3931] dark:text-[#8fa097]">
                                        <th className="px-1 py-3">Invoice</th>
                                        <th className="px-3 py-3">Client</th>
                                        <th className="px-3 py-3">Amount</th>
                                        <th className="px-3 py-3">Due date</th>
                                        <th className="px-3 py-3">Status</th>
                                        <th className="px-3 py-3">
                                            Next action
                                        </th>
                                        <th className="w-10 py-3">
                                            <span className="sr-only">
                                                Actions
                                            </span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {visibleAttention.map((invoice) => (
                                        <tr
                                            key={invoice.number}
                                            className="border-b border-[#e8ece9] last:border-0 hover:bg-[#fbfcfa] dark:border-[#25332c] dark:hover:bg-[#19251f]"
                                        >
                                            <td className="px-1 py-3">
                                                <div className="flex items-center gap-3">
                                                    <FileText className="size-4 shrink-0 text-[#27352e] dark:text-[#aebbb4]" />
                                                    <div>
                                                        <p className="text-sm font-semibold text-[#17211b] dark:text-[#edf3ef]">
                                                            {invoice.number}
                                                        </p>
                                                        <p className="mt-0.5 text-xs text-[#8a928d] dark:text-[#87978e]">
                                                            {
                                                                invoice.description
                                                            }
                                                        </p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-3 py-3 text-sm text-[#26312b] dark:text-[#cbd5cf]">
                                                {invoice.client}
                                            </td>
                                            <td className="px-3 py-3 text-sm font-medium text-[#17211b] dark:text-[#edf3ef]">
                                                {invoice.amount}
                                            </td>
                                            <td className="px-3 py-3">
                                                <p className="text-sm text-[#26312b] dark:text-[#cbd5cf]">
                                                    {invoice.dueDate}
                                                </p>
                                                <p
                                                    className={`mt-0.5 text-xs ${invoice.status === 'Overdue' ? 'text-[#de433b] dark:text-[#f07870]' : 'text-[#7e8781] dark:text-[#8fa097]'}`}
                                                >
                                                    {invoice.timing}
                                                </p>
                                            </td>
                                            <td className="px-3 py-3">
                                                <StatusBadge
                                                    status={invoice.status}
                                                />
                                            </td>
                                            <td className="px-3 py-3">
                                                <div className="flex items-center gap-3">
                                                    <Clock3 className="size-4 text-[#56635c] dark:text-[#9eafa5]" />
                                                    <div>
                                                        <p className="text-sm font-medium text-[#26312b] dark:text-[#cbd5cf]">
                                                            {invoice.nextAction}
                                                        </p>
                                                        <p className="mt-0.5 text-xs text-[#8a928d] dark:text-[#87978e]">
                                                            {invoice.actionDate}
                                                        </p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="py-3 text-right">
                                                <InvoiceMenu
                                                    invoice={invoice.number}
                                                    id={invoice.id}
                                                    isDraft={false}
                                                    canMarkPaid={true}
                                                    onMarkSent={markSent}
                                                    onMarkPaid={markPaid}
                                                />
                                            </td>
                                        </tr>
                                    ))}
                                    {visibleAttention.length === 0 && (
                                        <tr>
                                            <td
                                                colSpan={7}
                                                className="px-1 py-8 text-center text-sm text-[#77817b] dark:text-[#93a49a]"
                                            >
                                                {loading
                                                    ? 'Loading invoices…'
                                                    : 'You’re all caught up. No invoices need attention.'}
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </section>

                    <section
                        id="recent-invoices"
                        className="mt-6 overflow-hidden rounded-2xl border border-[#dfe5df] bg-white shadow-[0_8px_28px_rgba(27,52,39,0.035)] dark:border-[#2a3931] dark:bg-[#151f1a] dark:shadow-none"
                    >
                        <div className="flex items-start justify-between gap-4 px-5 pt-5 pb-4 sm:px-6">
                            <div>
                                <h2 className="text-xl font-semibold tracking-[-0.03em] text-[#111915] dark:text-[#f2f6f3]">
                                    Recent invoices
                                </h2>
                                <p className="mt-1 text-sm text-[#77817b] dark:text-[#93a49a]">
                                    Your latest invoices and their status.
                                </p>
                            </div>
                            <Button
                                variant="outline"
                                size="sm"
                                className="rounded-lg border-[#cdd6cf] bg-white dark:border-[#405248] dark:bg-[#17221c] dark:text-[#d9e3dd] dark:hover:bg-[#213128]"
                                disabled={recentInvoices.length <= 5}
                                onClick={() =>
                                    setShowAllRecent((current) => !current)
                                }
                            >
                                {showAllRecent ? 'Show less' : 'Show more'}
                            </Button>
                        </div>
                        <div className="overflow-x-auto px-5 pb-5 sm:px-6">
                            <table className="w-full min-w-[800px] border-collapse text-left">
                                <thead>
                                    <tr className="border-b border-[#e2e7e3] text-[11px] font-semibold tracking-[0.12em] text-[#77817b] uppercase dark:border-[#2a3931] dark:text-[#8fa097]">
                                        <th className="px-1 py-3">Invoice</th>
                                        <th className="px-3 py-3">Client</th>
                                        <th className="px-3 py-3">Amount</th>
                                        <th className="px-3 py-3">Issued</th>
                                        <th className="px-3 py-3">Due date</th>
                                        <th className="px-3 py-3">Status</th>
                                        <th className="w-10 py-3">
                                            <span className="sr-only">
                                                Actions
                                            </span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {visibleRecent.map((invoice, index) => (
                                        <tr
                                            key={`${invoice.number}-${index}`}
                                            className="border-b border-[#e8ece9] last:border-0 hover:bg-[#fbfcfa] dark:border-[#25332c] dark:hover:bg-[#19251f]"
                                        >
                                            <td className="px-1 py-2.5">
                                                <div className="flex items-center gap-3">
                                                    <FileText className="size-4 shrink-0 text-[#27352e] dark:text-[#aebbb4]" />
                                                    <span className="text-sm font-semibold text-[#17211b] dark:text-[#edf3ef]">
                                                        {invoice.number}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-3 py-2.5 text-sm text-[#344039] dark:text-[#c2cec7]">
                                                {invoice.client}
                                            </td>
                                            <td className="px-3 py-2.5 text-sm font-medium text-[#17211b] dark:text-[#edf3ef]">
                                                {invoice.amount}
                                            </td>
                                            <td className="px-3 py-2.5 text-sm text-[#52605a] dark:text-[#9eafa5]">
                                                {invoice.issued}
                                            </td>
                                            <td className="px-3 py-2.5 text-sm text-[#52605a] dark:text-[#9eafa5]">
                                                {invoice.dueDate}
                                            </td>
                                            <td className="px-3 py-2.5">
                                                <StatusBadge
                                                    status={invoice.status}
                                                />
                                            </td>
                                            <td className="py-2.5 text-right">
                                                <InvoiceMenu
                                                    invoice={invoice.number}
                                                    id={invoice.id}
                                                    isDraft={
                                                        invoice.status ===
                                                        'Draft'
                                                    }
                                                    canMarkPaid={[
                                                        'Sent',
                                                        'Due soon',
                                                        'Overdue',
                                                    ].includes(invoice.status)}
                                                    onMarkSent={markSent}
                                                    onMarkPaid={markPaid}
                                                />
                                            </td>
                                        </tr>
                                    ))}
                                    {visibleRecent.length === 0 && (
                                        <tr>
                                            <td
                                                colSpan={7}
                                                className="px-1 py-8 text-center text-sm text-[#77817b] dark:text-[#93a49a]"
                                            >
                                                {loading
                                                    ? 'Loading invoices…'
                                                    : 'No invoices yet. Add your first invoice to start tracking.'}
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </section>
                </div>
            </div>
        </>
    );
}

Dashboard.layout = {
    breadcrumbs: [{ title: 'Dashboard', href: dashboard() }],
};
