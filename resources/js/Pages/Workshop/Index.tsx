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
    const Workshops = lazy(() => import('./Partials/Workshops'));
    return (
        <>
            <Head title={t('pages.workshop.index.title')} />
            <AuthenticatedLayout>
                <div className='p-4'>
                    <div className='flex items-center gap-5'>
                        <h1 className='text-page-header my-4'>{t('pages.workshop.index.title')}</h1>
                        {checkPermission(PERMISSION_ENUM.WORKSHOP_CREATE) && (
                        <Link
                            href={route(`${ROUTES.WORKSHOPS}.create`)}
                            className={buttonVariants({ variant: 'default' })}
                        >
                            {t('pages.workshop.index.buttons.create')}
                        </Link>
                        )}
                    </div>
                    <Suspense fallback={<StaticLoadingOverlay />}>
                        <Workshops />
                    </Suspense>
                </div>
            </AuthenticatedLayout>
        </>
    );
}
