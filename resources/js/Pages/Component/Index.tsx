import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { lazy, Suspense } from 'react';
import { Head, Link } from '@inertiajs/react';
import { ROUTES } from '@/support/constants/routes';
import { buttonVariants } from '@/Components/ui/button';
import StaticLoadingOverlay from '@/Components/StaticLoadingOverlay';

export default function () {
    const Components = lazy(() => import('./Partials/Components'));
    return (
        <>
            <Head title="Component" />
            <AuthenticatedLayout>
                <div className="p-4">
                    <div className="flex gap-5 items-center">
                        <h1 className="text-page-header my-4">Component</h1>
                        <Link
                            className={buttonVariants({ variant: 'default' })}
                            href={route(`${ROUTES.COMPONENTS}.create`)}
                        >
                            Tambah Component
                        </Link>
                        {/*<Import />*/}
                    </div>
                    <Suspense fallback={<StaticLoadingOverlay />}>
                        <Components />
                    </Suspense>
                </div>
            </AuthenticatedLayout>
        </>
    );
}