import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/Components/ui/table';
import { Link } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { PanelResource } from '@/support/interfaces/resources';
import { PaginateResponse } from '@/support/interfaces/others';
import { Button, buttonVariants } from '@/Components/ui/button';
import { ROUTES } from '@/support/constants/routes';
import GenericPagination from '@/Components/GenericPagination';
import { ServiceFilterOptions } from '@/support/interfaces/others/ServiceFilterOptions';
import { useConfirmation } from '@/hooks/useConfirmation';
import { panelService } from '@/services/panelService';

export default function () {
    const [panelResponse, setPanelResponse] = useState<PaginateResponse<PanelResource>>();
    const [filters, setFilters] = useState<ServiceFilterOptions>({
        page: 1,
        perPage: 10,
    });

    const syncPanels = async () => {
        panelService.getAll(filters).then(res => {
            setPanelResponse(res);
        });
    };

    useEffect(() => {
        syncPanels();
    }, [filters]);

    const handlePanelDeletion = (id: number) => {
        const isConfirmed = useConfirmation().then(async ({ isConfirmed }) => {
            if (isConfirmed) {
                window.Swal.fire({
                    icon: 'success',
                    title: 'Panel deleted successfully',
                });
                await panelService.delete(id);
                await syncPanels();
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
                    {panelResponse?.data.map(panel => (
                        <TableRow key={panel.id}>
                            <TableCell>{panel.name}</TableCell>
                            <TableCell>{panel.description}</TableCell>
                            <TableCell>
                                <Link
                                    className={buttonVariants({ variant: 'link' })}
                                    href={route(`${ROUTES.PANELS}.edit`, panel.id)}
                                >
                                    Edit
                                </Link>
                                {panel.can_be_deleted && (
                                    <Button variant="link" onClick={() => handlePanelDeletion(panel.id)}>
                                        Delete
                                    </Button>
                                )}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            <GenericPagination meta={panelResponse?.meta} handleChangePage={handlePageChange} />
        </div>
    );
}
