import StaticLoadingOverlay from '@/Components/StaticLoadingOverlay';
import { buttonVariants } from '@/Components/UI/button';
import { fetchEnumLabels } from '@/Helpers/enumHelper';
import { checkPermission } from '@/Helpers/permissionHelper';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { ROUTES } from '@/Support/Constants/routes';
import { PERMISSION_ENUM } from '@/Support/Enums/permissionEnum';
import {
    AttachmentStatusOfTrainsetResource,
    AttachmentStatusOfWorkstationResource,
    PaginateResponse,
    ReturnedProductTimeDiffResource,
    ReturnedProductTimeMinMaxResource,
    ServiceFilterOptions,
    VendorProblemResource,
} from '@/Support/Interfaces/Others';
import { ReplacementStockResource } from '@/Support/Interfaces/Resources';
import { PageProps } from '@/Types';
import { withLoading } from '@/Utils/withLoading';
import { Head, Link } from '@inertiajs/react';
import { useLaravelReactI18n } from 'laravel-react-i18n';
import { lazy, Suspense, useEffect, useState } from 'react';
import Filters from './Partials/Filters';
import PanelProgressStatusBarChart from './Partials/PanelProgressStatusBarChart';
import ReplacementStockThresholdStackBarChart from './Partials/ReplacementStockThresholdStackBarChart';
import ReturnedProductStatusPieChart from './Partials/ReturnedProductStatusPieChart';
import ReturnedProductTimeMinMaxLineChart from './Partials/ReturnedProductTimeMinMaxLineChart';
import TrainsetProgressStatusBarChart from './Partials/TrainsetProgressStatusBarChart';
import WorkshopProgressStatusBarChart from './Partials/WorkshopProgressStatusBarChart';
import WorkstationProgressStatusBarChart from './Partials/WorkstationProgressStatusBarChart';

