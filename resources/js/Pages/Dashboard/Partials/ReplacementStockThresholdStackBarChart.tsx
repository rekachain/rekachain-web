import { ChartConfig, ChartContainer, ChartLegend, ChartTooltip } from '@/Components/UI/chart';
import { ROUTES } from '@/Support/Constants/routes';
import { IntentEnum } from '@/Support/Enums/intentEnum';
import { ServiceFilterOptions } from '@/Support/Interfaces/Others';
import { ReplacementStockResource } from '@/Support/Interfaces/Resources';
import { withLoading } from '@/Utils/withLoading';
import { useLaravelReactI18n } from 'laravel-react-i18n';
import { useEffect, useState } from 'react';
import { Bar, BarChart, CartesianGrid, Cell, XAxis, YAxis } from 'recharts';

export default function ({
    data,
    filters,
}: {
    data: ReplacementStockResource[];
    filters: ServiceFilterOptions;
}) {
    const { t, currentLocale } = useLaravelReactI18n();
    const [currentFilter, setCurrentFilter] = useState(filters);
    const [currentChartLocale, setCurrentChartLocale] = useState(currentLocale());

    const [replacementStockChart, setReplacementStockChart] = useState<{
        data: ReplacementStockResource[];
        config: ChartConfig;
    }>({
        data: data,
        config: {
            qty: {
                label: t(
                    'pages.dashboard.partials.replacement_stock_threshold_stack_bar_chart.label.qty',
                ),
                color: 'hsl(var(--chart-1))',
            },
            threshold: {
                label: t(
                    'pages.dashboard.partials.replacement_stock_threshold_stack_bar_chart.label.threshold',
                ),
                color: 'hsl(var(--chart-2))',
            },
            warning: {
                label: 'Warning',
                color: 'hsl(var(--chart-3))',
            },
        },
    });

    const syncStockChart = withLoading(async () => {
        if (
            data === replacementStockChart.data &&
            currentFilter === filters &&
            currentChartLocale === currentLocale()
        )
            return;
        setCurrentFilter(filters);
        setCurrentChartLocale(currentLocale());
        const res = await window.axios.get(
            route(`${ROUTES.DASHBOARD}`, {
                intent: IntentEnum.WEB_DASHBOARD_GET_REPLACEMENT_STOCK,
            }),
        );
        setReplacementStockChart({
            data: res.data,
            config: {
                qty: {
                    label: t(
                        'pages.dashboard.partials.replacement_stock_threshold_stack_bar_chart.label.qty',
                    ),
                    color: replacementStockChart.config.qty.color,
                },
                threshold: {
                    label: t(
                        'pages.dashboard.partials.replacement_stock_threshold_stack_bar_chart.label.threshold',
                    ),
                    color: replacementStockChart.config.threshold.color,
                },
                warning: {
                    label: replacementStockChart.config.warning.label,
                    color: replacementStockChart.config.warning.color,
                },
            },
        });
    });

    const toPercent = (decimal: number, fixed = 0) => {
        return `${(decimal * 100).toFixed(fixed)}%`;
    };

    const renderChartTooltipContent = ({ payload, label }: any) => {
        const qty = payload.map((entry: any) => entry.value)[0];
        const threshold = payload.map((entry: any) => entry.value)[1];
        return (
            <div className='grid min-w-[8rem] items-start gap-1.5 rounded-lg border border-border/50 bg-background px-2.5 py-1.5 text-xs shadow-xl'>
                <p className=''>{`${label} ${threshold > qty ? `(${t('pages.dashboard.partials.replacement_stock_threshold_stack_bar_chart.tooltip.need_restock')})` : ''}`}</p>
                <ul className='list'>
                    {payload.map((entry: any, index: number) => (
                        <li
                            key={`item-${index}`}
                            className='flex items-center justify-between gap-1.5'
                        >
                            <div className='flex items-center gap-1.5'>
                                <div
                                    style={{
                                        backgroundColor:
                                            index == 1 && threshold > qty
                                                ? replacementStockChart.config.warning.color
                                                : entry.color,
                                    }}
                                    className='h-2 w-2 shrink-0 rounded-[2px]'
                                />
                                <span className='text-foreground'>
                                    {replacementStockChart.config[entry.dataKey].label}
                                </span>
                            </div>
                            <span className='text-foreground'>{`${entry.value}`}</span>
                        </li>
                    ))}
                </ul>
            </div>
        );
    };

    const renderLegendContentFormat = (value: string, entry: any, index: number) => {
        return <span className='text-foreground'>{replacementStockChart.config[value].label}</span>;
    };

    useEffect(() => {
        syncStockChart();
    }, [currentLocale]);

    return (
        <ChartContainer config={replacementStockChart.config} className='mt-5 h-[400px] w-full'>
            <BarChart
                stackOffset='expand'
                // layout='vertical'
                data={replacementStockChart.data}
                accessibilityLayer
            >
                <CartesianGrid vertical={false} />
                <YAxis type='number' tickFormatter={(value) => toPercent(value, 0)} />
                <XAxis
                    type='category'
                    tickMargin={10}
                    tickLine={false}
                    textAnchor='end'
                    height={150}
                    dataKey='component.name'
                    axisLine={false}
                    angle={-55}
                />
                {/* <ChartTooltip content={<ChartTooltipContent />} /> */}
                <ChartTooltip content={renderChartTooltipContent} />
                <ChartLegend
                    verticalAlign='top'
                    height={25}
                    formatter={renderLegendContentFormat}
                />
                <Bar
                    type='monotone'
                    stackId='1'
                    key={`replacementStock-qty-key`}
                    fill={`var(--color-qty)`}
                    dataKey={'qty'}
                />
                <Bar
                    type='monotone'
                    stackId='1'
                    key={`replacementStock-threshold-key`}
                    fill={`var(--color-threshold)`}
                    dataKey={'threshold'}
                >
                    {replacementStockChart.data.map((entry, index) => (
                        <Cell
                            key={`cell-${index}`}
                            fill={
                                entry.threshold > entry.qty
                                    ? 'var(--color-warning)'
                                    : 'var(--color-threshold)'
                            }
                        />
                    ))}
                </Bar>
            </BarChart>
        </ChartContainer>
    );
}
