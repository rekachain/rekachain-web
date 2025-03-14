import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/Components/UI/table';
import { PaginateResponse } from '@/Support/Interfaces/Others';
import { ReturnedProductResource } from '@/Support/Interfaces/Resources';
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
                        <TableHead>
                            {t(
                                'pages.returned_product.partials.partials.returned_product_table.headers.status',
                            )}
                        </TableHead>
                        <TableHead>{'requested at'}</TableHead>
                        <TableHead>{'updated at'}</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {requestedReturnResponse?.data.map((returnedProduct) => (
                        <TableRow key={returnedProduct.id}>
                            <TableCell>{returnedProduct.serial_number}</TableCell>
                            <TableCell>{returnedProduct.localized_status}</TableCell>
                            <TableCell>{returnedProduct.created_at}</TableCell>
                            <TableCell>{returnedProduct.updated_at}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </>
    );
}
