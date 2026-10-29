import {
    BellRing,
    CalendarX2,
    Check,
    CheckCircle2,
    Circle,
    Mail,
    ShieldCheck,
} from 'lucide-react';
import { useState } from 'react';
import { Container, SectionHeading } from './shared';

const tones = {
    Friendly: {
        subject: 'A quick reminder about invoice #INV-0042',
        body: 'Just a quick reminder that invoice #INV-0042 for €800 is now due. If you’ve already taken care of it, please ignore this message.',
    },
    Professional: {
        subject: 'Invoice #INV-0042 is now overdue',
        body: 'Invoice #INV-0042 for €800 has passed its due date. Please let me know when I can expect payment, or if you need another copy.',
    },
    Firm: {
        subject: 'Payment required for invoice #INV-0042',
        body: 'Payment for invoice #INV-0042 is still outstanding. Please arrange payment or reply with an update on its status.',
    },
} as const;

const reminders = [
    { date: 'Nov 15', label: 'Invoice due', status: 'Complete' },
    { date: 'Nov 16', label: 'Friendly reminder', status: 'Sent' },
    { date: 'Nov 19', label: 'Friendly reminder', status: 'Scheduled' },
    { date: 'Nov 23', label: 'Professional reminder', status: 'Scheduled' },
    { date: 'Nov 30', label: 'Firm reminder', status: 'Scheduled' },
] as const;

