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
import { CarriageResource } from '@/Support/Interfaces/Resources';
import { Link } from '@inertiajs/react';
import { useLaravelReactI18n } from 'laravel-react-i18n';

export default function CarriageTableView({
    carriageResponse,
    handleCarriageDeletion,
    // auth,
}: {
    carriageResponse: PaginateResponse<CarriageResource>;

    handleCarriageDeletion: (id: number) => void;
    // auth: any; // sementara
}) {
    const { t } = useLaravelReactI18n();
    return (
        <div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>
                            {t('pages.carriage.partials.partials.carriage_table.headers.type')}
                        </TableHead>
                        <TableHead>
                            {t(
                                'pages.carriage.partials.partials.carriage_table.headers.description',
                            )}
                        </TableHead>
                        <TableHead></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {carriageResponse?.data.map((carriage) => (
                        <TableRow key={carriage.id}>
                            <TableCell>{carriage.type}</TableCell>
                            <TableCell>{carriage.description}</TableCell>
                            <TableCell>
                            {checkPermission(PERMISSION_ENUM.CARRIAGE_UPDATE) && (
                                <Link
                                    href={route(`${ROUTES.CARRIAGES}.edit`, carriage.id)}
                                    className={buttonVariants({ variant: 'link' })}
                                >
                                    {t('action.edit')}
                                </Link>
                            )}
                                {checkPermission(PERMISSION_ENUM.CARRIAGE_UPDATE) && carriage.can_be_deleted && (
                                    <Button
                                        variant='link'
                                        onClick={() => handleCarriageDeletion(carriage.id)}
                                    >
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
