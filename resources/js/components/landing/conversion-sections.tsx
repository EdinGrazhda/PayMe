import { Link } from '@inertiajs/react';
import {
    ArrowRight,
    Building2,
    Check,
    ChevronDown,
    CircleDollarSign,
    DatabaseZap,
    FileLock2,
    LockKeyhole,
    ShieldCheck,
    Users,
} from 'lucide-react';
import { useMemo, useState } from 'react';
import { dashboard, login, register } from '@/routes';
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { Container, PayMeLogo, PrimaryLink, SectionHeading } from './shared';

const plans = [
    {
        name: 'Free',
        price: '€0',
        period: 'forever',
        features: ['3 tracked invoices / month', 'Basic reminders', 'Invoice dashboard'],
        cta: 'Start free',
        popular: false,
    },
    {
        name: 'Solo',
        price: '€9',
        period: '/ month',
        features: ['25 tracked invoices', 'Automatic reminders', 'Invoice uploads', 'Smart reminder assistance', 'Reminder timeline'],
        cta: 'Start free',
        popular: true,
    },
    {
        name: 'Pro',
        price: '€19',
        period: '/ month',
        features: ['Higher invoice limits', 'Advanced reminder rules', 'Custom branding', 'Advanced analytics', 'Priority support'],
        cta: 'Start Pro',
        popular: false,
    },
    {
        name: 'Agency',
        price: '€39',
        period: '/ month',
        features: ['Team features', 'Multiple users', 'Higher limits', 'Advanced reporting'],
        cta: 'Start Agency',
        popular: false,
    },
] as const;

export function PricingSection() {
    return (
        <section id="pricing" className="scroll-mt-20 bg-white py-20 sm:py-28">
            <Container>
                <SectionHeading
                    eyebrow="Simple pricing"
                    title="Cheaper than one unpaid hour."
                    copy="Start free. Upgrade when PayMe becomes part of your workflow. Cancel anytime."
                />
                <div className="mt-14 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                    {plans.map((plan) => (
                        <article key={plan.name} className={`relative flex flex-col rounded-2xl border p-6 ${plan.popular ? 'border-[#176246] bg-[#f1f8f3] shadow-[0_16px_40px_rgba(23,98,70,0.12)]' : 'border-[#dfe5df] bg-[#fcfdfb]'}`}>
                            {plan.popular && <span className="absolute -top-3 left-5 rounded-full bg-[#176246] px-3 py-1 text-[11px] font-bold tracking-[0.08em] text-white uppercase">Most popular</span>}
                            <h3 className="text-sm font-bold tracking-[0.13em] text-[#176246] uppercase">{plan.name}</h3>
                            <div className="mt-5 flex items-end gap-2"><span className="text-4xl font-semibold tracking-[-0.055em] text-[#111814]">{plan.price}</span><span className="pb-1 text-sm text-[#6c766f]">{plan.period}</span></div>
                            <ul className="mt-7 flex-1 space-y-3">
                                {plan.features.map((feature) => (
                                    <li key={feature} className="flex gap-2.5 text-sm leading-5 text-[#59645d]"><Check className="mt-0.5 size-4 shrink-0 text-[#176246]" aria-hidden="true" />{feature}</li>
                                ))}
                            </ul>
                            <Link
                                href={register()}
                                className={`mt-8 inline-flex min-h-11 cursor-pointer items-center justify-center rounded-xl px-4 text-sm font-semibold transition-colors focus-visible:ring-3 focus-visible:ring-[#73b998] focus-visible:outline-none ${plan.popular ? 'bg-[#126044] text-white hover:bg-[#0e5038]' : 'border border-[#b7c2ba] bg-white text-[#213029] hover:border-[#176246] hover:bg-[#edf5ef]'}`}
                            >
                                {plan.cta}
                            </Link>
                        </article>
                    ))}
                </div>
                <p className="mt-5 text-center text-sm text-[#6d766f]">Cancel anytime. No fixed contracts.</p>
            </Container>
        </section>
    );
}

