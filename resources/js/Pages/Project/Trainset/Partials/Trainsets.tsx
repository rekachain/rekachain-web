import { ProjectResource } from '@/Support/Interfaces/Resources';
import { ROUTES } from '@/Support/Constants/routes';
import { Link } from '@inertiajs/react';
import { Button, buttonVariants } from '@/Components/UI/button';
import { trainsetService } from '@/Services/trainsetService';
import { useLoading } from '@/Contexts/LoadingContext';
import { useSuccessToast } from '@/Hooks/useToast';
import { withLoading } from '@/Utils/withLoading';
import TrainsetCardView from './Partials/TrainsetCardView';
import TrainsetTableView from './Partials/TrainsetTableView';

export default function ({
    project,
    handleSyncProject,
}: {
    project: ProjectResource;
    handleSyncProject: () => Promise<void>;
}) {
    const { loading } = useLoading();

    const handleTrainsetDeletion = withLoading(async (id: number) => {
        await trainsetService.delete(id);
        await handleSyncProject();
        void useSuccessToast('Trainset deleted successfully');
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
