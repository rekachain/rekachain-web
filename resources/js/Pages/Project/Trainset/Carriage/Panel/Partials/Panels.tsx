import { CarriageTrainsetResource, TrainsetResource } from '@/Support/Interfaces/Resources';
import PanelQty from '@/Pages/Project/Trainset/Carriage/Panel/Partials/Components/PanelQty';
import { Button } from '@/Components/UI/button';
import { carriagePanelService } from '@/Services/carriagePanelService';
import { useSuccessToast } from '@/Hooks/useToast';
import { TrainsetStatusEnum } from '@/Support/Enums/trainsetStatusEnum';
import { withLoading } from '@/Utils/withLoading';
import CarPanelCardView from './Partials/CarPanelCardView';
import CarPanelTableView from './Partials/CarPanelTableView';

export default function ({
    trainset,
    carriageTrainset,
    handleSyncCarriage,
}: {
    trainset: TrainsetResource;
    carriageTrainset: CarriageTrainsetResource;
    handleSyncCarriage: () => Promise<void>;
}) {
    const handlePanelDeletion = withLoading(async (carriageCarriageId: number) => {
        await carriagePanelService.delete(carriageCarriageId);
        await handleSyncCarriage();
        void useSuccessToast('Panel deleted successfully');
    }, true);

    return (
        <div className="space-y-4">
            <div className="hidden md:block">
                <CarPanelTableView
                    trainset={trainset}
                    carriageTrainset={carriageTrainset}
                    handleSyncCarriage={handleSyncCarriage}
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
