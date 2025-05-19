import { ChartContainer, ChartLegend, ChartTooltip } from '@/Components/UI/chart';
import { ROUTES } from '@/Support/Constants/routes';
import { IntentEnum } from '@/Support/Enums/intentEnum';
import {
    ReturnedProductTimeLineChartInterface,
    ReturnedProductTimeMinMaxResource,
    ServiceFilterOptions,
} from '@/Support/Interfaces/Others';
import { withLoading } from '@/Utils/withLoading';
import { useLaravelReactI18n } from 'laravel-react-i18n';
import { useEffect, useState } from 'react';
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from 'recharts';

export default function ({
    data,
    filters,
}: {
    data: ReturnedProductTimeMinMaxResource[];
    filters: ServiceFilterOptions;
}) {
    const { t, setLocale, currentLocale } = useLaravelReactI18n();
    const [currentFilters, setCurrentFilters] = useState(filters);
    const [currentChartLocale, setCurrentChartLocale] = useState(currentLocale());

    const [lineChart, setLineChart] = useState<ReturnedProductTimeLineChartInterface>({
        data: data,
        config: {
            min_duration: {
                label: t(
                    'pages.dashboard.partials.returned_product_progress_time_min_max_chart.label.min_duration',
                ),
                color: 'hsl(var(--chart-1))',
            },
            max_duration: {
                label: t(
                    'pages.dashboard.partials.returned_product_progress_time_min_max_chart.label.max_duration',
                ),
                color: 'hsl(var(--chart-2))',
            },
        },
    });

    const syncDatas = withLoading(async () => {
        if (
            data === lineChart.data &&
            currentFilters === filters &&
            currentChartLocale === currentLocale()
        )
            return;
        setCurrentChartLocale(currentLocale());
        setCurrentFilters(filters);
        await window.axios
            .get(
                route(`${ROUTES.DASHBOARD}`, {
                    intent: IntentEnum.WEB_DASHBOARD_GET_RETURNED_PRODUCT_TIME_MIN_MAX,
                    ...filters,
                }),
            )
            .then((res) => {
                setLineChart({
                    data: res.data,
                    config: {
                        min_duration: {
                            label: t(
                                'pages.dashboard.partials.returned_product_progress_time_min_max_chart.label.min_duration',
                            ),
                            color: lineChart.config.min_duration.color,
                        },
                        max_duration: {
                            label: t(
                                'pages.dashboard.partials.returned_product_progress_time_min_max_chart.label.max_duration',
                            ),
                            color: lineChart.config.max_duration.color,
                        },
                    },
                });
            });
    });

    const renderWorkstationProgressTooltipContent = ({ payload, label }: any) => {
        return (
            <div className='grid min-w-[8rem] items-start gap-1.5 rounded-lg border border-border/50 bg-background px-2.5 py-1.5 text-xs shadow-xl'>
                <p className=''>{`${t('pages.dashboard.partials.returned_product_progress_time_min_max_chart.tooltip.title')}: ${label}`}</p>
                <ul className='list'>
                    {payload
                        .slice()
                        .reverse()
                        .map((entry: any, index: number) => (
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
                                        {`${index === 1 ? t('pages.dashboard.partials.returned_product_progress_time_min_max_chart.tooltip.min_duration') : t('pages.dashboard.partials.returned_product_progress_time_min_max_chart.tooltip.max_duration')}:`}
                                    </span>
                                </div>
                                <span className='text-foreground'>{`${index === 1 ? payload[index].payload.min_duration_formatted : payload[index].payload.max_duration_formatted}`}</span>
                            </li>
                        ))}
                </ul>
            </div>
        );
    };

    const renderLegendContentFormat = (value: string, entry: any, index: number) => {
        return <span className='text-foreground'>{lineChart.config[value].label}</span>;
    };
    const formatDuration = (seconds: number) => {
        const days = Math.floor(seconds / 86400);
        const hrs = Math.floor((seconds % 86400) / 3600);
        const mins = Math.floor((seconds % 3600) / 60);

        let result = '';
        if (days > 0) result += `${days}${currentLocale() === 'en' ? 'd' : 'h'} `;
        if (hrs > 0 || days > 0) result += `${hrs}${currentLocale() === 'en' ? 'h' : 'j'} `;
        result += `${mins}m`;

        return result;
    };

    useEffect(() => {
        syncDatas();
    }, [setLocale]);

    return (
        <ChartContainer config={lineChart.config} className='mt-5 h-[400px] w-full'>
            <LineChart data={lineChart.data}>
                <YAxis
                    tickFormatter={formatDuration}
                    // width={100}
                    domain={[0, 'dataMax']}
                />
                <XAxis textAnchor='end' height={110} dataKey='year_month' angle={-45} />
                <CartesianGrid />
                <ChartTooltip content={renderWorkstationProgressTooltipContent} />
                <ChartLegend
                    // content={<ChartLegendContent />}
                    wrapperStyle={{
                        top: 0,
                        right: 0,
                        // transform: 'translate(0, -50%)',
                        lineHeight: '24px',
                    }}
                    verticalAlign='middle'
                    layout='vertical'
                    formatter={renderLegendContentFormat}
                />
                <Line
                    type='monotone'
                    stroke={'var(--color-min_duration)'}
                    key={'returned_progress_line_min'}
                    dataKey={'min_duration'}
                />
                <Line
                    type='monotone'
                    stroke={'var(--color-max_duration)'}
                    key={'returned_progress_line_max'}
                    dataKey={'max_duration'}
                />
            </LineChart>
        </ChartContainer>
    );
}
