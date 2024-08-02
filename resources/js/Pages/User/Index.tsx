import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { lazy, Suspense } from 'react';
import { Head, Link } from '@inertiajs/react';
import { ROUTES } from '@/support/constants/routes';
import { buttonVariants } from '@/Components/ui/button';
import StaticLoadingOverlay from '@/Components/StaticLoadingOverlay';

export default function () {
    const UserTable = lazy(() => import('./Partials/Users'));
    return (
        <>
            <Head title="Users" />
            <AuthenticatedLayout>
                <div className="p-4">
                    <div className="flex gap-5 items-center">
                        <h1 className="text-page-header my-4">Staff</h1>
                        <Link className={buttonVariants({ variant: 'default' })} href={route(`${ROUTES.USERS}.create`)}>
                            Tambah Staff
                        </Link>
                    </div>
                    <Suspense fallback={<StaticLoadingOverlay />}>
                        <UserTable />
                    </Suspense>
                </div>
            </AuthenticatedLayout>
        </>
    );
}
