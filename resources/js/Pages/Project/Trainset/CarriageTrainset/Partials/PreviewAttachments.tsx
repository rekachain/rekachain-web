import { buttonVariants } from '@/Components/UI/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/Components/UI/dialog';
import { ScrollArea } from '@/Components/UI/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/Components/UI/tabs';
import PreviewPanelAttachment from '@/Pages/Project/Trainset/CarriageTrainset/Partials/Components/PreviewPanelAttachment';
import PreviewTrainsetAttachment from '@/Pages/Project/Trainset/CarriageTrainset/Partials/Components/PreviewTrainsetAttachment';
import { trainsetAttachmentService } from '@/Services/trainsetAttachmentService';
import { trainsetService } from '@/Services/trainsetService';
import { GenerateAttachmentTabEnum } from '@/Support/Enums/generateAttachmentTabEnum';
import { IntentEnum } from '@/Support/Enums/intentEnum';
import { TrainsetAttachmentTypeEnum } from '@/Support/Enums/trainsetAttachmentTypeEnum';
import { TrainsetAttachmentResource, TrainsetResource } from '@/Support/Interfaces/Resources';
import { withLoading } from '@/Utils/withLoading';
import { useLaravelReactI18n } from 'laravel-react-i18n';
import { useEffect, useState } from 'react';

