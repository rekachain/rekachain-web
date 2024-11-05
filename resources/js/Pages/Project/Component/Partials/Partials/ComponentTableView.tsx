import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/Components/UI/table';
import { ProjectComponentResource, ProjectResource } from '@/Support/Interfaces/Resources';
import { PaginateResponse } from '@/Support/Interfaces/Others';
import { useLaravelReactI18n } from 'laravel-react-i18n';
import Import from '../Import';

export default function ComponentTableView({
    project,
    componentResponse,
}: {
    project: ProjectResource;
    componentResponse: PaginateResponse<ProjectComponentResource>;
}) {
    const { t } = useLaravelReactI18n();
    return (
        <div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>{t('pages.component.partials.partials.component_table.headers.name')}</TableHead>
                        <TableHead>Deskripsi</TableHead>
                        <TableHead>Total Qty</TableHead>
                        <TableHead></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {componentResponse?.data.map((data) => (
                        <TableRow key={data.component.id}>
                            <TableCell>
                                {data.component.name}
                            </TableCell>
                            <TableCell>
                                {data.component.description}
                            </TableCell>
                            <TableCell>
                                {data.total_qty}
                            </TableCell>
                            <TableCell>
                                <Import project={project} component={data.component} />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
