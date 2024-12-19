import GenericPagination from '@/Components/GenericPagination';
import { projectService } from '@/Services/projectService';
import { PaginateMeta, PaginateResponse } from '@/Support/Interfaces/Others';
import { ServiceFilterOptions } from '@/Support/Interfaces/Others/ServiceFilterOptions';
import {
    CarriageResource,
    ProjectPanelResource,
    ProjectResource,
} from '@/Support/Interfaces/Resources';
import { withLoading } from '@/Utils/withLoading';
import { useEffect, useState } from 'react';
import PanelCardView from './Partials/PanelCardView';
import PanelTableView from './Partials/PanelTableView';

export default function ({
    project,
    carriage,
}: {
    project: ProjectResource;
    carriage: CarriageResource;
}) {
    const [panelResponse, setPanelResponse] = useState<PaginateResponse<ProjectPanelResource>>();
    const [panelResponseMeta, setPanelResponseMeta] = useState<PaginateMeta>();
    const [filters, setFilters] = useState<ServiceFilterOptions>({
        page: 1,
        perPage: 10,
    });

    const syncPanels = withLoading(async () => {
        const data = await projectService.getCarriagePanels(project.id, carriage.id, filters);
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
        <div className='space-y-4'>
            {panelResponse && (
                <>
                    <div className='hidden md:block'>
                        <PanelTableView
                            project={project}
                            panelResponse={panelResponse}
                            carriage={carriage}
                        ></PanelTableView>
                    </div>
                    <div className='block md:hidden'>
                        <PanelCardView
                            project={project}
                            panelResponse={panelResponse}
                            carriage={carriage}
                        ></PanelCardView>
                    </div>
                </>
            )}
            <GenericPagination meta={panelResponseMeta} handleChangePage={handlePageChange} />
        </div>
    );
}
