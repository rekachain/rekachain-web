import { Button, buttonVariants } from '@/Components/UI/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/Components/UI/table';
import { ROUTES } from '@/Support/Constants/routes';
import { PaginateResponse } from '../../../../Support/Interfaces/Others';
import { WorkstationResource } from '../../../../Support/Interfaces/Resources';
import { Link } from '@inertiajs/react';
import React from 'react';

export default function WorkstationTableView({
    workstationResponse,
    handleWorkstationDeletion,
    // auth,
}: {
    workstationResponse: PaginateResponse<WorkstationResource>;
    handleWorkstationDeletion: (id: number) => void;
    // auth: any; // sementara
}) {
    return (
        <>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Nama</TableHead>
                        <TableHead>Lokasi</TableHead>
                        <TableHead>Workshop</TableHead>
                        <TableHead>Divisi</TableHead>
                        <TableHead></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {workstationResponse?.data.map(workstation => (
                        <TableRow key={workstation.id}>
                            <TableCell>{workstation.name}</TableCell>
                            <TableCell>{workstation.location}</TableCell>
                            <TableCell>{workstation.workshop.name}</TableCell>
                            <TableCell>{workstation.division.name}</TableCell>

                            <TableCell>
                                <Link
                                    className={buttonVariants({ variant: 'link' })}
                                    href={route(`${ROUTES.WORKSTATIONS}.edit`, workstation.id)}
                                >
                                    Edit
                                </Link>
                                <Button variant="link" onClick={() => handleWorkstationDeletion(workstation.id)}>
                                    Delete
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </>
    );
}
