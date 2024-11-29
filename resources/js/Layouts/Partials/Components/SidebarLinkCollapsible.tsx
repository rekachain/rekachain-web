import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/Components/UI/accordion';
import { buttonVariants } from '@/Components/UI/button';
import { Link } from '@inertiajs/react';
import React, { useContext } from 'react';
import { SIDEBAR_GROUP_ENUM } from '@/Support/Enums/sidebarGroupEnum';
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
            <Accordion type='single' defaultValue={sidebarContext?.selectedMenu} collapsible>
                <AccordionItem
                    value={group}
                    className='sidebar-collapsible-accordion ml-4 space-y-2 border-0 hover:no-underline'
                >
                    <AccordionTrigger
                        className={`${buttonVariants({ variant: 'sidebar' })} hover:no-underline`}
                    >
                        <div className='sidebar-collapsible-menu'>
                            {icon}
                            <span className={icon ? 'sidebar-item-text ml-2' : 'sidebar-item-text'}>
                                {title}
                            </span>
                        </div>
                    </AccordionTrigger>
                    {children}
                </AccordionItem>
            </Accordion>
        )
    );
};

const SidebarLinkCollapsibleItem = ({
    group,
    routeName,
    title,
    icon,
}: SidebarLinkCollapsibleItemProps) => {
    const sidebarContext = useSidebar();
    const handleSetSelectedMenu = () => sidebarContext?.setSelectedMenu(group);
    const active = route().current(routeName);

    return (
        <div title={title} className='sidebar-collapsible-item pl-11'>
            <AccordionContent className={`${buttonVariants({ variant: 'sidebar' })} w-full p-0`}>
                <Link
                    onClick={handleSetSelectedMenu}
                    href={route(routeName)}
                    className={`${buttonVariants({ variant: active ? 'sidebar-active' : 'sidebar' })} sidebar-collapsible-link`}
                >
                    <div className='sidebar-collapsible-icon'>{icon}</div>
                    <div className={icon ? 'ml-2 truncate' : 'truncate'}>{title}</div>
                </Link>
            </AccordionContent>
        </div>
    );
};

export { SidebarLinkCollapsible, SidebarLinkCollapsibleItem };
