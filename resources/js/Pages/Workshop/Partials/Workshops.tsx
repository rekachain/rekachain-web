import GenericPagination from '@/Components/GenericPagination';
import { useSuccessToast } from '@/Hooks/useToast';
import Filters from '@/Pages/Workshop/Partials/Partials/Filters';
import { workshopService } from '@/Services/workshopService';
import { PaginateResponse } from '@/Support/Interfaces/Others';
import { ServiceFilterOptions } from '@/Support/Interfaces/Others/ServiceFilterOptions';
import { WorkshopResource } from '@/Support/Interfaces/Resources';
import { withLoading } from '@/Utils/withLoading';
import { useLaravelReactI18n } from 'laravel-react-i18n';
import { useEffect, useState } from 'react';
import WorkshopCardView from './Partials/WorkshopCardView';
import WorkshopTableView from './Partials/WorkshopTableView';

export default function () {
    const { t } = useLaravelReactI18n();
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
        void useSuccessToast(t('pages.workshop.partials.workshops.messages.deleted'));
    }, true);

    const handlePageChange = (page: number) => {
        setFilters({ ...filters, page });
    };

    return (
        <div className='space-y-4 pt-4'>
            {workshopResponse && (
                <>
                    <Filters setFilters={setFilters} filters={filters} />

                    <div className='hidden md:block'>
                        <WorkshopTableView
                            workshopResponse={workshopResponse}
                            handleWorkshopDeletion={handleWorkshopDeletion}
                        />
                    </div>

                    <div className='block md:hidden'>
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
