import { ProjectResource } from '@/Support/Interfaces/Resources';
import { trainsetService } from '@/Services/trainsetService';
import { useLoading } from '@/Contexts/LoadingContext';
import { useSuccessToast } from '@/Hooks/useToast';
import { withLoading } from '@/Utils/withLoading';
import TrainsetCardView from './Partials/TrainsetCardView';
import TrainsetTableView from './Partials/TrainsetTableView';
import { useLaravelReactI18n } from 'laravel-react-i18n';

export default function ({
    project,
    handleSyncProject,
}: {
    project: ProjectResource;
    handleSyncProject: () => Promise<void>;
}) {
    const { t } = useLaravelReactI18n();
    const { loading } = useLoading();

    const handleTrainsetDeletion = withLoading(async (id: number) => {
        await trainsetService.delete(id);
        await handleSyncProject();
        void useSuccessToast(t('pages.project.trainset.partials.trainsets.messages.deleted'));
    }, true);

    return (
        <div className="space-y-4">
            <div className="hidden md:block">
                <TrainsetTableView
                    project={project}
                    handleTrainsetDeletion={handleTrainsetDeletion}
                    loading={loading}
                ></TrainsetTableView>
            </div>

            <div className="block md:hidden">
                <TrainsetCardView
                    project={project}
                    handleTrainsetDeletion={handleTrainsetDeletion}
                    loading={loading}
                ></TrainsetCardView>
            </div>
        </div>
    );
}
