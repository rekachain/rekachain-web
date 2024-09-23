import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/Components/UI/table';
import { Link } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { CarriageResource } from '../../../Support/Interfaces/Resources';
import { PaginateResponse } from '../../../Support/Interfaces/Others';
import { Button, buttonVariants } from '@/Components/UI/button';
import { ROUTES } from '@/Support/Constants/routes';
import GenericPagination from '@/Components/GenericPagination';
import { ServiceFilterOptions } from '@/Support/Interfaces/Others/ServiceFilterOptions';
import { useConfirmation } from '@/Hooks/useConfirmation';
import { carriageService } from '@/Services/carriageService';
import { useSuccessToast } from '@/Hooks/useToast';
import { useLoading } from '@/Contexts/LoadingContext';

export default function () {
    const [carriageResponse, setCarriageResponse] = useState<PaginateResponse<CarriageResource>>();
    const [filters, setFilters] = useState<ServiceFilterOptions>({
        page: 1,
        perPage: 10,
    });

    const { setLoading } = useLoading();

    const syncCarriages = async () => {
        setLoading(true);
        const res = await carriageService.getAll(filters);
        setCarriageResponse(res);
        setLoading(false);
    };

    useEffect(() => {
        syncCarriages();
    }, [filters]);

    const handleCarriageDeletion = (id: number) => {
        useConfirmation().then(async ({ isConfirmed }) => {
            if (isConfirmed) {
                setLoading(true);
                await carriageService.delete(id);
                await syncCarriages();
                useSuccessToast('Carriage deleted successfully');
                setLoading(false);
            }
        });
    };

    const handlePageChange = (page: number) => {
        setFilters({ ...filters, page });
    };

    return (
        <div className="space-y-4">
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

            <GenericPagination meta={carriageResponse?.meta} handleChangePage={handlePageChange} />
        </div>
    );
}
