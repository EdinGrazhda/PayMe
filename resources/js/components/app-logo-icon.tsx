import type { ImgHTMLAttributes } from 'react';

export default function AppLogoIcon({
    alt = 'PayMe',
    ...props
}: ImgHTMLAttributes<HTMLImageElement>) {
    return (
        <img
            {...props}
            src="/images/payme-happy-invoice-logo.png"
            alt={alt}
            draggable={false}
        />
    );
}
