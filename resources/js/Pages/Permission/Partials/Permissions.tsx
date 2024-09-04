import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/Components/ui/table';
import { usePage } from '@inertiajs/react';
import { permissionService } from '@/services/permissionService';
import { useEffect, useState } from 'react';
import { PaginateResponse } from '@/support/interfaces/others';
import GenericPagination from '@/Components/GenericPagination';
import { ServiceFilterOptions } from '@/support/interfaces/others/ServiceFilterOptions';
import { useConfirmation } from '@/hooks/useConfirmation';
import { PermissionResource } from '@/support/interfaces/resources/PermissionResource';
import { useSuccessToast } from '@/hooks/useToast';
import { useLoading } from '@/contexts/LoadingContext';

export default function () {
    const [permissionResponse, setPermissionResponse] = useState<PaginateResponse<PermissionResource>>();
    const [filters, setFilters] = useState<ServiceFilterOptions>({
        page: 1,
        per_page: 10,
    });

    const { auth } = usePage().props;
    const { setLoading } = useLoading();
    
    const syncPermissionResources = async () => {
        setLoading(true);
        const res = await permissionService.getAll(filters);
        setPermissionResponse(res);
        setLoading(false);
    };

    useEffect(() => {
        syncPermissionResources();
    }, [filters]);

    const handlePermissionResourceDeletion = (id: number) => {
        useConfirmation().then(async ({ isConfirmed }) => {
            if (isConfirmed) {
                await permissionService.delete(id);
                await syncPermissionResources();
                await useSuccessToast('PermissionResource deleted successfully');
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
                        <TableHead>Group</TableHead>
                        <TableHead>Nama</TableHead>
                        <TableHead></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {permissionResponse?.data.map(permission => (
                        <TableRow key={permission.id}>
                            <TableCell>{permission.group}</TableCell>
                            <TableCell>{permission.name}</TableCell>
                            <TableCell>
                                {/*<Link*/}
                                {/*    className={buttonVariants({ variant: 'link' })}*/}
                                {/*    href={route(`${ROUTES.ROLES}.edit`, permission.id)}*/}
                                {/*>*/}
                                {/*    Edit*/}
                                {/*</Link>*/}

                                {/*<Button*/}
                                {/*    variant="link"*/}
                                {/*    onClick={() => handlePermissionResourceDeletion(permission.id)}*/}
                                {/*>*/}
                                {/*    Delete*/}
                                {/*</Button>*/}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            <GenericPagination meta={permissionResponse?.meta} handleChangePage={handlePageChange} />
        </div>
    );
}
