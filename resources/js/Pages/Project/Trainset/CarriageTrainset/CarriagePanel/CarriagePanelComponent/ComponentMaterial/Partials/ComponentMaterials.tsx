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
        void useSuccessToast(
            t(
                'pages.project.trainset.carriage_trainset.carriage_panel.carriage_panel_component.component_material.partials.component_materials.messages.deleted',
            ),
        );
    }, true);

    return (
        <div className="space-y-4">
            <div className="hidden md:block">
                <ComponentMaterialTableView
                    trainset={trainset}
                    handleSyncCarriagePanel={handleSyncCarriagePanelComponent}
                    handleComponentMaterialDeletion={handlePanelComponentDeletion}
                    carriageTrainset={carriageTrainset}
                    carriagePanelComponent={carriagePanelComponent}
                    carriagePanel={carriagePanel}
                />
            </div>

            <div className="block md:hidden">
                <ComponentMaterialCardView
                    trainset={trainset}
                    handleSyncCarriagePanel={handleSyncCarriagePanelComponent}
                    handleComponentMaterialDeletion={handlePanelComponentDeletion}
                    carriageTrainset={carriageTrainset}
                    carriagePanelComponent={carriagePanelComponent}
                    carriagePanel={carriagePanel}
                />
            </div>
        </div>
    );
}
