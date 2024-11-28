import { Card, CardContent, CardHeader, CardTitle } from "@/Components/UI/card";
import { DetailWorkerAcceptanceStatusEnum } from "@/Support/Enums/DetailWorkerAcceptanceStatusEnum";
import { DetailWorkerWorkStatusEnum } from "@/Support/Enums/DetailWorkerWorkStatusEnum";
import { DetailWorkerPanelResource, DetailWorkerTrainsetResource } from "@/Support/Interfaces/Resources";
import { useLaravelReactI18n } from "laravel-react-i18n";

export default function ({ 
    detailWorker,
}: { 
    detailWorker: DetailWorkerTrainsetResource | DetailWorkerPanelResource,
}) {
    const { t } = useLaravelReactI18n();

    return (
        <Card className="bg-background dark:bg-background-dark rounded-lg shadow-lg">
            <CardHeader className="pb-2">
                <CardTitle className="text-lg font-bold text-black dark:text-white">{detailWorker.worker?.name}</CardTitle>
                <small className="text-sm text-gray-600 dark:text-gray-300">NIP: {detailWorker.worker?.nip}</small>
            </CardHeader>
            <CardContent className="flex flex-col gap-1">
                <p className="text-sm">
                    Acceptance Status: <span className={detailWorker.acceptance_status === DetailWorkerAcceptanceStatusEnum.ACCEPTED ? 'text-green-500' : detailWorker.acceptance_status === DetailWorkerAcceptanceStatusEnum.DECLINED ? 'text-red-500' : ''}>{detailWorker.acceptance_status ?? 'N/A🗿'}</span>
                </p>
                <p className="text-sm">
                    Work Status: <span className={detailWorker.work_status === DetailWorkerWorkStatusEnum.COMPLETED ? 'text-green-500' : 'text-yellow-500'}>{detailWorker.work_status}</span>
                </p>
                <div className="flex flex-col gap-1">
                    <p className="text-sm">Started At:</p>
                    {/* <p className="text-sm">{detailWorker.created_at}</p> not work💀*/}
                    <p className="text-sm">
                        {new Intl.DateTimeFormat('en-US', {
                            year: 'numeric',
                            month: '2-digit',
                            day: '2-digit',
                            hour: '2-digit',
                            minute: '2-digit',
                            second: '2-digit',
                        }).format(new Date(detailWorker.created_at))}
                    </p>
                </div>
            </CardContent>
        </Card>
    );
}
