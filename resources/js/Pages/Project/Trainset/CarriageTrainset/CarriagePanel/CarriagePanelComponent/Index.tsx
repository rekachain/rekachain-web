import StaticLoadingOverlay from '@/Components/StaticLoadingOverlay';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from '@/Components/UI/breadcrumb';
import { fetchGenericData } from '@/Helpers/dataManagementHelper';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import AddNewComponent from '@/Pages/Project/Trainset/CarriageTrainset/CarriagePanel/CarriagePanelComponent/Partials/AddNewComponent';
import { componentService } from '@/Services/componentService';
import { ROUTES } from '@/Support/Constants/routes';
import { TrainsetStatusEnum } from '@/Support/Enums/trainsetStatusEnum';
import { PaginateResponse } from '@/Support/Interfaces/Others';
import {
    CarriagePanelResource,
    CarriageTrainsetResource,
    ComponentResource,
    ProjectResource,
    TrainsetResource,
} from '@/Support/Interfaces/Resources';
import { withLoading } from '@/Utils/withLoading';
import { Head, Link } from '@inertiajs/react';
import { useLaravelReactI18n } from 'laravel-react-i18n';
import { lazy, memo, Suspense, useEffect, useState } from 'react';

const CarriagePanelComponents = memo(lazy(() => import('./Partials/CarriagePanelComponents')));

export default function ({
    project,
    trainset,
    carriageTrainset: initialCarriageTrainset,
    carriagePanel: initialCarriagePanel,
}: {
    project: ProjectResource;
    trainset: TrainsetResource;
    carriageTrainset: CarriageTrainsetResource;
    carriagePanel: CarriagePanelResource;
}) {
    const { t } = useLaravelReactI18n();
    const [carriageTrainset, setCarriageTrainset] =
        useState<CarriageTrainsetResource>(initialCarriageTrainset);
    const [carriagePanel, setCarriagePanel] = useState<CarriagePanelResource>(initialCarriagePanel);
    const [componentResource, setComponentResource] =
        useState<PaginateResponse<ComponentResource>>();

    const fetchInitialComponentData = withLoading(async () => {
        const res = await componentService.getAll();
        setComponentResource(res);
    });

    useEffect(() => {
        void fetchInitialComponentData();
    }, []);

    const handleSyncCarriagePanel = withLoading(async () => {
        const data = await fetchGenericData<{ carriagePanel: CarriagePanelResource }>();
        setCarriagePanel(data.carriagePanel);
    });

    return (
        <>
            <Head title={`Carriage: ${carriageTrainset?.carriage.type}`} />
            <AuthenticatedLayout>
                <div className='space-y-4 p-4'>
                    <div className='flex flex-col gap-2'>
                        <Breadcrumb>
                            <BreadcrumbList>
                                <BreadcrumbItem>
                                    <Link href={route(`${ROUTES.PROJECTS}.index`)}>
                                        {t(
                                            'pages.project.trainset.carriage_trainset.carriage_panel.carriage_panel_component.index.breadcrumbs.home',
                                        )}
                                    </Link>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator />
                                <BreadcrumbItem>
                                    <Link
                                        href={route(`${ROUTES.PROJECTS_TRAINSETS}.index`, [
                                            project.id,
                                        ])}
                                    >
                                        {t(
                                            'pages.project.trainset.carriage_trainset.carriage_panel.carriage_panel_component.index.breadcrumbs.project',
                                            {
                                                project: project?.name,
                                            },
                                        )}
                                    </Link>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator />
                                <BreadcrumbItem>
                                    <Link
                                        href={route(
                                            `${ROUTES.PROJECTS_TRAINSETS_CARRIAGES}.index`,
                                            [project.id, trainset.id],
                                        )}
                                    >
                                        {t(
                                            'pages.project.trainset.carriage_trainset.carriage_panel.carriage_panel_component.index.breadcrumbs.trainset',
                                            {
                                                trainset: trainset?.name,
                                            },
                                        )}
                                    </Link>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator />
                                <BreadcrumbItem>
                                    <Link
                                        href={route(
                                            `${ROUTES.PROJECTS_TRAINSETS_CARRIAGE_TRAINSETS_CARRIAGE_PANELS}.index`,
                                            [project.id, trainset.id, carriageTrainset.id],
                                        )}
                                    >
                                        {t(
                                            'pages.project.trainset.carriage_trainset.carriage_panel.carriage_panel_component.index.breadcrumbs.carriage',
                                            {
                                                carriage: carriageTrainset?.carriage.type,
                                            },
                                        )}
                                    </Link>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator />
                                <BreadcrumbItem>
                                    <BreadcrumbPage>
                                        {t(
                                            'pages.project.trainset.carriage_trainset.carriage_panel.carriage_panel_component.index.breadcrumbs.panel',
                                            {
                                                panel: carriagePanel.panel?.name,
                                            },
                                        )}
                                    </BreadcrumbPage>
                                </BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb>
                        <div className='flex items-center gap-4'>
                            <h1 className='text-page-header my-4'>
                                {t(
                                    'pages.project.trainset.carriage_trainset.carriage_panel.carriage_panel_component.index.title',
                                )}
                            </h1>
                        </div>
                    </div>

                    <Suspense fallback={<StaticLoadingOverlay />}>
                        <CarriagePanelComponents
                            trainset={trainset}
                            handleSyncCarriagePanel={handleSyncCarriagePanel}
                            carriageTrainset={carriageTrainset}
                            carriagePanel={carriagePanel}
                        />
                    </Suspense>

                    {trainset.status !== TrainsetStatusEnum.PROGRESS && componentResource && (
                        <AddNewComponent
                            setComponentResource={setComponentResource}
                            handleSyncCarriagePanel={handleSyncCarriagePanel}
                            componentResource={componentResource}
                            carriagePanel={carriagePanel}
                        />
                    )}
                </div>
            </AuthenticatedLayout>
        </>
    );
}
