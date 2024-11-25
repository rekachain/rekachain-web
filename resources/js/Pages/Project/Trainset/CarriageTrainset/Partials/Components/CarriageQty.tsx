import { CarriageTrainsetResource, TrainsetResource } from '@/Support/Interfaces/Resources';
import { useForm } from '@inertiajs/react';
import { Input } from '@/Components/UI/input';
import { Button } from '@/Components/UI/button';
import { PencilLine } from 'lucide-react';
import { STYLING } from '@/Support/Constants/styling';
import { trainsetService } from '@/Services/trainsetService';
import { FormEvent, useState } from 'react';
import { useLoading } from '@/Contexts/LoadingContext';
import { withLoading } from '@/Utils/withLoading';
import { useSuccessToast } from '@/Hooks/useToast';
import { useLaravelReactI18n } from 'laravel-react-i18n';

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
            t('pages.project.trainset.carriage_trainset.partials.components.carriage_qty.messages.updated'),
        );
    });

    return (
        <>
            {isEditing ? (
                <form onSubmit={handleEditCarriageQty} className="flex gap-4">
                    <Input
                        type="number"
                        min={1}
                        className="w-fit"
                        defaultValue={data.carriageQty}
                        onChange={e => setData('carriageQty', +e.target.value)}
                    />
                    <Button type="submit" disabled={loading}>
                        {loading
                            ? t('action.loading')
                            : t(
                                  'pages.project.trainset.carriage_trainset.partials.components.carriage_qty.buttons.submit',
                              )}
                    </Button>
                    <Button type="button" onClick={toggleEditMode}>
                        {t('action.cancel')}
                    </Button>
                </form>
            ) : (
                <div className="flex items-center gap-4">
                    <div>{carriage_trainset.qty}</div>
                    <Button
                        variant="ghost"
                        onClick={toggleEditMode}
                        className="p-2 whitespace-normal h-fit rounded-full"
                    >
                        <PencilLine size={STYLING.ICON.SIZE.SMALL} />
                    </Button>
                </div>
            )}
        </>
    );
}
