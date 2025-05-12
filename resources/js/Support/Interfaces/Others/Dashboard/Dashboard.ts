import { ChartConfig } from "@/Components/UI/chart";

interface AttachmentStatusOfTrainsetResource {
    trainset_name: string;
    progress: { status: string; count: number }[];
}
interface AttachmentStatusOfWorkstationResource {
    workstation_name: string;
    progress: { status: string; count: number }[];
}
interface ReturnedProductTimeDiffResource {
    year_month: string;
    avg_duration: string;
    total_returned: number;
    total_problem: number;
}
interface ReturnedProductTimeMinMaxResource {
    year_month: string;
    min_duration: number;
    min_duration_formatted: string;
    max_duration: number;
    max_duration_formatted: string;
}

interface AttachmentStatusBarChartInterface {
    data?: AttachmentStatusOfTrainsetResource[];
    config: ChartConfig;
}
interface WorkstationStatusBarChartInterface {
    data?: AttachmentStatusOfWorkstationResource[];
    config: ChartConfig;
}
interface ReturnedProductStatusPieChartInterface {
    data: { name: string; value: number }[];
    config: ChartConfig;
}
interface ReturnedProductTimeLineChartInterface {
    data: ReturnedProductTimeMinMaxResource[];
    config: ChartConfig;
}

export type {
    AttachmentStatusOfTrainsetResource,
    AttachmentStatusOfWorkstationResource,
    ReturnedProductTimeDiffResource,
    ReturnedProductTimeMinMaxResource,
    AttachmentStatusBarChartInterface,
    WorkstationStatusBarChartInterface,
    ReturnedProductStatusPieChartInterface,
    ReturnedProductTimeLineChartInterface
}