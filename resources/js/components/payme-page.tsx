import type { ReactNode } from "react";

export function PaymePage({
    title,
    description,
    action,
    children,
}: {
    title: string;
    description: string;
    action?: ReactNode;
    children: ReactNode;
}) {
    return (
        <main className="mx-auto w-full max-w-[1460px] px-5 py-8 sm:px-8 lg:px-12 lg:py-10">
            <div className="mb-8 flex flex-wrap items-start justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-semibold tracking-tight text-[#10241d] dark:text-[#edf8f0]">
                        {title}
                    </h1>
                    <p className="mt-2 text-[#73827b] dark:text-[#a4b5aa]">{description}</p>
                </div>
                {action}
            </div>
            {children}
        </main>
    );
}

export function PaymeCard({
    title,
    description,
    action,
    children,
}: {
    title?: string;
    description?: string;
    action?: ReactNode;
    children: ReactNode;
}) {
    return (
        <section className="rounded-2xl border border-[#dce5dd] bg-white p-5 shadow-[0_12px_32px_rgba(22,45,29,.04)] dark:border-[#2a4033] dark:bg-[#17241b] sm:p-6">
            {(title || action) && (
                <div className="mb-5 flex flex-wrap items-start justify-between gap-3">
                    <div>
                        {title && (
                            <h2 className="text-lg font-semibold text-[#10241d] dark:text-[#edf8f0]">
                                {title}
                            </h2>
                        )}
                        {description && (
                            <p className="mt-1 text-sm text-[#73827b] dark:text-[#a4b5aa]">
                                {description}
                            </p>
                        )}
                    </div>
                    {action}
                </div>
            )}
            {children}
        </section>
    );
}

export function EmptyState({ title, description }: { title: string; description: string }) {
    return (
        <div className="py-14 text-center">
            <p className="font-medium text-[#244535] dark:text-[#d8eadc]">{title}</p>
            <p className="mt-1 text-sm text-[#819188] dark:text-[#a4b5aa]">{description}</p>
        </div>
    );
}

export const fieldClass =
    "h-10 w-full rounded-md border border-[#dce5dd] bg-white px-3 text-sm text-[#142c20] outline-none focus:border-[#126044] dark:border-[#34503e] dark:bg-[#182a20] dark:text-[#edf8f0]";
export const primaryClass = "bg-[#106143] text-white hover:bg-[#0b4e35]";
