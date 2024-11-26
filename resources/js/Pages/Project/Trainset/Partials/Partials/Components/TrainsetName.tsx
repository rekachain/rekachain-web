import { TrainsetResource } from '@/Support/Interfaces/Resources';
import { Button } from '@/Components/UI/button';
import { PencilLine } from 'lucide-react';
import { STYLING } from '@/Support/Constants/styling';
import { Input } from '@/Components/UI/input';
import { trainsetService } from '@/Services/trainsetService';
import { useForm } from '@inertiajs/react';
import { useLoading } from '@/Contexts/LoadingContext';
import { FormEvent, useState } from 'react';
import { withLoading } from '@/Utils/withLoading';
import { useLaravelReactI18n } from 'laravel-react-i18n';

export default function ({ trainset }: { trainset: TrainsetResource }) {
    const { t } = useLaravelReactI18n();
    const { data, setData } = useForm({
        trainsetName: trainset.name,
    });
    const [isEditing, setIsEditing] = useState(false);
    const { loading } = useLoading();

    const toggleEditMode = () => {
        setIsEditing(!isEditing);
    };

    const handleEditTrainsetName = withLoading(async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const { name } = await trainsetService.update(trainset.id, { name: data.trainsetName });
        trainset.name = name;
        setIsEditing(false);
    });

    return (
        <>
            {isEditing ? (
                <form onSubmit={handleEditTrainsetName} className="flex gap-4 group">
                    <div className="">
                        <Input
                            type="text"
                            required
                            pattern="^(?!\s*$).+"
                            onChange={e => setData('trainsetName', e.target.value)}
                            // className="w-fit"
                            defaultValue={data.trainsetName}
                            className="invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500 w-fit peer"
                        />
                        <span className="mt-2 text-sm hidden text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
                            {t('pages.project.trainset.partials.partials.components.trainset_name.trainset_error')}
                        </span>
                    </div>
                    <Button
                        type="submit"
                        disabled={loading}
                        className="group-invalid:pointer-events-none group-invalid:opacity-30"
                    >
                        {loading
                            ? t('action.loading')
                            : t('pages.project.trainset.partials.partials.components.trainset_name.buttons.submit')}
                    </Button>
                    <Button type="button" onClick={toggleEditMode}>
                        {t('action.cancel')}
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
