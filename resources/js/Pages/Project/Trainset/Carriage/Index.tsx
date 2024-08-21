import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { lazy, memo, Suspense, useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import StaticLoadingOverlay from '@/Components/StaticLoadingOverlay';
import { PresetTrainsetResource, TrainsetResource } from '@/support/interfaces/resources';
import { Button } from '@/Components/ui/button';
import { Label } from '@/Components/ui/label';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/Components/ui/select';
import { trainsetService } from '@/services/trainsetService';
import { Loader2 } from 'lucide-react';

const Carriages = memo(lazy(() => import('./Partials/Carriages')));

export default function ({
    trainset: initialTrainset,
    presetTrainset,
}: {
    trainset: TrainsetResource;
    presetTrainset: PresetTrainsetResource[];
}) {
    const [trainset, setTrainset] = useState<TrainsetResource>(initialTrainset);
    const { data, setData, post, processing, errors, reset } = useForm({
        isLoading: false,
        preset_trainset_id: trainset.preset_trainset_id ?? 0,
    });

    const handleChangePreset = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            setData('isLoading', true);
            await trainsetService.changePreset(trainset.id, data.preset_trainset_id);
        } catch (error) {
        } finally {
            await handleSyncTrainset();
            reset('isLoading');
        }
    };

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
                                                defaultValue={trainset.preset_trainset_id.toString()}
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

                    <Button className="w-full">Tambah gerbong baru</Button>
                </div>
            </AuthenticatedLayout>
        </>
    );
}
