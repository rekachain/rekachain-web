import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { lazy, Suspense } from 'react';
import { Head, Link } from '@inertiajs/react';
import { ROUTES } from '@/Support/Constants/routes';
import { buttonVariants } from '@/Components/UI/button';
import StaticLoadingOverlay from '@/Components/StaticLoadingOverlay';
import { useLaravelReactI18n } from 'laravel-react-i18n';

export default function () {
    const { t } = useLaravelReactI18n();
    const Steps = lazy(() => import('./Partials/Steps'));
    return (
        <>
            <Head title={t('pages.step.index.title')} />
            <AuthenticatedLayout>
                <div className='p-4'>
                    <div className='flex items-center gap-5'>
                        <h1 className='text-page-header my-4'>{t('pages.step.index.title')}</h1>
                        <Link
                            href={route(`${ROUTES.STEPS}.create`)}
                            className={buttonVariants({ variant: 'default' })}
                        >
                            {t('pages.step.index.buttons.create')}
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
