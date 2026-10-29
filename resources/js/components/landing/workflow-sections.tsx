import {
    CalendarClock,
    Check,
    CircleCheckBig,
    FileSearch,
    FileText,
    Mail,
    MessageSquareText,
    Search,
    Upload,
} from 'lucide-react';
import { useRef, useState } from 'react';
import { Container, SectionHeading } from './shared';

const pains = [
    {
        quote: '“I’ll pay it tomorrow.”',
        copy: 'The invoice remains unpaid while the due date quietly disappears into last week.',
        icon: CalendarClock,
    },
    {
        quote: '“Just following up…”',
        copy: 'You write another uncomfortable email instead of doing the work clients hired you for.',
        icon: MessageSquareText,
    },
    {
        quote: '“Did I already remind them?”',
        copy: 'You search old threads and calendar notes trying to remember what happened next.',
        icon: Search,
    },
] as const;

const steps = [
    {
        number: '01',
        title: 'Add your invoice',
        copy: 'Create an invoice in PayMe or upload the PDF you already use.',
        visual: (
            <div className="flex items-center gap-3 rounded-xl border border-[#dfe5df] bg-white p-3.5">
                <span className="grid size-10 place-items-center rounded-lg bg-[#e7f1ea] text-[#176246]"><FileText className="size-5" aria-hidden="true" /></span>
                <div><p className="text-sm font-semibold">invoice-client.pdf</p><p className="text-xs text-[#768079]">€800 · John Doe · Due Nov 15</p></div>
            </div>
        ),
    },
    {
        number: '02',
        title: 'PayMe tracks it',
        copy: 'We monitor the due date and know when the invoice needs attention.',
        visual: (
            <div className="space-y-3 text-sm">
                <div className="flex items-center justify-between"><span className="text-[#667069]">Nov 15</span><span className="rounded-full bg-[#edf1ed] px-3 py-1 font-medium">Due</span></div>
                <div className="h-px bg-[#dfe5df]" />
                <div className="flex items-center justify-between"><span className="text-[#667069]">Nov 16</span><span className="rounded-full bg-[#fde7e5] px-3 py-1 font-medium text-[#b83c35]">Overdue</span></div>
            </div>
        ),
    },
    {
        number: '03',
        title: 'We follow up',
        copy: 'Professional reminders go out on the schedule and tone you choose.',
        visual: (
            <div className="grid grid-cols-2 gap-2 text-xs">
                {['Day +1 · Friendly', 'Day +3 · Friendly', 'Day +7 · Professional', 'Day +14 · Firm'].map((item) => (
                    <span key={item} className="rounded-lg bg-[#edf4ef] px-2.5 py-2 text-[#315341]">{item}</span>
                ))}
            </div>
        ),
    },
    {
        number: '04',
        title: 'Client pays',
        copy: 'The invoice is marked paid and every remaining reminder stops.',
        visual: (
            <div className="flex items-center gap-3 rounded-xl bg-[#176246] p-4 text-white">
                <CircleCheckBig className="size-7" aria-hidden="true" />
                <div><p className="font-semibold">PAID</p><p className="text-xs text-[#cce4d5]">3 reminders cancelled automatically</p></div>
            </div>
        ),
    },
] as const;

export function ProblemSection() {
    return (
        <section className="bg-white py-20 sm:py-28">
            <Container>
                <SectionHeading
                    eyebrow="The familiar problem"
                    title="Getting paid shouldn’t become another job."
                    copy="You’ve already delivered the work. You shouldn’t have to remember who owes you money, when to follow up, or how many reminders you’ve already sent."
                />
                <div className="mt-14 grid gap-8 md:grid-cols-3">
                    {pains.map(({ quote, copy, icon: Icon }) => (
                        <article key={quote} className="border-t border-[#dce3dd] pt-7">
                            <span className="grid size-12 place-items-center rounded-full bg-[#edf5ef] text-[#176246]">
                                <Icon className="size-5" strokeWidth={1.8} aria-hidden="true" />
                            </span>
                            <h3 className="mt-6 text-xl font-semibold tracking-[-0.03em] text-[#121914]">{quote}</h3>
                            <p className="mt-3 leading-7 text-[#667069]">{copy}</p>
                        </article>
                    ))}
                </div>
                <div className="mt-12 flex items-center justify-center gap-3 text-center text-lg font-semibold text-[#12563f]">
                    <Check className="size-5" aria-hidden="true" />
                    PayMe handles all three.
                </div>
            </Container>
        </section>
    );
}

