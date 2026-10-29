export type Client = {
    id: number;
    name: string;
    company: string | null;
    email: string | null;
    phone: string | null;
    address: string | null;
    country: string | null;
    currency: string | null;
    notes: string | null;
    created_at: string;
};

export type Invoice = {
    id: number;
    number: string;
    client: Client;
    description: string | null;
    currency: string;
    total_minor: number;
    balance_due_minor: number;
    status: "draft" | "sent" | "due_soon" | "overdue" | "paid" | "cancelled";
    issue_date: string;
    due_date: string;
    sent_at: string | null;
    paid_at: string | null;
    items?: { description: string; quantity: string; total_minor: number }[];
    payments?: { amount_minor: number; method: string; paid_at: string }[];
    events?: { type: string; occurred_at: string }[];
};

export type CursorPage<T> = { data: T[]; links: { next: string | null; prev: string | null } };

export async function apiRequest<T>(url: string, init?: RequestInit): Promise<T> {
    const headers = new Headers(init?.headers);
    headers.set("Accept", "application/json");
    if (!(init?.body instanceof FormData)) headers.set("Content-Type", "application/json");
    const csrf = document.querySelector<HTMLMetaElement>('meta[name="csrf-token"]')?.content;
    if (csrf) headers.set("X-CSRF-TOKEN", csrf);

    const response = await fetch(url, { credentials: "same-origin", ...init, headers });
    if (response.status === 204) return undefined as T;
    const payload = await response.json();
    if (!response.ok) {
        const first = Object.values(payload.errors ?? {})[0];
        throw new Error(
            Array.isArray(first) ? String(first[0]) : payload.message || "Request failed",
        );
    }
    return payload as T;
}

export function money(minor: number, currency = "EUR") {
    const zero = [
        "BIF",
        "CLP",
        "DJF",
        "GNF",
        "JPY",
        "KMF",
        "KRW",
        "PYG",
        "RWF",
        "UGX",
        "VND",
        "VUV",
        "XAF",
        "XOF",
        "XPF",
    ];
    const three = ["BHD", "IQD", "JOD", "KWD", "LYD", "OMR", "TND"];
    const digits = zero.includes(currency) ? 0 : three.includes(currency) ? 3 : 2;
    return new Intl.NumberFormat(undefined, { style: "currency", currency }).format(
        minor / 10 ** digits,
    );
}

export function date(value: string | null | undefined) {
    if (!value) return "—";
    return new Intl.DateTimeFormat(undefined, {
        month: "short",
        day: "numeric",
        year: "numeric",
    }).format(new Date(`${value.slice(0, 10)}T12:00:00`));
}

export function today() {
    return new Date().toISOString().slice(0, 10);
}
