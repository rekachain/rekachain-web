import StaticLoadingOverlay from '@/Components/StaticLoadingOverlay';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from '@/Components/UI/breadcrumb';
import { Button } from '@/Components/UI/button';
import { fetchGenericData } from '@/Helpers/dataManagementHelper';
import { checkPermission } from '@/Helpers/permissionHelper';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import AddCarriage from '@/Pages/Project/Trainset/CarriageTrainset/Partials/AddCarriage';
import AddNewTrainsetPreset from '@/Pages/Project/Trainset/CarriageTrainset/Partials/AddNewTrainsetPreset';
import ChangeTrainsetPreset from '@/Pages/Project/Trainset/CarriageTrainset/Partials/ChangeTrainsetPreset';
import GenerateAttachment from '@/Pages/Project/Trainset/CarriageTrainset/Partials/GenerateAttachment';
import PreviewAttachments from '@/Pages/Project/Trainset/CarriageTrainset/Partials/PreviewAttachments';
import CustomPresetAlert from '@/Pages/Project/Trainset/Partials/CustomPresetAlert';
import { carriageService } from '@/Services/carriageService';
import { trainsetService } from '@/Services/trainsetService';
import { ROUTES } from '@/Support/Constants/routes';
import { PERMISSION_ENUM } from '@/Support/Enums/permissionEnum';
import { TrainsetStatusEnum } from '@/Support/Enums/trainsetStatusEnum';
import { PaginateResponse } from '@/Support/Interfaces/Others';
import { ServiceFilterOptions } from '@/Support/Interfaces/Others/ServiceFilterOptions';
import {
    CarriageResource,
    PresetTrainsetResource,
    ProjectResource,
    TrainsetResource,
} from '@/Support/Interfaces/Resources';
import { withLoading } from '@/Utils/withLoading';
import { Head, Link, useForm } from '@inertiajs/react';
import { useDebounce } from '@uidotdev/usehooks';
import { useLaravelReactI18n } from 'laravel-react-i18n';
import { lazy, memo, Suspense, useEffect, useState } from 'react';
import ProgressAttachments from './Partials/ProgressAttachments';

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
    const [presetTrainset, setPresetTrainset] =
        useState<PresetTrainsetResource[]>(initialPresetTrainset);

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
            text: t(
                'pages.project.trainset.carriage_trainset.index.dialogs.export_serial_numbers.confirmations.text',
            ),
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
                <div className='space-y-4 p-4'>
                    <div className='flex flex-col gap-2'>
                        <div>
                            <Breadcrumb>
                                <BreadcrumbList>
                                    <BreadcrumbItem>
                                        <Link href={route(`${ROUTES.PROJECTS}.index`)}>
                                            {t(
                                                'pages.project.trainset.carriage_trainset.index.breadcrumbs.home',
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
                                                'pages.project.trainset.carriage_trainset.index.breadcrumbs.project',
                                                {
                                                    project: project?.name,
                                                },
                                            )}
                                        </Link>
                                    </BreadcrumbItem>
                                    <BreadcrumbSeparator />
                                    <BreadcrumbItem>
                                        <BreadcrumbPage>
                                            {t(
                                                'pages.project.trainset.carriage_trainset.index.breadcrumbs.trainset',
                                                {
                                                    trainset: trainset?.name,
                                                },
                                            )}
                                        </BreadcrumbPage>
                                    </BreadcrumbItem>
                                </BreadcrumbList>
                            </Breadcrumb>
                            <h1 className='text-page-header my-4'>
                                {t('pages.project.trainset.carriage_trainset.index.title', {
                                    name: trainset.name,
                                })}
                            </h1>
                            <div className='flex flex-col gap-2 rounded bg-background-2 p-5'>
                                {trainset.preset_name && (
                                    <p className='text-page-subheader'>
                                        {t(
                                            'pages.project.trainset.carriage_trainset.index.preset',
                                            {
                                                preset: trainset.preset_name,
                                            },
                                        )}
                                    </p>
                                )}

                                {trainset.status === TrainsetStatusEnum.PROGRESS && (
                                    <p className='text-page-subheader'>
                                        {t(
                                            'pages.project.trainset.carriage_trainset.index.status_in_progress',
                                        )}
                                    </p>
                                )}

                                <div className='flex flex-col gap-2 md:flex-row md:items-end'>
                                    {checkPermission(
                                        PERMISSION_ENUM.PROJECT_TRAINSET_CARRIAGE_TRAINSET_PRESET_CHANGE,
                                    ) &&
                                        trainset.status !== TrainsetStatusEnum.PROGRESS &&
                                        !trainset.has_mechanic_trainset_attachment &&
                                        !trainset.has_electric_trainset_attachment &&
                                        !trainset.has_panel_attachment && (
                                            <ChangeTrainsetPreset
                                                trainset={trainset}
                                                presetTrainset={presetTrainset}
                                                handleSyncTrainset={handleSyncTrainset}
                                            />
                                        )}
                                    {!(
                                        trainset.has_mechanic_trainset_attachment &&
                                        trainset.has_electric_trainset_attachment &&
                                        trainset.has_panel_attachment
                                    ) &&
                                        checkPermission(
                                            PERMISSION_ENUM.PROJECT_TRAINSET_CARRIAGE_TRAINSET_ATTACHMENT_GENERATE,
                                        ) && (
                                            <GenerateAttachment
                                                trainset={trainset}
                                                handleSyncTrainset={handleSyncTrainset}
                                                handleSyncCarriages={handleSyncCarriages}
                                            />
                                        )}
                                    {((checkPermission(
                                        PERMISSION_ENUM.PROJECT_TRAINSET_CARRIAGE_TRAINSET_ATTACHMENT_READ,
                                    ) &&
                                        trainset.has_mechanic_trainset_attachment) ||
                                        trainset.has_electric_trainset_attachment ||
                                        trainset.has_panel_attachment) && (
                                        <PreviewAttachments trainset={trainset} />
                                    )}
                                    {((checkPermission(
                                        PERMISSION_ENUM.PROJECT_TRAINSET_CARRIAGE_TRAINSET_ATTACHMENT_PROGRESS_READ,
                                    ) &&
                                        trainset.has_mechanic_trainset_attachment) ||
                                        trainset.has_electric_trainset_attachment ||
                                        trainset.has_panel_attachment) && (
                                        <ProgressAttachments trainset={trainset} />
                                    )}
                                    {trainset.has_panel_attachment &&
                                        checkPermission(
                                            PERMISSION_ENUM.PROJECT_TRAINSET_CARRIAGE_TRAINSET_SERIAL_EXPORT,
                                        ) && (
                                            <Button onClick={handleExportSerialNumbers}>
                                                {t(
                                                    'pages.project.trainset.carriage_trainset.index.buttons.export_serial_numbers',
                                                )}
                                            </Button>
                                        )}
                                </div>
                            </div>
                        </div>
                    </div>
                    <Suspense fallback={<StaticLoadingOverlay />}>
                        <Carriages trainset={trainset} handleSyncTrainset={handleSyncTrainset} />
                    </Suspense>

                    {checkPermission(PERMISSION_ENUM.PROJECT_TRAINSET_CARRIAGE_TRAINSET_CREATE) &&
                        trainset.status !== TrainsetStatusEnum.PROGRESS &&
                        carriageResponse && (
                            <AddCarriage
                                trainset={trainset}
                                handleSyncTrainset={handleSyncTrainset}
                                handleSyncCarriages={handleSyncCarriages}
                                debouncedCarriageFilters={debouncedCarriageFilters}
                            />
                        )}
                </div>

                {checkPermission(
                    PERMISSION_ENUM.PROJECT_TRAINSET_CARRIAGE_TRAINSET_PRESET_CREATE,
                ) &&
                    isNewPreset() && (
                        <CustomPresetAlert
                            message={t(
                                'pages.project.trainset.carriage_trainset.index.new_preset_alert',
                            )}
                        >
                            <AddNewTrainsetPreset
                                trainset={trainset}
                                handleSyncTrainset={handleSyncTrainset}
                            />
                        </CustomPresetAlert>
                    )}
            </AuthenticatedLayout>
        </>
    );
}
