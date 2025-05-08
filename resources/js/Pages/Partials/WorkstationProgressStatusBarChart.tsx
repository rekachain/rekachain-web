import { ChartConfig, ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from '@/Components/UI/chart';
import { ROUTES } from '@/Support/Constants/routes';
import { IntentEnum } from '@/Support/Enums/intentEnum';
import { AttachmentStatusBarChartInterface, AttachmentStatusOfWorkstationResource } from '@/Support/Interfaces/Others';
import { withLoading } from '@/Utils/withLoading';
import { useLaravelReactI18n } from 'laravel-react-i18n';
import { useEffect, useState } from 'react';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';

export default function ({
    localizedStatuses,
    dateFilter,
    trainsetFilter,
    useMerged
}: {
    localizedStatuses: Record<string, string>
    dateFilter?: any
    trainsetFilter?: any
    useMerged?: boolean
}) {
    const { t } = useLaravelReactI18n();
    const [workstationStatusFilter, setWorkstationStatusFilter] = useState(
        {},
    );
    
    const [workstationProgressStatusConfig, setWorkstationProgressStatusConfig] = useState<ChartConfig>({
        done: {
            label: localizedStatuses.done || 'Selesai',
            color: 'hsl(var(--chart-1))',
        },
        in_progress: {
            label: localizedStatuses.in_progress || 'Progress',
            color: 'hsl(var(--chart-2))',
        },
        pending: {
            label: localizedStatuses.pending || 'Pending',
            color: 'hsl(var(--chart-3))',
        },
        material_in_transit: {
            label: localizedStatuses.material_in_transit || 'Material In Transit',
            color: 'hsl(var(--chart-4))',
        },
        material_accepted: {
            label: localizedStatuses.material_accepted || 'Material Accepted',
            color: 'hsl(var(--chart-5))',
        },
    });

    const [workstationProgressStatusChart, setWorkstationProgressStatusChart] =
        useState<AttachmentStatusBarChartInterface>({
            // data: returnedProductStatusData || [],
            config: Object.fromEntries(
                Object.entries(workstationProgressStatusConfig).filter(([key]) =>
                    useMerged ? !['material_in_transit', 'material_accepted'].includes(key) : true,
                ),
            ),
    })

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
                                    {workstationProgressStatusConfig[entry.dataKey].label}
                                </span>
                            </div>
                            <span className='text-foreground'>{`${entry.value} (${getPercent(entry.value, total)})`}</span>
                        </li>
                    ))}
                </ul>
            </div>
        );
    };

    const syncStatusChart = async () => {
        const res = await window.axios.get(
            route(`${ROUTES.DASHBOARD}`, {
                use_merged: useMerged,
                intent: IntentEnum.WEB_DASHBOARD_GET_WORKSTATION_STATUS,
            }),
        );
        setWorkstationProgressStatusChart({
            data: res.data.map(
                ({ workstation_name, progress }: AttachmentStatusOfWorkstationResource) => ({
                    workstation_name,
                    ...progress.reduce(
                        (acc, { status, count }) => ({ ...acc, [status]: count }),
                        {},
                    ),
                }),
            ),
            config: Object.fromEntries(
                Object.entries(workstationProgressStatusConfig).filter(([key]) =>
                    useMerged ? !['material_in_transit', 'material_accepted'].includes(key) : true,
                ),
            ),
        });
    }

    useEffect(() => {
        setWorkstationProgressStatusConfig({
            done: {
                label: localizedStatuses.done || 'Selesai',
                color: workstationProgressStatusConfig.done.color,
            },
            in_progress: {
                label: localizedStatuses.in_progress || 'Progress',
                color: workstationProgressStatusConfig.in_progress.color,
            },
            pending: {
                label: localizedStatuses.pending || 'Pending',
                color: workstationProgressStatusConfig.pending.color,
            },
            material_in_transit: {
                label: localizedStatuses.material_in_transit || 'Material In Transit',
                color: workstationProgressStatusConfig.material_in_transit.color,
            },
            material_accepted: {
                label: localizedStatuses.material_accepted || 'Material Accepted',
                color: workstationProgressStatusConfig.material_accepted.color,
            },
        });
    }, [localizedStatuses]);

    useEffect(() => {
        syncStatusChart();
    }, [useMerged, workstationStatusFilter, workstationProgressStatusConfig]);

    useEffect(() => {
        setWorkstationStatusFilter({
            relation_column_filters: { trainset: { id: trainsetFilter?.id } },
        });
    }, [trainsetFilter]);

    return (
        <ChartContainer
            config={workstationProgressStatusChart.config}
            className='mt-5 h-[300px] w-full'
        >
            <BarChart
                stackOffset='expand'
                layout='vertical'
                data={workstationProgressStatusChart.data}
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
                {Object.keys(workstationProgressStatusChart.config).map(
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
    );
}
