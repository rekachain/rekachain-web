import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/Components/ui/accordion";
import { buttonVariants } from "../../../Components/ui/button";
import { Link } from "@inertiajs/react";
import React from "react";

const SidebarLinkCollapsible = (props: {
    title: string;
    children?: React.ReactNode;
    icon?: React.ReactNode;
}) => {
    const accordionClass = `${buttonVariants({
        variant: "sidebar",
    })} hover:no-underline`;
    const titleClass = props.icon ? "ml-2" : "";
    return (
        <Accordion type="single" collapsible>
            <AccordionItem
                value="item-1"
                className="border-0 hover:no-underline space-y-2 ml-4"
            >
                <AccordionTrigger className={accordionClass}>
                    <div className="flex flex-1">
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
    routeName: string;
    title: string;
    icon?: React.ReactNode;
}) => {
    const active = route().current(props.routeName);
    const accordionClass = `${buttonVariants({
        variant: "sidebar",
    })} w-full p-0`;
    const linkClass = `${buttonVariants({
        variant: active ? "sidebar-active" : "sidebar",
    })} w-full rounded-none rounded-l-md`;
    const titleClass = props.icon ? "ml-2" : "";
    return (
        <div className="pl-11">
            <AccordionContent className={accordionClass}>
                <Link href={route(props.routeName)} className={linkClass}>
                    {props.icon}
                    <div className={titleClass}>{props.title}</div>
                </Link>
            </AccordionContent>
        </div>
    );
};

export { SidebarLinkCollapsible, SidebarLinkCollapsibleItem };
