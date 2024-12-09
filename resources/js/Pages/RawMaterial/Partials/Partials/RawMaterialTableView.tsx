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
import { RawMaterialResource } from '@/Support/Interfaces/Resources';
import { Link } from '@inertiajs/react';
import { useLaravelReactI18n } from 'laravel-react-i18n';

export default function RawMaterialTableView({
    rawMaterialResponse,
    handleRawMaterialDeletion,
}: {
    rawMaterialResponse: PaginateResponse<RawMaterialResource>;
    handleRawMaterialDeletion: (id: number) => void;
}) {
    const { t } = useLaravelReactI18n();
    return (
        <div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>
                            {t(
                                'pages.raw_material.partials.partials.raw_material_table.headers.material_code',
                            )}
                        </TableHead>
                        <TableHead>
                            {t(
                                'pages.raw_material.partials.partials.raw_material_table.headers.description',
                            )}
                        </TableHead>
                        <TableHead>
                            {t(
                                'pages.raw_material.partials.partials.raw_material_table.headers.specs',
                            )}
                        </TableHead>
                        <TableHead>
                            {t(
                                'pages.raw_material.partials.partials.raw_material_table.headers.unit',
                            )}
                        </TableHead>
                        <TableHead></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {rawMaterialResponse?.data.map((rawMaterial) => (
                        <TableRow key={rawMaterial.id}>
                            <TableCell>{rawMaterial.material_code}</TableCell>
                            <TableCell>{rawMaterial.description}</TableCell>
                            <TableCell>{rawMaterial.specs}</TableCell>
                            <TableCell>{rawMaterial.unit}</TableCell>
                            <TableCell>
                                {checkPermission(PERMISSION_ENUM.RAW_MATERIAL_UPDATE) && (
                                    <Link
                                    href={route(`${ROUTES.RAW_MATERIALS}.edit`, rawMaterial.id)}
                                    className={buttonVariants({ variant: 'link' })}
                                    >
                                    {t('action.edit')}
                                </Link>
                                )}
                                {checkPermission(PERMISSION_ENUM.RAW_MATERIAL_DELETE) && rawMaterial.can_be_deleted && (
                                    <Button
                                        variant='link'
                                        onClick={() => handleRawMaterialDeletion(rawMaterial.id)}
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
