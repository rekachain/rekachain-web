import { roleService } from '@/Services/roleService';
import { useEffect, useState } from 'react';
import { PaginateResponse } from '@/Support/Interfaces/Others';
import GenericPagination from '@/Components/GenericPagination';
import { ServiceFilterOptions } from '@/Support/Interfaces/Others/ServiceFilterOptions';
import { RoleResource } from '@/Support/Interfaces/Resources/RoleResource';
import RoleCardView from './Partials/RoleCardView';
import RoleTableView from './Partials/RoleTableView';
import { useSuccessToast } from '@/Hooks/useToast';
import { withLoading } from '@/Utils/withLoading';
import { useLaravelReactI18n } from 'laravel-react-i18n';

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
        void useSuccessToast(t('pages.roles.index.partials.roles.messages.deleted'));
    }, true);

    const handlePageChange = (page: number) => {
        setFilters({ ...filters, page });
    };

    return (
        <div className="space-y-4">
            {roleResponse && (
                <>
                    <div className="hidden md:block">
                        <RoleTableView roleResponse={roleResponse} handleRoleDeletion={handleRoleResourceDeletion} />
                    </div>

                    <div className="block md:hidden">
                        <RoleCardView roleResponse={roleResponse} handleRoleDeletion={handleRoleResourceDeletion} />
                    </div>
                </>
            )}
            <GenericPagination meta={roleResponse?.meta} handleChangePage={handlePageChange} />
        </div>
    );
}
