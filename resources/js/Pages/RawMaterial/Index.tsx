import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { lazy, Suspense } from 'react';
import { Head, Link } from '@inertiajs/react';
import { ROUTES } from '@/support/constants/routes';
import { buttonVariants } from '@/Components/ui/button';
import StaticLoadingOverlay from '@/Components/StaticLoadingOverlay';

export default function () {
    const RawMaterials = lazy(() => import('./Partials/RawMaterials'));
    return (
        <>
            <Head title="Raw Material" />
            <AuthenticatedLayout>
                <div className="p-4">
                    <div className="flex gap-5 items-center">
                        <h1 className="text-page-header my-4">Raw Material</h1>
                        <Link
                            className={buttonVariants({ variant: 'default' })}
                            href={route(`${ROUTES.RAW_MATERIALS}.create`)}
                        >
                            Tambah Raw Material
                        </Link>
                    </div>
                    <Suspense fallback={<StaticLoadingOverlay />}>
                        <RawMaterials />
                    </Suspense>
                </div>
            </AuthenticatedLayout>
        </>
    );
}