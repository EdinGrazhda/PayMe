import AppLogoIcon from '@/components/app-logo-icon';

export default function AppLogo() {
    return (
        <>
            <AppLogoIcon
                alt=""
                className="aspect-square size-10 shrink-0 object-contain"
            />
            <div className="ml-1.5 grid flex-1 text-left">
                <span className="truncate text-lg leading-tight font-bold tracking-[-0.035em] text-[#111915] dark:text-[#f2f6f3]">
                    PayMe
                </span>
            </div>
        </>
    );
}
