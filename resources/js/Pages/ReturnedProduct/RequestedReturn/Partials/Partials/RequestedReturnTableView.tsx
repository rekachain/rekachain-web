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
    requestedReturnResponse,
    handleRequestedReturnDeletion,
}: {
    requestedReturnResponse: PaginateResponse<ReturnedProductResource>;
    handleRequestedReturnDeletion: (id: number) => void;
}) {
    const { t } = useLaravelReactI18n();
    return (
        <>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>
                            {t(
                                'pages.returned_product.partials.partials.returned_product_table.headers.serial_number',
                            )}
                        </TableHead>
                        {checkPermission(PERMISSION_ENUM.RETURNED_PRODUCT_READ) && (
                            <TableHead>
                                {t(
                                    'pages.returned_product.partials.partials.returned_product_table.headers.buyer',
                                )}
                            </TableHead>
                        )}
                        <TableHead>
                            {t(
                                'pages.returned_product.partials.partials.returned_product_table.headers.status',
                            )}
                        </TableHead>
                        <TableHead>
                            {t(
                                'pages.returned_product.partials.partials.returned_product_table.headers.created_at',
                            )}
                        </TableHead>
                        <TableHead>
                            {t(
                                'pages.returned_product.partials.partials.returned_product_table.headers.updated_at',
                            )}
                        </TableHead>
                        <TableHead></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {requestedReturnResponse?.data.map((returnedProduct) => (
                        <TableRow key={returnedProduct.id}>
                            <TableCell>{returnedProduct.serial_number}</TableCell>
                            {checkPermission(PERMISSION_ENUM.RETURNED_PRODUCT_READ) && (
                                <TableCell>{returnedProduct.buyer?.name}</TableCell>
                            )}
                            <TableCell>{returnedProduct.localized_status}</TableCell>
                            <TableCell>{returnedProduct.created_at}</TableCell>
                            <TableCell>{returnedProduct.updated_at}</TableCell>
                            {(returnedProduct.status === ReturnedProductStatusEnum.REQUESTED ||
                                checkPermission(PERMISSION_ENUM.RETURNED_PRODUCT_UPDATE)) && (
                                <TableCell className='flex flex-wrap gap-2'>
                                    {returnedProduct.status !==
                                    ReturnedProductStatusEnum.REQUESTED ? (
                                        <Link
                                            href={route(
                                                `${ROUTES.RETURNED_PRODUCTS}.show`,
                                                returnedProduct.id,
                                            )}
                                            className={buttonVariants({ variant: 'outline' })}
                                        >
                                            {t('action.show')}
                                        </Link>
                                    ) : (
                                        checkPermission(
                                            PERMISSION_ENUM.RETURNED_PRODUCT_UPDATE,
                                        ) && (
                                            <>
                                                <Link
                                                    href={route(
                                                        `${ROUTES.RETURNED_PRODUCTS}.edit`,
                                                        returnedProduct.id,
                                                    )}
                                                    className={buttonVariants({
                                                        variant: 'outline',
                                                    })}
                                                >
                                                    {t('action.edit')}
                                                </Link>
                                                <Button
                                                    variant='outline'
                                                    onClick={() =>
                                                        handleRequestedReturnDeletion(
                                                            returnedProduct.id,
                                                        )
                                                    }
                                                >
                                                    {t('action.delete')}
                                                </Button>
                                            </>
                                        )
                                    )}
                                </TableCell>
                            )}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </>
    );
}
