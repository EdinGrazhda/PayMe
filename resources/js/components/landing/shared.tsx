import { Link } from '@inertiajs/react';
import { ArrowRight } from 'lucide-react';
import type { ComponentType, ReactNode } from 'react';
import AppLogoIcon from '@/components/app-logo-icon';
import { cn } from '@/lib/utils';

export function Container({
    children,
    className,
}: {
    children: ReactNode;
    className?: string;
}) {
    return (
        <div className={cn('mx-auto w-full max-w-[1240px] px-5 sm:px-8 lg:px-10', className)}>
            {children}
        </div>
    );
}

export function PayMeLogo({ inverse = false }: { inverse?: boolean }) {
    return (
        <span className="inline-flex items-center gap-2.5" aria-label="PayMe">
            <AppLogoIcon alt="" className="size-10 shrink-0 object-contain" />
            <span className={cn('text-xl font-bold tracking-[-0.035em]', inverse ? 'text-white' : 'text-[#101714]')}>
                PayMe
            </span>
        </span>
    );
}

export function Eyebrow({ children }: { children: ReactNode }) {
    return (
        <p className="mb-4 text-xs font-semibold tracking-[0.18em] text-[#176246] uppercase">
            {children}
        </p>
    );
}

export function SectionHeading({
    eyebrow,
    title,
    copy,
    align = 'center',
    inverse = false,
}: {
    eyebrow?: string;
    title: ReactNode;
    copy?: ReactNode;
    align?: 'left' | 'center';
    inverse?: boolean;
}) {
    return (
        <div className={cn('max-w-3xl', align === 'center' && 'mx-auto text-center')}>
            {eyebrow && (
                <p className={cn('mb-4 text-xs font-semibold tracking-[0.18em] uppercase', inverse ? 'text-[#a9dfc2]' : 'text-[#176246]')}>
                    {eyebrow}
                </p>
            )}
            <h2 className={cn('text-balance text-3xl font-semibold tracking-[-0.045em] sm:text-4xl lg:text-5xl', inverse ? 'text-white' : 'text-[#101714]')}>
                {title}
            </h2>
            {copy && (
                <p className={cn('mt-5 text-pretty text-base leading-7 sm:text-lg', inverse ? 'text-[#c4d8cd]' : 'text-[#58635d]')}>
                    {copy}
                </p>
            )}
        </div>
    );
}

export function IconTile({
    icon: Icon,
    title,
    copy,
    className,
}: {
    icon: ComponentType<{ className?: string; strokeWidth?: number; 'aria-hidden'?: boolean }>;
    title: string;
    copy: string;
    className?: string;
}) {
    return (
        <article className={cn('group border-t border-[#dfe5df] pt-6', className)}>
            <span className="mb-5 grid size-11 place-items-center rounded-xl bg-[#e5f1e9] text-[#176246] transition-colors duration-200 group-hover:bg-[#d7eadf]">
                <Icon className="size-5" strokeWidth={1.8} aria-hidden={true} />
            </span>
            <h3 className="text-lg font-semibold tracking-[-0.02em] text-[#111814]">{title}</h3>
            <p className="mt-2 text-sm leading-6 text-[#66706a]">{copy}</p>
        </article>
    );
}

export function PrimaryLink({
    href,
    children,
    className,
}: {
    href: string;
    children: ReactNode;
    className?: string;
}) {
    return (
        <Link
            href={href}
            className={cn(
                'inline-flex min-h-12 cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#126044] px-6 py-3 text-sm font-semibold text-white shadow-[0_8px_24px_rgba(18,96,68,0.18)] transition duration-200 hover:-translate-y-0.5 hover:bg-[#0e5038] focus-visible:ring-3 focus-visible:ring-[#73b998] focus-visible:outline-none active:translate-y-0',
                className,
            )}
        >
            {children}
            <ArrowRight className="size-4" aria-hidden="true" />
        </Link>
    );
}
