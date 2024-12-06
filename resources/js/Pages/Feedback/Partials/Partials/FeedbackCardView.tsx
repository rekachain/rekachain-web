import { Button } from '@/Components/UI/button';
import { checkPermission } from '@/Helpers/permissionHelper';
import AnimateIn from '@/Lib/AnimateIn';
import { STYLING } from '@/Support/Constants/styling';
import { PERMISSION_ENUM } from '@/Support/Enums/permissionEnum';
import { RoleEnum } from '@/Support/Enums/roleEnum';
import { PaginateResponse } from '@/Support/Interfaces/Others';
import { FeedbackResource } from '@/Support/Interfaces/Resources';
import { usePage } from '@inertiajs/react';
import { useLaravelReactI18n } from 'laravel-react-i18n';
import { Rating } from 'react-simple-star-rating';

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
        auth.user.role === RoleEnum.SUPER_ADMIN ||
        checkPermission([PERMISSION_ENUM.FEEDBACK_READ, PERMISSION_ENUM.FEEDBACK_READ_ALL], true);

    return (
        <div>
            {feedbackResponse?.data.map((feedback) => (
                <AnimateIn
                    to='opacity-100 translate-y-0 translate-x-0'
                    key={feedback.id}
                    from='opacity-0 -translate-y-4'
                    duration={300}
                >
                    <div className='mt-5 flex flex-col gap-2 rounded-md border-2 border-black p-2 dark:border-white'>
                        <div className='flex w-full items-center justify-between'>
                            <h4 className='text-lg font-bold'>{feedback.name}</h4>
                            <Rating
                                SVGclassName={'inline-block'}
                                size={STYLING.ICON.SIZE.SMALL}
                                readonly
                                initialValue={feedback.rating}
                            />
                        </div>
                        <p> {feedback.message}</p>
                        <div className='flex w-full items-center justify-end'>
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
                        </div>
                    </div>
                </AnimateIn>
            ))}
        </div>
    );
}
