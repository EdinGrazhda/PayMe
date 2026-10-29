import { Head, usePage } from '@inertiajs/react';
import { LandingNavbar } from '@/components/landing/navbar';
import { Hero } from '@/components/landing/hero';
import {
    HowItWorksSection,
    InvoiceUploadDemo,
    ProblemSection,
} from '@/components/landing/workflow-sections';
import {
    PaymentSuccess,
    RecoveredSection,
    ReminderEngine,
} from '@/components/landing/reminder-sections';
import {
    BeforeAfterSection,
    EarlyAccessSection,
    FeaturesSection,
    PersonasSection,
} from '@/components/landing/value-sections';
import {
    FaqSection,
    FinalCta,
    Footer,
    PricingSection,
    RoiCalculator,
    SecuritySection,
} from '@/components/landing/conversion-sections';
import type { Auth } from '@/types';

type WelcomePageProps = {
    auth: Auth | { user: null };
};

const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'PayMe',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    description:
        'PayMe tracks unpaid invoices and sends professional payment reminders for freelancers and small businesses.',
    offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'EUR',
    },
};

export default function Welcome() {
    const { auth } = usePage<WelcomePageProps>().props;
    const authenticated = Boolean(auth.user);

    return (
        <>
                <Head title="PayMe — Stop Chasing Unpaid Invoices">
                <meta
                    name="description"
                    content="PayMe automatically tracks unpaid invoices and sends professional payment reminders so freelancers and small businesses can spend less time chasing payments."
                />
                <meta name="robots" content="index, follow" />
                <meta property="og:type" content="website" />
                <meta property="og:title" content="PayMe — Stop Chasing Unpaid Invoices" />
                <meta
                    property="og:description"
                    content="Track overdue invoices, send professional reminders automatically, and stop chasing clients yourself."
                />
                <meta property="og:url" content="/" />
                <meta name="twitter:card" content="summary_large_image" />
                <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
            </Head>
            <a
                href="#main-content"
                className="fixed top-3 left-3 z-50 -translate-y-20 rounded-lg bg-[#101714] px-4 py-2 text-sm font-semibold text-white transition-transform focus:translate-y-0 focus:outline-none"
            >
                Skip to content
            </a>
            <div className="min-h-screen overflow-x-clip bg-[#faf8f2] font-sans text-[#101714] antialiased">
                <LandingNavbar authenticated={authenticated} />
                <main id="main-content">
                    <Hero authenticated={authenticated} />
                    <ProblemSection />
                    <HowItWorksSection />
                    <InvoiceUploadDemo />
                    <ReminderEngine />
                    <PaymentSuccess />
                    <RecoveredSection />
                    <FeaturesSection />
                    <BeforeAfterSection />
                    <PersonasSection />
                    <EarlyAccessSection />
                    <PricingSection />
                    <RoiCalculator />
                    <SecuritySection />
                    <FaqSection />
                    <FinalCta authenticated={authenticated} />
                </main>
                <Footer authenticated={authenticated} />
            </div>
        </>
    );
}
