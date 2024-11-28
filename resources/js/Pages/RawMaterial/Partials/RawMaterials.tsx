import { useEffect, useState } from 'react';
import { RawMaterialResource } from '@/Support/Interfaces/Resources';
import { PaginateResponse } from '@/Support/Interfaces/Others';
import GenericPagination from '@/Components/GenericPagination';
import { ServiceFilterOptions } from '@/Support/Interfaces/Others/ServiceFilterOptions';
import { rawMaterialService } from '@/Services/rawMaterialService';
import RawMaterialCardView from './Partials/RawMaterialCardView';
import RawMaterialTableView from './Partials/RawMaterialTableView';
import { useSuccessToast } from '@/Hooks/useToast';
import { withLoading } from '@/Utils/withLoading';
import { useLaravelReactI18n } from 'laravel-react-i18n';
import Filters from '@/Pages/RawMaterial/Partials/Partials/Filters';

export default function () {
    const { t } = useLaravelReactI18n();
    const [rawMaterialResponse, setRawMaterialResponse] =
        useState<PaginateResponse<RawMaterialResource>>();
    const [filters, setFilters] = useState<ServiceFilterOptions>({
        page: 1,
        perPage: 10,
    });
    const syncRawMaterials = withLoading(async () => {
        const res = await rawMaterialService.getAll(filters);
        setRawMaterialResponse(res);
    });

    useEffect(() => {
        void syncRawMaterials();
    }, [filters]);

    const handleRawMaterialDeletion = withLoading(async (id: number) => {
        await rawMaterialService.delete(id);
        await syncRawMaterials();
        void useSuccessToast(t('pages.raw_material.partials.raw_materials.messages.deleted'));
    }, true);

    const handlePageChange = (page: number) => {
        setFilters({ ...filters, page });
    };

    return (
        <div className='space-y-4'>
            {rawMaterialResponse && (
                <>
                    <Filters setFilters={setFilters} filters={filters} />

                    <div className='hidden md:block'>
                        <RawMaterialTableView
                            rawMaterialResponse={rawMaterialResponse}
                            // handleRoleDeletion={handleRoleResourceDeletion}
                            handleRawMaterialDeletion={handleRawMaterialDeletion}
                        />
                    </div>

                    <div className='block md:hidden'>
                        <RawMaterialCardView
                            rawMaterialResponse={rawMaterialResponse}
                            // handleRoleDeletion={handleRoleResourceDeletion}
                            handleRawMaterialDeletion={handleRawMaterialDeletion}
                        />
                    </div>
                </>
            )}

            <GenericPagination
                meta={rawMaterialResponse?.meta}
                handleChangePage={handlePageChange}
            />
        </div>
    );
}
