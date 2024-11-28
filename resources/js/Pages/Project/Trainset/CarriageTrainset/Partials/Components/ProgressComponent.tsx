import { CarriageResource, ComponentResource, DetailWorkerTrainsetResource, PanelResource, ProgressResource, StepResource, TrainsetAttachmentResource } from '@/Support/Interfaces/Resources';
import { Separator } from '@/Components/UI/separator';
import { IntentEnum } from '@/Support/Enums/intentEnum';
import { useLaravelReactI18n } from 'laravel-react-i18n';
import { Fragment, useEffect, useState } from 'react';
import { trainsetAttachmentService } from '@/Services/trainsetAttachmentService';
import { withLoading } from '@/Utils/withLoading';
import { ScrollArea, ScrollBar } from '@/Components/UI/scroll-area';
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbSeparator } from '@/Components/UI/breadcrumb';
import { Popover, PopoverContent, PopoverTrigger } from '@/Components/UI/popover';
import WorkerCard from './Components/WorkerCard';
import WorkerStepCard from './Components/WorkerStepCard';

interface CarriagePanelComponentProgressResource {
    carriage_panel_component_id: number;
    panel: PanelResource;
    carriage: CarriageResource;
    progress: ProgressResource;
    total_steps: number;
    steps: StepResource & { 
        work_status: string | null;
        workers: DetailWorkerTrainsetResource[];
    }[];
}
interface TrainsetAttachmentProgressResource {
    component: ComponentResource;
    carriage_panel_components: CarriagePanelComponentProgressResource[];
}
const ProgressComponent = ({
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
    });

    useEffect(() => {
        loadProgress();
    }, []);    

    return (
        <div className="text-black dark:text-white" key={attachment.id}>
            <h1 className="text-xl font-bold">{title}</h1>
            {trainsetAttachmentProgress == null ||
                (trainsetAttachmentProgress.length === 0 && 
                    <h3>{'Kososng🗿' + attachment.status}</h3>
                ) || (trainsetAttachmentProgress &&
                    trainsetAttachmentProgress.map((progress) => (
                        <div key={progress.component.id}>
                            <h4 className="text-lg font-bold">Komponen: {progress.component.name}</h4>
                            <div className="flex flex-col gap-2">
                                {progress.carriage_panel_components.map((componentProgress) => (
                                    <div key={`${componentProgress.carriage_panel_component_id}`}>
                                        <div className="flex items-center justify-center space-x-2 pb-1">
                                            <div className="flex-1">
                                                <h3 className="text-right">{componentProgress.panel.name}</h3>
                                            </div>
                                            <div className="flex-none">
                                                <h3 className="text-center">|</h3>
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="text-left">Gerbong: {componentProgress.carriage.type}</h3>
                                            </div>
                                        </div>
                                        <ScrollArea className="w-full rounded-md border">
                                            <div className="flex w-max space-x-4 p-4">
                                                <Breadcrumb>
                                                    <BreadcrumbList>
                                                    {componentProgress.steps.map((step, index) => (
                                                        <Fragment key={`${componentProgress.carriage_panel_component_id} ${(step as unknown as StepResource).id}`}>
                                                            <BreadcrumbItem>
                                                                <Popover modal>
                                                                    <PopoverTrigger className='text-left'>
                                                                        <WorkerStepCard step={step as StepResource & { work_status: string | null; workers: DetailWorkerTrainsetResource[];}} />
                                                                    </PopoverTrigger>
                                                                    <PopoverContent className='flex flex-col gap-2'>
                                                                        <h4 className="text-lg font-bold">Workers🗿:</h4>
                                                                        <ScrollArea className="max-h-[250px] overflow-y-auto">
                                                                            <div className="flex flex-col gap-2">
                                                                            {step.workers && step.workers.map(stepWorker => (
                                                                                <WorkerCard detailWorker={stepWorker} key={stepWorker.id} />
                                                                            ))}
                                                                            </div>
                                                                        </ScrollArea>
                                                                    </PopoverContent>
                                                                </Popover>
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
                                <Separator className="my-4 h-1 bg-black dark:bg-white" />
                            </div>
                        </div>
                    ))
                )}
        </div>
    );
};

export default ProgressComponent;
