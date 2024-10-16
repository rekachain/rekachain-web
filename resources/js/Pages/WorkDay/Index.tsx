import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { lazy, Suspense } from 'react';
import { Head, Link } from '@inertiajs/react';
import { ROUTES } from '@/Support/Constants/routes';
import { buttonVariants } from '@/Components/UI/button';
import StaticLoadingOverlay from '@/Components/StaticLoadingOverlay';

export default function () {
    const WorkDays = lazy(() => import('./Partials/WorkDays'));
    return (
        <>
            <Head title="WorkDay" />
            <AuthenticatedLayout>
                <div className="p-4">
                    <div className="flex gap-5 items-center">
                        <h1 className="text-page-header my-4">WorkDay</h1>
                        <Link
                            className={buttonVariants({ variant: 'default' })}
                            href={route(`${ROUTES.WORK_DAYS}.create`)}
                        >
                            Tambah WorkDay
                        </Link>
                    </div>
                    <Suspense fallback={<StaticLoadingOverlay />}>
                        <WorkDays />
                    </Suspense>
                </div>
            </AuthenticatedLayout>
        </>
    );
}
