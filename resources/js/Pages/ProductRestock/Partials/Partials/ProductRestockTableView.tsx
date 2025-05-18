import { Button } from '@/Components/UI/button';
import { Checkbox } from '@/Components/UI/checkbox';
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
import { ProductRestockStatusEnum } from '@/Support/Enums/productRestockStatusEnum';
import { PaginateResponse } from '@/Support/Interfaces/Others';
import { ProductRestockResource } from '@/Support/Interfaces/Resources';
import { router } from '@inertiajs/react';
import { useLaravelReactI18n } from 'laravel-react-i18n';
import UpdateProductRestockStatus from './Partials/UpdateProductRestockStatus';

export default function ProductRestockTableView({
    productRestockResponse,
    handleProductRestockDeletion,
    isSelecting,
    selectedIds,
    handleSelectionChange,
    handleSyncProductRestock,
    localizedStatuses,
}: {
    productRestockResponse: PaginateResponse<ProductRestockResource>;
    handleProductRestockDeletion: (id: number) => void;
    isSelecting: boolean;
    selectedIds: number[];
    handleSelectionChange: (selectedId: number) => void;
    handleSyncProductRestock: () => Promise<void>;
    localizedStatuses: Record<string, string>;
}) {
    const { t } = useLaravelReactI18n();
    return (
        <>
            <Table>
                <TableHeader>
                    <TableRow>
                        {isSelecting && <TableHead></TableHead>}
                        <TableHead>
                            {t(
                                'pages.product_restock.partials.partials.product_restock_table.headers.buyer',
                            )}
                        </TableHead>
                        <TableHead>
                            {t(
                                'pages.product_restock.partials.partials.product_restock_table.headers.serial_number',
                            )}
                        </TableHead>
                        <TableHead>
                            {t(
                                'pages.product_restock.partials.partials.product_restock_table.headers.name',
                            )}
                        </TableHead>
                        <TableHead>
                            {t(
                                'pages.product_restock.partials.partials.product_restock_table.headers.description',
                            )}
                        </TableHead>
                        <TableHead>
                            {t(
                                'pages.product_restock.partials.partials.product_restock_table.headers.type',
                            )}
                        </TableHead>
                        <TableHead>
                            {t(
                                'pages.product_restock.partials.partials.product_restock_table.headers.status',
                            )}
                        </TableHead>
                        <TableHead></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {productRestockResponse?.data.map((productRestock) => (
                        <TableRow
                            onClick={() => {
                                if (
                                    isSelecting &&
                                    productRestock.status === ProductRestockStatusEnum.REQUESTED
                                ) {
                                    handleSelectionChange(productRestock.id);
                                }
                            }}
                            key={productRestock.id}
                        >
                            {isSelecting && (
                                <TableCell>
                                    <Checkbox
                                        onCheckedChange={() =>
                                            handleSelectionChange(productRestock.id)
                                        }
                                        disabled={
                                            productRestock.status !==
                                            ProductRestockStatusEnum.REQUESTED
                                        }
                                        checked={selectedIds.includes(productRestock.id)}
                                    />
                                </TableCell>
                            )}
                            <TableCell>
                                {productRestock.returned_product?.buyer?.name ?? '-'}
                            </TableCell>
                            <TableCell>{productRestock.returned_product?.serial_number}</TableCell>
                            <TableCell>{productRestock.product_restockable?.name}</TableCell>
                            <TableCell>{productRestock.product_restockable?.description}</TableCell>
                            <TableCell>
                                {productRestock.product_restockable_type === 'App\\Models\\Panel'
                                    ? 'Panel'
                                    : 'Component'}
                            </TableCell>
                            <TableCell>{productRestock.localized_status}</TableCell>

                            <TableCell>
                                {checkPermission(PERMISSION_ENUM.RETURNED_PRODUCT_READ) && productRestock.project_url && (
                                    <Button
                                        variant={'link'}
                                        onClick={() =>
                                            router.visit(productRestock.project_url ?? '#')
                                        }
                                        disabled={isSelecting}
                                    >
                                        {t('action.show')}
                                    </Button>
                                )}
                                {/* {checkPermission(PERMISSION_ENUM.RETURNED_PRODUCT_UPDATE) && (
                                    <UpdateProductRestockStatus
                                        productRestock={productRestock}
                                        localizedStatuses={localizedStatuses}
                                        handleSyncProductRestock={handleSyncProductRestock}
                                    />
                                )} */}
                                {checkPermission(PERMISSION_ENUM.RETURNED_PRODUCT_DELETE) && productRestock.status === ProductRestockStatusEnum.REQUESTED && (
                                    <Button
                                        variant='link'
                                        onClick={() =>
                                            handleProductRestockDeletion(productRestock.id)
                                        }
                                        disabled={isSelecting}
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
