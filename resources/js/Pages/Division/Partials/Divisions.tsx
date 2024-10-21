import { useEffect, useState } from 'react';
import { DivisionResource } from '@/Support/Interfaces/Resources';
import { PaginateResponse } from '@/Support/Interfaces/Others';
import GenericPagination from '@/Components/GenericPagination';
import { ServiceFilterOptions } from '@/Support/Interfaces/Others/ServiceFilterOptions';
import { divisionService } from '@/Services/divisionService';
import { useSuccessToast } from '@/Hooks/useToast';
import DivisionTableView from '@/Pages/Division/Partials/Partials/DivisionTableView';
import DivisionCardView from '@/Pages/Division/Partials/Partials/DivisionCardView';
import { withLoading } from '@/Utils/withLoading';
import { useLaravelReactI18n } from 'laravel-react-i18n';

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
        void useSuccessToast(t('pages.divisions.index.partials.divisions.messages.deleted'));
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
                        />
                    </div>

                    <div className="block md:hidden">
                        <DivisionCardView
                            divisionResponse={divisionResponse}
                            // handleRoleDeletion={handleRoleResourceDeletion}
                            handleDivisionDeletion={handleDivisionDeletion}
                            // auth={auth}
                        />
                    </div>
                </>
            )}
            <GenericPagination meta={divisionResponse?.meta} handleChangePage={handlePageChange} />
        </div>
    );
}
