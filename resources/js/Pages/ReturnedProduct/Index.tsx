import StaticLoadingOverlay from '@/Components/StaticLoadingOverlay';
import { buttonVariants } from '@/Components/UI/button';
import { checkPermission } from '@/Helpers/permissionHelper';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { ROUTES } from '@/Support/Constants/routes';
import { PERMISSION_ENUM } from '@/Support/Enums/permissionEnum';
import { Head, Link } from '@inertiajs/react';
import { useLaravelReactI18n } from 'laravel-react-i18n';
import { lazy, Suspense } from 'react';
import Import from './Partials/Import';

export default function () {
    const { t } = useLaravelReactI18n();
    const ReturnedProducts = lazy(() => import('./Partials/ReturnedProduct'));
    return (
        <>
            <Head title={t('pages.returned_product.index.title')} />
            <AuthenticatedLayout>
                <div className='p-4'>
                    <div className='flex items-center gap-5'>
                        <h1 className='text-page-header my-4'>
                            {t('pages.returned_product.index.title')}
                        </h1>
                        {checkPermission(PERMISSION_ENUM.RETURNED_PRODUCT_CREATE) && (
                            <Link
                                href={route(`${ROUTES.RETURNED_PRODUCTS}.create`)}
                                className={buttonVariants({ variant: 'default' })}
                            >
                                {t('pages.returned_product.index.buttons.create')}
                            </Link>
                        )}
                        {checkPermission(PERMISSION_ENUM.RETURNED_PRODUCT_IMPORT) && <Import />}
                    </div>
                    <Suspense fallback={<StaticLoadingOverlay />}>
                        <ReturnedProducts />
                    </Suspense>
                </div>
            </AuthenticatedLayout>
        </>
    );
}
