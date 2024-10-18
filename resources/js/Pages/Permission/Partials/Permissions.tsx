import { usePage } from '@inertiajs/react';
import { permissionService } from '@/Services/permissionService';
import { useEffect, useState } from 'react';
import { PaginateResponse } from '../../../Support/Interfaces/Others';
import GenericPagination from '@/Components/GenericPagination';
import { ServiceFilterOptions } from '@/Support/Interfaces/Others/ServiceFilterOptions';
import { useConfirmation } from '@/Hooks/useConfirmation';
import { PermissionResource } from '@/Support/Interfaces/Resources/PermissionResource';
import PermissionsTableView from './Partials/PermissionsTableView';
import PermissionsCardView from './Partials/PermissionsCardView';
import { useSuccessToast } from '@/Hooks/useToast';
import { useLoading } from '@/Contexts/LoadingContext';
import { withLoading } from '@/Utils/withLoading';
import { useLaravelReactI18n } from 'laravel-react-i18n';

export default function () {
    const { t } = useLaravelReactI18n();
    const [permissionResponse, setPermissionResponse] = useState<PaginateResponse<PermissionResource>>();
    const [filters, setFilters] = useState<ServiceFilterOptions>({
        page: 1,
        per_page: 10,
    });

    const syncPermissionResources = withLoading(async () => {
        const res = await permissionService.getAll(filters);
        setPermissionResponse(res);
    });

    useEffect(() => {
        void syncPermissionResources();
    }, [filters]);

    const handlePermissionResourceDeletion = withLoading(async (id: number) => {
        await permissionService.delete(id);
        await syncPermissionResources();
        await useSuccessToast(t('pages.permissions.index.partials.permissions.messages.deleted'));
    }, true);

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
                        />
                    </div>

                    <div className="block md:hidden">
                        <PermissionsCardView
                            permissionResponse={permissionResponse}
                            handlePermissionDeletion={handlePermissionResourceDeletion}
                        />
                    </div>
                </>
            )}
            <GenericPagination meta={permissionResponse?.meta} handleChangePage={handlePageChange} />
        </div>
    );
}
