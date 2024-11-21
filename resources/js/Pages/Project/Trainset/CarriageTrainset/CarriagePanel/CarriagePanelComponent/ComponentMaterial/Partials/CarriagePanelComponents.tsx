import {
    CarriagePanelComponentResource,
    CarriagePanelResource,
    CarriageTrainsetResource,
    TrainsetResource,
} from '@/Support/Interfaces/Resources';
import { useSuccessToast } from '@/Hooks/useToast';
import { withLoading } from '@/Utils/withLoading';
import ComponentMaterialCardView from './Partials/ComponentMaterialCardView';
import ComponentMaterialTableView from './Partials/ComponentMaterialTableView';
import { useLaravelReactI18n } from 'laravel-react-i18n';
import { componentMaterialService } from '@/Services/componentMaterialService';

export default function ({
    trainset,
    carriageTrainset,
    carriagePanel,
    carriagePanelComponent,
    handleSyncCarriagePanelComponent,
}: {
    trainset: TrainsetResource;
    carriageTrainset: CarriageTrainsetResource;
    carriagePanel: CarriagePanelResource;
    carriagePanelComponent: CarriagePanelComponentResource;
    handleSyncCarriagePanelComponent: () => Promise<void>;
}) {
    const { t } = useLaravelReactI18n();
    const handlePanelComponentDeletion = withLoading(async (componentMaterialId: number) => {
        await componentMaterialService.delete(componentMaterialId);
        await handleSyncCarriagePanelComponent();
        void useSuccessToast('Component material has been deleted.');
    }, true);

    return (
        <div className="space-y-4">
            <div className="hidden md:block">
                <ComponentMaterialTableView
                    trainset={trainset}
                    carriageTrainset={carriageTrainset}
                    carriagePanel={carriagePanel}
                    carriagePanelComponent={carriagePanelComponent}
                    handleSyncCarriagePanel={handleSyncCarriagePanelComponent}
                    handleComponentMaterialDeletion={handlePanelComponentDeletion}
                />
            </div>

            <div className="block md:hidden">
                <ComponentMaterialCardView
                    trainset={trainset}
                    carriageTrainset={carriageTrainset}
                    carriagePanel={carriagePanel}
                    carriagePanelComponent={carriagePanelComponent}
                    handleSyncCarriagePanel={handleSyncCarriagePanelComponent}
                    handleComponentMaterialDeletion={handlePanelComponentDeletion}
                />
            </div>
        </div>
    );
}
