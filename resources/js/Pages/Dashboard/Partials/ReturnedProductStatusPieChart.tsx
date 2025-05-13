import { ChartConfig, ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from '@/Components/UI/chart';
import { ROUTES } from '@/Support/Constants/routes';
import { IntentEnum } from '@/Support/Enums/intentEnum';
import { ReturnedProductStatusPieChartInterface, ServiceFilterOptions } from '@/Support/Interfaces/Others';
import { withLoading } from '@/Utils/withLoading';
import { useLaravelReactI18n } from 'laravel-react-i18n';
import { useEffect, useState } from 'react';
import { Cell, Pie, PieChart } from 'recharts';

export default function ({
    data,
    localizedStatuses,
    filters
}: {
    data: { name: string; value: number }[]
    localizedStatuses: Record<string, string>
    filters?: ServiceFilterOptions
}) {
    const { t } = useLaravelReactI18n();
    const [currentFilter, setCurrentFilter] = useState(filters);
    
    const [returnedProductStatusConfig, setReturnedProductStatusConfig] = useState<ChartConfig>({
        requested: {
            label: localizedStatuses.requested || 'Diminta',
            color: 'hsl(var(--chart-4))',
        },
        draft: {
            label: localizedStatuses.draft || 'Draf',
            color: 'hsl(var(--chart-3))',
        },
        progress: {
            label: localizedStatuses.progress || 'Dalam Proses',
            color: 'hsl(var(--chart-2))',
        },
        done: {
            label: localizedStatuses.done || 'Selesai',
            color: 'hsl(var(--chart-1))',
        },
        scrapped: {
            label: localizedStatuses.scrapped || 'Discrap',
            color: 'hsl(var(--chart-5))',
        },
    });

    const [returnedProductStatusPieChart, setReturnedProductStatusPieChart] =
        useState<ReturnedProductStatusPieChartInterface>({
            data: data,
            config: returnedProductStatusConfig
    })

    const syncReturnedProductStatusChart = () => {
        setReturnedProductStatusPieChart({
            data: data,
            config: returnedProductStatusConfig,
        });
    }

    const syncReturnedProductStatusData =  withLoading( async() => {
        if (data === returnedProductStatusPieChart.data && returnedProductStatusPieChart.config.requested.label === localizedStatuses.requested && currentFilter === filters) return;
        setCurrentFilter(filters);
        const res = await window.axios.get(
            route(`${ROUTES.DASHBOARD}`, {
                intent: IntentEnum.WEB_DASHBOARD_GET_RETURNED_PRODUCT_STATUS_SUMMARY,
                year: filters?.returned_product.year,
                month: filters?.returned_product.month,
            })
        )
        setReturnedProductStatusPieChart({
            data: res.data,
            config: returnedProductStatusConfig,
        });
    })

    const renderLegendContentFormat = (value: string, entry: any, index: number) => {
        return (
            <span className='text-foreground'>{returnedProductStatusPieChart.config[value].label}</span>
        )
    }

    useEffect(() => {
        syncReturnedProductStatusData();
    }, [filters?.returned_product.year, filters?.returned_product.month]);

    useEffect(() => {
        setReturnedProductStatusConfig({
            requested: {
                label: localizedStatuses.requested,
                color: returnedProductStatusConfig.requested.color,
            },
            draft: {
                label: localizedStatuses.draft,
                color: returnedProductStatusConfig.draft.color,
            },
            progress: {
                label: localizedStatuses.progress,
                color: returnedProductStatusConfig.progress.color,
            },
            done: {
                label: localizedStatuses.done,
                color: returnedProductStatusConfig.done.color,
            },
            scrapped: {
                label: localizedStatuses.scrapped,
                color: returnedProductStatusConfig.scrapped.color,
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
                                const total = returnedProductStatusPieChart.data.reduce(
                                    (result, entry) => result + entry.value,
                                    0,
                                );
                                const percent = ((Number(value) / total) * 100).toFixed(2);
                                return (
                                    <>
                                        <div
                                            className='h-2.5 w-2.5 shrink-0 rounded-[2px] border-[--color-border] bg-[--color-bg]'
                                            style={
                                                {
                                                    '--color-bg':
                                                        returnedProductStatusPieChart.config[name]
                                                            .color,
                                                    '--color-border':
                                                        returnedProductStatusPieChart.config[name]
                                                            .color,
                                                } as React.CSSProperties
                                            }
                                        ></div>
                                        <span className=''>
                                            {`${returnedProductStatusPieChart.config[name].label}: ${value} (${percent}%)`}
                                        </span>
                                    </>
                                );
                            }}
                        />
                    }
                />
                <ChartLegend
                    // content={<ChartLegendContent />}
                    wrapperStyle={{
                        top: '50%',
                        left: '10%',
                        transform: 'translate(0, -50%)',
                        lineHeight: '24px',
                    }}
                    layout='vertical'
                    verticalAlign='middle'
                    formatter={renderLegendContentFormat}
                />
                <Pie data={returnedProductStatusPieChart.data} dataKey='value'>
                    {Object.keys(returnedProductStatusPieChart.config).map((dataKey) => (
                        <Cell
                            key={`returnedProductStatus-${dataKey}-key`}
                            fill={`var(--color-${dataKey})`}
                        />
                    ))}
                </Pie>
            </PieChart>
        </ChartContainer>
    );
}
