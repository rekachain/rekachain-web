import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { lazy, memo, Suspense, useEffect, useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import StaticLoadingOverlay from '@/Components/StaticLoadingOverlay';
import {
    CarriageResource,
    PresetTrainsetResource,
    ProjectResource,
    TrainsetResource,
} from '@/Support/Interfaces/Resources';
import CustomPresetAlert from '@/Pages/Project/Trainset/Partials/CustomPresetAlert';
import { PaginateResponse } from '@/Support/Interfaces/Others';
import { carriageService } from '@/Services/carriageService';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from '@/Components/UI/breadcrumb';
import { ROUTES } from '@/Support/Constants/routes';
import { fetchGenericData } from '@/Helpers/dataManagementHelper';
import { TrainsetStatusEnum } from '@/Support/Enums/trainsetStatusEnum';
import { withLoading } from '@/Utils/withLoading';
import ChangeTrainsetPreset from '@/Pages/Project/Trainset/CarriageTrainset/Partials/ChangeTrainsetPreset';
import AddCarriage from '@/Pages/Project/Trainset/CarriageTrainset/Partials/AddCarriage';
import { ServiceFilterOptions } from '@/Support/Interfaces/Others/ServiceFilterOptions';
import { useDebounce } from '@uidotdev/usehooks';
import AddNewTrainsetPreset from '@/Pages/Project/Trainset/CarriageTrainset/Partials/AddNewTrainsetPreset';
import { useLaravelReactI18n } from 'laravel-react-i18n';
import GenerateAttachment from '@/Pages/Project/Trainset/CarriageTrainset/Partials/GenerateAttachment';
import PreviewAttachments from '@/Pages/Project/Trainset/CarriageTrainset/Partials/PreviewAttachments';
import { Button } from '@/Components/UI/button';
import { trainsetService } from '@/Services/trainsetService';

const Carriages = memo(lazy(() => import('./Partials/Carriages')));

export default function ({
    project,
    trainset: initialTrainset,
    presetTrainsets: initialPresetTrainset,
}: {
    project: ProjectResource;
    trainset: TrainsetResource;
    presetTrainsets: PresetTrainsetResource[];
}) {
    const { t } = useLaravelReactI18n();
    const [trainset, setTrainset] = useState<TrainsetResource>(initialTrainset);
    const [carriageResponse, setCarriageResponse] = useState<PaginateResponse<CarriageResource>>();
    const [presetTrainset, setPresetTrainset] = useState<PresetTrainsetResource[]>(initialPresetTrainset);

    const { data } = useForm({
        preset_trainset_id: trainset.preset_trainset_id ?? 0,
        new_carriage_id: 0,
        new_carriage_preset_name: '',
        new_carriage_type: 'Gerbong',
        new_carriage_description: '',
        new_carriage_qty: 1,
    });

    const [carriageFilters, setCarriageFilters] = useState<ServiceFilterOptions>({
        page: 1,
        perPage: 10,
        relations: 'trainsets.carriage_panels.panel',
        search: '',
    });

    const debouncedCarriageFilters = useDebounce(carriageFilters, 300);

    const handleSyncTrainset = withLoading(async () => {
        const responseData = await fetchGenericData<{
            trainset: TrainsetResource;
            presetTrainsets: PresetTrainsetResource[];
        }>();
        setTrainset(responseData.trainset);
        setPresetTrainset(responseData.presetTrainsets);
        data.preset_trainset_id = responseData.trainset.preset_trainset_id;
    });

    const handleSyncCarriages = withLoading(async () => {
        const response = await carriageService.getAll(debouncedCarriageFilters);
        setCarriageResponse(response);
    });

    useEffect(() => {
        void handleSyncCarriages();
    }, [debouncedCarriageFilters]);

    function isNewPreset() {
        return (
            !trainset.preset_trainset_id &&
            trainset.carriage_trainsets &&
            trainset.carriage_trainsets.length > 0 &&
            trainset.status !== TrainsetStatusEnum.PROGRESS
        );
    }

    const handleExportSerialNumbers = withLoading(
        async () => {
            await trainsetService.exportSerialNumbers(trainset.id);
        },
        true,
        {
            title: t(
                'pages.project.trainset.carriage_trainset.index.dialogs.export_serial_numbers.confirmations.title',
            ),
            text: t('pages.project.trainset.carriage_trainset.index.dialogs.export_serial_numbers.confirmations.text'),
        },
    );

    return (
        <>
            <Head
                title={t('pages.project.trainset.carriage_trainset.index.title', {
                    name: trainset.name,
                })}
            />
            <AuthenticatedLayout>
                <div className="p-4 space-y-4">
                    <div className="flex flex-col gap-2">
                        <div>
                            <Breadcrumb>
                                <BreadcrumbList>
                                    <BreadcrumbItem>
                                        <Link href={route(`${ROUTES.PROJECTS}.index`)}>
                                            {t('pages.project.trainset.carriage_trainset.index.breadcrumbs.home')}
                                        </Link>
                                    </BreadcrumbItem>
                                    <BreadcrumbSeparator />
                                    <BreadcrumbItem>
                                        <Link href={route(`${ROUTES.PROJECTS_TRAINSETS}.index`, [project.id])}>
                                            {t('pages.project.trainset.carriage_trainset.index.breadcrumbs.project', {
                                                project: project?.name,
                                            })}
                                        </Link>
                                    </BreadcrumbItem>
                                    <BreadcrumbSeparator />
                                    <BreadcrumbItem>
                                        <BreadcrumbPage>
                                            {t('pages.project.trainset.carriage_trainset.index.breadcrumbs.trainset', {
                                                trainset: trainset?.name,
                                            })}
                                        </BreadcrumbPage>
                                    </BreadcrumbItem>
                                </BreadcrumbList>
                            </Breadcrumb>
                            <h1 className="text-page-header my-4">
                                {t('pages.project.trainset.carriage_trainset.index.title', {
                                    name: trainset.name,
                                })}
                            </h1>
                            <div className="flex flex-col gap-2 bg-background-2 p-5 rounded">
                                {trainset.preset_name && (
                                    <p className="text-page-subheader">
                                        {t('pages.project.trainset.carriage_trainset.index.preset', {
                                            preset: trainset.preset_name,
                                        })}
                                    </p>
                                )}

                                {trainset.status === TrainsetStatusEnum.PROGRESS && (
                                    <p className="text-page-subheader">
                                        {t('pages.project.trainset.carriage_trainset.index.status_in_progress')}
                                    </p>
                                )}

                                <div className="flex md:flex-row flex-col gap-2 md:items-end">
                                    {trainset.status !== TrainsetStatusEnum.PROGRESS &&
                                        !trainset.has_mechanic_trainset_attachment &&
                                        !trainset.has_electric_trainset_attachment &&
                                        !trainset.has_panel_attachment && (
                                            <ChangeTrainsetPreset
                                                trainset={trainset}
                                                presetTrainset={presetTrainset}
                                                handleSyncTrainset={handleSyncTrainset}
                                            />
                                        )}
                                    <GenerateAttachment
                                        trainset={trainset}
                                        handleSyncTrainset={handleSyncTrainset}
                                        handleSyncCarriages={handleSyncCarriages}
                                    />
                                    {(trainset.has_mechanic_trainset_attachment ||
                                        trainset.has_electric_trainset_attachment ||
                                        trainset.has_panel_attachment) && <PreviewAttachments trainset={trainset} />}
                                    <Button onClick={handleExportSerialNumbers}>
                                        {t(
                                            'pages.project.trainset.carriage_trainset.index.buttons.export_serial_numbers',
                                        )}
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Suspense fallback={<StaticLoadingOverlay />}>
                        <Carriages trainset={trainset} handleSyncTrainset={handleSyncTrainset} />
                    </Suspense>

                    {trainset.status !== TrainsetStatusEnum.PROGRESS && carriageResponse && (
                        <AddCarriage
                            trainset={trainset}
                            handleSyncCarriages={handleSyncCarriages}
                            debouncedCarriageFilters={debouncedCarriageFilters}
                            handleSyncTrainset={handleSyncTrainset}
                        />
                    )}
                </div>

                {isNewPreset() && (
                    <CustomPresetAlert message={t('pages.project.trainset.carriage_trainset.index.new_preset_alert')}>
                        <AddNewTrainsetPreset handleSyncTrainset={handleSyncTrainset} trainset={trainset} />
                    </CustomPresetAlert>
                )}
            </AuthenticatedLayout>
        </>
    );
}