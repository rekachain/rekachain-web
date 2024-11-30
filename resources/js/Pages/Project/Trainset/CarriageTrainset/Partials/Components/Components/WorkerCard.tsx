import { Card, CardContent, CardHeader, CardTitle } from '@/Components/UI/card';
import { DetailWorkerAcceptanceStatusEnum } from '@/Support/Enums/DetailWorkerAcceptanceStatusEnum';
import { DetailWorkerWorkStatusEnum } from '@/Support/Enums/DetailWorkerWorkStatusEnum';
import {
    DetailWorkerPanelResource,
    DetailWorkerTrainsetResource,
} from '@/Support/Interfaces/Resources';
import { useLaravelReactI18n } from 'laravel-react-i18n';

export default function ({
    detailWorker,
}: {
    detailWorker: DetailWorkerTrainsetResource | DetailWorkerPanelResource;
}) {
    const { t } = useLaravelReactI18n();

    return (
        <Card className='dark:bg-background-dark rounded-lg bg-background shadow-lg'>
            <CardHeader className='pb-2'>
                <CardTitle className='text-lg font-bold text-black dark:text-white'>
                    {detailWorker.worker?.name}
                </CardTitle>
                <small className='text-sm text-gray-600 dark:text-gray-300'>
                    {t(
                        'pages.project.trainset.carriage_trainset.partials.components.components.worker_card.worker_identification',
                        { worker_identification: detailWorker.worker?.nip ?? 'N/A🗿' },
                    )}
                </small>
            </CardHeader>
            <CardContent className='flex flex-col gap-1'>
                <p className='text-sm'>
                    {t(
                        'pages.project.trainset.carriage_trainset.partials.components.components.worker_card.acceptance_status',
                    )}
                    :{' '}
                    <span
                        className={
                            detailWorker.acceptance_status ===
                            DetailWorkerAcceptanceStatusEnum.ACCEPTED
                                ? 'text-green-500'
                                : detailWorker.acceptance_status ===
                                    DetailWorkerAcceptanceStatusEnum.DECLINED
                                  ? 'text-red-500'
                                  : ''
                        }
                    >
                        {detailWorker.acceptance_status ?? 'N/A🗿'}
                    </span>
                </p>
                <p className='text-sm'>
                    {t(
                        'pages.project.trainset.carriage_trainset.partials.components.components.worker_card.work_status',
                    )}
                    :{' '}
                    <span
                        className={
                            detailWorker.work_status === DetailWorkerWorkStatusEnum.COMPLETED
                                ? 'text-green-500'
                                : 'text-yellow-500'
                        }
                    >
                        {detailWorker.work_status}
                    </span>
                </p>
                <div className="flex flex-col gap-1">
                    <p className="text-sm">{t('pages.project.trainset.carriage_trainset.partials.components.components.worker_card.start_at')}:</p>
                    <p className="text-sm">{detailWorker.created_at}</p>
                </div>
            </CardContent>
        </Card>
    );
}
