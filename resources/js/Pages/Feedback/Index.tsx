import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { lazy, Suspense } from 'react';
import { Head } from '@inertiajs/react';
import StaticLoadingOverlay from '@/Components/StaticLoadingOverlay';

export default function () {
    const Feedbacks = lazy(() => import('./Partials/Feedbacks'));
    return (
        <>
            <Head title="Feedback" />
            <AuthenticatedLayout>
                <div className="p-4">
                    <div className="flex gap-5 items-center">
                        <h1 className="text-page-header my-4">Feedback</h1>
                    </div>
                    <Suspense fallback={<StaticLoadingOverlay />}>
                        <Feedbacks />
                    </Suspense>
                </div>
            </AuthenticatedLayout>
        </>
    );
}
