import {
    BarChart3,
    BriefcaseBusiness,
    Camera,
    Check,
    Clock3,
    FileClock,
    FileUp,
    History,
    MailCheck,
    Palette,
    PenLine,
    ReceiptText,
    Users,
    X,
} from 'lucide-react';
import { register } from '@/routes';
import { Container, IconTile, PrimaryLink, SectionHeading } from './shared';

const features = [
    ['Automatic reminders', 'Set the schedule once. PayMe handles the rest.', MailCheck],
    ['Invoice uploads', 'Upload invoices you’ve already created.', FileUp],
    ['Smart reminder writing', 'Draft professional follow-ups without staring at a blank email.', PenLine],
    ['Automatic stopping', 'Once an invoice is paid, remaining reminders are cancelled.', Clock3],
    ['Invoice timeline', 'See exactly what happened and when.', History],
    ['Payment tracking', 'Know what’s paid, pending, and overdue.', ReceiptText],
    ['Client history', 'Understand how quickly each client usually pays.', Users],
    ['Simple analytics', 'See outstanding, overdue, collected and recovered money.', BarChart3],
] as const;

const personas = [
    ['Developer', 'Website delivered. Invoice still open.', FileClock],
    ['Designer', 'Brand approved three weeks ago.', Palette],
    ['Consultant', 'Project complete. Payment pending.', BriefcaseBusiness],
    ['Photographer', 'Photos delivered. Still waiting.', Camera],
    ['Agency', '12 clients. Too many invoices to remember manually.', Users],
] as const;

export function FeaturesSection() {
    return (
        <section id="features" className="scroll-mt-20 bg-white py-20 sm:py-28">
            <Container>
                <SectionHeading
                    eyebrow="Focused by design"
                    title={<><span className="block">Everything you need to stop chasing invoices.</span><span className="block text-[#176246]">Nothing you don’t.</span></>}
                />
                <div className="mt-14 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
                    {features.map(([title, copy, icon]) => (
                        <IconTile key={title} title={title} copy={copy} icon={icon} />
                    ))}
                </div>
            </Container>
        </section>
    );
}

export function BeforeAfterSection() {
    const before = ['Spreadsheet', 'Calendar reminder', 'Search old emails', 'Write follow-up', 'Wait', 'Remember again', 'Write another follow-up'];
    const after = ['Upload invoice', 'PayMe tracks it', 'PayMe follows up', 'PAID'];

    return (
        <section className="bg-[#f5f6f1] py-20 sm:py-28">
            <Container>
                <SectionHeading eyebrow="Before and after" title="One less thing living in your head." />
                <div className="mt-14 grid overflow-hidden rounded-3xl border border-[#dce3dd] bg-white md:grid-cols-2">
                    <div className="p-6 sm:p-10">
                        <p className="text-xs font-bold tracking-[0.16em] text-[#9a4e48] uppercase">Before PayMe</p>
                        <ul className="mt-7 space-y-4">
                            {before.map((item) => (
                                <li key={item} className="flex items-center gap-3 text-[#5e6762]"><span className="grid size-7 place-items-center rounded-full bg-[#f8e9e7] text-[#a8453e]"><X className="size-3.5" aria-hidden="true" /></span>{item}</li>
                            ))}
                        </ul>
                    </div>
                    <div className="border-t border-[#dce3dd] bg-[#edf5ef] p-6 sm:p-10 md:border-t-0 md:border-l">
                        <p className="text-xs font-bold tracking-[0.16em] text-[#176246] uppercase">After PayMe</p>
                        <ol className="mt-7 space-y-0">
                            {after.map((item, index) => (
                                <li key={item} className="relative flex gap-4 pb-7 last:pb-0">
                                    {index < after.length - 1 && <span className="absolute top-7 bottom-0 left-[13px] w-px bg-[#a8c8b5]" aria-hidden="true" />}
                                    <span className="relative z-10 grid size-7 shrink-0 place-items-center rounded-full bg-[#176246] text-white"><Check className="size-3.5" aria-hidden="true" /></span>
                                    <span className="font-semibold text-[#183526]">{item}{item === 'PAID' && ' ✓'}</span>
                                </li>
                            ))}
                        </ol>
                    </div>
                </div>
            </Container>
        </section>
    );
}

export function PersonasSection() {
    return (
        <section className="bg-white py-20 sm:py-28">
            <Container>
                <SectionHeading
                    eyebrow="Independent work"
                    title="Built for people who’d rather work than chase payments."
                />
                <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
                    {personas.map(([title, quote, Icon]) => (
                        <article key={title} className="rounded-2xl border border-[#dfe5df] bg-[#fcfdfb] p-5 transition duration-200 hover:-translate-y-1 hover:border-[#a9c6b3] hover:shadow-[0_12px_30px_rgba(31,64,45,0.08)]">
                            <Icon className="size-5 text-[#176246]" strokeWidth={1.8} aria-hidden="true" />
                            <h3 className="mt-5 font-semibold text-[#162019]">{title}</h3>
                            <p className="mt-2 text-sm leading-6 text-[#68736c]">“{quote}”</p>
                        </article>
                    ))}
                </div>
            </Container>
        </section>
    );
}

export function EarlyAccessSection() {
    return (
        <section className="bg-[#f5f6f1] py-20 sm:py-24">
            <Container>
                <div className="grid items-center gap-8 rounded-3xl border border-[#d8e3da] bg-white p-7 sm:p-10 lg:grid-cols-[1fr_auto] lg:p-14">
                    <div>
                        <p className="text-xs font-bold tracking-[0.16em] text-[#176246] uppercase">Early access</p>
                        <h2 className="mt-4 max-w-3xl text-3xl font-semibold tracking-[-0.045em] text-[#101714] sm:text-4xl">Built with freelancers, not imaginary logos.</h2>
                        <p className="mt-4 max-w-2xl text-lg leading-8 text-[#5e6962]">PayMe is being built for freelancers and small teams who are tired of manually chasing invoices.</p>
                    </div>
                    <PrimaryLink href={register().url} className="w-full lg:w-auto">Join early access</PrimaryLink>
                </div>
            </Container>
        </section>
    );
}
