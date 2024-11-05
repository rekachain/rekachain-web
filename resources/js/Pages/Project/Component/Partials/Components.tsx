import { useEffect, useState } from 'react';
import { ProjectComponentResource, ProjectResource, WorkAspectResource } from '@/Support/Interfaces/Resources';
import { PaginateResponse } from '@/Support/Interfaces/Others';
import GenericPagination from '@/Components/GenericPagination';
import { ServiceFilterOptions } from '@/Support/Interfaces/Others/ServiceFilterOptions';
import { useConfirmation } from '@/Hooks/useConfirmation';
import { componentService } from '@/Services/componentService';
import { useSuccessToast } from '@/Hooks/useToast';
import { useLoading } from '@/Contexts/LoadingContext';
import ComponentCardView from './Partials/ComponentCardView';
import ComponentTableView from './Partials/ComponentTableView';
import { useLaravelReactI18n } from 'laravel-react-i18n';
import { withLoading } from '@/Utils/withLoading';
import { projectService } from '@/Services/projectService';

export default function ({
    project,
    handleSyncProject,
}: {
    project: ProjectResource;
    handleSyncProject: () => Promise<void>;
}) {
    const { t } = useLaravelReactI18n();
    const [componentResponse, setComponentResponse] = useState<PaginateResponse<ProjectComponentResource>>();
    const [filters, setFilters] = useState<ServiceFilterOptions>({
        page: 1,
        perPage: 10,
        relations: 'progress',
        ordering: {
            name: 'asc',
            created_at: 'desc',
        },
    });

    const { setLoading } = useLoading();

    const syncComponents = withLoading(async () => {
        setLoading(true);
        const res = await projectService.getComponents(project.id);
        console.log(res);
        setComponentResponse(res);
        setLoading(false);
    });

    useEffect(() => {
        void syncComponents();
    }, []);

    const handleComponentDeletion = (id: number) => {
        useConfirmation().then(async ({ isConfirmed }) => {
            if (isConfirmed) {
                setLoading(true);
                await componentService.delete(id);
                await syncComponents();
                void useSuccessToast(t('pages.component.partials.components.messages.deleted'));
                setLoading(false);
            }
        });
    };

    const handlePageChange = (page: number) => {
        setFilters({ ...filters, page });
    };

    return (
        <div className="space-y-4">
            {componentResponse && (
                <>
                    <div className="hidden md:block">
                        <ComponentTableView
                            project={project}
                            componentResponse={componentResponse}
                        ></ComponentTableView>
                    </div>
                    <div className="block md:hidden">
                        <ComponentCardView
                            project={project}
                            componentResponse={componentResponse}
                        ></ComponentCardView>
                    </div>
                </>
            )}
            {/* <GenericPagination meta={componentResponse?.meta} handleChangePage={handlePageChange} /> */}
        </div>
    );
}
