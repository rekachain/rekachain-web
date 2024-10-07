import { FormEvent, memo } from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/Components/UI/dialog';
import { Button, buttonVariants } from '@/Components/UI/button';
import { Label } from '@/Components/UI/label';
import { Input } from '@/Components/UI/input';
import { Loader2 } from 'lucide-react';
import { useLoading } from '@/Contexts/LoadingContext';
import { useForm } from '@inertiajs/react';
import { withLoading } from '@/Utils/withLoading';
import { trainsetService } from '@/Services/trainsetService';
import { useSuccessToast } from '@/Hooks/useToast';
import { TrainsetResource } from '@/Support/Interfaces/Resources';

const AddNewTrainsetPreset = ({
    trainset,
    handleSyncTrainset,
}: {
    trainset: TrainsetResource;
    handleSyncTrainset: () => Promise<void>;
}) => {
    const { data, setData } = useForm({
        new_carriage_preset_name: '',
    });

    const { loading } = useLoading();

    const handleSaveTrainsetPreset = withLoading(async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await trainsetService.savePreset(trainset.id, trainset.project_id, data.new_carriage_preset_name);
        await handleSyncTrainset();
        void useSuccessToast('Preset saved successfully');
    });

    return (
        <Dialog>
            <DialogTrigger
                className={buttonVariants({
                    className: 'w-full',
                })}
            >
                Tambahkan Preset
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Preset baru</DialogTitle>
                    <DialogDescription></DialogDescription>
                    <form onSubmit={handleSaveTrainsetPreset} className="flex flex-col gap-4">
                        <div className="flex flex-col gap-4">
                            <Label>Nama Preset</Label>
                            <div className="flex gap-4">
                                <Input
                                    type="text"
                                    value={data.new_carriage_preset_name}
                                    onChange={e => setData('new_carriage_preset_name', e.target.value)}
                                />
                                <Button type="submit" disabled={loading} className="w-fit">
                                    {loading ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            Menambahkan preset
                                        </>
                                    ) : (
                                        'Tambahkan preset'
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
