import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { lazy, Suspense } from 'react';
import { Head, Link } from '@inertiajs/react';
import { ROUTES } from '@/support/constants/routes';
import { buttonVariants } from '@/Components/ui/button';
import StaticLoadingOverlay from '@/Components/StaticLoadingOverlay';

export default function () {
    const Projects = lazy(() => import('./Partials/Projects'));
    return (
        <>
            <Head title="Project" />
            <AuthenticatedLayout>
                <div className="p-4">
                    <div className="flex gap-5 items-center">
                        <h1 className="text-page-header my-4">Project</h1>
                        <Link
                            className={buttonVariants({ variant: 'default' })}
                            href={route(`${ROUTES.DIVISIONS}.create`)}
                        >
                            Tambah Project
                        </Link>
                    </div>
                    <Suspense fallback={<StaticLoadingOverlay />}>
                        <Projects />
                    </Suspense>
                </div>
            </AuthenticatedLayout>
        </>
    );
}
