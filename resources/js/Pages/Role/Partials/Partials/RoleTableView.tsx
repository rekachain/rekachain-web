import { Button, buttonVariants } from '@/Components/UI/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/Components/UI/table';
import { ROUTES } from '@/Support/Constants/routes';
import { PaginateResponse } from '@/Support/Interfaces/Others';
import { RoleResource } from '@/Support/Interfaces/Resources';
import { Link } from '@inertiajs/react';
import React from 'react';
import { useLaravelReactI18n } from 'laravel-react-i18n';

export default function RoleTableView({
    roleResponse,
    handleRoleDeletion,
}: {
    roleResponse: PaginateResponse<RoleResource>;
    handleRoleDeletion: (id: number) => void;
}) {
    const { t } = useLaravelReactI18n();
    return (
        <>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>{t('pages.role.partials.partials.role_table.headers.name')}</TableHead>
                        <TableHead>{t('pages.role.partials.partials.role_table.headers.division')}</TableHead>
                        <TableHead>{t('pages.role.partials.partials.role_table.headers.level')}</TableHead>
                        <TableHead>{t('pages.role.partials.partials.role_table.headers.users_count')}</TableHead>
                        <TableHead>{t('pages.role.partials.partials.role_table.headers.permissions_count')}</TableHead>
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
                                    href={route(`${ROUTES.ROLES}.edit`, role.id)}
                                    className={buttonVariants({ variant: 'link' })}
                                >
                                    {t('action.edit')}
                                </Link>
                                {role.users_count <= 0 && (
                                    <Button variant="link" onClick={() => handleRoleDeletion(role.id)}>
                                        {t('action.delete')}
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
