import GenericPagination from '@/Components/GenericPagination';
import { useSuccessToast } from '@/Hooks/useToast';
import DivisionCardView from '@/Pages/Division/Partials/Partials/DivisionCardView';
import DivisionTableView from '@/Pages/Division/Partials/Partials/DivisionTableView';
import Filters from '@/Pages/Division/Partials/Partials/Filters';
import { divisionService } from '@/Services/divisionService';
import { PaginateResponse } from '@/Support/Interfaces/Others';
import { ServiceFilterOptions } from '@/Support/Interfaces/Others/ServiceFilterOptions';
import { DivisionResource } from '@/Support/Interfaces/Resources';
import { withLoading } from '@/Utils/withLoading';
import { useLaravelReactI18n } from 'laravel-react-i18n';
import { useEffect, useState } from 'react';

export default function () {
    const { t } = useLaravelReactI18n();
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
        void syncDivisions();
    }, [filters]);

    const handleDivisionDeletion = withLoading(async (id: number) => {
        await divisionService.delete(id);
        await syncDivisions();
        void useSuccessToast(t('pages.division.partials.divisions.messages.deleted'));
    }, true);

    const handlePageChange = (page: number) => {
        setFilters({ ...filters, page });
    };

    return (
        <div className='space-y-4'>
            {divisionResponse && (
                <>
                    <Filters setFilters={setFilters} filters={filters} />
                    <div className='hidden md:block'>
                        <DivisionTableView
                            handleDivisionDeletion={handleDivisionDeletion}
                            divisionResponse={divisionResponse}
                        />
                    </div>

                    <div className='block md:hidden'>
                        <DivisionCardView
                            // handleRoleDeletion={handleRoleResourceDeletion}
                            handleDivisionDeletion={handleDivisionDeletion}
                            divisionResponse={divisionResponse}
                            // auth={auth}
                        />
                    </div>
                </>
            )}
            <GenericPagination meta={divisionResponse?.meta} handleChangePage={handlePageChange} />
        </div>
    );
}