export default function Dashboard({
    data,
    trainsetStatusProgress,
    workstationStatusProgress,
    returnedProductStatus,
    returnedProductTimeDiff,
    returnedProductTimeMinMax,
    replacementStocks,
    vendorProblems,
}: {
    data: PageProps;
    trainsetStatusProgress: AttachmentStatusOfTrainsetResource[];
    workstationStatusProgress: AttachmentStatusOfWorkstationResource[];
    returnedProductStatus: { name: string; value: number }[] | null;
    returnedProductTimeDiff: PaginateResponse<ReturnedProductTimeDiffResource> | null;
    returnedProductTimeMinMax: ReturnedProductTimeMinMaxResource[] | null;
    replacementStocks: ReplacementStockResource[];
    vendorProblems: PaginateResponse<VendorProblemResource> | null;
}) {
    const ReturnedProductTimeDiffChart = lazy(
        () => import('./Partials/ReturnedProductTimeDiffChart'),
    );
    const VendorProblemDataView = lazy(() => import('./Partials/VendorProblemDataView'));

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

    const [lastSyncLocalizedEnumsTime, setLastSyncLocalizedEnumsTime] = useState<number | null>(
        null,
    );

    const syncLocalizedEnums = withLoading(async () => {
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
    });

    useEffect(() => {
        syncLocalizedEnums();
    }, [setLocale]);

    return (
        <AuthenticatedLayout>
            <Head title={t('pages.dashboard.index.title')} />
            <div className={`mx-auto max-w-7xl px-3 sm:px-6 lg:px-5`}>
                <div className='overflow-hidden bg-white shadow-sm dark:bg-transparent sm:rounded-lg'>
                    <div className=''>
                        <h1 className='mt-2 text-3xl font-bold'>
                            {t('pages.dashboard.index.title')}
                        </h1>
                        <div className='flex w-full items-center justify-between'>
                            <div className='flex'>
                                <h2 className='my-2 text-xl'>
                                    {data['project'] == null
                                        ? t('pages.dashboard.index.all_project')
                                        : `${t('pages.dashboard.index.project')} ${data['project']}`}
                                </h2>
                            </div>
                            <div className='flex gap-2'>
                                <Filters setFilters={setFilters} filters={filters} />
                            </div>
                        </div>
                        {checkPermission([PERMISSION_ENUM.RETURNED_PRODUCT_CREATE]) &&
                            returnedProductTimeMinMax &&
                            returnedProductStatus &&
                            vendorProblems && (
                                <>
                                    <div className='my-1 flex items-center gap-2'>
                                        <h2 className='flex text-xl font-bold'>
                                            {t('pages.dashboard.index.returned_product')}
                                        </h2>
                                        <Link
                                            href={route(`${ROUTES.DASHBOARD}.product-problems`)}
                                            className={buttonVariants({ variant: 'outline' })}
                                        >
                                            {t('pages.dashboard.index.show_problem_analysis')}
                                        </Link>
                                    </div>
                                    <div className='grid grid-cols-1 gap-2 md:grid-cols-2'>
                                        <div className='flex flex-col gap-1'>
                                            <h3 className='mt-5 text-center text-sm font-bold'>
                                                {t('pages.dashboard.index.returned_product_status')}
                                            </h3>
                                            <ReturnedProductStatusPieChart
                                                localizedStatuses={localizedReturnedProductStatuses}
                                                filters={filters}
                                                data={returnedProductStatus}
                                            />
                                        </div>
                                        <div className='flex flex-col gap-1'>
                                            <h3 className='mt-5 text-sm font-bold'>
                                                {t(
                                                    'pages.dashboard.index.returned_product_time_difference',
                                                )}
                                            </h3>
                                            <Suspense fallback={<StaticLoadingOverlay />}>
                                                <ReturnedProductTimeDiffChart
                                                    data={returnedProductTimeDiff!}
                                                />
                                            </Suspense>
                                        </div>
                                    </div>
                                    <div className='flex gap-2'>
                                        <div className='w-1/3'>
                                            <h3 className='mt-5 text-sm font-bold'>
                                                {t('pages.dashboard.index.vendor_problems')}
                                            </h3>
                                            <Suspense fallback={<StaticLoadingOverlay />}>
                                                <VendorProblemDataView data={vendorProblems} />
                                            </Suspense>
                                        </div>
                                        <div className='w-2/3'>
                                            <h3 className='mt-5 text-center text-sm font-bold'>
                                                {t(
                                                    'pages.dashboard.index.returned_product_time_min_max',
                                                )}
                                            </h3>
                                            <ReturnedProductTimeMinMaxLineChart
                                                filters={filters}
                                                data={returnedProductTimeMinMax}
                                            />
                                        </div>
                                    </div>
                                    <div className='gap-2'>
                                        <h3 className='mt-5 text-sm font-bold'>
                                            {t('pages.dashboard.index.replacement_stock_threshold')}
                                        </h3>
                                        <ReplacementStockThresholdStackBarChart
                                            filters={filters}
                                            data={replacementStocks}
                                        />
                                    </div>
                                </>
                            )}
                        {checkPermission([PERMISSION_ENUM.DASHBOARD_READ]) && (
                            <>
                                <div className='my-4 flex items-center justify-between'>
                                    <h2 className='text-lg'>
                                        {t('pages.dashboard.index.all_trainset_status')}
                                    </h2>
                                </div>
                                <div className='flex flex-col gap-1'>
                                    <h3 className='mt-5 text-sm font-bold'>
                                        {t('pages.dashboard.index.trainset_status_progress')}
                                    </h3>
                                    <TrainsetProgressStatusBarChart
                                        localizedStatuses={localizedTrainsetStatuses}
                                        filters={filters}
                                        data={trainsetStatusProgress}
                                    />
                                </div>
                                <div className='flex flex-col gap-1'>
                                    <h3 className='mt-5 text-sm font-bold'>
                                        {t('pages.dashboard.index.progress_workshops')}
                                    </h3>
                                    <h3 className='text-base'>
                                        {t('pages.dashboard.index.progress_workshops_sub')}
                                    </h3>
                                    <WorkshopProgressStatusBarChart data={data['ws']} />
                                </div>

                                <div className='flex flex-col gap-1'>
                                    <h3 className='mt-5 text-sm font-bold'>
                                        {t('pages.dashboard.index.progress_panels')}
                                    </h3>
                                    <h3 className='text-base'>
                                        {t('pages.dashboard.index.panels_title')}
                                    </h3>
                                    <PanelProgressStatusBarChart data={data['panel']} />
                                </div>

                                <div className='flex flex-col gap-1'>
                                    <h3 className='mt-5 text-sm font-bold'>
                                        {t('pages.dashboard.index.all_workstations')}
                                    </h3>
                                    <h3 className='text-base'>
                                        {t('pages.dashboard.index.workstations_sub')}
                                    </h3>
                                    <WorkstationProgressStatusBarChart
                                        localizedStatuses={localizedWorkstationStatuses}
                                        filters={filters}
                                        data={workstationStatusProgress}
                                    />
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
