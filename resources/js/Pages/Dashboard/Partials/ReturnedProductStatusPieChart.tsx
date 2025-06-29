import {
    ChartConfig,
    ChartContainer,
    ChartLegend,
    ChartTooltip,
    ChartTooltipContent,
} from '@/Components/UI/chart';
import { ROUTES } from '@/Support/Constants/routes';
import { IntentEnum } from '@/Support/Enums/intentEnum';
import {
    ReturnedProductStatusPieChartInterface,
    ServiceFilterOptions,
} from '@/Support/Interfaces/Others';
import { withLoading } from '@/Utils/withLoading';
import { useLaravelReactI18n } from 'laravel-react-i18n';
import { useEffect, useState } from 'react';
import { Cell, Pie, PieChart } from 'recharts';

export default function ({
    data,
    localizedStatuses,
    filters,
}: {
    data: { name: string; value: number }[];
    localizedStatuses: Record<string, string>;
    filters: ServiceFilterOptions;
}) {
    const { t } = useLaravelReactI18n();
    const [currentFilter, setCurrentFilter] = useState(filters);

    const [returnedProductStatusConfig, setReturnedProductStatusConfig] = useState<ChartConfig>({
        done: {
            label: localizedStatuses.done || 'Selesai',
            color: 'hsl(var(--chart-1))',
        },
        progress: {
            label: localizedStatuses.progress || 'Dalam Proses',
            color: 'hsl(var(--chart-2))',
        },
        draft: {
            label: localizedStatuses.draft || 'Draf',
            color: 'hsl(var(--chart-3))',
        },
        requested: {
            label: localizedStatuses.requested || 'Diminta',
            color: 'hsl(var(--chart-4))',
        },
        scrapped: {
            label: localizedStatuses.scrapped || 'Discrap',
            color: 'hsl(var(--chart-5))',
        },
    });

    const [returnedProductStatusPieChart, setReturnedProductStatusPieChart] =
        useState<ReturnedProductStatusPieChartInterface>({
            data: data,
            config: Object.fromEntries(
                Object.entries(returnedProductStatusConfig).filter(([key]) =>
                    filters.useMerged ? !['requested', 'scrapped'].includes(key) : true,
                ),
            ),
        });

    const syncReturnedProductStatusData = withLoading(async () => {
        console.log('syncReturnedProductStatusData', currentFilter, filters);
        if (
            data === returnedProductStatusPieChart.data &&
            returnedProductStatusPieChart.config.done.label === localizedStatuses.done &&
            currentFilter === filters
        )
            return;
        console.log('tembuscot');
        setCurrentFilter(filters);
        const res = await window.axios.get(
            route(`${ROUTES.DASHBOARD}`, {
                use_merged: filters.useMerged,
                intent: IntentEnum.WEB_DASHBOARD_GET_RETURNED_PRODUCT_STATUS_SUMMARY,
                year: filters.returned_product?.year,
                month: filters.returned_product?.month,
            }),
        );
        setReturnedProductStatusPieChart({
            data: res.data,
            config: Object.fromEntries(
                Object.entries(returnedProductStatusConfig).filter(([key]) =>
                    filters.useMerged ? !['requested', 'scrapped'].includes(key) : true,
                ),
            ),
        });
    });

    const renderLegendContentFormat = (value: string, entry: any, index: number) => {
        return (
            <span className='text-foreground'>
                {returnedProductStatusPieChart.config[value].label}
            </span>
        );
    };

    useEffect(() => {
        console.log('returnedProductStatusPieChart');
        syncReturnedProductStatusData();
    }, [
        filters.useMerged,
        filters.returned_product.year,
        filters.returned_product.month,
        localizedStatuses,
    ]);

    return (
        <ChartContainer
            config={returnedProductStatusPieChart.config}
            className='mt-1 h-[300px] w-full'
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
                                            className='h-2.5 w-2.5 shrink-0 rounded-[2px] border-[--color-border] bg-[--color-bg]'
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
                    verticalAlign='middle'
                    layout='vertical'
                    formatter={renderLegendContentFormat}
                />
                <Pie dataKey='value' data={returnedProductStatusPieChart.data}>
                    {returnedProductStatusPieChart.data.map((entry, index) => (
                        <Cell
                            key={`returnedProductStatus-${entry.name}-key`}
                            fill={`var(--color-${entry.name})`}
                        />
                    ))}
                </Pie>
            </PieChart>
        </ChartContainer>
    );
}
