import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/Components/UI/table';
import { PaginateResponse } from '@/Support/Interfaces/Others';
import {
    CarriageResource,
    ProjectComponentResource,
    ProjectResource,
} from '@/Support/Interfaces/Resources';
import { useLaravelReactI18n } from 'laravel-react-i18n';
import Import from '../Import';

export default function ComponentTableView({
    project,
    carriage,
    componentResponse,
}: {
    project: ProjectResource;
    carriage: CarriageResource;
    componentResponse: PaginateResponse<ProjectComponentResource>;
}) {
    const { t } = useLaravelReactI18n();
    return (
        <div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>
                            {t(
                                'pages.project.carriage.component.partials.partials.component_table.headers.name',
                            )}
                        </TableHead>
                        <TableHead>
                            {t(
                                'pages.project.carriage.component.partials.partials.component_table.headers.description',
                            )}
                        </TableHead>
                        <TableHead>
                            {t(
                                'pages.project.carriage.component.partials.partials.component_table.headers.total_qty',
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
                                <Import
                                    project={project}
                                    hasMaterials={data.has_materials}
                                    component={data.component}
                                    carriage={carriage}
                                />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
