import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/Components/ui/table';
import { Link, usePage } from '@inertiajs/react';
import { permissionService } from '@/services/permissionService';
import { useEffect, useState } from 'react';
import { PaginateResponse } from '@/support/interfaces/others';
import { Button, buttonVariants } from '@/Components/ui/button';
import { ROUTES } from '@/support/constants/routes';
import GenericPagination from '@/Components/GenericPagination';
import { ServiceFilterOptions } from '@/support/interfaces/others/ServiceFilterOptions';
import { useConfirmation } from '@/hooks/useConfirmation';
import { PermissionResource } from '@/support/interfaces/resources/PermissionResource';
import { useMediaQuery } from 'react-responsive';
import AnimateIn from '@/lib/AnimateIn';
import PermissionsTableView from './Partials/PermissionsTableView';
import PermissionsCardView from './Partials/PermissionsCardView';

export default function () {
    const [permissionResponse, setPermissionResponse] = useState<PaginateResponse<PermissionResource>>();
    const [filters, setFilters] = useState<ServiceFilterOptions>({
        page: 1,
        per_page: 10,
    });

    const { auth } = usePage().props;

    const syncPermissionResources = async () => {
        permissionService.getAll(filters).then(res => {
            console.log(res);
            setPermissionResponse(res);
        });
    };

    useEffect(() => {
        console.log('first render, or filters changed');
        syncPermissionResources();
    }, [filters]);

    const handlePermissionResourceDeletion = (id: number) => {
        const isConfirmed = useConfirmation().then(async ({ isConfirmed }) => {
            if (isConfirmed) {
                window.Swal.fire({
                    icon: 'success',
                    title: 'PermissionResource deleted successfully',
                });
                await permissionService.delete(id);
                await syncPermissionResources();
            }
        });
    };

    const handlePageChange = (page: number) => {
        setFilters({ ...filters, page });
    };

    return (
        <div className="space-y-4">
            {permissionResponse && (
                <>
                    <div className="hidden md:block">
                        <PermissionsTableView
                            permissionResponse={permissionResponse}
                            handlePermissionDeletion={handlePermissionResourceDeletion}
                            // auth={''}
                        ></PermissionsTableView>
                        {/* <UserTableView
                            userResponse={userResponse}
                            handleUserDeletion={handleUserDeletion}
                            auth={auth}
                        /> */}
                    </div>

                    <div className="block md:hidden">
                        <PermissionsCardView
                            permissionResponse={permissionResponse}
                            handlePermissionDeletion={handlePermissionResourceDeletion}
                            // auth={''}
                        ></PermissionsCardView>
                    </div>
                </>
            )}
            <GenericPagination meta={permissionResponse?.meta} handleChangePage={handlePageChange} />
        </div>
    );
}
