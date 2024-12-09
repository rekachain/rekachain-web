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
import { WorkstationResource } from '@/Support/Interfaces/Resources';
import { Link } from '@inertiajs/react';
import { useLaravelReactI18n } from 'laravel-react-i18n';

export default function WorkstationTableView({
    workstationResponse,
    handleWorkstationDeletion,
}: {
    workstationResponse: PaginateResponse<WorkstationResource>;
    handleWorkstationDeletion: (id: number) => void;
}) {
    const { t } = useLaravelReactI18n();
    return (
        <>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>
                            {t(
                                'pages.workstation.partials.partials.workstation_table.headers.name',
                            )}
                        </TableHead>
                        <TableHead>
                            {t(
                                'pages.workstation.partials.partials.workstation_table.headers.location',
                            )}
                        </TableHead>
                        <TableHead>
                            {t(
                                'pages.workstation.partials.partials.workstation_table.headers.workshop',
                            )}
                        </TableHead>
                        <TableHead>
                            {t(
                                'pages.workstation.partials.partials.workstation_table.headers.division',
                            )}
                        </TableHead>
                        <TableHead></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {workstationResponse?.data.map((workstation) => (
                        <TableRow key={workstation.id}>
                            <TableCell>{workstation.name}</TableCell>
                            <TableCell>{workstation.location}</TableCell>
                            <TableCell>{workstation.workshop.name}</TableCell>
                            <TableCell>{workstation.division.name}</TableCell>

                            <TableCell>
                                {checkPermission(PERMISSION_ENUM.WORKSTATION_UPDATE) && (
                                <Link
                                    href={route(`${ROUTES.WORKSTATIONS}.edit`, workstation.id)}
                                    className={buttonVariants({ variant: 'link' })}
                                >
                                    {t('action.edit')}
                                </Link>
                                )}
                                {checkPermission(PERMISSION_ENUM.WORKSTATION_DELETE) &&workstation.can_be_deleted && (
                                    <Button
                                        variant='link'
                                        onClick={() => handleWorkstationDeletion(workstation.id)}
                                    >
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
