import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { lazy, Suspense } from 'react';
import { Head, Link } from '@inertiajs/react';
import { ROUTES } from '@/support/constants/routes';
import { buttonVariants } from '@/Components/ui/button';
import StaticLoadingOverlay from '@/Components/StaticLoadingOverlay';

export default function () {
    const Permissions = lazy(() => import('./Partials/Permissions'));
    return (
        <>
            <Head title="Permissions" />
            <AuthenticatedLayout>
                <div className="p-4">
                    <div className="flex gap-5 items-center">
                        <h1 className="text-page-header my-4">Permission</h1>
                        {/*<Link className={buttonVariants({ variant: 'default' })} href={route(`${ROUTES.ROLES}.create`)}>*/}
                        {/*    Tambah Permission*/}
                        {/*</Link>*/}
                    </div>
                    <Suspense fallback={<StaticLoadingOverlay />}>
                        <Permissions />
                    </Suspense>
                </div>
            </AuthenticatedLayout>
        </>
    );
}
