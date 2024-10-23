import { CarriageTrainsetResource, PanelResource, ProgressResource } from '@/Support/Interfaces/Resources';
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
import { Popover, PopoverContent, PopoverTrigger } from '@/Components/UI/popover';
import { Check, ChevronsUpDown, Loader2, RefreshCcw } from 'lucide-react';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/Components/UI/command';
import { STYLING } from '@/Support/Constants/styling';
import { Input } from '@/Components/UI/input';
import { Textarea } from '@/Components/UI/textarea';
import { ChangeEvent, FormEvent, memo, useEffect, useState } from 'react';
import { PaginateResponse } from '@/Support/Interfaces/Others';
import { cn } from '@/Lib/utils';
import { withLoading } from '@/Utils/withLoading';
import { panelService } from '@/Services/panelService';
import { carriageTrainsetService } from '@/Services/carriageTrainsetService';
import { useSuccessToast } from '@/Hooks/useToast';
import { useLoading } from '@/Contexts/LoadingContext';
import { useForm } from '@inertiajs/react';
import { useDebounce } from '@uidotdev/usehooks';
import { ServiceFilterOptions } from '@/Support/Interfaces/Others/ServiceFilterOptions';
import { progressService } from '@/Services/progressService';
import { Separator } from '@/Components/UI/separator';

