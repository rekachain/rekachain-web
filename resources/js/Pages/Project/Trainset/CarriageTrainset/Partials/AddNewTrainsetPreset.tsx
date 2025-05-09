import { Button, buttonVariants } from '@/Components/UI/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/Components/UI/dialog';
import { Input } from '@/Components/UI/input';
import { Label } from '@/Components/UI/label';
import { useLoading } from '@/Contexts/LoadingContext';
import { useSuccessToast } from '@/Hooks/useToast';
import { trainsetService } from '@/Services/trainsetService';
import { TrainsetResource } from '@/Support/Interfaces/Resources';
import { withLoading } from '@/Utils/withLoading';
import { useForm } from '@inertiajs/react';
import { useLaravelReactI18n } from 'laravel-react-i18n';
import { Loader2 } from 'lucide-react';
import { FormEvent, memo } from 'react';

const AddNewTrainsetPreset = ({
    trainset,
    handleSyncTrainset,
}: {
    trainset: TrainsetResource;
    handleSyncTrainset: () => Promise<void>;
}) => {
    const { t } = useLaravelReactI18n();
    const { data, setData } = useForm({
        new_carriage_preset_name: '',
    });

    const { loading } = useLoading();

    const handleSaveTrainsetPreset = withLoading(async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await trainsetService.savePreset(
            trainset.id,
            trainset.project_id,
            data.new_carriage_preset_name,
        );
        await handleSyncTrainset();
        void useSuccessToast(
            t(
                'pages.project.trainset.carriage_trainset.partials.add_new_trainset_preset.messages.preset_added',
            ),
        );
    });

    return (
        <Dialog>
            <DialogTrigger
                className={buttonVariants({
                    className: 'w-full',
                })}
            >
                {t(
                    'pages.project.trainset.carriage_trainset.partials.add_new_trainset_preset.buttons.add_new_preset',
                )}
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        {t(
                            'pages.project.trainset.carriage_trainset.partials.add_new_trainset_preset.dialogs.title',
                        )}
                    </DialogTitle>
                    <DialogDescription></DialogDescription>
                    <form onSubmit={handleSaveTrainsetPreset} className='flex flex-col gap-4'>
                        <div className='flex flex-col gap-4'>
                            <Label>
                                {t(
                                    'pages.project.trainset.carriage_trainset.partials.add_new_trainset_preset.dialogs.fields.preset_name',
                                )}
                            </Label>
                            <div className='flex gap-4'>
                                <Input
                                    value={data.new_carriage_preset_name}
                                    type='text'
                                    onChange={(e) =>
                                        setData('new_carriage_preset_name', e.target.value)
                                    }
                                />
                                <Button type='submit' disabled={loading} className='w-fit'>
                                    {loading ? (
                                        <>
                                            <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                                            {t(
                                                'pages.project.trainset.carriage_trainset.partials.add_new_trainset_preset.dialogs.actions.saving',
                                            )}
                                        </>
                                    ) : (
                                        t(
                                            'pages.project.trainset.carriage_trainset.partials.add_new_trainset_preset.dialogs.buttons.submit',
                                        )
                                    )}
                                </Button>
                            </div>
                        </div>
                    </form>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
};

export default memo(AddNewTrainsetPreset);
