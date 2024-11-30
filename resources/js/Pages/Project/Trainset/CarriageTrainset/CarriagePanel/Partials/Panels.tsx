import { useSuccessToast } from '@/Hooks/useToast';
import { carriagePanelService } from '@/Services/carriagePanelService';
import { CarriageTrainsetResource, TrainsetResource } from '@/Support/Interfaces/Resources';
import { withLoading } from '@/Utils/withLoading';
import { useLaravelReactI18n } from 'laravel-react-i18n';
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
    const { t } = useLaravelReactI18n();
    const handlePanelDeletion = withLoading(async (carriageCarriageId: number) => {
        await carriagePanelService.delete(carriageCarriageId);
        await handleSyncCarriage();
        void useSuccessToast(
            t(
                'pages.project.trainset.carriage_trainset.carriage_panel.partials.panels.messages.deleted',
            ),
        );
    }, true);

    return (
        <div className='space-y-4'>
            <div className='hidden md:block'>
                <CarPanelTableView
                    trainset={trainset}
                    handleSyncCarriagePanel={handleSyncCarriage}
                    handlePanelDeletion={handlePanelDeletion}
                    carriageTrainset={carriageTrainset}
                ></CarPanelTableView>
            </div>

            <div className='block md:hidden'>
                <CarPanelCardView
                    trainset={trainset}
                    handleSyncCarriage={handleSyncCarriage}
                    handlePanelDeletion={handlePanelDeletion}
                    carriageTrainset={carriageTrainset}
                ></CarPanelCardView>
            </div>
        </div>
    );
}
