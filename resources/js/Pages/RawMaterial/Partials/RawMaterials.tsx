import { useEffect, useState } from 'react';
import { RawMaterialResource } from '@/support/interfaces/resources';
import { PaginateResponse } from '@/support/interfaces/others';
import GenericPagination from '@/Components/GenericPagination';
import { ServiceFilterOptions } from '@/support/interfaces/others/ServiceFilterOptions';
import { useConfirmation } from '@/hooks/useConfirmation';
import { rawMaterialService } from '@/services/rawMaterialService';
import RawMaterialCardView from './Partials/RawMaterialCardView';
import RawMaterialTableView from './Partials/RawMaterialTableView';
import { useLoading } from '@/contexts/LoadingContext';
import { useSuccessToast } from '@/hooks/useToast';

export default function () {
    const [rawMaterialResponse, setRawMaterialResponse] = useState<PaginateResponse<RawMaterialResource>>();
    const [filters, setFilters] = useState<ServiceFilterOptions>({
        page: 1,
        perPage: 10,
    });
    const { setLoading } = useLoading();

    const syncRawMaterials = async () => {
        setLoading(true);
        const res = await rawMaterialService.getAll(filters);
        setRawMaterialResponse(res);
        setLoading(false);
    };

    useEffect(() => {
        syncRawMaterials();
    }, [filters]);

    const handleRawMaterialDeletion = (id: number) => {
        useConfirmation().then(async ({ isConfirmed }) => {
            if (isConfirmed) {
                setLoading(true);
                await rawMaterialService.delete(id);
                await syncRawMaterials();
                setLoading(false);
                useSuccessToast('Raw Material deleted successfully');
            }
        });
    };

    const handlePageChange = (page: number) => {
        setFilters({ ...filters, page });
    };

    return (
        <div className="space-y-4">
            {rawMaterialResponse && (
                <>
                    <div className="hidden md:block">
                        <RawMaterialTableView
                            rawMaterialResponse={rawMaterialResponse}
                            // handleRoleDeletion={handleRoleResourceDeletion}
                            handleRawMaterialDeletion={handleRawMaterialDeletion}
                        ></RawMaterialTableView>
                    </div>

                    <div className="block md:hidden">
                        <RawMaterialCardView
                            rawMaterialResponse={rawMaterialResponse}
                            // handleRoleDeletion={handleRoleResourceDeletion}
                            handleRawMaterialDeletion={handleRawMaterialDeletion}
                            // auth={''}
                            // auth={auth}
                        ></RawMaterialCardView>
                    </div>
                </>
            )}

            <GenericPagination meta={rawMaterialResponse?.meta} handleChangePage={handlePageChange} />
        </div>
    );
}
