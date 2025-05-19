import StaticLoadingOverlay from '@/Components/StaticLoadingOverlay';
import { Button } from '@/Components/UI/button';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { ROUTES } from '@/Support/Constants/routes';
import { IntentEnum } from '@/Support/Enums/intentEnum';
import { PaginateResponse } from '@/Support/Interfaces/Others';
import { ProductProblemAnalysisResource } from '@/Support/Interfaces/Resources';
import { withLoading } from '@/Utils/withLoading';
import { Head } from '@inertiajs/react';
import { useLaravelReactI18n } from 'laravel-react-i18n';
import { lazy, Suspense } from 'react';

export default function (data: PaginateResponse<ProductProblemAnalysisResource>) {
    const { t } = useLaravelReactI18n();
    const ProductProblemAnalysis = lazy(() => import('./Partials/ProductProblemAnalysisDataView'));
    const dispatchProductProblemAnalytics = withLoading(async () => {
        await window.axios.get(
            route(`${ROUTES.DASHBOARD}`, {
                intent: IntentEnum.WEB_DASHBOARD_DISPATCH_PRODUCT_PROBLEM_ANALYSIS,
                // ...filters,
            }),
        );
    });
    return (
        <>
            <Head title={t('pages.dashboard.product_problem_analysis.title')} />
            <AuthenticatedLayout>
                <div className='p-4'>
                    <div className='flex items-center gap-5'>
                        <h1 className='text-page-header my-4'>
                            {t('pages.dashboard.product_problem_analysis.title')}
                        </h1>
                        <Button variant={'outline'} onClick={dispatchProductProblemAnalytics}>
                            Analyze Problem
                        </Button>
                    </div>
                    <Suspense fallback={<StaticLoadingOverlay />}>
                        <ProductProblemAnalysis data={data} />
                    </Suspense>
                </div>
            </AuthenticatedLayout>
        </>
    );
}
