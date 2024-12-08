import { projectService } from '@/Services/projectService';
import { PaginateMeta, PaginateResponse } from '@/Support/Interfaces/Others';
import { ServiceFilterOptions } from '@/Support/Interfaces/Others/ServiceFilterOptions';
import {
    ProjectPanelResource,
    ProjectResource,
    TrainsetResource,
} from '@/Support/Interfaces/Resources';
import { withLoading } from '@/Utils/withLoading';
import { useEffect, useState } from 'react';
// import PanelTableView from './Partials/PanelTableView';
// import PanelCardView from './Partials/PanelCardView';
import GenericPagination from '@/Components/GenericPagination';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/Components/UI/table';
import Import from './Import';
import TableView from './Partials/TableView';
import CardView from './Partials/CardView';
import { useLoading } from '@/Contexts/LoadingContext';

export default function Panels({
    project,
    trainset,
}: {
    project: ProjectResource;
    trainset: TrainsetResource;
}) {
    const [panelResponse, setPanelResponse] = useState<PaginateResponse<ProjectPanelResource>>();
    const [panelResponseMeta, setPanelResponseMeta] = useState<PaginateMeta>();
    const [filters, setFilters] = useState<ServiceFilterOptions>({
        page: 1,
        perPage: 10,
    });

    const syncPanels = withLoading(async () => {
        // const data = await projectService.getPanels(project.id, filters);
        const data = await projectService.getCarriagePanels(project.id, trainset.id, filters);
        setPanelResponse(data);
        console.log('==========aa');
        console.log(panelResponse);

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

    const { loading } = useLoading();

    return (
        <div className='space-y-4'>
             {panelResponse && (
                
                // <TableView project={project} trainset={trainset}></TableView>
             <>
             <div className="hidden md:block">
                 <TableView project={project} trainset={trainset} panelResponse={panelResponse}></TableView>
             </div>
             <div className="block md:hidden">
                 <CardView project={project} trainset={trainset} panelResponse={panelResponse}></CardView>
             </div>
 </>
            )} 
            <GenericPagination meta={panelResponseMeta} handleChangePage={handlePageChange} />
        </div>
    );
}
