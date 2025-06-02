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
import { ReturnedProductStatusEnum } from '@/Support/Enums/returnedProductStatusEnum';
import { PaginateResponse } from '@/Support/Interfaces/Others';
import { ReturnedProductResource } from '@/Support/Interfaces/Resources';
import { Link } from '@inertiajs/react';
import { useLaravelReactI18n } from 'laravel-react-i18n';

export default function ReturnedProductTableView({
    returnedProductResponse,
    handleReturnedProductDeletion,
}: {
    returnedProductResponse: PaginateResponse<ReturnedProductResource>;
    handleReturnedProductDeletion: (id: number) => void;
}) {
    const { t } = useLaravelReactI18n();
    return (
        <>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>
                            {t(
                                'pages.returned_product.partials.partials.returned_product_table.headers.buyer',
                            )}
                        </TableHead>
                        <TableHead>
                            {t(
                                'pages.returned_product.partials.partials.returned_product_table.headers.serial_number',
                            )}
                        </TableHead>
                        <TableHead>
                            {t(
                                'pages.returned_product.partials.partials.returned_product_table.headers.name',
                            )}
                        </TableHead>
                        <TableHead>
                            {t(
                                'pages.returned_product.partials.partials.returned_product_table.headers.description',
                            )}
                        </TableHead>
                        <TableHead>
                            {t(
                                'pages.returned_product.partials.partials.returned_product_table.headers.type',
                            )}
                        </TableHead>
                        <TableHead>
                            {t(
                                'pages.returned_product.partials.partials.returned_product_table.headers.note',
                            )}
                        </TableHead>
                        <TableHead>
                            {t(
                                'pages.returned_product.partials.partials.returned_product_table.headers.status',
                            )}
                        </TableHead>
                        <TableHead></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {returnedProductResponse?.data.map((returnedProduct) => (
                        <TableRow key={returnedProduct.id}>
                            <TableCell>{returnedProduct.buyer?.name ?? '-'}</TableCell>
                            <TableCell>{returnedProduct.serial_number}</TableCell>
                            <TableCell>{returnedProduct.product_return?.name}</TableCell>
                            <TableCell>{returnedProduct.product_return?.description}</TableCell>
                            <TableCell>
                                {returnedProduct.product_returnable_type === 'App\\Models\\Panel'
                                    ? 'Panel'
                                    : 'Component'}
                            </TableCell>
                            <TableCell>
                                {returnedProduct.latest_returned_product_note?.note ?? '-'}
                            </TableCell>
                            <TableCell>{returnedProduct.localized_status}</TableCell>

                            <TableCell className='flex flex-wrap gap-2'>
                                {checkPermission(PERMISSION_ENUM.RETURNED_PRODUCT_READ) && (
                                    <Link
                                        href={route(
                                            `${ROUTES.RETURNED_PRODUCTS}.show`,
                                            returnedProduct.id,
                                        )}
                                        className={buttonVariants({ variant: 'outline' })}
                                    >
                                        {t('action.show')}
                                    </Link>
                                )}
                                {checkPermission(PERMISSION_ENUM.RETURNED_PRODUCT_UPDATE) &&
                                    [
                                        ReturnedProductStatusEnum.DRAFT,
                                        ReturnedProductStatusEnum.PROGRESS,
                                    ].includes(returnedProduct.status) && (
                                        <Link
                                            href={route(
                                                `${ROUTES.RETURNED_PRODUCTS}.edit`,
                                                returnedProduct.id,
                                            )}
                                            className={buttonVariants({ variant: 'outline' })}
                                        >
                                            {t('action.edit')}
                                        </Link>
                                    )}
                                {checkPermission(PERMISSION_ENUM.RETURNED_PRODUCT_DELETE) &&
                                    [ReturnedProductStatusEnum.DRAFT].includes(
                                        returnedProduct.status,
                                    ) && (
                                        <Button
                                            variant='outline'
                                            onClick={() =>
                                                handleReturnedProductDeletion(returnedProduct.id)
                                            }
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
