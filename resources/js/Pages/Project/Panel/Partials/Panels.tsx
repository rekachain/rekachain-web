import { useEffect, useState } from 'react';
import { ProjectPanelResource, ProjectResource } from '@/Support/Interfaces/Resources';
import { PaginateMeta, PaginateResponse } from '@/Support/Interfaces/Others';
import { ServiceFilterOptions } from '@/Support/Interfaces/Others/ServiceFilterOptions';
import { withLoading } from '@/Utils/withLoading';
import { projectService } from '@/Services/projectService';
import PanelTableView from './Partials/PanelTableView';
import PanelCardView from './Partials/PanelCardView';
import GenericPagination from '@/Components/GenericPagination';

export default function ({ project }: { project: ProjectResource }) {
    const [panelResponse, setPanelResponse] = useState<PaginateResponse<ProjectPanelResource>>();
    const [panelResponseMeta, setPanelResponseMeta] = useState<PaginateMeta>();
    const [filters, setFilters] = useState<ServiceFilterOptions>({
        page: 1,
        perPage: 10,
    });

    const syncPanels = withLoading(async () => {
        const data = await projectService.getPanels(project.id, filters);
        setPanelResponse(data);

        setPanelResponseMeta({
            current_page: data.current_page,
            from: data.from,
            last_page: data.last_page,
            path: data.path,
            per_page: data.per_page,
            to: data.to,
            total: data.total,
            links: data.links,
        });
    });

    useEffect(() => {
        void syncPanels();
    }, [filters]);

    const handlePageChange = (page: number) => {
        setFilters({ ...filters, page });
    };

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
            <GenericPagination meta={panelResponseMeta} handleChangePage={handlePageChange} />
        </div>
    );
}