export function HowItWorksSection() {
    return (
        <section id="how-it-works" className="scroll-mt-20 bg-[#f5f6f1] py-20 sm:py-28">
            <Container>
                <SectionHeading
                    eyebrow="How it works"
                    title="From invoice to paid. Automatically."
                    copy="A simple workflow that keeps you in control while the follow-up work happens in the background."
                />
                <div className="mt-14 grid overflow-hidden rounded-3xl border border-[#dce3dd] bg-white md:grid-cols-2 xl:grid-cols-4">
                    {steps.map((step, index) => (
                        <article key={step.number} className={`p-6 sm:p-8 ${index > 0 ? 'border-t border-[#dce3dd] md:border-l' : ''} ${index === 2 ? 'md:border-l-0 xl:border-l' : ''} ${index > 1 ? 'xl:border-t-0' : ''}`}>
                            <span className="text-xs font-bold tracking-[0.18em] text-[#176246]">{step.number}</span>
                            <h3 className="mt-4 text-xl font-semibold tracking-[-0.03em] text-[#111814]">{step.title}</h3>
                            <p className="mt-3 min-h-16 text-sm leading-6 text-[#667069]">{step.copy}</p>
                            <div className="mt-6">{step.visual}</div>
                        </article>
                    ))}
                </div>
                <p className="mt-10 text-center text-xl font-semibold tracking-[-0.03em] text-[#142019]">
                    You work. <span className="text-[#176246]">PayMe follows up.</span> You get paid.
                </p>
            </Container>
        </section>
    );
}

export function InvoiceUploadDemo() {
    const fileInput = useRef<HTMLInputElement>(null);
    const [fileName, setFileName] = useState('invoice-client.pdf');
    const [confirmed, setConfirmed] = useState(false);

    return (
        <section className="bg-white py-20 sm:py-28">
            <Container>
                <div className="grid items-center gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
                    <SectionHeading
                        align="left"
                        eyebrow="Keep your workflow"
                        title="Already have an invoice? Perfect."
                        copy="You don’t need to rebuild your invoicing workflow just to use PayMe. Upload the document, confirm what we found, and start tracking."
                    />
                    <div className="rounded-3xl border border-[#dce3dd] bg-[#f7f8f4] p-4 sm:p-7">
                        <div className="grid gap-4 md:grid-cols-2">
                            <div className="flex min-h-64 flex-col items-center justify-center rounded-2xl border border-dashed border-[#92a89a] bg-white p-6 text-center">
                                <span className="grid size-12 place-items-center rounded-full bg-[#e8f2eb] text-[#176246]"><Upload className="size-5" aria-hidden="true" /></span>
                                <p className="mt-4 font-semibold text-[#152019]">Drop your invoice here</p>
                                <p className="mt-1 text-sm text-[#748078]">PDF, JPG or PNG</p>
                                <input
                                    ref={fileInput}
                                    type="file"
                                    accept=".pdf,image/png,image/jpeg"
                                    className="sr-only"
                                    onChange={(event) => {
                                        const file = event.target.files?.[0];
                                        if (file) {
                                            setFileName(file.name);
                                            setConfirmed(false);
                                        }
                                    }}
                                    aria-label="Choose an invoice file"
                                />
                                <button
                                    type="button"
                                    onClick={() => fileInput.current?.click()}
                                    className="mt-5 min-h-11 cursor-pointer rounded-xl border border-[#aebbb1] bg-white px-5 text-sm font-semibold text-[#26322b] transition-colors hover:border-[#176246] hover:bg-[#edf5ef] focus-visible:ring-3 focus-visible:ring-[#73b998] focus-visible:outline-none"
                                >
                                    Choose invoice
                                </button>
                                <p className="mt-3 max-w-full truncate text-xs text-[#748078]" aria-live="polite">{fileName}</p>
                            </div>
                            <div className="rounded-2xl border border-[#dfe5df] bg-white p-5">
                                <div className="flex items-center gap-2 text-sm font-semibold text-[#176246]"><FileSearch className="size-4" aria-hidden="true" />We found</div>
                                <dl className="mt-5 divide-y divide-[#e5e9e5] text-sm">
                                    {[['Client', 'John Doe'], ['Invoice', '#INV-0042'], ['Amount', '€800'], ['Due date', '15 Nov 2026']].map(([label, value]) => (
                                        <div key={label} className="flex items-center justify-between gap-4 py-3"><dt className="text-[#758078]">{label}</dt><dd className="font-semibold text-[#17211b]">{value}</dd></div>
                                    ))}
                                </dl>
                                <button
                                    type="button"
                                    onClick={() => setConfirmed(true)}
                                    className="mt-5 inline-flex min-h-11 w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#126044] px-4 text-sm font-semibold text-white transition-colors hover:bg-[#0e5038] focus-visible:ring-3 focus-visible:ring-[#73b998] focus-visible:outline-none"
                                >
                                    {confirmed ? <><Check className="size-4" aria-hidden="true" />Tracking started</> : 'Confirm & track'}
                                </button>
                            </div>
                        </div>
                        <p className="mt-4 text-center text-xs leading-5 text-[#68736c]">
                            PayMe works alongside the tools you already use. You confirm extracted details before tracking begins.
                        </p>
                    </div>
                </div>
            </Container>
        </section>
    );
}
