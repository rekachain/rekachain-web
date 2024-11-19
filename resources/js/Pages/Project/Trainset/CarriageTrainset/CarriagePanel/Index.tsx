import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { lazy, memo, Suspense, useEffect, useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import StaticLoadingOverlay from '@/Components/StaticLoadingOverlay';
import {
    CarriageTrainsetResource,
    PanelResource,
    ProjectResource,
    TrainsetResource,
} from '@/Support/Interfaces/Resources';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from '@/Components/UI/breadcrumb';
import { ROUTES } from '@/Support/Constants/routes';
import { panelService } from '@/Services/panelService';
import { PaginateResponse } from '@/Support/Interfaces/Others';
import { fetchGenericData } from '@/Helpers/dataManagementHelper';
import { TrainsetStatusEnum } from '@/Support/Enums/trainsetStatusEnum';
import { withLoading } from '@/Utils/withLoading';
import { useLaravelReactI18n } from 'laravel-react-i18n';
import AddNewPanel from '@/Pages/Project/Trainset/CarriageTrainset/CarriagePanel/Partials/AddNewPanel';

const Panels = memo(lazy(() => import('./Partials/Panels')));

export default function ({
    project,
    trainset,
    carriageTrainset: initialCarriageTrainset,
}: {
    project: ProjectResource;
    trainset: TrainsetResource;
    carriageTrainset: CarriageTrainsetResource;
}) {
    const { t } = useLaravelReactI18n();
    const [carriageTrainset, setCarriageTrainset] = useState<CarriageTrainsetResource>(initialCarriageTrainset);
    const [panelResponse, setPanelResponse] = useState<PaginateResponse<PanelResource>>();

    const fetchInitialPanelData = withLoading(async () => {
        const res = await panelService.getAll();
        setPanelResponse(res);
    });

    useEffect(() => {
        void fetchInitialPanelData();
    }, []);

    // const handleChangeSearchPanelName = async (e: ChangeEvent<HTMLInputElement>) => {
    //     setData('search_panel', e.target.value);
    // };

    const handleSyncCarriage = withLoading(async () => {
        const data = await fetchGenericData<{ carriageTrainset: CarriageTrainsetResource }>();
        setCarriageTrainset(data.carriageTrainset);
    });

    return (
        <>
            <Head title={`Carriage: ${carriageTrainset?.carriage.type}`} />
            <AuthenticatedLayout>
                <div className="p-4 space-y-4">
                    <div className="flex flex-col gap-2">
                        <Breadcrumb>
                            <BreadcrumbList>
                                <BreadcrumbItem>
                                    <Link href={route(`${ROUTES.PROJECTS}.index`)}>
                                        {t('pages.project.trainset.carriage.panel.index.breadcrumbs.home')}
                                    </Link>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator />
                                <BreadcrumbItem>
                                    <Link href={route(`${ROUTES.PROJECTS_TRAINSETS}.index`, [project.id])}>
                                        {t('pages.project.trainset.carriage.panel.index.breadcrumbs.project', {
                                            project: project?.name,
                                        })}
                                    </Link>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator />
                                <BreadcrumbItem>
                                    <Link
                                        href={route(`${ROUTES.PROJECTS_TRAINSETS_CARRIAGES}.index`, [
                                            project.id,
                                            trainset.id,
                                        ])}
                                    >
                                        {t('pages.project.trainset.carriage.panel.index.breadcrumbs.trainset', {
                                            trainset: trainset?.name,
                                        })}
                                    </Link>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator />
                                <BreadcrumbItem>
                                    <BreadcrumbPage>
                                        {t('pages.project.trainset.carriage.panel.index.breadcrumbs.carriage', {
                                            carriage: carriageTrainset?.carriage.type,
                                        })}
                                    </BreadcrumbPage>
                                </BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb>
                        <div className="flex items-center gap-4">
                            <h1 className="text-page-header my-4">
                                {t('pages.project.trainset.carriage.panel.index.title', {
                                    name: carriageTrainset?.carriage.type,
                                })}
                            </h1>
                        </div>
                    </div>

                    <Suspense fallback={<StaticLoadingOverlay />}>
                        <Panels
                            trainset={trainset}
                            carriageTrainset={carriageTrainset}
                            handleSyncCarriage={handleSyncCarriage}
                        />
                    </Suspense>

                    {trainset.status !== TrainsetStatusEnum.PROGRESS && panelResponse && (
                        <AddNewPanel
                            carriageTrainset={carriageTrainset}
                            handleSyncCarriage={handleSyncCarriage}
                            panelResponse={panelResponse}
                            setPanelResponse={setPanelResponse}
                        />
                    )}
                </div>
            </AuthenticatedLayout>
        </>
    );
}
