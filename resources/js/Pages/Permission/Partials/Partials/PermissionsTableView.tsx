import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/Components/UI/table';
import { PaginateResponse } from '@/Support/Interfaces/Others';
import { PermissionResource } from '@/Support/Interfaces/Resources';
import React from 'react';
import { useLaravelReactI18n } from 'laravel-react-i18n';

export default function PermissionsTableView({
    permissionResponse,
    handlePermissionDeletion,
}: {
    permissionResponse: PaginateResponse<PermissionResource>;
    handlePermissionDeletion: (id: number) => void;
}) {
    const { t } = useLaravelReactI18n();
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>
                        {t('pages.permissions.index.partials.permissions.partials.permissions_table.headers.group')}
                    </TableHead>
                    <TableHead>
                        {t('pages.permissions.index.partials.permissions.partials.permissions_table.headers.name')}
                    </TableHead>
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
