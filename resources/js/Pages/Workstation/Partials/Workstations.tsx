import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/Components/ui/table';
import { Link, usePage } from '@inertiajs/react';
import { workstationService } from '@/services/workstationService';
import { useEffect, useState } from 'react';
import { WorkstationResource } from '@/support/interfaces/resources';
import { PaginateResponse } from '@/support/interfaces/others';
import { Button, buttonVariants } from '@/Components/ui/button';
import { ROUTES } from '@/support/constants/routes';
import GenericPagination from '@/Components/GenericPagination';
import { ServiceFilterOptions } from '@/support/interfaces/others/ServiceFilterOptions';
import { useConfirmation } from '@/hooks/useConfirmation';

export default function () {
    const [workstationResponse, setWorkstationResponse] = useState<PaginateResponse<WorkstationResource>>();
    const [filters, setFilters] = useState<ServiceFilterOptions>({
        page: 1,
        perPage: 10,
        relations: 'workshop,division',
    });

    const { auth } = usePage().props;

    const syncWorkstations = async () => {
        workstationService.getAll(filters).then(res => {
            setWorkstationResponse(res);
        });
    };

    useEffect(() => {
        syncWorkstations();
    }, [filters]);

    const handleWorkstationDeletion = (id: number) => {
        const isConfirmed = useConfirmation().then(async ({ isConfirmed }) => {
            if (isConfirmed) {
                window.Swal.fire({
                    icon: 'success',
                    title: 'Workstation deleted successfully',
                });
                await workstationService.delete(id);
                await syncWorkstations();
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
                        <TableHead>Lokasi</TableHead>
                        <TableHead>Workshop</TableHead>
                        <TableHead>Divisi</TableHead>
                        <TableHead></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {workstationResponse?.data.map(workstation => (
                        <TableRow key={workstation.id}>
                            <TableCell>{workstation.name}</TableCell>
                            <TableCell>{workstation.location}</TableCell>
                            <TableCell>{workstation.workshop.name}</TableCell>
                            <TableCell>{workstation.division.name}</TableCell>

                            <TableCell>
                                <Link
                                    className={buttonVariants({ variant: 'link' })}
                                    href={route(`${ROUTES.WORKSTATIONS}.edit`, workstation.id)}
                                >
                                    Edit
                                </Link>
                                <Button variant="link" onClick={() => handleWorkstationDeletion(workstation.id)}>
                                    Delete
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            <GenericPagination meta={workstationResponse?.meta} handleChangePage={handlePageChange} />
        </div>
    );
}
