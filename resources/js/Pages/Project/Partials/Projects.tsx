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
import ProjectCardView from './Partials/ProjectCardView';
import ProjectTableView from './Partials/ProjectTableView';

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
            <>
                {projectResponse && (
                    <>
                        <div className="hidden md:block">
                            <ProjectTableView
                                projectResponse={projectResponse}
                                handleProjectDeletion={handleProjectDeletion}
                                auth={''}
                            ></ProjectTableView>
                        </div>

                        <div className="block md:hidden">
                            <ProjectCardView
                                projectResponse={projectResponse}
                                handleProjectDeletion={handleProjectDeletion}
                                auth={''}
                            ></ProjectCardView>
                        </div>
                    </>
                )}
            </>
            <GenericPagination meta={projectResponse?.meta} handleChangePage={handlePageChange} />
        </div>
    );
}
