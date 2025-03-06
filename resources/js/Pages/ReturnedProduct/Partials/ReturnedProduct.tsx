import GenericPagination from '@/Components/GenericPagination';
import { useSuccessToast } from '@/Hooks/useToast';
import Filters from '@/Pages/Workstation/Partials/Partials/Filters';
import { PaginateResponse } from '@/Support/Interfaces/Others';
import { ServiceFilterOptions } from '@/Support/Interfaces/Others/ServiceFilterOptions';
import { ReturnedProductResource } from '@/Support/Interfaces/Resources';
import { withLoading } from '@/Utils/withLoading';
import { useLaravelReactI18n } from 'laravel-react-i18n';
import { useEffect, useState } from 'react';
import ReturnedProductCardView from './Partials/ReturnedProductCardView';
import ReturnedProductTableView from './Partials/ReturnedProductTableView';
import { returnedProductService } from '@/Services/returnedProductService';

export default function () {
    const { t } = useLaravelReactI18n();
    const [returnedProductResponse, setReturnedProductResponse] =
        useState<PaginateResponse<ReturnedProductResource>>();
    const [filters, setFilters] = useState<ServiceFilterOptions>({
        page: 1,
        perPage: 10,
        relations: 'product_returnable,buyer',
    });

    const syncReturnedProducts = withLoading(async () => {
        const res = await returnedProductService.getAll(filters);
        setReturnedProductResponse(res);
    });

    useEffect(() => {
        void syncReturnedProducts();
    }, [filters]);

    const handleReturnedProductDeletion = withLoading(async (id: number) => {
        await returnedProductService.delete(id);
        await syncReturnedProducts();
        void useSuccessToast('deleted🗿');
    }, true);

    const handlePageChange = (page: number) => {
        setFilters({ ...filters, page });
    };

    return (
        <div className='space-y-4'>
            {returnedProductResponse && (
                <>
                    <Filters setFilters={setFilters} filters={filters} />
                    <div className='hidden md:block'>
                        <ReturnedProductTableView
                            returnedProductResponse={returnedProductResponse}
                            handleReturnedProductDeletion={handleReturnedProductDeletion}
                        />
                    </div>

                    <div className='block md:hidden'>
                        <ReturnedProductCardView
                            returnedProductResponse={returnedProductResponse}
                            handleReturnedProductDeletion={handleReturnedProductDeletion}
                        />
                    </div>
                </>
            )}
            <GenericPagination
                meta={returnedProductResponse?.meta}
                handleChangePage={handlePageChange}
            />
        </div>
    );
}
