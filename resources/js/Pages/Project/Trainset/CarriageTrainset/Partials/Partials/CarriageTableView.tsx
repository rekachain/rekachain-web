import { TrainsetResource } from '@/Support/Interfaces/Resources';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/Components/UI/table';
import { TrainsetStatusEnum } from '@/Support/Enums/trainsetStatusEnum';
import { Button, buttonVariants } from '@/Components/UI/button';
import { Link } from '@inertiajs/react';
import { ROUTES } from '@/Support/Constants/routes';
import CarriageQty from '../Components/CarriageQty';
import { useLaravelReactI18n } from 'laravel-react-i18n';

export default function CarriageTableView({
    trainset,
    handleCarriageDeletion,
    handleSyncTrainset,
}: {
    trainset: TrainsetResource;
    handleCarriageDeletion: (id: number) => void;
    handleSyncTrainset: () => Promise<void>;
}) {
    const { t } = useLaravelReactI18n();
    return (
        <div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>
                            {t(
                                'pages.project.trainset.carriage_trainset.partials.partials.carriage_table.headers.type',
                            )}
                        </TableHead>
                        <TableHead>
                            {t('pages.project.trainset.carriage_trainset.partials.partials.carriage_table.headers.qty')}
                        </TableHead>
                        <TableHead>
                            {t(
                                'pages.project.trainset.carriage_trainset.partials.partials.carriage_table.headers.panels',
                            )}
                        </TableHead>
                        <TableHead></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {trainset?.carriage_trainsets?.map(carriage_trainset => (
                        <TableRow key={carriage_trainset.id}>
                            <TableCell>{carriage_trainset.carriage.type}</TableCell>
                            <TableCell>
                                {trainset.status === TrainsetStatusEnum.PROGRESS ? (
                                    <span>{carriage_trainset.qty}</span>
                                ) : (
                                    <CarriageQty
                                        trainset={trainset}
                                        carriage_trainset={carriage_trainset}
                                        handleSyncTrainset={handleSyncTrainset}
                                    />
                                )}
                            </TableCell>
                            <TableCell>
                                {carriage_trainset.carriage_panels?.map(panel => (
                                    <div key={panel.id}>
                                        <span>
                                            {panel.qty} x {panel.panel.name}
                                        </span>
                                    </div>
                                ))}
                            </TableCell>
                            <TableCell>
                                {/*<Link*/}
                                {/*    className={buttonVariants({ variant: 'link' })}*/}
                                {/*    href={route(`${ROUTES.PROJECTS_TRAINSETS}.edit`, carriage_trainset.id)}*/}
                                {/*>*/}
                                {/*    Edit*/}
                                {/*</Link>*/}
                                {trainset.status !== TrainsetStatusEnum.PROGRESS && (
                                    <Button variant="link" onClick={() => handleCarriageDeletion(carriage_trainset.id)}>
                                        {t('action.delete')}
                                    </Button>
                                )}
                                <Link
                                    className={buttonVariants({ variant: 'link' })}
                                    href={route(
                                        `${ROUTES.PROJECTS_TRAINSETS_CARRIAGE_TRAINSETS_CARRIAGE_PANELS}.index`,
                                        [trainset.project_id, trainset.id, carriage_trainset.id],
                                    )}
                                >
                                    {t(
                                        'pages.project.trainset.carriage_trainset.partials.partials.carriage_table.actions.panels',
                                    )}
                                </Link>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}