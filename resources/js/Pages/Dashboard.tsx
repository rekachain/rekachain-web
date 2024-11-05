import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { PageProps } from '../Types';
import { ChartContainer, type ChartConfig } from '@/Components/UI/chart';
import { ChartLegend, ChartLegendContent } from '@/Components/UI/chart';
import { ChartTooltip, ChartTooltipContent } from '@/Components/UI/chart';
import { Bar, BarChart, CartesianGrid, LabelList, Line, LineChart, Pie, PieChart, XAxis, YAxis } from 'recharts';
import { Check, ChevronsUpDown, TrendingUp } from 'lucide-react';
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/Components/UI/card';

// import { PageProps } from '@/Types';
import { useLaravelReactI18n } from 'laravel-react-i18n';

import { cn } from '@/Lib/Utils';
import { Button } from '@/Components/UI/button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/Components/UI/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/Components/UI/popover';
import { useState } from 'react';

const project = [
    {
        value: '612',
        label: '612',
        link: '/dashboard/612',
    },
    {
        value: 'krl_kci',
        label: 'KRL KCI',
        link: '/dashboard/KRL KCI',
    },
];

export default function Dashboard({ auth, data }: PageProps) {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState('');
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
    // SELECT projects.name,  SUM(case when panel_attachments.status = "done" then 1 else 0 end) as done, SUM(case when panel_attachments.status = "in_progress" then 1 else 0 end) as in_progress, workshops.name FROM `panel_attachments` inner join workstations on source_workstation_id = workstations.id inner join workshops on workstations.workshop_id = workshops.id  INNER JOIN `carriage_panels` ON `panel_attachments`.carriage_panel_id = `carriage_panels`.id INNER JOIN `carriage_trainset` ON `carriage_panels`.carriage_trainset_id = `carriage_trainset`.id INNER JOIN `trainsets` ON `carriage_trainset`.trainset_id = `trainsets`.id inner join projects on trainsets.project_id = projects.id where workshops.id <3 GROUP by workshops.name, projects.name;

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
    //SELECT  SUM(case when panel_attachments.status = "done" then 1 else 0 end) as done, SUM(case when panel_attachments.status = "in_progress" then 1 else 0 end) as in_progress, workshops.name FROM `panel_attachments` inner join workstations on source_workstation_id = workstations.id inner join workshops on workstations.workshop_id = workshops.id INNER JOIN `carriage_panels` ON `panel_attachments`.carriage_panel_id = `carriage_panels`.id INNER JOIN `carriage_trainset` ON `carriage_panels`.carriage_trainset_id = `carriage_trainset`.id INNER JOIN `trainsets` ON `carriage_trainset`.trainset_id = `trainsets`.id inner join projects on trainsets.project_id = projects.id where workshops.id <3 GROUP by workshops.name

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

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-5 ">
                    <div className="bg-white dark:bg-transparent overflow-hidden shadow-sm sm:rounded-lg ">
                        {/* <div className="p-6 text-gray-900 dark:text-gray-100">You're logged in bro !</div> */}
                        <div className="">
                            <h1 className="text-3xl font-bold mt-2">Dashboard</h1>
                            <div className="flex justify-between w-full items-center">
                                <h2 className="text-xl my-2">Proyek 612</h2>
                                <Popover open={open} onOpenChange={setOpen}>
                                    <PopoverTrigger asChild>
                                        <Button
                                            variant="outline"
                                            role="combobox"
                                            aria-expanded={open}
                                            className="w-[200px] justify-between"
                                        >
                                            {value
                                                ? project.find(framework => framework.value === value)?.label
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
                                                    {project.map(framework => (
                                                        <Link href={framework.link}>
                                                            <CommandItem
                                                                key={framework.value}
                                                                value={framework.value}
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
                                                                        value === framework.value
                                                                            ? 'opacity-100'
                                                                            : 'opacity-0',
                                                                    )}
                                                                />
                                                                {framework.label}
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
                                <BarChart accessibilityLayer data={data['ts']}>
                                    <CartesianGrid vertical={false} />
                                    <XAxis
                                        dataKey="name"
                                        tickLine={false}
                                        tickMargin={10}
                                        axisLine={false}
                                        tickFormatter={value => value.slice(0, 6)}
                                    />
                                    <ChartTooltip content={<ChartTooltipContent />} />
                                    <ChartLegend content={<ChartLegendContent />} />
                                    <Bar dataKey="in_progress" fill="var(--color-in_progress)" radius={4} />
                                    <Bar dataKey="done" fill="var(--color-done)" radius={4} />
                                </BarChart>
                            </ChartContainer>
                        </div>
                        <div className="flex max-w-full mt-2 ">
                            <div className="w-1/2">
                                <h2 className="text-xl my-1 font-bold">Progress Tiap Workstation</h2>
                                <h3 className="text-base">Workstation Sukosari, Candisewu</h3>
                                <ChartContainer config={chartConfig} className="h-[300px] w-full mt-5">
                                    <BarChart accessibilityLayer data={data.ws} layout="vertical">
                                        <CartesianGrid vertical={false} />
                                        <XAxis type="number" dataKey="in_progress"></XAxis>
                                        <XAxis type="number" dataKey="done"></XAxis>
                                        <YAxis
                                            // max={10}
                                            className=""
                                            dataKey="name"
                                            type="category"
                                            tickLine={false}
                                            // tickSize={20}
                                            // tickCount={}
                                            // padding={}
                                            // minTickGap={0}
                                            // tickMargin={1}
                                            axisLine={false}
                                        />
                                        <ChartTooltip content={<ChartTooltipContent />} />
                                        <ChartLegend content={<ChartLegendContent />} />
                                        <Bar dataKey="in_progress" fill="var(--color-in_progress)" radius={4} />
                                        <Bar dataKey="done" fill="var(--color-done)" radius={4} />
                                    </BarChart>
                                </ChartContainer>
                            </div>

                            <div className="w-[35%]  ">
                                <h2 className="text-xl my-1 font-bold">Progress Tiap Panel</h2>
                                <h3 className="text-base">Panel panel pada WS Assembly</h3>
                                <ChartContainer config={chartConfig} className="h-[300px] w-96 mt-5">
                                    <BarChart accessibilityLayer data={data['panel']}>
                                        <CartesianGrid vertical={false} />
                                        <YAxis type="number" dataKey="in_progress"></YAxis>
                                        <XAxis
                                            dataKey="name"
                                            tickLine={false}
                                            // tickMargin={10}
                                            axisLine={false}
                                            tickFormatter={value => value.slice(0, 6)}
                                        />
                                        <ChartTooltip content={<ChartTooltipContent />} />
                                        <ChartLegend content={<ChartLegendContent />} />
                                        <Bar dataKey="in_progress" fill="var(--color-in_progress)" radius={4} />
                                        <Bar dataKey="done" fill="var(--color-done)" radius={4} />
                                    </BarChart>
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
