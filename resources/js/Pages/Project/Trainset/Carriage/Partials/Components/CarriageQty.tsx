import { CarriageTrainsetResource, TrainsetResource } from '@/support/interfaces/resources';
import { useForm } from '@inertiajs/react';
import { Input } from '@/Components/ui/input';
import { Button } from '@/Components/ui/button';
import { PencilLine } from 'lucide-react';
import { STYLING } from '@/support/constants/styling';
import { trainsetService } from '@/services/trainsetService';
import { useState } from 'react';
import { useLoading } from '@/Contexts/LoadingContext';

export default function ({
    trainset,
    carriage_trainset,
    handleSyncTrainset,
}: {
    trainset: TrainsetResource;
    carriage_trainset: CarriageTrainsetResource;
    handleSyncTrainset: () => Promise<void>;
}) {
    const { data, setData, reset } = useForm({
        carriageQty: carriage_trainset.qty,
    });
    const [isEditing, setIsEditing] = useState(false);
    const toggleEditMode = () => {
        setIsEditing(!isEditing);
    };
    const { setLoading, loading } = useLoading();

    const handleEditCarriageQty = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        await trainsetService.updateCarriageTrainset(trainset.id, carriage_trainset.id, {
            qty: data.carriageQty,
        });
        await handleSyncTrainset();
        setIsEditing(false);
        setLoading(false);
    };

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
                        {loading ? 'Processing' : 'Save'}
                    </Button>
                    <Button type="button" onClick={toggleEditMode}>
                        Cancel
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
