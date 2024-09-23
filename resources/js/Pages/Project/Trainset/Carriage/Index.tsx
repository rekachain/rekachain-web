import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { FormEvent, lazy, memo, Suspense, useEffect, useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import StaticLoadingOverlay from '@/Components/StaticLoadingOverlay';
import {
    CarriageResource,
    PresetTrainsetResource,
    ProjectResource,
    TrainsetResource,
    WorkstationResource,
} from '@/Support/interfaces/resources';
import { Button, buttonVariants } from '@/Components/ui/button';
import { Label } from '@/Components/ui/label';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/Components/ui/select';
import { trainsetService } from '@/Services/trainsetService';
import { ChevronsUpDown, Loader2 } from 'lucide-react';
import { Input } from '@/Components/ui/input';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/Components/ui/dialog';
import CustomPresetAlert from '@/Pages/Project/Trainset/Partials/CustomPresetAlert';
import { presetTrainsetService } from '@/Services/presetTrainsetService';
import { PaginateResponse } from '@/Support/interfaces/others';
import { ServiceFilterOptions } from '@/Support/interfaces/others/ServiceFilterOptions';
import { carriageService } from '@/Services/carriageService';
import { useDebounce } from '@uidotdev/usehooks';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from '@/Components/ui/breadcrumb';
import { ROUTES } from '@/Support/constants/routes';
import { fetchGenericData } from '@/Helpers/dataManagementHelper';
import { useSuccessToast } from '@/Hooks/useToast';
import { TrainsetStatusEnum } from '@/Support/enums/trainsetStatusEnum';
import { Popover, PopoverContent, PopoverTrigger } from '@/Components/ui/popover';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/Components/ui/command';
import { Separator } from '@/Components/ui/separator';
import { Textarea } from '@/Components/ui/textarea';
import { withLoading } from '@/Utils/withLoading';
import { workstationService } from '@/Services/workstationService';
import { useLoading } from '@/Contexts/LoadingContext';

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
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState('');
    const [trainset, setTrainset] = useState<TrainsetResource>(initialTrainset);
    const [carriageResponse, setCarriageResponse] = useState<PaginateResponse<CarriageResource>>();
    const [sourceWorkstations, setSourceWorkstations] = useState<WorkstationResource[]>([]);
    const [destinationWorkstations, setdestinationWorkstations] = useState<WorkstationResource[]>([]);
    const [carriageFilters, setCarriageFilters] = useState<ServiceFilterOptions>({
        page: 1,
        perPage: 2,
        relations: 'trainsets.carriage_panels.panel',
        search: '',
    });

    const [sourceWorkstationFilters, setSourceWorkstationFilters] = useState<ServiceFilterOptions>({
        page: 1,
        perPage: 10,
        search: '',
        relations: 'workshop',
    });

    const [destinationWorkstationFilters, setDestinationWorkstationFilters] = useState<ServiceFilterOptions>({
        page: 1,
        perPage: 10,
        search: '',
        relations: 'workshop',
    });

    const { setLoading, loading } = useLoading();
    const [presetTrainset, setPresetTrainset] = useState<PresetTrainsetResource[]>(initialPresetTrainset);
    const { data, setData } = useForm({
        preset_trainset_id: trainset.preset_trainset_id ?? 0,
        new_carriage_id: 0,
        new_carriage_preset_name: '',
        new_carriage_type: 'Gerbong',
        new_carriage_description: '',
        new_carriage_qty: 1,
    });

    const { data: generateAttachmentData, setData: setGenerateAttachmentData } = useForm({
        source_workstation_id: 0,
        destination_workstation_id: 0,
    });

    const debouncedCarriageFilters = useDebounce(carriageFilters, 300);
    const debouncedSourceWorkstationFilters = useDebounce(sourceWorkstationFilters, 300);
    const debouncedDestinationWorkstationFilters = useDebounce(destinationWorkstationFilters, 300);
    const selectedPreset = presetTrainset.find(preset => preset.id === data.preset_trainset_id);

    const handleChangePreset = withLoading(async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await trainsetService.changePreset(trainset.id, data.preset_trainset_id);
        await handleSyncTrainset();
        useSuccessToast('Preset changed successfully');
    });

    const handleSaveTrainsetPreset = withLoading(async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await trainsetService.savePreset(trainset.id, trainset.project_id, data.new_carriage_preset_name);
        useSuccessToast('Preset saved successfully');
        await handleSyncTrainset();
    });

    const handleSyncTrainset = withLoading(async () => {
        const responseData = await fetchGenericData<{
            trainset: TrainsetResource;
            presetTrainsets: PresetTrainsetResource[];
        }>();
        setTrainset(responseData.trainset);
        setPresetTrainset(responseData.presetTrainsets);
        data.preset_trainset_id = responseData.trainset.preset_trainset_id;
    });

    const handleAddCarriageTrainset = withLoading(async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await trainsetService.addCarriageTrainset(
            trainset.id,
            data.new_carriage_id,
            data.new_carriage_type,
            data.new_carriage_description,
            data.new_carriage_qty,
        );
        useSuccessToast('Carriage added successfully');
        await handleSyncTrainset();
    });

    const handleDeletePresetTrainset = withLoading(async () => {
        await presetTrainsetService.delete(data.preset_trainset_id);
        useSuccessToast('Preset deleted successfully');
        await handleSyncTrainset();
    }, true);

    const handleResetAddCarriageSelection = () => {
        setData('new_carriage_id', 0);
    };

    const handleChangeSearchCarriageType = async (e: string) => {
        const search = e;
        setCarriageFilters({ ...carriageFilters, search });
        // await handleSyncCarriages();
    };

    const handleSyncCarriages = withLoading(async () => {
        const response = await carriageService.getAll(debouncedCarriageFilters);
        setCarriageResponse(response);
    });

    const handleSearchCarriages = (carriageResponse: PaginateResponse<CarriageResource> | undefined) => {
        let carriage = carriageResponse?.data.find(carriage => `${carriage.type} : ${carriage.description}` === value);
        return `${carriage?.type} : ${carriage?.description}`;
    };

    const handleSyncSourceWorkstations = withLoading(async () => {
        const response = await workstationService.getAll(sourceWorkstationFilters);
        setSourceWorkstations(response.data);
    });

    const handleSearchSourceWorkstations = (sourceWorkstations: WorkstationResource[] | undefined) => {
        let sourceWorkstation = sourceWorkstations?.find(
            workstation => workstation.id === generateAttachmentData.source_workstation_id,
        );
        return sourceWorkstation?.name;
    };

    const handleSyncDestinationWorkstations = withLoading(async () => {
        const response = await workstationService.getAll(destinationWorkstationFilters);
        setdestinationWorkstations(response.data);
    });

    const handleSearchDestinationWorkstations = (destinationWorkstations: WorkstationResource[] | undefined) => {
        let destinationWorkstation = destinationWorkstations?.find(
            workstation => workstation.id === generateAttachmentData.destination_workstation_id,
        );
        return destinationWorkstation?.name;
    };

    const handleGenerateProjectAttachment = withLoading(async e => {
        e.preventDefault();
        await trainsetService.generateAttachments(
            trainset.id,
            generateAttachmentData.source_workstation_id,
            generateAttachmentData.destination_workstation_id,
        );
        await handleSyncTrainset();
        await handleSyncCarriages();
        useSuccessToast('KPM generated successfully');
    });

    useEffect(() => {
        handleSyncCarriages();
    }, [debouncedCarriageFilters]);

    useEffect(() => {
        handleSyncSourceWorkstations();
    }, [debouncedSourceWorkstationFilters]);

    useEffect(() => {
        handleSyncDestinationWorkstations();
    }, [debouncedDestinationWorkstationFilters]);

    return (
        <>
            <Head title={`Project ${trainset.name}`} />
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
                                            Proyek {project?.name}
                                        </Link>
                                    </BreadcrumbItem>
                                    <BreadcrumbSeparator />
                                    <BreadcrumbItem>
                                        <BreadcrumbPage>Trainset {trainset.name}</BreadcrumbPage>
                                    </BreadcrumbItem>
                                </BreadcrumbList>
                            </Breadcrumb>
                            <h1 className="text-page-header my-4">Trainset {trainset.name}</h1>
                            <div className="flex flex-col gap-2 bg-background-2 p-5 rounded">
                                {trainset.preset_name && (
                                    <p className="text-page-subheader">Preset: {trainset.preset_name}</p>
                                )}

                                {trainset.status === TrainsetStatusEnum.PROGRESS ? (
                                    <p className="text-page-subheader">Status: Sedang dikerjakan</p>
                                ) : (
                                    <div className="flex gap-2 items-center">
                                        <form onSubmit={handleChangePreset} className="flex gap-2">
                                            <SelectGroup>
                                                <Label htmlFor="preset-trainset">Preset</Label>
                                                <div className="flex gap-2">
                                                    <Select
                                                        key={data.preset_trainset_id} // Force re-render when preset_trainset_id changes
                                                        onValueChange={v => setData('preset_trainset_id', +v)}
                                                        value={data.preset_trainset_id?.toString()}
                                                        defaultValue={trainset.preset_trainset_id?.toString()}
                                                    >
                                                        <SelectTrigger id="preset-trainset">
                                                            <SelectValue placeholder="Preset Trainset" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem value="0" disabled>
                                                                Select Preset
                                                            </SelectItem>
                                                            {presetTrainset.map(preset => (
                                                                <SelectItem
                                                                    key={preset.id}
                                                                    value={preset.id.toString()}
                                                                >
                                                                    {preset.name} (
                                                                    {preset.carriage_presets.map((c, i) => (
                                                                        <span key={c.id}>
                                                                            {c.qty} {c.carriage.type}
                                                                            {i < preset.carriage_presets!.length - 1 &&
                                                                                ' + '}
                                                                        </span>
                                                                    ))}
                                                                    )
                                                                </SelectItem>
                                                            ))}
                                                        </SelectContent>
                                                    </Select>

                                                    <Button
                                                        type="submit"
                                                        disabled={
                                                            loading ||
                                                            !data.preset_trainset_id ||
                                                            data.preset_trainset_id === trainset.preset_trainset_id
                                                        }
                                                    >
                                                        {loading ? (
                                                            <>
                                                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                                Loading
                                                            </>
                                                        ) : (
                                                            'Ubah Preset'
                                                        )}
                                                    </Button>

                                                    <Button
                                                        type="button"
                                                        variant="destructive"
                                                        disabled={
                                                            loading ||
                                                            !data.preset_trainset_id ||
                                                            (selectedPreset && selectedPreset.has_trainsets)
                                                        }
                                                        onClick={handleDeletePresetTrainset}
                                                    >
                                                        {loading ? (
                                                            <>
                                                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                                Loading
                                                            </>
                                                        ) : (
                                                            'Hapus Preset'
                                                        )}
                                                    </Button>
                                                </div>
                                            </SelectGroup>
                                        </form>

                                        <Dialog>
                                            <DialogTrigger
                                                className={buttonVariants({
                                                    className: 'self-end',
                                                })}
                                            >
                                                Generate KPM
                                            </DialogTrigger>
                                            <DialogContent>
                                                <DialogHeader>
                                                    <DialogTitle>Generate KPM</DialogTitle>
                                                    <DialogDescription></DialogDescription>
                                                    <form
                                                        onSubmit={handleGenerateProjectAttachment}
                                                        className="flex flex-col gap-4"
                                                    >
                                                        <div className="flex flex-col gap-4">
                                                            <div className="flex rounded flex-col p-5 bg-background-2 gap-3">
                                                                <Label>Sumber Workstation</Label>
                                                                <Input
                                                                    value={sourceWorkstationFilters.search}
                                                                    placeholder="Type a command or search..."
                                                                    onInput={e =>
                                                                        setSourceWorkstationFilters({
                                                                            ...sourceWorkstationFilters,
                                                                            search: e.currentTarget.value,
                                                                        })
                                                                    }
                                                                />
                                                                <SelectGroup>
                                                                    <Select
                                                                        key={
                                                                            generateAttachmentData.source_workstation_id
                                                                        }
                                                                        onValueChange={v =>
                                                                            setGenerateAttachmentData(
                                                                                'source_workstation_id',
                                                                                +v,
                                                                            )
                                                                        }
                                                                        value={generateAttachmentData.source_workstation_id.toString()}
                                                                    >
                                                                        <SelectTrigger id="source-workstation">
                                                                            <SelectValue placeholder="Workstation" />
                                                                        </SelectTrigger>
                                                                        <SelectContent>
                                                                            <SelectItem value="0" disabled>
                                                                                Pilih Workstation
                                                                            </SelectItem>
                                                                            {sourceWorkstations.map(workstation => (
                                                                                <SelectItem
                                                                                    key={workstation.id}
                                                                                    value={workstation.id.toString()}
                                                                                >
                                                                                    {workstation.name} -{' '}
                                                                                    {workstation.workshop.name}
                                                                                </SelectItem>
                                                                            ))}
                                                                        </SelectContent>
                                                                    </Select>
                                                                </SelectGroup>
                                                            </div>

                                                            <div className="flex rounded flex-col p-5 bg-background-2 gap-3">
                                                                <Label className="mb-2">Tujuan Workstation</Label>
                                                                <Input
                                                                    value={destinationWorkstationFilters.search}
                                                                    placeholder="Type a command or search..."
                                                                    onInput={e =>
                                                                        setDestinationWorkstationFilters({
                                                                            ...destinationWorkstationFilters,
                                                                            search: e.currentTarget.value,
                                                                        })
                                                                    }
                                                                />

                                                                <SelectGroup>
                                                                    <Select
                                                                        key={
                                                                            generateAttachmentData.destination_workstation_id
                                                                        }
                                                                        onValueChange={v =>
                                                                            setGenerateAttachmentData(
                                                                                'destination_workstation_id',
                                                                                +v,
                                                                            )
                                                                        }
                                                                        value={generateAttachmentData.destination_workstation_id.toString()}
                                                                    >
                                                                        <SelectTrigger id="destination-workstation">
                                                                            <SelectValue placeholder="Workstation" />
                                                                        </SelectTrigger>
                                                                        <SelectContent>
                                                                            <SelectItem value="0" disabled>
                                                                                Pilih Workstation
                                                                            </SelectItem>
                                                                            {destinationWorkstations.map(
                                                                                workstation => (
                                                                                    <SelectItem
                                                                                        key={workstation.id}
                                                                                        value={workstation.id.toString()}
                                                                                    >
                                                                                        {workstation.name} -{' '}
                                                                                        {workstation.workshop.name}
                                                                                    </SelectItem>
                                                                                ),
                                                                            )}
                                                                        </SelectContent>
                                                                    </Select>
                                                                </SelectGroup>
                                                            </div>
                                                        </div>

                                                        <Button type="submit" disabled={loading}>
                                                            {loading ? (
                                                                <>
                                                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                                    Proses
                                                                </>
                                                            ) : (
                                                                'Generate KPM'
                                                            )}
                                                        </Button>
                                                    </form>
                                                </DialogHeader>
                                            </DialogContent>
                                        </Dialog>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    <Suspense fallback={<StaticLoadingOverlay />}>
                        <Carriages trainset={trainset} handleSyncTrainset={handleSyncTrainset} />
                    </Suspense>

                    {trainset.status !== TrainsetStatusEnum.PROGRESS && (
                        <Dialog>
                            <DialogTrigger
                                className={buttonVariants({
                                    className: 'w-full',
                                })}
                            >
                                Tambah gerbong baru
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>{data.new_carriage_type}</DialogTitle>
                                    <DialogDescription></DialogDescription>
                                    <form onSubmit={handleAddCarriageTrainset} className="flex flex-col gap-4">
                                        <SelectGroup className="space-y-2">
                                            <div className="flex flex-col bg-background-2 gap-4 p-4">
                                                <Label htmlFor="carriage">Pilih gerbong yang sudah ada</Label>
                                                {/* <Input
                                                placeholder="Cari gerbong"
                                                value={carriageFilters.search}
                                                onChange={handleChangeSearchCarriageType}
                                                disabled={loading}
                                            /> */}
                                                <div className="flex gap-4">
                                                    {/* <Select
                                                    key={data.new_carriage_id} // Force re-render when new_carriage_id changes
                                                    onValueChange={v => setData('new_carriage_id', +v)}
                                                    value={data.new_carriage_id?.toString()}
                                                >
                                                    <SelectTrigger id="carriage">
                                                        <SelectValue placeholder="Carriage" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="0" defaultChecked disabled>
                                                            Pilih gerbong
                                                        </SelectItem>
                                                        {carriageResponse?.data.map(carriage => (
                                                            <SelectItem
                                                                key={carriage.id}
                                                                value={carriage.id.toString()}
                                                            >
                                                                {carriage.type}{' '}
                                                                {carriage.description && `: ${carriage.description}`}
                                                                <br />
                                                                {carriage.carriage_panels?.map((c, i) => (
                                                                    <span key={c.id}>
                                                                        <br />
                                                                        {c.panel.name}
                                                                    </span>
                                                                ))}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                                <Button
                                                    type="button"
                                                    variant="ghost"
                                                    onClick={handleResetAddCarriageSelection}
                                                >
                                                    <RefreshCcw size={STYLING.ICON.SIZE.SMALL} />
                                                </Button> */}
                                                    <Popover open={open} onOpenChange={setOpen}>
                                                        <PopoverTrigger asChild>
                                                            <Button
                                                                variant="outline"
                                                                role="combobox"
                                                                aria-expanded={open}
                                                                className="w-full justify-between"
                                                            >
                                                                {value
                                                                    ? handleSearchCarriages(carriageResponse)
                                                                    : 'Pilih carriage...'}
                                                                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                            </Button>
                                                        </PopoverTrigger>
                                                        <PopoverContent className="w-full p-0">
                                                            <Command>
                                                                <CommandInput
                                                                    onValueChange={e =>
                                                                        handleChangeSearchCarriageType(e)
                                                                    }
                                                                    placeholder="Cari Gerbong..."
                                                                />
                                                                <CommandList>
                                                                    <CommandEmpty>
                                                                        Gerbong tidak ditemukan.
                                                                    </CommandEmpty>
                                                                    <CommandGroup>
                                                                        {carriageResponse?.data.map(carriage => (
                                                                            <CommandItem
                                                                                key={carriage.type}
                                                                                value={`${carriage.type} : ${carriage.description}`}
                                                                                onSelect={currentValue => {
                                                                                    setData(
                                                                                        'new_carriage_id',
                                                                                        +carriage.id,
                                                                                    );
                                                                                    // alert(currentValue);
                                                                                    setValue(
                                                                                        currentValue === value
                                                                                            ? ''
                                                                                            : currentValue,
                                                                                    );
                                                                                    setOpen(false);
                                                                                }}
                                                                            >
                                                                                {carriage.type} : {carriage.description}
                                                                                <br />
                                                                                {/* {carriage.carriage_panels?.map((c, i) => (
                                                                    <span key={c.id}>
                                                                        <br />
                                                                        {c.panel.name}
                                                                    </span>
                                                                ))} */}
                                                                                {/* <Check
                                                                    className={cn(
                                                                        'mr-2 h-4 w-4',
                                                                        value === carriage.type
                                                                            ? 'opacity-100'
                                                                            : 'opacity-0',
                                                                    )}
                                                                /> */}
                                                                                {/* {carriage.type} */}
                                                                            </CommandItem>
                                                                        ))}
                                                                    </CommandGroup>
                                                                </CommandList>
                                                            </Command>
                                                        </PopoverContent>
                                                    </Popover>
                                                </div>
                                            </div>
                                        </SelectGroup>

                                        <div className="flex gap-4 items-center">
                                            <div className=" flex-1">
                                                <Separator />
                                            </div>
                                            Atau
                                            <div className=" flex-1">
                                                <Separator />
                                            </div>
                                        </div>
                                        <div className="flex flex-col gap-4 bg-background-2 p-4">
                                            <div className="flex flex-col gap-2">
                                                <Label>Tipe Gerbong</Label>
                                                <Input
                                                    type="text"
                                                    value={data.new_carriage_type}
                                                    onChange={e => setData('new_carriage_type', e.target.value)}
                                                    disabled={data.new_carriage_id !== 0}
                                                    required
                                                />
                                            </div>
                                            <Label htmlFor="new-carriage-description">Deskripsi Gerbong</Label>
                                            <Textarea
                                                id="new-carriage-description"
                                                className="p-2 rounded"
                                                value={data.new_carriage_description}
                                                onChange={e => setData('new_carriage_description', e.target.value)}
                                                disabled={data.new_carriage_id !== 0}
                                            />
                                            <Label htmlFor="new-carriage-qty">Jumlah Gerbong</Label>
                                            <Input
                                                id="new-carriage-qty"
                                                type="number"
                                                min={1}
                                                value={data.new_carriage_qty}
                                                onChange={e => setData('new_carriage_qty', +e.target.value)}
                                                required
                                            />
                                        </div>

                                        <Button type="submit" disabled={loading}>
                                            {loading ? (
                                                <>
                                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                    Proses
                                                </>
                                            ) : (
                                                'Tambahkan gerbong'
                                            )}
                                        </Button>
                                    </form>
                                </DialogHeader>
                            </DialogContent>
                        </Dialog>
                    )}
                </div>

                {!trainset.preset_trainset_id &&
                    trainset.carriage_trainsets &&
                    trainset.carriage_trainsets.length > 0 &&
                    trainset.status !== TrainsetStatusEnum.PROGRESS && (
                        <CustomPresetAlert message="Anda menggunakan preset khusus. Apakah Anda ingin menyimpannya?">
                            <Dialog>
                                <DialogTrigger
                                    className={buttonVariants({
                                        className: 'w-full',
                                    })}
                                >
                                    Tambahkan Preset
                                </DialogTrigger>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>Preset baru</DialogTitle>
                                        <DialogDescription></DialogDescription>
                                        <form onSubmit={handleSaveTrainsetPreset} className="flex flex-col gap-4">
                                            <div className="flex flex-col gap-4">
                                                <Label>Nama Preset</Label>
                                                <div className="flex gap-4">
                                                    <Input
                                                        type="text"
                                                        value={data.new_carriage_preset_name}
                                                        onChange={e =>
                                                            setData('new_carriage_preset_name', e.target.value)
                                                        }
                                                    />
                                                    <Button type="submit" disabled={loading} className="w-fit">
                                                        {loading ? (
                                                            <>
                                                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                                Menambahkan preset
                                                            </>
                                                        ) : (
                                                            'Tambahkan preset'
                                                        )}
                                                    </Button>
                                                </div>
                                            </div>
                                        </form>
                                    </DialogHeader>
                                </DialogContent>
                            </Dialog>
                        </CustomPresetAlert>
                    )}
            </AuthenticatedLayout>
        </>
    );
}
