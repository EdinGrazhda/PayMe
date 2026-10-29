import { Link } from '@inertiajs/react';
import {
    Bell,
    ChartNoAxesColumn,
    FileText,
    House,
    Settings,
    Users,
} from 'lucide-react';
import AppLogo from '@/components/app-logo';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { dashboard } from '@/routes';
import profile from '@/routes/profile';
import type { NavItem } from '@/types';

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: dashboard(),
        icon: House,
    },
    {
        title: 'Invoices',
        href: '/dashboard#recent-invoices',
        icon: FileText,
    },
    {
        title: 'Clients',
        href: '/dashboard#needs-attention',
        icon: Users,
    },
    {
        title: 'Reminders',
        href: '/dashboard#needs-attention',
        icon: Bell,
    },
    {
        title: 'Analytics',
        href: '/dashboard#metrics',
        icon: ChartNoAxesColumn,
    },
];

const footerNavItems: NavItem[] = [
    {
        title: 'Settings',
        href: profile.edit(),
        icon: Settings,
    },
];

export function AppSidebar() {
    return (
        <Sidebar
            collapsible="icon"
            variant="sidebar"
            className="border-r border-[#e2e7e3] bg-[#fffefa] dark:border-[#28372f] dark:bg-[#111a16]"
        >
            <SidebarHeader className="px-3 pt-4 pb-5">
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={dashboard()} prefetch className="h-12">
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent className="px-1">
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter className="border-t border-[#e2e7e3] px-3 pt-3 pb-4 dark:border-[#28372f]">
                <NavMain items={footerNavItems} />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
