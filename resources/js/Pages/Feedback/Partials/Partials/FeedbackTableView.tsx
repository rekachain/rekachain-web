import { PaginateResponse } from '@/Support/Interfaces/Others';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/Components/UI/table';
import { FeedbackResource } from '@/Support/Interfaces/Resources';
import React from 'react';
import { Button } from '@/Components/UI/button';
import { RoleEnum } from '@/Support/Enums/roleEnum';
import { checkPermission } from '@/Helpers/sidebarHelper';
import { PERMISSION_ENUM } from '@/Support/Enums/permissionEnum';
import { usePage } from '@inertiajs/react';
import { FeedbackStatusEnum } from '@/Support/Enums/feedbackStatusEnum';
import { useLaravelReactI18n } from 'laravel-react-i18n';

export default function FeedbackCardView({
    feedbackResponse,
    handleFeedbackDeletion,
}: {
    feedbackResponse: PaginateResponse<FeedbackResource>;
    handleFeedbackDeletion: (id: number) => void;
}) {
    const { t } = useLaravelReactI18n();

    const auth = usePage().props.auth;

    const allowedToReadAll =
        auth.user.role === RoleEnum.SUPER_ADMIN ||
        checkPermission(PERMISSION_ENUM.FEEDBACK_READ_ALL);

    return (
        <div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>
                            {t('pages.feedback.partials.partials.feedback_table.headers.name')}
                        </TableHead>
                        <TableHead>
                            {t('pages.feedback.partials.partials.feedback_table.headers.email')}
                        </TableHead>
                        <TableHead>
                            {t('pages.feedback.partials.partials.feedback_table.headers.rating')}
                        </TableHead>
                        <TableHead>
                            {t('pages.feedback.partials.partials.feedback_table.headers.message')}
                        </TableHead>
                        <TableHead>
                            {t('pages.feedback.partials.partials.feedback_table.headers.status')}
                        </TableHead>
                        <TableHead></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {feedbackResponse?.data.map((feedback) => (
                        <TableRow key={feedback.id}>
                            <TableCell>{feedback.name}</TableCell>
                            <TableCell>{feedback.email}</TableCell>
                            <TableCell>{feedback.rating}</TableCell>
                            <TableCell>{feedback.message}</TableCell>
                            <TableCell>
                                {feedback.status === FeedbackStatusEnum.PENDING && (
                                    <span className='text-yellow-500'>
                                        {t(
                                            'pages.feedback.partials.partials.feedback_table.values.pending',
                                        )}
                                    </span>
                                )}
                                {feedback.status === FeedbackStatusEnum.APPROVED && (
                                    <span className='text-green-500'>
                                        {t(
                                            'pages.feedback.partials.partials.feedback_table.values.approved',
                                        )}
                                    </span>
                                )}
                                {feedback.status === FeedbackStatusEnum.REJECTED && (
                                    <span className='text-red-500'>
                                        {t(
                                            'pages.feedback.partials.partials.feedback_table.values.rejected',
                                        )}
                                    </span>
                                )}
                            </TableCell>
                            <TableCell>
                                {/*<Link*/}
                                {/*    className={buttonVariants({ variant: 'link' })}*/}
                                {/*    href={route(`${ROUTES.FEEDBACK}.edit`, feedback.id)}*/}
                                {/*>*/}
                                {/*    Edit*/}
                                {/*</Link>*/}
                                {feedback.can_be_deleted && allowedToReadAll && (
                                    <Button
                                        variant='link'
                                        onClick={() => handleFeedbackDeletion(feedback.id)}
                                    >
                                        {t('action.delete')}
                                    </Button>
                                )}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
