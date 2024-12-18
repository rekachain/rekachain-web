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
import { useLoading } from '@/Contexts/LoadingContext';
import CardView from './Partials/CardView';
import TableView from './Partials/TableView';

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
        const data = await projectService.getTrainsetPanels(project.id, trainset.id, filters);
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

    const { loading } = useLoading();

    return (
        <div className='space-y-4'>
            {panelResponse && (
                // <TableView project={project} trainset={trainset}></TableView>
                <>
                    <div className='hidden md:block'>
                        <TableView
                            trainset={trainset}
                            project={project}
                            panelResponse={panelResponse}
                        ></TableView>
                    </div>
                    <div className='block md:hidden'>
                        <CardView
                            trainset={trainset}
                            project={project}
                            panelResponse={panelResponse}
                        ></CardView>
                    </div>
                </>
            )}
            {/* Check Permission */}
            {/* {panelResponse && (
                <>
                    <div>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Nama Panel</TableHead>
                                    <TableHead>Deskripsi</TableHead>
                                    <TableHead>Total Quantity</TableHead>
                                    <TableHead></TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {panelResponse?.data.map((data) => (
                                    <TableRow key={data.panel.id}>
                                        <TableCell>{data.panel.name}</TableCell>
                                        <TableCell>{data.panel.description}</TableCell>
                                        <TableCell>{data.total_qty}</TableCell>
                                        <TableCell>
                                            {checkPermission(
                                                PERMISSION_ENUM.PROJECT_TRAINSET_PANEL_IMPORT,
                                            ) && (
                                                <Import
                                                    trainset={trainset}
                                                    project={project}
                                                    panel={data.panel}
                                                    hasMaterials={data.has_materials}
                                                />
                                            )}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </>
            )}*/}
            <GenericPagination meta={panelResponseMeta} handleChangePage={handlePageChange} />
        </div>
    );
}
