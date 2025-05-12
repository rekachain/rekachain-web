import { ChartConfig, ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from '@/Components/UI/chart';
import { ScrollArea } from '@/Components/UI/scroll-area';
import { ROUTES } from '@/Support/Constants/routes';
import { IntentEnum } from '@/Support/Enums/intentEnum';
import { AttachmentStatusBarChartInterface, AttachmentStatusOfTrainsetResource, ServiceFilterOptions } from '@/Support/Interfaces/Others';
import { withLoading } from '@/Utils/withLoading';
import { useLaravelReactI18n } from 'laravel-react-i18n';
import { useEffect, useState } from 'react';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';

export default function ({
    data,
    localizedStatuses,
    filters,
}: {
    data: AttachmentStatusOfTrainsetResource[]
    localizedStatuses: Record<string, string>
    filters: ServiceFilterOptions
}) {
    const { t } = useLaravelReactI18n();
    const [currentFilters, setCurrentFilters] = useState(filters);
    const [trainsetStatusFilter, setTrainsetStatusFilter] = useState({
        column_filters: {
            project_id: filters.project_id || 1
        }
    });
    
    const [trainsetProgressStatusConfig, setTrainsetProgressStatusConfig] = useState<ChartConfig>({
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

    const [trainsetProgressStatusChart, setTrainsetProgressStatusChart] =
        useState<AttachmentStatusBarChartInterface>({
            data: data,
            config: Object.fromEntries(
                Object.entries(trainsetProgressStatusConfig).filter(([key]) =>
                    filters?.useMerged ? !['material_in_transit', 'material_accepted'].includes(key) : true,
                ),
            ),
    })

    const syncStatusChart = withLoading(async () => {
        if (data === trainsetProgressStatusChart.data && trainsetProgressStatusChart.config.done.label === localizedStatuses.done && currentFilters === filters) return;
        setCurrentFilters(filters);
        const res = await window.axios.get(
            route(`${ROUTES.DASHBOARD}`, {
                use_merged: filters?.useMerged,
                intent: IntentEnum.WEB_DASHBOARD_GET_TRAINSET_ATTACHMENT_STATUS,
                attachment_status_of_trainset_filter: trainsetStatusFilter,
            }),
        );
        setTrainsetProgressStatusChart({
            data: res.data.map(
                ({ trainset_name, progress }: AttachmentStatusOfTrainsetResource) => ({
                    trainset_name,
                    ...progress.reduce(
                        (acc, { status, count }) => ({ ...acc, [status]: count }),
                        {},
                    ),
                }),
            ),
            config: Object.fromEntries(
                Object.entries(trainsetProgressStatusConfig).filter(([key]) =>
                    filters?.useMerged ? !['material_in_transit', 'material_accepted'].includes(key) : true,
                ),
            ),
        });
    })

    useEffect(() => {
        setTrainsetProgressStatusConfig({
            done: {
                label: localizedStatuses.done || 'Selesai',
                color: trainsetProgressStatusConfig.done.color,
            },
            in_progress: {
                label: localizedStatuses.in_progress || 'Progress',
                color: trainsetProgressStatusConfig.in_progress.color,
            },
            pending: {
                label: localizedStatuses.pending || 'Pending',
                color: trainsetProgressStatusConfig.pending.color,
            },
            material_in_transit: {
                label: localizedStatuses.material_in_transit || 'Material In Transit',
                color: trainsetProgressStatusConfig.material_in_transit.color,
            },
            material_accepted: {
                label: localizedStatuses.material_accepted || 'Material Accepted',
                color: trainsetProgressStatusConfig.material_accepted.color,
            },
        });
    }, [localizedStatuses]);

    useEffect(() => {
        syncStatusChart();
    }, [filters.useMerged, trainsetStatusFilter, trainsetProgressStatusConfig]);

    useEffect(() => {
        setTrainsetStatusFilter({
            column_filters: { project_id: filters.project_id || 1 },
        });
    }, [filters.trainset_id, filters.project_id]);

    if (!trainsetProgressStatusChart.data!.length) {
        return <div className="h-[300px] w-full flex justify-center items-center">Data Kosong</div>
    }

    return (
        <ChartContainer config={trainsetProgressStatusChart.config} className="h-[300px] w-full pr-10">
            <BarChart accessibilityLayer data={trainsetProgressStatusChart.data}>
                <CartesianGrid vertical={false} />
                <YAxis type="number" dataKey="done" tickLine={false} tickMargin={10} axisLine={false} />
                <XAxis
                    dataKey="trainset_name"
                    tickLine={false}
                    tickMargin={10}
                    axisLine={false}
                    tickFormatter={value => value.slice(0, 6)}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <ChartLegend content={<ChartLegendContent />} />
                {Object.keys(trainsetProgressStatusChart.config).map(dataKey => (
                    <Bar key={`trainsetPanelStatus-${dataKey}-key`} dataKey={dataKey} fill={`var(--color-${dataKey})`} />
                ))}
            </BarChart>
        </ChartContainer>
    );
}
