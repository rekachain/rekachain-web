import { Link } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { ComponentResource } from '@/Support/Interfaces/Resources';
import { PaginateResponse } from '@/Support/Interfaces/Others';
import { Button, buttonVariants } from '@/Components/UI/button';
import { ROUTES } from '@/Support/Constants/routes';
import GenericPagination from '@/Components/GenericPagination';
import { ServiceFilterOptions } from '@/Support/Interfaces/Others/ServiceFilterOptions';
import { useConfirmation } from '@/Hooks/useConfirmation';
import { componentService } from '@/Services/componentService';
import { useSuccessToast } from '@/Hooks/useToast';
import { useLoading } from '@/Contexts/LoadingContext';
import ComponentCardView from './Partials/ComponentCardView';
import ComponentTableView from './Partials/ComponentTableView';

export default function () {
    const [componentResponse, setComponentResponse] = useState<PaginateResponse<ComponentResource>>();
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

    const syncComponents = async () => {
        setLoading(true);
        const res = await componentService.getAll(filters);
        setComponentResponse(res);
        setLoading(false);
    };

    useEffect(() => {
        void syncComponents();
    }, [filters]);

    const handleComponentDeletion = (id: number) => {
        useConfirmation().then(async ({ isConfirmed }) => {
            if (isConfirmed) {
                setLoading(true);
                await componentService.delete(id);
                await syncComponents();
                void useSuccessToast('Component deleted successfully');
                setLoading(false);
            }
        });
    };

    const handlePageChange = (page: number) => {
        setFilters({ ...filters, page });
    };

    return (
        <div className="space-y-4">
            {componentResponse && (
                <>
                    <div className="hidden md:block">
                        <ComponentTableView
                            componentResponse={componentResponse}
                            handleComponentDeletion={handleComponentDeletion}
                        ></ComponentTableView>
                    </div>
                    <div className="block md:hidden">
                        <ComponentCardView
                            componentResponse={componentResponse}
                            handleComponentDeletion={handleComponentDeletion}
                        ></ComponentCardView>
                    </div>
                </>
            )}
            <GenericPagination meta={componentResponse?.meta} handleChangePage={handlePageChange} />
        </div>
    );
}
