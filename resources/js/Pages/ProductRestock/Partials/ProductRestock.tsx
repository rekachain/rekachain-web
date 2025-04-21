import GenericPagination from '@/Components/GenericPagination';
import { useSuccessToast } from '@/Hooks/useToast';
import Filters from '@/Pages/ProductRestock/Partials/Partials/Filters';
import { productRestockService } from '@/Services/productRestockService';
import { PaginateResponse } from '@/Support/Interfaces/Others';
import { ServiceFilterOptions } from '@/Support/Interfaces/Others/ServiceFilterOptions';
import { ProductRestockResource } from '@/Support/Interfaces/Resources';
import { withLoading } from '@/Utils/withLoading';
import { useLaravelReactI18n } from 'laravel-react-i18n';
import { useEffect, useState } from 'react';
import ProductRestockCardView from './Partials/ProductRestockCardView';
import ProductRestockTableView from './Partials/ProductRestockTableView';

export default function ({
    isSelecting,
    selectedIds,
    handleSelectionChange,
}: {
    isSelecting: boolean;
    selectedIds: number[];
    handleSelectionChange: (selectedId: number) => void;
}) {
    const { t } = useLaravelReactI18n();
    const [productRestockResponse, setProductRestockResponse] =
        useState<PaginateResponse<ProductRestockResource>>();
    const [filters, setFilters] = useState<ServiceFilterOptions>({
        page: 1,
        perPage: 10,
        // relations: 'product_restockable',
        orderBy: 'created_at',
    });

    const syncProductRestocks = withLoading(async () => {
        const res = await productRestockService.getAll(filters);
        setProductRestockResponse(res);
    });

    useEffect(() => {
        void syncProductRestocks();
    }, [filters]);

    const handleProductRestockDeletion = withLoading(async (id: number) => {
        await productRestockService.delete(id);
        await syncProductRestocks();
        void useSuccessToast(
            t('pages.returned_product.partials.returned_product.messages.deleted'),
        );
    }, true);

    const handlePageChange = (page: number) => {
        setFilters({ ...filters, page });
    };

    return (
        <div className='space-y-4'>
            {productRestockResponse && (
                <>
                    <Filters setFilters={setFilters} filters={filters} />
                    <div className='hidden md:block'>
                        <ProductRestockTableView
                            selectedIds={selectedIds}
                            productRestockResponse={productRestockResponse}
                            isSelecting={isSelecting}
                            handleSelectionChange={handleSelectionChange}
                            handleProductRestockDeletion={handleProductRestockDeletion}
                        />
                    </div>

                    <div className='block md:hidden'>
                        <ProductRestockCardView
                            productRestockResponse={productRestockResponse}
                            handleProductRestockDeletion={handleProductRestockDeletion}
                        />
                    </div>
                </>
            )}
            <GenericPagination
                meta={productRestockResponse?.meta}
                handleChangePage={handlePageChange}
            />
        </div>
    );
}
