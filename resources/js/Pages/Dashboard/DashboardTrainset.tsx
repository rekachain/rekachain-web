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
import { useLocalStorage } from '@uidotdev/usehooks';

export default function Dashboard({ auth, data }: PageProps) {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(data['project'][0]['name']);
    const [openTrainset, setOpenTrainset] = useState(false);
    const [valueTrainset, setValueTrainset] = useState(data['trainsets'][0]['ts_name']);
    const [sidebarCollapse, setSidebarCollapse] = useLocalStorage('sidebarCollapse');

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
    const totalUpdated = data['total'].map((item, index) => ({
        ...item,
        total: parseInt(item.total),
        fill: `var(--color-${label[index]})`,
    }));
    console.log(totalUpdated);
    console.log('makan');
    const { t } = useLaravelReactI18n();
    return (
        <AuthenticatedLayout>
            <Head title={t('pages.dashboard.index.title')} />
            <div className="py-12">
                {/* <p>{value}</p> */}
                <div className={`${sidebarCollapse == true ? 'max-w-7xl' : 'max-w-5xl'} mx-auto sm:px-6 lg:px-5 `}>
                    <div className="bg-white dark:bg-transparent overflow-hidden shadow-sm sm:rounded-lg ">
                        {/* <div className="p-6 text-gray-900 dark:text-gray-100">You're logged in bro !</div> */}
                        <div className="px-4">
                            <h1 className="text-3xl font-bold mt-2">Dashboard</h1>
                            <div className="flex justify-between w-full items-start">
                                <h2 className="text-xl my-2">
                                    {`${t('pages.dashboard.index.project')} ${data['trainsets'][0].pj_name} - ${data['trainsets'][0].ts_name}`}
                                    {/* {data['project'] == null ? 'Proyek 612 - TS 11' : `Proyek ${data['project']}`} */}
                                </h2>
                                <div className="flex flex-col gap-4 mb-5">
                                    <Popover open={open} onOpenChange={setOpen}>
                                        <PopoverTrigger asChild>
                                            <Button
                                                variant="outline"
                                                role="combobox"
                                                aria-expanded={open}
                                                className="w-20 md:w-40 justify-between"
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
                                                <CommandInput
                                                    placeholder={`${t('pages.dashboard.index.find_project')}`}
                                                />
                                                <CommandList>
                                                    <CommandEmpty>
                                                        {t('pages.dashboard.index.project_not_found')}
                                                    </CommandEmpty>
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
                                                className="w-20 md:w-40 justify-between"
                                            >
                                                {valueTrainset
                                                    ? data['tsList'].find(
                                                          // @ts-ignore
                                                          projectItem => projectItem.name === valueTrainset,
                                                      )?.name
                                                    : `${t('pages.dashboard.index.select_trainset')}`}
                                                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-[200px] p-0">
                                            <Command>
                                                <CommandInput
                                                    placeholder={`${t('pages.dashboard.index.find_trainset')}`}
                                                />
                                                <CommandList>
                                                    <CommandEmpty>
                                                        {t('pages.dashboard.index.trainset_not_found')}
                                                    </CommandEmpty>
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
                            <ChartContainer config={chartConfigTrainsetCarriage} className="h-[200px] w-full pr-10">
                                <BarChart accessibilityLayer data={data['carriages']}>
                                    <CartesianGrid vertical={false} />
                                    <XAxis dataKey="type" tickLine={false} tickMargin={10} axisLine={false} />
                                    <ChartTooltip content={<ChartTooltipContent />} />
                                    <ChartLegend content={<ChartLegendContent />} />
                                    <Bar dataKey="qty" fill="var(--color-qty)" radius={4} />
                                </BarChart>
                            </ChartContainer>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 w-full mt-2 ">
                            <div className="px-4">
                                <h2 className="text-xl my-1 font-bold">{t('pages.dashboard.index.panel_trainset')}</h2>
                                <h3 className="text-base">{`${t('pages.dashboard.index.panel_trainset_sub')} ${data['trainsets'][0].ts_name}`}</h3>
                                <ChartContainer config={chartConfigPanelInTrainset} className="h-[400px] w-full mt-5">
                                    <BarChart className="h-[300px]" accessibilityLayer data={data['panel']}>
                                        <CartesianGrid vertical={false} />
                                        <XAxis
                                        
                                            // tick={<CustomizedAxisTick />}
                                            angle={-55}
                                            textAnchor="end"
                                            dataKey="name"
                                            tickLine={false}
                                            tickMargin={0}
                                            axisLine={false}
                                            height={100}
                                            width={0}
                                        />
                                        <ChartTooltip content={<ChartTooltipContent />} />
                                        <ChartLegend content={<ChartLegendContent />} />
                                        <Bar className="" dataKey="total" fill="var(--color-total)" radius={4} />
                                    </BarChart>
                                </ChartContainer>
                            </div>

                            <div className="px-4">
                                <h2 className="text-xl my-1 font-bold">
                                    {t('pages.dashboard.index.panel_progress_trainset')}
                                </h2>
                                <h3 className="text-base">{`${t('pages.dashboard.index.panel_progress_trainset_sub')} ${data['trainsets'][0].ts_name}`}</h3>
                                <div className="h-[400px] flex flex-col items-center">
                                    <ChartContainer config={chartConfigPie} className=" min-h-[300px] ">
                                        <PieChart>
                                            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                                            <Pie
                                                data={totalUpdated}
                                                dataKey="total"
                                                nameKey="status"
                                                innerRadius={60}
                                            />
                                        </PieChart>
                                    </ChartContainer>
                                    <h4 className="font-bold text-center">
                                        Kebutuhan panel sejumlah {data['total'][0].total} masih belum terpenuhi
                                    </h4>
                                    <p className="text-sm">Menunjukkan progress dari status kebutuhan panel.</p>
                                </div>
                            </div>
                        </div>
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
