import {
    ChartContainer,
    ChartLegend,
    ChartLegendContent,
    ChartTooltip,
    ChartTooltipContent,
    type ChartConfig,
} from '@/Components/UI/chart';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { useLaravelReactI18n } from 'laravel-react-i18n';
import { Check, ChevronsUpDown } from 'lucide-react';
import { Bar, BarChart, CartesianGrid, Pie, PieChart, XAxis, YAxis } from 'recharts';
import { PageProps } from '../../Types';

import { Button } from '@/Components/UI/button';
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from '@/Components/UI/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/Components/UI/popover';
import { checkPermission } from '@/Helpers/permissionHelper';
import { cn } from '@/Lib/Utils';
import { trainsetService } from '@/Services/trainsetService';
import { IntentEnum } from '@/Support/Enums/intentEnum';
import { PERMISSION_ENUM } from '@/Support/Enums/permissionEnum';
import {
    TrainsetComponentProgressResource,
    TrainsetPanelProgressResource,
} from '@/Support/Interfaces/Others/TrainsetProgressResource';
import { withLoading } from '@/Utils/withLoading';
import { Separator } from '@radix-ui/react-select';
import { useLocalStorage } from '@uidotdev/usehooks';
import { useEffect, useState } from 'react';

export default function Dashboard({ auth, data }: PageProps) {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(data['project'][0]['name']);
    const [openTrainset, setOpenTrainset] = useState(false);
    const [valueTrainset, setValueTrainset] = useState(data['trainsets'][0]['ts_name']);
    const [sidebarCollapse, setSidebarCollapse] = useLocalStorage('sidebarCollapse');

    const label = ['fulfilled', 'required', 'failed'];

    const [trainsetComponentProgress, setTrainsetComponentProgress] = useState<
        TrainsetComponentProgressResource[]
    >([]);
    const [trainsetPanelProgress, setTrainsetPanelProgress] = useState<
        TrainsetPanelProgressResource[]
    >([]);

    const trainsetProgressConfig: ChartConfig = {
        total_plan_qty: {
            label: 'Plan',
            color: 'hsl(var(--chart-2))',
        },
        total_fulfilled_qty: {
            label: 'Done',
            color: 'hsl(var(--chart-1))',
        },
        total_progress_qty: {
            label: 'In Progress',
            color: 'hsl(var(--chart-3))',
        },
        diff: {
            label: 'To Be Fulfilled',
            color: 'hsl(var(--chart-2))',
        },
    };

    const toPercent = (decimal: number, fixed = 0) => {
        return `${(decimal * 100).toFixed(fixed)}%`;
    };
    const getPercent = (value: number, total: number) => {
        const ratio = total > 0 ? value / total : 0;
        return toPercent(ratio, 2);
    };
    const renderTrainsetProgressTooltipContent =
        (trainsetProgress: any) =>
        ({ payload, label }: any) => {
            const total =
                trainsetProgress.find(
                    (progress: any) =>
                        progress.component?.name === label || progress.panel?.name === label,
                )?.total_plan_qty || 0;
            let diff = 0;
            return (
                <div className='grid min-w-[8rem] items-start gap-1.5 rounded-lg border border-border/50 bg-background px-2.5 py-1.5 text-xs shadow-xl'>
                    <p className=''>{`${label} (Total Pesanan/Rencana: ${total})`}</p>
                    <ul className='list'>
                        {payload.map(
                            (entry: any, index: number) => (
                                entry.dataKey === 'diff' && (diff += entry.value),
                                entry.dataKey === 'total_progress_qty' && (diff += entry.value),
                                (
                                    <li
                                        key={`item-${index}`}
                                        className='flex items-center justify-between gap-1.5'
                                    >
                                        {entry.dataKey !== 'diff' &&
                                            entry.dataKey !== 'total_plan_qty' && (
                                                <>
                                                    <div className='flex items-center gap-1.5'>
                                                        <div
                                                            style={{
                                                                backgroundColor: entry.color,
                                                            }}
                                                            className='h-2 w-2 shrink-0 rounded-[2px]'
                                                        />
                                                        <span className='text-foreground'>
                                                            {
                                                                trainsetProgressConfig[
                                                                    entry.dataKey
                                                                ].label
                                                            }
                                                        </span>
                                                    </div>
                                                    <span className='text-foreground'>{`${entry.value} (${getPercent(entry.value, total)})`}</span>
                                                </>
                                            )}
                                    </li>
                                )
                            ),
                        )}
                    </ul>
                    <span className='text-foreground'>
                        Harus Diselesaikan: {diff} ({getPercent(diff, total)})
                    </span>
                </div>
            );
        };
    const renderTrainsetProgressLegendContent = (value: string, entry: any) => {
        return <span className='text-foreground'>{trainsetProgressConfig[value].label}</span>;
    };

    const chartConfig = {
        in_progress: {
            label: 'Progress',
            color: '#fd2c59',
        },
        done: {
            label: 'Done',
            color: '#00C3FF',
        },
    } satisfies ChartConfig;
    const panelChartConf = {
        total: {
            label: 'Total',
        },
        fulfilled: {
            label: 'Fulffilled',
            color: 'hsl(var(--chart-1))',
        },
        required: {
            label: 'Required',
            color: 'hsl(var(--chart-2))',
        },
        failed: {
            label: 'Failed',
            color: 'hsl(var(--chart-3))',
        },
    } satisfies ChartConfig;

    const chartConfigTrainsetCarriage = {
        qty: {
            label: 'Quantity',
            color: 'hsl(var(--chart-1))',
        },
    } satisfies ChartConfig;

    const chartConfigPanelInTrainset = {
        total: {
            label: 'Total',
            color: 'hsl(var(--chart-2))',
        },
    } satisfies ChartConfig;

    // @ts-ignore
    const totalUpdated = data['total'].map((item: any, index: number) => ({
        ...item,
        total: parseInt(item.total),
        fill: `var(--color-${label[index]})`,
    }));
    console.log(totalUpdated);
    console.log('makan');
    const { t } = useLaravelReactI18n();

    const loadTrainsetComponentProgress = withLoading(async () => {
        const progress = (await trainsetService.get(data['trainsetId'], {
            intent: IntentEnum.WEB_TRAINSET_GET_ALL_COMPONENTS_PROGRESS,
        })) as unknown as TrainsetComponentProgressResource[];
        setTrainsetComponentProgress(progress);
    });
    const loadTrainsetPanelProgress = withLoading(async () => {
        const progress = (await trainsetService.get(data['trainsetId'], {
            intent: IntentEnum.WEB_TRAINSET_GET_ALL_PANELS_PROGRESS,
        })) as unknown as TrainsetPanelProgressResource[];
        setTrainsetPanelProgress(progress);
    });

    useEffect(() => {
        loadTrainsetComponentProgress();
        loadTrainsetPanelProgress();
    }, []);

    return (
        <AuthenticatedLayout>
            <Head title={t('pages.dashboard.index.title')} />
            <div className='py-12'>
                {/* <p>{value}</p> */}
                <div
                    className={`${sidebarCollapse == true ? 'max-w-7xl' : 'max-w-5xl'} mx-auto sm:px-6 lg:px-5`}
                >
                    <div className='overflow-hidden bg-white shadow-sm dark:bg-transparent sm:rounded-lg'>
                        {/* <div className="p-6 text-gray-900 dark:text-gray-100">You're logged in bro !</div> */}
                        {checkPermission(PERMISSION_ENUM.DASHBOARD_TRAINSET_READ) && (
                            <>
                                <div className='px-4'>
                                    <h1 className='mt-2 text-3xl font-bold'>Dashboard</h1>
                                    <div className='flex w-full items-start justify-between'>
                                        <h2 className='my-2 text-xl'>
                                            {`${t('pages.dashboard.index.project')} ${data['trainsets'][0].pj_name} - ${data['trainsets'][0].ts_name}`}
                                            {/* {data['project'] == null ? 'Proyek 612 - TS 11' : `Proyek ${data['project']}`} */}
                                        </h2>
                                        <div className='mb-5 flex flex-col gap-4'>
                                            <Popover open={open} onOpenChange={setOpen}>
                                                <PopoverTrigger asChild>
                                                    <Button
                                                        variant='outline'
                                                        role='combobox'
                                                        className='w-20 justify-between md:w-40'
                                                        aria-expanded={open}
                                                    >
                                                        {value
                                                            ? data['projectList'].find(
                                                                  // @ts-ignore
                                                                  (projectItem: any) =>
                                                                      projectItem.name === value,
                                                              )?.name
                                                            : 'Pilih Proyek'}
                                                        <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
                                                    </Button>
                                                </PopoverTrigger>
                                                <PopoverContent className='w-[200px] p-0'>
                                                    <Command>
                                                        <CommandInput
                                                            placeholder={`${t('pages.dashboard.index.find_project')}`}
                                                        />
                                                        <CommandList>
                                                            <CommandEmpty>
                                                                {t(
                                                                    'pages.dashboard.index.project_not_found',
                                                                )}
                                                            </CommandEmpty>
                                                            <CommandGroup>
                                                                {
                                                                    // @ts-ignore
                                                                    data['projectList'].map(
                                                                        (projectItem: any) => (
                                                                            <Link
                                                                                key={projectItem.id}
                                                                                href={`/dashboard/${projectItem.id}`}
                                                                            >
                                                                                <CommandItem
                                                                                    value={
                                                                                        projectItem.name
                                                                                    }
                                                                                    onSelect={(
                                                                                        currentValue,
                                                                                    ) => {
                                                                                        setValue(
                                                                                            currentValue ===
                                                                                                projectItem.name
                                                                                                ? ''
                                                                                                : currentValue,
                                                                                        );
                                                                                        setOpen(
                                                                                            false,
                                                                                        );
                                                                                    }}
                                                                                    key={
                                                                                        projectItem.name
                                                                                    }
                                                                                >
                                                                                    <Check
                                                                                        className={cn(
                                                                                            'mr-2 h-4 w-4',
                                                                                            value ===
                                                                                                projectItem.name
                                                                                                ? 'opacity-100'
                                                                                                : 'opacity-0',
                                                                                        )}
                                                                                    />
                                                                                    {
                                                                                        projectItem.name
                                                                                    }
                                                                                </CommandItem>
                                                                            </Link>
                                                                        ),
                                                                    )
                                                                }
                                                            </CommandGroup>
                                                        </CommandList>
                                                    </Command>
                                                </PopoverContent>
                                            </Popover>
                                            <Popover
                                                open={openTrainset}
                                                onOpenChange={setOpenTrainset}
                                            >
                                                <PopoverTrigger asChild>
                                                    <Button
                                                        variant='outline'
                                                        role='combobox'
                                                        className='w-20 justify-between md:w-40'
                                                        aria-expanded={openTrainset}
                                                    >
                                                        {valueTrainset
                                                            ? data['tsList'].find(
                                                                  // @ts-ignore
                                                                  (projectItem: any) =>
                                                                      projectItem.name ===
                                                                      valueTrainset,
                                                              )?.name
                                                            : `${t('pages.dashboard.index.select_trainset')}`}
                                                        <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
                                                    </Button>
                                                </PopoverTrigger>
                                                <PopoverContent className='w-[200px] p-0'>
                                                    <Command>
                                                        <CommandInput
                                                            placeholder={`${t('pages.dashboard.index.find_trainset')}`}
                                                        />
                                                        <CommandList>
                                                            <CommandEmpty>
                                                                {t(
                                                                    'pages.dashboard.index.trainset_not_found',
                                                                )}
                                                            </CommandEmpty>
                                                            <CommandGroup>
                                                                {// @ts-ignore
                                                                data['tsList']?.map(
                                                                    (projectItem: any) => (
                                                                        <Link
                                                                            key={projectItem.id}
                                                                            href={`/dashboard/${projectItem.project_id}/${projectItem.id}`}
                                                                        >
                                                                            <CommandItem
                                                                                value={
                                                                                    projectItem.name
                                                                                }
                                                                                onSelect={(
                                                                                    currentValue,
                                                                                ) => {
                                                                                    setValueTrainset(
                                                                                        currentValue ===
                                                                                            valueTrainset
                                                                                            ? ''
                                                                                            : currentValue,
                                                                                    );
                                                                                    setOpenTrainset(
                                                                                        false,
                                                                                    );
                                                                                }}
                                                                                key={projectItem.id}
                                                                            >
                                                                                <Check
                                                                                    className={cn(
                                                                                        'mr-2 h-4 w-4',
                                                                                        valueTrainset ===
                                                                                            projectItem.name
                                                                                            ? 'opacity-100'
                                                                                            : 'opacity-0',
                                                                                    )}
                                                                                />
                                                                                {projectItem.name}
                                                                            </CommandItem>
                                                                        </Link>
                                                                    ),
                                                                )}
                                                            </CommandGroup>
                                                        </CommandList>
                                                    </Command>
                                                </PopoverContent>
                                            </Popover>
                                        </div>
                                    </div>
                                    <ChartContainer
                                        config={chartConfigTrainsetCarriage}
                                        className='h-[200px] w-full pr-10'
                                    >
                                        <BarChart data={data['carriages']} accessibilityLayer>
                                            <CartesianGrid vertical={false} />
                                            <XAxis
                                                tickMargin={10}
                                                tickLine={false}
                                                dataKey='type'
                                                axisLine={false}
                                            />
                                            <ChartTooltip content={<ChartTooltipContent />} />
                                            <ChartLegend content={<ChartLegendContent />} />
                                            <Bar radius={4} fill='var(--color-qty)' dataKey='qty' />
                                        </BarChart>
                                    </ChartContainer>
                                </div>
                                <div className='mt-2 grid w-full grid-cols-1 md:grid-cols-2'>
                                    <div className='px-4'>
                                        <h2 className='my-1 text-xl font-bold'>
                                            {t('pages.dashboard.index.panel_trainset')}
                                        </h2>
                                        <h3 className='text-base'>{`${t('pages.dashboard.index.panel_trainset_sub')} ${data['trainsets'][0].ts_name}`}</h3>
                                        <ChartContainer
                                            config={chartConfigPanelInTrainset}
                                            className='mt-5 h-[400px] w-full'
                                        >
                                            <BarChart
                                                data={data['panel']}
                                                className='h-[300px]'
                                                accessibilityLayer
                                            >
                                                <CartesianGrid vertical={false} />
                                                <XAxis
                                                    width={0}
                                                    textAnchor='end'
                                                    height={100}
                                                    dataKey='name'
                                                    axisLine={false}
                                                    // tick={<CustomizedAxisTick />}
                                                    angle={-55}
                                                />
                                                <ChartTooltip content={<ChartTooltipContent />} />
                                                <ChartLegend content={<ChartLegendContent />} />
                                                <Bar
                                                    radius={4}
                                                    fill='var(--color-total)'
                                                    dataKey='total'
                                                    className=''
                                                />
                                            </BarChart>
                                        </ChartContainer>
                                    </div>

                                    <div className='px-4'>
                                        <h2 className='my-1 text-xl font-bold'>
                                            {t('pages.dashboard.index.panel_progress_trainset')}
                                        </h2>
                                        <h3 className='text-base'>{`${t('pages.dashboard.index.panel_progress_trainset_sub')} ${data['trainsets'][0].ts_name}`}</h3>
                                        <div className='flex h-[400px] flex-col items-center'>
                                            <ChartContainer
                                                config={panelChartConf}
                                                className='min-h-[300px]'
                                            >
                                                <PieChart>
                                                    <ChartTooltip
                                                        cursor={false}
                                                        content={<ChartTooltipContent hideLabel />}
                                                    />
                                                    <Pie
                                                        nameKey='status'
                                                        innerRadius={60}
                                                        dataKey='total'
                                                        data={totalUpdated}
                                                    />
                                                </PieChart>
                                            </ChartContainer>
                                            <h4 className='text-center font-bold'>
                                                {data['total'][0].total == 0
                                                    ? 'Kebutuhan terpenuhi'
                                                    : `Kebutuhan panel sejumlah ${data['total'][0].total} masih belum terpenuhi`}
                                            </h4>
                                            <p className='text-sm'>
                                                Menunjukkan progress dari status kebutuhan panel.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}
                        <Separator className='my-5 h-1' />
                        {checkPermission(PERMISSION_ENUM.DASHBOARD_COMMISSION_READ) && (
                            <>
                                <div className='mt-2 flex w-full flex-col'>
                                    <h2 className='my-1 text-xl font-bold'>
                                        Komponen Dalam Trainset
                                    </h2>
                                    <h3 className='text-base'>{`Komponen yang ada pada ${data['trainsets'][0].ts_name}`}</h3>
                                    <ChartContainer
                                        config={trainsetProgressConfig}
                                        className='mt-5 h-[900px] w-full'
                                    >
                                        <BarChart
                                            stackOffset='expand'
                                            layout='vertical'
                                            data={trainsetComponentProgress}
                                            accessibilityLayer
                                        >
                                            <CartesianGrid vertical={false} />
                                            <XAxis
                                                type='number'
                                                tickFormatter={(value) =>
                                                    `${(value * 100).toFixed(0)}%`
                                                }
                                            />
                                            <YAxis
                                                width={150}
                                                type='category'
                                                tickMargin={10}
                                                tickLine={false}
                                                dataKey='component.name'
                                                className=''
                                                axisLine={false}
                                                // angle={-45}
                                            />
                                            <ChartTooltip
                                                content={renderTrainsetProgressTooltipContent(
                                                    trainsetComponentProgress,
                                                )}
                                            />
                                            <ChartLegend
                                                formatter={renderTrainsetProgressLegendContent}
                                            />
                                            <Bar
                                                type='monotone'
                                                stackId='2'
                                                radius={0}
                                                label={{
                                                    position: 'right',
                                                    formatter: (value: number) =>
                                                        `${(value * 100).toFixed(0)}%`,
                                                }}
                                                fill={`var(--color-total_fulfilled_qty)`}
                                                dataKey={'total_fulfilled_qty'}
                                            />
                                            <Bar
                                                type='monotone'
                                                stackId='2'
                                                radius={[0, 4, 4, 0]}
                                                label={{
                                                    position: 'right',
                                                    formatter: (value: number) =>
                                                        `${(value * 100).toFixed(0)}%`,
                                                }}
                                                fill={`var(--color-total_progress_qty)`}
                                                dataKey={'total_progress_qty'}
                                            />
                                            <Bar
                                                type='monotone'
                                                stackId='2'
                                                radius={4}
                                                legendType='none'
                                                fill={`var(--color-diff)`}
                                                dataKey={'diff'}
                                                className='hidden'
                                            />
                                        </BarChart>
                                    </ChartContainer>
                                </div>
                                <div className='mt-2 flex w-full flex-col'>
                                    <h2 className='my-1 text-xl font-bold'>Panel Dalam Trainset</h2>
                                    <h3 className='text-base'>{`Panel yang ada pada ${data['trainsets'][0].ts_name}`}</h3>
                                    <ChartContainer
                                        config={trainsetProgressConfig}
                                        className='mt-5 h-[500px] w-full'
                                    >
                                        <BarChart
                                            stackOffset='expand'
                                            layout='vertical'
                                            data={trainsetPanelProgress}
                                            accessibilityLayer
                                        >
                                            <CartesianGrid vertical={false} />
                                            <XAxis
                                                type='number'
                                                tickFormatter={(value) =>
                                                    `${(value * 100).toFixed(0)}%`
                                                }
                                            />
                                            <YAxis
                                                width={150}
                                                type='category'
                                                tickMargin={10}
                                                tickLine={false}
                                                dataKey='panel.name'
                                                className=''
                                                axisLine={false}
                                            />
                                            <ChartTooltip
                                                content={renderTrainsetProgressTooltipContent(
                                                    trainsetPanelProgress,
                                                )}
                                            />
                                            <ChartLegend
                                                formatter={renderTrainsetProgressLegendContent}
                                            />
                                            <Bar
                                                type='monotone'
                                                stackId='2'
                                                radius={0}
                                                label={{
                                                    position: 'right',
                                                    formatter: (value: number) =>
                                                        `${(value * 100).toFixed(0)}%`,
                                                }}
                                                fill={`var(--color-total_fulfilled_qty)`}
                                                dataKey={'total_fulfilled_qty'}
                                            />
                                            <Bar
                                                type='monotone'
                                                stackId='2'
                                                radius={[0, 4, 4, 0]}
                                                label={{
                                                    position: 'right',
                                                    formatter: (value: number) =>
                                                        `${(value * 100).toFixed(0)}%`,
                                                }}
                                                fill={`var(--color-total_progress_qty)`}
                                                dataKey={'total_progress_qty'}
                                            />
                                            <Bar
                                                type='monotone'
                                                stackId='2'
                                                radius={4}
                                                legendType='none'
                                                fill={`var(--color-diff)`}
                                                dataKey={'diff'}
                                                className='hidden'
                                            />
                                        </BarChart>
                                    </ChartContainer>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
