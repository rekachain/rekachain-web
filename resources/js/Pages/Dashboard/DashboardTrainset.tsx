// In one trainset, what are the Carriages and how many of them
// SELECT * FROM `carriage_trainset` inner join carriages on carriage_trainset.carriage_id = carriages.id where trainset_id = '1'
//

// In one trainset, what kind of panel that is in there
// SELECT trainsets.name, carriage_panels.panel_id, panels.name ,count(carriage_panels.panel_id) FROM `carriage_trainset` INNER JOIN carriage_panels on carriage_panels.carriage_trainset_id = carriage_trainset.id inner join trainsets on trainsets.id = carriage_trainset.trainset_id inner JOIN panels on carriage_panels.panel_id = panels.id where trainset_id = '1' GROUP by carriage_panels.panel_id ORDER BY `carriage_panels`.`panel_id` ASC

// In one trainset how is the panel condition
// SELECT trainsets.name, components.name, sum(trainset_attachment_components.total_required) as required, sum(trainset_attachment_components.total_fulfilled) as fulfilled, sum(trainset_attachment_components.total_failed) as failed FROM `trainset_attachment_components` inner JOIN carriage_panel_components on trainset_attachment_components.carriage_panel_component_id = carriage_panel_components.id inner join components on components.id = carriage_panel_components.component_id inner JOIN trainset_attachments on trainset_attachments.id = trainset_attachment_components.trainset_attachment_id inner join trainsets on trainsets.id = trainset_attachments.trainset_id where trainsets.id = 1 group by trainset_attachment_components.total_required, trainset_attachment_components.total_fulfilled,trainset_attachment_components.total_failed, components.name, trainsets.name, trainsets.name, components.name

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
import { Bar, BarChart, CartesianGrid, Pie, PieChart, XAxis } from 'recharts';
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
import { useEffect, useState } from 'react';
import { withLoading } from '@/Utils/withLoading';
import { trainsetService } from '@/Services/trainsetService';
import { IntentEnum } from '@/Support/Enums/intentEnum';
import { TrainsetComponentProgressResource, TrainsetPanelProgressResource } from '@/Support/Interfaces/Others/TrainsetProgressResource';
import { Separator } from '@/Components/UI/separator';

