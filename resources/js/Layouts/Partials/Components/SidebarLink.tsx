import { Link } from '@inertiajs/react';
import { buttonVariants } from '@/Components/ui/button';
import { PERMISSION_ENUM } from '@/support/enums/permissionEnum';
import { useContext } from 'react';
import { useSidebar } from '@/Contexts/SidebarContext';

interface SidebarLinkProps {
    routeName: string;
    title?: string;
    icon?: React.ReactNode;
    requirePermission?: PERMISSION_ENUM;
}

export default function (props: SidebarLinkProps) {
    const sidebarContext = useSidebar();
    const currentPath = window.location.pathname;

    // Parsing the route from props.routeName
    const parsedRoute = route(props.routeName);
    const parsedPath = new URL(parsedRoute).pathname;

    // Determine active state logic, excluding the index route from always being active
    const isActive =
        parsedPath === '/'
            ? currentPath === parsedPath // Only mark as active if we're truly on the homepage
            : currentPath.includes(parsedPath); // For all other routes, check if the path includes the parsed path

    const linkClass = `${buttonVariants({
        variant: isActive ? 'sidebar-active' : 'sidebar',
    })} w-full`;
    const titleClass = props.icon ? 'sidebar-item-text ml-2' : 'sidebar-item-text';

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
