import { Card, CardContent, CardHeader, CardTitle } from '@/Components/UI/card';
import { DetailWorkerWorkStatusEnum } from '@/Support/Enums/DetailWorkerWorkStatusEnum';
import { StepResource } from '@/Support/Interfaces/Resources';
import { useLaravelReactI18n } from 'laravel-react-i18n';

export default function ({
    step,
}: {
    step: StepResource & {
        work_status: string | null;
        localized_work_status: string | null;
    };
}) {
    const { t } = useLaravelReactI18n();

    const getStatusColor = (status: any) => {
        switch (status) {
            case 'completed':
                return 'bg-tertiary text-black';
            case 'in_progress':
                return 'bg-warning text-black';
            case 'failed':
                return 'bg-destructive text-black';
            default:
                return 'bg-background dark:bg-background-dark border border-gray-300'; // Neutral background
        }
    };

    return (
        <Card className={`${getStatusColor(step.work_status)}`}>
            <CardHeader className='pb-1'>
                <CardTitle className='text-sm'>{(step as unknown as StepResource).name}</CardTitle>
            </CardHeader>
            <CardContent className='flex flex-col gap-1'>
                <p className='text-sm'>{(step as unknown as StepResource).process}</p>
                <small className='text-xs'>
                    {t(
                        'pages.project.trainset.carriage_trainset.partials.components.components.worker_step_card.step_status',
                    )}
                    :{' '}
                    {step.work_status !== null
                        ? step.localized_work_status
                        : t('enums.others.null_work_status')}
                </small>
            </CardContent>
        </Card>
    );
}
