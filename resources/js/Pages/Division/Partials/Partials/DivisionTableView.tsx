import { PaginateResponse } from '../../../../Support/Interfaces/Others';
import { DivisionResource } from '../../../../Support/Interfaces/Resources';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/Components/UI/table';
import { Link } from '@inertiajs/react';
import { Button, buttonVariants } from '@/Components/UI/button';
import { ROUTES } from '@/Support/Constants/routes';
import React from 'react';

export default function DivisionTableView({
    divisionResponse,
    handleDivisionDeletion,
    auth,
}: {
    divisionResponse: PaginateResponse<DivisionResource>;
    handleDivisionDeletion: (id: number) => void;
    auth: any; // sementara
}) {
    return (
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
    );
}
