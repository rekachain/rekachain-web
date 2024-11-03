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
import ChangeTrainsetPreset from '@/Pages/Project/Trainset/Carriage/Partials/ChangeTrainsetPreset';
import AddCarriage from '@/Pages/Project/Trainset/Carriage/Partials/AddCarriage';
import { ServiceFilterOptions } from '@/Support/Interfaces/Others/ServiceFilterOptions';
import { useDebounce } from '@uidotdev/usehooks';
import AddNewTrainsetPreset from '@/Pages/Project/Trainset/Carriage/Partials/AddNewTrainsetPreset';
import { useLaravelReactI18n } from 'laravel-react-i18n';

import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/Components/UI/table';

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

    return (
        <>
            <Head
                title={t('pages.project.trainset.carriage.index.title', {
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
                                        <Link href={route(`${ROUTES.PROJECTS}.index`)}>Home</Link>
                                    </BreadcrumbItem>
                                    <BreadcrumbSeparator />
                                    <BreadcrumbItem>
                                        <Link href={route(`${ROUTES.PROJECTS_TRAINSETS}.index`, [project.id])}>
                                            {t('pages.project.trainset.carriage.index.breadcrumbs.project', {
                                                project: project?.name,
                                            })}
                                        </Link>
                                    </BreadcrumbItem>
                                    <BreadcrumbSeparator />
                                    <BreadcrumbItem>
                                        <BreadcrumbPage>
                                            {t('pages.project.trainset.carriage.index.breadcrumbs.trainset', {
                                                trainset: trainset?.name,
                                            })}
                                        </BreadcrumbPage>
                                    </BreadcrumbItem>
                                </BreadcrumbList>
                            </Breadcrumb>
                            <h1 className="text-page-header my-4">
                                {t('pages.project.trainset.carriage.index.title', {
                                    name: trainset.name,
                                })}
                            </h1>
                            <div className="flex flex-col gap-2 bg-background-2 p-5 rounded">
                                {trainset.preset_name && (
                                    <p className="text-page-subheader">
                                        {t('pages.project.trainset.carriage.index.preset', {
                                            preset: trainset.preset_name,
                                        })}
                                    </p>
                                )}

                                {trainset.status === TrainsetStatusEnum.PROGRESS ? (
                                    <p className="text-page-subheader">
                                        {t('pages.project.trainset.carriage.index.status_in_progress')}
                                    </p>
                                ) : (
                                    <ChangeTrainsetPreset
                                        trainset={trainset}
                                        presetTrainset={presetTrainset}
                                        handleSyncTrainset={handleSyncTrainset}
                                        handleSyncCarriages={handleSyncCarriages}
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                    <Suspense fallback={<StaticLoadingOverlay />}>
                        <Carriages trainset={trainset} handleSyncTrainset={handleSyncTrainset} />
                    </Suspense>

                    <div className="">
                        <h1 className="text-xl font-bold">KPM Mekanik</h1>
                        <div className="grid grid-cols-3">
                            <div className="flex flex-col gap-3 mt-5">
                                <div className="">
                                    <p className="font-bold">No Lampiran :</p>
                                    <p>3349/PPC/KPM/VI/2024</p>
                                </div>
                                <div className="">
                                    <p className="font-bold">No Reservasi :</p>
                                    <p>-</p>
                                </div>
                                <div className="">
                                    <p className="font-bold">Serial Number :</p>
                                    <p>110-210</p>
                                </div>
                            </div>
                            <div className="flex flex-col gap-3 mt-5">
                                <div className="">
                                    <p className="font-bold">Nomor Referensi :</p>
                                    <p>-</p>
                                </div>
                                <div className="">
                                    <p className="font-bold">Tanggal :</p>
                                    <p>17-08-2024</p>
                                </div>
                            </div>
                            <div className="flex flex-col gap-3 mt-5 text-white items-center">
                                <div className="">
                                    <img
                                        src="https://upload.wikimedia.org/wikipedia/commons/d/d0/QR_code_for_mobile_English_Wikipedia.svg"
                                        alt=""
                                        width={200}
                                    />
                                </div>
                                <div className="">
                                    <button className="bg-black p-2 rounded-lg">Cetak QR Code</button>
                                </div>
                            </div>
                        </div>
                        <hr className="border-black border-[0.5px] mt-5" />
                        <h1 className="text-xl font-bold mt-3">Status Pekerjaan </h1>
                        <div className="grid grid-cols-3">
                            <div className="flex flex-col gap-3 mt-5">
                                <div className="">
                                    <p className="font-bold">Supervisor :</p>
                                    <p>Chamzal Izal</p>
                                </div>
                            </div>
                            <div className="flex flex-col gap-3 mt-5">
                                <div className="">
                                    <p className="font-bold">Workstation :</p>
                                    <p>Candi Sewu</p>
                                </div>
                                <div className="">
                                    <p className="font-bold">Step 1 Cutting :</p>
                                    <p>Selesai</p>
                                </div>
                                <div className="">
                                    <p className="font-bold">Step 2 Assembly :</p>
                                    <p>Diproses</p>
                                </div>
                            </div>
                            <div className="flex flex-col gap-3 mt-5 text-white items-center"></div>
                        </div>
                        <hr className="border-black border-[0.5px] mt-5" />
                        <h1 className="text-xl font-bold mt-3">List Material </h1>
                        {/* <div className="grid grid-cols-5">
                            <div className="flex flex-col gap-5 mt-5">
                                <div className="">
                                    <p className="font-bold">Kode Material:</p>
                                    <p>22858OH0000XXG01</p>
                                </div>
                                <div className="">
                                    <p className="font-bold">Kode Material:</p>
                                    <p>22858OH0000XXG01</p>
                                </div>
                            </div>
                            <div className="flex flex-col gap-3 mt-5">
                                <div className="">
                                    <p className="font-bold">Deskripsi :</p>
                                    <p>L1lp,L2lp</p>
                                </div>
                            </div>
                            <div className="flex flex-col gap-3 mt-5 ">
                                <div className="">
                                    <p className="font-bold">Spesifikasi :</p>
                                    <p>Indicator Lamp, Green 220VAC</p>
                                </div>
                            </div>
                            <div className="flex flex-col gap-3 mt-5 ">
                                <div className="">
                                    <p className="font-bold">Jumlah Diminta :</p>
                                    <p>18</p>
                                </div>
                            </div>
                            <div className="flex flex-col gap-3 mt-5 ">
                                <div className="">
                                    <p className="font-bold">Jumlah Diserahkan :</p>
                                    <p>18</p>
                                </div>
                            </div>
                        </div> */}
                        <Table>
                            <TableCaption>List Material dalam KPM</TableCaption>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="">Kode Material</TableHead>
                                    <TableHead>Deskripsi</TableHead>
                                    <TableHead>Spesifikasi</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                <TableRow>
                                    <TableCell className="font-medium">22858OH0000XXG01 </TableCell>
                                    <TableCell>L1lp,L2lp </TableCell>
                                    <TableCell>Indicator Lamp, Green 220VAC </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </div>

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
                    <CustomPresetAlert message={t('pages.project.trainset.carriage.index.new_preset_alert')}>
                        <AddNewTrainsetPreset handleSyncTrainset={handleSyncTrainset} trainset={trainset} />
                    </CustomPresetAlert>
                )}
            </AuthenticatedLayout>
        </>
    );
}
