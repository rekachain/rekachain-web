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
import {
    Bar,
    BarChart,
    CartesianGrid,
    Cell,
    LabelList,
    Legend,
    Line,
    LineChart,
    Pie,
    PieChart,
    Text,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts';
import { Check, ChevronsUpDown, TrendingUp } from 'lucide-react';
import { useLaravelReactI18n } from 'laravel-react-i18n';

import { cn } from '@/Lib/Utils';
import { Button } from '@/Components/UI/button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/Components/UI/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/Components/UI/popover';
import { useCallback, useState } from 'react';

export default function Dashboard({ auth, data }: PageProps) {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(data['project'][0]['name']);
    const [openTrainset, setOpenTrainset] = useState(false);
    const [valueTrainset, setValueTrainset] = useState(data['trainsets'][0]['ts_name']);
    // console.log(data['total']);
    const chartData = [
        { status: 'fullfilled', total: 15 },
        { status: 'required', total: 20 },
        { status: 'failed', total: 3 },
    ];

    const label = ['fulfilled', 'required', 'failed'];

    const chartConfigPie = {
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
    const panelData = [
        { statusPanel: 'required', totalAmount: 15 },
        { statusPanel: 'fulfilled', totalAmount: 22 },
        { statusPanel: 'failed', totalAmount: 32 },
    ];

    // @ts-ignore
    const newArray = data['total'].map((item, index) => ({
        ...item,
        total: parseInt(item.total),
        fill: `var(--color-${label[index]})`,
    }));
    console.log(newArray);
    console.log('makan');
    const COLORS = ['#8884d8', '#82ca9d', '#ff8042'];
    const panelChartConf = {
        total: {
            label: 'Total',
        },
        required: {
            label: 'Required',
            color: 'hsl(var(--chart-1))',
        },
        fulfilled: {
            label: 'Fulfilled',
            color: 'hsl(var(--chart-2))',
        },
        failed: {
            label: 'Failed',
            color: 'hsl(var(--chart-3))',
        },
    } satisfies ChartConfig;
    const { t } = useLaravelReactI18n();
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
                            <div className="flex justify-between w-full items-start">
                                <h2 className="text-xl my-2">
                                    {`Proyek ${data['trainsets'][0].pj_name} - ${data['trainsets'][0].ts_name}`}
                                    {/* {data['project'] == null ? 'Proyek 612 - TS 11' : `Proyek ${data['project']}`} */}
                                </h2>
                                <div className="flex flex-col gap-4 mb-5">
                                    <Popover open={open} onOpenChange={setOpen}>
                                        <PopoverTrigger asChild>
                                            <Button
                                                variant="outline"
                                                role="combobox"
                                                aria-expanded={open}
                                                className="w-40 justify-between"
                                            >
                                                {value
                                                    ? data['projectList'].find(
                                                          // @ts-ignore
                                                          projectItem => projectItem.name === value,
                                                      )?.name
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
                                                        {
                                                            // @ts-ignore
                                                            data['projectList'].map(projectItem => (
                                                                <Link href={`/dashboard/${projectItem.id}`}>
                                                                    <CommandItem
                                                                        key={projectItem.name}
                                                                        value={projectItem.name}
                                                                        onSelect={currentValue => {
                                                                            setValue(
                                                                                currentValue === projectItem.name
                                                                                    ? ''
                                                                                    : currentValue,
                                                                            );
                                                                            setOpen(false);
                                                                        }}
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
                                                variant="outline"
                                                role="combobox"
                                                aria-expanded={openTrainset}
                                                className="w-40 justify-between"
                                            >
                                                {valueTrainset
                                                    ? data['tsList'].find(
                                                          // @ts-ignore
                                                          projectItem => projectItem.name === valueTrainset,
                                                      )?.name
                                                    : 'Pilih Trainset'}
                                                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-[200px] p-0">
                                            <Command>
                                                <CommandInput placeholder="Cari Trainset..." />
                                                <CommandList>
                                                    <CommandEmpty>Trainset tidak ditemukan.</CommandEmpty>
                                                    <CommandGroup>
                                                        {// @ts-ignore
                                                        data['tsList']?.map(projectItem => (
                                                            <Link
                                                                href={`/dashboard/${projectItem.project_id}/${projectItem.id}`}
                                                            >
                                                                <CommandItem
                                                                    key={projectItem.id}
                                                                    value={projectItem.name}
                                                                    onSelect={currentValue => {
                                                                        setValueTrainset(
                                                                            currentValue === valueTrainset
                                                                                ? ''
                                                                                : currentValue,
                                                                        );
                                                                        setOpenTrainset(false);
                                                                    }}
                                                                >
                                                                    <Check
                                                                        className={cn(
                                                                            'mr-2 h-4 w-4',
                                                                            valueTrainset === projectItem.name
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

                            <div className="">
                                <h2 className="text-xl my-1 font-bold">Progress Tiap Panel</h2>
                                <h3 className="text-base">Panel panel pada WS Assembly</h3>
                                <ChartContainer config={chartConfig} className="h-[200px] w-full pr-10">
                                    <BarChart accessibilityLayer data={data['total']}>
                                        <CartesianGrid vertical={false} />
                                        <XAxis dataKey="type" tickLine={false} tickMargin={10} axisLine={false} />
                                        <ChartTooltip content={<ChartTooltipContent />} />
                                        <ChartLegend content={<ChartLegendContent />} />
                                        <Bar dataKey="qty" fill="var(--color-done)" radius={4} />
                                    </BarChart>
                                </ChartContainer>
                            </div>
                            {/* <ChartContainer config={panelChartConf} className=" max-h-[250px]">
                                <PieChart>
                                    <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                                    <Pie data={panelData} dataKey="total" nameKey="status" innerRadius={60} />
                                </PieChart>
                            </ChartContainer> */}
                            <ChartContainer config={chartConfigPie} className=" max-h-[250px]">
                                <PieChart>
                                    <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                                    <Pie data={newArray} dataKey="total" nameKey="status" innerRadius={60} />
                                </PieChart>
                            </ChartContainer>
                            {/* <ChartContainer config={chartConfigPie} className=" max-h-[250px]">
                                <PieChart>
                                    <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                                    <Pie data={data['total']} dataKey="totalAmount" nameKey="statusPanel" />
                                </PieChart>
                            </ChartContainer>
                            <PieChart width={400} height={400}>
                                <Pie
                                    data={newArray}
                                    dataKey="total"
                                    nameKey="status"
                                    cx="200"
                                    cy="200"
                                    outerRadius={100}
                                    fill="#8884d8"
                                    // dataKey="totalAmount"
                                    // nameKey="statusPanel"
                                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                >
                                    {panelData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        // <Cell key={`cell-${index}`} fill={entry.fill} />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend />
                            </PieChart> */}
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
