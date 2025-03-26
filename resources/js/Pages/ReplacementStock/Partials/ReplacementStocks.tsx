import GenericPagination from '@/Components/GenericPagination';
import { useSuccessToast } from '@/Hooks/useToast';
import Filters from '@/Pages/ReplacementStock/Partials/Partials/Filters';
import { replacementStockService } from '@/Services/replacementStockService';
import { PaginateResponse } from '@/Support/Interfaces/Others';
import { ServiceFilterOptions } from '@/Support/Interfaces/Others/ServiceFilterOptions';
import { ReplacementStockResource } from '@/Support/Interfaces/Resources';
import { withLoading } from '@/Utils/withLoading';
import { useLaravelReactI18n } from 'laravel-react-i18n';
import { useEffect, useState } from 'react';
import ReplacementStockCardView from './Partials/ReplacementStockCardView';
import ReplacementStockTableView from './Partials/ReplacementStockTableView';

export default function ({ baseReplacementStockResponse }: { baseReplacementStockResponse: PaginateResponse<ReplacementStockResource> | undefined}) {
    const { t } = useLaravelReactI18n();
    const [replacementStockResponse, setReplacementStockResponse] = useState<PaginateResponse<ReplacementStockResource>>();
    const [filters, setFilters] = useState<ServiceFilterOptions>({
        page: 1,
        perPage: 10,
        relations: 'component',
        orderBy: 'component.name',
    });

    const syncReplacementStocks = withLoading(async () => {
        const res = await replacementStockService.getAll(filters);
        setReplacementStockResponse(res);
    });

    useEffect(() => {
        void syncReplacementStocks();
    }, [filters]);

    useEffect(() => {
        setReplacementStockResponse(baseReplacementStockResponse);
    }, [baseReplacementStockResponse]);

    const handleReplacementStockDeletion = withLoading(async (id: number) => {
        await replacementStockService.delete(id);
        await syncReplacementStocks();
        void useSuccessToast(t('pages.replacement_stock.partials.replacement_stocks.messages.deleted'));
    }, true);

    const handlePageChange = (page: number) => {
        setFilters({ ...filters, page });
    };

    return (
        <div className='space-y-4'>
            {replacementStockResponse && <>
                <Filters setFilters={setFilters} filters={filters} />

                <div className='hidden md:block'>
                    <ReplacementStockTableView
                        handleSyncReplacementStocks={syncReplacementStocks}
                        handleReplacementStockDeletion={handleReplacementStockDeletion}
                        replacementStockResponse={replacementStockResponse}
                    ></ReplacementStockTableView>
                </div>

                <div className='block md:hidden'>
                    <ReplacementStockCardView
                        handleSyncReplacementStocks={syncReplacementStocks}
                        handleReplacementStockDeletion={handleReplacementStockDeletion}
                        replacementStockResponse={replacementStockResponse}
                    ></ReplacementStockCardView>
                </div>
                <GenericPagination meta={replacementStockResponse?.meta} handleChangePage={handlePageChange} />
            </>}
        </div>
    );
}
