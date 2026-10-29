import { Link } from '@inertiajs/react';
import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { useCurrentUrl } from '@/hooks/use-current-url';
import type { NavItem } from '@/types';

export function NavMain({ items }: { items: NavItem[] }) {
    const { isCurrentUrl } = useCurrentUrl();

    return (
        <SidebarGroup className="px-2 py-0">
            <SidebarGroupLabel className="sr-only">
                Navigation
            </SidebarGroupLabel>
            <SidebarMenu className="gap-2">
                {items.map((item) => (
                    <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton
                            asChild
                            isActive={isCurrentUrl(item.href)}
                            tooltip={{ children: item.title }}
                            className="h-11 rounded-xl px-3 text-[15px] text-[#4f5d56] hover:bg-[#f0f5f1] hover:text-[#126044] data-[active=true]:bg-[#e9f3eb] data-[active=true]:text-[#126044] data-[active=true]:shadow-none dark:text-[#9eafa5] dark:hover:bg-[#1a2b22] dark:hover:text-[#dff5e8] dark:data-[active=true]:bg-[#20382c] dark:data-[active=true]:text-[#dff5e8] [&>svg]:size-[18px]"
                        >
                            <Link href={item.href} prefetch>
                                {item.icon && <item.icon />}
                                <span>{item.title}</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                ))}
            </SidebarMenu>
        </SidebarGroup>
    );
}
