import StaticLoadingOverlay from '@/Components/StaticLoadingOverlay';
import { buttonVariants } from '@/Components/UI/button';
import { checkPermission } from '@/Helpers/permissionHelper';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Import from '@/Pages/ReplacementStock/Partials/Import';
import { ROUTES } from '@/Support/Constants/routes';
import { PERMISSION_ENUM } from '@/Support/Enums/permissionEnum';
import { Head, Link } from '@inertiajs/react';
import { useLaravelReactI18n } from 'laravel-react-i18n';
import { lazy, Suspense } from 'react';

export default function () {
    const { t } = useLaravelReactI18n();
    const ReplacementStocks = lazy(() => import('./Partials/ReplacementStocks'));
    return (
        <>
            <Head title={t('pages.replacement_stock.index.title')} />
            <AuthenticatedLayout>
                <div className='p-4'>
                    <div className='flex items-center gap-5'>
                        <h1 className='text-page-header my-4'>{t('pages.replacement_stock.index.title')}</h1>
                        {/* {checkPermission(PERMISSION_ENUM.REPLACEMENT_STOCK_CREATE) && (
                            <Link
                                href={route(`${ROUTES.REPLACEMENT_STOCKS}.create`)}
                                className={buttonVariants({ variant: 'default' })}
                            >
                                {t('pages.replacement_stock.index.buttons.create')}
                            </Link>
                        )} */}
                        {checkPermission(PERMISSION_ENUM.REPLACEMENT_STOCK_IMPORT) && <Import />}
                    </div>
                    <Suspense fallback={<StaticLoadingOverlay />}>
                        <ReplacementStocks />
                    </Suspense>
                </div>
            </AuthenticatedLayout>
        </>
    );
}
