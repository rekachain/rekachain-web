import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/Components/UI/table';
import { CarriageResource, ProjectPanelResource, ProjectResource } from '@/Support/Interfaces/Resources';
import { PaginateResponse } from '@/Support/Interfaces/Others';
import { useLaravelReactI18n } from 'laravel-react-i18n';
import Import from '../Import';

export default function PanelTableView({
    project,
    carriage,
    panelResponse,
}: {
    project: ProjectResource;
    carriage: CarriageResource;
    panelResponse: PaginateResponse<ProjectPanelResource>;
}) {
    const { t } = useLaravelReactI18n();
    return (
        <div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>
                            {t('pages.project.carriage.panel.partials.partials.panel_table.headers.name')}
                        </TableHead>
                        <TableHead>
                            {t('pages.project.carriage.panel.partials.partials.panel_table.headers.description')}
                        </TableHead>
                        <TableHead>
                            {t('pages.project.carriage.panel.partials.partials.panel_table.headers.total_qty')}
                        </TableHead>
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
                                <Import project={project} carriage={carriage} panel={data.panel} />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
