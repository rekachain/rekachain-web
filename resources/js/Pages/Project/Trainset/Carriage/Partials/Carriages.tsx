import { TrainsetResource } from '@/Support/Interfaces/Resources';
import { ROUTES } from '@/Support/Constants/routes';
import { Link } from '@inertiajs/react';
import { Button, buttonVariants } from '@/Components/UI/button';
import { carriageTrainsetService } from '@/Services/carriageTrainsetService';
import { useSuccessToast } from '@/Hooks/useToast';
import { TrainsetStatusEnum } from '@/Support/Enums/trainsetStatusEnum';
import CarriageQty from '@/Pages/Project/Trainset/Carriage/Partials/Components/CarriageQty';
import { withLoading } from '@/Utils/withLoading';
import CarriageCardView from './Partials/CarriageCardView';
import CarriageTableView from './Partials/CarriageTableView';

export default function ({
    trainset,
    handleSyncTrainset,
}: {
    trainset: TrainsetResource;
    handleSyncTrainset: () => Promise<void>;
}) {
    const handleCarriageDeletion = withLoading(async (carriageTrainsetId: number) => {
        await carriageTrainsetService.delete(carriageTrainsetId);
        await handleSyncTrainset();
        void useSuccessToast('Carriage deleted successfully');
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
