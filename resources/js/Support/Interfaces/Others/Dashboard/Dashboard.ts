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
}

interface AttachmentStatusBarChartInterface {
    data?: AttachmentStatusOfTrainsetResource[];
    config: ChartConfig;
}
interface ReturnedProductStatusPieChartInterface {
    data: { name: string; value: number }[];
    config: ChartConfig;
}

export type {
    AttachmentStatusOfTrainsetResource,
    AttachmentStatusOfWorkstationResource,
    ReturnedProductTimeDiffResource,
    AttachmentStatusBarChartInterface,
    ReturnedProductStatusPieChartInterface,
}