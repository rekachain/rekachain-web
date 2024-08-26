import { Link } from '@inertiajs/react';
import { buttonVariants } from '@/Components/ui/button';
import { PERMISSION_ENUM } from '@/support/enums/permissionEnum';
import { useContext } from 'react';
import { SidebarContext } from '@/contexts/SidebarContext';

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
    const sidebarContext = useContext(SidebarContext);
    const handleSetSelectedMenu = () => sidebarContext?.setSelectedMenu('');
    return (
        <div className="sidebar-item px-4" title={props.title}>
            <Link href={route(props.routeName)} className={linkClass} onClick={handleSetSelectedMenu}>
                {props.icon}
                <div className={titleClass}>{props.title}</div>
            </Link>
        </div>
    );
}
