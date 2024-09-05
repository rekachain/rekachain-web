import { useEffect, useState } from 'react';
import { DivisionResource } from '@/support/interfaces/resources';
import { PaginateResponse } from '@/support/interfaces/others';
import GenericPagination from '@/Components/GenericPagination';
import { ServiceFilterOptions } from '@/support/interfaces/others/ServiceFilterOptions';
import { divisionService } from '@/services/divisionService';
import { useSuccessToast } from '@/hooks/useToast';
import DivisionTableView from '@/Pages/Division/Partials/Partials/DivisionTableView';
import DivisionCardView from '@/Pages/Division/Partials/Partials/DivisionCardView';
import { withLoading } from '@/utils/withLoading';

export default function () {
    const [divisionResponse, setDivisionResponse] = useState<PaginateResponse<DivisionResource>>();
    const [filters, setFilters] = useState<ServiceFilterOptions>({
        page: 1,
        perPage: 10,
    });

    const syncDivisions = withLoading(async () => {
        const res = await divisionService.getAll(filters);
        setDivisionResponse(res);
    });

    useEffect(() => {
        syncDivisions();
    }, [filters]);

    const handleDivisionDeletion = withLoading(async (id: number) => {
        await divisionService.delete(id);
        await syncDivisions();
        useSuccessToast('Division deleted successfully');
    }, true);

    const handlePageChange = (page: number) => {
        setFilters({ ...filters, page });
    };

    return (
        <div className="space-y-4">
            {divisionResponse && (
                <>
                    <div className="hidden md:block">
                        <DivisionTableView
                            divisionResponse={divisionResponse}
                            handleDivisionDeletion={handleDivisionDeletion}
                            auth={''}
                        />
                    </div>

                    <div className="block md:hidden">
                        <DivisionCardView
                            divisionResponse={divisionResponse}
                            // handleRoleDeletion={handleRoleResourceDeletion}
                            handleDivisionDeletion={handleDivisionDeletion}
                            auth={''}
                            // auth={auth}
                        />
                    </div>
                </>
            )}
            <GenericPagination meta={divisionResponse?.meta} handleChangePage={handlePageChange} />
        </div>
    );
}
