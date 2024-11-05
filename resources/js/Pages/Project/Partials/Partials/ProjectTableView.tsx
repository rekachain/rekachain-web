import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/Components/UI/table';
import { PaginateResponse } from '@/Support/Interfaces/Others';
import { ProjectResource } from '@/Support/Interfaces/Resources';
import { Link } from '@inertiajs/react';
import { Button, buttonVariants } from '@/Components/UI/button';
import { ROUTES } from '@/Support/Constants/routes';
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
                        <TableHead>{t('pages.project.partials.partials.project_table.headers.name')}</TableHead>
                        <TableHead>{t('pages.project.partials.partials.project_table.headers.initial_date')}</TableHead>
                        <TableHead>
                            {t('pages.project.partials.partials.project_table.headers.trainset_count')}
                        </TableHead>
                        <TableHead></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {projectResponse?.data.map(project => (
                        <TableRow key={project.id}>
                            <TableCell>{project.name}</TableCell>
                            <TableCell>{project.initial_date}</TableCell>
                            <TableCell>{project.trainset_count}</TableCell>
                            <TableCell>
                                <Link
                                    className={buttonVariants({ variant: 'link' })}
                                    href={route(`${ROUTES.PROJECTS}.edit`, project.id)}
                                >
                                    {t('action.edit')}
                                </Link>
                                {project.can_be_deleted && (
                                    <Button variant="link" onClick={() => handleProjectDeletion(project.id)}>
                                        {t('action.delete')}
                                    </Button>
                                )}
                                <Link
                                    className={buttonVariants({ variant: 'link' })}
                                    href={route(`${ROUTES.PROJECTS_TRAINSETS}.index`, project.id)}
                                >
                                    {t('pages.project.partials.partials.project_table.actions.trainsets')}
                                </Link>
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
