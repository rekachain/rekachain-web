import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { lazy, memo, Suspense, useEffect, useState } from 'react';
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

const Carriages = memo(lazy(() => import('./Partials/Carriages')));

export default function ({
    trainset: initialTrainset,
    presetTrainset,
}: {
    trainset: TrainsetResource;
    presetTrainset: PresetTrainsetResource[];
}) {
    const [trainset, setTrainset] = useState<TrainsetResource>(initialTrainset);
    const [showAlert, setShowAlert] = useState(false);
    const { data, setData, post, processing, errors, reset } = useForm({
        isLoading: false,
        preset_trainset_id: trainset.preset_trainset_id ?? 0,
        new_carriage_preset_name: '',
        new_carriage_type: 'Gerbong',
        new_carriage_description: '',
    });

    const handleChangePreset = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            useConfirmation().then(async result => {
                if (!result) return;

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
            reset('isLoading');
        }
    };

    const handleSaveTrainsetPreset = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await trainsetService.savePreset(trainset.id, trainset.project_id, data.new_carriage_preset_name);
        } catch (error) {
        } finally {
            await handleSyncTrainset();
            reset();
        }
    };

    useEffect(() => {
        console.log(trainset);
        if (errors.preset_trainset_id) {
            setShowAlert(true);
        }
    }, []);

    const handleSyncTrainset = async () => {
        const updatedTrainset = await trainsetService.get(initialTrainset.id);
        setTrainset(updatedTrainset);
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
                                                onValueChange={v => setData('preset_trainset_id', +v)}
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
                        <Carriages trainset={trainset} />
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
                                    <form
                                        onSubmit={async e => {
                                            e.preventDefault();
                                            try {
                                                await post(route('carriages.store', trainset.id));
                                                await handleSyncTrainset();
                                            } catch (error) {}
                                        }}
                                        className="flex flex-col gap-2"
                                    >
                                        <div className="flex flex-col gap-2">
                                            <Label>Tipe Gerbong</Label>
                                            <Input
                                                type="text"
                                                value={data.new_carriage_type}
                                                onChange={e => setData('new_carriage_type', e.target.value)}
                                            />
                                        </div>
                                        <Label htmlFor="new-carriage-description">Deskripsi Gerbong</Label>
                                        <Textarea
                                            id="new-carriage-description"
                                            className="p-2 rounded"
                                            value={data.new_carriage_description}
                                            onChange={e => setData('new_carriage_description', e.target.value)}
                                        />

                                        <Button type="submit" disabled={processing}>
                                            {processing ? (
                                                <>
                                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                    Menambahkan gerbong
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

                    {/*{data.isCreatingNewCarriage && (*/}
                    {/*    <Accordion type="single" collapsible>*/}
                    {/*        <AccordionItem value="item-1">*/}
                    {/*            <AccordionTrigger>{data.new_carriage_type}</AccordionTrigger>*/}
                    {/*            <AccordionContent>*/}
                    {/*                <form*/}
                    {/*                    onSubmit={async e => {*/}
                    {/*                        e.preventDefault();*/}
                    {/*                        try {*/}
                    {/*                            await post(route('carriages.store', trainset.id));*/}
                    {/*                            await handleSyncTrainset();*/}
                    {/*                            reset('isCreatingNewCarriage');*/}
                    {/*                        } catch (error) {}*/}
                    {/*                    }}*/}
                    {/*                    className="flex flex-col gap-2"*/}
                    {/*                >*/}
                    {/*                    <div className="flex flex-col gap-2">*/}
                    {/*                        <Label>Tipe Gerbong</Label>*/}
                    {/*                        <Input*/}
                    {/*                            type="text"*/}
                    {/*                            value={data.new_carriage_type}*/}
                    {/*                            onChange={e => setData('new_carriage_type', e.target.value)}*/}
                    {/*                        />*/}
                    {/*                    </div>*/}
                    {/*                    <Label htmlFor="new-carriage-description">Deskripsi Gerbong</Label>*/}
                    {/*                    <textarea*/}
                    {/*                        id="new-carriage-description"*/}
                    {/*                        className="p-2 rounded"*/}
                    {/*                        value={data.new_carriage_description}*/}
                    {/*                        onChange={e => setData('new_carriage_description', e.target.value)}*/}
                    {/*                    />*/}

                    {/*                    <Button type="submit" disabled={processing}>*/}
                    {/*                        {processing ? (*/}
                    {/*                            <>*/}
                    {/*                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />*/}
                    {/*                                Menambahkan gerbong*/}
                    {/*                            </>*/}
                    {/*                        ) : (*/}
                    {/*                            'Tambahkan gerbong'*/}
                    {/*                        )}*/}
                    {/*                    </Button>*/}
                    {/*                </form>*/}
                    {/*            </AccordionContent>*/}
                    {/*        </AccordionItem>*/}
                    {/*    </Accordion>*/}
                    {/*)}*/}

                    {/*{!data.isCreatingNewCarriage && (*/}
                    {/*    <Button className="w-full" onClick={handleCreatingNewCarriage}>*/}
                    {/*        Tambah gerbong baru*/}
                    {/*    </Button>*/}
                    {/*)}*/}
                </div>

                {!data.preset_trainset_id && trainset.carriages && trainset.carriages.length > 0 && (
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
