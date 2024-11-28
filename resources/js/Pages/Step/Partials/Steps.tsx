import { useEffect, useState } from 'react';
import { StepResource } from '@/Support/Interfaces/Resources';
import { PaginateResponse } from '@/Support/Interfaces/Others';
import GenericPagination from '@/Components/GenericPagination';
import { ServiceFilterOptions } from '@/Support/Interfaces/Others/ServiceFilterOptions';
import { stepService } from '@/Services/stepService';
import { useSuccessToast } from '@/Hooks/useToast';
import StepCardView from './Partials/StepCardView';
import StepTableView from './Partials/StepTableView';
import { withLoading } from '@/Utils/withLoading';
import { useLaravelReactI18n } from 'laravel-react-i18n';
import Filters from '@/Pages/Step/Partials/Partials/Filters';

export default function () {
    const { t } = useLaravelReactI18n();
    const [stepResponse, setStepResponse] = useState<PaginateResponse<StepResource>>();
    const [filters, setFilters] = useState<ServiceFilterOptions>({
        page: 1,
        perPage: 10,
    });

    const handleSyncSteps = withLoading(async () => {
        const res = await stepService.getAll(filters);
        setStepResponse(res);
    });

    useEffect(() => {
        void handleSyncSteps();
    }, [filters]);

    const handleStepDeletion = withLoading(async (id: number) => {
        await stepService.delete(id);
        await handleSyncSteps();
        void useSuccessToast(t('pages.step.partials.steps.messages.deleted'));
    }, true);

    const handlePageChange = (page: number) => {
        setFilters({ ...filters, page });
    };

    return (
        <div className='space-y-4'>
            {stepResponse && (
                <>
                    <Filters setFilters={setFilters} filters={filters} />

                    <div className='hidden md:block'>
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

                    <div className='block md:hidden'>
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
