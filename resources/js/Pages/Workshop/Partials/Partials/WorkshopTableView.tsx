import { Button, buttonVariants } from '@/Components/UI/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/Components/UI/table';
import { ROUTES } from '@/Support/Constants/routes';
import { PaginateResponse } from '../../../../Support/Interfaces/Others';
import { WorkshopResource } from '../../../../Support/Interfaces/Resources';
import { Link } from '@inertiajs/react';
import React from 'react';

export default function WorkshopTableView({
    workshopResponse,
    handleWorkshopDeletion,
    // auth,
}: {
    workshopResponse: PaginateResponse<WorkshopResource>;
    handleWorkshopDeletion: (id: number) => void;
    auth: any; // sementara
}) {
    return (
        <div>
            <>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Nama</TableHead>
                            <TableHead>Alamat</TableHead>
                            <TableHead></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {workshopResponse?.data.map(workshop => (
                            <TableRow key={workshop.id}>
                                <TableCell>{workshop.name}</TableCell>
                                <TableCell>{workshop.address}</TableCell>
                                <TableCell>
                                    <Link
                                        className={buttonVariants({ variant: 'link' })}
                                        href={route(`${ROUTES.WORKSHOPS}.edit`, workshop.id)}
                                    ></Link>
                                    <Button variant="link" onClick={() => handleWorkshopDeletion(workshop.id)}>
                                        Delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </>
        </div>
    );
}
