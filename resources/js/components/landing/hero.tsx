import { Link } from '@inertiajs/react';
import {
    ArrowRight,
    Check,
    CircleAlert,
    CircleDollarSign,
    Clock3,
    FileText,
    MailCheck,
    Play,
    TrendingUp,
} from 'lucide-react';
import { dashboard, register } from '@/routes';
import { Container } from './shared';

const journey = [
    { icon: CircleAlert, title: 'Becomes overdue', date: 'Nov 16, 2026', tone: 'danger' },
    { icon: MailCheck, title: 'PayMe reminder sent', date: 'Nov 17, 2026', tone: 'brand' },
    { icon: CircleDollarSign, title: 'Client pays', date: 'Nov 20, 2026', tone: 'brand' },
    { icon: Check, title: '€800 recovered', date: 'Nov 20, 2026', tone: 'success' },
] as const;

const metrics = [
    { label: 'Outstanding', value: '€4,850', icon: FileText, tone: 'text-[#1f2b25]' },
    { label: 'Overdue', value: '€2,100', icon: Clock3, tone: 'text-[#c94039]' },
    { label: 'Collected this month', value: '€7,420', icon: TrendingUp, tone: 'text-[#176246]' },
    { label: 'After PayMe reminders', value: '€1,350', icon: CircleDollarSign, tone: 'text-[#176246]' },
] as const;

