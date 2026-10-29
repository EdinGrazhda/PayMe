import { CircleDollarSign } from 'lucide-react';

export default function AppLogo() {
    return (
        <>
            <div className="flex aspect-square size-9 items-center justify-center rounded-xl bg-[#126044] text-white shadow-[0_5px_14px_rgba(18,96,68,0.18)] dark:bg-[#4fae80] dark:text-[#07110c]">
                <CircleDollarSign className="size-5" strokeWidth={2.2} />
            </div>
            <div className="ml-1.5 grid flex-1 text-left">
                <span className="truncate text-lg leading-tight font-bold tracking-[-0.035em] text-[#111915] dark:text-[#f2f6f3]">
                    PayMe
                </span>
            </div>
        </>
    );
}
