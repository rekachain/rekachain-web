import GenericPagination from '@/Components/GenericPagination';
import { useSuccessToast } from '@/Hooks/useToast';
import Filters from '@/Pages/ReturnedProduct/RequestedReturn/Partials/Partials/Filters';
import { requestReturnService } from '@/Services/returnedProductService';
import { PaginateResponse } from '@/Support/Interfaces/Others';
import { ServiceFilterOptions } from '@/Support/Interfaces/Others/ServiceFilterOptions';
import { ReturnedProductResource } from '@/Support/Interfaces/Resources';
import { withLoading } from '@/Utils/withLoading';
import { useLaravelReactI18n } from 'laravel-react-i18n';
import { useEffect, useState } from 'react';
import RequestedReturnCardView from './Partials/RequestedReturnCardView';
import RequestedReturnTableView from './Partials/RequestedReturnTableView';

export default function () {
    const { setLocale } = useLaravelReactI18n();
    const [requestedReturnResponse, setRequestedReturnResponse] =
        useState<PaginateResponse<ReturnedProductResource>>();
    const [filters, setFilters] = useState<ServiceFilterOptions>({
        page: 1,
        perPage: 10,
        relations: 'product_returnable,buyer',
        orderBy: 'created_at',
    });

    const syncRequestedReturns = withLoading(async () => {
        const res = await requestReturnService.getAll(filters);
        setRequestedReturnResponse(res);
    });

    useEffect(() => {
        void syncRequestedReturns();
    }, [filters, setLocale]);

    const handleRequestedReturnDeletion = withLoading(async (id: number) => {
        await requestReturnService.delete(id);
        await syncRequestedReturns();
        void useSuccessToast('deleted🗿');
    }, true);

    const handlePageChange = (page: number) => {
        setFilters({ ...filters, page });
    };

    return (
        <div className='space-y-4'>
            {requestedReturnResponse && (
                <>
                    <Filters setFilters={setFilters} filters={filters} />
                    <div className='hidden md:block'>
                        <RequestedReturnTableView
                            requestedReturnResponse={requestedReturnResponse}
                            handleRequestedReturnDeletion={handleRequestedReturnDeletion}
                        />
                    </div>

                    <div className='block md:hidden'>
                        <RequestedReturnCardView
                            requestedReturnResponse={requestedReturnResponse}
                            handleRequestedReturnDeletion={handleRequestedReturnDeletion}
                        />
                    </div>
                </>
            )}
            <GenericPagination
                meta={requestedReturnResponse?.meta}
                handleChangePage={handlePageChange}
            />
        </div>
    );
}
