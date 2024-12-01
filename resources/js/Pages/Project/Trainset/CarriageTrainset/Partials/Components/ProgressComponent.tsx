import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbList,
    BreadcrumbSeparator,
} from '@/Components/UI/breadcrumb';
import { Popover, PopoverContent, PopoverTrigger } from '@/Components/UI/popover';
import { ScrollArea, ScrollBar } from '@/Components/UI/scroll-area';
import { Separator } from '@/Components/UI/separator';
import { trainsetAttachmentService } from '@/Services/trainsetAttachmentService';
import { IntentEnum } from '@/Support/Enums/intentEnum';
import { ComponentProgressResource } from '@/Support/Interfaces/Others/ComponentProgressResource';
import {
    DetailWorkerTrainsetResource,
    StepResource,
    TrainsetAttachmentResource,
} from '@/Support/Interfaces/Resources';
import { withLoading } from '@/Utils/withLoading';
import { useLaravelReactI18n } from 'laravel-react-i18n';
import { Fragment, useEffect, useState } from 'react';
import WorkerCard from './Components/WorkerCard';
import WorkerStepCard from './Components/WorkerStepCard';

const ProgressComponent = ({
    attachment,
    title,
}: {
    attachment: TrainsetAttachmentResource;
    title: string;
}) => {
    const { t } = useLaravelReactI18n();

    const [trainsetAttachmentProgress, setTrainsetAttachmentProgress] =
        useState<ComponentProgressResource[]>();

    const loadProgress = withLoading(async () => {
        const progress = (await trainsetAttachmentService.get(attachment.id, {
            intent: IntentEnum.WEB_TRAINSET_ATTACHMENT_GET_ATTACHMENT_PROGRESS_WITH_WORKER_STEPS,
        })) as unknown as ComponentProgressResource[];
        setTrainsetAttachmentProgress(progress);
    });

    useEffect(() => {
        loadProgress();
    }, []);

    return (
        <div key={attachment.id} className='text-black dark:text-white'>
            <h1 className='text-xl font-bold'>{title}</h1>
            {trainsetAttachmentProgress == null ||
                (trainsetAttachmentProgress.length === 0 && (
                    <h3>{'Kososng🗿' + attachment.status}</h3>
                )) ||
                (trainsetAttachmentProgress &&
                    trainsetAttachmentProgress.map((progress) => (
                        <div key={progress.component.id}>
                            <h4 className='text-lg font-bold'>
                                {t(
                                    'pages.project.trainset.carriage_trainset.partials.components.progress_component.props.component',
                                    { component: progress.component.name },
                                )}
                            </h4>
                            <div className='flex flex-col gap-2'>
                                {progress.carriage_panel_components.map((componentProgress) => (
                                    <div key={`${componentProgress.carriage_panel_component_id}`}>
                                        <div className='flex items-center justify-center space-x-2 pb-1'>
                                            <div className='flex-1'>
                                                <h3 className='text-right'>
                                                    {t(
                                                        'pages.project.trainset.carriage_trainset.partials.components.progress_component.props.panel',
                                                        { panel: componentProgress.panel.name },
                                                    )}
                                                </h3>
                                            </div>
                                            <div className='flex-none'>
                                                <h3 className='text-center'>|</h3>
                                            </div>
                                            <div className='flex-1'>
                                                <h3 className='text-left'>
                                                    {t(
                                                        'pages.project.trainset.carriage_trainset.partials.components.progress_component.props.carriage',
                                                        {
                                                            carriage:
                                                                componentProgress.carriage.type,
                                                        },
                                                    )}
                                                </h3>
                                            </div>
                                        </div>
                                        <div className='flex'>
                                            <ScrollArea className='flex w-1 flex-1 rounded-md border'>
                                                <div className='flex w-max space-x-4 p-4'>
                                                    <Breadcrumb>
                                                        <BreadcrumbList>
                                                            {componentProgress.steps.map(
                                                                (step, index) => (
                                                                    <Fragment
                                                                        key={`${componentProgress.carriage_panel_component_id} ${(step as unknown as StepResource).id}`}
                                                                    >
                                                                        <BreadcrumbItem>
                                                                            <Popover modal>
                                                                                <PopoverTrigger className='text-left'>
                                                                                    <WorkerStepCard
                                                                                        step={
                                                                                            step as StepResource & {
                                                                                                work_status:
                                                                                                    | string
                                                                                                    | null;
                                                                                                localized_work_status:
                                                                                                    | string
                                                                                                    | null;
                                                                                                workers: DetailWorkerTrainsetResource[];
                                                                                            }
                                                                                        }
                                                                                    />
                                                                                </PopoverTrigger>
                                                                                <PopoverContent className='flex flex-col gap-2'>
                                                                                    <h4 className='text-lg font-bold'>
                                                                                        {t(
                                                                                            'pages.project.trainset.carriage_trainset.partials.components.progress_component.props.workers',
                                                                                        )}
                                                                                    </h4>
                                                                                    <ScrollArea className='max-h-[250px] overflow-y-auto'>
                                                                                        <div className='flex flex-col gap-2'>
                                                                                            {step.workers &&
                                                                                                step.workers.map(
                                                                                                    (
                                                                                                        stepWorker,
                                                                                                    ) => (
                                                                                                        <WorkerCard
                                                                                                            key={
                                                                                                                stepWorker.id
                                                                                                            }
                                                                                                            detailWorker={
                                                                                                                stepWorker
                                                                                                            }
                                                                                                        />
                                                                                                    ),
                                                                                                )}
                                                                                        </div>
                                                                                    </ScrollArea>
                                                                                </PopoverContent>
                                                                            </Popover>
                                                                        </BreadcrumbItem>
                                                                        {index <
                                                                            componentProgress.steps
                                                                                .length -
                                                                                1 && (
                                                                            <BreadcrumbSeparator
                                                                                key={
                                                                                    componentProgress
                                                                                        .panel
                                                                                        .name +
                                                                                    (
                                                                                        step as unknown as StepResource
                                                                                    ).id +
                                                                                    'sep'
                                                                                }
                                                                            />
                                                                        )}
                                                                    </Fragment>
                                                                ),
                                                            )}
                                                        </BreadcrumbList>
                                                    </Breadcrumb>
                                                </div>
                                                <ScrollBar orientation='horizontal' />
                                            </ScrollArea>
                                        </div>
                                    </div>
                                ))}
                                <Separator className='my-4 h-1' />
                            </div>
                        </div>
                    )))}
        </div>
    );
};

export default ProgressComponent;
