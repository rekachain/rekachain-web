import StaticLoadingOverlay from '@/Components/StaticLoadingOverlay';
import { buttonVariants } from '@/Components/UI/button';
import { checkPermission } from '@/Helpers/permissionHelper';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Import from '@/Pages/Panel/Partials/Import';
import { ROUTES } from '@/Support/Constants/routes';
import { PERMISSION_ENUM } from '@/Support/Enums/permissionEnum';
import { Head, Link } from '@inertiajs/react';
import { useLaravelReactI18n } from 'laravel-react-i18n';
import { lazy, Suspense } from 'react';

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
                        {checkPermission(PERMISSION_ENUM.PANEL_CREATE) && (
                            <Link
                                href={route(`${ROUTES.PANELS}.create`)}
                                className={buttonVariants({ variant: 'default' })}
                            >
                                {t('pages.panel.index.buttons.create')}
                            </Link>
                        )}
                        {checkPermission(PERMISSION_ENUM.PANEL_IMPORT) && <Import />}
                    </div>
                    <Suspense fallback={<StaticLoadingOverlay />}>
                        <Panels />
                    </Suspense>
                </div>
            </AuthenticatedLayout>
        </>
    );
}
