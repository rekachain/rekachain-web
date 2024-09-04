import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/Components/ui/table';
import { TrainsetResource } from '@/support/interfaces/resources';
import { ROUTES } from '@/support/constants/routes';
import { Link } from '@inertiajs/react';
import { Button, buttonVariants } from '@/Components/ui/button';
import { useConfirmation } from '@/hooks/useConfirmation';
import CarriageQty from '@/Pages/Project/Trainset/Carriage/Partials/Components/CarriageQty';
import { carriageTrainsetService } from '@/services/carriageTrainsetService';
import { useSuccessToast } from '@/hooks/useToast';

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
                                <CarriageQty
                                    trainset={trainset}
                                    carriage_trainset={carriage_trainset}
                                    handleSyncTrainset={handleSyncTrainset}
                                />
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
                                <Button variant="link" onClick={() => handleCarriageDeletion(carriage_trainset.id)}>
                                    Delete
                                </Button>
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
