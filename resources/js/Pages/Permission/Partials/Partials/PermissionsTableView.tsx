import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/Components/ui/table';
import { PaginateResponse } from '@/support/interfaces/others';
import { PermissionResource } from '@/support/interfaces/resources';
import React from 'react';

export default function PermissionsTableView({
    permissionResponse,
    handlePermissionDeletion,
    // auth,
}: {
    permissionResponse: PaginateResponse<PermissionResource>;
    handlePermissionDeletion: (id: number) => void;
    // auth: any; // sementara
}) {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Group</TableHead>
                    <TableHead>Nama</TableHead>
                    <TableHead></TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {permissionResponse?.data.map(permission => (
                    <TableRow key={permission.id}>
                        <TableCell>{permission.group}</TableCell>
                        <TableCell>{permission.name}</TableCell>
                        <TableCell>
                            {/*<Link*/}
                            {/*    className={buttonVariants({ variant: 'link' })}*/}
                            {/*    href={route(`${ROUTES.ROLES}.edit`, permission.id)}*/}
                            {/*>*/}
                            {/*    Edit*/}
                            {/*</Link>*/}

                            {/*<Button*/}
                            {/*    variant="link"*/}
                            {/*    onClick={() => handlePermissionResourceDeletion(permission.id)}*/}
                            {/*>*/}
                            {/*    Delete*/}
                            {/*</Button>*/}
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}