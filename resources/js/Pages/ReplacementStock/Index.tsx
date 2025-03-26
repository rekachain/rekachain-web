import StaticLoadingOverlay from '@/Components/StaticLoadingOverlay';
import { buttonVariants } from '@/Components/UI/button';
import { checkPermission } from '@/Helpers/permissionHelper';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Import from '@/Pages/ReplacementStock/Partials/Import';
import { ROUTES } from '@/Support/Constants/routes';
import { PERMISSION_ENUM } from '@/Support/Enums/permissionEnum';
import { Head, Link } from '@inertiajs/react';
import { useLaravelReactI18n } from 'laravel-react-i18n';
import { lazy, Suspense, useCallback, useState } from 'react';
import AddStock from './Partials/AddStock';
import { withLoading } from '@/Utils/withLoading';
import { replacementStockService } from '@/Services/replacementStockService';
import { PaginateResponse } from '@/Support/Interfaces/Others';
import { ReplacementStockResource } from '@/Support/Interfaces/Resources';

export default function () {
    const { t } = useLaravelReactI18n();
    const ReplacementStocks = lazy(() => import('./Partials/ReplacementStocks'));
    const [replacementStockResponse, setReplacementStockResponse] = useState<PaginateResponse<ReplacementStockResource>>();
    const syncReplacementStocks = useCallback(
        withLoading(async () => {
            const res = await replacementStockService.getAll({ page: 1, perPage: 10, relations: 'component' });
            setReplacementStockResponse(res);
        }),
        []
    );
    return (
        <>
            <Head title={t('pages.replacement_stock.index.title')} />
            <AuthenticatedLayout>
                <div className='p-4'>
                    <div className='flex items-center gap-5'>
                        <h1 className='text-page-header my-4'>{t('pages.replacement_stock.index.title')}</h1>
                        {checkPermission(PERMISSION_ENUM.REPLACEMENT_STOCK_CREATE) && (
                            <AddStock replacementStock={null} handleSyncReplacementStocks={syncReplacementStocks}/>
                        )}
                        {checkPermission(PERMISSION_ENUM.REPLACEMENT_STOCK_IMPORT) && <Import />}
                    </div>
                    <Suspense fallback={<StaticLoadingOverlay />}>
                        <ReplacementStocks baseReplacementStockResponse={replacementStockResponse}/>
                    </Suspense>
                </div>
            </AuthenticatedLayout>
        </>
    );
}