export function Hero({ authenticated }: { authenticated: boolean }) {
    const primaryHref = authenticated ? dashboard().url : register().url;

    return (
        <section id="top" className="overflow-hidden bg-[#faf8f2] pb-16 pt-14 sm:pb-20 sm:pt-20 lg:pb-24 lg:pt-6">
            <Container>
                <div className="mx-auto max-w-4xl text-center">
                    <div className="inline-flex items-center gap-2 rounded-full border border-[#d6e6dc] bg-[#e8f2eb] px-4 py-2 text-sm font-semibold text-[#14563e]">
                        <CircleDollarSign className="size-4" aria-hidden="true" />
                        Invoice chasing, automated.
                    </div>
                    <h1 className="mx-auto mt-7 max-w-3xl text-balance text-[clamp(2.8rem,6vw,4.5rem)] font-semibold leading-[0.98] tracking-[-0.065em] text-[#101714]">
                        You did the work.
                        <span className="mt-2 block text-[#126044]">PayMe gets you paid.</span>
                    </h1>
                    <p className="mx-auto mt-5 max-w-3xl text-pretty text-lg leading-8 text-[#53605a] sm:text-xl">
                        Track invoices, automatically follow up when payments become overdue, and stop sending awkward “just checking in” emails yourself.
                    </p>
                    <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
                        <Link
                            href={primaryHref}
                            className="inline-flex min-h-13 w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#126044] px-7 py-3.5 text-sm font-semibold text-white shadow-[0_10px_30px_rgba(18,96,68,0.2)] transition duration-200 hover:-translate-y-0.5 hover:bg-[#0e5038] focus-visible:ring-3 focus-visible:ring-[#73b998] focus-visible:outline-none sm:w-auto"
                        >
                            {authenticated ? 'Open your dashboard' : 'Start chasing invoices for free'}
                            <ArrowRight className="size-4" aria-hidden="true" />
                        </Link>
                        <a
                            href="#how-it-works"
                            className="inline-flex min-h-13 w-full cursor-pointer items-center justify-center gap-2 rounded-xl border border-[#9caaa1] bg-white px-7 py-3.5 text-sm font-semibold text-[#1d2822] transition duration-200 hover:border-[#126044] hover:bg-[#f3f8f4] focus-visible:ring-3 focus-visible:ring-[#73b998] focus-visible:outline-none sm:w-auto"
                        >
                            <Play className="size-4 fill-current" aria-hidden="true" />
                            See how it works
                        </a>
                    </div>
                    <div className="mt-4 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-sm text-[#6d766f]">
                        <span>No credit card required.</span>
                        <span className="hidden h-4 w-px bg-[#cbd2cc] sm:block" aria-hidden="true" />
                        <span>Built for freelancers and small businesses.</span>
                    </div>
                </div>

                <div className="relative left-1/2 mt-12 w-[calc(100vw-2.5rem)] max-w-[1440px] -translate-x-1/2 rounded-[28px] border border-[#dbe8de] bg-[#e9f3eb] p-4 shadow-[0_24px_80px_rgba(32,68,48,0.12)] sm:p-6 lg:mt-8 lg:p-8">
                    <div className="grid gap-5 lg:grid-cols-[250px_1fr_300px] lg:items-stretch xl:grid-cols-[310px_1fr_390px]">
                        <article className="rounded-2xl border border-[#dbe2dc] bg-white p-5 shadow-[0_8px_24px_rgba(29,48,38,0.07)]">
                            <div className="flex items-center justify-between border-b border-[#e5e9e5] pb-4">
                                <div className="flex items-center gap-2 text-sm font-semibold text-[#152019]">
                                    <FileText className="size-4 text-[#176246]" aria-hidden="true" />
                                    Invoice #INV-0042
                                </div>
                                <span className="size-1 rounded-full bg-[#68736c]" aria-hidden="true" />
                            </div>
                            <div className="py-5">
                                <p className="font-semibold text-[#142019]">John Doe</p>
                                <p className="mt-1 text-xs text-[#758078]">Consulting services</p>
                            </div>
                            <dl className="space-y-3 border-t border-[#e5e9e5] pt-4 text-sm">
                                <div className="flex items-center justify-between"><dt className="text-[#707a73]">Amount</dt><dd className="font-semibold">€800</dd></div>
                                <div className="flex items-center justify-between"><dt className="text-[#707a73]">Due date</dt><dd className="font-semibold">Nov 15, 2026</dd></div>
                                <div className="flex items-center justify-between"><dt className="text-[#707a73]">Status</dt><dd className="rounded-full bg-[#fde7e5] px-3 py-1 text-xs font-semibold text-[#ba332d]">Overdue</dd></div>
                            </dl>
                        </article>

                        <div className="relative grid grid-cols-2 gap-x-4 gap-y-6 px-1 py-3 sm:grid-cols-4 lg:px-2 lg:py-8">
                            <div className="absolute top-[58px] right-[12%] left-[12%] hidden h-px bg-[#76a88f] sm:block" aria-hidden="true" />
                            {journey.map(({ icon: Icon, title, date, tone }) => (
                                <div key={title} className="relative z-10 text-center">
                                    <span className={`mx-auto grid size-11 place-items-center rounded-full border-4 border-[#e9f3eb] ${tone === 'danger' ? 'bg-[#ed6b63] text-white' : 'bg-[#176246] text-white'}`}>
                                        <Icon className="size-5" strokeWidth={2} aria-hidden="true" />
                                    </span>
                                    <p className="mt-4 text-sm font-semibold leading-5 text-[#17211b]">{title}</p>
                                    <p className="mt-1 text-xs text-[#748078]">{date}</p>
                                </div>
                            ))}
                        </div>

                        <article className="rounded-2xl border border-[#dbe2dc] bg-white p-5 shadow-[0_8px_24px_rgba(29,48,38,0.07)]">
                            <div className="flex items-center justify-between">
                                <h2 className="text-sm font-semibold text-[#142019]">Your overview</h2>
                                <span className="text-xs text-[#748078]">This month</span>
                            </div>
                            <dl className="mt-4 grid grid-cols-2 gap-2.5">
                                {metrics.map(({ label, value, icon: Icon, tone }) => (
                                    <div key={label} className="rounded-xl border border-[#e3e8e3] p-3">
                                        <Icon className="size-4 text-[#176246]" strokeWidth={1.8} aria-hidden="true" />
                                        <dt className="mt-3 text-[11px] leading-4 text-[#748078]">{label}</dt>
                                        <dd className={`mt-1 text-lg font-semibold tracking-[-0.035em] ${tone}`}>{value}</dd>
                                    </div>
                                ))}
                            </dl>
                        </article>
                    </div>
                </div>
            </Container>
        </section>
    );
}
