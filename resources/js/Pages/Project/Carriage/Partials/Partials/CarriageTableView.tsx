import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/Components/UI/table';
import { ProjectCarriageResource, ProjectResource } from '@/Support/Interfaces/Resources';
import { PaginateResponse } from '@/Support/Interfaces/Others';
import { useLaravelReactI18n } from 'laravel-react-i18n';
import { Link } from '@inertiajs/react';
import { buttonVariants } from '@/Components/UI/button';
import { ROUTES } from '@/Support/Constants/routes';

export default function CarriageTableView({
    project,
    carriageResponse,
}: {
    project: ProjectResource;
    carriageResponse: PaginateResponse<ProjectCarriageResource>;
}) {
    const { t } = useLaravelReactI18n();
    return (
        <div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>
                            {t('pages.project.carriages.partials.partials.carriage_table.headers.name')}
                        </TableHead>
                        <TableHead>
                            {t('pages.project.carriages.partials.partials.carriage_table.headers.description')}
                        </TableHead>
                        <TableHead>
                            {t('pages.project.carriages.partials.partials.carriage_table.headers.total_qty')}
                        </TableHead>
                        <TableHead></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {carriageResponse?.data.map(data => (
                        <TableRow key={data.carriage.id}>
                            <TableCell>{data.carriage.type}</TableCell>
                            <TableCell>{data.carriage.description}</TableCell>
                            <TableCell>{data.total_qty}</TableCell>
                            <TableCell>
                                <Link
                                    className={buttonVariants({ variant: 'link' })}
                                    href={route(`${ROUTES.PROJECTS_COMPONENTS}.index`, project.id)}
                                >
                                    {t('pages.project.partials.partials.project_table.actions.components')}
                                </Link>
                                <Link
                                    className={buttonVariants({ variant: 'link' })}
                                    href={route(`${ROUTES.PROJECTS_PANELS}.index`, project.id)}
                                >
                                    {t('pages.project.partials.partials.project_table.actions.panels')}
                                </Link>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
