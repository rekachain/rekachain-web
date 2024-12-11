import GenericPagination from '@/Components/GenericPagination';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/Components/UI/table';
import { useLoading } from '@/Contexts/LoadingContext';
import { checkPermission } from '@/Helpers/permissionHelper';
import { projectService } from '@/Services/projectService';
import { PERMISSION_ENUM } from '@/Support/Enums/permissionEnum';
import { PaginateMeta, PaginateResponse, ServiceFilterOptions } from '@/Support/Interfaces/Others';
import {
    ProjectComponentResource,
    ProjectResource,
    TrainsetResource,
} from '@/Support/Interfaces/Resources';
import { withLoading } from '@/Utils/withLoading';
import { useLaravelReactI18n } from 'laravel-react-i18n';
import { useEffect, useState } from 'react';
import Import from './Import';

export default function Components({
    project,
    trainset,
}: {
    project: ProjectResource;
    trainset: TrainsetResource;
}) {
    const [componentResponse, setComponentResponse] =
        useState<PaginateResponse<ProjectComponentResource>>();
    const [componentResponseMeta, setComponentResponseMeta] = useState<PaginateMeta>();
    const [filters, setFilters] = useState<ServiceFilterOptions>({
        page: 1,
        perPage: 10,
    });

    const { setLoading } = useLoading();

    const syncComponents = withLoading(async () => {
        const data = await projectService.getTrainsetComponents(project.id, trainset.id, filters);

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

    const { t } = useLaravelReactI18n();
    return (
        <div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>
                            {t(
                                'pages.project.component.partials.partials.component_table.headers.name',
                            )}
                        </TableHead>
                        <TableHead>
                            {t(
                                'pages.project.component.partials.partials.component_table.headers.description',
                            )}
                        </TableHead>
                        <TableHead>
                            {t(
                                'pages.project.component.partials.partials.component_table.headers.total_qty',
                            )}
                        </TableHead>
                        <TableHead></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {componentResponse?.data.map((data) => (
                        <TableRow key={data.component.id}>
                            <TableCell>{data.component.name}</TableCell>
                            <TableCell>{data.component.description}</TableCell>
                            <TableCell>{data.total_qty}</TableCell>
                            <TableCell>
                                {checkPermission(
                                    PERMISSION_ENUM.PROJECT_TRAINSET_COMPONENT_IMPORT,
                                ) && (
                                    <Import
                                        trainset={trainset}
                                        project={project}
                                        hasMaterials={data.has_materials}
                                        component={data.component}
                                    />
                                )}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            <GenericPagination meta={componentResponseMeta} handleChangePage={handlePageChange} />
        </div>
    );
}
