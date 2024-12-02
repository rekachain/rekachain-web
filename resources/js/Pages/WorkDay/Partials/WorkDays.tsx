import GenericPagination from '@/Components/GenericPagination';
import { useSuccessToast } from '@/Hooks/useToast';
import Filters from '@/Pages/WorkDay/Partials/Partials/Filters';
import { workDayService } from '@/Services/workDayService';
import { PaginateResponse } from '@/Support/Interfaces/Others';
import { ServiceFilterOptions } from '@/Support/Interfaces/Others/ServiceFilterOptions';
import { WorkDayResource } from '@/Support/Interfaces/Resources';
import { withLoading } from '@/Utils/withLoading';
import { useLaravelReactI18n } from 'laravel-react-i18n';
import { useEffect, useState } from 'react';
import WDCardView from './Partials/WDCardView';
import WDTableView from './Partials/WDTableView';

export default function () {
    const { t } = useLaravelReactI18n();
    const [workDayResponse, setWorkDayResponse] = useState<PaginateResponse<WorkDayResource>>();
    const [filters, setFilters] = useState<ServiceFilterOptions>({
        page: 1,
        relations: 'work_day_times',
        perPage: 10,
    });

    const syncWorkDays = withLoading(async () => {
        const res = await workDayService.getAll(filters);
        setWorkDayResponse(res);
    });

    useEffect(() => {
        void syncWorkDays();
    }, [filters]);

    const handleWorkDayDeletion = withLoading(async (id: number) => {
        await workDayService.delete(id);
        await syncWorkDays();
        void useSuccessToast(t('pages.work_day.partials.work_days.messages.deleted'));
    }, true);

    const handlePageChange = (page: number) => {
        setFilters({ ...filters, page });
    };

    return (
        <div className='space-y-4'>
            <Filters setFilters={setFilters} filters={filters} />
            <>
                <div className='hidden md:block'>
                    <WDTableView
                        workDayResponse={workDayResponse!}
                        handleWorkDayDeletion={handleWorkDayDeletion}
                    ></WDTableView>
                </div>

                <div className='block md:hidden'>
                    <WDCardView
                        workDayResponse={workDayResponse!}
                        handleWorkDayDeletion={handleWorkDayDeletion}
                    ></WDCardView>
                </div>
            </>
            <GenericPagination meta={workDayResponse?.meta} handleChangePage={handlePageChange} />
        </div>
    );
}
