import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/Components/ui/table';
import { Link } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { ComponentResource } from '@/support/interfaces/resources';
import { PaginateResponse } from '@/support/interfaces/others';
import { Button, buttonVariants } from '@/Components/ui/button';
import { ROUTES } from '@/support/constants/routes';
import GenericPagination from '@/Components/GenericPagination';
import { ServiceFilterOptions } from '@/support/interfaces/others/ServiceFilterOptions';
import { useConfirmation } from '@/hooks/useConfirmation';
import { componentService } from '@/services/componentService';
import { useSuccessToast } from '@/hooks/useToast';
import { useLoading } from '@/contexts/LoadingContext';

export default function () {
    const [componentResponse, setComponentResponse] = useState<PaginateResponse<ComponentResource>>();
    const [filters, setFilters] = useState<ServiceFilterOptions>({
        page: 1,
        perPage: 10,
        relations: 'progress',
    });

    const { setLoading } = useLoading();

    const syncComponents = async () => {
        setLoading(true);
        const res = await componentService.getAll(filters);
        setComponentResponse(res);
        setLoading(false);
    };

    useEffect(() => {
        syncComponents();
    }, [filters]);

    const handleComponentDeletion = (id: number) => {
        useConfirmation().then(async ({ isConfirmed }) => {
            if (isConfirmed) {
                setLoading(true);
                await componentService.delete(id);
                await syncComponents();
                useSuccessToast('Component deleted successfully');
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
                        <TableHead>Proses Standar</TableHead>
                        <TableHead></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {componentResponse?.data.map(component => (
                        <TableRow key={component.id}>
                            <TableCell>{component.name}</TableCell>
                            <TableCell>{component.progress?.name}</TableCell>
                            <TableCell>
                                <Link
                                    className={buttonVariants({ variant: 'link' })}
                                    href={route(`${ROUTES.COMPONENTS}.edit`, component.id)}
                                >
                                    Edit
                                </Link>
                                {component.can_be_deleted && (
                                    <Button variant="link" onClick={() => handleComponentDeletion(component.id)}>
                                        Delete
                                    </Button>
                                )}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            <GenericPagination meta={componentResponse?.meta} handleChangePage={handlePageChange} />
        </div>
    );
}