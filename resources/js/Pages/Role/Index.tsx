import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { lazy, Suspense } from 'react';
import { Head, Link } from '@inertiajs/react';
import { ROUTES } from '@/Support/Constants/routes';
import { buttonVariants } from '@/Components/UI/button';
import StaticLoadingOverlay from '@/Components/StaticLoadingOverlay';

export default function () {
    const Roles = lazy(() => import('./Partials/Roles'));
    return (
        <>
            <Head title="Roles" />
            <AuthenticatedLayout>
                <div className="p-4">
                    <div className="flex gap-5 items-center">
                        <h1 className="text-page-header my-4">Role</h1>
                        <Link className={buttonVariants({ variant: 'default' })} href={route(`${ROUTES.ROLES}.create`)}>
                            Tambah Role
                        </Link>
                    </div>
                    <Suspense fallback={<StaticLoadingOverlay />}>
                        <Roles />
                    </Suspense>
                </div>
            </AuthenticatedLayout>
        </>
    );
}
