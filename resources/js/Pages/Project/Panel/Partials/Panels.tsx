import { useEffect, useState } from 'react';
import { ProjectPanelResource, ProjectResource } from '@/Support/Interfaces/Resources';
import { PaginateResponse } from '@/Support/Interfaces/Others';
import { ServiceFilterOptions } from '@/Support/Interfaces/Others/ServiceFilterOptions';
import { useLoading } from '@/Contexts/LoadingContext';
import { useLaravelReactI18n } from 'laravel-react-i18n';
import { withLoading } from '@/Utils/withLoading';
import { projectService } from '@/Services/projectService';
import PanelTableView from './Partials/PanelTableView';
import PanelCardView from './Partials/PanelCardView';

export default function ({
    project,
    handleSyncProject,
}: {
    project: ProjectResource;
    handleSyncProject: () => Promise<void>;
}) {
    const { t } = useLaravelReactI18n();
    const [panelResponse, setPanelResponse] = useState<PaginateResponse<ProjectPanelResource>>();
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

    const syncPanels = withLoading(async () => {
        const res = await projectService.getPanels(project.id);
        setPanelResponse(res);
    });

    useEffect(() => {
        void syncPanels();
    }, []);

    return (
        <div className="space-y-4">
            {panelResponse && (
                <>
                    <div className="hidden md:block">
                        <PanelTableView project={project} panelResponse={panelResponse}></PanelTableView>
                    </div>
                    <div className="block md:hidden">
                        <PanelCardView project={project} panelResponse={panelResponse}></PanelCardView>
                    </div>
                </>
            )}
            {/* <GenericPagination meta={panelResponse?.meta} handleChangePage={handlePageChange} /> */}
        </div>
    );
}
