import { workshopService } from '@/Services/workshopService';
import { useEffect, useState } from 'react';
import { WorkshopResource } from '@/Support/Interfaces/Resources';
import { PaginateResponse } from '@/Support/Interfaces/Others';
import GenericPagination from '@/Components/GenericPagination';
import { ServiceFilterOptions } from '@/Support/Interfaces/Others/ServiceFilterOptions';
import WorkshopTableView from './Partials/WorkshopTableView';
import WorkshopCardView from './Partials/WorkshopCardView';
import { useSuccessToast } from '@/Hooks/useToast';
import { withLoading } from '@/Utils/withLoading';

export default function () {
    const [workshopResponse, setWorkshopResponse] = useState<PaginateResponse<WorkshopResource>>();
    const [filters, setFilters] = useState<ServiceFilterOptions>({
        page: 1,
        perPage: 10,
    });

    const syncWorkshops = withLoading(async () => {
        const res = await workshopService.getAll(filters);
        setWorkshopResponse(res);
    });

    useEffect(() => {
        void syncWorkshops();
    }, [filters]);

    const handleWorkshopDeletion = withLoading(async (id: number) => {
        await workshopService.delete(id);
        await syncWorkshops();
        void useSuccessToast('Workshop deleted successfully');
    });

    const handlePageChange = (page: number) => {
        setFilters({ ...filters, page });
    };

    return (
        <div className="space-y-4 pt-4">
            {workshopResponse && (
                <>
                    <div className="hidden md:block">
                        <WorkshopTableView
                            workshopResponse={workshopResponse}
                            handleWorkshopDeletion={handleWorkshopDeletion}
                        />
                    </div>

                    <div className="block md:hidden">
                        <WorkshopCardView
                            workshopResponse={workshopResponse}
                            // handleRoleDeletion={handleRoleResourceDeletion}
                            handleWorkshopDeletion={handleWorkshopDeletion}
                        />
                    </div>
                </>
            )}
            <GenericPagination meta={workshopResponse?.meta} handleChangePage={handlePageChange} />
        </div>
    );
}
