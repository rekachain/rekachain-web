import { usePage } from '@inertiajs/react';
import { roleService } from '@/services/roleService';
import { useEffect, useState } from 'react';
import { PaginateResponse } from '@/support/interfaces/others';
import GenericPagination from '@/Components/GenericPagination';
import { ServiceFilterOptions } from '@/support/interfaces/others/ServiceFilterOptions';
import { useConfirmation } from '@/hooks/useConfirmation';
import { RoleResource } from '@/support/interfaces/resources/RoleResource';
import RoleCardView from './Partials/RoleCardView';
import RoleTableView from './Partials/RoleTableView';
import { useSuccessToast } from '@/hooks/useToast';
import { useLoading } from '@/contexts/LoadingContext';

export default function () {
    const [roleResponse, setRoleResponse] = useState<PaginateResponse<RoleResource>>();
    const [filters, setFilters] = useState<ServiceFilterOptions>({
        page: 1,
        per_page: 10,
        relations: 'division',
    });

    const { auth } = usePage().props;
    const { setLoading } = useLoading();

    const syncRoleResources = async () => {
        setLoading(true);
        const res = await roleService.getAll(filters);
        setRoleResponse(res);
        setLoading(false);
    };

    useEffect(() => {
        console.log('first render, or filters changed');
        syncRoleResources();
    }, [filters]);

    const handleRoleResourceDeletion = (id: number) => {
        useConfirmation().then(async ({ isConfirmed }) => {
            if (isConfirmed) {
                setLoading(true);
                await roleService.delete(id);
                await syncRoleResources();
                setLoading(false);
                useSuccessToast('Role deleted successfully');
            }
        });
    };

    const handlePageChange = (page: number) => {
        setFilters({ ...filters, page });
    };

    return (
        <div className="space-y-4">
            {roleResponse && (
                <>
                    <div className="hidden md:block">
                        <RoleTableView
                            roleResponse={roleResponse}
                            handleRoleDeletion={handleRoleResourceDeletion}
                            auth={auth}
                        ></RoleTableView>
                    </div>

                    <div className="block md:hidden">
                        <RoleCardView
                            roleResponse={roleResponse}
                            handleRoleDeletion={handleRoleResourceDeletion}
                            auth={auth}
                        ></RoleCardView>
                    </div>
                </>
            )}
            <GenericPagination meta={roleResponse?.meta} handleChangePage={handlePageChange} />
        </div>
    );
}
