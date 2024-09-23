import { Link } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { PanelResource } from '@/Support/interfaces/resources';
import { PaginateResponse } from '@/Support/interfaces/others';
import { Button, buttonVariants } from '@/Components/ui/button';
import { ROUTES } from '@/Support/constants/routes';
import GenericPagination from '@/Components/GenericPagination';
import { ServiceFilterOptions } from '@/Support/interfaces/others/ServiceFilterOptions';
import { useConfirmation } from '@/Hooks/useConfirmation';
import { panelService } from '@/Services/panelService';
import { useSuccessToast } from '@/Hooks/useToast';
import { useLoading } from '@/Contexts/LoadingContext';
import PanelCardView from './Partials/PanelCardView';
import PanelTableView from './Partials/PanelTableView';

export default function () {
    const [panelResponse, setPanelResponse] = useState<PaginateResponse<PanelResource>>();
    const [filters, setFilters] = useState<ServiceFilterOptions>({
        page: 1,
        perPage: 10,
    });

    const { setLoading } = useLoading();

    const syncPanels = async () => {
        setLoading(true);
        const res = await panelService.getAll(filters);
        setPanelResponse(res);
        setLoading(false);
    };

    useEffect(() => {
        syncPanels();
    }, [filters]);

    const handlePanelDeletion = (id: number) => {
        useConfirmation().then(async ({ isConfirmed }) => {
            if (isConfirmed) {
                setLoading(true);
                await panelService.delete(id);
                await syncPanels();
                useSuccessToast('Panel deleted successfully');
                setLoading(false);
            }
        });
    };

    const handlePageChange = (page: number) => {
        setFilters({ ...filters, page });
    };

    return (
        <div className="space-y-4">
            {panelResponse && (
                <>
                    <div className="hidden md:block">
                        <PanelTableView
                            panelResponse={panelResponse}
                            handlePanelDeletion={handlePanelDeletion}
                            auth={''}
                        ></PanelTableView>
                    </div>

                    <div className="block md:hidden">
                        <PanelCardView
                            panelResponse={panelResponse}
                            handlePanelDeletion={handlePanelDeletion}
                            auth={''}
                        ></PanelCardView>
                    </div>
                </>
            )}
            <GenericPagination meta={panelResponse?.meta} handleChangePage={handlePageChange} />
        </div>
    );
}
