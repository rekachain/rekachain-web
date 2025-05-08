import { ChartConfig, ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from '@/Components/UI/chart';
import { fetchEnumLabels } from '@/Helpers/enumHelper';
import { ROUTES } from '@/Support/Constants/routes';
import { ReturnedProductStatusPieChartInterface } from '@/Support/Interfaces/Others';
import { withLoading } from '@/Utils/withLoading';
import { useForm } from '@inertiajs/react';
import { useLaravelReactI18n } from 'laravel-react-i18n';
import { useEffect, useState } from 'react';
import { Cell, Pie, PieChart } from 'recharts';

export default function ({
    returnedProductStatusData,
    localizedStatuses,
    dateFilter
}: {
    returnedProductStatusData: any
    localizedStatuses: Record<string, string>
    dateFilter?: any
}) {
    const { t } = useLaravelReactI18n();
    
    const [returnedProductStatusConfig, setReturnedProductStatusConfig] = useState<ChartConfig>({
        requested: {
            label: localizedStatuses.requested || 'Diminta',
            color: 'hsl(var(--chart-1))',
        },
        draft: {
            label: localizedStatuses.draft || 'Draf',
            color: 'hsl(var(--chart-2))',
        },
        progress: {
            label: localizedStatuses.progress || 'Dalam Proses',
            color: 'hsl(var(--chart-3))',
        },
        done: {
            label: localizedStatuses.done || 'Selesai',
            color: 'hsl(var(--chart-4))',
        },
        scrapped: {
            label: localizedStatuses.scrapped || 'Discrap',
            color: 'hsl(var(--chart-5))',
        },
    });

    const [returnedProductStatusPieChart, setReturnedProductStatusPieChart] =
        useState<ReturnedProductStatusPieChartInterface>({
            data: returnedProductStatusData || [],
            config: returnedProductStatusConfig
    })

    const { data, setData } = useForm<{
        file: File | null;
        buyer_id: number | null;
    }>({
        file: null,
        buyer_id: null,
    });

    const syncReturnedProductStatusChart = () => {
        setReturnedProductStatusPieChart({
            data: returnedProductStatusData || [],
            config: returnedProductStatusConfig,
        });
    }

    const syncReturnedProductStatusData =  withLoading( async() => {
        const res = await window.axios.get(
            route(`${ROUTES.DASHBOARD}`, {
                year: dateFilter.year,
                month: dateFilter.month,
            })
        )
        setReturnedProductStatusPieChart({
            data: res.data.returned_product_status,
            config: returnedProductStatusConfig,
        });
    })

    useEffect(() => {
        syncReturnedProductStatusData();
    }, [dateFilter.year, dateFilter.month]);

    useEffect(() => {
        setReturnedProductStatusConfig({
            requested: {
                label: localizedStatuses.requested || 'Diminta',
                color: 'hsl(var(--chart-1))',
            },
            draft: {
                label: localizedStatuses.draft || 'Draf',
                color: 'hsl(var(--chart-2))',
            },
            progress: {
                label: localizedStatuses.progress || 'Dalam Proses',
                color: 'hsl(var(--chart-3))',
            },
            done: {
                label: localizedStatuses.done || 'Selesai',
                color: 'hsl(var(--chart-4))',
            },
            scrapped: {
                label: localizedStatuses.scrapped || 'Discrap',
                color: 'hsl(var(--chart-5))',
            },
        });
    }, [localizedStatuses]);

    useEffect(() => {
        syncReturnedProductStatusChart();
    }, [returnedProductStatusConfig]);

    return (
        <ChartContainer
            config={returnedProductStatusPieChart.config}
            className='mt-5 h-[300px] w-full'
        >
            <PieChart>
                <ChartTooltip
                    content={
                        <ChartTooltipContent
                            // hideIndicator={true}
                            formatter={(value, name) => {
                                const total = returnedProductStatusPieChart.data.reduce((result, entry) => result + entry.value, 0);
                                const percent = ((Number(value) / total) * 100).toFixed(2);
                                    return (
                                        <>
                                            <div 
                                                className="shrink-0 rounded-[2px] border-[--color-border] bg-[--color-bg] h-2.5 w-2.5" 
                                                style={
                                                    { 
                                                        '--color-bg': returnedProductStatusConfig[name].color, 
                                                        '--color-border': returnedProductStatusConfig[name].color 
                                                    } as React.CSSProperties}>
                                                
                                            </div>
                                            <span className="">
                                                {`${returnedProductStatusConfig[name].label}: ${value} (${percent}%)`}
                                            </span>
                                        </>
                                    );
                            }}
                        />
                    }
                />
                <ChartLegend content={<ChartLegendContent />} />
                <Pie data={returnedProductStatusPieChart.data} dataKey="value">
                    {Object.keys(returnedProductStatusPieChart.config).map((dataKey, index) => (
                        <Cell
                            key={`returnedProductStatus-${index}-key`}
                            fill={`var(--color-${dataKey})`}
                        />
                    ))}
                </Pie>
            </PieChart>
        </ChartContainer>
    );
}
