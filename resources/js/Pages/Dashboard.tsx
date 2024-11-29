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
import { Check, ChevronsUpDown } from 'lucide-react';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import { PageProps } from '../Types';
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/Components/UI/card';

// import { PageProps } from '@/Types';
import { useLaravelReactI18n } from 'laravel-react-i18n';

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
import { cn } from '@/Lib/Utils';
// import { useState } from 'react';

const project = [
    {
        value: 'Semua Proyek',
        label: 'Semua Proyek',
        link: '/dashboard',
    },
    {
        value: '612',
        label: '612',
        link: '/dashboard/1',
    },
    {
        value: 'KRL KCI',
        label: 'KRL KCI',
        link: '/dashboard/2',
    },
];
const trainset = [
    {
        value: 'TS 11',
        link: '/dashboard/1/1',
    },
    {
        value: 'TS 12',
        link: '/dashboard/1/2',
    },
    {
        value: 'TS 13',

        link: '/dashboard/1/3',
    },
];
// TODO : TS only available when project
// TODO : show ts for each project

import { trainsetService } from '@/Services/trainsetService';
import { ROUTES } from '@/Support/Constants/routes';
import { useCallback, useEffect, useState } from 'react';
interface AttachmentStatusOfTrainsetResource {
    trainset_name: string;
    progress: { status: string; count: number }[];
}
interface AttachmentStatusOfWorkstationResource {
    workstation_name: string;
    progress: { status: string; count: number }[];
}
interface AttachmentStatusBarGraph {
    data?: AttachmentStatusOfTrainsetResource[];
    config: ChartConfig;
}
export default function Dashboard({ auth, data }: PageProps) {
    const [open, setOpen] = useState(false);
    const [openTrainset, setOpenTrainset] = useState(false);
    // const [value, setValue] = useState('');
    const [value, setValue] = useState(data['project'] !== null ? data['project'] : '');
    const [valueTrainset, setValueTrainset] = useState('');

    console.log(data);

    const [attachmentStatusConfig, setAttachmentStatusConfig] = useState<ChartConfig>({
        done: {
            label: 'Done',
            color: 'hsl(var(--chart-1))',
        },
        in_progress: {
            label: 'Progress',
            color: 'hsl(var(--chart-2))',
        },
        pending: {
            label: 'Pending',
            color: 'hsl(var(--chart-3))',
        },
        material_in_transit: {
            label: 'Material In Transit',
            color: 'hsl(var(--chart-4))',
        },
        material_accepted: {
            label: 'Material Accepted',
            color: 'hsl(var(--chart-5))',
        },
    });
    const chartConfigTrainset = {
        done: {
            label: 'Done',
            color: 'hsl(var(--chart-1))',
        },
        in_progress: {
            label: 'In Progress',
            color: 'hsl(var(--chart-2))',
        },
    } satisfies ChartConfig;

    const [useMerged, setUseMerged] = useState(true);
    const [useRaw, setUseRaw] = useState(false);
    const [attachmentStatusOfTrainsetGraph, setAttachmentStatusOfTrainsetGraph] =
        useState<AttachmentStatusBarGraph>({
            // data: useRaw
            //     ? data.attachment_status_of_trainset
            //     : data.attachment_status_of_trainset.map(
            //         ({ trainset_name, progress }: AttachmentStatusOfTrainsetResource) => ({
            //             trainset_name,
            //             ...progress.reduce((acc, { status, count }) => ({ ...acc, [status]: count }), {}),
            //         }),
            //     ),
            config: Object.fromEntries(
                Object.entries(attachmentStatusConfig).filter(([key]) =>
                    useMerged ? !['material_in_transit', 'material_accepted'].includes(key) : true,
                ),
            ),
        });
    const [attachmentStatusOfWorkstationGraph, setAttachmentStatusOfWorkstationGraph] =
        useState<AttachmentStatusBarGraph>({
            // data: data.attachment_status_of_workstation.map(
            //         ({ workstation_name, progress }: AttachmentStatusOfWorkstationResource) => ({
            //             workstation_name,
            //             ...progress.reduce((acc, { status, count }) => ({ ...acc, [status]: count }), {}),
            //         }),
            //     ),
            config: Object.fromEntries(
                Object.entries(attachmentStatusConfig).filter(([key]) =>
                    useMerged ? !['material_in_transit', 'material_accepted'].includes(key) : true,
                ),
            ),
        });
    const [trainsetFilters, setTrainsetFilters] = useState<{ id: any } | null>({ id: {} });
    const [attachmentStatusOfTrainsetFilter, setAttachmentStatusOfTrainsetFilter] = useState({});
    const [attachmentStatusOfWorkstationFilter, setAttachmentStatusOfWorkstationFilter] = useState(
        {},
    );
    const [maxWorkstationStatusValue, setMaxWorkstationStatusValue] = useState(10);

    useEffect(() => {
        console.log('useMerged', useMerged, 'useRaw', useRaw);
        syncAttachmentStatusData();
    }, [useMerged, useRaw]);

    useEffect(() => {
        setAttachmentStatusOfTrainsetFilter({ column_filters: { id: trainsetFilters?.id } });
        setAttachmentStatusOfWorkstationFilter({
            relation_column_filters: { trainset: { id: trainsetFilters?.id } },
        });
    }, [trainsetFilters]);
    useEffect(() => {
        syncAttachmentStatusData();
    }, [attachmentStatusOfTrainsetFilter, attachmentStatusOfWorkstationFilter]);
    useEffect(() => {
        let max = 0;
        attachmentStatusOfWorkstationGraph.data?.forEach((trainset) => {
            Object.values(trainset).forEach((count) => {
                if (count > max) max = count + 1;
            });
        });
        setMaxWorkstationStatusValue(max);
    }, [attachmentStatusOfWorkstationGraph]);

    const syncAttachmentStatusData = async () => {
        const res = await window.axios.get(
            route(`${ROUTES.DASHBOARD}`, {
                use_merged: useMerged,
                use_raw: useRaw,
                attachment_status_of_trainset_filter: attachmentStatusOfTrainsetFilter,
                attachment_status_of_workstation_filter: attachmentStatusOfWorkstationFilter,
            }),
        );
        console.log('res', res.data);
        setAttachmentStatusOfTrainsetGraph({
            data: useRaw
                ? res.data.attachment_status_of_trainset
                : res.data.attachment_status_of_trainset.map(
                      ({ trainset_name, progress }: AttachmentStatusOfTrainsetResource) => ({
                          trainset_name,
                          ...progress.reduce(
                              (acc, { status, count }) => ({ ...acc, [status]: count }),
                              {},
                          ),
                      }),
                  ),
            config: Object.fromEntries(
                Object.entries(attachmentStatusConfig).filter(([key]) =>
                    useMerged ? !['material_in_transit', 'material_accepted'].includes(key) : true,
                ),
            ),
        });
        setAttachmentStatusOfWorkstationGraph({
            data: useRaw
                ? res.data.attachment_status_of_workstation
                : res.data.attachment_status_of_workstation.map(
                      ({ workstation_name, progress }: AttachmentStatusOfWorkstationResource) => ({
                          workstation_name,
                          ...progress.reduce(
                              (acc, { status, count }) => ({ ...acc, [status]: count }),
                              {},
                          ),
                      }),
                  ),
            config: Object.fromEntries(
                Object.entries(attachmentStatusConfig).filter(([key]) =>
                    useMerged ? !['material_in_transit', 'material_accepted'].includes(key) : true,
                ),
            ),
        });
    };

    const toPercent = (decimal: number, fixed = 0) => {
        return `${(decimal * 100).toFixed(fixed)}%`;
    };
    const getPercent = (value: number, total: number) => {
        const ratio = total > 0 ? value / total : 0;
        return toPercent(ratio, 2);
    };

    const renderWorkstationProgressTooltipContent = ({ payload, label }: any) => {
        const total = payload.reduce((result: number, entry: any) => result + entry.value, 0);
        return (
            <div className='grid min-w-[8rem] items-start gap-1.5 rounded-lg border border-border/50 bg-background px-2.5 py-1.5 text-xs shadow-xl'>
                <p className=''>{`${label} (Total: ${total})`}</p>
                <ul className='list'>
                    {payload.map((entry: any, index: number) => (
                        <li
                            key={`item-${index}`}
                            className='flex items-center justify-between gap-1.5'
                        >
                            <div className='flex items-center gap-1.5'>
                                <div
                                    style={{
                                        backgroundColor: entry.color,
                                    }}
                                    className='h-2 w-2 shrink-0 rounded-[2px]'
                                />
                                <span className='text-foreground'>
                                    {attachmentStatusConfig[entry.dataKey].label}
                                </span>
                            </div>
                            <span className='text-foreground'>{`${entry.value} (${getPercent(entry.value, total)})`}</span>
                        </li>
                    ))}
                </ul>
            </div>
        );
    };

    const fetchTrainsetFilters = useCallback(async () => {
        return await trainsetService
            .getAll({
                filter: {},
                perPage: 100,
                column_filters: { project_id: 1 }, // TODO: use project filter
            })
            .then((response) => response.data);
    }, []);

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
    // from panel_attachment get status
    // from carriage panel get carriage_trainset_id
    // from trainset get trainset id
    console.log(data['ts']);
    //  TS
    // this is correct
    // SELECT SUM(case when panel_attachments.status = "done" then 1 else 0 end) as done, SUM(case when panel_attachments.status = "in_progress" then 1 else 0 end) as in_progress, trainsets.name FROM `panel_attachments` INNER JOIN `carriage_panels` ON `panel_attachments`.carriage_panel_id = `carriage_panels`.id INNER JOIN `carriage_trainset` ON `carriage_panels`.carriage_trainset_id = `carriage_trainset`.id INNER JOIN `trainsets` ON `carriage_trainset`.trainset_id = `trainsets`.id  GROUP BY trainsets.name;

    // new with project ID
    // SELECT trainsets.name, projects.name,  SUM(case when panel_attachments.status = "done" then 1 else 0 end) as done, SUM(case when panel_attachments.status = "in_progress" then 1 else 0 end) as in_progress, workshops.name FROM `panel_attachments` inner join workstations on source_workstation_id = workstations.id inner join workshops on workstations.workshop_id = workshops.id  INNER JOIN `carriage_panels` ON `panel_attachments`.carriage_panel_id = `carriage_panels`.id INNER JOIN `carriage_trainset` ON `carriage_panels`.carriage_trainset_id = `carriage_trainset`.id INNER JOIN `trainsets` ON `carriage_trainset`.trainset_id = `trainsets`.id inner join projects on trainsets.project_id = projects.id where workshops.id <3 GROUP by workshops.name, projects.name,trainsets.name;

    // SELECT count(panel_attachments.status), trainsets.name FROM `panel_attachments` INNER JOIN `carriage_panels` ON `panel_attachments`.carriage_panel_id = `carriage_panels`.id INNER JOIN `carriage_trainset` ON `carriage_panels`.carriage_trainset_id = `carriage_trainset`.id INNER JOIN `trainsets` ON `carriage_trainset`.trainset_id = `trainsets`.id where panel_attachments.status = "done" GROUP BY trainsets.name;

    // SELECT panel_attachments.status, count(panel_attachments.status), trainsets.name FROM `panel_attachments` INNER JOIN `carriage_panels` ON `panel_attachments`.carriage_panel_id = `carriage_panels`.id INNER JOIN `carriage_trainset` ON `carriage_panels`.carriage_trainset_id = `carriage_trainset`.id INNER JOIN `trainsets` ON `carriage_trainset`.trainset_id = `trainsets`.id GROUP BY trainsets.name, panel_attachments.status;

    const chartDataWS = [
        { ts: 'WS Candisewu Lt1', progress: 186, done: 80 },
        { ts: 'WS Candisewu Lt2', progress: 86, done: 80 },
        { ts: 'WS Candisewu Lt3', progress: 20, done: 50 },
        { ts: 'WS Sukosari', progress: 36, done: 50 },
        { ts: 'WS Harmonika', progress: 45, done: 70 },
    ];

    // this is correct
    // SELECT  SUM(case when panel_attachments.status = "done" then 1 else 0 end) as done, SUM(case when panel_attachments.status = "in_progress" then 1 else 0 end) as in_progress, workshops.name FROM `panel_attachments` inner join workstations on source_workstation_id = workstations.id inner join workshops on workstations.workshop_id = workshops.id where workshops.id <3 GROUP by workshops.name;

    // Correct with project 612
    //SELECT projects.name,  SUM(case when panel_attachments.status = "done" then 1 else 0 end) as done, SUM(case when panel_attachments.status = "in_progress" then 1 else 0 end) as in_progress, workshops.name FROM `panel_attachments` inner join workstations on source_workstation_id = workstations.id inner join workshops on workstations.workshop_id = workshops.id INNER JOIN `carriage_panels` ON `panel_attachments`.carriage_panel_id = `carriage_panels`.id INNER JOIN `carriage_trainset` ON `carriage_panels`.carriage_trainset_id = `carriage_trainset`.id INNER JOIN `trainsets` ON `carriage_trainset`.trainset_id = `trainsets`.id inner join projects on trainsets.project_id = projects.id where workshops.id <3 GROUP by workshops.name, projects.name

    // INNER JOIN `carriage_panels` ON `panel_attachments`.carriage_panel_id = `carriage_panels`.id INNER JOIN `carriage_trainset` ON `carriage_panels`.carriage_trainset_id = `carriage_trainset`.id INNER JOIN `trainsets` ON `carriage_trainset`.trainset_id = `trainsets`.id inner join projects on trainsets.project_id = projects.id

    // panel attachment source workstation in progress and done
    // workstation id
    // SELECT * FROM `panel_attachments` inner join workstations on source_workstation_id = workstations.id;
    // SELECT count(panel_attachments.status) workstations.name FROM `panel_attachments` inner join workstations on source_workstation_id = workstations.id where status = "done" GROUP by workstations.name;
    // for above need change in workstation and workshop.

    const chartDataPanel = [
        { panel: 'Panel PIDS A', progress: 186, done: 80 },
        { panel: 'Panel PIDS B', progress: 86, done: 30 },
        { panel: 'Panel PIDS C', progress: 16, done: 80 },
        { panel: 'Panel PIDS D', progress: 18, done: 90 },
    ];

    // Correct with project name
    // SELECT projects.name, SUM(case when panel_attachments.status = "done" then 1 else 0 end) as done, SUM(case when panel_attachments.status = "in_progress" then 1 else 0 end) as in_progress, panels.name FROM `panel_attachments` INNER JOIN `carriage_panels` ON `panel_attachments`.carriage_panel_id = `carriage_panels`.id INNER JOIN panels on carriage_panels.panel_id = panels.id INNER JOIN `carriage_trainset` ON `carriage_panels`.carriage_trainset_id = `carriage_trainset`.id INNER JOIN `trainsets` ON `carriage_trainset`.trainset_id = `trainsets`.id inner join projects on trainsets.project_id = projects.id GROUP by panels.name,projects.name, panel_attachments.status ORDER BY `panels`.`name` ASC

    // SELECT count(panel_attachments.status), panel_attachments.status, panels.name FROM `panel_attachments` INNER JOIN `carriage_panels` ON `panel_attachments`.carriage_panel_id = `carriage_panels`.id INNER JOIN panels on carriage_panels.panel_id = panels.id GROUP by panels.name, panel_attachments.status;

    //     With seperated done and in progress
    // SELECT SUM(case when panel_attachments.status = "done" then 1 else 0 end) as done, SUM(case when panel_attachments.status = "in_progress" then 1 else 0 end) as in_progress, panels.name FROM `panel_attachments` INNER JOIN `carriage_panels` ON `panel_attachments`.carriage_panel_id = `carriage_panels`.id INNER JOIN panels on carriage_panels.panel_id = panels.id GROUP by panels.name, panel_attachments.status ORDER BY `panels`.`name` ASC

    // export default function Dashboard({ auth }: PageProps) {
    const { t } = useLaravelReactI18n();
    return (
        <AuthenticatedLayout>
            <Head title={t('pages.dashboard.index.title')} />

            {/* <div className="py-12"> */}
            {/* <p>{value}</p> */}
            <div className='mx-auto max-w-7xl sm:px-6 lg:px-5'>
                <div className='overflow-hidden bg-white shadow-sm dark:bg-transparent sm:rounded-lg'>
                    {/* <div className="p-6 text-gray-900 dark:text-gray-100">You're logged in bro !</div> */}
                    <div className=''>
                        <h1 className='mt-2 text-3xl font-bold'>Dashboard</h1>
                        <div className='flex w-full items-center justify-between'>
                            <h2 className='my-2 text-xl'>
                                {data['project'] == null
                                    ? 'Semua Proyek'
                                    : `Proyek ${data['project']}`}
                            </h2>
                            <Popover open={open} onOpenChange={setOpen}>
                                <PopoverTrigger className=' ' asChild>
                                    <Button
                                        variant='outline'
                                        role='combobox'
                                        className='w-40 justify-between'
                                        aria-expanded={open}
                                    >
                                        {value
                                            ? project.find(
                                                  (projectItem) => projectItem.value === value,
                                              )?.label
                                            : 'Pilih Proyek'}
                                        <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className='w-[200px] p-0'>
                                    <Command>
                                        <CommandInput placeholder='Cari Projek...' />
                                        <CommandList>
                                            <CommandEmpty>Projek tidak ditemukan.</CommandEmpty>
                                            <CommandGroup>
                                                {
                                                    // @ts-ignore
                                                    data['projectDetail'].map((projectItem) => (
                                                        <Link href={`/dashboard/${projectItem.id}`}>
                                                            <CommandItem
                                                                value={`/dashboard/${projectItem.name}`}
                                                                onSelect={(currentValue) => {
                                                                    setValue(
                                                                        currentValue === value
                                                                            ? ''
                                                                            : currentValue,
                                                                    );
                                                                    setOpen(false);
                                                                }}
                                                                key={projectItem.value}
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
                        </div>

                        {/* <ChartContainer config={chartConfig} className="h-[200px] w-full pr-10">
                                <BarChart accessibilityLayer data={data['ts']}> */}
                        {/* <h2 className="text-xl my-2">Proyek 612</h2> */}
                        {/* <div className="flex items-center px-1 gap-3 text-xs ">
                            <Checkbox
                                id="useMerged"
                                onChange={e => setUseMerged(e.target.checked)}
                                checked={useMerged}
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-5 ">
                    <div className="bg-white dark:bg-transparent overflow-hidden shadow-sm sm:rounded-lg ">
                        {/* <div className="p-6 text-gray-900 dark:text-gray-100">You're logged in bro !</div> */}
                        {/* <div className="">
                            <h1 className="text-3xl font-bold mt-2">Dashboard</h1>
                            <h2 className="text-xl my-2">Proyek 612</h2>
                            <div className="flex items-center px-1 gap-3">
                                <Checkbox
                                    id="useMerged"
                                    onChange={e => setUseMerged(e.target.checked)}
                                    checked={useMerged}
                                />
                                <InputLabel htmlFor="useMerged" value="Use Merged Status" />
                                <Checkbox id="useRaw" onChange={e => setUseRaw(e.target.checked)} checked={useRaw} />
                                <InputLabel htmlFor="useRaw" value="Use Raw SQL (for development)" />
                            </div>
                            <GenericDataSelector
                                // TODO: redesain dis shts🗿
                                id="trainset_id"
                                fetchData={fetchTrainsetFilters}
                                setSelectedData={id => setTrainsetFilters({ id: id })}
                                selectedDataId={trainsetFilters?.id ?? null}
                                placeholder={'Choose'}
                                renderItem={item =>
                                    `${item.name} ${item.status != TrainsetStatusEnum.PROGRESS ? `- ${item.status}` : ''}`
                                }
                                buttonClassName="mt-1"
                                nullable
                            />
                            <InputLabel htmlFor="useMerged" value="Use Merged Status" />
                            <Checkbox id="useRaw" onChange={e => setUseRaw(e.target.checked)} checked={useRaw} />
                            <InputLabel htmlFor="useRaw" value="Use Raw SQL (for development)" />
                        </div> */}
                        {/* </ChartContainer> */}
                        <div className='my-4 flex items-center justify-between'>
                            <h2 className='text-lg'>Status dari Trainset</h2>
                            <div className='flex flex-col'>
                                <Popover open={openTrainset} onOpenChange={setOpenTrainset}>
                                    <PopoverTrigger
                                        className={`${data['project'] == null ? 'hidden' : ' '}`}
                                        asChild
                                    >
                                        <Button
                                            variant='outline'
                                            role='combobox'
                                            className='w-40 justify-between'
                                            aria-expanded={openTrainset}
                                        >
                                            {valueTrainset
                                                ? project.find(
                                                      (projectItem) =>
                                                          projectItem.value === valueTrainset,
                                                  )?.label
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
                                                            href={`/dashboard/${data['projectId']}/${projectItem.id}`}
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
                                {/* <button className={buttonVariants()}>Detail Trainset</button>
                                <GenericDataSelector
                                    // TODO: redesain dis shts🗿
                                    id="trainset_id"
                                    fetchData={fetchTrainsetFilters}
                                    setSelectedData={id => setTrainsetFilters({ id: id })}
                                    selectedDataId={trainsetFilters?.id ?? null}
                                    placeholder={'Choose'}
                                    renderItem={item => `${item.name}`}
                                    buttonClassName="mt-1"
                                    nullable
                                /> */}
                            </div>
                        </div>

                        <ChartContainer config={chartConfigTrainset} className='h-[300px] w-full'>
                            <BarChart data={data['ts']} className='h-1/4' accessibilityLayer>
                                <CartesianGrid vertical={false} />
                                <XAxis
                                    tickMargin={10}
                                    tickLine={false}
                                    dataKey='ts_name'
                                    axisLine={false}
                                    // tickFormatter={value => value.slice(0, 10)}
                                />
                                <ChartTooltip
                                    cursor={false}
                                    content={<ChartTooltipContent indicator='dashed' />}
                                />
                                <Bar radius={4} fill='var(--color-done)' dataKey='done' />
                                <Bar
                                    radius={4}
                                    fill='var(--color-in_progress)'
                                    dataKey='in_progress'
                                />
                            </BarChart>
                        </ChartContainer>
                        {/* <ChartContainer
                            config={attachmentStatusOfTrainsetGraph.config}
                            className="h-[200px] w-full mt-5 pr-2"
                        >
                            <BarChart accessibilityLayer data={attachmentStatusOfTrainsetGraph.data}>
                                <CartesianGrid vertical={false} />
                                <XAxis
                                    dataKey="trainset_name"
                                    tickLine={false}
                                    tickMargin={10}
                                    axisLine={false}
                                    tickFormatter={value => value.slice(0, 6)}
                                /> */}
                        {/* {Object.keys(attachmentStatusOfTrainsetGraph.config).map(dataKey => (
                                      <YAxis key={`trainsetPanelStatus-${dataKey}-key`} dataKey={dataKey} />
                                    ))} */}
                        {/* <ChartTooltip content={<ChartTooltipContent />} />
                                <ChartLegend content={<ChartLegendContent />} />
                                {Object.keys(attachmentStatusOfTrainsetGraph.config).map(dataKey => (
                                    <Bar
                                        key={`trainsetPanelStatus-${dataKey}-key`}
                                        dataKey={dataKey}
                                        fill={`var(--color-${dataKey})`}
                                        radius={[5, 5, 0, 0]}
                                    />
                                ))}
                            </BarChart>
                        </ChartContainer> */}
                    </div>
                    <div className='mt-2 flex max-w-full'>
                        <div className='w-1/2'>
                            <h2 className='my-1 text-xl font-bold'>Progress Tiap Workshop</h2>
                            <h3 className='text-base'>Workshop Sukosari, Candisewu</h3>
                            <ChartContainer config={chartConfig} className='mt-5 h-[300px] w-full'>
                                <BarChart layout='vertical' data={data.ws} accessibilityLayer>
                                    <CartesianGrid vertical={false} />
                                    <XAxis type='number' dataKey='in_progress'></XAxis>
                                    <XAxis type='number' dataKey='done'></XAxis>
                                    <YAxis
                                        type='category'
                                        tickLine={false}
                                        dataKey='name'
                                        // max={10}
                                        className=''
                                        // tickSize={20}
                                        // tickCount={}
                                        // padding={}
                                        // minTickGap={0}
                                        // tickMargin={1}
                                        axisLine={false}
                                    />
                                    <ChartTooltip content={<ChartTooltipContent />} />
                                    <ChartLegend content={<ChartLegendContent />} />
                                    <Bar
                                        radius={4}
                                        fill='var(--color-in_progress)'
                                        dataKey='in_progress'
                                    />
                                    <Bar radius={4} fill='var(--color-done)' dataKey='done' />
                                </BarChart>
                            </ChartContainer>
                        </div>

                        <div className=' '>
                            <h2 className='my-1 text-xl font-bold'>Progress Tiap Panel</h2>
                            <h3 className='text-base'>Panel panel pada WS Assembly</h3>
                            <ChartContainer config={chartConfig} className='mt-5 h-[300px] w-96'>
                                <BarChart data={data['panel']} accessibilityLayer>
                                    <CartesianGrid vertical={false} />
                                    <YAxis type='number' dataKey='in_progress'></YAxis>
                                    <XAxis
                                        tickLine={false}
                                        tickFormatter={(value) => value.slice(0, 6)}
                                        dataKey='name'
                                        // tickMargin={10}
                                        axisLine={false}
                                    />
                                    <ChartTooltip content={<ChartTooltipContent />} />
                                    <ChartLegend content={<ChartLegendContent />} />
                                    <Bar
                                        radius={4}
                                        fill='var(--color-in_progress)'
                                        dataKey='in_progress'
                                    />
                                    <Bar radius={4} fill='var(--color-done)' dataKey='done' />
                                </BarChart>
                            </ChartContainer>
                        </div>
                    </div>
                    <h2 className='my-1 text-xl font-bold'>Progress Tiap Workstation</h2>
                    <div className='mt-2 flex max-w-full'>
                        <ChartContainer
                            config={attachmentStatusOfWorkstationGraph.config}
                            className='mt-5 h-[300px] w-full'
                        >
                            <BarChart
                                stackOffset='expand'
                                layout='vertical'
                                data={attachmentStatusOfWorkstationGraph.data}
                                accessibilityLayer
                            >
                                <CartesianGrid vertical={false} />
                                <XAxis
                                    type='number'
                                    tickFormatter={(value) => toPercent(value, 0)}
                                />
                                <YAxis
                                    width={150}
                                    type='category'
                                    tickMargin={10}
                                    tickLine={false}
                                    dataKey='workstation_name'
                                    className=''
                                    axisLine={false}
                                    // tickFormatter={value => value.slice(0, 6)}
                                />
                                <ChartTooltip content={renderWorkstationProgressTooltipContent} />
                                {/* <ChartTooltip content={<ChartTooltipContent formatter={(value, name) => name+' '+value} />} /> nyerah🗿 */}
                                <ChartLegend content={<ChartLegendContent />} />
                                {Object.keys(attachmentStatusOfWorkstationGraph.config).map(
                                    (dataKey) => (
                                        <Bar
                                            type='monotone'
                                            stackId='1'
                                            key={`workstationPanelStatus-${dataKey}-key`}
                                            fill={`var(--color-${dataKey})`}
                                            dataKey={dataKey}
                                        />
                                    ),
                                )}
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
                    <div className='mx-auto max-w-7xl sm:px-6 lg:px-8'>
                        <div className='overflow-hidden bg-white shadow-sm dark:bg-gray-800 sm:rounded-lg'>
                            <div className='p-6 text-gray-900 dark:text-gray-100'>
                                {t('pages.dashboard.index.welcome')}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* </div> */}
        </AuthenticatedLayout>
    );
}
