import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/Components/ui/table';
import { Link, usePage } from '@inertiajs/react';
import { roleService } from '@/services/roleService';
import { useEffect, useState } from 'react';
import { PaginateResponse } from '@/support/interfaces/others';
import { Button, buttonVariants } from '@/Components/ui/button';
import { ROUTES } from '@/support/constants/routes';
import GenericPagination from '@/Components/GenericPagination';
import { ServiceFilterOptions } from '@/support/interfaces/others/ServiceFilterOptions';
import { useConfirmation } from '@/hooks/useConfirmation';
import { RoleResource } from '@/support/interfaces/resources/RoleResource';

export default function () {
    const [roleResponse, setRoleResponse] = useState<PaginateResponse<RoleResource>>();
    const [filters, setFilters] = useState<ServiceFilterOptions>({
        page: 1,
        per_page: 10,
        relations: 'division',
    });

    const { auth } = usePage().props;

    const syncRoleResources = async () => {
        roleService.getAll(filters).then(res => {
            console.log(res);
            setRoleResponse(res);
        });
    };

    useEffect(() => {
        console.log('first render, or filters changed');
        syncRoleResources();
    }, [filters]);

    const handleRoleResourceDeletion = (id: number) => {
        const isConfirmed = useConfirmation().then(async ({ isConfirmed }) => {
            if (isConfirmed) {
                window.Swal.fire({
                    icon: 'success',
                    title: 'RoleResource deleted successfully',
                });
                await roleService.delete(id);
                await syncRoleResources();
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
                        <TableHead>Divisi</TableHead>
                        <TableHead>Level</TableHead>
                        <TableHead>Jumlah User</TableHead>
                        <TableHead>Jumlah Izin</TableHead>
                        <TableHead></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {roleResponse?.data.map(role => (
                        <TableRow key={role.id}>
                            <TableCell>{role.name}</TableCell>
                            <TableCell>{role.division?.name}</TableCell>
                            <TableCell>{role.level}</TableCell>
                            <TableCell>{role.users_count}</TableCell>
                            <TableCell>{role.permissions_count}</TableCell>
                            <TableCell>
                                <Link
                                    className={buttonVariants({ variant: 'link' })}
                                    href={route(`${ROUTES.ROLES}.edit`, role.id)}
                                >
                                    Edit
                                </Link>
                                {role.users_count <= 0 && (
                                    <Button variant="link" onClick={() => handleRoleResourceDeletion(role.id)}>
                                        Delete
                                    </Button>
                                )}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            <GenericPagination meta={roleResponse?.meta} handleChangePage={handlePageChange} />
        </div>
    );
}
