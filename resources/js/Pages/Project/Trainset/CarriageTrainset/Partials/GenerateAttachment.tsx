import GenericDataSelector from '@/Components/GenericDataSelector';
import { Button, buttonVariants } from '@/Components/UI/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/Components/UI/dialog';
import { Label } from '@/Components/UI/label';
import { ScrollArea } from '@/Components/UI/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/Components/UI/tabs';
import { useLoading } from '@/Contexts/LoadingContext';
import { useSuccessToast } from '@/Hooks/useToast';
import PreviewGeneratePanelAttachment from '@/Pages/Project/Trainset/CarriageTrainset/Partials/Components/PreviewGeneratePanelAttachment';
import PreviewGenerateTrainsetAttachment from '@/Pages/Project/Trainset/CarriageTrainset/Partials/Components/PreviewGenerateTrainsetAttachment';
import { trainsetService } from '@/Services/trainsetService';
import { workstationService } from '@/Services/workstationService';
import { GenerateAttachmentTabEnum } from '@/Support/Enums/generateAttachmentTabEnum';
import { PreviewGenerateAttachmentRawMaterialResource } from '@/Support/Interfaces/Others';
import { ServiceFilterOptions } from '@/Support/Interfaces/Others/ServiceFilterOptions';
import { TrainsetResource } from '@/Support/Interfaces/Resources';
import { withLoading } from '@/Utils/withLoading';
import { useForm } from '@inertiajs/react';
import { useLaravelReactI18n } from 'laravel-react-i18n';
import { Loader2 } from 'lucide-react';
import { memo, useCallback, useState } from 'react';

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
        !trainset.has_mechanic_trainset_attachment
            ? GenerateAttachmentTabEnum.TRAINSET_ATTACHMENT_MECHANIC
            : !trainset.has_electric_trainset_attachment
              ? GenerateAttachmentTabEnum.TRAINSET_ATTACHMENT_ELECTRIC
              : GenerateAttachmentTabEnum.PANEL_ATTACHMENT,
    );
    const [previewGenerateAttachmentRawMaterials, setPreviewGenerateAttachmentRawMaterials] =
        useState<PreviewGenerateAttachmentRawMaterialResource[]>([]);
    const [showConfirmationDialog, setShowConfirmationDialog] = useState<boolean>(false);
    const [confirmationAction, setConfirmationAction] = useState<() => Promise<void>>(
        () => Promise.resolve,
    );

    const { data: generateAssemblyAttachmentData, setData: setGenerateAssemblyAttachmentData } =
        useForm({
            assembly_source_workstation_id: null as number | null,
            assembly_destination_workstation_id: null as number | null,
        });

    const {
        data: generateMechanicTrainsetAttachmentData,
        setData: setGenerateMechanicTrainsetAttachmentData,
    } = useForm({
        mechanic_source_workstation_id: null as number | null,
        mechanic_destination_workstation_id: null as number | null,
    });

    const {
        data: generateElectricTrainsetAttachmentData,
        setData: setGenerateElectricTrainsetAttachmentData,
    } = useForm({
        electric_source_workstation_id: null as number | null,
        electric_destination_workstation_id: null as number | null,
    });

    const fetchWorkstations = useCallback(async (filters: ServiceFilterOptions) => {
        return await workstationService
            .getAll({
                ...filters,
                relations: 'workshop',
            })
            .then((response) => response.data);
    }, []);

    const handleGenerateMechanicTrainsetAttachment = withLoading(async (e) => {
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
            t(
                'pages.project.trainset.carriage_trainset.partials.generate_attachment.messages.attachment_generated',
            ),
        );
        setActiveTab(GenerateAttachmentTabEnum.TRAINSET_ATTACHMENT_ELECTRIC);
    });

    const handleGenerateElectricTrainsetAttachment = withLoading(async (e) => {
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
            t(
                'pages.project.trainset.carriage_trainset.partials.generate_attachment.messages.attachment_generated',
            ),
        );
        setActiveTab(GenerateAttachmentTabEnum.PANEL_ATTACHMENT);
    });

    const handleGenerateAssemblyAttachment = withLoading(async (e) => {
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
            t(
                'pages.project.trainset.carriage_trainset.partials.generate_attachment.messages.attachment_generated',
            ),
        );
    });

    const fetchComponentRawMaterials = useCallback(async () => {
        const res = await trainsetService.getComponentRawMaterials(trainset.id);
        setPreviewGenerateAttachmentRawMaterials(res.data);
    }, [trainset.id]);

    const fetchPanelRawMaterials = useCallback(async () => {
        const res = await trainsetService.getPanelRawMaterials(trainset.id);
        setPreviewGenerateAttachmentRawMaterials(res.data);
    }, [trainset.id]);

    const confirmAction = useCallback(
        async (action: () => Promise<void>) => {
            if (
                activeTab === GenerateAttachmentTabEnum.TRAINSET_ATTACHMENT_MECHANIC ||
                activeTab === GenerateAttachmentTabEnum.TRAINSET_ATTACHMENT_ELECTRIC
            ) {
                await fetchComponentRawMaterials();
            } else if (activeTab === GenerateAttachmentTabEnum.PANEL_ATTACHMENT) {
                await fetchPanelRawMaterials();
            } else {
                return;
            }

            setConfirmationAction(() => action);
            setShowConfirmationDialog(true);
        },
        [activeTab, fetchComponentRawMaterials, fetchPanelRawMaterials],
    );

    return (
        <>
            <Dialog>
                <DialogTrigger className={buttonVariants()}>
                    {t(
                        'pages.project.trainset.carriage_trainset.partials.generate_attachment.buttons.generate_attachment',
                    )}
                </DialogTrigger>
                <DialogContent className='flex w-[360px] flex-col justify-center md:max-w-fit'>
                    <DialogHeader>
                        <DialogTitle>
                            {t(
                                'pages.project.trainset.carriage_trainset.partials.generate_attachment.dialogs.generate_attachment_title',
                            )}
                        </DialogTitle>
                        <DialogDescription></DialogDescription>
                        <Tabs
                            value={activeTab}
                            onValueChange={(value: string) =>
                                setActiveTab(value as GenerateAttachmentTabEnum)
                            }
                            className=''
                        >
                            <TabsList>
                                <TabsTrigger
                                    value={GenerateAttachmentTabEnum.TRAINSET_ATTACHMENT_MECHANIC}
                                    disabled={trainset.has_mechanic_trainset_attachment}
                                >
                                    {t(
                                        'pages.project.trainset.carriage_trainset.partials.generate_attachment.dialogs.buttons.trainset_attachment_mechanic',
                                    )}
                                </TabsTrigger>
                                <TabsTrigger
                                    value={GenerateAttachmentTabEnum.TRAINSET_ATTACHMENT_ELECTRIC}
                                    disabled={trainset.has_electric_trainset_attachment}
                                >
                                    {t(
                                        'pages.project.trainset.carriage_trainset.partials.generate_attachment.dialogs.buttons.trainset_attachment_electric',
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
                                        'pages.project.trainset.carriage_trainset.partials.generate_attachment.dialogs.buttons.panel_attachment',
                                    )}
                                </TabsTrigger>
                            </TabsList>
                            <TabsContent
                                value={GenerateAttachmentTabEnum.TRAINSET_ATTACHMENT_MECHANIC}
                                className='w-[300px]'
                            >
                                <form
                                    onSubmit={(e) => {
                                        e.preventDefault();
                                        void confirmAction(
                                            handleGenerateMechanicTrainsetAttachment,
                                        );
                                    }}
                                    className='flex flex-col gap-4'
                                >
                                    <div className='flex flex-col gap-4'>
                                        <div className='flex flex-col gap-3 rounded bg-background-2 p-5'>
                                            <Label>
                                                {t(
                                                    'pages.project.trainset.carriage_trainset.partials.generate_attachment.dialogs.fields.source_workstation',
                                                )}
                                            </Label>
                                            <GenericDataSelector
                                                setSelectedData={(id) =>
                                                    setGenerateMechanicTrainsetAttachmentData(
                                                        'mechanic_source_workstation_id',
                                                        id,
                                                    )
                                                }
                                                selectedDataId={
                                                    generateMechanicTrainsetAttachmentData.mechanic_source_workstation_id
                                                }
                                                renderItem={(item) =>
                                                    `${item.name} - ${item.workshop.name}`
                                                }
                                                placeholder={t(
                                                    'pages.project.trainset.carriage_trainset.partials.generate_attachment.dialogs.fields.source_workstation_placeholder',
                                                )}
                                                nullable
                                                id='mechanic_source_workstation_id'
                                                fetchData={fetchWorkstations}
                                                buttonClassName='mt-1'

                                                // TODO: possible minor issue: perform pre-search on the workstation if trainset attachment created
                                                // initialSearch={}
                                            />
                                        </div>

                                        <div className='flex flex-col gap-3 rounded bg-background-2 p-5'>
                                            <Label>
                                                {t(
                                                    'pages.project.trainset.carriage_trainset.partials.generate_attachment.dialogs.fields.destination_workstation',
                                                )}
                                            </Label>
                                            <GenericDataSelector
                                                setSelectedData={(id) =>
                                                    setGenerateMechanicTrainsetAttachmentData(
                                                        'mechanic_destination_workstation_id',
                                                        id,
                                                    )
                                                }
                                                selectedDataId={
                                                    generateMechanicTrainsetAttachmentData.mechanic_destination_workstation_id
                                                }
                                                renderItem={(item) =>
                                                    `${item.name} - ${item.workshop.name}`
                                                }
                                                placeholder={t(
                                                    'pages.project.trainset.carriage_trainset.partials.generate_attachment.dialogs.fields.destination_workstation_placeholder',
                                                )}
                                                nullable
                                                id='mechanic_destination_workstation_id'
                                                fetchData={fetchWorkstations}
                                                buttonClassName='mt-1'
                                            />
                                        </div>
                                    </div>

                                    <Button
                                        type='submit'
                                        disabled={
                                            loading || trainset.has_mechanic_trainset_attachment
                                        }
                                    >
                                        {loading ? (
                                            <>
                                                <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                                                {t('action.loading')}
                                            </>
                                        ) : (
                                            t(
                                                'pages.project.trainset.carriage_trainset.partials.generate_attachment.dialogs.buttons.generate_mechanic_kpm',
                                            )
                                        )}
                                    </Button>
                                </form>
                            </TabsContent>
                            <TabsContent
                                value={GenerateAttachmentTabEnum.TRAINSET_ATTACHMENT_ELECTRIC}
                            >
                                <form
                                    onSubmit={(e) => {
                                        e.preventDefault();
                                        void confirmAction(
                                            handleGenerateElectricTrainsetAttachment,
                                        );
                                    }}
                                    className='flex flex-col gap-4'
                                >
                                    <div className='flex flex-col gap-4'>
                                        <div className='flex flex-col gap-3 rounded bg-background-2 p-5'>
                                            <Label>
                                                {t(
                                                    'pages.project.trainset.carriage_trainset.partials.generate_attachment.dialogs.fields.source_workstation',
                                                )}
                                            </Label>
                                            <GenericDataSelector
                                                setSelectedData={(id) =>
                                                    setGenerateElectricTrainsetAttachmentData(
                                                        'electric_source_workstation_id',
                                                        id,
                                                    )
                                                }
                                                selectedDataId={
                                                    generateElectricTrainsetAttachmentData.electric_source_workstation_id
                                                }
                                                renderItem={(item) =>
                                                    `${item.name} - ${item.workshop.name}`
                                                }
                                                placeholder={t(
                                                    'pages.project.trainset.carriage_trainset.partials.generate_attachment.dialogs.fields.source_workstation_placeholder',
                                                )}
                                                nullable
                                                id='electric_source_workstation_id'
                                                fetchData={fetchWorkstations}
                                                buttonClassName='mt-1'
                                            />
                                        </div>

                                        <div className='flex flex-col gap-3 rounded bg-background-2 p-5'>
                                            <Label>
                                                {t(
                                                    'pages.project.trainset.carriage_trainset.partials.generate_attachment.dialogs.fields.destination_workstation',
                                                )}
                                            </Label>
                                            <GenericDataSelector
                                                setSelectedData={(id) =>
                                                    setGenerateElectricTrainsetAttachmentData(
                                                        'electric_destination_workstation_id',
                                                        id,
                                                    )
                                                }
                                                selectedDataId={
                                                    generateElectricTrainsetAttachmentData.electric_destination_workstation_id
                                                }
                                                renderItem={(item) =>
                                                    `${item.name} - ${item.workshop.name}`
                                                }
                                                placeholder={t(
                                                    'pages.project.trainset.carriage_trainset.partials.generate_attachment.dialogs.fields.destination_workstation_placeholder',
                                                )}
                                                nullable
                                                id='electric_destination_workstation_id'
                                                fetchData={fetchWorkstations}
                                                buttonClassName='mt-1'
                                            />
                                        </div>
                                    </div>

                                    <Button
                                        type='submit'
                                        disabled={
                                            loading || trainset.has_electric_trainset_attachment
                                        }
                                    >
                                        {loading ? (
                                            <>
                                                <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                                                {t('action.loading')}
                                            </>
                                        ) : (
                                            t(
                                                'pages.project.trainset.carriage_trainset.partials.generate_attachment.dialogs.buttons.generate_electric_kpm',
                                            )
                                        )}
                                    </Button>
                                </form>
                            </TabsContent>
                            <TabsContent value={GenerateAttachmentTabEnum.PANEL_ATTACHMENT}>
                                <form
                                    onSubmit={(e) => {
                                        e.preventDefault();
                                        void confirmAction(handleGenerateAssemblyAttachment);
                                    }}
                                    className='flex flex-col gap-4'
                                >
                                    <div className='flex flex-col gap-4'>
                                        <div className='flex flex-col gap-3 rounded bg-background-2 p-5'>
                                            <Label>
                                                {t(
                                                    'pages.project.trainset.carriage_trainset.partials.generate_attachment.dialogs.fields.source_workstation',
                                                )}
                                            </Label>
                                            <GenericDataSelector
                                                setSelectedData={(id) =>
                                                    setGenerateAssemblyAttachmentData(
                                                        'assembly_source_workstation_id',
                                                        id,
                                                    )
                                                }
                                                selectedDataId={
                                                    generateAssemblyAttachmentData.assembly_source_workstation_id
                                                }
                                                renderItem={(item) =>
                                                    `${item.name} - ${item.workshop.name}`
                                                }
                                                placeholder={t(
                                                    'pages.project.trainset.carriage_trainset.partials.generate_attachment.dialogs.fields.source_workstation_placeholder',
                                                )}
                                                nullable
                                                id='assembly_source_workstation_id'
                                                fetchData={fetchWorkstations}
                                                buttonClassName='mt-1'
                                            />
                                        </div>

                                        <div className='flex flex-col gap-3 rounded bg-background-2 p-5'>
                                            <Label>
                                                {t(
                                                    'pages.project.trainset.carriage_trainset.partials.generate_attachment.dialogs.fields.destination_workstation',
                                                )}
                                            </Label>
                                            <GenericDataSelector
                                                setSelectedData={(id) =>
                                                    setGenerateAssemblyAttachmentData(
                                                        'assembly_destination_workstation_id',
                                                        id,
                                                    )
                                                }
                                                selectedDataId={
                                                    generateAssemblyAttachmentData.assembly_destination_workstation_id
                                                }
                                                renderItem={(item) =>
                                                    `${item.name} - ${item.workshop.name}`
                                                }
                                                placeholder={t(
                                                    'pages.project.trainset.carriage_trainset.partials.generate_attachment.dialogs.fields.destination_workstation_placeholder',
                                                )}
                                                nullable
                                                id='assembly_destination_workstation_id'
                                                fetchData={fetchWorkstations}
                                                buttonClassName='mt-1'
                                            />
                                        </div>
                                    </div>

                                    <Button
                                        type='submit'
                                        disabled={loading || trainset.has_panel_attachment}
                                    >
                                        {loading ? (
                                            <>
                                                <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                                                {t('action.loading')}
                                            </>
                                        ) : (
                                            t(
                                                'pages.project.trainset.carriage_trainset.partials.generate_attachment.dialogs.buttons.generate_attachment',
                                            )
                                        )}
                                    </Button>
                                </form>
                            </TabsContent>
                        </Tabs>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
            <Dialog open={showConfirmationDialog} onOpenChange={setShowConfirmationDialog}>
                <DialogContent className='lg:max-w-[750px]'>
                    <DialogHeader>
                        <DialogTitle>
                            {t(
                                'pages.project.trainset.carriage_trainset.partials.generate_attachment.dialogs.confirm_generate_attachment_raw_materials',
                            )}
                        </DialogTitle>
                        <DialogDescription>
                            {t(
                                'pages.project.trainset.carriage_trainset.partials.generate_attachment.dialogs.confirm_generate_attachment_raw_materials_description',
                            )}
                        </DialogDescription>
                        <ScrollArea className='sm:max-h-[450px]'>
                            {activeTab === GenerateAttachmentTabEnum.PANEL_ATTACHMENT ? (
                                <PreviewGeneratePanelAttachment trainset={trainset} />
                            ) : (
                                <PreviewGenerateTrainsetAttachment
                                    rawMaterials={previewGenerateAttachmentRawMaterials}
                                />
                            )}
                        </ScrollArea>
                    </DialogHeader>
                    <DialogFooter>
                        <Button onClick={() => setShowConfirmationDialog(false)}>
                            {t('action.cancel')}
                        </Button>
                        <Button
                            onClick={() => {
                                setShowConfirmationDialog(false);
                                void confirmationAction();
                            }}
                        >
                            {t('action.confirm')}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default memo(GenerateAttachment);
