import GenericPagination from '@/Components/GenericPagination';
import { checkPermission } from '@/Helpers/permissionHelper';
import { useSuccessToast } from '@/Hooks/useToast';
import { feedbackService } from '@/Services/feedbackService';
import { PERMISSION_ENUM } from '@/Support/Enums/permissionEnum';
import { RoleEnum } from '@/Support/Enums/roleEnum';
import { PaginateResponse } from '@/Support/Interfaces/Others';
import { ServiceFilterOptions } from '@/Support/Interfaces/Others/ServiceFilterOptions';
import { FeedbackResource } from '@/Support/Interfaces/Resources';
import { withLoading } from '@/Utils/withLoading';
import { usePage } from '@inertiajs/react';
import { useLaravelReactI18n } from 'laravel-react-i18n';
import { useEffect, useState } from 'react';
import FeedbackCardView from './Partials/FeedbackCardView';
import FeedbackTableView from './Partials/FeedbackTableView';

export default function () {
    const { t } = useLaravelReactI18n();
    const [feedbackResponse, setFeedbackResponse] = useState<PaginateResponse<FeedbackResource>>();
    const auth = usePage().props.auth;
    const allowedToReadAll =
        auth.user.role === RoleEnum.SUPER_ADMIN ||
        checkPermission([PERMISSION_ENUM.FEEDBACK_READ, PERMISSION_ENUM.FEEDBACK_READ_ALL], true);

    const [filters, setFilters] = useState<ServiceFilterOptions>({
        page: 1,
        perPage: 10,
    });

    const syncFeedbacks = withLoading(async () => {
        const res = await feedbackService.getAll({
            ...filters,
            ...(allowedToReadAll
                ? {}
                : {
                      column_filters: {
                          user_id: auth.user.id,
                      },
                  }),
        });
        setFeedbackResponse(res);
    });

    useEffect(() => {
        void syncFeedbacks();
    }, [filters]);

    const handleFeedbackDeletion = withLoading(async (id: number) => {
        await feedbackService.delete(id);
        await syncFeedbacks();
        void useSuccessToast(t('pages.feedback.partials.feedbacks.messages.deleted'));
    }, true);

    const handlePageChange = (page: number) => {
        setFilters({ ...filters, page });
    };

    return (
        <div className='space-y-4'>
            {feedbackResponse && (
                <>
                    <div className='hidden md:block'>
                        <FeedbackTableView
                            handleFeedbackDeletion={handleFeedbackDeletion}
                            feedbackResponse={feedbackResponse}
                        />
                    </div>

                    <div className='block md:hidden'>
                        <FeedbackCardView
                            handleFeedbackDeletion={handleFeedbackDeletion}
                            feedbackResponse={feedbackResponse}
                        />
                    </div>
                </>
            )}
            <GenericPagination meta={feedbackResponse?.meta} handleChangePage={handlePageChange} />
        </div>
    );
}
