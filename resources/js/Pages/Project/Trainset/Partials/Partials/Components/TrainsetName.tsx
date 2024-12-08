import { Button } from '@/Components/UI/button';
import { Input } from '@/Components/UI/input';
import { useLoading } from '@/Contexts/LoadingContext';
import { checkPermission } from '@/Helpers/sidebarHelper';
import { trainsetService } from '@/Services/trainsetService';
import { STYLING } from '@/Support/Constants/styling';
import { PERMISSION_ENUM } from '@/Support/Enums/permissionEnum';
import { TrainsetResource } from '@/Support/Interfaces/Resources';
import { withLoading } from '@/Utils/withLoading';
import { useForm } from '@inertiajs/react';
import { useLaravelReactI18n } from 'laravel-react-i18n';
import { PencilLine } from 'lucide-react';
import { FormEvent, useState } from 'react';

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
                <form onSubmit={handleEditTrainsetName} className='group flex gap-4'>
                    <div className=''>
                        <Input
                            type='text'
                            required
                            pattern='^(?!\s*$).+'
                            onChange={(e) => setData('trainsetName', e.target.value)}
                            // className="w-fit"
                            defaultValue={data.trainsetName}
                            className='peer w-fit invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500'
                        />
                        <span className='mt-2 hidden text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block'>
                            {t(
                                'pages.project.trainset.partials.partials.components.trainset_name.trainset_error',
                            )}
                        </span>
                    </div>
                    <Button
                        type='submit'
                        disabled={loading}
                        className='group-invalid:pointer-events-none group-invalid:opacity-30'
                    >
                        {loading
                            ? t('action.loading')
                            : t(
                                  'pages.project.trainset.partials.partials.components.trainset_name.buttons.submit',
                              )}
                    </Button>
                    <Button type='button' onClick={toggleEditMode}>
                        {t('action.cancel')}
                    </Button>
                </form>
            ) : (
                <div className='flex items-center gap-4'>
                    <div>{trainset.name}</div>
                    {checkPermission(PERMISSION_ENUM.PROJECT_TRAINSET_UPDATE) && (
                    <Button
                        variant='ghost'
                        onClick={toggleEditMode}
                        className='h-fit whitespace-normal rounded-full p-2'
                    >
                        <PencilLine size={STYLING.ICON.SIZE.SMALL} />
                    </Button>
                    )}
                </div>
            )}
        </>
    );
}
