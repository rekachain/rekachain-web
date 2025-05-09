import { buttonVariants } from '@/Components/UI/button';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/Components/UI/table';
import { checkPermission } from '@/Helpers/permissionHelper';
import { ROUTES } from '@/Support/Constants/routes';
import { PERMISSION_ENUM } from '@/Support/Enums/permissionEnum';
import { PaginateResponse } from '@/Support/Interfaces/Others';
import { ProjectCarriageResource, ProjectResource } from '@/Support/Interfaces/Resources';
import { Link } from '@inertiajs/react';
import { useLaravelReactI18n } from 'laravel-react-i18n';

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
                            {t(
                                'pages.project.carriage.partials.partials.carriage_table.headers.name',
                            )}
                        </TableHead>
                        <TableHead>
                            {t(
                                'pages.project.carriage.partials.partials.carriage_table.headers.description',
                            )}
                        </TableHead>
                        <TableHead>
                            {t(
                                'pages.project.carriage.partials.partials.carriage_table.headers.total_qty',
                            )}
                        </TableHead>
                        <TableHead></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {carriageResponse?.data.map((data) => (
                        <TableRow key={data.carriage.id}>
                            <TableCell>{data.carriage.type}</TableCell>
                            <TableCell>{data.carriage.description}</TableCell>
                            <TableCell>{data.total_qty}</TableCell>
                            <TableCell>
                                {checkPermission(
                                    PERMISSION_ENUM.PROJECT_CARRIAGE_COMPONENT_READ,
                                ) && (
                                    <Link
                                        href={route(
                                            `${ROUTES.PROJECTS_CARRIAGES_COMPONENTS}.index`,
                                            [project.id, data.carriage.id],
                                        )}
                                        className={buttonVariants({ variant: 'link' })}
                                    >
                                        {t(
                                            'pages.project.partials.partials.project_table.actions.components',
                                        )}
                                    </Link>
                                )}
                                {checkPermission(PERMISSION_ENUM.PROJECT_CARRIAGE_PANEL_READ) && (
                                    <Link
                                        href={route(`${ROUTES.PROJECTS_CARRIAGES_PANELS}.index`, [
                                            project.id,
                                            data.carriage.id,
                                        ])}
                                        className={buttonVariants({ variant: 'link' })}
                                    >
                                        {t(
                                            'pages.project.partials.partials.project_table.actions.panels',
                                        )}
                                    </Link>
                                )}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
