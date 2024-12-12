import InputLabel from '@/Components/InputLabel';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbList,
    BreadcrumbSeparator,
} from '@/Components/UI/breadcrumb';
import { buttonVariants } from '@/Components/UI/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/Components/UI/dialog';
import { Popover, PopoverContent, PopoverTrigger } from '@/Components/UI/popover';
import { ScrollArea, ScrollBar } from '@/Components/UI/scroll-area';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/Components/UI/select';
import { Separator } from '@/Components/UI/separator';
import { trainsetAttachmentService } from '@/Services/trainsetAttachmentService';
import { IntentEnum } from '@/Support/Enums/intentEnum';
import { ComponentProgressResource } from '@/Support/Interfaces/Others/ComponentProgressResource';
import {
    ComponentResource,
    DetailWorkerTrainsetResource,
    StepResource,
    TrainsetAttachmentResource,
} from '@/Support/Interfaces/Resources';
import { withLoading } from '@/Utils/withLoading';
import { useLaravelReactI18n } from 'laravel-react-i18n';
import { MoveDown } from 'lucide-react';
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

    const [components, setComponents] = useState<ComponentResource[]>();
    const [selectedComponent, setSelectedComponent] = useState<number | null>(0);
    const [componentProgress, setComponentProgress] = useState<ComponentProgressResource[]>();

    const loadComponents = withLoading(async () => {
        const components = (await trainsetAttachmentService.get(attachment.id, {
            intent: IntentEnum.WEB_TRAINSET_ATTACHMENT_GET_ATTACHMENT_COMPONENTS,
        })) as unknown as ComponentResource[];
        setComponents(components);
    });
    const loadProgress = withLoading(async () => {
        const progress = (await trainsetAttachmentService.get(attachment.id, {
            intent: IntentEnum.WEB_TRAINSET_ATTACHMENT_GET_ATTACHMENT_PROGRESS_WITH_WORKER_STEPS,
            ...(selectedComponent !== null && selectedComponent !== 0
                ? {
                      column_filters: {
                          id: selectedComponent,
                      },
                  }
                : {}),
        })) as unknown as ComponentProgressResource[];
        setComponentProgress(progress);
    });

    useEffect(() => {
        loadComponents();
        loadProgress();
    }, []);

    useEffect(() => {
        loadProgress();
    }, [selectedComponent]);

    return (
        <div key={attachment.id} className='text-black dark:text-white'>
            <div className='mb-3 flex w-[90%] flex-col justify-between md:w-fit md:flex-row'>
                <h1 className='my-auto flex text-center text-xl font-bold md:w-full'>{title}</h1>
                <div className='flex'>
                    <InputLabel
                        id='selected-component-id-label'
                        className='my-auto mr-2 text-lg font-bold'
                    >
                        {t(
                            'pages.project.trainset.carriage_trainset.partials.components.progress_component.props.component_placeholder',
                        )}
                        :
                    </InputLabel>

                    <Select
                        value={selectedComponent?.toString()}
                        onValueChange={(value) => setSelectedComponent(+value)}
                    >
                        <SelectTrigger
                            id='selected-component-id'
                            className='w-max min-w-[200px] focus:ring-0'
                        >
                            <SelectValue
                                placeholder={`${t('pages.project.trainset.carriage_trainset.partials.components.progress_component.props.component_placeholder')}...`}
                            />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value={'0'} key={'select-all'}>
                                {t(
                                    'pages.project.trainset.carriage_trainset.partials.components.progress_component.props.select_all_components',
                                )}
                            </SelectItem>
                            {components?.map((component) => (
                                <SelectItem value={component.id?.toString()} key={component.id}>
                                    {component.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </div>
            {componentProgress == null ||
                (componentProgress.length === 0 && (
                    <h3>
                        {t(
                            'pages.project.trainset.carriage_trainset.partials.components.progress_component.props.none',
                            { status: attachment.status },
                        )}
                    </h3>
                )) ||
                (componentProgress &&
                    componentProgress.map((progress, index) => (
                        <div key={progress.component.id}>
                            <h4 className='w-[80%] text-lg font-bold md:w-full'>
                                {t(
                                    'pages.project.trainset.carriage_trainset.partials.components.progress_component.props.component',
                                    { component: progress.component.name },
                                )}
                            </h4>
                            <div className='flex flex-col gap-4'>
                                {progress.carriage_panel_components.map((componentProgress) => (
                                    <div key={`${componentProgress.carriage_panel_component_id}`}>
                                        <div className='flex items-center justify-center space-x-2'>
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
                                            <ScrollArea className='flex w-1 flex-1'>
                                                <div className='mx-auto flex w-max space-x-4 p-4'>
                                                    <Dialog>
                                                        <div className='md:hidden'>
                                                            <DialogTrigger
                                                                className={buttonVariants()}
                                                            >
                                                                Lihat Detail Progress
                                                            </DialogTrigger>
                                                        </div>
                                                        <DialogContent className='flex h-screen w-[350px] flex-col md:w-[60%] md:flex-row'>
                                                            <DialogHeader>
                                                                <DialogTitle></DialogTitle>
                                                                <DialogDescription className='w-full'>
                                                                    <ScrollArea className='flex flex-1'>
                                                                        {componentProgress.steps.map(
                                                                            (step, index) => (
                                                                                <Fragment
                                                                                    key={`${componentProgress.carriage_panel_component_id} ${(step as unknown as StepResource).id}`}
                                                                                >
                                                                                    <Popover modal>
                                                                                        <PopoverTrigger className='w-full text-left'>
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
                                                                                    <div className='my-2 flex w-full justify-center'>
                                                                                        {index <
                                                                                            componentProgress
                                                                                                .steps
                                                                                                .length -
                                                                                                1 && (
                                                                                            <MoveDown
                                                                                                key={
                                                                                                    componentProgress
                                                                                                        .panel
                                                                                                        .name +
                                                                                                    (
                                                                                                        step as unknown as StepResource
                                                                                                    )
                                                                                                        .id +
                                                                                                    'sep'
                                                                                                }
                                                                                            />
                                                                                        )}
                                                                                    </div>
                                                                                </Fragment>
                                                                            ),
                                                                        )}
                                                                    </ScrollArea>
                                                                </DialogDescription>
                                                            </DialogHeader>
                                                        </DialogContent>
                                                    </Dialog>
                                                    <Breadcrumb>
                                                        <BreadcrumbList className='hidden md:flex'>
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
                            </div>
                            {index < componentProgress.length - 1 && (
                                <Separator className='my-4 h-1' />
                            )}
                        </div>
                    )))}
        </div>
    );
};

export default ProgressComponent;
