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
import AddNewPanelRawMaterial from '@/Pages/Project/Trainset/CarriageTrainset/CarriagePanel/PanelMaterial/Partials/AddNewPanelRawMaterial';
import { ROUTES } from '@/Support/Constants/routes';
import { TrainsetStatusEnum } from '@/Support/Enums/trainsetStatusEnum';
import {
    CarriagePanelResource,
    CarriageTrainsetResource,
    ProjectResource,
    TrainsetResource,
} from '@/Support/Interfaces/Resources';
import { Head, Link } from '@inertiajs/react';
import { useLaravelReactI18n } from 'laravel-react-i18n';
import { lazy, memo, Suspense, useState } from 'react';

const PanelMaterials = memo(lazy(() => import('./Partials/PanelMaterials')));

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
    const handleSyncCarriagePanel = async () => {
        const data = await fetchGenericData<{ carriagePanel: CarriagePanelResource }>();
        setCarriagePanel(data.carriagePanel);
    };

    return (
        <>
            <Head
                title={t(
                    'pages.project.trainset.carriage_trainset.carriage_panel.panel_material.index.title',
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
                                            'pages.project.trainset.carriage_trainset.carriage_panel.panel_material.index.breadcrumbs.home',
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
                                            'pages.project.trainset.carriage_trainset.carriage_panel.panel_material.index.breadcrumbs.project',
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
                                            'pages.project.trainset.carriage_trainset.carriage_panel.panel_material.index.breadcrumbs.trainset',
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
                                            'pages.project.trainset.carriage_trainset.carriage_panel.panel_material.index.breadcrumbs.carriage',
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
                                            'pages.project.trainset.carriage_trainset.carriage_panel.panel_material.index.breadcrumbs.panel',
                                            {
                                                panel: carriagePanel?.panel?.name ?? '',
                                            },
                                        )}
                                    </BreadcrumbPage>
                                </BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb>
                        <div className='flex items-center gap-4'>
                            <h1 className='text-page-header my-4'>
                                {t(
                                    'pages.project.trainset.carriage_trainset.carriage_panel.panel_material.index.title',
                                    {
                                        name: carriagePanel?.panel?.name ?? '',
                                    },
                                )}
                            </h1>
                        </div>
                    </div>

                    <Suspense fallback={<StaticLoadingOverlay />}>
                        <PanelMaterials
                            trainset={trainset}
                            handleSyncCarriagePanel={handleSyncCarriagePanel}
                            carriageTrainset={carriageTrainset}
                            carriagePanel={carriagePanel}
                        />
                    </Suspense>

                    {trainset.status !== TrainsetStatusEnum.PROGRESS && carriagePanel && (
                        <AddNewPanelRawMaterial
                            handleSyncCarriagePanel={handleSyncCarriagePanel}
                            carriagePanel={carriagePanel}
                        />
                    )}
                </div>
            </AuthenticatedLayout>
        </>
    );
}