const AddNewPanel = ({
    panelResponse,
    setPanelResponse,
    carriageTrainset,
    handleSyncCarriage,
}: {
    panelResponse: PaginateResponse<PanelResource>;
    setPanelResponse: (panelResponse: PaginateResponse<PanelResource>) => void;
    carriageTrainset: CarriageTrainsetResource;
    handleSyncCarriage: () => Promise<void>;
}) => {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState('');
    const [openPanel, setOpenPanel] = useState(false);
    const [valuePanel, setValuePanel] = useState('');
    const [progressResponse, setProgressResponse] = useState<PaginateResponse<ProgressResource>>();
    const { loading } = useLoading();

    const { data, setData, reset } = useForm({
        search_progress: '',
        search_panel: '',
        trainsetNeeded: 0,
        new_panel_id: 0,
        progress_id: 0,
        new_panel_name: '',
        new_panel_description: '',
        new_panel_qty: 1,
    });
    const debouncedSearchProgress = useDebounce(data.search_progress, 300);
    const debouncedSearchPanel = useDebounce(data.search_panel, 300);

    const handleSyncPanels = withLoading(async () => {
        const filters: ServiceFilterOptions = { search: debouncedSearchPanel };
        const res = await panelService.getAll(filters);
        setPanelResponse(res);
    });

    useEffect(() => {
        void handleSyncPanels();
    }, [debouncedSearchPanel]);

    const handleChangeSearchPanelName = async (e: string) => {
        // setData('search_panel', e.target.value);
        setData('search_panel', e);
    };

    const handleChangeSearchProgressName = async (e: string) => {
        setData('search_progress', e);
    };

    const handleResetAddCarriageSelection = () => {
        setData('new_panel_id', 0);
    };

    const handleResetProgressSearch = () => {
        setData('search_progress', '');
        // setProgressFilters({ ...progressFilters, search: '' });
    };

    const handleChangeNewPanelName = (e: ChangeEvent<HTMLInputElement>) => {
        setData('new_panel_name', e.target.value);
    };

    const handleChangeNewPanelDescription = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setData('new_panel_description', e.target.value);
    };

    const handleChangeNewPanelQty = (e: ChangeEvent<HTMLInputElement>) => {
        setData('new_panel_qty', +e.target.value);
    };

    const handleSyncProgress = withLoading(async () => {
        const filters: ServiceFilterOptions = { search: debouncedSearchProgress };
        const res = await progressService.getAll(filters);
        setProgressResponse(res);
    });

    const handleAddPanelCarriage = withLoading(async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await carriageTrainsetService.addPanel(
            carriageTrainset.id,
            data.progress_id,
            data.new_panel_id,
            data.new_panel_name,
            data.new_panel_description,
            data.new_panel_qty,
        );
        handleResetAddCarriageSelection();
        handleResetProgressSearch();
        await handleSyncCarriage();
        reset();
        void useSuccessToast('Panel berhasil ditambahkan');
    });

    const handleChangePanel = withLoading(async (v: string) => {
        const res = await panelService.get(+v);
        setData(prevData => ({
            ...prevData,
            new_panel_id: +v,
            search_progress: res.progress?.name || '',
            progress_id: res.progress_id || 0,
        }));
        setValue(res.progress?.name || ''); // Update the progress selection
    });

    useEffect(() => {
        void handleSyncProgress();
    }, [debouncedSearchProgress]);

    return (
        <Dialog>
            <DialogTrigger
                className={buttonVariants({
                    className: 'w-full',
                })}
            >
                Tambah panel baru
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{data.new_panel_name}</DialogTitle>
                    <DialogDescription></DialogDescription>
                    <form onSubmit={handleAddPanelCarriage} className="flex flex-col gap-4">
                        <div className="flex flex-col bg-background-2 gap-4 p-4">
                            <Label htmlFor="progress">Progress</Label>
                            <div className="flex gap-2">
                                <Popover open={open} onOpenChange={setOpen}>
                                    <PopoverTrigger asChild id="progress">
                                        <Button
                                            variant="outline"
                                            role="combobox"
                                            aria-expanded={open}
                                            className="w-full justify-between"
                                        >
                                            {value
                                                ? progressResponse?.data.find(progress => progress.name === value)?.name
                                                : 'Pilih progress...'}
                                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-full p-0">
                                        <Command>
                                            <CommandInput
                                                onValueChange={e => handleChangeSearchProgressName(e)}
                                                placeholder="Cari Progress..."
                                            />
                                            <CommandList>
                                                <CommandEmpty>Progress tidak ditemukan.</CommandEmpty>
                                                <CommandGroup>
                                                    {progressResponse?.data.map(progress => (
                                                        <CommandItem
                                                            key={progress.name}
                                                            value={progress.name}
                                                            onSelect={currentValue => {
                                                                setData('progress_id', +progress.id);
                                                                setValue(currentValue === value ? '' : currentValue);
                                                                setOpen(false);
                                                            }}
                                                        >
                                                            <Check
                                                                className={cn(
                                                                    'mr-2 h-4 w-4',
                                                                    value === progress.name
                                                                        ? 'opacity-100'
                                                                        : 'opacity-0',
                                                                )}
                                                            />
                                                            {progress.name}
                                                        </CommandItem>
                                                    ))}
                                                </CommandGroup>
                                            </CommandList>
                                        </Command>
                                    </PopoverContent>
                                </Popover>
                                <Button type="button" variant="ghost" onClick={handleResetProgressSearch}>
                                    <RefreshCcw size={STYLING.ICON.SIZE.SMALL} />
                                </Button>
                            </div>

                            <Label htmlFor="panel">Panel </Label>
                            <Popover open={openPanel} onOpenChange={setOpenPanel}>
                                <PopoverTrigger asChild id="panel">
                                    <Button
                                        variant="outline"
                                        role="combobox"
                                        aria-expanded={openPanel}
                                        className="w-full justify-between"
                                    >
                                        {valuePanel
                                            ? panelResponse?.data.find(panel => panel.name === valuePanel)?.name
                                            : 'Pilih panel...'}
                                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-full p-0">
                                    <Command>
                                        <CommandInput
                                            onValueChange={handleChangeSearchPanelName}
                                            placeholder="Cari Progress..."
                                        />
                                        <CommandList>
                                            <CommandEmpty>Progress tidak ditemukan.</CommandEmpty>
                                            <CommandGroup>
                                                {panelResponse?.data.map(panel => (
                                                    <CommandItem
                                                        key={panel.name}
                                                        value={panel.name}
                                                        onSelect={currentValue => {
                                                            void handleChangePanel(panel.id.toString());
                                                            setValuePanel(
                                                                currentValue === valuePanel ? '' : currentValue,
                                                            );
                                                            setOpenPanel(false);
                                                        }}
                                                    >
                                                        <Check
                                                            className={cn(
                                                                'mr-2 h-4 w-4',
                                                                value === panel.name ? 'opacity-100' : 'opacity-0',
                                                            )}
                                                        />
                                                        {panel.name}
                                                    </CommandItem>
                                                ))}
                                            </CommandGroup>
                                        </CommandList>
                                    </Command>
                                </PopoverContent>
                            </Popover>
                        </div>

                        <Separator />

                        <div className="flex flex-col gap-4 bg-background-2 p-4">
                            <div className="flex flex-col gap-2">
                                <Label>Panel</Label>
                                <Input
                                    type="text"
                                    value={data.new_panel_name}
                                    onChange={handleChangeNewPanelName}
                                    disabled={data.new_panel_id !== 0}
                                    required
                                />
                            </div>
                            <Label htmlFor="new-panel-description">Deskripsi Panel</Label>
                            <Textarea
                                id="new-panel-description"
                                className="p-2 rounded"
                                value={data.new_panel_description}
                                onChange={handleChangeNewPanelDescription}
                                disabled={data.new_panel_id !== 0}
                            />
                            <Label htmlFor="new-panel-qty">Jumlah Panel</Label>
                            <Input
                                id="new-panel-qty"
                                type="number"
                                min={1}
                                value={data.new_panel_qty}
                                onChange={handleChangeNewPanelQty}
                                required
                            />
                        </div>

                        <Button type="submit" disabled={loading}>
                            {loading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Proses
                                </>
                            ) : (
                                'Tambahkan panel'
                            )}
                        </Button>
                    </form>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
};

export default memo(AddNewPanel);
