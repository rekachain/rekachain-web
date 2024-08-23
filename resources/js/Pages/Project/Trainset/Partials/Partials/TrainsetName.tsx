import { TrainsetResource } from '@/support/interfaces/resources';
import { Button } from '@/Components/ui/button';
import { PencilLine } from 'lucide-react';
import { STYLING } from '@/support/constants/styling';
import { Input } from '@/Components/ui/input';
import { trainsetService } from '@/services/trainsetService';
import { useForm } from '@inertiajs/react';

export default function ({ trainset }: { trainset: TrainsetResource }) {
    const { data, setData, reset } = useForm({
        trainsetName: trainset.name,
        isLoading: false,
        isEditing: false,
    });

    const toggleEditMode = () => {
        setData('isEditing', !data.isEditing);
    };

    const handleEditTrainsetName = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setData('isLoading', true);
        const { name } = await trainsetService.update(trainset.id, { name: data.trainsetName });
        trainset.name = name;
        setData('isEditing', false);
        reset('isLoading', 'isEditing');
    };

    return (
        <>
            {data.isEditing ? (
                <form onSubmit={handleEditTrainsetName} className="flex gap-4">
                    <Input
                        type="text"
                        className="w-fit"
                        defaultValue={data.trainsetName}
                        onChange={e => setData('trainsetName', e.target.value)}
                    />
                    <Button type="submit" disabled={data.isLoading}>
                        {data.isLoading ? 'Processing' : 'Save'}
                    </Button>
                    <Button type="button" onClick={toggleEditMode}>
                        Cancel
                    </Button>
                </form>
            ) : (
                <div className="flex items-center gap-4">
                    <div>{trainset.name}</div>
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
