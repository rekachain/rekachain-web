import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/Components/ui/table';
import { ProjectResource } from '@/support/interfaces/resources';
import { ROUTES } from '@/support/constants/routes';
import { Link } from '@inertiajs/react';
import { Button, buttonVariants } from '@/Components/ui/button';
import { useConfirmation } from '@/hooks/useConfirmation';
import { trainsetService } from '@/services/trainsetService';

export default function ({ project, handleSyncProject }: { project: ProjectResource; handleSyncProject: () => void }) {
    const handleTrainsetDeletion = (id: number) => {
        useConfirmation().then(async ({ isConfirmed }) => {
            if (isConfirmed) {
                window.Swal.fire({
                    icon: 'success',
                    title: 'Trainset deleted successfully',
                });
                await trainsetService.delete(id);
                await handleSyncProject();
            }
        });
    };

    return (
        <div className="space-y-4">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Kode TS</TableHead>
                        <TableHead>Susunan Kereta</TableHead>
                        <TableHead></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {project?.trainsets?.map(trainset => (
                        <TableRow key={trainset.id}>
                            <TableCell>{trainset.name}</TableCell>
                            <TableCell>
                                {trainset.preset_name && `(${trainset.preset_name}) `}

                                {trainset.carriages &&
                                    trainset.carriages.length > 0 &&
                                    trainset.carriages.map((carriage, index) => (
                                        <span key={carriage.id}>
                                            {carriage.qty} {carriage.type}
                                            {index < trainset.carriages!.length - 1 && ' + '}
                                        </span>
                                    ))}
                            </TableCell>
                            <TableCell>
                                {/*<Link*/}
                                {/*    className={buttonVariants({ variant: 'link' })}*/}
                                {/*    href={route(`${ROUTES.PROJECTS_TRAINSETS}.edit`, trainset.id)}*/}
                                {/*>*/}
                                {/*    Edit*/}
                                {/*</Link>*/}
                                <Button variant="link" onClick={() => handleTrainsetDeletion(trainset.id)}>
                                    Delete
                                </Button>
                                <Link
                                    className={buttonVariants({ variant: 'link' })}
                                    href={route(`${ROUTES.PROJECTS_TRAINSETS}.show`, [project.id, trainset.id])}
                                >
                                    Detail
                                </Link>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
