import { ComponentResource, PanelResource, ProgressResource, StepResource, TrainsetAttachmentResource } from '@/Support/Interfaces/Resources';
import { Separator } from '@/Components/UI/separator';
import { IntentEnum } from '@/Support/Enums/intentEnum';
import { useLaravelReactI18n } from 'laravel-react-i18n';
import { useEffect, useState } from 'react';
import { trainsetAttachmentService } from '@/Services/trainsetAttachmentService';
import { withLoading } from '@/Utils/withLoading';
import { ScrollArea } from '@/Components/UI/scroll-area';

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
            intent: IntentEnum.WEB_TRAINSET_ATTACHMENT_GET_ATTACHMENT_PROGRESS,
        }) as unknown as TrainsetAttachmentProgressResource[];
        setTrainsetAttachmentProgress(progress);
        console.log(progress);
    });

    useEffect(() => {
        loadProgress();
    }, []);

    const StepCard = ({ step }: any) => {
        const getStatusColor = (status: any) => {
            switch (status) {
                case 'completed':
                    return 'bg-green-500 text-black';
                case 'in_progress':
                    return 'bg-yellow-500 text-black';
                case 'failed':
                    return 'bg-red-500 text-black';
                default:
                    return 'bg-background dark:bg-background-dark border border-gray-300'; // Neutral background
            }
        };

        return (
            <div className={getStatusColor(step.work_status)}
                style={{
                    margin: '0 8px',
                    display: "inline-block",
                    backgroundColor: getStatusColor(step.work_status),
                    borderRadius: '8px',
                    padding: '8px',
                    marginBottom: '8px',
                }}
            >
                <h4 style={{ margin: 0 }}>{step.step_name}</h4>
                <p style={{ margin: '4px 0' }}>{step.step_process}</p>
                <small>Estimated Time: {step.estimated_time}</small>
            </div>
        );
    };
      

    return (
        <div className="text-black dark:text-white" key={attachment.id}>
            <h1 className="text-xl font-bold">{title}</h1>
            {(trainsetAttachmentProgress == null || trainsetAttachmentProgress.length === 0 && (
                <h3>{'Kososng🗿'+attachment.status}</h3>
            )) ||
                (trainsetAttachmentProgress && (
                    <ScrollArea>
                        <h4>
                            {trainsetAttachmentProgress.map((progress, index) => (
                                <div key={progress.component.id}>
                                    <h4 className="text-lg font-bold">Komponen: {progress.component.name}</h4>
                                    <ScrollArea className='overflow-x-auto'>
                                        <div className="flex flex-col gap-2">
                                            {progress.carriage_panel_components.map((componentProgress, index) => (
                                                <div key={componentProgress.carriage_panel_component_id}>
                                                    <h3 key={`panel_name_${componentProgress.panel.id}`}>Panel: {componentProgress.panel.name}</h3>
                                                        {componentProgress.steps.map((step, index) => (
                                                            <>
                                                                <StepCard step={step} key={(step as StepResource & { work_status: string | null }).id}/>
                                                                {index < componentProgress.steps.length - 1 && '→'}
                                                                
                                                            </>
                                                        ))}
                                                </div>
                                            ))}
                                            <Separator className="my-4 h-1" />
                                        </div>
                                    </ScrollArea>
                                </div>
                            ))}
                        </h4>
                    </ScrollArea>
                ))}
        </div>
    );
};

export default ProgressTrainsetAttachment;
