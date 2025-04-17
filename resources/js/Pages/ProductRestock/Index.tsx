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
    const ProductRestocks = lazy(() => import('./Partials/ProductRestock'));
    return (
        <>
            <Head title={t('pages.product_restock.index.title')} />
            <AuthenticatedLayout>
                <div className='p-4'>
                    <div className='flex items-center gap-5'>
                        <h1 className='text-page-header my-4'>
                            {t('pages.product_restock.index.title')}
                        </h1>
                        {checkPermission(PERMISSION_ENUM.PRODUCT_RESTOCK_CREATE) && (
                            <Link
                                href={route(`${ROUTES.PRODUCT_RESTOCKS}.create`)}
                                className={buttonVariants({ variant: 'default' })}
                            >
                                {t('pages.product_restock.index.buttons.create')}
                            </Link>
                        )}
                    </div>
                    <Suspense fallback={<StaticLoadingOverlay />}>
                        <ProductRestocks />
                    </Suspense>
                </div>
            </AuthenticatedLayout>
        </>
    );
}
