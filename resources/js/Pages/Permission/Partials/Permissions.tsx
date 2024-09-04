import { usePage } from '@inertiajs/react';
import { permissionService } from '@/services/permissionService';
import { useEffect, useState } from 'react';
import { PaginateResponse } from '@/support/interfaces/others';
import GenericPagination from '@/Components/GenericPagination';
import { ServiceFilterOptions } from '@/support/interfaces/others/ServiceFilterOptions';
import { useConfirmation } from '@/hooks/useConfirmation';
import { PermissionResource } from '@/support/interfaces/resources/PermissionResource';
import PermissionsTableView from './Partials/PermissionsTableView';
import PermissionsCardView from './Partials/PermissionsCardView';
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
            {permissionResponse && (
                <>
                    <div className="hidden md:block">
                        <PermissionsTableView
                            permissionResponse={permissionResponse}
                            handlePermissionDeletion={handlePermissionResourceDeletion}
                            // auth={''}
                        ></PermissionsTableView>
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
