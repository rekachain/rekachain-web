import { PaginateResponse } from '@/Support/interfaces/others';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/Components/ui/table';
import { PanelResource } from '@/Support/interfaces/resources';
import React from 'react';
import { Link } from '@inertiajs/react';
import { Button, buttonVariants } from '@/Components/ui/button';
import { ROUTES } from '@/Support/constants/routes';

export default function PanelCardView({
    panelResponse,
    handlePanelDeletion,
    auth,
}: {
    panelResponse: PaginateResponse<PanelResource>;
    handlePanelDeletion: (id: number) => void;
    auth: any; // sementara
}) {
    return (
        <div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Nama</TableHead>
                        <TableHead>Deskripsi</TableHead>
                        <TableHead></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {panelResponse?.data.map(panel => (
                        <TableRow key={panel.id}>
                            <TableCell>{panel.name}</TableCell>
                            <TableCell>{panel.description}</TableCell>
                            <TableCell>
                                <Link
                                    className={buttonVariants({ variant: 'link' })}
                                    href={route(`${ROUTES.PANELS}.edit`, panel.id)}
                                >
                                    Edit
                                </Link>
                                {panel.can_be_deleted && (
                                    <Button variant="link" onClick={() => handlePanelDeletion(panel.id)}>
                                        Delete
                                    </Button>
                                )}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
