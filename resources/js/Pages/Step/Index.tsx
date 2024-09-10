import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { lazy, Suspense } from 'react';
import { Head, Link } from '@inertiajs/react';
import { ROUTES } from '@/support/constants/routes';
import { buttonVariants } from '@/Components/ui/button';
import StaticLoadingOverlay from '@/Components/StaticLoadingOverlay';
import Import from '@/Pages/Step/Partials/Import';

export default function () {
    const Steps = lazy(() => import('./Partials/Steps'));
    return (
        <>
            <Head title="Step" />
            <AuthenticatedLayout>
                <div className="p-4">
                    <div className="flex gap-5 items-center">
                        <h1 className="text-page-header my-4">Step</h1>
                        <Link className={buttonVariants({ variant: 'default' })} href={route(`${ROUTES.STEPS}.create`)}>
                            Tambah Step
                        </Link>
                        {/*<Import />*/}
                    </div>
                    <Suspense fallback={<StaticLoadingOverlay />}>
                        <Steps />
                    </Suspense>
                </div>
            </AuthenticatedLayout>
        </>
    );
}
