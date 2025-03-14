import StaticLoadingOverlay from '@/Components/StaticLoadingOverlay';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useLaravelReactI18n } from 'laravel-react-i18n';
import { lazy, Suspense } from 'react';
import AddRequest from './Partials/AddRequest';

export default function () {
    const { t } = useLaravelReactI18n();
    const RequestedReturn = lazy(() => import('./Partials/RequestedReturn'));
    return (
        <>
            <Head title={t('pages.returned_product.requested_return.index.title')} />
            <AuthenticatedLayout>
                <div className='p-4'>
                    <div className='flex items-center gap-5'>
                        <h1 className='text-page-header my-4'>
                            {t('pages.returned_product.requested_return.index.title')}
                        </h1>
                        <AddRequest />
                    </div>
                    <Suspense fallback={<StaticLoadingOverlay />}>
                        <RequestedReturn />
                    </Suspense>
                </div>
            </AuthenticatedLayout>
        </>
    );
}
