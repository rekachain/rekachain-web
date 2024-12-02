import { Button } from '@/Components/UI/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/Components/UI/dialog';
import { Input } from '@/Components/UI/input';
import { Label } from '@/Components/UI/label';
import { useSuccessToast } from '@/Hooks/useToast';
import { feedbackService } from '@/Services/feedbackService';
import { STYLING } from '@/Support/Constants/styling';
import { FeedbackTooltipEnum } from '@/Support/Enums/feedbackTooltipEnum';
import { withLoading } from '@/Utils/withLoading';
import { useForm, usePage } from '@inertiajs/react';
import { RiFeedbackLine } from '@remixicon/react';
import { useLaravelReactI18n } from 'laravel-react-i18n';
import { FormEvent, memo } from 'react';
import { Rating } from 'react-simple-star-rating';

const AddFeedback = () => {
    const auth = usePage().props.auth;
    const { t } = useLaravelReactI18n();
    const { data, setData } = useForm({
        user_id: auth?.user?.id ?? null,
        name: '',
        email: '',
        message: '',
        rating: 0,
    });

    const handleAddFeedback = withLoading(async (e: FormEvent) => {
        e.preventDefault();
        await feedbackService.create(data);
        void useSuccessToast(t('components.add_feedback.messages.created'));
    });

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant='ghost' title={t('components.add_feedback.title')} size='icon'>
                    <RiFeedbackLine size={STYLING.ICON.SIZE.SMALL} />
                </Button>
            </DialogTrigger>
            <DialogContent className='sm:max-w-[425px]'>
                <DialogHeader>
                    <DialogTitle>
                        <RiFeedbackLine className='mr-2 inline-block h-6 w-6' aria-hidden='true' />
                        {t('components.add_feedback.title')}
                    </DialogTitle>
                    <DialogDescription>
                        {t('components.add_feedback.description')}{' '}
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleAddFeedback}>
                    <div className='grid gap-4 py-4'>
                        {!auth.user.id && (
                            <>
                                <Label htmlFor='name'>
                                    {t('components.add_feedback.fields.name')}
                                </Label>
                                <Input
                                    value={data.name}
                                    placeholder={t(
                                        'components.add_feedback.fields.name_placeholder',
                                    )}
                                    onChange={(e) => setData('name', e.target.value)}
                                    name='name'
                                    id='name'
                                />
                                <Label htmlFor='email'>
                                    {t('components.add_feedback.fields.email')}
                                </Label>
                                <Input
                                    value={data.email}
                                    placeholder={t(
                                        'components.add_feedback.fields.email_placeholder',
                                    )}
                                    onChange={(e) => setData('email', e.target.value)}
                                    name='email'
                                    id='email'
                                />
                            </>
                        )}

                        <Label htmlFor='rating'>{t('components.add_feedback.fields.rating')}</Label>
                        <Rating
                            transition
                            tooltipArray={Object.values(FeedbackTooltipEnum)}
                            SVGclassName={'inline-block'}
                            showTooltip
                            onClick={(rate: number) => setData('rating', rate)}
                            initialValue={data.rating} // Multiplying by 20 to convert 5-star scale to 100 scale
                            fillColor='gold'
                            emptyColor='gray'
                            allowFraction={false}
                        />

                        <Label htmlFor='message'>
                            {t('components.add_feedback.fields.message')}
                        </Label>
                        <Input
                            value={data.message}
                            placeholder={t('components.add_feedback.fields.message_placeholder')}
                            onChange={(e) => setData('message', e.target.value)}
                            name='message'
                            id='message'
                        />
                    </div>
                    <DialogFooter>
                        <Button type='submit'>{t('action.save')}</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default memo(AddFeedback);
