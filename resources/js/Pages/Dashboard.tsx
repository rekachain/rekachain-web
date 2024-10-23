import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { PageProps } from '../Types';
import { ChartContainer, type ChartConfig } from '@/Components/UI/chart';
import { ChartLegend, ChartLegendContent } from '@/Components/UI/chart';
import { ChartTooltip, ChartTooltipContent } from '@/Components/UI/chart';
import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from 'recharts';

import { TrendingUp } from 'lucide-react';
import { Pie, PieChart } from 'recharts';

// import { TrendingUp } from 'lucide-react';
import { Line, LineChart } from 'recharts';

import { YAxis } from 'recharts';
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/Components/UI/card';

export default function Dashboard({ auth }: PageProps) {
    const chartConfig = {
        progress: {
            label: 'Progress',
            color: '#fd2c59',
        },
        done: {
            label: 'Done',
            color: '#00C3FF',
        },
    } satisfies ChartConfig;
    const chartData = [
        { ts: 'TS1', progress: 186, done: 80 },
        { ts: 'TS2', progress: 86, done: 80 },
        { ts: 'TS3', progress: 20, done: 50 },
        { ts: 'TS4', progress: 45, done: 70 },
        { ts: 'TS5', progress: 12, done: 100 },
        { ts: 'TS6', progress: 95, done: 60 },
        { ts: 'TS7', progress: 70, done: 30 },
        { ts: 'TS8', progress: 110, done: 90 },
        { ts: 'TS9', progress: 54, done: 40 },
        { ts: 'TS10', progress: 30, done: 80 },
        { ts: 'TS11', progress: 22, done: 20 },
        { ts: 'TS12', progress: 67, done: 50 },
        { ts: 'TS13', progress: 100, done: 100 },
        { ts: 'TS14', progress: 45, done: 65 },
        { ts: 'TS15', progress: 75, done: 75 },
        { ts: 'TS16', progress: 12, done: 55 },
        { ts: 'TS17', progress: 88, done: 85 },
        { ts: 'TS18', progress: 34, done: 10 },
        { ts: 'TS19', progress: 91, done: 90 },
        { ts: 'TS20', progress: 67, done: 80 },
        { ts: 'TS21', progress: 20, done: 30 },
        { ts: 'TS22', progress: 42, done: 60 },
        { ts: 'TS23', progress: 99, done: 100 },
        { ts: 'TS24', progress: 76, done: 50 },
        { ts: 'TS25', progress: 33, done: 70 },
        { ts: 'TS26', progress: 54, done: 40 },
        { ts: 'TS27', progress: 15, done: 20 },
        { ts: 'TS28', progress: 68, done: 80 },
        { ts: 'TS29', progress: 90, done: 90 },
        { ts: 'TS30', progress: 25, done: 50 },
    ];
    // from panel_attachment get status
    // from carriage panel get carriage_trainset_id
    // from trainset get trainset id
    // SELECT count(panel_attachments.status), trainsets.name FROM `panel_attachments` INNER JOIN `carriage_panels` ON `panel_attachments`.carriage_panel_id = `carriage_panels`.id INNER JOIN `carriage_trainset` ON `carriage_panels`.carriage_trainset_id = `carriage_trainset`.id INNER JOIN `trainsets` ON `carriage_trainset`.trainset_id = `trainsets`.id where panel_attachments.status = "done" GROUP BY trainsets.name;

    // SELECT panel_attachments.status, count(panel_attachments.status), trainsets.name FROM `panel_attachments` INNER JOIN `carriage_panels` ON `panel_attachments`.carriage_panel_id = `carriage_panels`.id INNER JOIN `carriage_trainset` ON `carriage_panels`.carriage_trainset_id = `carriage_trainset`.id INNER JOIN `trainsets` ON `carriage_trainset`.trainset_id = `trainsets`.id GROUP BY trainsets.name, panel_attachments.status;

    const chartDataWS = [
        { ts: 'WS Candisewu Lt1', progress: 186, done: 80 },
        { ts: 'WS Candisewu Lt2', progress: 86, done: 80 },
        { ts: 'WS Candisewu Lt3', progress: 20, done: 50 },
        { ts: 'WS Sukosari', progress: 36, done: 50 },
        { ts: 'WS Harmonika', progress: 45, done: 70 },
    ];
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

    // SELECT count(panel_attachments.status), panel_attachments.status, panels.name FROM `panel_attachments` INNER JOIN `carriage_panels` ON `panel_attachments`.carriage_panel_id = `carriage_panels`.id INNER JOIN panels on carriage_panels.panel_id = panels.id GROUP by panels.name, panel_attachments.status;

    //     With seperated done and in progress
    // SELECT SUM(case when panel_attachments.status = "done" then 1 else 0 end) as done, SUM(case when panel_attachments.status = "in_progress" then 1 else 0 end) as in_progress, panels.name FROM `panel_attachments` INNER JOIN `carriage_panels` ON `panel_attachments`.carriage_panel_id = `carriage_panels`.id INNER JOIN panels on carriage_panels.panel_id = panels.id GROUP by panels.name, panel_attachments.status ORDER BY `panels`.`name` ASC

    return (
        <AuthenticatedLayout>
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-5 ">
                    <div className="bg-white dark:bg-transparent overflow-hidden shadow-sm sm:rounded-lg ">
                        {/* <div className="p-6 text-gray-900 dark:text-gray-100">You're logged in bro !</div> */}
                        <div className="">
                            <h1 className="text-3xl font-bold mt-2">Dashboard</h1>
                            <h2 className="text-xl my-2">Proyek 612</h2>
                            <ChartContainer config={chartConfig} className="h-[200px] w-full pr-10">
                                <BarChart accessibilityLayer data={chartData}>
                                    <CartesianGrid vertical={false} />
                                    <XAxis
                                        dataKey="ts"
                                        tickLine={false}
                                        tickMargin={10}
                                        axisLine={false}
                                        tickFormatter={value => value.slice(0, 6)}
                                    />
                                    <ChartTooltip content={<ChartTooltipContent />} />
                                    <ChartLegend content={<ChartLegendContent />} />
                                    <Bar dataKey="progress" fill="var(--color-progress)" radius={4} />
                                    <Bar dataKey="done" fill="var(--color-done)" radius={4} />
                                </BarChart>
                            </ChartContainer>
                        </div>
                        <div className="flex max-w-full mt-2 ">
                            <div className="w-1/2">
                                <h2 className="text-xl my-1 font-bold">Progress Tiap Workstation</h2>
                                <h3 className="text-base">Workstation Sukosari, Candisewu</h3>
                                <ChartContainer config={chartConfig} className="h-[300px] w-full">
                                    <BarChart accessibilityLayer data={chartDataWS} layout="vertical">
                                        <CartesianGrid vertical={false} />
                                        <XAxis type="number" dataKey="progress"></XAxis>
                                        <XAxis type="number" dataKey="done"></XAxis>
                                        <YAxis
                                            className=""
                                            dataKey="ts"
                                            type="category"
                                            tickLine={false}
                                            // tickSize={20}
                                            // tickCount={}
                                            // padding={}
                                            minTickGap={0}
                                            tickMargin={1}
                                            axisLine={false}
                                        />
                                        <ChartTooltip content={<ChartTooltipContent />} />
                                        <ChartLegend content={<ChartLegendContent />} />
                                        <Bar dataKey="progress" fill="var(--color-progress)" radius={4} />
                                        <Bar dataKey="done" fill="var(--color-done)" radius={4} />
                                    </BarChart>
                                </ChartContainer>
                            </div>

                            <div className="w-[35%]  ">
                                <h2 className="text-xl my-1 font-bold">Progress Tiap Panel</h2>
                                <h3 className="text-base">Panel panel yang ada Assembly</h3>
                                <ChartContainer config={chartConfig} className="h-[300px] w-96">
                                    <BarChart accessibilityLayer data={chartDataPanel}>
                                        <CartesianGrid vertical={false} />
                                        <YAxis type="number" dataKey="done"></YAxis>
                                        <XAxis
                                            dataKey="ts"
                                            tickLine={false}
                                            tickMargin={10}
                                            axisLine={false}
                                            tickFormatter={value => value.slice(0, 6)}
                                        />
                                        <ChartTooltip content={<ChartTooltipContent />} />
                                        <ChartLegend content={<ChartLegendContent />} />
                                        <Bar dataKey="progress" fill="var(--color-progress)" radius={4} />
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
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
