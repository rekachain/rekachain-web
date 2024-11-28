import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { lazy, Suspense } from 'react';
import { Head, Link } from '@inertiajs/react';
import { ROUTES } from '@/Support/Constants/routes';
import { buttonVariants } from '@/Components/UI/button';
import StaticLoadingOverlay from '@/Components/StaticLoadingOverlay';
import { useLaravelReactI18n } from 'laravel-react-i18n';

export default function () {
    const { t } = useLaravelReactI18n();
    const Roles = lazy(() => import('./Partials/Roles'));
    return (
        <>
            <Head title={t('pages.role.index.title')} />
            <AuthenticatedLayout>
                <div className='p-4'>
                    <div className='flex items-center gap-5'>
                        <h1 className='text-page-header my-4'>{t('pages.role.index.title')}</h1>
                        <Link
                            href={route(`${ROUTES.ROLES}.create`)}
                            className={buttonVariants({ variant: 'default' })}
                        >
                            {t('pages.role.index.buttons.create')}
                        </Link>
                    </div>
                    <Suspense fallback={<StaticLoadingOverlay />}>
                        <Roles />
                    </Suspense>
                </div>
            </AuthenticatedLayout>
        </>
    );
}
