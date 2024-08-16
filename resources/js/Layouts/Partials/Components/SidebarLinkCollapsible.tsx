import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/Components/ui/accordion';
import { buttonVariants } from '@/Components/ui/button';
import { Link } from '@inertiajs/react';
import React, { useContext } from 'react';
import { SIDEBAR_GROUP } from '@/support/enums/sidebarGroup';
import { SidebarContext } from '@/contexts/SidebarContext';

/**
 * SidebarLinkCollapsible
 *
 * @param title
 * @param group used to check if the menu is selected, if selectedMenu === group then the menu is opened by default
 * @param children
 * @param icon
 * @param props
 * @constructor
 */
const SidebarLinkCollapsible = (props: {
    title: string;
    group: SIDEBAR_GROUP;
    children?: React.ReactNode;
    icon?: React.ReactNode;
}) => {
    const sidebarContext = useContext(SidebarContext);
    const accordionClass = `${buttonVariants({
        variant: 'sidebar',
    })}  hover:no-underline`;
    const accordionItemClass = 'sidebar-collapsible-accordion border-0 hover:no-underline space-y-2 ml-4';
    const titleClass = props.icon ? 'sidebar-item-text ml-2' : 'sidebar-item-text';
    return (
        <Accordion type="single" collapsible defaultValue={sidebarContext?.selectedMenu}>
            <AccordionItem value={props.group} className={accordionItemClass}>
                <AccordionTrigger className={accordionClass}>
                    <div className="sidebar-collapsible-menu">
                        {props.icon}
                        <span className={titleClass}>{props.title}</span>
                    </div>
                </AccordionTrigger>
                {props.children}
            </AccordionItem>
        </Accordion>
    );
};

const SidebarLinkCollapsibleItem = (props: {
    group: SIDEBAR_GROUP;
    routeName: string;
    title: string;
    icon?: React.ReactNode;
}) => {
    const sidebarContext = useContext(SidebarContext);
    const handleSetSelectedMenu = () => sidebarContext?.setSelectedMenu(props.group);
    const active = route().current(props.routeName);
    const accordionClass = `${buttonVariants({
        variant: 'sidebar',
    })}  w-full p-0`;
    const linkClass = `${buttonVariants({
        variant: active ? 'sidebar-active' : 'sidebar',
    })} sidebar-collapsible-link`;
    const titleClass = props.icon ? 'truncate ml-2' : 'truncate';
    return (
        <div className="sidebar-collapsible-item pl-11" title={props.title}>
            <AccordionContent className={accordionClass}>
                <Link href={route(props.routeName)} className={linkClass} onClick={handleSetSelectedMenu}>
                    <div className="sidebar-collapsible-icon">{props.icon}</div>
                    <div className={titleClass}>{props.title}</div>
                </Link>
            </AccordionContent>
        </div>
    );
};

export { SidebarLinkCollapsible, SidebarLinkCollapsibleItem };
