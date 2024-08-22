import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { lazy, memo, Suspense, useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import StaticLoadingOverlay from '@/Components/StaticLoadingOverlay';
import { PresetTrainsetResource, TrainsetResource } from '@/support/interfaces/resources';
import { Button, buttonVariants } from '@/Components/ui/button';
import { Label } from '@/Components/ui/label';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/Components/ui/select';
import { trainsetService } from '@/services/trainsetService';
import { Loader2 } from 'lucide-react';
import { Input } from '@/Components/ui/input';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/Components/ui/dialog';
import { Textarea } from '@/Components/ui/textarea';
import { useConfirmation } from '@/hooks/useConfirmation';
import CustomPresetAlert from '@/Pages/Project/Trainset/Partials/CustomPresetAlert';
import { projectService } from '@/services/projectService';

const Carriages = memo(lazy(() => import('./Partials/Carriages')));

export default function ({
    trainset: initialTrainset,
    presetTrainsets: initialPresetTrainset,
}: {
    trainset: TrainsetResource;
    presetTrainsets: PresetTrainsetResource[];
}) {
    const [trainset, setTrainset] = useState<TrainsetResource>(initialTrainset);
    const [presetTrainset, setPresetTrainset] = useState<PresetTrainsetResource[]>(initialPresetTrainset);
    const { data, setData, post, processing, errors, reset } = useForm({
        isLoading: false,
        preset_trainset_id: trainset.preset_trainset_id ?? 0,
        new_carriage_preset_name: '',
        new_carriage_type: 'Gerbong',
        new_carriage_description: '',
        new_carriage_qty: 1,
    });

    const handleChangePreset = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setData('isLoading', true);
        try {
            useConfirmation().then(async result => {
                if (result.isConfirmed) {
                    setData('isLoading', true);
                    await trainsetService.changePreset(trainset.id, data.preset_trainset_id);
                    await handleSyncTrainset();
                    reset('isLoading');
                }
            });
        } catch (error) {
        } finally {
            await handleSyncTrainset();
            // reset('isLoading');
        }
    };

    const handleSaveTrainsetPreset = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setData('isLoading', true);
        try {
            await trainsetService.savePreset(trainset.id, trainset.project_id, data.new_carriage_preset_name);
        } catch (error) {
        } finally {
            await handleSyncTrainset();
        }
    };

    const handleSyncTrainset = async () => {
        setData('isLoading', true);
        const response = await projectService.getTrainsetCarriages(trainset.project_id, trainset.id);
        setTrainset(response.data.trainset);
        setPresetTrainset(response.data.presetTrainsets);
        console.log(response.data);
        data.preset_trainset_id = response.data.trainset.preset_trainset_id;
        console.log(data.preset_trainset_id, response.data.trainset.preset_trainset_id);
        // reset();
    };

    const handleAddCarriageTrainset = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setData('isLoading', true);
        try {
            await trainsetService.addCarriageTrainset(
                trainset.id,
                data.new_carriage_type,
                data.new_carriage_description,
                data.new_carriage_qty,
            );
            console.log('added');
        } catch (error) {
        } finally {
            await handleSyncTrainset();
        }
    };

    return (
        <>
            <Head title={`Project ${trainset.name}`} />
            <AuthenticatedLayout>
                <div className="p-4 space-y-4">
                    <div className="flex flex-col gap-2">
                        <div>
                            <h1 className="text-page-header my-4">Trainset {trainset.name}</h1>
                            <div className="flex flex-col gap-2 bg-background-2 p-5 rounded">
                                {trainset.preset_name && (
                                    <p className="text-page-subheader">Preset: {trainset.preset_name}</p>
                                )}

                                <form onSubmit={handleChangePreset} className="flex gap-2">
                                    <SelectGroup className="space-y-2 w-fit">
                                        <Label htmlFor="preset-trainset">Preset</Label>
                                        <div className="flex gap-2">
                                            <Select
                                                key={data.preset_trainset_id} // Force re-render when preset_trainset_id changes
                                                onValueChange={v => setData('preset_trainset_id', +v)}
                                                value={data.preset_trainset_id?.toString()}
                                                defaultValue={trainset.preset_trainset_id?.toString()}
                                            >
                                                <SelectTrigger id="preset-trainset">
                                                    <SelectValue placeholder="Preset Trainset" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {presetTrainset.map(preset => (
                                                        <SelectItem key={preset.id} value={preset.id.toString()}>
                                                            {preset.name} (
                                                            {preset.carriage_presets.map((c, i) => (
                                                                <span key={c.id}>
                                                                    {c.qty} {c.carriage.type}
                                                                    {i < preset.carriage_presets!.length - 1 && ' + '}
                                                                </span>
                                                            ))}
                                                            )
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>

                                            <Button
                                                type="submit"
                                                disabled={
                                                    data.isLoading ||
                                                    data.preset_trainset_id === trainset.preset_trainset_id
                                                }
                                            >
                                                {data.isLoading ? (
                                                    <>
                                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                        Loading
                                                    </>
                                                ) : (
                                                    'Ubah Preset'
                                                )}
                                            </Button>
                                        </div>
                                    </SelectGroup>
                                </form>
                            </div>
                        </div>

                        {/*<div className="rounded p-5 bg-background-2">*/}
                        {/*    <form onSubmit={handleAddTrainset} className="flex flex-col gap-2">*/}
                        {/*        <Label htmlFor="tambah-trainset">Tambah trainset baru</Label>*/}
                        {/*        <div className="flex gap-2">*/}
                        {/*            <Input*/}
                        {/*                id="tambah-trainset"*/}
                        {/*                type="number"*/}
                        {/*                className="w-fit"*/}
                        {/*                placeholder="Add Trainset"*/}
                        {/*                value={data.trainsetNeeded}*/}
                        {/*                onChange={e => setData('trainsetNeeded', +e.target.value)}*/}
                        {/*            />*/}
                        {/*            <Button type="submit" disabled={data.isLoading}>*/}
                        {/*                {data.isLoading ? (*/}
                        {/*                    <>*/}
                        {/*                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />*/}
                        {/*                        Adding Trainset*/}
                        {/*                    </>*/}
                        {/*                ) : (*/}
                        {/*                    'Add Trainset'*/}
                        {/*                )}*/}
                        {/*            </Button>*/}
                        {/*        </div>*/}
                        {/*    </form>*/}
                        {/*</div>*/}
                    </div>
                    <Suspense fallback={<StaticLoadingOverlay />}>
                        <Carriages trainset={trainset} handleSyncTrainset={handleSyncTrainset} />
                    </Suspense>

                    <Dialog>
                        <DialogTrigger
                            className={buttonVariants({
                                className: 'w-full',
                            })}
                        >
                            Tambah gerbong baru
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>{data.new_carriage_type}</DialogTitle>
                                <DialogDescription>
                                    <form onSubmit={handleAddCarriageTrainset} className="flex flex-col gap-2">
                                        <div className="flex flex-col gap-2">
                                            <Label>Tipe Gerbong</Label>
                                            <Input
                                                type="text"
                                                value={data.new_carriage_type}
                                                onChange={e => setData('new_carriage_type', e.target.value)}
                                                required
                                            />
                                        </div>
                                        <Label htmlFor="new-carriage-description">Deskripsi Gerbong</Label>
                                        <Textarea
                                            id="new-carriage-description"
                                            className="p-2 rounded"
                                            value={data.new_carriage_description}
                                            onChange={e => setData('new_carriage_description', e.target.value)}
                                        />
                                        <Label htmlFor="new-carriage-qty">Jumlah Gerbong</Label>
                                        <Input
                                            id="new-carriage-qty"
                                            type="number"
                                            min={1}
                                            value={data.new_carriage_qty}
                                            onChange={e => setData('new_carriage_qty', +e.target.value)}
                                            required
                                        />

                                        <Button type="submit" disabled={processing}>
                                            {processing ? (
                                                <>
                                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                    Proses
                                                </>
                                            ) : (
                                                'Tambahkan gerbong'
                                            )}
                                        </Button>
                                    </form>
                                </DialogDescription>
                            </DialogHeader>
                        </DialogContent>
                    </Dialog>
                </div>

                {!trainset.preset_trainset_id && trainset.carriages && trainset.carriages.length > 0 && (
                    <CustomPresetAlert message="You are using a custom preset. Do you want to save it?">
                        <Dialog>
                            <DialogTrigger
                                className={buttonVariants({
                                    className: 'w-full',
                                })}
                            >
                                Tambahkan Preset
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader className="gap-4">
                                    <DialogTitle>Preset baru</DialogTitle>
                                    <DialogDescription>
                                        <form onSubmit={handleSaveTrainsetPreset} className="flex flex-col gap-4">
                                            <div className="flex flex-col gap-4">
                                                <Label>Nama Preset</Label>
                                                <div className="flex gap-4">
                                                    <Input
                                                        type="text"
                                                        value={data.new_carriage_preset_name}
                                                        onChange={e =>
                                                            setData('new_carriage_preset_name', e.target.value)
                                                        }
                                                    />
                                                    <Button type="submit" disabled={processing} className="w-fit">
                                                        {processing ? (
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
                                    </DialogDescription>
                                </DialogHeader>
                            </DialogContent>
                        </Dialog>
                    </CustomPresetAlert>
                )}
            </AuthenticatedLayout>
        </>
    );
}
