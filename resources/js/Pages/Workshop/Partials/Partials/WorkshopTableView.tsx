import { Button, buttonVariants } from '@/Components/UI/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/Components/UI/table';
import { ROUTES } from '@/Support/Constants/routes';
import { PaginateResponse } from '@/Support/Interfaces/Others';
import { WorkshopResource } from '@/Support/Interfaces/Resources';
import { Link } from '@inertiajs/react';
import React from 'react';
import { useLaravelReactI18n } from 'laravel-react-i18n';

export default function WorkshopTableView({
    workshopResponse,
    handleWorkshopDeletion,
}: {
    workshopResponse: PaginateResponse<WorkshopResource>;
    handleWorkshopDeletion: (id: number) => void;
}) {
    const { t } = useLaravelReactI18n();
    return (
        <div>
            <>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>
                                {t('pages.workshops.index.partials.workshops.partials.workshops_table.headers.name')}
                            </TableHead>
                            <TableHead>
                                {t('pages.workshops.index.partials.workshops.partials.workshops_table.headers.address')}
                            </TableHead>
                            <TableHead></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {workshopResponse?.data.map(workshop => (
                            <TableRow key={workshop.id}>
                                <TableCell>{workshop.name}</TableCell>
                                <TableCell>{workshop.address}</TableCell>
                                <TableCell>
                                    <Link
                                        className={buttonVariants({ variant: 'link' })}
                                        href={route(`${ROUTES.WORKSHOPS}.edit`, workshop.id)}
                                    >
                                        {t('action.edit')}
                                    </Link>
                                    <Button variant="link" onClick={() => handleWorkshopDeletion(workshop.id)}>
                                        {t('action.delete')}
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </>
        </div>
    );
}
