import { useEffect, useState } from 'react';
import { CarriageResource, ProjectComponentResource, ProjectResource } from '@/Support/Interfaces/Resources';
import { PaginateMeta, PaginateResponse } from '@/Support/Interfaces/Others';
import { ServiceFilterOptions } from '@/Support/Interfaces/Others/ServiceFilterOptions';
import { useLoading } from '@/Contexts/LoadingContext';
import ComponentCardView from './Partials/ComponentCardView';
import ComponentTableView from './Partials/ComponentTableView';
import { useLaravelReactI18n } from 'laravel-react-i18n';
import { withLoading } from '@/Utils/withLoading';
import { projectService } from '@/Services/projectService';
import GenericPagination from '@/Components/GenericPagination';

export default function ({
    project,
    carriage,
    handleSyncProject,
}: {
    project: ProjectResource;
    carriage: CarriageResource;
    handleSyncProject: () => Promise<void>;
}) {
    const { t } = useLaravelReactI18n();
    const [componentResponse, setComponentResponse] = useState<PaginateResponse<ProjectComponentResource>>();
    const [componentResponseMeta, setComponentResponseMeta] = useState<PaginateMeta>();
    const [filters, setFilters] = useState<ServiceFilterOptions>({
        page: 1,
        perPage: 10,
    });

    const { setLoading } = useLoading();

    const syncComponents = withLoading(async () => {
        const data = await projectService.getCarriageComponents(project.id, carriage.id, filters);

        setComponentResponse(data);

        setComponentResponseMeta({
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
        <div className="space-y-4">
            {componentResponse && (
                <>
                    <div className="hidden md:block">
                        <ComponentTableView
                            project={project}
                            carriage={carriage}
                            componentResponse={componentResponse}
                        ></ComponentTableView>
                    </div>
                    <div className="block md:hidden">
                        <ComponentCardView project={project} carriage={carriage} componentResponse={componentResponse}></ComponentCardView>
                    </div>
                </>
            )}
            <GenericPagination meta={componentResponseMeta} handleChangePage={handlePageChange} />
        </div>
    );
}
