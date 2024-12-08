// TODO: i18n not implemented

import StaticLoadingOverlay from '@/Components/StaticLoadingOverlay';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from '@/Components/UI/breadcrumb';
import { fetchGenericData } from '@/Helpers/dataManagementHelper';
import { checkPermission } from '@/Helpers/sidebarHelper';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import AddNewComponentRawMaterial from '@/Pages/Project/Trainset/CarriageTrainset/CarriagePanel/CarriagePanelComponent/ComponentMaterial/Partials/AddNewComponentRawMaterial';
import { componentService } from '@/Services/componentService';
import { ROUTES } from '@/Support/Constants/routes';
import { PERMISSION_ENUM } from '@/Support/Enums/permissionEnum';
import { TrainsetStatusEnum } from '@/Support/Enums/trainsetStatusEnum';
import { PaginateResponse } from '@/Support/Interfaces/Others';
import {
    CarriagePanelComponentResource,
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

const ComponentMaterials = memo(lazy(() => import('./Partials/ComponentMaterials')));

export default function ({
    project,
    trainset,
    carriageTrainset: initialCarriageTrainset,
    carriagePanel: initialCarriagePanel,
    carriagePanelComponent: initialCarriagePanelComponent,
}: {
    project: ProjectResource;
    trainset: TrainsetResource;
    carriageTrainset: CarriageTrainsetResource;
    carriagePanel: CarriagePanelResource;
    carriagePanelComponent: CarriagePanelComponentResource;
}) {
    const { t } = useLaravelReactI18n();
    const [carriageTrainset, setCarriageTrainset] =
        useState<CarriageTrainsetResource>(initialCarriageTrainset);
    const [carriagePanel, setCarriagePanel] = useState<CarriagePanelResource>(initialCarriagePanel);
    const [componentResource, setComponentResource] =
        useState<PaginateResponse<ComponentResource>>();
    const [carriagePanelComponent, setCarriagePanelComponent] =
        useState<CarriagePanelComponentResource>(initialCarriagePanelComponent);

    const fetchInitialComponentData = withLoading(async () => {
        const res = await componentService.getAll();
        setComponentResource(res);
    });

    useEffect(() => {
        void fetchInitialComponentData();
    }, []);

    const handleSyncCarriagePanelComponent = withLoading(async () => {
        const data = await fetchGenericData<{
            carriagePanelComponent: CarriagePanelComponentResource;
        }>();
        setCarriagePanelComponent(data.carriagePanelComponent);
    });

    return (
        <>
            <Head
                title={t(
                    'pages.project.trainset.carriage_trainset.carriage_panel.carriage_panel_component.component_material.index.title',
                )}
            />
            <AuthenticatedLayout>
                <div className='space-y-4 p-4'>
                    <div className='flex flex-col gap-2'>
                        <Breadcrumb>
                            <BreadcrumbList>
                                <BreadcrumbItem>
                                    <Link href={route(`${ROUTES.PROJECTS}.index`)}>
                                        {t(
                                            'pages.project.trainset.carriage_trainset.carriage_panel.carriage_panel_component.component_material.index.breadcrumbs.home',
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
                                            'pages.project.trainset.carriage_trainset.carriage_panel.carriage_panel_component.component_material.index.breadcrumbs.project',
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
                                            'pages.project.trainset.carriage_trainset.carriage_panel.carriage_panel_component.component_material.index.breadcrumbs.trainset',
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
                                            'pages.project.trainset.carriage_trainset.carriage_panel.carriage_panel_component.component_material.index.breadcrumbs.carriage',
                                            {
                                                carriage: carriageTrainset?.carriage.type,
                                            },
                                        )}
                                    </Link>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator />
                                <BreadcrumbItem>
                                    <Link
                                        href={route(
                                            `${ROUTES.PROJECTS_TRAINSETS_CARRIAGE_TRAINSETS_CARRIAGE_PANELS_CARRIAGE_PANEL_COMPONENTS}.index`,
                                            [
                                                project.id,
                                                trainset.id,
                                                carriageTrainset.id,
                                                carriagePanel.id,
                                            ],
                                        )}
                                    >
                                        {t(
                                            'pages.project.trainset.carriage_trainset.carriage_panel.carriage_panel_component.component_material.index.breadcrumbs.panel',
                                            {
                                                panel: carriagePanel.panel?.name,
                                            },
                                        )}
                                    </Link>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator />
                                <BreadcrumbItem>
                                    <BreadcrumbPage>
                                        {t(
                                            'pages.project.trainset.carriage_trainset.carriage_panel.carriage_panel_component.component_material.index.breadcrumbs.component',
                                            { component: carriagePanelComponent.component?.name },
                                        )}
                                    </BreadcrumbPage>
                                </BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb>
                        <div className='flex items-center gap-4'>
                            <h1 className='text-page-header my-4'>
                                {t(
                                    'pages.project.trainset.carriage_trainset.carriage_panel.carriage_panel_component.component_material.index.title',
                                )}
                            </h1>
                        </div>
                    </div>

                    <Suspense fallback={<StaticLoadingOverlay />}>
                        <ComponentMaterials
                            trainset={trainset}
                            handleSyncCarriagePanelComponent={handleSyncCarriagePanelComponent}
                            carriageTrainset={carriageTrainset}
                            carriagePanelComponent={carriagePanelComponent}
                            carriagePanel={carriagePanel}
                        />
                    </Suspense>

                    {checkPermission(PERMISSION_ENUM.PROJECT_TRAINSET_CARRIAGE_TRAINSET_PANEL_COMPONENT_MATERIAL_CREATE) &&
                        trainset.status !== TrainsetStatusEnum.PROGRESS && componentResource && (
                        <AddNewComponentRawMaterial
                            setComponentResource={setComponentResource}
                            handleSyncCarriagePanelComponent={handleSyncCarriagePanelComponent}
                            componentResource={componentResource}
                            carriagePanelComponent={carriagePanelComponent}
                            carriagePanel={carriagePanel}
                        />
                    )}
                </div>
            </AuthenticatedLayout>
        </>
    );
}
