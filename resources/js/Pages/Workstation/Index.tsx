import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { lazy, Suspense } from 'react';
import { Head, Link } from '@inertiajs/react';
import { ROUTES } from '@/support/constants/routes';
import { buttonVariants } from '@/Components/ui/button';
import StaticLoadingOverlay from '@/Components/StaticLoadingOverlay';

export default function () {
    const Workstations = lazy(() => import('./Partials/Workstations'));
    return (
        <>
            <Head title="Workstation" />
            <AuthenticatedLayout>
                <div className="p-4">
                    <div className="flex gap-5 items-center">
                        <h1 className="text-page-header my-4">Workstation</h1>
                        <Link
                            className={buttonVariants({ variant: 'default' })}
                            href={route(`${ROUTES.WORKSTATIONS}.create`)}
                        >
                            Tambah Workstation
                        </Link>
                    </div>
                    <Suspense fallback={<StaticLoadingOverlay />}>
                        <Workstations />
                    </Suspense>
                </div>
            </AuthenticatedLayout>
        </>
    );
}
