import { CarriageResource, DetailWorkerPanelResource, PanelResource, ProgressResource, StepResource, TrainsetResource } from '@/Support/Interfaces/Resources';
import { Separator } from '@/Components/UI/separator';
import { Fragment, useEffect, useState } from 'react';
import { IntentEnum } from '@/Support/Enums/intentEnum';
import { useLaravelReactI18n } from 'laravel-react-i18n';
import { withLoading } from '@/Utils/withLoading';
import { trainsetService } from '@/Services/trainsetService';
import { ScrollArea, ScrollBar } from '@/Components/UI/scroll-area';
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbSeparator } from '@/Components/UI/breadcrumb';
import { Popover, PopoverContent, PopoverTrigger } from '@/Components/UI/popover';
import WorkerStepCard from './Components/WorkerStepCard';
import WorkerCard from './Components/WorkerCard';
import { PanelProgressResource } from '@/Support/Interfaces/Others/PanelProgressResource';

const ProgressPanel = ({ trainset, title }: { trainset: TrainsetResource, title: string }) => {
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

    return (
        <div key={trainset.id} className="text-black dark:text-white">
            <h1 className="text-xl font-bold">{title}</h1>
            {(panelProgress == null || panelProgress.length === 0 && (
                <h3>Kosong🗿</h3>
            )) ||
                (panelProgress && (
                    panelProgress.map((progress) => (
                        <div key={`${progress.panel.id} ${progress.carriage.id}`}>
                            <h4 className="text-lg font-bold">
                                <span>{progress.panel.name}</span> 
                                <span className="mx-2">|</span> 
                                <span>{t('pages.project.trainset.carriage_trainset.partials.components.progress_panel.props.carriage', { carriage: progress.carriage.type})}</span>
                            </h4>
                            <div className="flex flex-col gap-2">
                                {progress.serial_panels.map((serialPanelProgress) => (
                                    <div key={`${progress.panel.name} ${serialPanelProgress.serial_number}`}>
                                        <div className="flex items-center justify-center space-x-2 pb-1">
                                            <div className="flex-1">
                                                <h3 className="text-right">{t('pages.project.trainset.carriage_trainset.partials.components.progress_panel.props.serial_number', { serial_number: serialPanelProgress.serial_number })}</h3>
                                            </div>
                                            <div className="flex-none">
                                                <h3 className="text-center">|</h3>
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="text-left">{t('pages.project.trainset.carriage_trainset.partials.components.progress_panel.props.product_number', { product_number: serialPanelProgress.product_no })}</h3>
                                            </div>
                                        </div>
                                        <ScrollArea className="w-full rounded-md border">
                                            <div className="flex w-max space-x-4 p-4">
                                                <Breadcrumb>
                                                    <BreadcrumbList>
                                                    {serialPanelProgress.steps.map((step, index) => (
                                                        <Fragment key={`${serialPanelProgress.serial_number} ${(step as unknown as StepResource).id}`}>
                                                            <BreadcrumbItem>
                                                                <Popover modal>
                                                                    <PopoverTrigger className='text-left'>
                                                                        <WorkerStepCard step={step as StepResource & { work_status: string | null; workers: DetailWorkerPanelResource[];}}/>
                                                                    </PopoverTrigger>
                                                                    <PopoverContent className='flex flex-col gap-2'>
                                                                        <h4 className="text-lg font-bold">{t('pages.project.trainset.carriage_trainset.partials.components.progress_panel.props.workers')}</h4>
                                                                        <ScrollArea className="max-h-[250px] overflow-y-auto">
                                                                        <div className="flex flex-col gap-2">
                                                                            {step.workers && step.workers.map(stepWorker => (
                                                                                <WorkerCard key={stepWorker.id} detailWorker={stepWorker} />
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
