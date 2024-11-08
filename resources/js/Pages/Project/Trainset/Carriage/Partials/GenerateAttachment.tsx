import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/Components/UI/dialog';
import { Button, buttonVariants } from '@/Components/UI/button';
import { Label } from '@/Components/UI/label';
import { Loader2 } from 'lucide-react';
import { useLaravelReactI18n } from 'laravel-react-i18n';
import { TrainsetResource } from '@/Support/Interfaces/Resources';
import { withLoading } from '@/Utils/withLoading';
import { trainsetService } from '@/Services/trainsetService';
import { useSuccessToast } from '@/Hooks/useToast';
import { memo, useCallback, useState } from 'react';
import { useForm } from '@inertiajs/react';
import { workstationService } from '@/Services/workstationService';
import { ServiceFilterOptions } from '@/Support/Interfaces/Others/ServiceFilterOptions';
import { useLoading } from '@/Contexts/LoadingContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/Components/UI/tabs';
import GenericDataSelector from '@/Components/GenericDataSelector';
import { GenerateAttachmentTabEnum } from '@/Support/Enums/generateAttachmentTabEnum';

const GenerateAttachment = ({
    trainset,
    handleSyncTrainset,
    handleSyncCarriages,
}: {
    trainset: TrainsetResource;
    handleSyncTrainset: () => Promise<void>;
    handleSyncCarriages: () => Promise<void>;
}) => {
    const { t } = useLaravelReactI18n();
    const { loading } = useLoading();
    const [activeTab, setActiveTab] = useState<GenerateAttachmentTabEnum>(
        GenerateAttachmentTabEnum.TRAINSET_ATTACHMENT_MECHANIC,
    );

    const { data: generateAssemblyAttachmentData, setData: setGenerateAssemblyAttachmentData } = useForm({
        assembly_source_workstation_id: null as number | null,
        assembly_destination_workstation_id: null as number | null,
    });

    const { data: generateMechanicTrainsetAttachmentData, setData: setGenerateMechanicTrainsetAttachmentData } =
        useForm({
            mechanic_source_workstation_id: null as number | null,
            mechanic_destination_workstation_id: null as number | null,
        });

    const { data: generateElectricTrainsetAttachmentData, setData: setGenerateElectricTrainsetAttachmentData } =
        useForm({
            electric_source_workstation_id: null as number | null,
            electric_destination_workstation_id: null as number | null,
        });

    const fetchWorkstations = useCallback(async (filters: ServiceFilterOptions) => {
        return await workstationService
            .getAll({
                ...filters,
                relations: 'workshop',
            })
            .then(response => response.data);
    }, []);

    const handleGenerateMechanicTrainsetAttachment = withLoading(async e => {
        e.preventDefault();
        if (
            !generateMechanicTrainsetAttachmentData.mechanic_source_workstation_id ||
            !generateMechanicTrainsetAttachmentData.mechanic_destination_workstation_id
        ) {
            return;
        }
        await trainsetService.generateTrainsetAttachments(
            trainset.id,
            generateMechanicTrainsetAttachmentData.mechanic_source_workstation_id,
            generateMechanicTrainsetAttachmentData.mechanic_destination_workstation_id,
            'mechanic',
        );
        await handleSyncTrainset();
        await handleSyncCarriages();
        void useSuccessToast(
            t('pages.project.trainset.carriage.partials.generate_attachment.messages.attachment_generated'),
        );
        setActiveTab(GenerateAttachmentTabEnum.TRAINSET_ATTACHMENT_ELECTRIC);
    });

    const handleGenerateElectricTrainsetAttachment = withLoading(async e => {
        e.preventDefault();
        if (
            !generateElectricTrainsetAttachmentData.electric_source_workstation_id ||
            !generateElectricTrainsetAttachmentData.electric_destination_workstation_id
        ) {
            return;
        }
        await trainsetService.generateTrainsetAttachments(
            trainset.id,
            generateElectricTrainsetAttachmentData.electric_source_workstation_id,
            generateElectricTrainsetAttachmentData.electric_destination_workstation_id,
            'electric',
        );
        await handleSyncTrainset();
        await handleSyncCarriages();
        void useSuccessToast(
            t('pages.project.trainset.carriage.partials.generate_attachment.messages.attachment_generated'),
        );
        setActiveTab(GenerateAttachmentTabEnum.PANEL_ATTACHMENT);
    });

    const handleGenerateAssemblyAttachment = withLoading(async e => {
        e.preventDefault();
        if (
            !generateAssemblyAttachmentData.assembly_source_workstation_id ||
            !generateAssemblyAttachmentData.assembly_destination_workstation_id
        ) {
            return;
        }
        await trainsetService.generatePanelAttachments(
            trainset.id,
            generateAssemblyAttachmentData.assembly_source_workstation_id,
            generateAssemblyAttachmentData.assembly_destination_workstation_id,
        );
        await handleSyncTrainset();
        await handleSyncCarriages();
        void useSuccessToast(
            t('pages.project.trainset.carriage.partials.generate_attachment.messages.attachment_generated'),
        );
    });

    return (
        <Dialog>
            <DialogTrigger className={buttonVariants()}>
                {t('pages.project.trainset.carriage.partials.generate_attachment.buttons.generate_attachment')}
            </DialogTrigger>
            <DialogContent className="max-w-fit">
                <DialogHeader>
                    <DialogTitle>
                        {t(
                            'pages.project.trainset.carriage.partials.generate_attachment.dialogs.generate_attachment_title',
                        )}
                    </DialogTitle>
                    <DialogDescription></DialogDescription>
                    <Tabs
                        value={activeTab}
                        className="w-[400px]"
                        onValueChange={(value: string) => setActiveTab(value as GenerateAttachmentTabEnum)}
                    >
                        <TabsList>
                            <TabsTrigger value={GenerateAttachmentTabEnum.TRAINSET_ATTACHMENT_MECHANIC}>
                                {t(
                                    'pages.project.trainset.carriage.partials.generate_attachment.dialogs.buttons.trainset_attachment_mechanic',
                                )}
                            </TabsTrigger>
                            <TabsTrigger value={GenerateAttachmentTabEnum.TRAINSET_ATTACHMENT_ELECTRIC}>
                                {t(
                                    'pages.project.trainset.carriage.partials.generate_attachment.dialogs.buttons.trainset_attachment_electric',
                                )}
                            </TabsTrigger>
                            <TabsTrigger
                                value={GenerateAttachmentTabEnum.PANEL_ATTACHMENT}
                                disabled={
                                    trainset.has_panel_attachment ||
                                    !trainset.has_mechanic_trainset_attachment ||
                                    !trainset.has_electric_trainset_attachment
                                }
                            >
                                {t(
                                    'pages.project.trainset.carriage.partials.generate_attachment.dialogs.buttons.panel_attachment',
                                )}
                            </TabsTrigger>
                        </TabsList>
                        <TabsContent value={GenerateAttachmentTabEnum.TRAINSET_ATTACHMENT_MECHANIC}>
                            <form onSubmit={handleGenerateMechanicTrainsetAttachment} className="flex flex-col gap-4">
                                <div className="flex flex-col gap-4">
                                    <div className="flex rounded flex-col p-5 bg-background-2 gap-3">
                                        <Label>
                                            {t(
                                                'pages.project.trainset.carriage.partials.generate_attachment.dialogs.fields.source_workstation',
                                            )}
                                        </Label>
                                        <GenericDataSelector
                                            id="mechanic_source_workstation_id"
                                            fetchData={fetchWorkstations}
                                            setSelectedData={id =>
                                                setGenerateMechanicTrainsetAttachmentData(
                                                    'mechanic_source_workstation_id',
                                                    id,
                                                )
                                            }
                                            selectedDataId={
                                                generateMechanicTrainsetAttachmentData.mechanic_source_workstation_id
                                            }
                                            placeholder={t(
                                                'pages.project.trainset.carriage.partials.generate_attachment.dialogs.fields.source_workstation_placeholder',
                                            )}
                                            renderItem={item => `${item.name} - ${item.workshop.name}`}
                                            buttonClassName="mt-1"
                                            nullable

                                            // TODO: possible minor issue: perform pre-search on the workstation if trainset attachment created
                                            // initialSearch={}
                                        />
                                    </div>

                                    <div className="flex rounded flex-col p-5 bg-background-2 gap-3">
                                        <Label>
                                            {t(
                                                'pages.project.trainset.carriage.partials.generate_attachment.dialogs.fields.destination_workstation',
                                            )}
                                        </Label>
                                        <GenericDataSelector
                                            id="mechanic_destination_workstation_id"
                                            fetchData={fetchWorkstations}
                                            setSelectedData={id =>
                                                setGenerateMechanicTrainsetAttachmentData(
                                                    'mechanic_destination_workstation_id',
                                                    id,
                                                )
                                            }
                                            selectedDataId={
                                                generateMechanicTrainsetAttachmentData.mechanic_destination_workstation_id
                                            }
                                            placeholder={t(
                                                'pages.project.trainset.carriage.partials.generate_attachment.dialogs.fields.destination_workstation_placeholder',
                                            )}
                                            renderItem={item => `${item.name} - ${item.workshop.name}`}
                                            buttonClassName="mt-1"
                                            nullable
                                        />
                                    </div>
                                </div>

                                <Button type="submit" disabled={loading || trainset.has_mechanic_trainset_attachment}>
                                    {loading ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            {t('action.loading')}
                                        </>
                                    ) : (
                                        t(
                                            'pages.project.trainset.carriage.partials.generate_attachment.dialogs.buttons.generate_mechanic_kpm',
                                        )
                                    )}
                                </Button>
                            </form>
                        </TabsContent>
                        <TabsContent value={GenerateAttachmentTabEnum.TRAINSET_ATTACHMENT_ELECTRIC}>
                            <form onSubmit={handleGenerateElectricTrainsetAttachment} className="flex flex-col gap-4">
                                <div className="flex flex-col gap-4">
                                    <div className="flex rounded flex-col p-5 bg-background-2 gap-3">
                                        <Label>
                                            {t(
                                                'pages.project.trainset.carriage.partials.generate_attachment.dialogs.fields.source_workstation',
                                            )}
                                        </Label>
                                        <GenericDataSelector
                                            id="electric_source_workstation_id"
                                            fetchData={fetchWorkstations}
                                            setSelectedData={id =>
                                                setGenerateElectricTrainsetAttachmentData(
                                                    'electric_source_workstation_id',
                                                    id,
                                                )
                                            }
                                            selectedDataId={
                                                generateElectricTrainsetAttachmentData.electric_source_workstation_id
                                            }
                                            placeholder={t(
                                                'pages.project.trainset.carriage.partials.generate_attachment.dialogs.fields.source_workstation_placeholder',
                                            )}
                                            renderItem={item => `${item.name} - ${item.workshop.name}`}
                                            buttonClassName="mt-1"
                                            nullable
                                        />
                                    </div>

                                    <div className="flex rounded flex-col p-5 bg-background-2 gap-3">
                                        <Label>
                                            {t(
                                                'pages.project.trainset.carriage.partials.generate_attachment.dialogs.fields.destination_workstation',
                                            )}
                                        </Label>
                                        <GenericDataSelector
                                            id="electric_destination_workstation_id"
                                            fetchData={fetchWorkstations}
                                            setSelectedData={id =>
                                                setGenerateElectricTrainsetAttachmentData(
                                                    'electric_destination_workstation_id',
                                                    id,
                                                )
                                            }
                                            selectedDataId={
                                                generateElectricTrainsetAttachmentData.electric_destination_workstation_id
                                            }
                                            placeholder={t(
                                                'pages.project.trainset.carriage.partials.generate_attachment.dialogs.fields.destination_workstation_placeholder',
                                            )}
                                            renderItem={item => `${item.name} - ${item.workshop.name}`}
                                            buttonClassName="mt-1"
                                            nullable
                                        />
                                    </div>
                                </div>

                                <Button type="submit" disabled={loading || trainset.has_electric_trainset_attachment}>
                                    {loading ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            {t('action.loading')}
                                        </>
                                    ) : (
                                        t(
                                            'pages.project.trainset.carriage.partials.generate_attachment.dialogs.buttons.generate_electric_kpm',
                                        )
                                    )}
                                </Button>
                            </form>
                        </TabsContent>
                        <TabsContent value={GenerateAttachmentTabEnum.PANEL_ATTACHMENT}>
                            <form onSubmit={handleGenerateAssemblyAttachment} className="flex flex-col gap-4">
                                <div className="flex flex-col gap-4">
                                    <div className="flex rounded flex-col p-5 bg-background-2 gap-3">
                                        <Label>
                                            {t(
                                                'pages.project.trainset.carriage.partials.generate_attachment.dialogs.fields.source_workstation',
                                            )}
                                        </Label>
                                        <GenericDataSelector
                                            id="assembly_source_workstation_id"
                                            fetchData={fetchWorkstations}
                                            setSelectedData={id =>
                                                setGenerateAssemblyAttachmentData('assembly_source_workstation_id', id)
                                            }
                                            selectedDataId={
                                                generateAssemblyAttachmentData.assembly_source_workstation_id
                                            }
                                            placeholder={t(
                                                'pages.project.trainset.carriage.partials.generate_attachment.dialogs.fields.source_workstation_placeholder',
                                            )}
                                            renderItem={item => `${item.name} - ${item.workshop.name}`}
                                            buttonClassName="mt-1"
                                            nullable
                                        />
                                    </div>

                                    <div className="flex rounded flex-col p-5 bg-background-2 gap-3">
                                        <Label>
                                            {t(
                                                'pages.project.trainset.carriage.partials.generate_attachment.dialogs.fields.destination_workstation',
                                            )}
                                        </Label>
                                        <GenericDataSelector
                                            id="assembly_destination_workstation_id"
                                            fetchData={fetchWorkstations}
                                            setSelectedData={id =>
                                                setGenerateAssemblyAttachmentData(
                                                    'assembly_destination_workstation_id',
                                                    id,
                                                )
                                            }
                                            selectedDataId={
                                                generateAssemblyAttachmentData.assembly_destination_workstation_id
                                            }
                                            placeholder={t(
                                                'pages.project.trainset.carriage.partials.generate_attachment.dialogs.fields.destination_workstation_placeholder',
                                            )}
                                            renderItem={item => `${item.name} - ${item.workshop.name}`}
                                            buttonClassName="mt-1"
                                            nullable
                                        />
                                    </div>
                                </div>

                                <Button type="submit" disabled={loading || trainset.has_panel_attachment}>
                                    {loading ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            {t('action.loading')}
                                        </>
                                    ) : (
                                        t(
                                            'pages.project.trainset.carriage.partials.generate_attachment.dialogs.buttons.generate_attachment',
                                        )
                                    )}
                                </Button>
                            </form>
                        </TabsContent>
                    </Tabs>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
};

export default memo(GenerateAttachment);
