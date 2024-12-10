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
import { WorkshopResource } from '@/Support/Interfaces/Resources';
import { Link } from '@inertiajs/react';
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
                                {t('pages.workshop.partials.partials.workshop_table.headers.name')}
                            </TableHead>
                            <TableHead>
                                {t(
                                    'pages.workshop.partials.partials.workshop_table.headers.address',
                                )}
                            </TableHead>
                            <TableHead></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {workshopResponse?.data.map((workshop) => (
                            <TableRow key={workshop.id}>
                                <TableCell>{workshop.name}</TableCell>
                                <TableCell>{workshop.address}</TableCell>
                                <TableCell>
                                    {checkPermission(PERMISSION_ENUM.WORKSHOP_UPDATE) && (
                                        <Link
                                            href={route(`${ROUTES.WORKSHOPS}.edit`, workshop.id)}
                                            className={buttonVariants({ variant: 'link' })}
                                        >
                                            {t('action.edit')}
                                        </Link>
                                    )}
                                    {checkPermission(PERMISSION_ENUM.WORKSHOP_DELETE) &&
                                        workshop.can_be_deleted && (
                                            <Button
                                                variant='link'
                                                onClick={() => handleWorkshopDeletion(workshop.id)}
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
        </div>
    );
}
