import { Button, buttonVariants } from '@/Components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/Components/ui/table';
import { ROUTES } from '@/support/constants/routes';
import { PaginateResponse } from '@/support/interfaces/others';
import { RoleResource } from '@/support/interfaces/resources';
import { Link } from '@inertiajs/react';
import React from 'react';

export default function RoleTableView({
    roleResponse,
    handleRoleDeletion,
    auth,
}: {
    roleResponse: PaginateResponse<RoleResource>;
    handleRoleDeletion: (id: number) => void;
    auth: any; // sementara
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
