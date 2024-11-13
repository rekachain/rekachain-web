// In one trainset, what are the Carriages and how many of them
// SELECT * FROM `carriage_trainset` inner join carriages on carriage_trainset.carriage_id = carriages.id where trainset_id = '1'
//

// In one trainset, what kind of panel that is in there
// SELECT trainsets.name, carriage_panels.panel_id, panels.name ,count(carriage_panels.panel_id) FROM `carriage_trainset` INNER JOIN carriage_panels on carriage_panels.carriage_trainset_id = carriage_trainset.id inner join trainsets on trainsets.id = carriage_trainset.trainset_id inner JOIN panels on carriage_panels.panel_id = panels.id where trainset_id = '1' GROUP by carriage_panels.panel_id ORDER BY `carriage_panels`.`panel_id` ASC

// In one trainset how is the panel condition
// SELECT trainsets.name, components.name, sum(trainset_attachment_components.total_required) as required, sum(trainset_attachment_components.total_fulfilled) as fulfilled, sum(trainset_attachment_components.total_failed) as failed FROM `trainset_attachment_components` inner JOIN carriage_panel_components on trainset_attachment_components.carriage_panel_component_id = carriage_panel_components.id inner join components on components.id = carriage_panel_components.component_id inner JOIN trainset_attachments on trainset_attachments.id = trainset_attachment_components.trainset_attachment_id inner join trainsets on trainsets.id = trainset_attachments.trainset_id where trainsets.id = 1 group by trainset_attachment_components.total_required, trainset_attachment_components.total_fulfilled,trainset_attachment_components.total_failed, components.name, trainsets.name, trainsets.name, components.name

import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { PageProps } from '../../Types';
import { ChartContainer, type ChartConfig } from '@/Components/UI/chart';
import { ChartLegend, ChartLegendContent } from '@/Components/UI/chart';
import { ChartTooltip, ChartTooltipContent } from '@/Components/UI/chart';
import { Bar, BarChart, CartesianGrid, LabelList, Line, LineChart, Pie, PieChart, Text, XAxis, YAxis } from 'recharts';
import { Check, ChevronsUpDown, TrendingUp } from 'lucide-react';
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/Components/UI/card';

// import { PageProps } from '@/Types';
import { useLaravelReactI18n } from 'laravel-react-i18n';

import { cn } from '@/Lib/Utils';
import { Button } from '@/Components/UI/button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/Components/UI/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/Components/UI/popover';
import { useCallback, useState } from 'react';

