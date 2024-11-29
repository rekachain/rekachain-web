import GenericPagination from '@/Components/GenericPagination';
import { useSuccessToast } from '@/Hooks/useToast';
import Filters from '@/Pages/Project/Partials/Partials/Filters';
import { projectService } from '@/Services/projectService';
import { PaginateResponse } from '@/Support/Interfaces/Others';
import { ServiceFilterOptions } from '@/Support/Interfaces/Others/ServiceFilterOptions';
import { ProjectResource } from '@/Support/Interfaces/Resources';
import { withLoading } from '@/Utils/withLoading';
import { useLaravelReactI18n } from 'laravel-react-i18n';
import { useEffect, useState } from 'react';
import ProjectCardView from './Partials/ProjectCardView';
import ProjectTableView from './Partials/ProjectTableView';

export default function () {
    const { t } = useLaravelReactI18n();
    const [projectResponse, setProjectResponse] = useState<PaginateResponse<ProjectResource>>();
    const [filters, setFilters] = useState<ServiceFilterOptions>({
        page: 1,
        perPage: 10,
    });

    const handleSyncProjects = withLoading(async () => {
        const res = await projectService.getAll(filters);
        setProjectResponse(res);
    });

    useEffect(() => {
        void handleSyncProjects();
    }, [filters]);

    const handleProjectDeletion = withLoading(async (id: number) => {
        await projectService.delete(id);
        await handleSyncProjects();
        void useSuccessToast(t('pages.project.partials.projects.messages.deleted'));
    }, true);

    const handlePageChange = (page: number) => {
        setFilters({ ...filters, page });
    };

    return (
        <div className='space-y-4'>
            <>
                {projectResponse && (
                    <>
                        <Filters setFilters={setFilters} filters={filters} />

                        <div className='hidden md:block'>
                            <ProjectTableView
                                projectResponse={projectResponse}
                                handleProjectDeletion={handleProjectDeletion}
                            ></ProjectTableView>
                        </div>

                        <div className='block md:hidden'>
                            <ProjectCardView
                                projectResponse={projectResponse}
                                handleProjectDeletion={handleProjectDeletion}
                            ></ProjectCardView>
                        </div>
                    </>
                )}
            </>
            <GenericPagination meta={projectResponse?.meta} handleChangePage={handlePageChange} />
        </div>
    );
}
