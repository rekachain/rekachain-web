import { buttonVariants } from '@/Components/UI/button';
import { useSidebar } from '@/Contexts/SidebarContext';
import { PERMISSION_ENUM } from '@/Support/Enums/permissionEnum';
import { Link } from '@inertiajs/react';

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
            ? currentPath === parsedPath // Only mark as active if we're on the homepage
            : currentPath === parsedPath || currentPath.startsWith(`${parsedPath}/`); // Match exact or deeper route paths

    const linkClass = `${buttonVariants({
        variant: isActive ? 'sidebar-active' : 'sidebar',
    })} w-full`;
    const titleClass = props.icon ? 'sidebar-item-text ml-2' : 'sidebar-item-text';

    const handleSetSelectedMenu = () => sidebarContext?.setSelectedMenu('');

    return (
        <div title={props.title} className='sidebar-item px-4'>
            <Link
                onClick={handleSetSelectedMenu}
                href={route(props.routeName)}
                className={linkClass}
            >
                {props.icon}
                <div className={titleClass}>{props.title}</div>
            </Link>
        </div>
    );
}
