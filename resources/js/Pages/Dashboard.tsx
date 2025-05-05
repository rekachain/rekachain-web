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
import { Bar, BarChart, CartesianGrid, Cell, Pie, PieChart, XAxis, YAxis } from 'recharts';
import { PageProps } from '../Types';

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

import { trainsetService } from '@/Services/trainsetService';
import { ROUTES } from '@/Support/Constants/routes';
import { useLocalStorage } from '@uidotdev/usehooks';
import { useCallback, useEffect, useState } from 'react';
import { checkPermission } from '@/Helpers/permissionHelper';
import { PERMISSION_ENUM } from '@/Support/Enums/permissionEnum';
import { fetchEnumLabels } from '@/Helpers/enumHelper';
import { ReturnedProductStatusEnum } from '@/Support/Enums/returnedProductStatusEnum';
import GenericDataSelector from '@/Components/GenericDataSelector';
import { withLoading } from '@/Utils/withLoading';
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
interface ReturnedProductStatusDonutChart {
    data: { name: string; value: number }[];
    config: ChartConfig;
}
export default function Dashboard({ auth, data }: PageProps) {
    const [open, setOpen] = useState(false);
    const [yearFilterOpen, setYearFilterOpen] = useState(false);
    const [monthFilterOpen, setMonthFilterOpen] = useState(false);
    const years = [2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030];
    const [openTrainset, setOpenTrainset] = useState(false);
    // const [value, setValue] = useState('');
    const [value, setValue] = useState(data['project'] !== null ? data['project'] : '');
    const [yearFilterValue, setYearFilterValue] = useState('');
    const [monthFilterValue, setMonthFilterValue] = useState('');
    const [valueTrainset, setValueTrainset] = useState('');
    const [sidebarCollapse, setSidebarCollapse] = useLocalStorage('sidebarCollapse');

    // console.log(data);

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

    const [localizedReturnedProductStatuses, setLocalizedReturnedProductStatuses] = useState<
        Record<string, string>
    >({});
    
    useEffect(() => {
        fetchEnumLabels('ReturnedProductStatusEnum')
            .then((statuses) => {
                setLocalizedReturnedProductStatuses(statuses);
            })
            .catch((error) => console.error('Failed to fetch localized statuses:', error));
    }, []);
    const [returnedProductStatusDonutChart, setReturnedProductStatusDonutChart] =
        useState<ReturnedProductStatusDonutChart>({
            data: data.returned_product_status || [],
            config: {
                requested: {
                    label: localizedReturnedProductStatuses.requested || 'Diminta',
                    color: 'hsl(var(--chart-1))',
                },
                draft: {
                    label: localizedReturnedProductStatuses.draft || 'Draf',
                    color: 'hsl(var(--chart-2))',
                },
                progress: {
                    label: localizedReturnedProductStatuses.progress || 'Progres',
                    color: 'hsl(var(--chart-3))',
                },
                done: {
                    label: localizedReturnedProductStatuses.done || 'Selesai',
                    color: 'hsl(var(--chart-4))',
                },
                scrapped: {
                    label: localizedReturnedProductStatuses.scrapped || 'Discrap',
                    color: 'hsl(var(--chart-5))',
                },
            }
    })
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

    useEffect(() => {
        syncAttachmentStatusData();
        syncReturnedProductStatusChart();
    }, [localizedReturnedProductStatuses]);

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

    const [returnedProductStatusConfig, setReturnedProductStatusConfig] = useState<ChartConfig>({
        requested: {
            label: localizedReturnedProductStatuses.requested || 'Diminta',
            color: 'hsl(var(--chart-1))',
        },
        draft: {
            label: localizedReturnedProductStatuses.draft || 'Draf',
            color: 'hsl(var(--chart-2))',
        },
        progress: {
            label: localizedReturnedProductStatuses.progress || 'Dalam Proses',
            color: 'hsl(var(--chart-3))',
        },
        done: {
            label: localizedReturnedProductStatuses.done || 'Selesai',
            color: 'hsl(var(--chart-4))',
        },
        scrapped: {
            label: localizedReturnedProductStatuses.scrapped || 'Discrap',
            color: 'hsl(var(--chart-5))',
        },
    });

    const syncReturnedProductStatusChart = () => {
        setReturnedProductStatusDonutChart({
            data: data.returned_product_status || [],
            config: returnedProductStatusConfig,
        });
    }

    const syncReturnedProductStatusData =  withLoading( async() => {
        const res = await window.axios.get(
            route(`${ROUTES.DASHBOARD}`, {
                year: yearFilterValue,
            })
        )
        setReturnedProductStatusDonutChart({
            data: res.data.returned_product_status,
            config: returnedProductStatusConfig,
        });
    })

    useEffect(() => {
        syncReturnedProductStatusData();
    }, [yearFilterValue]);

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

    const { t, setLocale } = useLaravelReactI18n();

    useEffect(() => {
        fetchEnumLabels('ReturnedProductStatusEnum')
            .then(setLocalizedReturnedProductStatuses)
            .catch((error) => console.error('Failed to fetch localized statuses:', error));
    }, [setLocale]);

    return (
        <AuthenticatedLayout>
            <Head title={t('pages.dashboard.index.title')} />

            {/* <div className="py-12"> */}
            {/* <p>{value}</p> */}
            <div
                className={`${sidebarCollapse == true ? 'max-w-7xl' : 'max-w-5xl'} mx-auto px-3 sm:px-6 lg:px-5`}
            >
                <div className='overflow-hidden bg-white shadow-sm dark:bg-transparent sm:rounded-lg'>
                    {/* <div className="p-6 text-gray-900 dark:text-gray-100">You're logged in bro !</div> */}
                    <div className=''>
                        <h1 className='mt-2 text-3xl font-bold'>Dashboard</h1>
                        <div className='flex w-full items-center justify-between'>
                            <div className="">
                                <h2 className='my-2 text-xl'>
                                    {data['project'] == null
                                        ? t('pages.dashboard.index.all_project')
                                        : `${t('pages.dashboard.index.project')} ${data['project']}`}
                                </h2>
                            </div>
                            <div className="grid grid-cols-1 gap-2 md:grid-cols-3">
                                <Popover open={open} onOpenChange={setOpen}>
                                    <PopoverTrigger className=' ' asChild>
                                        <Button
                                            variant='outline'
                                            role='combobox'
                                            className='w-25 justify-between md:w-40'
                                            aria-expanded={open}
                                        >
                                            {value
                                                ? project.find(
                                                    (projectItem) => projectItem.value === value,
                                                )?.label
                                                : t('pages.dashboard.index.select_project')}
                                            <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className='w-[200px] p-0'>
                                        <Command>
                                            <CommandInput
                                                placeholder={t('pages.dashboard.index.find_project')}
                                            />
                                            <CommandList>
                                                <CommandEmpty>
                                                    {t('pages.dashboard.index.project_not_found')}
                                                </CommandEmpty>
                                                <CommandGroup>
                                                    {
                                                        // @ts-ignore
                                                        data['projectDetail'].map((projectItem) => (
                                                            <Link
                                                                key={projectItem.id}
                                                                href={`/dashboard/${projectItem.id}`}
                                                            >
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
                                {checkPermission([PERMISSION_ENUM.RETURNED_PRODUCT_CREATE]) && (
                                    <>
                                        <Popover open={yearFilterOpen} onOpenChange={setYearFilterOpen}>
                                            <PopoverTrigger asChild>
                                                <Button
                                                    variant='outline'
                                                    role='combobox'
                                                    className='w-25 justify-between md:w-40'
                                                    aria-expanded={yearFilterOpen}
                                                >
                                                    {yearFilterValue
                                                        ? yearFilterValue
                                                        : "Filter Tahun"}
                                                    <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent className='w-[200px] p-0'>
                                                <Command>
                                                    <CommandList>
                                                        <CommandEmpty>
                                                            {"Year Not Found"}
                                                        </CommandEmpty>
                                                        <CommandGroup>
                                                            {yearFilterValue && (
                                                                <CommandItem onSelect={() => setYearFilterValue('')}>
                                                                    {t('components.generic_data_selector.actions.clear_selection')}
                                                                </CommandItem>
                                                            )}
                                                            {years.map((yearItem) => (
                                                                <CommandItem
                                                                    value={yearItem.toString()}
                                                                    onSelect={(currentValue) => {
                                                                        setYearFilterValue(
                                                                            currentValue === yearFilterValue
                                                                                ? ''
                                                                                : currentValue.toString(),
                                                                        );
                                                                        setYearFilterOpen(false);
                                                                    }}
                                                                    key={yearItem}
                                                                >
                                                                    <Check
                                                                        className={cn(
                                                                            'mr-2 h-4 w-4',
                                                                            yearFilterValue === yearItem.toString()
                                                                                ? 'opacity-100'
                                                                                : 'opacity-0',
                                                                        )}
                                                                    />
                                                                    {yearItem}
                                                                </CommandItem>
                                                            ))}
                                                        </CommandGroup>
                                                    </CommandList>
                                                </Command>
                                            </PopoverContent>
                                        </Popover>
                                        
                                        {/* <GenericDataSelector
                                            // TODO: redesain dis shts🗿
                                            id="year-filter"
                                            data={years.map((year, index) => ({id: index, value: year}))}
                                            setSelectedData={id => {
                                                setYearFilterValue(id ? years[id].toString() : '');
                                            }}
                                            selectedDataId={yearFilterValue ? years.indexOf(parseInt(yearFilterValue)) : null}
                                            placeholder={'Choose'}
                                            renderItem={item =>
                                                `${item.value}`
                                            }
                                            nullable
                                        /> */}
                                        {yearFilterValue && (
                                            <Popover open={monthFilterOpen} onOpenChange={setMonthFilterOpen}>
                                                <PopoverTrigger asChild>
                                                    <Button
                                                        variant='outline'
                                                        role='combobox'
                                                        className='w-25 justify-between md:w-40'
                                                        aria-expanded={yearFilterOpen}
                                                    >
                                                        {yearFilterValue
                                                            ? yearFilterValue
                                                            : "Filter Tahun"}
                                                        <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
                                                    </Button>
                                                </PopoverTrigger>
                                                <PopoverContent className='w-[200px] p-0'>
                                                    <Command>
                                                        <CommandList>
                                                            <CommandEmpty>
                                                                {"Year Not Found"}
                                                            </CommandEmpty>
                                                            <CommandGroup>
                                                                {yearFilterValue && (
                                                                    <CommandItem onSelect={() => setYearFilterValue('')}>
                                                                        {t('components.generic_data_selector.actions.clear_selection')}
                                                                    </CommandItem>
                                                                )}
                                                                {['2023', '2024', '2025', '2026', '2027', '2028', '2029', '2030'].map((yearItem) => (
                                                                    <CommandItem
                                                                        value={yearItem}
                                                                        onSelect={(currentValue) => {
                                                                            setYearFilterValue(
                                                                                currentValue === yearFilterValue
                                                                                    ? ''
                                                                                    : currentValue,
                                                                            );
                                                                            setYearFilterOpen(false);
                                                                        }}
                                                                        key={yearItem}
                                                                    >
                                                                        <Check
                                                                            className={cn(
                                                                                'mr-2 h-4 w-4',
                                                                                yearFilterValue === yearItem
                                                                                    ? 'opacity-100'
                                                                                    : 'opacity-0',
                                                                            )}
                                                                        />
                                                                        {yearItem}
                                                                    </CommandItem>
                                                                ))}
                                                            </CommandGroup>
                                                        </CommandList>
                                                    </Command>
                                                </PopoverContent>
                                            </Popover>
                                        )}
                                    </>
                                    
                                )}
                            </div>
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
                        {checkPermission([PERMISSION_ENUM.RETURNED_PRODUCT_CREATE]) && (
                            <>
                                <h2 className='my-1 text-xl font-bold'>
                                    Returned Product
                                </h2>
                                <ChartContainer
                                    config={returnedProductStatusDonutChart.config}
                                    className='mt-5 h-[300px] w-full'
                                >
                                    <PieChart >
                                        <ChartTooltip content={<ChartTooltipContent />} />
                                        <ChartLegend content={<ChartLegendContent />} />
                                        <Pie data={returnedProductStatusDonutChart.data} dataKey='value'>
                                        {Object.keys(returnedProductStatusDonutChart.config).map(
                                            (dataKey, index) => (
                                                <Cell
                                                    key={`returnedProductStatus-${index}-key`}
                                                    fill={`var(--color-${dataKey})`}
                                                />
                                            ),
                                        )}
                                        </Pie>
                                    </PieChart>
                                </ChartContainer>
                            </>
                        )}
                        <div className='my-4 flex items-center justify-between'>
                            <h2 className='text-lg'>
                                {t('pages.dashboard.index.all_trainset_status')}
                            </h2>
                            <div className='flex flex-col'>
                                <Popover open={openTrainset} onOpenChange={setOpenTrainset}>
                                    <PopoverTrigger
                                        className={`${data['project'] == null ? 'hidden' : ' '}`}
                                        asChild
                                    >
                                        <Button
                                            variant='outline'
                                            role='combobox'
                                            className='w-25 justify-between md:w-40'
                                            aria-expanded={openTrainset}
                                        >
                                            {valueTrainset
                                                ? project.find(
                                                      (projectItem) =>
                                                          projectItem.value === valueTrainset,
                                                  )?.label
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
                                                    Trainset tidak ditemukan.
                                                </CommandEmpty>
                                                <CommandGroup>
                                                    {// @ts-ignore
                                                    data['tsList']?.map((projectItem) => (
                                                        <Link
                                                            key={projectItem.id}
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
                                <Bar
                                    radius={4}
                                    fill='var(--color-material_in_transit)'
                                    dataKey='material_in_transit'
                                />
                                <Bar radius={4} fill='var(--color-pending)' dataKey='pending' />
                                <Bar
                                    radius={4}
                                    fill='var(--color-material_accepted)'
                                    dataKey='material_accepted'
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
                            
                    </div>
                    <h2 className="text-xl my-1 font-bold">Progress Tiap Workstation</h2>
                    <div className="flex max-w-full mt-2">
                        {/* <div className="w-1/2"> */}
                        {/* <h3 className="text-base">Workstation Sukosari, Candisewu</h3> */}
                        <div className='mt-2 max-w-full md:flex'>
                            <div className='px-5 md:w-1/2'>
                                <h2 className='my-1 text-xl font-bold'>
                                    {t('pages.dashboard.index.progress_workshops')}
                                </h2>
                                <h3 className='text-base'>Workshop Sukosari, Candisewu</h3>
                                <ChartContainer
                                    config={chartConfigTrainset}
                                    className='mt-5 h-[300px] w-full'
                                >
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
                                        <Bar
                                            radius={4}
                                            fill='var(--color-material_in_transit)'
                                            dataKey='material_in_transit'
                                        />
                                        <Bar
                                            radius={4}
                                            fill='var(--color-material_accepted)'
                                            dataKey='material_accepted'
                                        />
                                        <Bar
                                            radius={4}
                                            fill='var(--color-pending)'
                                            dataKey='pending'
                                        />
                                    </BarChart>
                                </ChartContainer>
                            </div>

                            <div className='md:px-5'>
                                <h2 className='my-1 text-xl font-bold'>
                                    {t('pages.dashboard.index.progress_panels')}
                                </h2>
                                <h3 className='text-base'>
                                    {t('pages.dashboard.index.panels_title')}
                                </h3>

                                <ChartContainer
                                    config={chartConfigTrainset}
                                    className='text- mt-5 h-[400px] w-[300px] md:h-[400px] md:w-[90%]'
                                >
                                    <BarChart data={data['panel']} accessibilityLayer>
                                        <CartesianGrid vertical={false} />
                                        <YAxis type='number' dataKey='in_progress'></YAxis>
                                        <XAxis
                                            tickMargin={15}
                                            tickLine={false}
                                            tickFormatter={(value) => value.slice(0, 20)}
                                            textAnchor='end'
                                            height={110}
                                            dataKey='name'
                                            axisLine={false}
                                            angle={-55}
                                        />
                                        <ChartTooltip content={<ChartTooltipContent />} />
                                        <ChartLegend content={<ChartLegendContent />} />
                                        <Bar
                                            radius={4}
                                            fill='var(--color-in_progress)'
                                            dataKey='in_progress'
                                        />
                                        <Bar radius={4} fill='var(--color-done)' dataKey='done' />
                                        <Bar
                                            radius={4}
                                            fill='var(--color-material_in_transit)'
                                            dataKey='material_in_transit'
                                        />
                                        <Bar
                                            radius={4}
                                            fill='var(--color-pending)'
                                            dataKey='pending'
                                        />
                                        <Bar
                                            radius={4}
                                            fill='var(--color-material_accepted)'
                                            dataKey='material_accepted'
                                        />
                                    </BarChart>
                                </ChartContainer>
                            </div>
                        </div>
                        <h2 className='my-1 text-xl font-bold'>
                            {t('pages.dashboard.index.all_workstations')}
                        </h2>
                        <h3 className='text-base'>{t('pages.dashboard.index.workstations_sub')}</h3>
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
                </div>
            </div>
            {/* </div> */}
        </AuthenticatedLayout>
    );
}
