import { useEffect, useState } from 'react';
import { ProjectPanelResource, ProjectResource, TrainsetResource } from '@/Support/Interfaces/Resources';
import { PaginateMeta, PaginateResponse } from '@/Support/Interfaces/Others';
import { ServiceFilterOptions } from '@/Support/Interfaces/Others/ServiceFilterOptions';
import { withLoading } from '@/Utils/withLoading';
import { projectService } from '@/Services/projectService';
// import PanelTableView from './Partials/PanelTableView';
// import PanelCardView from './Partials/PanelCardView';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/Components/UI/table';
import GenericPagination from '@/Components/GenericPagination';
import { filter } from 'lodash';
import Import from './Import';

export default function Panels({ project, trainset }: { project: ProjectResource; trainset: TrainsetResource }) {
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

    return (
        <div className="space-y-4">
            {panelResponse && (
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
                                {panelResponse?.data.map(data => (
                                    <TableRow key={data.panel.id}>
                                        <TableCell>{data.panel.name}</TableCell>
                                        <TableCell>{data.panel.description}</TableCell>
                                        <TableCell>{data.total_qty}</TableCell>
                                        <TableCell>
                                            <Import
                                                project={project}
                                                trainset={trainset}
                                                panel={data.panel}
                                                hasMaterials={data.has_materials}
                                            />
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                    {/* <div className="hidden md:block">
                        <PanelTableView project={project} panelResponse={panelResponse}></PanelTableView>
                    </div>
                    <div className="block md:hidden">
                        <PanelCardView project={project} panelResponse={panelResponse}></PanelCardView>
                    </div> */}
                </>
            )}
            <GenericPagination meta={panelResponseMeta} handleChangePage={handlePageChange} />
        </div>
    );
}