export function RoiCalculator() {
    const [invoice, setInvoice] = useState(800);
    const [overdue, setOverdue] = useState(3);
    const tiedUp = useMemo(() => invoice * overdue, [invoice, overdue]);
    const money = new Intl.NumberFormat('en-IE', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 });

    return (
        <section className="bg-[#f5f6f1] py-20 sm:py-28">
            <Container>
                <div className="grid items-center gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
                    <SectionHeading
                        align="left"
                        eyebrow="Potential value"
                        title="What would one recovered invoice be worth?"
                        copy="This is a planning tool, not a promise. See how much money is currently tied up in overdue work."
                    />
                    <div className="rounded-3xl border border-[#dce3dd] bg-white p-6 shadow-[0_16px_50px_rgba(31,64,45,0.08)] sm:p-9">
                        <div className="grid gap-6 sm:grid-cols-2">
                            <label className="block text-sm font-semibold text-[#26312b]">
                                Average invoice
                                <div className="mt-2 flex h-12 items-center rounded-xl border border-[#cdd6cf] px-4 focus-within:ring-3 focus-within:ring-[#73b998]">
                                    <span className="text-[#68736c]">€</span>
                                    <input
                                        type="number"
                                        inputMode="decimal"
                                        min="1"
                                        max="100000"
                                        value={invoice}
                                        onChange={(event) => setInvoice(Math.max(1, Number(event.target.value) || 1))}
                                        className="h-full min-w-0 flex-1 bg-transparent px-2 font-semibold outline-none"
                                    />
                                </div>
                            </label>
                            <label className="block text-sm font-semibold text-[#26312b]">
                                Overdue invoices per month
                                <input
                                    type="number"
                                    inputMode="numeric"
                                    min="1"
                                    max="1000"
                                    value={overdue}
                                    onChange={(event) => setOverdue(Math.max(1, Number(event.target.value) || 1))}
                                    className="mt-2 h-12 w-full rounded-xl border border-[#cdd6cf] bg-transparent px-4 font-semibold outline-none focus:ring-3 focus:ring-[#73b998]"
                                />
                            </label>
                        </div>
                        <div className="mt-7 grid gap-3 rounded-2xl bg-[#edf5ef] p-5 sm:grid-cols-[1fr_auto] sm:items-end">
                            <div><p className="text-sm text-[#587063]">Monthly money currently tied up</p><p className="mt-2 text-4xl font-semibold tracking-[-0.055em] text-[#12563f]" aria-live="polite">{money.format(tiedUp)}</p></div>
                            <div className="sm:text-right"><p className="text-xs text-[#6b766f]">PayMe Solo</p><p className="mt-1 font-semibold text-[#17211b]">€9 / month</p></div>
                        </div>
                        <p className="mt-5 text-sm leading-6 text-[#67716b]">If PayMe helps you stay on top of even one overdue {money.format(invoice)} invoice, that potential value is significantly more than the monthly subscription.</p>
                    </div>
                </div>
            </Container>
        </section>
    );
}

const trustItems = [
    ['Secure authentication', 'Modern account security with verified access.', LockKeyhole],
    ['Encrypted connections', 'Invoice data travels over encrypted connections in production.', ShieldCheck],
    ['Private invoice data', 'Your invoice details stay inside your account.', FileLock2],
    ['Secure document storage', 'Documents are designed to use protected storage.', DatabaseZap],
    ['Strict account separation', 'Every workspace is scoped to its own users and records.', Users],
] as const;

export function SecuritySection() {
    return (
        <section className="bg-white py-20 sm:py-28">
            <Container>
                <SectionHeading
                    eyebrow="Trust by default"
                    title="Your invoices are your business. We treat them that way."
                    copy="Clear controls and sensible security practices—without borrowed certification badges or vague promises."
                />
                <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
                    {trustItems.map(([title, copy, Icon]) => (
                        <article key={title} className="border-t border-[#dfe5df] pt-6">
                            <Icon className="size-5 text-[#176246]" strokeWidth={1.8} aria-hidden="true" />
                            <h3 className="mt-5 font-semibold text-[#17211b]">{title}</h3>
                            <p className="mt-2 text-sm leading-6 text-[#68736c]">{copy}</p>
                        </article>
                    ))}
                </div>
            </Container>
        </section>
    );
}

const faqs = [
    ['Is PayMe accounting software?', 'No. PayMe focuses specifically on tracking invoices and following up on unpaid invoices.'],
    ['Do I need to create my invoices in PayMe?', 'No. You can create one in PayMe or upload an existing invoice and confirm the extracted details before tracking begins.'],
    ['Will PayMe automatically email my clients?', 'If automatic reminders are enabled, PayMe can send reminders according to the schedule you configure.'],
    ['Can I edit reminders before they’re sent?', 'Yes. You remain in control of the communication and can review or edit reminders before they go out.'],
    ['What happens when a client pays?', 'The invoice can be marked paid or updated through a supported payment connection. Future scheduled reminders are then cancelled.'],
    ['Will my clients know PayMe is involved?', 'Sender and branding details are shown during setup so you can review exactly what your client will see before reminders are enabled.'],
    ['Can PayMe send aggressive debt collection messages?', 'No. PayMe is intended for professional invoice reminders, not harassment or legal debt collection.'],
    ['Does PayMe guarantee payment?', 'No. PayMe helps you follow up consistently, but it cannot guarantee that a client will pay.'],
    ['Can I cancel anytime?', 'Yes. PayMe plans are intended to run without fixed contracts.'],
] as const;

