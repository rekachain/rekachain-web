import StaticLoadingOverlay from '@/Components/StaticLoadingOverlay';
import { buttonVariants } from '@/Components/UI/button';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { ROUTES } from '@/Support/Constants/routes';
import { Head, Link } from '@inertiajs/react';
import { useLaravelReactI18n } from 'laravel-react-i18n';
import { lazy, Suspense } from 'react';
import { checkPermission } from '@/Helpers/sidebarHelper';
import { PERMISSION_ENUM } from '@/Support/Enums/permissionEnum';

export default function () {
    const { t } = useLaravelReactI18n();
    const WorkDays = lazy(() => import('./Partials/WorkDays'));
    return (
        <>
            <Head title={t('pages.work_day.index.title')} />
            <AuthenticatedLayout>
                <div className='p-4'>
                    <div className='flex items-center gap-5'>
                        <h1 className='text-page-header my-4'>{t('pages.work_day.index.title')}</h1>
                        {checkPermission(PERMISSION_ENUM.WORK_DAY_CREATE) && (
                        <Link
                            href={route(`${ROUTES.WORK_DAYS}.create`)}
                            className={buttonVariants({ variant: 'default' })}
                        >
                            {t('pages.work_day.index.buttons.create')}
                        </Link>
                        )}
                    </div>
                    <Suspense fallback={<StaticLoadingOverlay />}>
                        <WorkDays />
                    </Suspense>
                </div>
            </AuthenticatedLayout>
        </>
    );
}
