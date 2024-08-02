import { Link } from '@inertiajs/react';
import { RiLogoutBoxRLine } from '@remixicon/react';
import { buttonVariants } from '@/Components/ui/button';
import { ROUTES } from '@/support/constants/routes';

export default function () {
    const linkClass = `${buttonVariants({ variant: 'sidebar' })} w-full`;
    return (
        <div className="sidebar-item px-4">
            <Link method="post" href={route(ROUTES.LOGOUT)} className={linkClass} as="button">
                <RiLogoutBoxRLine size="20" />
                <span className="sidebar-item-text ml-2">Logout</span>
            </Link>
        </div>
    );
}
