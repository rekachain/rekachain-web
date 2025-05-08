import { ChartConfig } from "@/Components/UI/chart";

interface AttachmentStatusOfTrainsetResource {
    trainset_name: string;
    progress: { status: string; count: number }[];
}
interface AttachmentStatusOfWorkstationResource {
    workstation_name: string;
    progress: { status: string; count: number }[];
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
    AttachmentStatusBarChartInterface,
    ReturnedProductStatusPieChartInterface,
}