import GenericPagination from '@/Components/GenericPagination';
import { useSuccessToast } from '@/Hooks/useToast';
import Filters from '@/Pages/Panel/Partials/Partials/Filters';
import { panelService } from '@/Services/panelService';
import { PaginateResponse } from '@/Support/Interfaces/Others';
import { ServiceFilterOptions } from '@/Support/Interfaces/Others/ServiceFilterOptions';
import { PanelResource } from '@/Support/Interfaces/Resources';
import { withLoading } from '@/Utils/withLoading';
import { useLaravelReactI18n } from 'laravel-react-i18n';
import { useEffect, useState } from 'react';
import PanelCardView from './Partials/PanelCardView';
import PanelTableView from './Partials/PanelTableView';

export default function () {
    const { t } = useLaravelReactI18n();
    const [panelResponse, setPanelResponse] = useState<PaginateResponse<PanelResource>>();
    const [filters, setFilters] = useState<ServiceFilterOptions>({
        page: 1,
        perPage: 10,
        relations: 'progress',
    });

    const syncPanels = withLoading(async () => {
        const res = await panelService.getAll(filters);
        setPanelResponse(res);
    });

    useEffect(() => {
        void syncPanels();
    }, [filters]);

    const handlePanelDeletion = withLoading(async (id: number) => {
        await panelService.delete(id);
        await syncPanels();
        void useSuccessToast(t('pages.panel.partials.panels.messages.deleted'));
    }, true);

    const handlePageChange = (page: number) => {
        setFilters({ ...filters, page });
    };

    return (
        <div className='space-y-4'>
            {panelResponse && (
                <>
                    <Filters setFilters={setFilters} filters={filters} />

                    <div className='hidden md:block'>
                        <PanelTableView
                            panelResponse={panelResponse}
                            handlePanelDeletion={handlePanelDeletion}
                        />
                    </div>

                    <div className='block md:hidden'>
                        <PanelCardView
                            panelResponse={panelResponse}
                            handlePanelDeletion={handlePanelDeletion}
                        />
                    </div>
                </>
            )}
            <GenericPagination meta={panelResponse?.meta} handleChangePage={handlePageChange} />
        </div>
    );
}
