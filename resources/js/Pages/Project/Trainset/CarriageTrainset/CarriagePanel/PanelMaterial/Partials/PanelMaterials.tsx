import { CarriagePanelResource, CarriageTrainsetResource, TrainsetResource } from '@/Support/Interfaces/Resources';
import { useSuccessToast } from '@/Hooks/useToast';
import { withLoading } from '@/Utils/withLoading';
import PanelMaterialTableView from './Partials/PanelMaterialTableView';
import { useLaravelReactI18n } from 'laravel-react-i18n';
import { panelMaterialService } from '@/Services/panelMaterialService';
import PanelMaterialCardView from '@/Pages/Project/Trainset/CarriageTrainset/CarriagePanel/PanelMaterial/Partials/Partials/PanelMaterialCardView';

export default function ({
    trainset,
    carriageTrainset,
    carriagePanel,
    handleSyncCarriagePanel,
}: {
    trainset: TrainsetResource;
    carriageTrainset: CarriageTrainsetResource;
    carriagePanel: CarriagePanelResource;
    handleSyncCarriagePanel: () => Promise<void>;
}) {
    const { t } = useLaravelReactI18n();
    const handlePanelMaterialDeletion = withLoading(async (rawMaterialId: number) => {
        await panelMaterialService.delete(rawMaterialId);
        await handleSyncCarriagePanel();
        void useSuccessToast('Material deleted successfully');
    }, true);

    return (
        <div className="space-y-4">
            <div className="hidden md:block">
                <PanelMaterialTableView
                    trainset={trainset}
                    carriageTrainset={carriageTrainset}
                    carriagePanel={carriagePanel}
                    handleSyncCarriagePanel={handleSyncCarriagePanel}
                    handlePanelMaterialDeletion={handlePanelMaterialDeletion}
                />
            </div>

            <div className="block md:hidden">
                <PanelMaterialCardView
                    trainset={trainset}
                    carriageTrainset={carriageTrainset}
                    carriagePanel={carriagePanel}
                    handleSyncCarriagePanel={handleSyncCarriagePanel}
                    handlePanelMaterialDeletion={handlePanelMaterialDeletion}
                />
            </div>
        </div>
    );
}
