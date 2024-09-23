import { workstationService } from '@/Services/workstationService';
import { useEffect, useState } from 'react';
import { WorkstationResource } from '../../../Support/Interfaces/Resources';
import { PaginateResponse } from '../../../Support/Interfaces/Others';
import GenericPagination from '@/Components/GenericPagination';
import { ServiceFilterOptions } from '@/Support/Interfaces/Others/ServiceFilterOptions';
import { useConfirmation } from '@/Hooks/useConfirmation';
import WorkstationTableView from './Partials/WorkstationTableView';
import WorkstationCardView from './Partials/WorkstationCardView';
import { useLoading } from '@/Contexts/LoadingContext';
import { useSuccessToast } from '@/Hooks/useToast';

export default function () {
    const [workstationResponse, setWorkstationResponse] = useState<PaginateResponse<WorkstationResource>>();
    const [filters, setFilters] = useState<ServiceFilterOptions>({
        page: 1,
        perPage: 10,
        relations: 'workshop,division',
    });
    const { setLoading } = useLoading();

    const syncWorkstations = async () => {
        setLoading(true);
        const res = await workstationService.getAll(filters);
        setWorkstationResponse(res);
        setLoading(false);
    };

    useEffect(() => {
        syncWorkstations();
    }, [filters]);

    const handleWorkstationDeletion = (id: number) => {
        useConfirmation().then(async ({ isConfirmed }) => {
            if (isConfirmed) {
                setLoading(true);
                await workstationService.delete(id);
                await syncWorkstations();
                useSuccessToast('Workstation deleted successfully');
                setLoading(false);
            }
        });
    };

    const handlePageChange = (page: number) => {
        setFilters({ ...filters, page });
    };

    return (
        <div className="space-y-4">
            {workstationResponse && (
                <>
                    <div className="hidden md:block">
                        <WorkstationTableView
                            workstationResponse={workstationResponse}
                            handleWorkstationDeletion={handleWorkstationDeletion}
                            // auth={auth}
                        ></WorkstationTableView>
                    </div>

                    <div className="block md:hidden">
                        <WorkstationCardView
                            workstationResponse={workstationResponse}
                            handleWorkstationDeletion={handleWorkstationDeletion}
                            // auth={auth}
                        ></WorkstationCardView>
                    </div>
                </>
            )}
            <GenericPagination meta={workstationResponse?.meta} handleChangePage={handlePageChange} />
        </div>
    );
}
