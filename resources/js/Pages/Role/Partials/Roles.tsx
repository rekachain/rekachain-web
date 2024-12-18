import GenericPagination from '@/Components/GenericPagination';
import { useSuccessToast } from '@/Hooks/useToast';
import Filters from '@/Pages/Role/Partials/Partials/Filters';
import { roleService } from '@/Services/roleService';
import { PaginateResponse } from '@/Support/Interfaces/Others';
import { ServiceFilterOptions } from '@/Support/Interfaces/Others/ServiceFilterOptions';
import { RoleResource } from '@/Support/Interfaces/Resources/RoleResource';
import { withLoading } from '@/Utils/withLoading';
import { useLaravelReactI18n } from 'laravel-react-i18n';
import { useEffect, useState } from 'react';
import RoleCardView from './Partials/RoleCardView';
import RoleTableView from './Partials/RoleTableView';

export default function () {
    const { t } = useLaravelReactI18n();
    const [roleResponse, setRoleResponse] = useState<PaginateResponse<RoleResource>>();
    const [filters, setFilters] = useState<ServiceFilterOptions>({
        page: 1,
        per_page: 10,
        relations: 'division',
    });

    const syncRoleResources = withLoading(async () => {
        const res = await roleService.getAll(filters);
        setRoleResponse(res);
    });

    useEffect(() => {
        void syncRoleResources();
    }, [filters]);

    const handleRoleResourceDeletion = withLoading(async (id: number) => {
        await roleService.delete(id);
        await syncRoleResources();
        void useSuccessToast(t('pages.role.partials.roles.messages.deleted'));
    }, true);

    const handlePageChange = (page: number) => {
        setFilters({ ...filters, page });
    };

    return (
        <div className='space-y-4'>
            {roleResponse && (
                <>
                    <Filters setFilters={setFilters} filters={filters} />

                    <div className='hidden md:block'>
                        <RoleTableView
                            roleResponse={roleResponse}
                            handleRoleDeletion={handleRoleResourceDeletion}
                        />
                    </div>

                    <div className='block md:hidden'>
                        <RoleCardView
                            roleResponse={roleResponse}
                            handleRoleDeletion={handleRoleResourceDeletion}
                        />
                    </div>
                </>
            )}
            <GenericPagination meta={roleResponse?.meta} handleChangePage={handlePageChange} />
        </div>
    );
}
