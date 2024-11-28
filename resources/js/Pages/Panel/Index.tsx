import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { lazy, Suspense } from 'react';
import { Head, Link } from '@inertiajs/react';
import { ROUTES } from '@/Support/Constants/routes';
import { buttonVariants } from '@/Components/UI/button';
import StaticLoadingOverlay from '@/Components/StaticLoadingOverlay';
import Import from '@/Pages/Panel/Partials/Import';
import { useLaravelReactI18n } from 'laravel-react-i18n';

export default function () {
    const { t } = useLaravelReactI18n();
    const Panels = lazy(() => import('./Partials/Panels'));
    return (
        <>
            <Head title={t('pages.panel.index.title')} />
            <AuthenticatedLayout>
                <div className='p-4'>
                    <div className='flex items-center gap-5'>
                        <h1 className='text-page-header my-4'>{t('pages.panel.index.title')}</h1>
                        <Link
                            href={route(`${ROUTES.PANELS}.create`)}
                            className={buttonVariants({ variant: 'default' })}
                        >
                            {t('pages.panel.index.buttons.create')}
                        </Link>
                        <Import />
                    </div>
                    <Suspense fallback={<StaticLoadingOverlay />}>
                        <Panels />
                    </Suspense>
                </div>
            </AuthenticatedLayout>
        </>
    );
}
