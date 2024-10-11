import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/Components/UI/table';
import { TrainsetResource } from '@/Support/Interfaces/Resources';
import { ROUTES } from '@/Support/Constants/routes';
import { Link } from '@inertiajs/react';
import { Button, buttonVariants } from '@/Components/UI/button';
import { carriageTrainsetService } from '@/Services/carriageTrainsetService';
import { useSuccessToast } from '@/Hooks/useToast';
import { TrainsetStatusEnum } from '@/Support/Enums/trainsetStatusEnum';
import CarriageQty from '@/Pages/Project/Trainset/Carriage/Partials/Components/CarriageQty';
import { withLoading } from '@/Utils/withLoading';
import CarriageCardView from './Partials/CarriageCardView';

export default function ({
    trainset,
    handleSyncTrainset,
}: {
    trainset: TrainsetResource;
    handleSyncTrainset: () => Promise<void>;
}) {
    const handleCarriageDeletion = withLoading(async (carriageTrainsetId: number) => {
        await carriageTrainsetService.delete(carriageTrainsetId);
        await handleSyncTrainset();
        void useSuccessToast('Carriage deleted successfully');
    }, true);

    return (
        <div className="space-y-4">
            <div className="hidden md:block">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Susunan Kereta</TableHead>
                            <TableHead>Jumlah</TableHead>
                            <TableHead>Panel dalam susunan kereta</TableHead>
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
                                        <Button
                                            variant="link"
                                            onClick={() => handleCarriageDeletion(carriage_trainset.id)}
                                        >
                                            Delete
                                        </Button>
                                    )}
                                    <Link
                                        className={buttonVariants({ variant: 'link' })}
                                        href={route(`${ROUTES.PROJECTS_TRAINSETS_CARRIAGE_TRAINSETS_PANELS}.index`, [
                                            trainset.project_id,
                                            trainset.id,
                                            carriage_trainset.id,
                                        ])}
                                    >
                                        Panel
                                    </Link>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            <div className="block md:hidden">
                <CarriageCardView
                    handleSyncTrainset={handleSyncTrainset}
                    trainset={trainset}
                    handleTrainsetDeletion={handleCarriageDeletion}
                ></CarriageCardView>
            </div>
        </div>
    );
}
