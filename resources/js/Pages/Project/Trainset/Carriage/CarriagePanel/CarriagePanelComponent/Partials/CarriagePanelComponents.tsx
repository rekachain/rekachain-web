import { CarriagePanelResource, CarriageTrainsetResource, TrainsetResource } from '@/Support/Interfaces/Resources';
import { useSuccessToast } from '@/Hooks/useToast';
import { withLoading } from '@/Utils/withLoading';
import CarriagePanelComponentCardView from './Partials/CarriagePanelComponentCardView';
import CarriagePanelComponentTableView from './Partials/CarriagePanelComponentTableView';
import { useLaravelReactI18n } from 'laravel-react-i18n';
import { carriagePanelComponentService } from '@/Services/carriagePanelComponentService';

export default function ({
    trainset,
    carriageTrainset,
    handleSyncCarriagePanel,
    carriagePanel,
}: {
    trainset: TrainsetResource;
    carriageTrainset: CarriageTrainsetResource;
    handleSyncCarriagePanel: () => Promise<void>;
    carriagePanel: CarriagePanelResource;
}) {
    const { t } = useLaravelReactI18n();
    const handlePanelComponentDeletion = withLoading(async (carriagePanelComponent: number) => {
        await carriagePanelComponentService.delete(carriagePanelComponent);
        await handleSyncCarriagePanel();
        void useSuccessToast('Carriage panel component has been deleted.');
    }, true);

    return (
        <div className="space-y-4">
            <div className="hidden md:block">
                <CarriagePanelComponentTableView
                    trainset={trainset}
                    carriageTrainset={carriageTrainset}
                    carriagePanel={carriagePanel}
                    handleSyncCarriagePanel={handleSyncCarriagePanel}
                    handlePanelComponentDeletion={handlePanelComponentDeletion}
                />
            </div>

            <div className="block md:hidden">
                <CarriagePanelComponentCardView
                    trainset={trainset}
                    carriageTrainset={carriageTrainset}
                    carriagePanel={carriagePanel}
                    handleSyncCarriagePanel={handleSyncCarriagePanel}
                    handlePanelComponentDeletion={handlePanelComponentDeletion}
                />
            </div>
        </div>
    );
}