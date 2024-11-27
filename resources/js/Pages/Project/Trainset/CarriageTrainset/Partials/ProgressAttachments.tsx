import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/Components/UI/dialog';
import { buttonVariants } from '@/Components/UI/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/Components/UI/tabs';
import { ScrollArea } from '@/Components/UI/scroll-area';
import { TrainsetAttachmentResource, TrainsetResource } from '@/Support/Interfaces/Resources';
import { useEffect, useState } from 'react';
import { GenerateAttachmentTabEnum } from '@/Support/Enums/generateAttachmentTabEnum';
import { trainsetService } from '@/Services/trainsetService';
import { TrainsetAttachmentTypeEnum } from '@/Support/Enums/trainsetAttachmentTypeEnum';
import { withLoading } from '@/Utils/withLoading';
import { trainsetAttachmentService } from '@/Services/trainsetAttachmentService';
import ProgressTrainsetAttachment from '@/Pages/Project/Trainset/CarriageTrainset/Partials/Components/ProgressTrainsetAttachment';
import { IntentEnum } from '@/Support/Enums/intentEnum';
import { useLaravelReactI18n } from 'laravel-react-i18n';
import ProgressPanel from './Components/ProgressPanel';

const ProgressAttachments = ({ trainset }: { trainset: TrainsetResource }) => {
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

        data.trainset_attachments.forEach(attachment => {
            if (attachment.type === TrainsetAttachmentTypeEnum.MECHANIC && attachment.is_ancestor) {
                setMechanicAttachmentIds([...mechanicAttachmentIds, attachment.id]);
            } else if (attachment.type === TrainsetAttachmentTypeEnum.ELECTRIC && attachment.is_ancestor) {
                setElectricAttachmentIds([...electricAttachmentIds, attachment.id]);
            }
        });

        data.panel_attachments.forEach(attachment => {
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
                {'progressanmin🗿'}
            </DialogTrigger>
            <DialogContent className="w-[70%]">
                <DialogHeader className='overflow-auto'>
                    <DialogTitle></DialogTitle>
                    <DialogDescription className="w-full"></DialogDescription>
                    <Tabs
                        defaultValue={GenerateAttachmentTabEnum.TRAINSET_ATTACHMENT_MECHANIC}
                        className="w-full"
                        value={activeTab}
                        onValueChange={value => setActiveTab(value as GenerateAttachmentTabEnum)}
                    >
                        <TabsList>
                            <TabsTrigger value={GenerateAttachmentTabEnum.TRAINSET_ATTACHMENT_MECHANIC}>
                                {'Progress Mekanik'}
                            </TabsTrigger>
                            <TabsTrigger value={GenerateAttachmentTabEnum.TRAINSET_ATTACHMENT_ELECTRIC}>
                                {'Progress Elektrik'}
                            </TabsTrigger>
                            <TabsTrigger value={GenerateAttachmentTabEnum.PANEL_ATTACHMENT}>
                                {'Progress Assembly'}
                            </TabsTrigger>
                        </TabsList>
                        <TabsContent value={GenerateAttachmentTabEnum.TRAINSET_ATTACHMENT_MECHANIC}>
                            <ScrollArea className="h-[600px] border p-4">
                                {mechanicAttachment.map((attachment, index) => (
                                    <ProgressTrainsetAttachment
                                        attachment={attachment}
                                        title={`PROGRESS MECHANIC ${trainset.name}`}
                                        key={index}
                                    />
                                ))}
                            </ScrollArea>
                        </TabsContent>
                        <TabsContent value={GenerateAttachmentTabEnum.TRAINSET_ATTACHMENT_ELECTRIC}>
                            <ScrollArea className="h-[600px] border p-4">
                                {electricAttachment.map((attachment, index) => (
                                    <ProgressTrainsetAttachment
                                        attachment={attachment}
                                        title={`PROGRESS ELECTRIC ${trainset.name}`}
                                        key={index}
                                    />
                                ))}
                            </ScrollArea>
                        </TabsContent>
                        <TabsContent value={GenerateAttachmentTabEnum.PANEL_ATTACHMENT}>
                            <ScrollArea className="h-[600px] border p-4">
                                <ProgressPanel trainset={trainset} />
                            </ScrollArea>
                        </TabsContent>
                    </Tabs>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
};

export default ProgressAttachments;