const project = [
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

export default function Dashboard({ auth, data }: PageProps) {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(data['project'] !== null ? data['project'] : '');
    console.log(data);
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
    // const formatTick = (tick: any) => {
    //     return tick.length > 4 ? tick.slice(0, 4) + '\n' + tick.slice(4) : tick;
    // };
    // const CustomTick = ({ x, y, payload }: { x: any; y: any; payload: any }) => {
    //     const maxCharsPerLine = 5; // Define maximum characters per line
    //     const label = payload.value;

    //     // Split label based on max character length
    //     const wrappedLabel = label.match(new RegExp(`.{1,${maxCharsPerLine}}`, 'g')) || [];

    //     return (
    //         <text x={x} y={y + 10} textAnchor="middle" style={{ fontSize: 12 }}>
    //             {wrappedLabel.map((line: any, index: any) => (
    //                 <tspan x={x} dy={index * 14} key={index}>
    //                     {line}
    //                 </tspan>
    //             ))}
    //         </text>
    //     );
    // };

    return (
        <AuthenticatedLayout>
            <Head title={t('pages.dashboard.index.title')} />
            <div className="py-12">
                {/* <p>{value}</p> */}
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-5 ">
                    <div className="bg-white dark:bg-transparent overflow-hidden shadow-sm sm:rounded-lg ">
                        {/* <div className="p-6 text-gray-900 dark:text-gray-100">You're logged in bro !</div> */}
                        <div className="">
                            <h1 className="text-3xl font-bold mt-2">Dashboard</h1>
                            <div className="flex justify-between w-full items-center">
                                <h2 className="text-xl my-2">
                                    {`Proyek ${data['trainsets'][0].pj_name} - ${data['trainsets'][0].ts_name}`}
                                    {/* {data['project'] == null ? 'Proyek 612 - TS 11' : `Proyek ${data['project']}`} */}
                                </h2>
                                <Popover open={open} onOpenChange={setOpen}>
                                    <PopoverTrigger asChild>
                                        <Button
                                            variant="outline"
                                            role="combobox"
                                            aria-expanded={open}
                                            className="w-[200px] justify-between"
                                        >
                                            {value
                                                ? project.find(projectItem => projectItem.value === value)?.label
                                                : 'Pilih Proyek'}
                                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-[200px] p-0">
                                        <Command>
                                            <CommandInput placeholder="Cari Projek..." />
                                            <CommandList>
                                                <CommandEmpty>Projek tidak ditemukan.</CommandEmpty>
                                                <CommandGroup>
                                                    {project.map(projectItem => (
                                                        <Link href={projectItem.link}>
                                                            <CommandItem
                                                                key={projectItem.value}
                                                                value={projectItem.value}
                                                                onSelect={currentValue => {
                                                                    setValue(
                                                                        currentValue === value ? '' : currentValue,
                                                                    );
                                                                    setOpen(false);
                                                                }}
                                                            >
                                                                <Check
                                                                    className={cn(
                                                                        'mr-2 h-4 w-4',
                                                                        value === projectItem.value
                                                                            ? 'opacity-100'
                                                                            : 'opacity-0',
                                                                    )}
                                                                />
                                                                {projectItem.label}
                                                            </CommandItem>
                                                        </Link>
                                                    ))}
                                                </CommandGroup>
                                            </CommandList>
                                        </Command>
                                    </PopoverContent>
                                </Popover>
                            </div>
                            <ChartContainer config={chartConfig} className="h-[200px] w-full pr-10">
                                <BarChart accessibilityLayer data={data['carriages']}>
                                    <CartesianGrid vertical={false} />
                                    <XAxis dataKey="type" tickLine={false} tickMargin={10} axisLine={false} />
                                    <ChartTooltip content={<ChartTooltipContent />} />
                                    <ChartLegend content={<ChartLegendContent />} />
                                    <Bar dataKey="qty" fill="var(--color-done)" radius={4} />
                                </BarChart>
                            </ChartContainer>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 w-full mt-2 ">
                            <div className="">
                                <h2 className="text-xl my-1 font-bold">Panel Dalam Trainset</h2>
                                <h3 className="text-base">Panel yang ada pada TS 1</h3>
                                <ChartContainer config={chartConfig} className="h-[400px] w-full mt-5">
                                    <BarChart className="" accessibilityLayer data={data['panel']}>
                                        <CartesianGrid vertical={false} />
                                        <XAxis
                                            // tick={<CustomizedAxisTick />}
                                            // angle={-45}
                                            textAnchor="end"
                                            dataKey="name"
                                            tickLine={false}
                                            tickMargin={0}
                                            axisLine={false}
                                        />
                                        <ChartTooltip content={<ChartTooltipContent />} />
                                        <ChartLegend content={<ChartLegendContent />} />
                                        <Bar className="" dataKey="total" fill="var(--color-done)" radius={4} />
                                    </BarChart>
                                </ChartContainer>
                            </div>

                            <div className=" ">
                                <h2 className="text-xl my-1 font-bold">Progress Tiap Panel</h2>
                                <h3 className="text-base">Panel panel pada WS Assembly</h3>
                                <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[250px]">
                                    <PieChart>
                                        <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                                        <Pie data={data['total']} dataKey="" nameKey="browser" innerRadius={60} />
                                    </PieChart>
                                </ChartContainer>
                            </div>
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
                        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                            <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                                <div className="p-6 text-gray-900 dark:text-gray-100">
                                    {t('pages.dashboard.index.welcome')}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
