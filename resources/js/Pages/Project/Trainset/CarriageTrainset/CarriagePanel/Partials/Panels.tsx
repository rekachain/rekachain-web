import { CarriageTrainsetResource, TrainsetResource } from '@/Support/Interfaces/Resources';
import { carriagePanelService } from '@/Services/carriagePanelService';
import { useSuccessToast } from '@/Hooks/useToast';
import { withLoading } from '@/Utils/withLoading';
import CarPanelCardView from './Partials/CarPanelCardView';
import CarPanelTableView from './Partials/CarPanelTableView';
import { useLaravelReactI18n } from 'laravel-react-i18n';

export default function ({
    trainset,
    carriageTrainset,
    handleSyncCarriage,
}: {
    trainset: TrainsetResource;
    carriageTrainset: CarriageTrainsetResource;
    handleSyncCarriage: () => Promise<void>;
}) {
    const { t } = useLaravelReactI18n();
    const handlePanelDeletion = withLoading(async (carriageCarriageId: number) => {
        await carriagePanelService.delete(carriageCarriageId);
        await handleSyncCarriage();
        void useSuccessToast(
            t('pages.project.trainset.carriage_trainset.carriage_panel.partials.panels.messages.deleted'),
        );
    }, true);

    return (
        <div className="space-y-4">
            <div className="hidden md:block">
                <CarPanelTableView
                    trainset={trainset}
                    carriageTrainset={carriageTrainset}
                    handleSyncCarriagePanel={handleSyncCarriage}
                    handlePanelDeletion={handlePanelDeletion}
                ></CarPanelTableView>
            </div>

            <div className="block md:hidden">
                <CarPanelCardView
                    trainset={trainset}
                    carriageTrainset={carriageTrainset}
                    handleSyncCarriage={handleSyncCarriage}
                    handlePanelDeletion={handlePanelDeletion}
                ></CarPanelCardView>
            </div>
        </div>
    );
}