export function FaqSection() {
    const [open, setOpen] = useState<string | null>(faqs[0][0]);

    return (
        <section id="faq" className="scroll-mt-20 bg-[#f5f6f1] py-20 sm:py-28">
            <Container>
                <div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
                    <SectionHeading align="left" eyebrow="FAQ" title="The practical questions, answered." copy="PayMe is focused on professional follow-up—not accounting, collections, or guaranteed outcomes." />
                    <div className="divide-y divide-[#d7dfd8] border-y border-[#d7dfd8]">
                        {faqs.map(([question, answer]) => {
                            const isOpen = open === question;

                            return (
                                <Collapsible key={question} open={isOpen} onOpenChange={(next) => setOpen(next ? question : null)}>
                                    <CollapsibleTrigger asChild>
                                        <button type="button" className="flex min-h-16 w-full cursor-pointer items-center justify-between gap-5 py-4 text-left font-semibold text-[#17211b] focus-visible:ring-3 focus-visible:ring-[#73b998] focus-visible:outline-none" aria-expanded={isOpen}>
                                            {question}
                                            <ChevronDown className={`size-5 shrink-0 text-[#176246] transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} aria-hidden="true" />
                                        </button>
                                    </CollapsibleTrigger>
                                    <CollapsibleContent className="overflow-hidden data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down">
                                        <p className="max-w-2xl pb-5 pr-10 text-sm leading-7 text-[#657069]">{answer}</p>
                                    </CollapsibleContent>
                                </Collapsible>
                            );
                        })}
                    </div>
                </div>
            </Container>
        </section>
    );
}

export function FinalCta({ authenticated }: { authenticated: boolean }) {
    return (
        <section className="bg-white py-20 sm:py-28">
            <Container>
                <div className="overflow-hidden rounded-3xl bg-[#0c4a36] p-7 text-white sm:p-12 lg:p-16">
                    <div className="grid items-center gap-10 lg:grid-cols-[1fr_auto]">
                        <div>
                            <p className="text-xs font-semibold tracking-[0.18em] text-[#a9dfc2] uppercase">Your work is done</p>
                            <h2 className="mt-4 text-balance text-4xl font-semibold tracking-[-0.055em] sm:text-5xl"><span className="block">You’ve already done the hard part.</span><span className="block text-[#bce7ce]">Now get paid.</span></h2>
                            <p className="mt-5 text-lg text-[#c4d8cd]">Add your first invoice and let PayMe handle the follow-ups.</p>
                            <div className="mt-8"><PrimaryLink href={authenticated ? dashboard().url : register().url} className="bg-white text-[#0c4a36] hover:bg-[#eef7f1]">{authenticated ? 'Open your dashboard' : 'Start chasing invoices for free'}</PrimaryLink></div>
                            <p className="mt-4 text-sm text-[#a9c8b9]">No credit card required.</p>
                        </div>
                        <div className="w-full min-w-0 rounded-2xl border border-[#4b7d69] bg-[#155941] p-6 lg:w-72">
                            <div className="flex items-center justify-between"><span className="text-sm text-[#bcd4c7]">Invoice #0042</span><CircleDollarSign className="size-5 text-[#bce7ce]" aria-hidden="true" /></div>
                            <p className="mt-6 text-4xl font-semibold tracking-[-0.05em]">€800</p>
                            <div className="mt-5 flex items-center gap-2 border-t border-[#4b7d69] pt-5 text-sm font-semibold text-[#c9f0d9]"><Check className="size-4" aria-hidden="true" />PAID</div>
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    );
}

export function Footer({ authenticated }: { authenticated: boolean }) {
    return (
        <footer className="border-t border-[#dfe5df] bg-[#faf8f2] py-12">
            <Container>
                <div className="grid gap-10 md:grid-cols-[1.4fr_repeat(3,1fr)]">
                    <div><PayMeLogo /><p className="mt-4 max-w-xs text-sm leading-6 text-[#667069]">Automatic invoice follow-ups for freelancers and small businesses.</p></div>
                    <div><h2 className="text-sm font-semibold text-[#152019]">Product</h2><ul className="mt-4 space-y-3 text-sm text-[#667069]">{[['Features', '#features'], ['Pricing', '#pricing'], ['How it works', '#how-it-works']].map(([label, href]) => <li key={href}><a className="cursor-pointer hover:text-[#176246]" href={href}>{label}</a></li>)}</ul></div>
                    <div><h2 className="text-sm font-semibold text-[#152019]">Company & legal</h2><ul className="mt-4 space-y-3 text-sm text-[#879089]"><li>About <span className="text-xs">— coming soon</span></li><li>Privacy <span className="text-xs">— before launch</span></li><li>Terms <span className="text-xs">— before launch</span></li></ul></div>
                    <div><h2 className="text-sm font-semibold text-[#152019]">Account</h2><ul className="mt-4 space-y-3 text-sm text-[#667069]"><li><Link className="hover:text-[#176246]" href={authenticated ? dashboard() : login()}>{authenticated ? 'Dashboard' : 'Log in'}</Link></li><li><Link className="hover:text-[#176246]" href={authenticated ? dashboard() : register()}>{authenticated ? 'Open PayMe' : 'Create account'}</Link></li></ul></div>
                </div>
                <div className="mt-10 flex flex-col gap-3 border-t border-[#dfe5df] pt-6 text-xs text-[#7a847d] sm:flex-row sm:items-center sm:justify-between"><p>© {new Date().getFullYear()} PayMe.</p><p>Focused invoice follow-up—not accounting software.</p></div>
            </Container>
        </footer>
    );
}
