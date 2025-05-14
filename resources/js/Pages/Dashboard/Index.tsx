import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { PageProps } from '@/Types';
import { useLaravelReactI18n } from 'laravel-react-i18n';
import { lazy, Suspense, useEffect, useState } from 'react';
import { checkPermission } from '@/Helpers/permissionHelper';
import { PERMISSION_ENUM } from '@/Support/Enums/permissionEnum';
import { AttachmentStatusOfTrainsetResource, AttachmentStatusOfWorkstationResource, PaginateResponse, ReturnedProductTimeDiffResource, ReturnedProductTimeMinMaxResource, ServiceFilterOptions } from '@/Support/Interfaces/Others';
import { fetchEnumLabels } from '@/Helpers/enumHelper';
import Filters from './Partials/Filters';
import StaticLoadingOverlay from '@/Components/StaticLoadingOverlay';
import Checkbox from '@/Components/Checkbox';
import InputLabel from '@/Components/InputLabel';
import WorkstationProgressStatusBarChart from './Partials/WorkstationProgressStatusBarChart';
import TrainsetProgressStatusBarChart from './Partials/TrainsetProgressStatusBarChart';
import PanelProgressStatusBarChart from './Partials/PanelProgressStatusBarChart';
import WorkshopProgressStatusBarChart from './Partials/WorkshopProgressStatusBarChart';
import ReturnedProductStatusPieChart from './Partials/ReturnedProductStatusPieChart';
import ReturnedProductTimeMinMaxLineChart from './Partials/ReturnedProductTimeMinMaxLineChart';
import { withLoading } from '@/Utils/withLoading';
import { ProductProblemResource, ReplacementStockResource } from '@/Support/Interfaces/Resources';
import ReplacementStockThresholdStackBarChart from './Partials/ReplacementStockThresholdStackBarChart';

export default function Dashboard({ 
    data, trainsetStatusProgress, workstationStatusProgress, returnedProductStatus, returnedProductTimeDiff, returnedProductTimeMinMax, replacementStocks, productProblems
}: {
    data: PageProps
    trainsetStatusProgress: AttachmentStatusOfTrainsetResource[]
    workstationStatusProgress: AttachmentStatusOfWorkstationResource[]
    returnedProductStatus: { name: string; value: number }[] | null
    returnedProductTimeDiff: PaginateResponse<ReturnedProductTimeDiffResource> | null
    returnedProductTimeMinMax: ReturnedProductTimeMinMaxResource[] | null
    replacementStocks: ReplacementStockResource[]
    productProblems: PaginateResponse<ProductProblemResource> | null
}) {
    const ReturnedProductTimeDiffChart = lazy(() => import('./Partials/ReturnedProductTimeDiffChart'));
    const ProductProblemDataView = lazy(() => import('./Partials/ProductProblemDataView'));

    const [localizedReturnedProductStatuses, setLocalizedReturnedProductStatuses] = useState<
        Record<string, string>
    >({});
    const [localizedWorkstationStatuses, setLocalizedWorkstationStatuses] = useState<
        Record<string, string>
    >({});
    const [localizedTrainsetStatuses, setLocalizedTrainsetStatuses] = useState<
        Record<string, string>
    >({});

    const [filters, setFilters] = useState<ServiceFilterOptions>({
        project_id: null,
        trainset_id: null,
        returned_product: {
            year: '',
            month: 0,
        },
        useMerged: true,
    });

    const { t, setLocale } = useLaravelReactI18n();

    const [lastSyncLocalizedEnumsTime, setLastSyncLocalizedEnumsTime] = useState<number | null>(null);

    const syncLocalizedEnums = withLoading(
        async () => {
            const now = Date.now();
            if (lastSyncLocalizedEnumsTime === null || now - lastSyncLocalizedEnumsTime > 5000) {
                setLastSyncLocalizedEnumsTime(now);
                await fetchEnumLabels(['ReturnedProductStatusEnum', 'PanelAttachmentStatusEnum'])
                    .then((response) => {
                        setLocalizedReturnedProductStatuses(response.ReturnedProductStatusEnum);
                        setLocalizedWorkstationStatuses(response.PanelAttachmentStatusEnum);
                        setLocalizedTrainsetStatuses(response.PanelAttachmentStatusEnum);
                    })
                    .catch((error) => console.error('Failed to fetch localized statuses:', error));
            }
        }
    );

    useEffect(() => {
        syncLocalizedEnums();
    }, [setLocale]);

    return (
        <AuthenticatedLayout>
            <Head title={t('pages.dashboard.index.title')} />
            <div
                className={`max-w-7xl mx-auto px-3 sm:px-6 lg:px-5`}
            >
                <div className='overflow-hidden bg-white shadow-sm dark:bg-transparent sm:rounded-lg'>
                    <div className=''>
                        <h1 className='mt-2 text-3xl font-bold'>Dashboard</h1>
                        <div className='flex w-full items-center justify-between'>
                            <div className="flex">
                                <h2 className='my-2 text-xl'>
                                    {data['project'] == null
                                        ? t('pages.dashboard.index.all_project')
                                        : `${t('pages.dashboard.index.project')} ${data['project']}`}
                                </h2>
                            </div>
                            <div className="flex gap-2">
                                <Filters data={data} filters={filters} setFilters={setFilters}/>
                            </div>
                        </div>
                        {checkPermission([PERMISSION_ENUM.RETURNED_PRODUCT_CREATE]) && returnedProductTimeDiff && returnedProductTimeMinMax && returnedProductStatus && productProblems && (
                            <>
                                <h2 className='my-1 text-xl font-bold'>
                                    Returned Product
                                </h2>
                                <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
                                    <ReturnedProductStatusPieChart data={returnedProductStatus} localizedStatuses={localizedReturnedProductStatuses} filters={filters} />
                                    <Suspense fallback={<StaticLoadingOverlay />}>
                                        <ReturnedProductTimeDiffChart data={returnedProductTimeDiff} />
                                    </Suspense>
                                </div>
                                <ReturnedProductTimeMinMaxLineChart data={returnedProductTimeMinMax} filters={filters} />
                                <ReplacementStockThresholdStackBarChart data={replacementStocks} filters={filters} />
                                {/* <Suspense fallback={<StaticLoadingOverlay />}>
                                    <ProductProblemDataView data={productProblems} />
                                </Suspense> */}
                            </>
                        )}
                        <div className='my-4 flex items-center justify-between'>
                            <h2 className='text-lg'>
                                {t('pages.dashboard.index.all_trainset_status')}
                            </h2>
                        </div>
                        <TrainsetProgressStatusBarChart data={trainsetStatusProgress} localizedStatuses={localizedTrainsetStatuses} filters={filters} />
                        <h2 className='my-1 text-xl font-bold'>
                            {t('pages.dashboard.index.progress_workshops')}
                        </h2>
                        <h3 className='text-base'>Workshop Sukosari, Candisewu</h3>
                        <WorkshopProgressStatusBarChart data={data['ws']} />

                        <h2 className='my-1 text-xl font-bold'>
                            {t('pages.dashboard.index.progress_panels')}
                        </h2>
                        <h3 className='text-base'>
                            {t('pages.dashboard.index.panels_title')}
                        </h3>
                        <PanelProgressStatusBarChart data={data['panel']} />
                        <h2 className='my-1 text-xl font-bold'>
                            {t('pages.dashboard.index.all_workstations')}
                        </h2>
                        <h3 className='text-base'>{t('pages.dashboard.index.workstations_sub')}</h3>
                        <WorkstationProgressStatusBarChart data={workstationStatusProgress} localizedStatuses={localizedWorkstationStatuses} filters={filters} />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
