import { Button, buttonVariants } from '@/Components/UI/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/Components/UI/table';
import { ROUTES } from '@/Support/Constants/routes';
import { PaginateResponse } from '@/Support/Interfaces/Others';
import { RoleResource } from '@/Support/Interfaces/Resources';
import { Link } from '@inertiajs/react';
import React from 'react';

export default function RoleTableView({
    roleResponse,
    handleRoleDeletion,
}: {
    roleResponse: PaginateResponse<RoleResource>;
    handleRoleDeletion: (id: number) => void;
}) {
    return (
        <>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Nama</TableHead>
                        <TableHead>Divisi</TableHead>
                        <TableHead>Level</TableHead>
                        <TableHead>Jumlah User</TableHead>
                        <TableHead>Jumlah Izin</TableHead>
                        <TableHead></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {roleResponse?.data.map(role => (
                        <TableRow key={role.id}>
                            <TableCell>{role.name}</TableCell>
                            <TableCell>{role.division?.name}</TableCell>
                            <TableCell>{role.level}</TableCell>
                            <TableCell>{role.users_count}</TableCell>
                            <TableCell>{role.permissions_count}</TableCell>
                            <TableCell>
                                <Link
                                    className={buttonVariants({ variant: 'link' })}
                                    href={route(`${ROUTES.ROLES}.edit`, role.id)}
                                >
                                    Edit
                                </Link>
                                {role.users_count <= 0 && (
                                    <Button variant="link" onClick={() => handleRoleDeletion(role.id)}>
                                        Delete
                                    </Button>
                                )}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </>
    );
}
