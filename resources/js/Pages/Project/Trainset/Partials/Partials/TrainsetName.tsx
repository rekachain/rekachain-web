import { TrainsetResource } from '@/support/interfaces/resources';
import { Button } from '@/Components/ui/button';
import { PencilLine } from 'lucide-react';
import { STYLING } from '@/support/constants/styling';
import { Input } from '@/Components/ui/input';
import { trainsetService } from '@/services/trainsetService';
import { useForm } from '@inertiajs/react';
import { useLoading } from '@/Contexts/LoadingContext';
import { useState } from 'react';

export default function ({ trainset }: { trainset: TrainsetResource }) {
    const { data, setData, reset } = useForm({
        trainsetName: trainset.name,
    });
    const [isEditing, setIsEditing] = useState(false);
    const { setLoading, loading } = useLoading();

    const toggleEditMode = () => {
        setIsEditing(!isEditing);
    };

    const handleEditTrainsetName = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        const { name } = await trainsetService.update(trainset.id, { name: data.trainsetName });
        trainset.name = name;
        setIsEditing(false);
        setLoading(false);
    };

    return (
        <>
            {isEditing ? (
                <form onSubmit={handleEditTrainsetName} className="flex gap-4 group">
                    <div className="">
                        <Input
                            pattern="^(?!\s*$).+"
                            required
                            type="text"
                            className="invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500 w-fit peer"
                            // className="w-fit"
                            defaultValue={data.trainsetName}
                            onChange={e => setData('trainsetName', e.target.value)}
                        />
                        <span className="mt-2 text-sm hidden text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
                            Kode Trainset tidak boleh kosong.
                        </span>
                    </div>
                    <Button
                        type="submit"
                        disabled={loading}
                        className="group-invalid:pointer-events-none group-invalid:opacity-30"
                    >
                        {loading ? 'Processing' : 'Save'}
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