const PreviewAttachments = ({ trainset }: { trainset: TrainsetResource }) => {
    const { t } = useLaravelReactI18n();
    const [activeTab, setActiveTab] = useState<GenerateAttachmentTabEnum>();

    const [mechanicAttachmentIds, setMechanicAttachmentIds] = useState<number[]>([]);
    const [electricAttachmentIds, setElectricAttachmentIds] = useState<number[]>([]);
    const [assemblyAttachmentIds, setAssemblyAttachmentIds] = useState<number[]>([]);

    const [mechanicAttachment, setMechanicAttachment] = useState<TrainsetAttachmentResource[]>([]);
    const [electricAttachment, setElectricAttachment] = useState<TrainsetAttachmentResource[]>([]);

    const fetchAttachment = withLoading(async () => {
        if (activeTab === GenerateAttachmentTabEnum.TRAINSET_ATTACHMENT_MECHANIC) {
            if (mechanicAttachment.length > 0) return;
            for (const id of mechanicAttachmentIds) {
                const res = await trainsetAttachmentService.get(id, {
                    intent: IntentEnum.WEB_TRAINSET_ATTACHMENT_GET_COMPONENT_MATERIALS_WITH_QTY,
                });
                setMechanicAttachment([...mechanicAttachment, res]);
            }
        } else if (activeTab === GenerateAttachmentTabEnum.TRAINSET_ATTACHMENT_ELECTRIC) {
            if (electricAttachment.length > 0) return;
            for (const id of electricAttachmentIds) {
                const res = await trainsetAttachmentService.get(id, {
                    intent: IntentEnum.WEB_TRAINSET_ATTACHMENT_GET_COMPONENT_MATERIALS_WITH_QTY,
                });
                setElectricAttachment([...electricAttachment, res]);
            }
        } else if (activeTab === GenerateAttachmentTabEnum.PANEL_ATTACHMENT) {
            // Already handled in PreviewPanelAttachment
        }
    });

    const fetchAttachments = withLoading(async () => {
        const data = await trainsetService.get(trainset.id);

        data.trainset_attachments.forEach((attachment) => {
            if (attachment.type === TrainsetAttachmentTypeEnum.MECHANIC && attachment.is_ancestor) {
                setMechanicAttachmentIds([...mechanicAttachmentIds, attachment.id]);
            } else if (
                attachment.type === TrainsetAttachmentTypeEnum.ELECTRIC &&
                attachment.is_ancestor
            ) {
                setElectricAttachmentIds([...electricAttachmentIds, attachment.id]);
            }
        });

        data.panel_attachments.forEach((attachment) => {
            setAssemblyAttachmentIds([...assemblyAttachmentIds, attachment.id]);
        });
    });

    useEffect(() => {
        void fetchAttachments();
        void fetchAttachment();
    }, [activeTab]);

    useEffect(() => {
        fetchAttachments().then(() => {
            setActiveTab(GenerateAttachmentTabEnum.TRAINSET_ATTACHMENT_MECHANIC);
        });
    }, []);

    return (
        <Dialog>
            <DialogTrigger className={buttonVariants()}>
                {t(
                    'pages.project.trainset.carriage_trainset.partials.preview_attachments.dialogs.buttons.view_detail_attachment',
                )}
            </DialogTrigger>
            <DialogContent className='flex w-[350px] flex-col md:w-[70%] md:flex-row'>
                <DialogHeader>
                    <DialogTitle></DialogTitle>
                    <DialogDescription className='w-full'></DialogDescription>
                    <Tabs
                        value={activeTab}
                        onValueChange={(value) => setActiveTab(value as GenerateAttachmentTabEnum)}
                        defaultValue={GenerateAttachmentTabEnum.TRAINSET_ATTACHMENT_MECHANIC}
                        className='w-full'
                    >
                        <TabsList className='flex h-fit w-full flex-col items-center md:w-fit md:flex-row md:items-start'>
                            <TabsTrigger
                                value={GenerateAttachmentTabEnum.TRAINSET_ATTACHMENT_MECHANIC}
                            >
                                {t(
                                    'pages.project.trainset.carriage_trainset.partials.preview_attachments.dialogs.buttons.mechanic_attachment',
                                )}
                            </TabsTrigger>
                            <TabsTrigger
                                value={GenerateAttachmentTabEnum.TRAINSET_ATTACHMENT_ELECTRIC}
                            >
                                {t(
                                    'pages.project.trainset.carriage_trainset.partials.preview_attachments.dialogs.buttons.electric_attachment',
                                )}
                            </TabsTrigger>
                            <TabsTrigger value={GenerateAttachmentTabEnum.PANEL_ATTACHMENT}>
                                {t(
                                    'pages.project.trainset.carriage_trainset.partials.preview_attachments.dialogs.buttons.panel_attachment',
                                )}
                            </TabsTrigger>
                        </TabsList>
                        <TabsContent value={GenerateAttachmentTabEnum.TRAINSET_ATTACHMENT_MECHANIC}>
                            <ScrollArea className='h-[400px] border p-4'>
                                {mechanicAttachment.map((attachment, index) => (
                                    <PreviewTrainsetAttachment
                                        title={t(
                                            'pages.project.trainset.carriage_trainset.partials.preview_attachments.dialogs.components.preview_trainset_attachment.props.title',
                                        )}
                                        key={index}
                                        attachment={attachment}
                                    />
                                ))}
                            </ScrollArea>
                        </TabsContent>
                        <TabsContent
                            value={GenerateAttachmentTabEnum.TRAINSET_ATTACHMENT_ELECTRIC}
                            className='w-full'
                        >
                            <ScrollArea className='h-[400px] border p-4'>
                                {electricAttachment.map((attachment, index) => (
                                    <PreviewTrainsetAttachment
                                        title={t(
                                            'pages.project.trainset.carriage_trainset.partials.preview_attachments.dialogs.components.preview_trainset_attachment.props.title',
                                        )}
                                        key={index}
                                        attachment={attachment}
                                    />
                                ))}
                            </ScrollArea>
                        </TabsContent>
                        <TabsContent value={GenerateAttachmentTabEnum.PANEL_ATTACHMENT}>
                            <ScrollArea className='h-[400px] min-w-full border p-4'>
                                <PreviewPanelAttachment trainset={trainset} />
                            </ScrollArea>
                        </TabsContent>
                    </Tabs>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
};

export default PreviewAttachments;
