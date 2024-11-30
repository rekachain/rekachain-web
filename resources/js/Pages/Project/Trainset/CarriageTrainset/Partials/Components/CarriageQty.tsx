import { Button } from '@/Components/UI/button';
import { Input } from '@/Components/UI/input';
import { useLoading } from '@/Contexts/LoadingContext';
import { useSuccessToast } from '@/Hooks/useToast';
import { trainsetService } from '@/Services/trainsetService';
import { STYLING } from '@/Support/Constants/styling';
import { CarriageTrainsetResource, TrainsetResource } from '@/Support/Interfaces/Resources';
import { withLoading } from '@/Utils/withLoading';
import { useForm } from '@inertiajs/react';
import { useLaravelReactI18n } from 'laravel-react-i18n';
import { PencilLine } from 'lucide-react';
import { FormEvent, useState } from 'react';

export default function ({
    trainset,
    carriage_trainset,
    handleSyncTrainset,
}: {
    trainset: TrainsetResource;
    carriage_trainset: CarriageTrainsetResource;
    handleSyncTrainset: () => Promise<void>;
}) {
    const { t } = useLaravelReactI18n();
    const { data, setData } = useForm({
        carriageQty: carriage_trainset.qty,
    });
    const [isEditing, setIsEditing] = useState(false);
    const toggleEditMode = () => {
        setIsEditing(!isEditing);
    };
    const { loading } = useLoading();

    const handleEditCarriageQty = withLoading(async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await trainsetService.updateCarriageTrainset(trainset.id, carriage_trainset.id, {
            qty: data.carriageQty,
        });
        await handleSyncTrainset();
        setIsEditing(false);
        void useSuccessToast(
            t(
                'pages.project.trainset.carriage_trainset.partials.components.carriage_qty.messages.updated',
            ),
        );
    });

    return (
        <>
            {isEditing ? (
                <form onSubmit={handleEditCarriageQty} className='flex gap-4'>
                    <Input
                        type='number'
                        onChange={(e) => setData('carriageQty', +e.target.value)}
                        min={1}
                        defaultValue={data.carriageQty}
                        className='w-fit'
                    />
                    <Button type='submit' disabled={loading}>
                        {loading
                            ? t('action.loading')
                            : t(
                                  'pages.project.trainset.carriage_trainset.partials.components.carriage_qty.buttons.submit',
                              )}
                    </Button>
                    <Button type='button' onClick={toggleEditMode}>
                        {t('action.cancel')}
                    </Button>
                </form>
            ) : (
                <div className='flex items-center gap-4'>
                    <div>{carriage_trainset.qty}</div>
                    <Button
                        variant='ghost'
                        onClick={toggleEditMode}
                        className='h-fit whitespace-normal rounded-full p-2'
                    >
                        <PencilLine size={STYLING.ICON.SIZE.SMALL} />
                    </Button>
                </div>
            )}
        </>
    );
}
