import { Link } from '@inertiajs/react';
import { Menu } from 'lucide-react';
import { useEffect, useState } from 'react';
import { dashboard, login, register } from '@/routes';
import { cn } from '@/lib/utils';
import { Container, PayMeLogo } from './shared';
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '@/components/ui/sheet';

const navItems = [
    ['How it works', '#how-it-works'],
    ['Features', '#features'],
    ['Results', '#results'],
    ['Pricing', '#pricing'],
    ['FAQ', '#faq'],
] as const;

export function LandingNavbar({ authenticated }: { authenticated: boolean }) {
    const [compact, setCompact] = useState(false);

    useEffect(() => {
        const onScroll = () => setCompact(window.scrollY > 32);
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });

        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return (
        <header
            className={cn(
                'sticky top-0 z-40 border-b border-transparent bg-[#faf8f2]/95 transition-all duration-200',
                compact && 'border-[#e3e6df] shadow-[0_6px_24px_rgba(18,37,28,0.06)] backdrop-blur-md',
            )}
        >
            <Container className={cn('flex h-20 items-center justify-between transition-all duration-200', compact && 'h-16')}>
                <a href="#top" className="cursor-pointer rounded-xl focus-visible:ring-3 focus-visible:ring-[#73b998] focus-visible:outline-none">
                    <PayMeLogo />
                </a>

                <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary navigation">
                    {navItems.map(([label, href]) => (
                        <a
                            key={href}
                            href={href}
                            className="cursor-pointer rounded-md px-1 py-2 text-sm font-medium text-[#38423d] transition-colors hover:text-[#126044] focus-visible:ring-2 focus-visible:ring-[#73b998] focus-visible:outline-none"
                        >
                            {label}
                        </a>
                    ))}
                </nav>

                <div className="hidden items-center gap-3 lg:flex">
                    <Link
                        href={authenticated ? dashboard() : login()}
                        className="inline-flex min-h-11 cursor-pointer items-center rounded-lg px-4 text-sm font-semibold text-[#27312c] transition-colors hover:text-[#126044] focus-visible:ring-3 focus-visible:ring-[#73b998] focus-visible:outline-none"
                    >
                        {authenticated ? 'Dashboard' : 'Log in'}
                    </Link>
                    <Link
                        href={authenticated ? dashboard() : register()}
                        className="inline-flex min-h-11 cursor-pointer items-center rounded-xl bg-[#12563f] px-5 text-sm font-semibold text-white transition-colors hover:bg-[#0e4835] focus-visible:ring-3 focus-visible:ring-[#73b998] focus-visible:outline-none"
                    >
                        {authenticated ? 'Open PayMe' : 'Start for free'}
                    </Link>
                </div>

                <Sheet>
                    <SheetTrigger asChild>
                        <button
                            type="button"
                            className="grid size-11 cursor-pointer place-items-center rounded-xl border border-[#dfe4de] bg-white text-[#18211c] transition-colors hover:bg-[#eef5f0] focus-visible:ring-3 focus-visible:ring-[#73b998] focus-visible:outline-none lg:hidden"
                            aria-label="Open navigation menu"
                        >
                            <Menu className="size-5" aria-hidden="true" />
                        </button>
                    </SheetTrigger>
                    <SheetContent className="w-[88%] border-[#dfe4de] bg-[#faf8f2] sm:max-w-sm">
                        <SheetHeader className="border-b border-[#dfe4de] px-6 py-6 text-left">
                            <SheetTitle><PayMeLogo /></SheetTitle>
                            <SheetDescription className="sr-only">PayMe site navigation</SheetDescription>
                        </SheetHeader>
                        <nav className="flex flex-col px-4 py-4" aria-label="Mobile navigation">
                            {navItems.map(([label, href]) => (
                                <SheetClose asChild key={href}>
                                    <a
                                        href={href}
                                        className="flex min-h-12 cursor-pointer items-center rounded-xl px-3 text-base font-semibold text-[#27312c] hover:bg-[#e7f0e9] focus-visible:ring-2 focus-visible:ring-[#73b998] focus-visible:outline-none"
                                    >
                                        {label}
                                    </a>
                                </SheetClose>
                            ))}
                        </nav>
                        <div className="mt-auto grid gap-3 border-t border-[#dfe4de] p-6">
                            <Link
                                href={authenticated ? dashboard() : login()}
                                className="inline-flex min-h-12 items-center justify-center rounded-xl border border-[#cad4cc] bg-white font-semibold text-[#27312c]"
                            >
                                {authenticated ? 'Dashboard' : 'Log in'}
                            </Link>
                            <Link
                                href={authenticated ? dashboard() : register()}
                                className="inline-flex min-h-12 items-center justify-center rounded-xl bg-[#12563f] font-semibold text-white"
                            >
                                {authenticated ? 'Open PayMe' : 'Start for free'}
                            </Link>
                        </div>
                    </SheetContent>
                </Sheet>
            </Container>
        </header>
    );
}
