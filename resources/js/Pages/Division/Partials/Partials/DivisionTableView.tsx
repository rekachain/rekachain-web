import { Button, buttonVariants } from '@/Components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/Components/ui/table';
import { ROUTES } from '@/support/constants/routes';
import { PaginateResponse } from '@/support/interfaces/others';
import { DivisionResource } from '@/support/interfaces/resources';
import { Link } from '@inertiajs/react';
import React from 'react';

export default function DivisionTableView({
    divisionResponse,
    handleDivisionDeletion,
    // auth,
}: {
    divisionResponse: PaginateResponse<DivisionResource>;
    handleDivisionDeletion: (id: number) => void;
    auth: any; // sementara
}) {
    return (
        <div className="">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Nama</TableHead>
                        <TableHead></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {divisionResponse?.data.map(division => (
                        <TableRow key={division.id}>
                            <TableCell>{division.name}</TableCell>
                            <TableCell>
                                <Link
                                    className={buttonVariants({ variant: 'link' })}
                                    href={route(`${ROUTES.DIVISIONS}.edit`, division.id)}
                                >
                                    Edit
                                </Link>
                                <Button variant="link" onClick={() => handleDivisionDeletion(division.id)}>
                                    Delete
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
