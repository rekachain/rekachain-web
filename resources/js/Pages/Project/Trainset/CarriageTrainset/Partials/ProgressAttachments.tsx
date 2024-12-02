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
import ProgressComponent from '@/Pages/Project/Trainset/CarriageTrainset/Partials/Components/ProgressComponent';
import { trainsetAttachmentService } from '@/Services/trainsetAttachmentService';
import { trainsetService } from '@/Services/trainsetService';
import { GenerateAttachmentTabEnum } from '@/Support/Enums/generateAttachmentTabEnum';
import { TrainsetAttachmentTypeEnum } from '@/Support/Enums/trainsetAttachmentTypeEnum';
import { TrainsetAttachmentResource, TrainsetResource } from '@/Support/Interfaces/Resources';
import { withLoading } from '@/Utils/withLoading';
import { useLaravelReactI18n } from 'laravel-react-i18n';
import { useEffect, useState } from 'react';
import ProgressPanel from './Components/ProgressPanel';

const ProgressAttachments = ({ trainset }: { trainset: TrainsetResource }) => {
    const { t } = useLaravelReactI18n();
    const [activeTab, setActiveTab] = useState<GenerateAttachmentTabEnum>();

    const [mechanicAttachmentId, setMechanicAttachmentId] = useState<number>();
    const [electricAttachmentId, setElectricAttachmentId] = useState<number>();
    const [mechanicAttachment, setMechanicAttachment] = useState<TrainsetAttachmentResource>();
    const [electricAttachment, setElectricAttachment] = useState<TrainsetAttachmentResource>();
    const fetchAttachment = withLoading(async () => {
        if (activeTab === GenerateAttachmentTabEnum.TRAINSET_ATTACHMENT_MECHANIC) {
            if (!mechanicAttachmentId) return;
            const res = await trainsetAttachmentService.get(mechanicAttachmentId);
            setMechanicAttachment(res);
        } else if (activeTab === GenerateAttachmentTabEnum.TRAINSET_ATTACHMENT_ELECTRIC) {
            if (!electricAttachmentId) return;
            const res = await trainsetAttachmentService.get(electricAttachmentId);
            setElectricAttachment(res);
        }
    });

    const fetchAttachments = withLoading(async () => {
        const data = await trainsetService.get(trainset.id);

        data.trainset_attachments.forEach((attachment) => {
            if (attachment.type === TrainsetAttachmentTypeEnum.MECHANIC && attachment.is_ancestor) {
                setMechanicAttachmentId(attachment.id);
            } else if (
                attachment.type === TrainsetAttachmentTypeEnum.ELECTRIC &&
                attachment.is_ancestor
            ) {
                setElectricAttachmentId(attachment.id);
            }
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
                    'pages.project.trainset.carriage_trainset.partials.progress_attachments.dialogs.buttons.trigger',
                )}
            </DialogTrigger>
            <DialogContent className='w-[70%]'>
                <DialogHeader className='overflow-auto'>
                    <DialogTitle></DialogTitle>
                    <DialogDescription className='w-full'></DialogDescription>
                    <Tabs
                        value={activeTab}
                        onValueChange={(value) => setActiveTab(value as GenerateAttachmentTabEnum)}
                        defaultValue={GenerateAttachmentTabEnum.TRAINSET_ATTACHMENT_MECHANIC}
                        className='w-full'
                    >
                        <TabsList>
                            <TabsTrigger
                                value={GenerateAttachmentTabEnum.TRAINSET_ATTACHMENT_MECHANIC}
                            >
                                {t(
                                    'pages.project.trainset.carriage_trainset.partials.progress_attachments.dialogs.components.tabs.props.tab_list.mechanic',
                                )}
                            </TabsTrigger>
                            <TabsTrigger
                                value={GenerateAttachmentTabEnum.TRAINSET_ATTACHMENT_ELECTRIC}
                            >
                                {t(
                                    'pages.project.trainset.carriage_trainset.partials.progress_attachments.dialogs.components.tabs.props.tab_list.electric',
                                )}
                            </TabsTrigger>
                            <TabsTrigger value={GenerateAttachmentTabEnum.PANEL_ATTACHMENT}>
                                {t(
                                    'pages.project.trainset.carriage_trainset.partials.progress_attachments.dialogs.components.tabs.props.tab_list.assembly',
                                )}
                            </TabsTrigger>
                        </TabsList>
                        <TabsContent
                            value={GenerateAttachmentTabEnum.TRAINSET_ATTACHMENT_MECHANIC}
                            className='focus-visible:ring-0'
                        >
                            <ScrollArea className='h-[600px] border p-4'>
                                {mechanicAttachment && (
                                    <ProgressComponent
                                        title={t(
                                            'pages.project.trainset.carriage_trainset.partials.progress_attachments.dialogs.components.tabs.props.tab_content.title.mechanic',
                                            { trainset: trainset.name },
                                        )}
                                        attachment={mechanicAttachment}
                                    />
                                )}
                            </ScrollArea>
                        </TabsContent>
                        <TabsContent
                            value={GenerateAttachmentTabEnum.TRAINSET_ATTACHMENT_ELECTRIC}
                            className='focus-visible:ring-0'
                        >
                            <ScrollArea className='h-[600px] border p-4'>
                                {electricAttachment && (
                                    <ProgressComponent
                                        title={t(
                                            'pages.project.trainset.carriage_trainset.partials.progress_attachments.dialogs.components.tabs.props.tab_content.title.electric',
                                            { trainset: trainset.name },
                                        )}
                                        attachment={electricAttachment}
                                    />
                                )}
                            </ScrollArea>
                        </TabsContent>
                        <TabsContent
                            value={GenerateAttachmentTabEnum.PANEL_ATTACHMENT}
                            className='focus-visible:ring-0'
                        >
                            <ScrollArea className='h-[600px] border p-4'>
                                <ProgressPanel
                                    trainset={trainset}
                                    title={t(
                                        'pages.project.trainset.carriage_trainset.partials.progress_attachments.dialogs.components.tabs.props.tab_content.title.assembly',
                                        { trainset: trainset.name },
                                    )}
                                />
                            </ScrollArea>
                        </TabsContent>
                    </Tabs>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
};

export default ProgressAttachments;
