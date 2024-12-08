import StaticLoadingOverlay from '@/Components/StaticLoadingOverlay';
import { buttonVariants } from '@/Components/UI/button';
import { checkPermission } from '@/Helpers/sidebarHelper';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Import from '@/Pages/RawMaterial/Partials/Import';
import { ROUTES } from '@/Support/Constants/routes';
import { PERMISSION_ENUM } from '@/Support/Enums/permissionEnum';
import { Head, Link } from '@inertiajs/react';
import { useLaravelReactI18n } from 'laravel-react-i18n';
import { lazy, Suspense } from 'react';

export default function () {
    const { t } = useLaravelReactI18n();
    const RawMaterials = lazy(() => import('./Partials/RawMaterials'));
    return (
        <>
            <Head title={t('pages.raw_material.index.title')} />
            <AuthenticatedLayout>
                <div className='p-4'>
                    <div className='flex flex-col gap-5 md:flex-row md:items-center'>
                        <h1 className='text-page-header my-4'>
                            {t('pages.raw_material.index.title')}
                        </h1>
                        {checkPermission(PERMISSION_ENUM.RAW_MATERIAL_CREATE) && (
                        <Link
                            href={route(`${ROUTES.RAW_MATERIALS}.create`)}
                            className={buttonVariants({ variant: 'default' })}
                        >
                            {t('pages.raw_material.index.buttons.create')}
                        </Link>
                        )}
                        {checkPermission(PERMISSION_ENUM.RAW_MATERIAL_IMPORT) && (
                            <Import />
                        )}
                    </div>
                    <Suspense fallback={<StaticLoadingOverlay />}>
                        <RawMaterials />
                    </Suspense>
                </div>
            </AuthenticatedLayout>
        </>
    );
}
