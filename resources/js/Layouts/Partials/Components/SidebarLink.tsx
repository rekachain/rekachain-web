import { Link } from '@inertiajs/react';
import { buttonVariants } from '@/Components/ui/button';
import { PERMISSION_ENUM } from '@/support/enums/permissionEnum';
import { checkPermission } from '@/helpers/sidebarHelper';

interface SidebarLinkProps {
    routeName: string;
    title?: string;
    icon?: React.ReactNode;
    requirePermission?: PERMISSION_ENUM;
}

export default function (props: SidebarLinkProps) {
    const active = route().current(props.routeName);
    const linkClass = `${buttonVariants({
        variant: active ? 'sidebar-active' : 'sidebar',
    })} w-full`;
    const titleClass = props.icon ? 'sidebar-item-text ml-2' : 'sidebar-item-text';
    return (
        <div className="sidebar-item px-4" title={props.title}>
            <Link href={route(props.routeName)} className={linkClass}>

                {props.icon}
                <div className={titleClass}>{props.title}</div>
            </Link>
        </div>
    );
}
