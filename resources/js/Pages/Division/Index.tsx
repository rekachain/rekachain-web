import StaticLoadingOverlay from '@/Components/StaticLoadingOverlay';
import { buttonVariants } from '@/Components/UI/button';
import { checkPermission } from '@/Helpers/permissionHelper';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { ROUTES } from '@/Support/Constants/routes';
import { PERMISSION_ENUM } from '@/Support/Enums/permissionEnum';
import { Head, Link } from '@inertiajs/react';
import { useLaravelReactI18n } from 'laravel-react-i18n';
import { lazy, Suspense } from 'react';

export default function () {
    const { t } = useLaravelReactI18n();
    const Divisions = lazy(() => import('./Partials/Divisions'));
    return (
        <>
            <Head title={t('pages.division.index.title')} />
            <AuthenticatedLayout>
                <div className='p-4'>
                    <div className='flex items-center gap-5'>
                        <h1 className='text-page-header my-4'>{t('pages.division.index.title')}</h1>
                        {checkPermission(PERMISSION_ENUM.DIVISION_CREATE) && (
                            <Link
                                href={route(`${ROUTES.DIVISIONS}.create`)}
                                className={buttonVariants({ variant: 'default' })}
                            >
                                {t('pages.division.index.buttons.create')}
                            </Link>
                        )}
                    </div>
                    <Suspense fallback={<StaticLoadingOverlay />}>
                        <Divisions />
                    </Suspense>
                </div>
            </AuthenticatedLayout>
        </>
    );
}
