// TODO: i18n not implemented

import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { lazy, memo, Suspense, useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import StaticLoadingOverlay from '@/Components/StaticLoadingOverlay';
import {
    CarriagePanelResource,
    CarriageTrainsetResource,
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
import { useLaravelReactI18n } from 'laravel-react-i18n';
import PanelMaterials from '@/Pages/Project/Trainset/Carriage/CarriagePanel/PanelMaterial/Partials/PanelMaterials';
import { fetchGenericData } from '@/Helpers/dataManagementHelper';
import { TrainsetStatusEnum } from '@/Support/Enums/trainsetStatusEnum';
import AddNewPanelRawMaterial from '@/Pages/Project/Trainset/Carriage/CarriagePanel/PanelMaterial/Partials/AddNewPanelRawMaterial';

const CarriagePanelComponents = memo(lazy(() => import('./Partials/PanelMaterials')));

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
    const [carriageTrainset, setCarriageTrainset] = useState<CarriageTrainsetResource>(initialCarriageTrainset);
    const [carriagePanel, setCarriagePanel] = useState<CarriagePanelResource>(initialCarriagePanel);

    const handleSyncCarriagePanel = async () => {
        const data = await fetchGenericData<{ carriagePanel: CarriagePanelResource }>();
        setCarriagePanel(data.carriagePanel);
    };

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
                                    <Link
                                        href={route(
                                            `${ROUTES.PROJECTS_TRAINSETS_CARRIAGE_TRAINSETS_CARRIAGE_PANELS}.index`,
                                            [project.id, trainset.id, carriageTrainset.id],
                                        )}
                                    >
                                        {t('pages.project.trainset.carriage.panel.index.breadcrumbs.carriage', {
                                            carriage: carriageTrainset?.carriage.type,
                                        })}
                                    </Link>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator />
                                <BreadcrumbItem>
                                    <BreadcrumbPage>Panel {carriagePanel.panel?.name}</BreadcrumbPage>
                                </BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb>
                        <div className="flex items-center gap-4">
                            <h1 className="text-page-header my-4">Panel : {carriagePanel.panel?.name}</h1>
                        </div>
                    </div>

                    <Suspense fallback={<StaticLoadingOverlay />}>
                        <PanelMaterials
                            trainset={trainset}
                            carriageTrainset={carriageTrainset}
                            carriagePanel={carriagePanel}
                            handleSyncCarriagePanel={handleSyncCarriagePanel}
                        />
                    </Suspense>

                    {trainset.status !== TrainsetStatusEnum.PROGRESS && carriagePanel && (
                        <AddNewPanelRawMaterial
                            carriagePanel={carriagePanel}
                            handleSyncCarriagePanel={handleSyncCarriagePanel}
                        />
                    )}
                </div>
            </AuthenticatedLayout>
        </>
    );
}
