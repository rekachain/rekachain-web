import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/Components/ui/table';
import { Link } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { ProjectResource } from '@/support/interfaces/resources';
import { PaginateResponse } from '@/support/interfaces/others';
import { Button, buttonVariants } from '@/Components/ui/button';
import { ROUTES } from '@/support/constants/routes';
import GenericPagination from '@/Components/GenericPagination';
import { ServiceFilterOptions } from '@/support/interfaces/others/ServiceFilterOptions';
import { useConfirmation } from '@/hooks/useConfirmation';
import { projectService } from '@/services/projectService';
import { useLoading } from '@/contexts/LoadingContext';
import { useSuccessToast } from '@/hooks/useToast';

export default function () {
    const [projectResponse, setProjectResponse] = useState<PaginateResponse<ProjectResource>>();
    const [filters, setFilters] = useState<ServiceFilterOptions>({
        page: 1,
        perPage: 10,
    });
    const { setLoading } = useLoading();

    const handleSyncProjects = async () => {
        setLoading(true);
        const res = await projectService.getAll(filters);
        setProjectResponse(res);
        setLoading(false);
    };

    useEffect(() => {
        handleSyncProjects();
    }, [filters]);

    const handleProjectDeletion = (id: number) => {
        const isConfirmed = useConfirmation().then(async ({ isConfirmed }) => {
            if (isConfirmed) {
                await projectService.delete(id);
                await handleSyncProjects();
                useSuccessToast('Project deleted successfully');
            }
        });
    };

    const handlePageChange = (page: number) => {
        setFilters({ ...filters, page });
    };

    return (
        <div className="space-y-4">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Nama</TableHead>
                        <TableHead>Tanggal Inisiasi</TableHead>
                        <TableHead>Jumlah Trainset</TableHead>
                        <TableHead></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {projectResponse?.data.map(project => (
                        <TableRow key={project.id}>
                            <TableCell>{project.name}</TableCell>
                            <TableCell>{project.initial_date}</TableCell>
                            <TableCell>{project.trainset_count}</TableCell>
                            <TableCell>
                                <Link
                                    className={buttonVariants({ variant: 'link' })}
                                    href={route(`${ROUTES.PROJECTS}.edit`, project.id)}
                                >
                                    Edit
                                </Link>
                                {project.can_be_deleted && (
                                    <Button variant="link" onClick={() => handleProjectDeletion(project.id)}>
                                        Delete
                                    </Button>
                                )}
                                <Link
                                    className={buttonVariants({ variant: 'link' })}
                                    href={route(`${ROUTES.PROJECTS_TRAINSETS}.index`, project.id)}
                                >
                                    Trainset
                                </Link>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            <GenericPagination meta={projectResponse?.meta} handleChangePage={handlePageChange} />
        </div>
    );
}
