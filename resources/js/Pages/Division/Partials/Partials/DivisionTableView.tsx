import { PaginateResponse } from '@/Support/Interfaces/Others';
import { DivisionResource } from '@/Support/Interfaces/Resources';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/Components/UI/table';
import { Link } from '@inertiajs/react';
import { Button, buttonVariants } from '@/Components/UI/button';
import { ROUTES } from '@/Support/Constants/routes';
import React from 'react';
import { useLaravelReactI18n } from 'laravel-react-i18n';

export default function DivisionTableView({
    divisionResponse,
    handleDivisionDeletion,
}: {
    divisionResponse: PaginateResponse<DivisionResource>;
    handleDivisionDeletion: (id: number) => void;
}) {
    const { t } = useLaravelReactI18n();
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>{t('pages.division.partials.partials.divisions_table.headers.name')}</TableHead>
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
                                {t('action.edit')}
                            </Link>
                            <Button variant="link" onClick={() => handleDivisionDeletion(division.id)}>
                                {t('action.delete')}
                            </Button>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}
