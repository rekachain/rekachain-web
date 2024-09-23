import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/Components/ui/accordion';
import { buttonVariants } from '@/Components/ui/button';
import { Link } from '@inertiajs/react';
import React, { useContext } from 'react';
import { SIDEBAR_GROUP_ENUM } from '@/Support/enums/sidebarGroupEnum';
import { useSidebar } from '@/Contexts/SidebarContext';

interface SidebarLinkCollapsibleItemProps {
    group: SIDEBAR_GROUP_ENUM;
    routeName: string;
    title: string;
    icon?: React.ReactNode;
}

interface SidebarLinkCollapsibleProps {
    title: string;
    group: SIDEBAR_GROUP_ENUM;
    children?: React.ReactNode;
    icon?: React.ReactNode;
}

const SidebarLinkCollapsible = ({ title, group, children, icon }: SidebarLinkCollapsibleProps) => {
    const sidebarContext = useSidebar();

    const hasChildren = React.Children.toArray(children).length > 0;
    return (
        hasChildren && (
            <Accordion type="single" collapsible defaultValue={sidebarContext?.selectedMenu}>
                <AccordionItem
                    value={group}
                    className="sidebar-collapsible-accordion border-0 hover:no-underline space-y-2 ml-4"
                >
                    <AccordionTrigger className={`${buttonVariants({ variant: 'sidebar' })} hover:no-underline`}>
                        <div className="sidebar-collapsible-menu">
                            {icon}
                            <span className={icon ? 'sidebar-item-text ml-2' : 'sidebar-item-text'}>{title}</span>
                        </div>
                    </AccordionTrigger>
                    {children}
                </AccordionItem>
            </Accordion>
        )
    );
};

const SidebarLinkCollapsibleItem = ({ group, routeName, title, icon }: SidebarLinkCollapsibleItemProps) => {
    const sidebarContext = useSidebar();
    const handleSetSelectedMenu = () => sidebarContext?.setSelectedMenu(group);
    const active = route().current(routeName);

    return (
        <div className="sidebar-collapsible-item pl-11" title={title}>
            <AccordionContent className={`${buttonVariants({ variant: 'sidebar' })} w-full p-0`}>
                <Link
                    href={route(routeName)}
                    className={`${buttonVariants({ variant: active ? 'sidebar-active' : 'sidebar' })} sidebar-collapsible-link`}
                    onClick={handleSetSelectedMenu}
                >
                    <div className="sidebar-collapsible-icon">{icon}</div>
                    <div className={icon ? 'truncate ml-2' : 'truncate'}>{title}</div>
                </Link>
            </AccordionContent>
        </div>
    );
};

export { SidebarLinkCollapsible, SidebarLinkCollapsibleItem };
