import GenericPagination from '@/Components/GenericPagination';
import { useLoading } from '@/Contexts/LoadingContext';
import { projectService } from '@/Services/projectService';
import { PaginateMeta, PaginateResponse } from '@/Support/Interfaces/Others';
import { ServiceFilterOptions } from '@/Support/Interfaces/Others/ServiceFilterOptions';
import { ProjectCarriageResource, ProjectResource } from '@/Support/Interfaces/Resources';
import { withLoading } from '@/Utils/withLoading';
import { useLaravelReactI18n } from 'laravel-react-i18n';
import { useEffect, useState } from 'react';
import CarriageCardView from './Partials/CarriageCardView';
import CarriageTableView from './Partials/CarriageTableView';

export default function ({
    project,
    handleSyncProject,
}: {
    project: ProjectResource;
    handleSyncProject: () => Promise<void>;
}) {
    const { t } = useLaravelReactI18n();
    const [carriageResponse, setCarriageResponse] =
        useState<PaginateResponse<ProjectCarriageResource>>();
    const [carriageResponseMeta, setCarriageResponseMeta] = useState<PaginateMeta>();
    const [filters, setFilters] = useState<ServiceFilterOptions>({
        page: 1,
        perPage: 10,
    });

    const { setLoading } = useLoading();

    const syncComponents = withLoading(async () => {
        const data = await projectService.getCarriages(project.id, filters);

        setCarriageResponse(data);

        setCarriageResponseMeta({
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
        void syncComponents();
    }, [filters]);

    const handlePageChange = (page: number) => {
        setFilters({ ...filters, page });
    };

    return (
        <div className='space-y-4'>
            {carriageResponse && (
                <>
                    <div className='hidden md:block'>
                        <CarriageTableView
                            project={project}
                            carriageResponse={carriageResponse}
                        ></CarriageTableView>
                    </div>
                    <div className='block md:hidden'>
                        <CarriageCardView
                            project={project}
                            carriageResponse={carriageResponse}
                        ></CarriageCardView>
                    </div>
                </>
            )}
            <GenericPagination meta={carriageResponseMeta} handleChangePage={handlePageChange} />
        </div>
    );
}
