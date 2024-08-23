import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/Components/ui/table';
import { TrainsetResource } from '@/support/interfaces/resources';
import { ROUTES } from '@/support/constants/routes';
import { Link } from '@inertiajs/react';
import { Button, buttonVariants } from '@/Components/ui/button';
import { useConfirmation } from '@/hooks/useConfirmation';
import { trainsetService } from '@/services/trainsetService';
import CarriageQty from '@/Pages/Project/Trainset/Carriage/Partials/Partials/CarriageQty';

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
                window.Swal.fire({
                    icon: 'success',
                    title: 'Trainset deleted successfully',
                });
                await trainsetService.deleteCarriageTrainset(trainset.id, carriageTrainsetId);
                await handleSyncTrainset();
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
                    {trainset?.carriages?.map(carriage => (
                        <TableRow key={carriage.id}>
                            <TableCell>{carriage.type}</TableCell>
                            <TableCell>
                                <CarriageQty
                                    trainset={trainset}
                                    carriage={carriage}
                                    handleSyncTrainset={handleSyncTrainset}
                                />
                            </TableCell>
                            <TableCell>
                                {carriage.carriagePanels?.map(panel => (
                                    <div key={panel.id}>
                                        <span>{panel.panel.name}</span>
                                    </div>
                                ))}
                            </TableCell>
                            <TableCell>
                                {/*<Link*/}
                                {/*    className={buttonVariants({ variant: 'link' })}*/}
                                {/*    href={route(`${ROUTES.PROJECTS_TRAINSETS}.edit`, carriage.id)}*/}
                                {/*>*/}
                                {/*    Edit*/}
                                {/*</Link>*/}
                                <Button variant="link" onClick={() => handleCarriageDeletion(carriage.pivot!.id)}>
                                    Delete
                                </Button>
                                <Link
                                    className={buttonVariants({ variant: 'link' })}
                                    href={route(`${ROUTES.PROJECTS_TRAINSETS}.show`, [carriage.id, carriage.id])}
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