export default function Dashboard({ auth, data }: PageProps) {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(data['project'][0]['name']);
    const [openTrainset, setOpenTrainset] = useState(false);
    const [valueTrainset, setValueTrainset] = useState(data['trainsets'][0]['ts_name']);
    const [trainsetComponentProgress, setTrainsetComponentProgress] = useState<TrainsetComponentProgressResource[]>([]);
    const [trainsetPanelProgress, setTrainsetPanelProgress] = useState<TrainsetPanelProgressResource[]>([]);
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
        }
    };

    const toPercent = (decimal: number, fixed = 0) => {
        return `${(decimal * 100).toFixed(fixed)}%`;
    };
    const getPercent = (value: number, total: number) => {
        const ratio = total > 0 ? value / total : 0;
        return toPercent(ratio,2);
    };
    const renderTrainsetProgressTooltipContent = (trainsetProgress: any) => ({ payload, label}: any) => {
        const total = trainsetProgress.find((progress: any) => progress.component?.name === label || progress.panel?.name === label)?.total_plan_qty || 0;
        let diff = 0;
        return (
            <div className="grid min-w-[8rem] items-start gap-1.5 rounded-lg border border-border/50 bg-background px-2.5 py-1.5 text-xs shadow-xl">
                <p className="">{`${label} (Total Pesanan/Rencana: ${total})`}</p>
                <ul className="list">
                    {payload.map((entry: any, index: number) => (
                        entry.dataKey === 'diff' && (diff += entry.value),
                        entry.dataKey === 'total_progress_qty' && (diff += entry.value),
                        <li key={`item-${index}`} className="flex items-center gap-1.5 justify-between">
                            {entry.dataKey !== 'diff' && entry.dataKey !== 'total_plan_qty' && <>
                                <div className="flex items-center gap-1.5">
                                        <div
                                            style={{
                                                backgroundColor: entry.color,
                                            }}
                                            className="h-2 w-2 shrink-0 rounded-[2px]"
                                        />
                                    <span className="text-foreground">
                                        {trainsetProgressConfig[entry.dataKey].label}
                                    </span>
                                </div>
                                <span className="text-foreground">{`${entry.value} (${getPercent(entry.value, total)})`}</span>
                            </>}
                        </li>
                    ))}
                </ul>
                <span className="text-foreground">Harus Diselesaikan: {diff} ({getPercent(diff, total)})</span>
            </div>
        );
    };
    const renderTrainsetProgressLegendContent = (value: string, entry: any) => {
        return (
            <span className="text-foreground">{trainsetProgressConfig[value].label}</span>
        );
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
        chrome: {
            label: 'required',
            color: 'hsl(var(--chart-1))',
        },
        safari: {
            label: 'fulfilled',
            color: 'hsl(var(--chart-2))',
        },
        firefox: {
            label: 'failed',
            color: 'hsl(var(--chart-3))',
        },
    } satisfies ChartConfig;

    const { t } = useLaravelReactI18n();

    const loadTrainsetComponentProgress = withLoading(async () => {
        const progress = await trainsetService.get(data['trainsetId'], {
            intent: IntentEnum.WEB_TRAINSET_GET_ALL_COMPONENTS_PROGRESS,
        }) as unknown as TrainsetComponentProgressResource[];
        setTrainsetComponentProgress(progress);
    });
    const loadTrainsetPanelProgress = withLoading(async () => {
        const progress = await trainsetService.get(data['trainsetId'], {
            intent: IntentEnum.WEB_TRAINSET_GET_ALL_PANELS_PROGRESS,
        }) as unknown as TrainsetPanelProgressResource[];
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
                <div className='mx-auto max-w-7xl sm:px-6 lg:px-5'>
                    <div className='overflow-hidden bg-white shadow-sm dark:bg-transparent sm:rounded-lg'>
                        {/* <div className="p-6 text-gray-900 dark:text-gray-100">You're logged in bro !</div> */}
                        <div className=''>
                            <h1 className='mt-2 text-3xl font-bold'>Dashboard</h1>
                            <div className='flex w-full items-start justify-between'>
                                <h2 className='my-2 text-xl'>
                                    {`Proyek ${data['trainsets'][0].pj_name} - ${data['trainsets'][0].ts_name}`}
                                    {/* {data['project'] == null ? 'Proyek 612 - TS 11' : `Proyek ${data['project']}`} */}
                                </h2>
                                <div className='mb-5 flex flex-col gap-4'>
                                    <Popover open={open} onOpenChange={setOpen}>
                                        <PopoverTrigger asChild>
                                            <Button
                                                variant='outline'
                                                role='combobox'
                                                className='w-40 justify-between'
                                                aria-expanded={open}
                                            >
                                                {value
                                                    ? data['projectList'].find(
                                                          // @ts-ignore
                                                          (projectItem) =>
                                                              projectItem.name === value,
                                                      )?.name
                                                    : 'Pilih Proyek'}
                                                <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className='w-[200px] p-0'>
                                            <Command>
                                                <CommandInput placeholder='Cari Projek...' />
                                                <CommandList>
                                                    <CommandEmpty>
                                                        Projek tidak ditemukan.
                                                    </CommandEmpty>
                                                    <CommandGroup>
                                                        {
                                                            // @ts-ignore
                                                            data['projectList'].map(projectItem => (
                                                                <Link href={`/dashboard/${projectItem.id}`} key={projectItem.id}>
                                                                    <CommandItem
                                                                        value={projectItem.name}
                                                                        onSelect={currentValue => {
                                                                            setValue(
                                                                                currentValue === projectItem.name
                                                                                    ? ''
                                                                                    : currentValue,
                                                                            );
                                                                            setOpen(false);
                                                                        }}
                                                                        key={projectItem.name}
                                                                    >
                                                                        <Check
                                                                            className={cn(
                                                                                'mr-2 h-4 w-4',
                                                                                value === projectItem.name
                                                                                    ? 'opacity-100'
                                                                                    : 'opacity-0',
                                                                            )}
                                                                        />
                                                                        {projectItem.name}
                                                                    </CommandItem>
                                                                </Link>
                                                            ))
                                                        }
                                                    </CommandGroup>
                                                </CommandList>
                                            </Command>
                                        </PopoverContent>
                                    </Popover>
                                    <Popover open={openTrainset} onOpenChange={setOpenTrainset}>
                                        <PopoverTrigger asChild>
                                            <Button
                                                variant='outline'
                                                role='combobox'
                                                className='w-40 justify-between'
                                                aria-expanded={openTrainset}
                                            >
                                                {valueTrainset
                                                    ? data['tsList'].find(
                                                          // @ts-ignore
                                                          (projectItem) =>
                                                              projectItem.name === valueTrainset,
                                                      )?.name
                                                    : 'Pilih Trainset'}
                                                <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className='w-[200px] p-0'>
                                            <Command>
                                                <CommandInput placeholder='Cari Trainset...' />
                                                <CommandList>
                                                    <CommandEmpty>
                                                        Trainset tidak ditemukan.
                                                    </CommandEmpty>
                                                    <CommandGroup>
                                                        {// @ts-ignore
                                                        data['tsList']?.map((projectItem) => (
                                                            <Link
                                                                href={`/dashboard/${projectItem.project_id}/${projectItem.id}`}
                                                                key={projectItem.id}
                                                            >
                                                                <CommandItem
                                                                    value={projectItem.name}
                                                                    onSelect={(currentValue) => {
                                                                        setValueTrainset(
                                                                            currentValue ===
                                                                                valueTrainset
                                                                                ? ''
                                                                                : currentValue,
                                                                        );
                                                                        setOpenTrainset(false);
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
                                                        ))}
                                                    </CommandGroup>
                                                </CommandList>
                                            </Command>
                                        </PopoverContent>
                                    </Popover>
                                </div>
                            </div>
                            <ChartContainer config={chartConfig} className='h-[200px] w-full pr-10'>
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
                                    <Bar radius={4} fill='var(--color-done)' dataKey='qty' />
                                </BarChart>
                            </ChartContainer>
                        </div>
                        <div className='mt-2 grid w-full grid-cols-1 md:grid-cols-2'>
                            <div className=''>
                                <h2 className='my-1 text-xl font-bold'>Panel Dalam Trainset</h2>
                                <h3 className='text-base'>{`Panel yang ada pada ${data['trainsets'][0].ts_name}`}</h3>
                                <ChartContainer
                                    config={chartConfig}
                                    className='mt-5 h-[400px] w-full'
                                >
                                    <BarChart data={data['panel']} className='' accessibilityLayer>
                                        <CartesianGrid vertical={false} />
                                        <XAxis
                                            tickMargin={0}
                                            tickLine={false}
                                            textAnchor='end'
                                            dataKey='name'
                                            axisLine={false}
                                            // tick={<CustomizedAxisTick />}
                                            angle={-45}
                                        />
                                        <ChartTooltip content={<ChartTooltipContent />} />
                                        <ChartLegend content={<ChartLegendContent />} />
                                        <Bar
                                            radius={4}
                                            fill='var(--color-done)'
                                            dataKey='total'
                                            className=''
                                        />
                                    </BarChart>
                                </ChartContainer>
                            </div>

                            <div className=''>
                                <h2 className='my-1 text-xl font-bold'>Progress Tiap Panel</h2>
                                <h3 className='text-base'>Panel panel pada WS Assembly</h3>
                                <ChartContainer
                                    config={panelChartConf}
                                    className='mx-auto aspect-square max-h-[250px]'
                                >
                                    <PieChart>
                                        <ChartTooltip
                                            cursor={false}
                                            content={<ChartTooltipContent hideLabel />}
                                        />
                                        <Pie
                                            nameKey='status'
                                            innerRadius={60}
                                            dataKey=''
                                            data={data['total']}
                                        />
                                    </PieChart>
                                </ChartContainer>
                            </div>
                        </div>
                        <Separator className='my-5 h-1'/>
                        <h3>For Buyer</h3>
                        <div className="flex flex-col w-full mt-2 ">
                            <h2 className="text-xl my-1 font-bold">Komponen Dalam Trainset</h2>
                            <h3 className="text-base">{`Komponen yang ada pada ${data['trainsets'][0].ts_name}`}</h3>
                            <ChartContainer config={trainsetProgressConfig} className="h-[900px] w-full mt-5">
                                <BarChart 
                                    data={trainsetComponentProgress} 
                                    stackOffset='expand'
                                    layout="vertical"
                                    accessibilityLayer
                                >
                                    <CartesianGrid vertical={false} />
                                    <XAxis
                                        type="number" 
                                        tickFormatter={value => `${(value * 100).toFixed(0)}%`}
                                    />
                                    <YAxis
                                        width={150}
                                        type="category"
                                        tickMargin={10}
                                        tickLine={false}
                                        dataKey="component.name"
                                        className=""
                                        axisLine={false}
                                    />
                                    <ChartTooltip content={renderTrainsetProgressTooltipContent(trainsetComponentProgress)} />
                                    <ChartLegend formatter={renderTrainsetProgressLegendContent} />
                                    <Bar type='monotone'
                                        stackId="2" radius={0} fill={`var(--color-total_fulfilled_qty)`} dataKey={'total_fulfilled_qty'} label={{ position: 'right', formatter: (value: number) => `${(value * 100).toFixed(0)}%` }} />
                                    <Bar type='monotone'
                                        stackId="2" radius={[0,4,4,0]} fill={`var(--color-total_progress_qty)`} dataKey={'total_progress_qty'} label={{ position: 'right', formatter: (value: number) => `${(value * 100).toFixed(0)}%` }} />
                                    <Bar type='monotone'
                                        stackId="2" radius={4} fill={`var(--color-diff)`} className='hidden' dataKey={'diff'} legendType='none' />
                                </BarChart>
                            </ChartContainer>
                        </div>
                        <div className="flex flex-col w-full mt-2 ">
                            <h2 className="text-xl my-1 font-bold">Panel Dalam Trainset</h2>
                            <h3 className="text-base">{`Panel yang ada pada ${data['trainsets'][0].ts_name}`}</h3>
                            <ChartContainer config={trainsetProgressConfig} className="h-[500px] w-full mt-5">
                                <BarChart 
                                    data={trainsetPanelProgress} 
                                    stackOffset='expand'
                                    layout="vertical"
                                    accessibilityLayer
                                >
                                    <CartesianGrid vertical={false} />
                                    <XAxis
                                        type="number" 
                                        tickFormatter={value => `${(value * 100).toFixed(0)}%`}
                                    />
                                    <YAxis
                                        width={150}
                                        type="category"
                                        tickMargin={10}
                                        tickLine={false}
                                        dataKey="panel.name"
                                        className=""
                                        axisLine={false}
                                    />
                                    <ChartTooltip content={renderTrainsetProgressTooltipContent(trainsetPanelProgress)} />
                                    <ChartLegend formatter={renderTrainsetProgressLegendContent} />
                                    <Bar type='monotone'
                                        stackId="2" radius={0} fill={`var(--color-total_fulfilled_qty)`} dataKey={'total_fulfilled_qty'} label={{ position: 'right', formatter: (value: number) => `${(value * 100).toFixed(0)}%` }} />
                                    <Bar type='monotone'
                                        stackId="2" radius={[0,4,4,0]} fill={`var(--color-total_progress_qty)`} dataKey={'total_progress_qty'} label={{ position: 'right', formatter: (value: number) => `${(value * 100).toFixed(0)}%` }} />
                                    <Bar type='monotone'
                                        stackId="2" radius={4} fill={`var(--color-diff)`} className='hidden' dataKey={'diff'} legendType='none' />
                                </BarChart>
                            </ChartContainer>
                        </div>
                        {/* <h1 className="text-2xl">Trainset Attachment chart</h1>

                        <p>use the updated at and status</p>
                        <p>can be differentiate between Electric and Mechanic</p>
                        <p>X Axis use date. 30 day before </p>
                        <ChartContainer config={chartConfig}>
                            <LineChart
                                accessibilityLayer
                                data={chartDataLine}
                                margin={{
                                    left: 12,
                                    right: 12,
                                }}
                            >
                                <CartesianGrid vertical={false} />
                                <XAxis
                                    dataKey="tanggal"
                                    tickLine={false}
                                    axisLine={false}
                                    tickMargin={8}
                                    tickFormatter={value => value.slice(0, 3)}
                                />
                                <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                                <Line
                                    dataKey="inProgress"
                                    type="monotone"
                                    stroke="var(--color-desktop)"
                                    strokeWidth={2}
                                    dot={false}
                                />
                                <Line
                                    dataKey="Done"
                                    type="monotone"
                                    stroke="var(--color-mobile)"
                                    strokeWidth={2}
                                    dot={false}
                                />
                            </LineChart>
                        </ChartContainer>
                        <ChartContainer
                            config={chartConfigPie}
                            className="mx-auto aspect-square max-h-[250px] [&_.recharts-text]:fill-background"
                        >
                            <PieChart>
                                <ChartTooltip content={<ChartTooltipContent nameKey="visitors" hideLabel />} />
                                <Pie data={chartDataPie} dataKey="visitors">
                                    <LabelList
                                        dataKey="browser"
                                        className="fill-background"
                                        stroke="none"
                                        fontSize={12}
                                        formatter={(value: keyof typeof chartConfigPie) => chartConfigPie[value]?.label}
                                    />
                                </Pie>
                            </PieChart>
                        </ChartContainer> */}
                        {/* <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                            <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                                <div className="p-6 text-gray-900 dark:text-gray-100">
                                    {t('pages.dashboard.index.welcome')}
                                </div>
                            </div>
                        </div> */}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
