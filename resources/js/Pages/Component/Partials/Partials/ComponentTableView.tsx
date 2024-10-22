import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/Components/UI/table';
import { Link } from '@inertiajs/react';
import { Button, buttonVariants } from '@/Components/UI/button';
import { ROUTES } from '@/Support/Constants/routes';
import { ComponentResource } from '@/Support/Interfaces/Resources';
import { PaginateResponse } from '@/Support/Interfaces/Others';
import { useLaravelReactI18n } from 'laravel-react-i18n';

export default function ComponentTableView({
    componentResponse,
    handleComponentDeletion,
}: {
    componentResponse: PaginateResponse<ComponentResource>;

    handleComponentDeletion: (id: number) => void;
}) {
    const { t } = useLaravelReactI18n();
    return (
        <div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>{t('pages.component.partials.partials.component_table.headers.name')}</TableHead>
                        <TableHead>{t('pages.component.partials.partials.component_table.headers.progress')}</TableHead>
                        <TableHead></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {componentResponse?.data.map(component => (
                        <TableRow key={component.id}>
                            <TableCell>{component.name}</TableCell>
                            <TableCell>{component.progress?.name}</TableCell>
                            <TableCell>
                                <Link
                                    className={buttonVariants({ variant: 'link' })}
                                    href={route(`${ROUTES.COMPONENTS}.edit`, component.id)}
                                >
                                    {t('action.edit')}
                                </Link>
                                {component.can_be_deleted && (
                                    <Button variant="link" onClick={() => handleComponentDeletion(component.id)}>
                                        {t('action.delete')}
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
