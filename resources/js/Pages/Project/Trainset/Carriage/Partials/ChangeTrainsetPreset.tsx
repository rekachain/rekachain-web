import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/Components/UI/select';
import { Label } from '@/Components/UI/label';
import { Button, buttonVariants } from '@/Components/UI/button';
import { Loader2 } from 'lucide-react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/Components/UI/dialog';
import { Input } from '@/Components/UI/input';
import { FormEvent, useEffect, useState } from 'react';
import { PresetTrainsetResource, TrainsetResource, WorkstationResource } from '@/Support/Interfaces/Resources';
import { withLoading } from '@/Utils/withLoading';
import { trainsetService } from '@/Services/trainsetService';
import { useSuccessToast } from '@/Hooks/useToast';
import { workstationService } from '@/Services/workstationService';
import { presetTrainsetService } from '@/Services/presetTrainsetService';
import { useDebounce } from '@uidotdev/usehooks';
import { useForm } from '@inertiajs/react';
import { ServiceFilterOptions } from '@/Support/Interfaces/Others/ServiceFilterOptions';
import { useLoading } from '@/Contexts/LoadingContext';

const ChangeTrainsetPreset = ({
    trainset,
    presetTrainset,
    handleSyncTrainset,
    handleSyncCarriages,
}: {
    trainset: TrainsetResource;
    presetTrainset: PresetTrainsetResource[];
    handleSyncTrainset: () => Promise<void>;
    handleSyncCarriages: () => Promise<void>;
}) => {
    const { loading } = useLoading();
    const { data, setData } = useForm({
        preset_trainset_id: trainset.preset_trainset_id ?? 0,
    });

    useEffect(() => {
        setData('preset_trainset_id', trainset.preset_trainset_id ?? 0);
    }, [trainset]);

    const [sourceWorkstations, setSourceWorkstations] = useState<WorkstationResource[]>([]);
    const [destinationWorkstations, setDestinationWorkstations] = useState<WorkstationResource[]>([]);
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

    const debouncedSourceWorkstationFilters = useDebounce(sourceWorkstationFilters, 300);
    const debouncedDestinationWorkstationFilters = useDebounce(destinationWorkstationFilters, 300);
    const selectedPreset = presetTrainset.find(preset => preset.id === data.preset_trainset_id);

    const { data: generateAssemblyAttachmentData, setData: setGenerateAssemblyAttachmentData } = useForm({
        assembly_source_workstation_id: 0,
        assembly_destination_workstation_id: 0,
    });

    const { data: generateMechanicTrainsetAttachmentData, setData: setGenerateMechanicTrainsetAttachmentData } =
        useForm({
            mechanic_source_workstation_id: 0,
            mechanic_destination_workstation_id: 0,
        });

    const { data: generateElectricTrainsetAttachmentData, setData: setGenerateElectricTrainsetAttachmentData } =
        useForm({
            electric_source_workstation_id: 0,
            electric_destination_workstation_id: 0,
        });

    const handleChangePreset = withLoading(async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await trainsetService.changePreset(trainset.id, data.preset_trainset_id);
        await handleSyncTrainset();
        void useSuccessToast('Preset changed successfully');
    });

    const handleSearchDestinationWorkstations = (destinationWorkstations: WorkstationResource[] | undefined) => {
        let destinationWorkstation = destinationWorkstations?.find(
            workstation => workstation.id === generateAssemblyAttachmentData.assembly_destination_workstation_id,
        );
        return destinationWorkstation?.name;
    };

    const handleGenerateAssemblyAttachment = withLoading(async e => {
        e.preventDefault();
        await trainsetService.generatePanelAttachments(
            trainset.id,
            generateAssemblyAttachmentData.assembly_source_workstation_id,
            generateAssemblyAttachmentData.assembly_destination_workstation_id,
        );
        await handleSyncTrainset();
        await handleSyncCarriages();
        void useSuccessToast('KPM generated successfully');
    });

    const handleGenerateMechanicTrainsetAttachment = withLoading(async e => {
        e.preventDefault();
        await trainsetService.generateTrainsetAttachments(
            trainset.id,
            generateMechanicTrainsetAttachmentData.mechanic_source_workstation_id,
            generateMechanicTrainsetAttachmentData.mechanic_destination_workstation_id,
            'mechanic',
        );
        await handleSyncTrainset();
        await handleSyncCarriages();
        void useSuccessToast('KPM generated successfully');
    });

    const handleGenerateElectricTrainsetAttachment = withLoading(async e => {
        e.preventDefault();
        await trainsetService.generateTrainsetAttachments(
            trainset.id,
            generateElectricTrainsetAttachmentData.electric_source_workstation_id,
            generateElectricTrainsetAttachmentData.electric_destination_workstation_id,
            'electric',
        );
        await handleSyncTrainset();
        await handleSyncCarriages();
        void useSuccessToast('KPM generated successfully');
    });

    const handleSyncSourceWorkstations = withLoading(async () => {
        const response = await workstationService.getAll(sourceWorkstationFilters);
        setSourceWorkstations(response.data);
    });

    const handleSearchSourceWorkstations = (sourceWorkstations: WorkstationResource[] | undefined) => {
        let sourceWorkstation = sourceWorkstations?.find(
            workstation => workstation.id === generateAssemblyAttachmentData.assembly_source_workstation_id,
        );
        return sourceWorkstation?.name;
    };

    const handleSyncDestinationWorkstations = withLoading(async () => {
        const response = await workstationService.getAll(destinationWorkstationFilters);
        setDestinationWorkstations(response.data);
    });

    const handleDeletePresetTrainset = withLoading(async () => {
        await presetTrainsetService.delete(data.preset_trainset_id);
        void useSuccessToast('Preset deleted successfully');
        await handleSyncTrainset();
    }, true);

    useEffect(() => {
        void handleSyncSourceWorkstations();
    }, [debouncedSourceWorkstationFilters]);

    useEffect(() => {
        void handleSyncDestinationWorkstations();
    }, [debouncedDestinationWorkstationFilters]);
    return (
        <div className="flex gap-2 items-center">
            <form onSubmit={handleChangePreset} className="flex gap-2">
                <SelectGroup>
                    <Label htmlFor="preset-trainset">Preset</Label>
                    <div className="md:flex  w-full md:flex-row gap-2 pt-3 ">
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
                                    <SelectItem key={preset.id} value={preset.id.toString()}>
                                        {preset.name} (
                                        {preset.carriage_presets.map((c, i) => (
                                            <span key={c.id}>
                                                {c.qty} {c.carriage.type}
                                                {i < preset.carriage_presets!.length - 1 && ' + '}
                                            </span>
                                        ))}
                                        )
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

                        <div className="flex gap-2 mt-3 md:mt-0 items-center ">
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
                <DialogContent className="max-w-fit">
                    <DialogHeader>
                        <DialogTitle>Generate KPM</DialogTitle>
                        <DialogDescription></DialogDescription>
                        <div className="flex gap-4">
                            <form onSubmit={handleGenerateAssemblyAttachment} className="flex flex-col gap-4">
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
                                                key={generateAssemblyAttachmentData.assembly_source_workstation_id}
                                                onValueChange={v =>
                                                    setGenerateAssemblyAttachmentData(
                                                        'assembly_source_workstation_id',
                                                        +v,
                                                    )
                                                }
                                                value={generateAssemblyAttachmentData.assembly_source_workstation_id.toString()}
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
                                                            {workstation.name} - {workstation.workshop.name}
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
                                                key={generateAssemblyAttachmentData.assembly_destination_workstation_id}
                                                onValueChange={v =>
                                                    setGenerateAssemblyAttachmentData(
                                                        'assembly_destination_workstation_id',
                                                        +v,
                                                    )
                                                }
                                                value={generateAssemblyAttachmentData.assembly_destination_workstation_id.toString()}
                                            >
                                                <SelectTrigger id="destination-workstation">
                                                    <SelectValue placeholder="Workstation" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="0" disabled>
                                                        Pilih Workstation
                                                    </SelectItem>
                                                    {destinationWorkstations.map(workstation => (
                                                        <SelectItem
                                                            key={workstation.id}
                                                            value={workstation.id.toString()}
                                                        >
                                                            {workstation.name} - {workstation.workshop.name}
                                                        </SelectItem>
                                                    ))}
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

                            <form onSubmit={handleGenerateMechanicTrainsetAttachment} className="flex flex-col gap-4">
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
                                                    generateMechanicTrainsetAttachmentData.mechanic_source_workstation_id
                                                }
                                                onValueChange={v =>
                                                    setGenerateMechanicTrainsetAttachmentData(
                                                        'mechanic_source_workstation_id',
                                                        +v,
                                                    )
                                                }
                                                value={generateMechanicTrainsetAttachmentData.mechanic_source_workstation_id.toString()}
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
                                                            {workstation.name} - {workstation.workshop.name}
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
                                                    generateMechanicTrainsetAttachmentData.mechanic_destination_workstation_id
                                                }
                                                onValueChange={v =>
                                                    setGenerateMechanicTrainsetAttachmentData(
                                                        'mechanic_destination_workstation_id',
                                                        +v,
                                                    )
                                                }
                                                value={generateMechanicTrainsetAttachmentData.mechanic_destination_workstation_id.toString()}
                                            >
                                                <SelectTrigger id="destination-workstation">
                                                    <SelectValue placeholder="Workstation" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="0" disabled>
                                                        Pilih Workstation
                                                    </SelectItem>
                                                    {destinationWorkstations.map(workstation => (
                                                        <SelectItem
                                                            key={workstation.id}
                                                            value={workstation.id.toString()}
                                                        >
                                                            {workstation.name} - {workstation.workshop.name}
                                                        </SelectItem>
                                                    ))}
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
                                        'Generate KPM Mekanik'
                                    )}
                                </Button>
                            </form>

                            <form onSubmit={handleGenerateElectricTrainsetAttachment} className="flex flex-col gap-4">
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
                                                    generateElectricTrainsetAttachmentData.electric_source_workstation_id
                                                }
                                                onValueChange={v =>
                                                    setGenerateElectricTrainsetAttachmentData(
                                                        'electric_source_workstation_id',
                                                        +v,
                                                    )
                                                }
                                                value={generateElectricTrainsetAttachmentData.electric_source_workstation_id.toString()}
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
                                                            {workstation.name} - {workstation.workshop.name}
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
                                                    generateElectricTrainsetAttachmentData.electric_destination_workstation_id
                                                }
                                                onValueChange={v =>
                                                    setGenerateElectricTrainsetAttachmentData(
                                                        'electric_destination_workstation_id',
                                                        +v,
                                                    )
                                                }
                                                value={generateElectricTrainsetAttachmentData.electric_destination_workstation_id.toString()}
                                            >
                                                <SelectTrigger id="destination-workstation">
                                                    <SelectValue placeholder="Workstation" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="0" disabled>
                                                        Pilih Workstation
                                                    </SelectItem>
                                                    {destinationWorkstations.map(workstation => (
                                                        <SelectItem
                                                            key={workstation.id}
                                                            value={workstation.id.toString()}
                                                        >
                                                            {workstation.name} - {workstation.workshop.name}
                                                        </SelectItem>
                                                    ))}
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
                                        'Generate KPM Elektrik'
                                    )}
                                </Button>
                            </form>
                        </div>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default ChangeTrainsetPreset;
