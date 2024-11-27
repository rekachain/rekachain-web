import { CarriageResource, DetailWorkerPanelResource, PanelResource, ProgressResource, StepResource, TrainsetResource } from '@/Support/Interfaces/Resources';
import { Separator } from '@/Components/UI/separator';
import { Fragment, useEffect, useState } from 'react';
import { IntentEnum } from '@/Support/Enums/intentEnum';
import { useLaravelReactI18n } from 'laravel-react-i18n';
import { withLoading } from '@/Utils/withLoading';
import { trainsetService } from '@/Services/trainsetService';
import { ScrollArea, ScrollBar } from '@/Components/UI/scroll-area';
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbSeparator } from '@/Components/UI/breadcrumb';
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/UI/card';
import { DetailWorkerWorkStatusEnum } from '@/Support/Enums/DetailWorkerWorkStatusEnum';
import { Popover, PopoverContent, PopoverTrigger } from '@/Components/UI/popover';
import { DetailWorkerAcceptanceStatusEnum } from '@/Support/Enums/DetailWorkerAcceptanceStatusEnum';

interface SerialPanelProgressResource {
    serial_number: number;
    product_no: String;
    steps: StepResource & { 
        work_status: string | null;
        workers: DetailWorkerPanelResource[]; 
    }[];
}
interface PanelProgressResource {
    panel: PanelResource;
    carriage: CarriageResource;
    progress: ProgressResource;
    total_steps: number;
    serial_panels: SerialPanelProgressResource[];
}
const ProgressPanel = ({ trainset }: { trainset: TrainsetResource }) => {
    const { t } = useLaravelReactI18n();

    const [panelProgress, setPanelProgress] = useState<PanelProgressResource[]>();

    const loadProgress = withLoading(async () => {
        const progress = await trainsetService.get(trainset.id, {
            intent: IntentEnum.WEB_TRAINSET_GET_PANEL_PROGRESS_WITH_WORKER_STEPS,
        }) as unknown as PanelProgressResource[];
        setPanelProgress(progress);
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
        <div className="text-black dark:text-white" key={trainset.id}>
            <h1 className="text-xl font-bold">{'title🗿'}</h1>
            {(panelProgress == null || panelProgress.length === 0 && (
                <h3>Kosong🗿</h3>
            )) ||
                (panelProgress && (
                    panelProgress.map((progress) => (
                        <div key={`${progress.panel.id} ${progress.carriage.id}`}>
                            <h4 className="text-lg font-bold">Panel: {progress.panel.name}</h4>
                            <h4 className="text-lg font-bold">Gerbong: {progress.carriage.type}</h4>
                            <div className="flex flex-col gap-2">
                                {progress.serial_panels.map((serialPanelProgress) => (
                                    <div key={`${progress.panel.name} ${serialPanelProgress.serial_number}`}>
                                        <h3>Serial Number: {serialPanelProgress.serial_number}</h3>
                                        <h3>Product Number: {serialPanelProgress.product_no}</h3>
                                        <ScrollArea className="w-full rounded-md border">
                                            <div className="flex w-max space-x-4 p-4">
                                                <Breadcrumb>
                                                    <BreadcrumbList>
                                                    {serialPanelProgress.steps.map((step, index) => (
                                                        <Fragment key={`${serialPanelProgress.serial_number} ${(step as unknown as StepResource).id}`}>
                                                            <BreadcrumbItem>
                                                                <Popover modal>
                                                                    <PopoverTrigger className='text-left'>
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
                                                                    </PopoverTrigger>
                                                                    <PopoverContent className='flex flex-col gap-2'>
                                                                        <h4 className="text-lg font-bold">Workers🗿:</h4>
                                                                        <ScrollArea className="max-h-[250px] overflow-y-auto">
                                                                        <div className="flex flex-col gap-2">
                                                                            {step.workers && step.workers.map(stepWorker => (
                                                                                <Card className="bg-background dark:bg-background-dark rounded-lg shadow-lg" key={stepWorker.id}>
                                                                                    <CardHeader className="pb-2">
                                                                                        <CardTitle className="text-lg font-bold text-black dark:text-white">{stepWorker.worker?.name}</CardTitle>
                                                                                        <small className="text-sm text-gray-600 dark:text-gray-300">NIP: {stepWorker.worker?.nip}</small>
                                                                                    </CardHeader>
                                                                                    <CardContent className="flex flex-col gap-1">
                                                                                        <p className="text-sm">
                                                                                            Acceptance Status: <span className={stepWorker.acceptance_status === DetailWorkerAcceptanceStatusEnum.ACCEPTED ? 'text-green-500' : stepWorker.acceptance_status === DetailWorkerAcceptanceStatusEnum.DECLINED ? 'text-red-500' : ''}>{stepWorker.acceptance_status ?? 'N/A🗿'}</span>
                                                                                        </p>
                                                                                        <p className="text-sm">
                                                                                            Work Status: <span className={stepWorker.work_status === DetailWorkerWorkStatusEnum.COMPLETED ? 'text-green-500' : 'text-yellow-500'}>{stepWorker.work_status}</span>
                                                                                        </p>
                                                                                        <div className="flex flex-col gap-1">
                                                                                            <p className="text-sm">Started At:</p>
                                                                                            {/* <p className="text-sm">{stepWorker.created_at}</p> not work💀*/}
                                                                                            <p className="text-sm">
                                                                                                {new Intl.DateTimeFormat('en-US', {
                                                                                                    year: 'numeric',
                                                                                                    month: '2-digit',
                                                                                                    day: '2-digit',
                                                                                                    hour: '2-digit',
                                                                                                    minute: '2-digit',
                                                                                                    second: '2-digit',
                                                                                                }).format(new Date(stepWorker.created_at))}
                                                                                            </p>
                                                                                        </div>
                                                                                    </CardContent>
                                                                                </Card>
                                                                            ))}
                                                                            </div>
                                                                        </ScrollArea>
                                                                    </PopoverContent>
                                                                </Popover>
                                                            </BreadcrumbItem>
                                                            {index < serialPanelProgress.steps.length - 1 && <BreadcrumbSeparator />}
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
                )
            )}
        </div>
    );
};

export default ProgressPanel;
