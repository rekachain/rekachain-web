import StaticLoadingOverlay from '@/Components/StaticLoadingOverlay';
import { buttonVariants } from '@/Components/UI/button';
import { checkPermission } from '@/Helpers/sidebarHelper';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { ROUTES } from '@/Support/Constants/routes';
import { PERMISSION_ENUM } from '@/Support/Enums/permissionEnum';
import { Head, Link } from '@inertiajs/react';
import { useLaravelReactI18n } from 'laravel-react-i18n';
import { lazy, Suspense } from 'react';

export default function () {
    const { t } = useLaravelReactI18n();
    const Components = lazy(() => import('./Partials/Components'));
    return (
        <>
            <Head title={t('pages.component.index.title')} />
            <AuthenticatedLayout>
                <div className='p-4'>
                    <div className='flex items-center gap-5'>
                        <h1 className='text-page-header my-4'>
                            {t('pages.component.index.title')}
                        </h1>
                        {checkPermission(PERMISSION_ENUM.COMPONENT_CREATE) && (
                            <Link
                            href={route(`${ROUTES.COMPONENTS}.create`)}
                            className={buttonVariants({ variant: 'default' })}
                            >
                            {t('pages.component.index.buttons.create')}
                        </Link>
                        )}
                        {/*<Import />*/}
                    </div>
                    <Suspense fallback={<StaticLoadingOverlay />}>
                        <Components />
                    </Suspense>
                </div>
            </AuthenticatedLayout>
        </>
    );
}
