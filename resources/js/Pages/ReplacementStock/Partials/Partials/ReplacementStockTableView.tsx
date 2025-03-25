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
import { ReplacementStockResource } from '@/Support/Interfaces/Resources';
import { Link } from '@inertiajs/react';
import { useLaravelReactI18n } from 'laravel-react-i18n';

export default function ReplacementStockTableView({
    replacementStockResponse,
    handleReplacementStockDeletion,
}: {
    replacementStockResponse: PaginateResponse<ReplacementStockResource>;
    handleReplacementStockDeletion: (id: number) => void;
}) {
    const { t } = useLaravelReactI18n();
    return (
        <div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>
                            {t('pages.replacement_stock.partials.partials.replacement_stock_table.headers.component_name')}
                        </TableHead>
                        <TableHead>
                            {t('pages.replacement_stock.partials.partials.replacement_stock_table.headers.component_description')}
                        </TableHead>
                        <TableHead>
                            {t(
                                'pages.replacement_stock.partials.partials.replacement_stock_table.headers.qty',
                            )}
                        </TableHead>
                        <TableHead>
                            {t(
                                'pages.replacement_stock.partials.partials.replacement_stock_table.headers.threshold',
                            )}
                        </TableHead>
                        <TableHead></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {replacementStockResponse?.data.map((stock) => (
                        <TableRow key={stock.id}>
                            <TableCell>{stock.component?.name || '-'}</TableCell>
                            <TableCell>{stock.component?.description || '-'}</TableCell>
                            <TableCell>{stock.qty}</TableCell>
                            <TableCell>{stock.threshold}</TableCell>
                            <TableCell>
                                {/* {checkPermission(PERMISSION_ENUM.REPLACEMENT_STOCK_UPDATE) && (
                                    <Link
                                        href={route(`${ROUTES.REPLACEMENT_STOCKS}.edit`, stock.id)}
                                        className={buttonVariants({ variant: 'link' })}
                                    >
                                        {t('action.edit')}
                                    </Link>
                                )} */}
                                {checkPermission(PERMISSION_ENUM.REPLACEMENT_STOCK_DELETE) && (
                                    <Button
                                        variant='link'
                                        onClick={() => handleReplacementStockDeletion(stock.id)}
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
