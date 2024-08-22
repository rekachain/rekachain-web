import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { lazy, Suspense } from 'react';
import { Head, Link } from '@inertiajs/react';
import { ROUTES } from '@/support/constants/routes';
import { buttonVariants } from '@/Components/ui/button';
import StaticLoadingOverlay from '@/Components/StaticLoadingOverlay';
import { useMediaQuery } from 'react-responsive';

export default function () {
    const Users = lazy(() => import('./Partials/Users'));

    const isDesktopOrLaptop = useMediaQuery({
        query: '(min-width: 900px)',
    });
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 900px)' });
    return (
        <>
            <Head title="Users" />
            <AuthenticatedLayout>
                <div className="p-2 md:p-4">
                    <div className="flex gap-5 items-center">
                        <h1 className="text-page-header my-4">Staff</h1>
                        <Link className={buttonVariants({ variant: 'default' })} href={route(`${ROUTES.USERS}.create`)}>
                            Tambah Staff
                        </Link>
                    </div>
                    <>
                        <Suspense fallback={<StaticLoadingOverlay />}>
                            <Users />
                        </Suspense>
                    </>
                </div>
            </AuthenticatedLayout>
        </>
    );
}
