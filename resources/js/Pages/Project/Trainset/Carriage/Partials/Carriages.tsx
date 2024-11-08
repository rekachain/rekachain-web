import { TrainsetResource } from '@/Support/Interfaces/Resources';
import { carriageTrainsetService } from '@/Services/carriageTrainsetService';
import { useSuccessToast } from '@/Hooks/useToast';
import { withLoading } from '@/Utils/withLoading';
import CarriageCardView from './Partials/CarriageCardView';
import CarriageTableView from './Partials/CarriageTableView';
import { useLaravelReactI18n } from 'laravel-react-i18n';

export default function ({
    trainset,
    handleSyncTrainset,
}: {
    trainset: TrainsetResource;
    handleSyncTrainset: () => Promise<void>;
}) {
    const { t } = useLaravelReactI18n();
    const handleCarriageDeletion = withLoading(async (carriageTrainsetId: number) => {
        await carriageTrainsetService.delete(carriageTrainsetId);
        await handleSyncTrainset();
        void useSuccessToast(t('pages.project.trainset.carriage.partials.carriages.messages.deleted'));
    }, true);

    return (
        <div className="space-y-4">
            <div className="hidden md:block">
                <CarriageTableView
                    handleSyncTrainset={handleSyncTrainset}
                    trainset={trainset}
                    handleCarriageDeletion={handleCarriageDeletion}
                ></CarriageTableView>
            </div>

            <div className="block md:hidden">
                <CarriageCardView
                    handleSyncTrainset={handleSyncTrainset}
                    trainset={trainset}
                    handleTrainsetDeletion={handleCarriageDeletion}
                ></CarriageCardView>
            </div>
        </div>
    );
}
