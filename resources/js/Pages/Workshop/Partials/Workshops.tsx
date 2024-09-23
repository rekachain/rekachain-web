import { workshopService } from '@/Services/workshopService';
import { useEffect, useState } from 'react';
import { WorkshopResource } from '../../../Support/Interfaces/Resources';
import { PaginateResponse } from '../../../Support/Interfaces/Others';
import GenericPagination from '@/Components/GenericPagination';
import { ServiceFilterOptions } from '@/Support/Interfaces/Others/ServiceFilterOptions';
import { useConfirmation } from '@/Hooks/useConfirmation';
import WorkshopTableView from './Partials/WorkshopTableView';
import WorkshopCardView from './Partials/WorkshopCardView';
import { useLoading } from '@/Contexts/LoadingContext';
import { useSuccessToast } from '@/Hooks/useToast';

export default function () {
    const [workshopResponse, setWorkshopResponse] = useState<PaginateResponse<WorkshopResource>>();
    const [filters, setFilters] = useState<ServiceFilterOptions>({
        page: 1,
        perPage: 10,
    });
    const { setLoading } = useLoading();

    const syncWorkshops = async () => {
        setLoading(true);
        const res = await workshopService.getAll(filters);
        setWorkshopResponse(res);
        setLoading(false);
    };

    useEffect(() => {
        syncWorkshops();
    }, [filters]);

    const handleWorkshopDeletion = (id: number) => {
        useConfirmation().then(async ({ isConfirmed }) => {
            if (isConfirmed) {
                setLoading(true);
                await workshopService.delete(id);
                await syncWorkshops();
                setLoading(false);
                useSuccessToast('Workshop deleted successfully');
            }
        });
    };

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
                            auth={''}
                        ></WorkshopTableView>
                    </div>

                    <div className="block md:hidden">
                        <WorkshopCardView
                            workshopResponse={workshopResponse}
                            // handleRoleDeletion={handleRoleResourceDeletion}
                            handleWorkshopDeletion={handleWorkshopDeletion}
                            auth={''}
                            // auth={auth}
                        ></WorkshopCardView>
                    </div>
                </>
            )}
            <GenericPagination meta={workshopResponse?.meta} handleChangePage={handlePageChange} />
        </div>
    );
}
