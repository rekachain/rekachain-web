import GenericPagination from '@/Components/GenericPagination';
import { useLoading } from '@/Contexts/LoadingContext';
import { useSuccessToast } from '@/Hooks/useToast';
import Filters from '@/Pages/Component/Partials/Partials/Filters';
import { componentService } from '@/Services/componentService';
import { PaginateResponse } from '@/Support/Interfaces/Others';
import { ServiceFilterOptions } from '@/Support/Interfaces/Others/ServiceFilterOptions';
import { ComponentResource } from '@/Support/Interfaces/Resources';
import { withLoading } from '@/Utils/withLoading';
import { useLaravelReactI18n } from 'laravel-react-i18n';
import { useEffect, useState } from 'react';
import ComponentCardView from './Partials/ComponentCardView';
import ComponentTableView from './Partials/ComponentTableView';

export default function () {
    const { t } = useLaravelReactI18n();
    const [componentResponse, setComponentResponse] =
        useState<PaginateResponse<ComponentResource>>();
    const [filters, setFilters] = useState<ServiceFilterOptions>({
        page: 1,
        perPage: 10,
        relations: 'progress',
        ordering: {
            name: 'asc',
            created_at: 'desc',
        },
    });

    const { setLoading } = useLoading();

    const syncComponents = withLoading(async () => {
        setLoading(true);
        const res = await componentService.getAll(filters);
        setComponentResponse(res);
        setLoading(false);
    });

    useEffect(() => {
        void syncComponents();
    }, [filters]);

    const handleComponentDeletion = withLoading(async (id: number) => {
        await componentService.delete(id);
        await syncComponents();
        void useSuccessToast(t('pages.component.partials.components.messages.deleted'));
    }, true);

    const handlePageChange = (page: number) => {
        setFilters({ ...filters, page });
    };

    return (
        <div className='space-y-4'>
            {componentResponse && (
                <>
                    <Filters setFilters={setFilters} filters={filters} />

                    <div className='hidden md:block'>
                        <ComponentTableView
                            handleComponentDeletion={handleComponentDeletion}
                            componentResponse={componentResponse}
                        ></ComponentTableView>
                    </div>
                    <div className='block md:hidden'>
                        <ComponentCardView
                            handleComponentDeletion={handleComponentDeletion}
                            componentResponse={componentResponse}
                        ></ComponentCardView>
                    </div>
                </>
            )}
            <GenericPagination meta={componentResponse?.meta} handleChangePage={handlePageChange} />
        </div>
    );
}
