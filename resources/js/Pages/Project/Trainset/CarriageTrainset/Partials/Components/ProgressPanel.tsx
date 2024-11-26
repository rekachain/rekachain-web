import { PanelResource, ProgressResource, StepResource, TrainsetResource } from '@/Support/Interfaces/Resources';
import { Separator } from '@/Components/UI/separator';
import { useEffect, useState } from 'react';
import { IntentEnum } from '@/Support/Enums/intentEnum';
import { useLaravelReactI18n } from 'laravel-react-i18n';
import { withLoading } from '@/Utils/withLoading';
import { trainsetService } from '@/Services/trainsetService';
import { ScrollArea } from '@/Components/UI/scroll-area';

interface SerialPanelProgressResource {
    serial_number: number;
    product_no: String;
    steps: StepResource & { work_status: string | null }[];
}
interface PanelProgressResource {
    panel: PanelResource;
    progress: ProgressResource;
    total_steps: number;
    serial_panels: SerialPanelProgressResource[];
}
const ProgressPanel = ({ trainset }: { trainset: TrainsetResource }) => {
    const { t } = useLaravelReactI18n();

    const [panelProgress, setPanelProgress] = useState<PanelProgressResource[]>();

    const loadProgress = withLoading(async () => {
        const progress = await trainsetService.get(trainset.id, {
            intent: IntentEnum.WEB_TRAINSET_GET_PANEL_PROGRESS,
        }) as unknown as PanelProgressResource[];
        setPanelProgress(progress);
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
        <div className="text-black dark:text-white" key={trainset.id}>
            <h1 className="text-xl font-bold">{'title🗿'}</h1>
            {(panelProgress == null || panelProgress.length === 0 && (
                <h3>Kosong🗿</h3>
            )) ||
                (panelProgress && (
                    <ScrollArea>
                        <h4>
                            {panelProgress.map((progress, index) => (
                                <div key={index}>
                                    <h4 className="text-lg font-bold">Panel: {progress.panel.name}</h4>
                                    <h4 className="text-lg font-bold">Progress: {progress.progress.name}</h4>
                                    <ScrollArea className='overflow-x-auto'>
                                        <div className="flex flex-col gap-2">
                                            {progress.serial_panels.map((panelProgress, index) => (
                                                <div key={panelProgress.serial_number}>
                                                    <h3>SN: {panelProgress.serial_number}</h3>
                                                    <h3>Product No: {panelProgress.product_no}</h3>
                                                    {panelProgress.steps.map((step, index) => (
                                                        <>
                                                            <StepCard step={step} />
                                                            {index < panelProgress.steps.length - 1 && '→'}
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

export default ProgressPanel;
