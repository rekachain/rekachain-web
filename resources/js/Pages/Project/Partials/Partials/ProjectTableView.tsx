import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/Components/UI/table';
import { PaginateResponse } from '@/Support/Interfaces/Others';
import { ProjectResource } from '@/Support/Interfaces/Resources';
import { Link } from '@inertiajs/react';
import { Button, buttonVariants } from '@/Components/UI/button';
import { ROUTES } from '@/Support/Constants/routes';

export default function ProjectTableView({
    projectResponse,
    handleProjectDeletion,
}: {
    projectResponse: PaginateResponse<ProjectResource>;
    handleProjectDeletion: (id: number) => void;
}) {
    return (
        <div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Nama</TableHead>
                        <TableHead>Tanggal Inisiasi</TableHead>
                        <TableHead>Jumlah Trainset</TableHead>
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
                                    Edit
                                </Link>
                                {project.can_be_deleted && (
                                    <Button variant="link" onClick={() => handleProjectDeletion(project.id)}>
                                        Delete
                                    </Button>
                                )}
                                <Link
                                    className={buttonVariants({ variant: 'link' })}
                                    href={route(`${ROUTES.PROJECTS_TRAINSETS}.index`, project.id)}
                                >
                                    Trainset
                                </Link>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
