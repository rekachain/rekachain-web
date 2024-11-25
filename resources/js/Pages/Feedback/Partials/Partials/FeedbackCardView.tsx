import { Button } from '@/Components/UI/button';
import AnimateIn from '@/Lib/AnimateIn';
import { PaginateResponse } from '@/Support/Interfaces/Others';
import { FeedbackResource } from '@/Support/Interfaces/Resources';
import { usePage } from '@inertiajs/react';
import React from 'react';
import { Rating } from 'react-simple-star-rating';
import { STYLING } from '@/Support/Constants/styling';
import { RoleEnum } from '@/Support/Enums/roleEnum';
import { checkPermission } from '@/Helpers/sidebarHelper';
import { PERMISSION_ENUM } from '@/Support/Enums/permissionEnum';
import { useLaravelReactI18n } from 'laravel-react-i18n';

export default function FeedbackTableView({
    feedbackResponse,
    handleFeedbackDeletion,
}: {
    feedbackResponse: PaginateResponse<FeedbackResource>;
    handleFeedbackDeletion: (id: number) => void;
}) {
    const { t } = useLaravelReactI18n();
    const auth = usePage().props.auth;

    const allowedToReadAll =
        auth.user.role === RoleEnum.SUPER_ADMIN || checkPermission(PERMISSION_ENUM.FEEDBACK_READ_ALL);

    return (
        <div>
            {feedbackResponse?.data.map(feedback => (
                <AnimateIn
                    to="opacity-100 translate-y-0 translate-x-0"
                    key={feedback.id}
                    from="opacity-0 -translate-y-4"
                    duration={300}
                >
                    <div className="border-black dark:border-white border-2 rounded-md p-2 flex flex-col gap-2 mt-5">
                        <div className="flex w-full justify-between items-center">
                            <h4 className="font-bold text-lg">{feedback.name}</h4>
                            <Rating
                                SVGclassName={'inline-block'}
                                size={STYLING.ICON.SIZE.SMALL}
                                readonly
                                initialValue={feedback.rating}
                            />
                        </div>
                        <p> {feedback.message}</p>
                        <div className="flex items-center justify-end w-full">
                            {/*<Link*/}
                            {/*    className={buttonVariants({ variant: 'link' })}*/}
                            {/*    href={route(`${ROUTES.FEEDBACK}.edit`, feedback.id)}*/}
                            {/*>*/}
                            {/*    Edit*/}
                            {/*</Link>*/}
                            {feedback.can_be_deleted && allowedToReadAll && (
                                <Button variant="link" onClick={() => handleFeedbackDeletion(feedback.id)}>
                                    {t('action.delete')}
                                </Button>
                            )}
                        </div>
                    </div>
                </AnimateIn>
            ))}
        </div>
    );
}
