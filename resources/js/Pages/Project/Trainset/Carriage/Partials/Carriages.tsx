import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/Components/ui/table';
import { TrainsetResource } from '@/Support/interfaces/resources';
import { ROUTES } from '@/Support/constants/routes';
import { Link } from '@inertiajs/react';
import { Button, buttonVariants } from '@/Components/ui/button';
import { useConfirmation } from '@/Hooks/useConfirmation';
import { carriageTrainsetService } from '@/Services/carriageTrainsetService';
import { useSuccessToast } from '@/Hooks/useToast';
import { TrainsetStatusEnum } from '@/Support/enums/trainsetStatusEnum';
import CarriageQty from '@/Pages/Project/Trainset/Carriage/Partials/Components/CarriageQty';

export default function ({
    trainset,
    handleSyncTrainset,
}: {
    trainset: TrainsetResource;
    handleSyncTrainset: () => Promise<void>;
}) {
    const handleCarriageDeletion = (carriageTrainsetId: number) => {
        useConfirmation().then(async ({ isConfirmed }) => {
            if (isConfirmed) {
                await carriageTrainsetService.delete(carriageTrainsetId);
                await handleSyncTrainset();
                useSuccessToast('Carriage deleted successfully');
            }
        });
    };

    return (
        <div className="space-y-4">
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
                                    <Button variant="link" onClick={() => handleCarriageDeletion(carriage_trainset.id)}>
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
    );
}
