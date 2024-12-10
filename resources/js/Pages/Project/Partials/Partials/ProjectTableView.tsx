import { Button, buttonVariants } from '@/Components/UI/button';
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
import { ProjectResource } from '@/Support/Interfaces/Resources';
import { Link } from '@inertiajs/react';
import { useLaravelReactI18n } from 'laravel-react-i18n';

export default function ProjectTableView({
    projectResponse,
    handleProjectDeletion,
}: {
    projectResponse: PaginateResponse<ProjectResource>;
    handleProjectDeletion: (id: number) => void;
}) {
    const { t } = useLaravelReactI18n();
    return (
        <div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>
                            {t('pages.project.partials.partials.project_table.headers.name')}
                        </TableHead>
                        <TableHead>
                            {t(
                                'pages.project.partials.partials.project_table.headers.initial_date',
                            )}
                        </TableHead>
                        <TableHead>
                            {t(
                                'pages.project.partials.partials.project_table.headers.trainset_count',
                            )}
                        </TableHead>
                        <TableHead></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {projectResponse?.data.map((project) => (
                        <TableRow key={project.id}>
                            <TableCell>{project.name}</TableCell>
                            <TableCell>{project.initial_date}</TableCell>
                            <TableCell>{project.trainset_count}</TableCell>
                            <TableCell>
                                {checkPermission(PERMISSION_ENUM.PROJECT_UPDATE) && (
                                    <Link
                                        href={route(`${ROUTES.PROJECTS}.edit`, project.id)}
                                        className={buttonVariants({ variant: 'link' })}
                                    >
                                        {t('action.edit')}
                                    </Link>
                                )}
                                {checkPermission(PERMISSION_ENUM.PROJECT_DELETE) &&
                                    project.can_be_deleted && (
                                        <Button
                                            variant='link'
                                            onClick={() => handleProjectDeletion(project.id)}
                                        >
                                            {t('action.delete')}
                                        </Button>
                                    )}
                                {checkPermission(PERMISSION_ENUM.PROJECT_CARRIAGE_READ) && (
                                    <Link
                                        href={route(
                                            `${ROUTES.PROJECTS_CARRIAGES}.index`,
                                            project.id,
                                        )}
                                        className={buttonVariants({ variant: 'link' })}
                                    >
                                        {t(
                                            'pages.project.partials.partials.project_table.actions.carriages',
                                        )}
                                    </Link>
                                )}
                                {checkPermission(PERMISSION_ENUM.PROJECT_TRAINSET_READ) && (
                                    <Link
                                        href={route(
                                            `${ROUTES.PROJECTS_TRAINSETS}.index`,
                                            project.id,
                                        )}
                                        className={buttonVariants({ variant: 'link' })}
                                    >
                                        {t(
                                            'pages.project.partials.partials.project_table.actions.trainsets',
                                        )}
                                    </Link>
                                )}
                                {checkPermission(PERMISSION_ENUM.PROJECT_COMPONENT_READ) && (
                                    <Link
                                        href={route(
                                            `${ROUTES.PROJECTS_COMPONENTS}.index`,
                                            project.id,
                                        )}
                                        className={buttonVariants({ variant: 'link' })}
                                    >
                                        {t(
                                            'pages.project.partials.partials.project_table.actions.components',
                                        )}
                                    </Link>
                                )}
                                {checkPermission(PERMISSION_ENUM.PROJECT_PANEL_READ) && (
                                    <Link
                                        href={route(`${ROUTES.PROJECTS_PANELS}.index`, project.id)}
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
