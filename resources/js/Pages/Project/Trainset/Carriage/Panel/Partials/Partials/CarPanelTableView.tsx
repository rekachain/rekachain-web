import { CarriageTrainsetResource, TrainsetResource } from '@/Support/Interfaces/Resources';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/Components/UI/table';
import { TrainsetStatusEnum } from '@/Support/Enums/trainsetStatusEnum';
import { Button } from '@/Components/UI/button';
import PanelQty from '../Components/PanelQty';

export default function CarPanelTableView({
    trainset,
    carriageTrainset,
    handleSyncCarriage,
    handlePanelDeletion,
}: {
    trainset: TrainsetResource;
    carriageTrainset: CarriageTrainsetResource;
    handleSyncCarriage: () => Promise<void>;
    handlePanelDeletion: (id: number) => void;
}) {
    return (
        <div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Nama</TableHead>
                        <TableHead>Jumlah</TableHead>
                        <TableHead>Deskripsi</TableHead>
                        <TableHead>Proses</TableHead>
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
                            <TableCell>{carriage_panel.progress?.name}</TableCell>
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
