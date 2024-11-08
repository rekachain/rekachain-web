import { useEffect, useState } from 'react';
import { CarriageResource } from '@/Support/Interfaces/Resources';
import { PaginateResponse } from '@/Support/Interfaces/Others';
import GenericPagination from '@/Components/GenericPagination';
import { ServiceFilterOptions } from '@/Support/Interfaces/Others/ServiceFilterOptions';
import { carriageService } from '@/Services/carriageService';
import { useSuccessToast } from '@/Hooks/useToast';
import { withLoading } from '@/Utils/withLoading';
import CarriageCardView from './Partials/CarriageCardView';
import CarriageTableView from './Partials/CarriageTableView';
import { useLaravelReactI18n } from 'laravel-react-i18n';
import Filters from '@/Pages/Carriage/Partials/Partials/Filters';

export default function () {
    const { t } = useLaravelReactI18n();
    const [carriageResponse, setCarriageResponse] = useState<PaginateResponse<CarriageResource>>();
    const [filters, setFilters] = useState<ServiceFilterOptions>({
        page: 1,
        perPage: 10,
    });

    const syncCarriages = withLoading(async () => {
        const res = await carriageService.getAll(filters);
        setCarriageResponse(res);
    });

    useEffect(() => {
        void syncCarriages();
    }, [filters]);

    const handleCarriageDeletion = withLoading(async (id: number) => {
        await carriageService.delete(id);
        await syncCarriages();
        void useSuccessToast(t('pages.carriage.partials.carriages.messages.deleted'));
    }, true);

    const handlePageChange = (page: number) => {
        setFilters({ ...filters, page });
    };

    return (
        <div className="space-y-4">
            <Filters setFilters={setFilters} filters={filters} />

            <div className="hidden md:block">
                <CarriageTableView
                    carriageResponse={carriageResponse!}
                    handleCarriageDeletion={handleCarriageDeletion}
                ></CarriageTableView>
            </div>

            <div className="block md:hidden">
                <CarriageCardView
                    carriageResponse={carriageResponse!}
                    handleCarriageDeletion={handleCarriageDeletion}
                ></CarriageCardView>
            </div>
            <GenericPagination meta={carriageResponse?.meta} handleChangePage={handlePageChange} />
        </div>
    );
}
