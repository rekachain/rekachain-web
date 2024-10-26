// TODO: Refactor using GenericDataSelector

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
import { FormEvent, useCallback, useEffect, useState } from 'react';
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
import { ScrollArea } from '@/Components/UI/scroll-area';
import { useLaravelReactI18n } from 'laravel-react-i18n';
import GenericDataSelector from '@/Components/GenericDataSelector';

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
    const { t } = useLaravelReactI18n();
    const { loading } = useLoading();
    const { data, setData } = useForm({
        preset_trainset_id: trainset.preset_trainset_id as number | null,
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

        if (data.preset_trainset_id) {
            await trainsetService.changePreset(trainset.id, data.preset_trainset_id);
            await handleSyncTrainset();
            void useSuccessToast(t('pages.project.trainset.carriage.partials.change_trainset_preset.messages.changed'));
        }
    });

    const handleSearchDestinationWorkstations = (destinationWorkstations: WorkstationResource[] | undefined) => {
        let destinationWorkstation = destinationWorkstations?.find(
            workstation => workstation.id === generateAssemblyAttachmentData.assembly_destination_workstation_id,
        );
        return destinationWorkstation?.name;
    };

    const fetchPresetTrainsets = useCallback(async (filters: ServiceFilterOptions) => {
        return await presetTrainsetService
            .getAll({
                ...filters,
                relations: 'carriage_presets.carriage',
            })
            .then(response => response.data);
    }, []);

    const handleGenerateAssemblyAttachment = withLoading(async e => {
        e.preventDefault();
        await trainsetService.generatePanelAttachments(
            trainset.id,
            generateAssemblyAttachmentData.assembly_source_workstation_id,
            generateAssemblyAttachmentData.assembly_destination_workstation_id,
        );
        await handleSyncTrainset();
        await handleSyncCarriages();
        void useSuccessToast(
            t('pages.project.trainset.carriage.partials.change_trainset_preset.messages.kpm_generated'),
        );
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
        void useSuccessToast(
            t('pages.project.trainset.carriage.partials.change_trainset_preset.messages.kpm_generated'),
        );
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
        void useSuccessToast(
            t('pages.project.trainset.carriage.partials.change_trainset_preset.messages.kpm_generated'),
        );
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
        if (data.preset_trainset_id) {
            await presetTrainsetService.delete(data.preset_trainset_id);
            void useSuccessToast(
                t('pages.project.trainset.carriage.partials.change_trainset_preset.messages.preset_deleted'),
            );
            await handleSyncTrainset();
        }
    }, true);

    useEffect(() => {
        void handleSyncSourceWorkstations();
    }, [debouncedSourceWorkstationFilters]);

    useEffect(() => {
        void handleSyncDestinationWorkstations();
    }, [debouncedDestinationWorkstationFilters]);
    return (
        <div className="flex md:flex-row flex-col  gap-2 md:items-end ">
            <form onSubmit={handleChangePreset} className="flex gap-2">
                <SelectGroup>
                    <div className="md:flex  w-full md:flex-row gap-2 pt-3 ">
                        <GenericDataSelector
                            id="preset-trainset_id"
                            fetchData={fetchPresetTrainsets}
                            setSelectedData={id => setData('preset_trainset_id', id)}
                            selectedDataId={data.preset_trainset_id}
                            placeholder={t(
                                'pages.project.trainset.carriage.partials.change_trainset_preset.fields.preset_trainset_placeholder',
                            )}
                            renderItem={(item: PresetTrainsetResource) => {
                                return `${item.name} (${item.carriage_presets.map((c, i) => {
                                    return `${c.qty} ${c.carriage.type}${i < item.carriage_presets!.length - 1 ? ' + ' : ''}`;
                                })})`;
                            }}
                            customLabel={(item: PresetTrainsetResource) => {
                                return `${item.name} (${item.carriage_presets.map((c, i) => {
                                    return `${c.qty} ${c.carriage.type}${i < item.carriage_presets!.length - 1 ? ' + ' : ''}`;
                                })})`;
                            }}
                            initialSearch={trainset?.preset_name}
                            nullable
                        />

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
                                        {t('action.loading')}
                                    </>
                                ) : (
                                    t(
                                        'pages.project.trainset.carriage.partials.change_trainset_preset.buttons.change_preset',
                                    )
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
                                        {t('action.loading')}
                                    </>
                                ) : (
                                    t(
                                        'pages.project.trainset.carriage.partials.change_trainset_preset.buttons.delete_preset',
                                    )
                                )}
                            </Button>
                        </div>
                    </div>
                </SelectGroup>
            </form>

            <Dialog>
                <DialogTrigger
                    className={buttonVariants({
                        // className: 'self-end',
                    })}
                >
                    {t('pages.project.trainset.carriage.partials.change_trainset_preset.buttons.generate_kpm')}
                </DialogTrigger>
                <DialogContent className="max-w-fit">
                    <DialogHeader>
                        <DialogTitle>
                            {t(
                                'pages.project.trainset.carriage.partials.change_trainset_preset.dialogs.generate_kpm_title',
                            )}
                        </DialogTitle>
                        <DialogDescription></DialogDescription>
                        <div className="flex gap-4 ">
                            <ScrollArea className="w-[20rem] sm:w-[30rem] md:w-[50rem] flex flex-col h-[30rem] md:flex-row">
                                <form onSubmit={handleGenerateAssemblyAttachment} className="flex flex-col gap-4">
                                    <div className="flex flex-col gap-4">
                                        <div className="flex rounded flex-col p-5 bg-background-2 gap-3">
                                            <Label>
                                                {t(
                                                    'pages.project.trainset.carriage.partials.change_trainset_preset.dialogs.fields.source_workstation',
                                                )}
                                            </Label>
                                            <Input
                                                value={sourceWorkstationFilters.search}
                                                placeholder={t(
                                                    'pages.project.trainset.carriage.partials.change_trainset_preset.dialogs.fields.source_workstation_search',
                                                )}
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
                                                        <SelectValue
                                                            placeholder={t(
                                                                'pages.project.trainset.carriage.partials.change_trainset_preset.dialogs.fields.workstation_placeholder',
                                                            )}
                                                        />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="0" disabled>
                                                            {t(
                                                                'pages.project.trainset.carriage.partials.change_trainset_preset.dialogs.fields.workstation',
                                                            )}
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
                                            <Label className="mb-2">
                                                {t(
                                                    'pages.project.trainset.carriage.partials.change_trainset_preset.dialogs.fields.destination_workstation',
                                                )}
                                            </Label>
                                            <Input
                                                value={destinationWorkstationFilters.search}
                                                placeholder={t(
                                                    'pages.project.trainset.carriage.partials.change_trainset_preset.dialogs.fields.destination_workstation_search',
                                                )}
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
                                                        generateAssemblyAttachmentData.assembly_destination_workstation_id
                                                    }
                                                    onValueChange={v =>
                                                        setGenerateAssemblyAttachmentData(
                                                            'assembly_destination_workstation_id',
                                                            +v,
                                                        )
                                                    }
                                                    value={generateAssemblyAttachmentData.assembly_destination_workstation_id.toString()}
                                                >
                                                    <SelectTrigger id="destination-workstation">
                                                        <SelectValue
                                                            placeholder={t(
                                                                'pages.project.trainset.carriage.partials.change_trainset_preset.dialogs.fields.workstation_placeholder',
                                                            )}
                                                        />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="0" disabled>
                                                            {t(
                                                                'pages.project.trainset.carriage.partials.change_trainset_preset.dialogs.fields.workstation',
                                                            )}
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
                                                {t('action.loading')}
                                            </>
                                        ) : (
                                            t(
                                                'pages.project.trainset.carriage.partials.change_trainset_preset.dialogs.buttons.generate_kpm',
                                            )
                                        )}
                                    </Button>
                                </form>
                                <form
                                    onSubmit={handleGenerateMechanicTrainsetAttachment}
                                    className="flex flex-col gap-4"
                                >
                                    <div className="flex flex-col gap-4">
                                        <div className="flex rounded flex-col p-5 bg-background-2 gap-3">
                                            <Label>
                                                {t(
                                                    'pages.project.trainset.carriage.partials.change_trainset_preset.dialogs.fields.source_workstation',
                                                )}
                                            </Label>
                                            <Input
                                                value={sourceWorkstationFilters.search}
                                                placeholder={t(
                                                    'pages.project.trainset.carriage.partials.change_trainset_preset.dialogs.fields.source_workstation_search',
                                                )}
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
                                                        <SelectValue
                                                            placeholder={t(
                                                                'pages.project.trainset.carriage.partials.change_trainset_preset.dialogs.fields.workstation_placeholder',
                                                            )}
                                                        />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="0" disabled>
                                                            {t(
                                                                'pages.project.trainset.carriage.partials.change_trainset_preset.dialogs.fields.workstation',
                                                            )}
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
                                            <Label className="mb-2">
                                                {t(
                                                    'pages.project.trainset.carriage.partials.change_trainset_preset.dialogs.fields.destination_workstation',
                                                )}
                                            </Label>
                                            <Input
                                                value={destinationWorkstationFilters.search}
                                                placeholder={t(
                                                    'pages.project.trainset.carriage.partials.change_trainset_preset.dialogs.fields.destination_workstation_search',
                                                )}
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
                                                        <SelectValue
                                                            placeholder={t(
                                                                'pages.project.trainset.carriage.partials.change_trainset_preset.dialogs.fields.workstation_placeholder',
                                                            )}
                                                        />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="0" disabled>
                                                            {t(
                                                                'pages.project.trainset.carriage.partials.change_trainset_preset.dialogs.fields.workstation',
                                                            )}
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
                                                {t('action.loading')}
                                            </>
                                        ) : (
                                            t(
                                                'pages.project.trainset.carriage.partials.change_trainset_preset.dialogs.buttons.generate_mechanic_kpm',
                                            )
                                        )}
                                    </Button>
                                </form>
                                <form
                                    onSubmit={handleGenerateElectricTrainsetAttachment}
                                    className="flex flex-col gap-4"
                                >
                                    <div className="flex flex-col gap-4">
                                        <div className="flex rounded flex-col p-5 bg-background-2 gap-3">
                                            <Label>
                                                {t(
                                                    'pages.project.trainset.carriage.partials.change_trainset_preset.dialogs.fields.source_workstation',
                                                )}
                                            </Label>
                                            <Input
                                                value={sourceWorkstationFilters.search}
                                                placeholder={t(
                                                    'pages.project.trainset.carriage.partials.change_trainset_preset.dialogs.fields.source_workstation_search',
                                                )}
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
                                                        <SelectValue
                                                            placeholder={t(
                                                                'pages.project.trainset.carriage.partials.change_trainset_preset.dialogs.fields.workstation_placeholder',
                                                            )}
                                                        />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="0" disabled>
                                                            {t(
                                                                'pages.project.trainset.carriage.partials.change_trainset_preset.dialogs.fields.workstation',
                                                            )}
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
                                            <Label className="mb-2">
                                                {t(
                                                    'pages.project.trainset.carriage.partials.change_trainset_preset.dialogs.fields.destination_workstation',
                                                )}
                                            </Label>
                                            <Input
                                                value={destinationWorkstationFilters.search}
                                                placeholder={t(
                                                    'pages.project.trainset.carriage.partials.change_trainset_preset.dialogs.fields.destination_workstation_search',
                                                )}
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
                                                        <SelectValue
                                                            placeholder={t(
                                                                'pages.project.trainset.carriage.partials.change_trainset_preset.dialogs.fields.workstation_placeholder',
                                                            )}
                                                        />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="0" disabled>
                                                            {t(
                                                                'pages.project.trainset.carriage.partials.change_trainset_preset.dialogs.fields.workstation',
                                                            )}
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
                                                {t('action.loading')}
                                            </>
                                        ) : (
                                            t(
                                                'pages.project.trainset.carriage.partials.change_trainset_preset.dialogs.buttons.generate_electric_kpm',
                                            )
                                        )}
                                    </Button>
                                </form>
                            </ScrollArea>
                        </div>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default ChangeTrainsetPreset;
