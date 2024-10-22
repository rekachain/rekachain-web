import { workstationService } from '@/Services/workstationService';
import { useEffect, useState } from 'react';
import { WorkstationResource } from '@/Support/Interfaces/Resources';
import { PaginateResponse } from '@/Support/Interfaces/Others';
import GenericPagination from '@/Components/GenericPagination';
import { ServiceFilterOptions } from '@/Support/Interfaces/Others/ServiceFilterOptions';
import WorkstationTableView from './Partials/WorkstationTableView';
import WorkstationCardView from './Partials/WorkstationCardView';
import { useSuccessToast } from '@/Hooks/useToast';
import { withLoading } from '@/Utils/withLoading';
import { useLaravelReactI18n } from 'laravel-react-i18n';

export default function () {
    const { t } = useLaravelReactI18n();
    const [workstationResponse, setWorkstationResponse] = useState<PaginateResponse<WorkstationResource>>();
    const [filters, setFilters] = useState<ServiceFilterOptions>({
        page: 1,
        perPage: 10,
        relations: 'workshop,division',
    });

    const syncWorkstations = withLoading(async () => {
        const res = await workstationService.getAll(filters);
        setWorkstationResponse(res);
    });

    useEffect(() => {
        void syncWorkstations();
    }, [filters]);

    const handleWorkstationDeletion = withLoading(async (id: number) => {
        await workstationService.delete(id);
        await syncWorkstations();
        void useSuccessToast(t('pages.workstation.partials.workstations.messages.deleted'));
    }, true);

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
                        />
                    </div>

                    <div className="block md:hidden">
                        <WorkstationCardView
                            workstationResponse={workstationResponse}
                            handleWorkstationDeletion={handleWorkstationDeletion}
                        />
                    </div>
                </>
            )}
            <GenericPagination meta={workstationResponse?.meta} handleChangePage={handlePageChange} />
        </div>
    );
}
