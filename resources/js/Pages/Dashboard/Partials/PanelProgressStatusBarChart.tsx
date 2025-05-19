import {
    ChartConfig,
    ChartContainer,
    ChartLegend,
    ChartLegendContent,
    ChartTooltip,
    ChartTooltipContent,
} from '@/Components/UI/chart';
import { ServiceFilterOptions } from '@/Support/Interfaces/Others';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';

export default function ({
    data,
    localizedStatuses,
    filters,
}: {
    data: any;
    localizedStatuses?: Record<string, string>;
    filters?: ServiceFilterOptions;
}) {
    const chartConfigTrainset = {
        done: {
            label: localizedStatuses?.done || 'Selesai',
            color: 'hsl(var(--chart-1))',
        },
        in_progress: {
            label: localizedStatuses?.in_progress || 'Progress',
            color: 'hsl(var(--chart-2))',
        },
        pending: {
            label: localizedStatuses?.pending || 'Pending',
            color: 'hsl(var(--chart-3))',
        },
        material_in_transit: {
            label: localizedStatuses?.material_in_transit || 'Material In Transit',
            color: 'hsl(var(--chart-4))',
        },
        material_accepted: {
            label: localizedStatuses?.material_accepted || 'Material Accepted',
            color: 'hsl(var(--chart-5))',
        },
    } satisfies ChartConfig;

    return (
        <ChartContainer
            config={chartConfigTrainset}
            className='text mt-5 h-[400px] w-[300px] md:h-[400px] md:w-[90%]'
        >
            <BarChart data={data} accessibilityLayer>
                <CartesianGrid vertical={false} />
                <YAxis type='number' dataKey='done'></YAxis>
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
                <Bar radius={4} fill='var(--color-in_progress)' dataKey='in_progress' />
                <Bar radius={4} fill='var(--color-done)' dataKey='done' />
                <Bar
                    radius={4}
                    fill='var(--color-material_in_transit)'
                    dataKey='material_in_transit'
                />
                <Bar radius={4} fill='var(--color-pending)' dataKey='pending' />
                <Bar radius={4} fill='var(--color-material_accepted)' dataKey='material_accepted' />
            </BarChart>
        </ChartContainer>
    );
}
