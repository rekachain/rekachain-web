import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/Components/ui/table';
import { CarriageResource } from '@/support/interfaces/resources';
import { ROUTES } from '@/support/constants/routes';
import { Link } from '@inertiajs/react';
import { Button, buttonVariants } from '@/Components/ui/button';
import { useConfirmation } from '@/hooks/useConfirmation';
import { carriageService } from '@/services/carriageService';

export default function ({
    carriage,
    handleSyncCarriage,
}: {
    carriage: CarriageResource;
    handleSyncCarriage: () => Promise<void>;
}) {
    const handleCarriageDeletion = (carriageCarriageId: number) => {
        useConfirmation().then(async ({ isConfirmed }) => {
            if (isConfirmed) {
                window.Swal.fire({
                    icon: 'success',
                    title: 'Carriage deleted successfully',
                });
                // await carriageService.deleteCarriageCarriage(carriage.id, carriageCarriageId);
                // await handleSyncCarriage();
            }
        });
    };

    return (
        <div className="space-y-4">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Nama</TableHead>
                        <TableHead>Deskripsi</TableHead>
                        <TableHead></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {carriage?.carriage_panels?.map(panel => (
                        <TableRow key={panel.id}>
                            <TableCell>{panel.panel.name}</TableCell>
                            <TableCell>{panel.panel.description}</TableCell>
                            <TableCell>
                                {/*<Link*/}
                                {/*    className={buttonVariants({ variant: 'link' })}*/}
                                {/*    href={route(`${ROUTES.PROJECTS_TRAINSETS}.edit`, panel.id)}*/}
                                {/*>*/}
                                {/*    Edit*/}
                                {/*</Link>*/}

                                {/*<Button variant="link" onClick={() => handleCarriageDeletion(panel.pivot!.id)}>*/}
                                {/*    Delete*/}
                                {/*</Button>*/}

                                {/*<Link*/}
                                {/*    className={buttonVariants({ variant: 'link' })}*/}
                                {/*    href={route(`${ROUTES.PROJECTS_TRAINSETS_CARRIAGES_PANELS}.index`, [*/}
                                {/*        panel.project_id,*/}
                                {/*        panel.id,*/}
                                {/*        panel.id,*/}
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