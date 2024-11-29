import StaticLoadingOverlay from '@/Components/StaticLoadingOverlay';
import { buttonVariants } from '@/Components/UI/button';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Import from '@/Pages/Carriage/Partials/Import';
import { ROUTES } from '@/Support/Constants/routes';
import { Head, Link } from '@inertiajs/react';
import { useLaravelReactI18n } from 'laravel-react-i18n';
import { lazy, Suspense } from 'react';

export default function () {
    const { t } = useLaravelReactI18n();
    const Carriages = lazy(() => import('./Partials/Carriages'));
    return (
        <>
            <Head title='Carriage' />
            <AuthenticatedLayout>
                <div className='p-4'>
                    <div className='flex items-center gap-5'>
                        <h1 className='text-page-header my-4'>{t('pages.carriage.index.title')}</h1>
                        <Link
                            href={route(`${ROUTES.CARRIAGES}.create`)}
                            className={buttonVariants({ variant: 'default' })}
                        >
                            {t('pages.carriage.index.buttons.create')}
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
