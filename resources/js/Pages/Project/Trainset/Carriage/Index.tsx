import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { lazy, memo, Suspense, useEffect, useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import StaticLoadingOverlay from '@/Components/StaticLoadingOverlay';
import { CarriageResource, PresetTrainsetResource, TrainsetResource } from '@/support/interfaces/resources';
import { Button, buttonVariants } from '@/Components/ui/button';
import { Label } from '@/Components/ui/label';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/Components/ui/select';
import { trainsetService } from '@/services/trainsetService';
import { Loader2, RefreshCcw } from 'lucide-react';
import { Input } from '@/Components/ui/input';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/Components/ui/dialog';
import { useConfirmation } from '@/hooks/useConfirmation';
import CustomPresetAlert from '@/Pages/Project/Trainset/Partials/CustomPresetAlert';
import { projectService } from '@/services/projectService';
import { presetTrainsetService } from '@/services/presetTrainsetService';
import { PaginateResponse } from '@/support/interfaces/others';
import { ServiceFilterOptions } from '@/support/interfaces/others/ServiceFilterOptions';
import { carriageService } from '@/services/carriageService';
import { useDebounce } from '@uidotdev/usehooks';
import { STYLING } from '@/support/constants/styling';
import { Separator } from '@/Components/ui/separator';
import { Textarea } from '@/Components/ui/textarea';

const Carriages = memo(lazy(() => import('./Partials/Carriages')));

export default function ({
    trainset: initialTrainset,
    presetTrainsets: initialPresetTrainset,
}: {
    trainset: TrainsetResource;
    presetTrainsets: PresetTrainsetResource[];
}) {
    const [trainset, setTrainset] = useState<TrainsetResource>(initialTrainset);
    const [carriageResponse, setCarriageResponse] = useState<PaginateResponse<CarriageResource>>();
    const [carriageFilters, setCarriageFilters] = useState<ServiceFilterOptions>({
        page: 1,
        perPage: 10,
        relations: 'carriage_panels.panel',
        type: '',
    });
    const [isLoading, setIsLoading] = useState(false);
    const [presetTrainset, setPresetTrainset] = useState<PresetTrainsetResource[]>(initialPresetTrainset);
    const { data, setData } = useForm({
        preset_trainset_id: trainset.preset_trainset_id ?? 0,
        new_carriage_id: 0,
        new_carriage_preset_name: '',
        new_carriage_type: 'Gerbong',
        new_carriage_description: '',
        new_carriage_qty: 1,
    });
    const debouncedCarriageFilters = useDebounce(carriageFilters, 300);
    const selectedPreset = presetTrainset.find(preset => preset.id === data.preset_trainset_id);

    const handleChangePreset = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await useConfirmation().then(async result => {
                if (result.isConfirmed) {
                    setIsLoading(true);
                    await trainsetService.changePreset(trainset.id, data.preset_trainset_id);
                    await handleSyncTrainset();
                }
            });
        } catch (error) {
        } finally {
            // reset('isLoading');
        }
    };

    const handleSaveTrainsetPreset = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            await trainsetService.savePreset(trainset.id, trainset.project_id, data.new_carriage_preset_name);
        } catch (error) {
        } finally {
            await handleSyncTrainset();
        }
    };

    const handleSyncTrainset = async () => {
        setIsLoading(true);
        const response = await projectService.getTrainsetCarriages(trainset.project_id, trainset.id);
        setTrainset(response.data.trainset);
        setPresetTrainset(response.data.presetTrainsets);
        data.preset_trainset_id = response.data.trainset.preset_trainset_id;
        setIsLoading(false);
    };

    const handleAddCarriageTrainset = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            await trainsetService.addCarriageTrainset(
                trainset.id,
                data.new_carriage_id,
                data.new_carriage_type,
                data.new_carriage_description,
                data.new_carriage_qty,
            );
        } catch (error) {
        } finally {
            await handleSyncTrainset();
        }
    };

    const handleDeletePresetTrainset = async () => {
        setIsLoading(true);
        try {
            await useConfirmation().then(async result => {
                if (result.isConfirmed) {
                    await presetTrainsetService.delete(data.preset_trainset_id);
                }
            });
        } catch (error) {
        } finally {
            await handleSyncTrainset();
        }
    };

    const handleResetAddCarriageSelection = () => {
        setData('new_carriage_id', 0);
    };

    const handleChangeSearchCarriageType = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const type = e.target.value;
        setCarriageFilters({ ...carriageFilters, type });
        // await handleSyncCarriages();
    };

    const handleSyncCarriages = async () => {
        carriageService.getAll(debouncedCarriageFilters).then(res => {
            setCarriageResponse(res);
        });
    };

    useEffect(() => {
        handleSyncCarriages();
    }, [debouncedCarriageFilters]);

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
                                                    <SelectItem value="0" disabled>
                                                        Select Preset
                                                    </SelectItem>
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
                                                    isLoading ||
                                                    !data.preset_trainset_id ||
                                                    data.preset_trainset_id === trainset.preset_trainset_id
                                                }
                                            >
                                                {isLoading ? (
                                                    <>
                                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                        Loading
                                                    </>
                                                ) : (
                                                    'Ubah Preset'
                                                )}
                                            </Button>

                                            <Button
                                                type="button"
                                                variant="destructive"
                                                disabled={
                                                    isLoading ||
                                                    !data.preset_trainset_id ||
                                                    (selectedPreset && selectedPreset.has_trainsets)
                                                }
                                                onClick={handleDeletePresetTrainset}
                                            >
                                                {isLoading ? (
                                                    <>
                                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                        Loading
                                                    </>
                                                ) : (
                                                    'Hapus Preset'
                                                )}
                                            </Button>
                                        </div>
                                    </SelectGroup>
                                </form>
                            </div>
                        </div>
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
                                <DialogDescription></DialogDescription>
                                <form onSubmit={handleAddCarriageTrainset} className="flex flex-col gap-4">
                                    <SelectGroup className="space-y-2">
                                        <div className="flex flex-col bg-background-2 gap-4 p-4">
                                            <Label htmlFor="carriage">Pilih gerbong yang sudah ada</Label>
                                            <Input
                                                placeholder="Cari gerbong"
                                                value={carriageFilters.type}
                                                onChange={handleChangeSearchCarriageType}
                                                disabled={isLoading}
                                            />
                                            <div className="flex gap-4">
                                                <Select
                                                    key={data.new_carriage_id} // Force re-render when new_carriage_id changes
                                                    onValueChange={v => setData('new_carriage_id', +v)}
                                                    value={data.new_carriage_id?.toString()}
                                                >
                                                    <SelectTrigger id="carriage">
                                                        <SelectValue placeholder="Carriage" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="0" defaultChecked disabled>
                                                            Pilih gerbong
                                                        </SelectItem>
                                                        {carriageResponse?.data.map(carriage => (
                                                            <SelectItem
                                                                key={carriage.id}
                                                                value={carriage.id.toString()}
                                                            >
                                                                {carriage.type}:
                                                                <br />
                                                                {carriage.carriage_panels?.map((c, i) => (
                                                                    <span key={c.id}>
                                                                        <br />
                                                                        {c.panel.name}
                                                                    </span>
                                                                ))}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                                <Button
                                                    type="button"
                                                    variant="ghost"
                                                    onClick={handleResetAddCarriageSelection}
                                                >
                                                    <RefreshCcw size={STYLING.ICON.SIZE.SMALL} />
                                                </Button>
                                            </div>
                                        </div>
                                    </SelectGroup>
                                    <div className="flex gap-4 items-center">
                                        <div className=" flex-1">
                                            <Separator />
                                        </div>
                                        Atau
                                        <div className=" flex-1">
                                            <Separator />
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-4 bg-background-2 p-4">
                                        <div className="flex flex-col gap-2">
                                            <Label>Tipe Gerbong</Label>
                                            <Input
                                                type="text"
                                                value={data.new_carriage_type}
                                                onChange={e => setData('new_carriage_type', e.target.value)}
                                                disabled={data.new_carriage_id !== 0}
                                                required
                                            />
                                        </div>
                                        <Label htmlFor="new-carriage-description">Deskripsi Gerbong</Label>
                                        <Textarea
                                            id="new-carriage-description"
                                            className="p-2 rounded"
                                            value={data.new_carriage_description}
                                            onChange={e => setData('new_carriage_description', e.target.value)}
                                            disabled={data.new_carriage_id !== 0}
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
                                    </div>

                                    <Button type="submit" disabled={isLoading}>
                                        {isLoading ? (
                                            <>
                                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                Proses
                                            </>
                                        ) : (
                                            'Tambahkan gerbong'
                                        )}
                                    </Button>
                                </form>
                            </DialogHeader>
                        </DialogContent>
                    </Dialog>
                </div>

                {!trainset.preset_trainset_id && trainset.carriages && trainset.carriages.length > 0 && (
                    <CustomPresetAlert message="Anda menggunakan preset khusus. Apakah Anda ingin menyimpannya?">
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
                                                <Button type="submit" disabled={isLoading} className="w-fit">
                                                    {isLoading ? (
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
                    </CustomPresetAlert>
                )}
            </AuthenticatedLayout>
        </>
    );
}