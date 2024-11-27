import { ComponentResource, PanelResource, ProgressResource, StepResource, TrainsetAttachmentResource } from '@/Support/Interfaces/Resources';
import { Separator } from '@/Components/UI/separator';
import { IntentEnum } from '@/Support/Enums/intentEnum';
import { useLaravelReactI18n } from 'laravel-react-i18n';
import { Fragment, useEffect, useState } from 'react';
import { trainsetAttachmentService } from '@/Services/trainsetAttachmentService';
import { withLoading } from '@/Utils/withLoading';
import { ScrollArea, ScrollBar } from '@/Components/UI/scroll-area';
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbSeparator } from '@/Components/UI/breadcrumb';
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/UI/card';
import { DetailWorkerWorkStatusEnum } from '@/Support/Enums/DetailWorkerWorkStatusEnum';

interface CarriagePanelComponentProgressResource {
    carriage_panel_component_id: number;
    panel: PanelResource;
    progress: ProgressResource;
    total_steps: number;
    steps: StepResource & { work_status: string | null }[];
}
interface TrainsetAttachmentProgressResource {
    component: ComponentResource;
    carriage_panel_components: CarriagePanelComponentProgressResource[];
}
const ProgressTrainsetAttachment = ({
    attachment,
    title,
}: {
    attachment: TrainsetAttachmentResource;
    title: string;
}) => {
    const { t } = useLaravelReactI18n();

    const [trainsetAttachmentProgress, setTrainsetAttachmentProgress] = useState<TrainsetAttachmentProgressResource[]>();

    const loadProgress = withLoading(async () => {
        const progress = await trainsetAttachmentService.get(attachment.id, {
            intent: IntentEnum.WEB_TRAINSET_ATTACHMENT_GET_ATTACHMENT_PROGRESS_WITH_WORKER_STEPS,
        }) as unknown as TrainsetAttachmentProgressResource[];
        setTrainsetAttachmentProgress(progress);
        console.log(progress);
    });

    useEffect(() => {
        loadProgress();
    }, []);
    
    const getStatusColor = (status: any) => {
        switch (status) {
            case 'completed':
                return 'bg-tertiary text-black';
            case 'in_progress':
                return 'bg-warning text-black';
            case 'failed':
                return 'bg-destructive text-black';
            default:
                return 'bg-background dark:bg-background-dark border border-gray-300'; // Neutral background
        }
    };

    return (
        <div className="text-black dark:text-white" key={attachment.id}>
            <h1 className="text-xl font-bold">{title}</h1>
            {trainsetAttachmentProgress == null ||
                (trainsetAttachmentProgress.length === 0 && 
                    <h3>{'Kososng🗿' + attachment.status}</h3>
                ) || (trainsetAttachmentProgress &&
                    trainsetAttachmentProgress.map((progress, index) => (
                        <div key={progress.component.id}>
                            <h4 className="text-lg font-bold">Komponen: {progress.component.name}</h4>
                            <div className="flex flex-col gap-2">
                                {progress.carriage_panel_components.map((componentProgress, index) => (
                                    <div key={`${progress.component.name} ${componentProgress.panel.id}`}>
                                        <h3 key={`panel_name_${componentProgress.panel.id}`}>Panel: {componentProgress.panel.name}</h3>
                                        <ScrollArea className="w-full rounded-md border">
                                            <div className="flex w-max space-x-4 p-4">
                                                <Breadcrumb key={`panel_breadcrumb_${componentProgress.panel.id}`}>
                                                    <BreadcrumbList key={`panel_breadcrumb_list_${componentProgress.panel.id}`}>
                                                    {componentProgress.steps.map((step, index) => (
                                                        <Fragment key={componentProgress.panel.name + (step as unknown as StepResource).id}>
                                                            <BreadcrumbItem key={componentProgress.panel.name + (step as unknown as StepResource).id}>
                                                                <Card className={`${getStatusColor(step.work_status)}`}>
                                                                    <CardHeader className='pb-1'>
                                                                        <CardTitle className='text-sm'>{(step as unknown as StepResource).name}</CardTitle>
                                                                    </CardHeader>
                                                                    <CardContent className='flex flex-col gap-1'>
                                                                        <p className='text-sm'>{(step as unknown as StepResource).process}</p>
                                                                        <small className='text-xs'>
                                                                            Status: {step.work_status === DetailWorkerWorkStatusEnum.COMPLETED ? 'Complete' : step.work_status === DetailWorkerWorkStatusEnum.IN_PROGRESS ? 'In Progress' : 'Nothing '}</small>
                                                                    </CardContent>
                                                                </Card>
                                                            </BreadcrumbItem>
                                                            {index < componentProgress.steps.length - 1 && <BreadcrumbSeparator key={componentProgress.panel.name + (step as unknown as StepResource).id + 'sep'}/>}

                                                        </Fragment>
                                                    ))}
                                                    </BreadcrumbList>
                                                </Breadcrumb>

                                            </div>
                                            <ScrollBar orientation="horizontal" />
                                        </ScrollArea>
                                    </div>
                                ))}
                                <Separator className="my-4 h-1" />
                            </div>
                        </div>
                    ))
                )}
        </div>
    );
};

export default ProgressTrainsetAttachment;
