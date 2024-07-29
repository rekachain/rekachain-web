import { Link } from "@inertiajs/react";
import { buttonVariants } from "@/Components/ui/button";

export default function (props: {
    routeName: string;
    title?: string;
    icon?: React.ReactNode;
}) {
    const active = route().current(props.routeName);
    const linkClass = `${buttonVariants({
        variant: active ? "sidebar-active" : "sidebar",
    })} w-full`;
    const titleClass = props.icon
        ? "sidebar-item-text ml-2"
        : "sidebar-item-text";
    return (
        <div className="sidebar-item px-4" title={props.title}>
            <Link href={route(props.routeName)} className={linkClass}>
                {props.icon}
                <div className={titleClass}>{props.title}</div>
            </Link>
        </div>
    );
}
