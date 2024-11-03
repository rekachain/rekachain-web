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
import { Link } from '@inertiajs/react';
import { ROUTES } from '@/Support/Constants/routes';
import { ScrollArea } from '@/Components/UI/scroll-area';
import { PanelAttachmentResource, TrainsetAttachmentResource, TrainsetResource } from '@/Support/Interfaces/Resources';
import { useEffect, useState } from 'react';
import { GenerateAttachmentTabEnum } from '@/Support/Enums/generateAttachmentTabEnum';
import { trainsetService } from '@/Services/trainsetService';
import { TrainsetAttachmentTypeEnum } from '@/Support/Enums/trainsetAttachmentTypeEnum';
import { withLoading } from '@/Utils/withLoading';
import { trainsetAttachmentService } from '@/Services/trainsetAttachmentService';
import PreviewTrainsetAttachment from '@/Pages/Project/Trainset/Carriage/Partials/Components/PreviewTrainsetAttachment';
import { IntentEnum } from '@/Support/Enums/intentEnum';
import PreviewPanelAttachment from '@/Pages/Project/Trainset/Carriage/Partials/Components/PreviewPanelAttachment';

const PreviewAttachments = ({ trainset }: { trainset: TrainsetResource }) => {
    const [activeTab, setActiveTab] = useState<GenerateAttachmentTabEnum>();

    const [mechanicAttachmentIds, setMechanicAttachmentIds] = useState<number[]>([]);
    const [electricAttachmentIds, setElectricAttachmentIds] = useState<number[]>([]);
    const [assemblyAttachmentIds, setAssemblyAttachmentIds] = useState<number[]>([]);

    const [mechanicAttachment, setMechanicAttachment] = useState<TrainsetAttachmentResource[]>([]);
    const [electricAttachment, setElectricAttachment] = useState<TrainsetAttachmentResource[]>([]);
    const [assemblyAttachment, setAssemblyAttachment] = useState<PanelAttachmentResource[]>([]);

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
            if (attachment.type === TrainsetAttachmentTypeEnum.MECHANIC) {
                setMechanicAttachmentIds([...mechanicAttachmentIds, attachment.id]);
            } else if (attachment.type === TrainsetAttachmentTypeEnum.ELECTRIC) {
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
            <DialogTrigger className={buttonVariants()}>Lihat Detail KPM</DialogTrigger>
            <DialogContent className="w-[70%]">
                <DialogHeader>
                    <DialogTitle>&nbsp;</DialogTitle>
                    <DialogDescription className="w-full"></DialogDescription>
                    <Tabs
                        defaultValue="mekanik"
                        className="w-full"
                        value={activeTab}
                        onValueChange={value => setActiveTab(value as GenerateAttachmentTabEnum)}
                    >
                        <TabsList>
                            <TabsTrigger value={GenerateAttachmentTabEnum.TRAINSET_ATTACHMENT_MECHANIC}>
                                KPM Mekanik
                            </TabsTrigger>
                            <TabsTrigger value={GenerateAttachmentTabEnum.TRAINSET_ATTACHMENT_ELECTRIC}>
                                KPM Elektrik
                            </TabsTrigger>
                            <TabsTrigger value={GenerateAttachmentTabEnum.PANEL_ATTACHMENT}>KPM Assembly</TabsTrigger>
                        </TabsList>
                        <TabsContent value={GenerateAttachmentTabEnum.TRAINSET_ATTACHMENT_MECHANIC}>
                            <Link
                                className={buttonVariants({
                                    className: 'my-2',
                                })}
                                href={route(ROUTES.PROJECTS_TRAINSETS_DOWNLOAD_ATTACHMENT, [
                                    trainset.project_id,
                                    trainset.id,
                                ])}
                                target="_blank"
                            >
                                Download Attachment
                            </Link>
                            <ScrollArea className="h-[400px] rounded-md border p-4">
                                {mechanicAttachment.map((attachment, index) => (
                                    <PreviewTrainsetAttachment
                                        attachment={attachment}
                                        title="KPM Mekanik"
                                        key={index}
                                    />
                                ))}
                            </ScrollArea>
                        </TabsContent>
                        <TabsContent value={GenerateAttachmentTabEnum.TRAINSET_ATTACHMENT_ELECTRIC}>
                            <ScrollArea className="h-[400px] rounded-md border p-4">
                                {electricAttachment.map((attachment, index) => (
                                    <PreviewTrainsetAttachment
                                        attachment={attachment}
                                        title="KPM Elektrik"
                                        key={index}
                                    />
                                ))}
                            </ScrollArea>
                        </TabsContent>
                        <TabsContent value={GenerateAttachmentTabEnum.PANEL_ATTACHMENT}>
                            <ScrollArea className="h-[400px] rounded-md border p-4">
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