export function ReminderEngine() {
    const [tone, setTone] = useState<keyof typeof tones>('Friendly');
    const message = tones[tone];

    return (
        <section className="bg-[#f5f6f1] py-20 sm:py-28">
            <Container>
                <SectionHeading
                    eyebrow="The reminder engine"
                    title={<><span className="block">Persistent enough to get paid.</span><span className="block text-[#176246]">Professional enough to keep the client.</span></>}
                    copy="You decide when PayMe follows up and how each reminder should sound. Nothing goes out outside your rules."
                />
                <div className="mt-14 grid overflow-hidden rounded-3xl border border-[#dce3dd] bg-white lg:grid-cols-[0.85fr_1.15fr]">
                    <div className="border-b border-[#dce3dd] p-6 sm:p-9 lg:border-r lg:border-b-0">
                        <div className="flex items-center gap-2 text-sm font-semibold text-[#176246]"><BellRing className="size-4" aria-hidden="true" />Reminder schedule</div>
                        <ol className="mt-7 space-y-0">
                            {reminders.map((item, index) => (
                                <li key={`${item.date}-${item.label}`} className="relative flex gap-4 pb-6 last:pb-0">
                                    {index < reminders.length - 1 && <span className="absolute top-7 bottom-0 left-[11px] w-px bg-[#cddbd1]" aria-hidden="true" />}
                                    <span className={`relative z-10 mt-0.5 grid size-6 shrink-0 place-items-center rounded-full ${item.status === 'Scheduled' ? 'border border-[#9bb3a4] bg-white text-[#176246]' : 'bg-[#176246] text-white'}`}>
                                        {item.status === 'Scheduled' ? <Circle className="size-2.5 fill-current" aria-hidden="true" /> : <Check className="size-3.5" aria-hidden="true" />}
                                    </span>
                                    <div className="flex min-w-0 flex-1 items-start justify-between gap-4">
                                        <div><p className="text-sm font-semibold text-[#18221c]">{item.label}</p><p className="mt-1 text-xs text-[#758078]">{item.date}</p></div>
                                        <span className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${item.status === 'Sent' ? 'bg-[#dff0e5] text-[#176246]' : item.status === 'Scheduled' ? 'bg-[#f0f2ef] text-[#657068]' : 'bg-[#e8f1eb] text-[#176246]'}`}>{item.status}</span>
                                    </div>
                                </li>
                            ))}
                        </ol>
                    </div>
                    <div className="p-6 sm:p-9">
                        <div className="flex flex-wrap items-center justify-between gap-4">
                            <div className="flex items-center gap-2 text-sm font-semibold text-[#176246]"><Mail className="size-4" aria-hidden="true" />Email preview</div>
                            <div className="flex rounded-xl bg-[#edf2ee] p-1" aria-label="Reminder tone">
                                {(Object.keys(tones) as Array<keyof typeof tones>).map((item) => (
                                    <button
                                        key={item}
                                        type="button"
                                        onClick={() => setTone(item)}
                                        className={`min-h-10 cursor-pointer rounded-lg px-3 text-xs font-semibold transition-colors focus-visible:ring-2 focus-visible:ring-[#73b998] focus-visible:outline-none sm:px-4 ${tone === item ? 'bg-white text-[#12563f] shadow-sm' : 'text-[#647068] hover:text-[#12563f]'}`}
                                        aria-pressed={tone === item}
                                    >
                                        {item}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <article className="mt-7 rounded-2xl border border-[#dfe5df] bg-[#fcfdfb] p-5 sm:p-7" aria-live="polite">
                            <div className="flex items-center justify-between gap-4 border-b border-[#e3e8e3] pb-4 text-xs text-[#748078]"><span>To: john@example.com</span><span>Invoice #INV-0042</span></div>
                            <h3 className="mt-5 text-lg font-semibold tracking-[-0.02em] text-[#162019]">{message.subject}</h3>
                            <div className="mt-5 space-y-4 text-sm leading-7 text-[#4f5b54]">
                                <p>Hi John,</p>
                                <p>{message.body}</p>
                                <p>Thanks,<br />Alex</p>
                            </div>
                        </article>
                        <p className="mt-4 flex items-center gap-2 text-xs text-[#68736c]"><ShieldCheck className="size-4 text-[#176246]" aria-hidden="true" />You can review and edit reminders before they are sent.</p>
                    </div>
                </div>
            </Container>
        </section>
    );
}

export function PaymentSuccess() {
    return (
        <section className="overflow-hidden bg-white py-20 sm:py-28">
            <Container>
                <SectionHeading eyebrow="The best notification" title="Then this happens." />
                <div className="mx-auto mt-12 max-w-xl rounded-3xl border border-[#cfe0d4] bg-[#f7fbf8] p-5 shadow-[0_20px_60px_rgba(24,91,63,0.12)] sm:p-8">
                    <div className="flex flex-col items-center text-center">
                        <span className="payme-success-pop grid size-16 place-items-center rounded-full bg-[#176246] text-white"><CheckCircle2 className="size-8" aria-hidden="true" /></span>
                        <p className="mt-5 text-xs font-bold tracking-[0.16em] text-[#176246] uppercase">Payment received</p>
                        <p className="mt-3 text-xl font-semibold text-[#142019]">John Doe paid</p>
                        <p className="mt-1 text-5xl font-semibold tracking-[-0.06em] text-[#12563f]">€800</p>
                        <p className="mt-2 text-sm text-[#6c766f]">Invoice #INV-0042</p>
                        <div className="mt-7 flex w-full items-center justify-center gap-2 border-t border-[#dbe5dd] pt-6 text-sm font-semibold text-[#315241]">
                            <CalendarX2 className="size-5" aria-hidden="true" />
                            3 scheduled reminders automatically cancelled.
                        </div>
                    </div>
                </div>
                <p className="mx-auto mt-8 max-w-2xl text-center text-lg text-[#56625b]">No awkward message. No spreadsheet. No mental reminder. Just paid.</p>
            </Container>
        </section>
    );
}

const recovered = [
    ['Jan', 18],
    ['Feb', 30],
    ['Mar', 42],
    ['Apr', 57],
    ['May', 76],
    ['Jun', 94],
] as const;

export function RecoveredSection() {
    return (
        <section id="results" className="scroll-mt-20 bg-[#0c4a36] py-20 text-white sm:py-28">
            <Container>
                <div className="grid items-end gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
                    <div>
                        <p className="text-xs font-semibold tracking-[0.18em] text-[#a9dfc2] uppercase">Results</p>
                        <h2 className="mt-4 text-balance text-4xl font-semibold tracking-[-0.05em] sm:text-5xl">See what chasing less is worth.</h2>
                        <p className="mt-5 max-w-xl text-lg leading-8 text-[#c4d8cd]">PayMe doesn’t just show what you’re owed. It shows what happened after the follow-ups.</p>
                        <div className="mt-10">
                            <p className="text-6xl font-semibold tracking-[-0.065em] sm:text-7xl">€2,840</p>
                            <p className="mt-3 max-w-sm leading-7 text-[#c4d8cd]">Collected from overdue invoices after PayMe reminders</p>
                        </div>
                    </div>
                    <div>
                        <dl className="grid grid-cols-3 divide-x divide-[#3b745f] border-y border-[#3b745f] py-6">
                            {[['18', 'overdue invoices'], ['14', 'eventually paid'], ['29', 'reminders sent']].map(([value, label]) => (
                                <div key={label} className="px-3 first:pl-0 sm:px-6"><dd className="text-3xl font-semibold">{value}</dd><dt className="mt-2 text-sm leading-5 text-[#c4d8cd]">{label}</dt></div>
                            ))}
                        </dl>
                        <div className="mt-8" role="img" aria-label="Recovered invoice value increased from January through June, reaching €2,840">
                            <div className="mb-4 flex items-center justify-between text-xs text-[#a9c8b9]"><span>Recovered after reminders</span><span>Last 6 months</span></div>
                            <div className="space-y-3">
                                {recovered.map(([month, value]) => (
                                    <div key={month} className="grid grid-cols-[28px_1fr_48px] items-center gap-3 text-xs">
                                        <span className="text-[#c4d8cd]">{month}</span>
                                        <progress className="payme-progress h-2 w-full overflow-hidden rounded-full" max="100" value={value}>{value}%</progress>
                                        <span className="text-right text-[#d9eee2]">{Math.round((2840 * value) / 94).toLocaleString('en-GB', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 })}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <p className="mt-6 text-xs leading-5 text-[#9fc3b0]">Demo data. Payments shown after reminders are not presented as guaranteed results.</p>
                    </div>
                </div>
            </Container>
        </section>
    );
}
