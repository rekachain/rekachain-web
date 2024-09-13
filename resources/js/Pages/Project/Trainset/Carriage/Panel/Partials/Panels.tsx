import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/Components/ui/table';
import { CarriageTrainsetResource, TrainsetResource } from '@/support/interfaces/resources';
import { useConfirmation } from '@/hooks/useConfirmation';
import PanelQty from '@/Pages/Project/Trainset/Carriage/Panel/Partials/Components/PanelQty';
import { Button } from '@/Components/ui/button';
import { carriagePanelService } from '@/services/carriagePanelService';
import { useSuccessToast } from '@/hooks/useToast';
import { TrainsetStatusEnum } from '@/support/enums/trainsetStatusEnum';

export default function ({
    trainset,
    carriageTrainset,
    handleSyncCarriage,
}: {
    trainset: TrainsetResource;
    carriageTrainset: CarriageTrainsetResource;
    handleSyncCarriage: () => Promise<void>;
}) {
    const handlePanelDeletion = (carriageCarriageId: number) => {
        useConfirmation().then(async ({ isConfirmed }) => {
            if (isConfirmed) {
                await carriagePanelService.delete(carriageCarriageId);
                await handleSyncCarriage();
                useSuccessToast('Panel deleted successfully');
            }
        });
    };

    return (
        <div className="space-y-4">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Nama</TableHead>
                        <TableHead>Jumlah</TableHead>
                        <TableHead>Deskripsi</TableHead>
                        <TableHead></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {carriageTrainset?.carriage_panels?.map(carriage_panel => (
                        <TableRow key={carriage_panel.id}>
                            <TableCell>{carriage_panel.panel.name}</TableCell>
                            <TableCell>
                                {trainset.status === TrainsetStatusEnum.PROGRESS ? (
                                    <span>{carriage_panel.qty}</span>
                                ) : (
                                    <PanelQty handleSyncCarriage={handleSyncCarriage} carriage_panel={carriage_panel} />
                                )}
                            </TableCell>
                            <TableCell>{carriage_panel.panel.description}</TableCell>
                            <TableCell>
                                {/*<Link*/}
                                {/*    className={buttonVariants({ variant: 'link' })}*/}
                                {/*    href={route(`${ROUTES.PROJECTS_TRAINSETS}.edit`, carriage_panel.id)}*/}
                                {/*>*/}
                                {/*    Edit*/}
                                {/*</Link>*/}

                                {trainset.status !== TrainsetStatusEnum.PROGRESS && (
                                    <Button variant="link" onClick={() => handlePanelDeletion(carriage_panel.id)}>
                                        Delete
                                    </Button>
                                )}

                                {/*<Link*/}
                                {/*    className={buttonVariants({ variant: 'link' })}*/}
                                {/*    href={route(`${ROUTES.PROJECTS_TRAINSETS_CARRIAGES_PANELS}.index`, [*/}
                                {/*        carriage_panel.project_id,*/}
                                {/*        carriage_panel.id,*/}
                                {/*        carriage_panel.id,*/}
                                {/*    ])}*/}
                                {/*>*/}
                                {/*    Detail*/}
                                {/*</Link>*/}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
