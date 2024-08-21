import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/Components/ui/table';
import { Link } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { DivisionResource } from '@/support/interfaces/resources';
import { PaginateResponse } from '@/support/interfaces/others';
import { Button, buttonVariants } from '@/Components/ui/button';
import { ROUTES } from '@/support/constants/routes';
import GenericPagination from '@/Components/GenericPagination';
import { ServiceFilterOptions } from '@/support/interfaces/others/ServiceFilterOptions';
import { useConfirmation } from '@/hooks/useConfirmation';
import { divisionService } from '@/services/divisionService';

export default function () {
    const [divisionResponse, setDivisionResponse] = useState<PaginateResponse<DivisionResource>>();
    const [filters, setFilters] = useState<ServiceFilterOptions>({
        page: 1,
        perPage: 10,
    });

    const syncDivisions = async () => {
        divisionService.getAll(filters).then(res => {
            setDivisionResponse(res);
        });
    };

    useEffect(() => {
        syncDivisions();
    }, [filters]);

    const handleDivisionDeletion = (id: number) => {
        const isConfirmed = useConfirmation().then(async ({ isConfirmed }) => {
            if (isConfirmed) {
                window.Swal.fire({
                    icon: 'success',
                    title: 'Division deleted successfully',
                });
                await divisionService.delete(id);
                await syncDivisions();
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
                        <TableHead></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {divisionResponse?.data.map(division => (
                        <TableRow key={division.id}>
                            <TableCell>{division.name}</TableCell>
                            <TableCell>
                                <Link
                                    className={buttonVariants({ variant: 'link' })}
                                    href={route(`${ROUTES.DIVISIONS}.edit`, division.id)}
                                >
                                    Edit
                                </Link>
                                <Button variant="link" onClick={() => handleDivisionDeletion(division.id)}>
                                    Delete
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            <GenericPagination meta={divisionResponse?.meta} handleChangePage={handlePageChange} />
        </div>
    );
}
