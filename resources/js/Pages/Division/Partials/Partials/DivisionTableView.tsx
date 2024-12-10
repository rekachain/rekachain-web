import { Button, buttonVariants } from '@/Components/UI/button';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/Components/UI/table';
import { checkPermission } from '@/Helpers/permissionHelper';
import { ROUTES } from '@/Support/Constants/routes';
import { PERMISSION_ENUM } from '@/Support/Enums/permissionEnum';
import { PaginateResponse } from '@/Support/Interfaces/Others';
import { DivisionResource } from '@/Support/Interfaces/Resources';
import { Link } from '@inertiajs/react';
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
                    <TableHead>
                        {t('pages.division.partials.partials.division_table.headers.name')}
                    </TableHead>
                    <TableHead></TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {divisionResponse?.data.map((division) => (
                    <TableRow key={division.id}>
                        <TableCell>{division.name}</TableCell>
                        <TableCell>
                            {checkPermission(PERMISSION_ENUM.DIVISION_UPDATE) && (
                                <Link
                                    href={route(`${ROUTES.DIVISIONS}.edit`, division.id)}
                                    className={buttonVariants({ variant: 'link' })}
                                >
                                    {t('action.edit')}
                                </Link>
                            )}
                            {checkPermission(PERMISSION_ENUM.DIVISION_DELETE) &&
                                division.can_be_deleted && (
                                    <Button
                                        variant='link'
                                        onClick={() => handleDivisionDeletion(division.id)}
                                    >
                                        {t('action.delete')}
                                    </Button>
                                )}
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}
