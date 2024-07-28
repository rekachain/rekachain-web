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
    const titleClass = props.icon ? "ml-2" : "";
    return (
        <div className="px-4">
            <Link href={route(props.routeName)} className={linkClass}>
                {props.icon}
                <div className={titleClass}>{props.title}</div>
            </Link>
        </div>
    );
}
