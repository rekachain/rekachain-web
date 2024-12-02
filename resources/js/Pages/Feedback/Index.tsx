import StaticLoadingOverlay from '@/Components/StaticLoadingOverlay';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useLaravelReactI18n } from 'laravel-react-i18n';
import { lazy, Suspense } from 'react';

export default function () {
    const { t } = useLaravelReactI18n();
    const Feedbacks = lazy(() => import('./Partials/Feedbacks'));
    return (
        <>
            <Head title={t('pages.feedback.index.title')} />
            <AuthenticatedLayout>
                <div className='p-4'>
                    <div className='flex items-center gap-5'>
                        <h1 className='text-page-header my-4'>{t('pages.feedback.index.title')}</h1>
                    </div>
                    <Suspense fallback={<StaticLoadingOverlay />}>
                        <Feedbacks />
                    </Suspense>
                </div>
            </AuthenticatedLayout>
        </>
    );
}
