import { FormEvent, memo } from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/Components/UI/dialog';
import { Button } from '@/Components/UI/button';
import { Label } from '@/Components/UI/label';
import { Input } from '@/Components/UI/input';
import { RiFeedbackLine } from '@remixicon/react';
import { useForm, usePage } from '@inertiajs/react';
import { Rating } from 'react-simple-star-rating';
import { withLoading } from '@/Utils/withLoading';
import { feedbackService } from '@/Services/feedbackService';
import { useSuccessToast } from '@/Hooks/useToast';
import { FeedbackTooltipEnum } from '@/Support/Enums/feedbackTooltipEnum';
import { STYLING } from '@/Support/Constants/styling';
import { useLaravelReactI18n } from 'laravel-react-i18n';

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
                <Button variant="ghost" size="icon" title={t('components.add_feedback.title')}>
                    <RiFeedbackLine size={STYLING.ICON.SIZE.SMALL} />
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>
                        <RiFeedbackLine className="inline-block w-6 h-6 mr-2" aria-hidden="true" />
                        {t('components.add_feedback.title')}
                    </DialogTitle>
                    <DialogDescription>{t('components.add_feedback.description')} </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleAddFeedback}>
                    <div className="grid gap-4 py-4">
                        {!auth.user.id && (
                            <>
                                <Label htmlFor="name">{t('components.add_feedback.fields.name')}</Label>
                                <Input
                                    id="name"
                                    name="name"
                                    placeholder={t('components.add_feedback.fields.name_placeholder')}
                                    value={data.name}
                                    onChange={e => setData('name', e.target.value)}
                                />
                                <Label htmlFor="email">{t('components.add_feedback.fields.email')}</Label>
                                <Input
                                    id="email"
                                    name="email"
                                    placeholder={t('components.add_feedback.fields.email_placeholder')}
                                    value={data.email}
                                    onChange={e => setData('email', e.target.value)}
                                />
                            </>
                        )}

                        <Label htmlFor="rating">{t('components.add_feedback.fields.rating')}</Label>
                        <Rating
                            SVGclassName={'inline-block'}
                            onClick={(rate: number) => setData('rating', rate)}
                            allowFraction={false}
                            initialValue={data.rating} // Multiplying by 20 to convert 5-star scale to 100 scale
                            transition
                            showTooltip
                            tooltipArray={Object.values(FeedbackTooltipEnum)}
                            fillColor="gold"
                            emptyColor="gray"
                        />

                        <Label htmlFor="message">{t('components.add_feedback.fields.message')}</Label>
                        <Input
                            id="message"
                            name="message"
                            placeholder={t('components.add_feedback.fields.message_placeholder')}
                            value={data.message}
                            onChange={e => setData('message', e.target.value)}
                        />
                    </div>
                    <DialogFooter>
                        <Button type="submit">{t('action.save')}</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default memo(AddFeedback);
