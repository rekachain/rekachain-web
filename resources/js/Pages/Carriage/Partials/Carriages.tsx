import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/Components/UI/table';
import { Link } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { CarriageResource } from '@/Support/Interfaces/Resources';
import { PaginateResponse } from '@/Support/Interfaces/Others';
import { Button, buttonVariants } from '@/Components/UI/button';
import { ROUTES } from '@/Support/Constants/routes';
import GenericPagination from '@/Components/GenericPagination';
import { ServiceFilterOptions } from '@/Support/Interfaces/Others/ServiceFilterOptions';
import { carriageService } from '@/Services/carriageService';
import { useSuccessToast } from '@/Hooks/useToast';
import { withLoading } from '@/Utils/withLoading';

export default function () {
    const [carriageResponse, setCarriageResponse] = useState<PaginateResponse<CarriageResource>>();
    const [filters, setFilters] = useState<ServiceFilterOptions>({
        page: 1,
        perPage: 10,
    });

    const syncCarriages = withLoading(async () => {
        const res = await carriageService.getAll(filters);
        setCarriageResponse(res);
    });

    useEffect(() => {
        void syncCarriages();
    }, [filters]);

    const handleCarriageDeletion = withLoading(async (id: number) => {
        await carriageService.delete(id);
        await syncCarriages();
        void useSuccessToast('Carriage deleted successfully');
    }, true);

    const handlePageChange = (page: number) => {
        setFilters({ ...filters, page });
    };

    return (
        <div className="space-y-4">
            <div className="hidden md:block">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Nama</TableHead>
                            <TableHead>Deskripsi</TableHead>
                            <TableHead></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {carriageResponse?.data.map(carriage => (
                            <TableRow key={carriage.id}>
                                <TableCell>{carriage.type}</TableCell>
                                <TableCell>{carriage.description}</TableCell>
                                <TableCell>
                                    <Link
                                        className={buttonVariants({ variant: 'link' })}
                                        href={route(`${ROUTES.CARRIAGES}.edit`, carriage.id)}
                                    >
                                        Edit
                                    </Link>
                                    {carriage.can_be_deleted && (
                                        <Button variant="link" onClick={() => handleCarriageDeletion(carriage.id)}>
                                            Delete
                                        </Button>
                                    )}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            <div className="block md:hidden"></div>
            <GenericPagination meta={carriageResponse?.meta} handleChangePage={handlePageChange} />
        </div>
    );
}
