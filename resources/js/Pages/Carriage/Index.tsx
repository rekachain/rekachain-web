import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { lazy, Suspense } from 'react';
import { Head, Link } from '@inertiajs/react';
import { ROUTES } from '@/Support/Constants/routes';
import { buttonVariants } from '@/Components/UI/button';
import StaticLoadingOverlay from '@/Components/StaticLoadingOverlay';
import Import from '@/Pages/Carriage/Partials/Import';

export default function () {
    const Carriages = lazy(() => import('./Partials/Carriages'));
    return (
        <>
            <Head title="Carriage" />
            <AuthenticatedLayout>
                <div className="p-4">
                    <div className="flex gap-5 items-center">
                        <h1 className="text-page-header my-4">Carriage</h1>
                        <Link
                            className={buttonVariants({ variant: 'default' })}
                            href={route(`${ROUTES.CARRIAGES}.create`)}
                        >
                            Tambah Carriage
                        </Link>
                        <Import />
                    </div>
                    <Suspense fallback={<StaticLoadingOverlay />}>
                        <Carriages />
                    </Suspense>
                </div>
            </AuthenticatedLayout>
        </>
    );
}
