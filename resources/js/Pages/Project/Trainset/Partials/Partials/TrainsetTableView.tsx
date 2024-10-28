import { ProjectResource } from '@/Support/Interfaces/Resources';
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/Components/UI/table';
import TrainsetName from '@/Pages/Project/Trainset/Partials/Partials/Components/TrainsetName';
import { Button, buttonVariants } from '@/Components/UI/button';
import { Link } from '@inertiajs/react';
import { ROUTES } from '@/Support/Constants/routes';
import { useLaravelReactI18n } from 'laravel-react-i18n';

export default function TrainsetTableView({
    project,
    handleTrainsetDeletion,
    loading,
}: {
    project: ProjectResource;
    handleTrainsetDeletion: (id: number) => void;
    loading: boolean;
}) {
    const { t } = useLaravelReactI18n();
    return (
        <div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>
                            {t('pages.project.trainset.partials.partials.trainset_table.headers.name')}
                        </TableHead>
                        <TableHead>
                            {t('pages.project.trainset.partials.partials.trainset_table.headers.trainset_carriage')}
                        </TableHead>
                        <TableHead></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {project?.trainsets?.map(trainset => (
                        <TableRow key={trainset.id}>
                            <TableCell>
                                <TrainsetName trainset={trainset} />
                            </TableCell>
                            <TableCell>
                                {trainset.preset_name && `(${trainset.preset_name}) `}

                                {trainset.carriages &&
                                    trainset.carriages.length > 0 &&
                                    trainset.carriages.map((carriage, index) => (
                                        <span key={carriage.id}>
                                            {carriage.pivot?.qty} {carriage.type}
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
                                <Button
                                    variant="link"
                                    disabled={loading || !trainset.can_be_deleted}
                                    onClick={() => handleTrainsetDeletion(trainset.id)}
                                >
                                    {t('action.delete')}
                                </Button>
                                <Link
                                    className={buttonVariants({ variant: 'link' })}
                                    href={route(`${ROUTES.PROJECTS_TRAINSETS_CARRIAGES}.index`, [
                                        project.id,
                                        trainset.id,
                                    ])}
                                >
                                    {t('pages.project.trainset.partials.partials.trainset_table.actions.carriages')}
                                </Link>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
