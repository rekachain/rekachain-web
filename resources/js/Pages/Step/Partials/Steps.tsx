import { Link } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { StepResource } from '../../../Support/Interfaces/Resources';
import { PaginateResponse } from '../../../Support/Interfaces/Others';
import { Button, buttonVariants } from '@/Components/UI/button';
import { ROUTES } from '@/Support/Constants/routes';
import GenericPagination from '@/Components/GenericPagination';
import { ServiceFilterOptions } from '@/Support/Interfaces/Others/ServiceFilterOptions';
import { useConfirmation } from '@/Hooks/useConfirmation';
import { stepService } from '@/Services/stepService';
import { useSuccessToast } from '@/Hooks/useToast';
import { useLoading } from '@/Contexts/LoadingContext';
import StepCardView from './Partials/StepCardView';
import StepTableView from './Partials/StepTableView';

export default function () {
    const [stepResponse, setStepResponse] = useState<PaginateResponse<StepResource>>();
    const [filters, setFilters] = useState<ServiceFilterOptions>({
        page: 1,
        perPage: 10,
    });

    const { setLoading } = useLoading();

    const syncSteps = async () => {
        setLoading(true);
        const res = await stepService.getAll(filters);
        setStepResponse(res);
        setLoading(false);
    };

    useEffect(() => {
        syncSteps();
    }, [filters]);

    const handleStepDeletion = (id: number) => {
        useConfirmation().then(async ({ isConfirmed }) => {
            if (isConfirmed) {
                setLoading(true);
                await stepService.delete(id);
                await syncSteps();
                useSuccessToast('Step deleted successfully');
                setLoading(false);
            }
        });
    };

    const handlePageChange = (page: number) => {
        setFilters({ ...filters, page });
    };

    return (
        <div className="space-y-4">
            {stepResponse && (
                <>
                    <div className="hidden md:block">
                        <StepTableView
                            stepResponse={stepResponse}
                            handleStepDeletion={handleStepDeletion}
                        ></StepTableView>
                        {/* <WorkstationTableView
                    workstationResponse={workstationResponse}
                    handleWorkstationDeletion={handleWorkstationDeletion}
                    // auth={auth}
                ></WorkstationTableView> */}
                    </div>

                    <div className="block md:hidden">
                        <StepCardView
                            stepResponse={stepResponse}
                            handleStepDeletion={handleStepDeletion}
                            // auth={auth}
                        ></StepCardView>
                    </div>
                </>
            )}
            <GenericPagination meta={stepResponse?.meta} handleChangePage={handlePageChange} />
        </div>
    );
}
