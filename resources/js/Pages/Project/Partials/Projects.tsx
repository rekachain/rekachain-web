import { Link } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { ProjectResource } from '../../../Support/Interfaces/Resources';
import { PaginateResponse } from '../../../Support/Interfaces/Others';
import { Button, buttonVariants } from '@/Components/UI/button';
import { ROUTES } from '@/Support/Constants/routes';
import GenericPagination from '@/Components/GenericPagination';
import { ServiceFilterOptions } from '@/Support/Interfaces/Others/ServiceFilterOptions';
import { useConfirmation } from '@/Hooks/useConfirmation';
import { projectService } from '@/Services/projectService';
import { useLoading } from '@/Contexts/LoadingContext';
import { useSuccessToast } from '@/Hooks/useToast';
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
