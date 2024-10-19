import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/Components/UI/dialog';
import { Button, buttonVariants } from '@/Components/UI/button';
import { SelectGroup } from '@/Components/UI/select';
import { Label } from '@/Components/UI/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/Components/UI/popover';
import { ChevronsUpDown, Loader2 } from 'lucide-react';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/Components/UI/command';
import { Separator } from '@/Components/UI/separator';
import { Input } from '@/Components/UI/input';
import { Textarea } from '@/Components/UI/textarea';
import { FormEvent, memo, useEffect, useState } from 'react';
import { useForm } from '@inertiajs/react';
import { PaginateResponse } from '@/Support/Interfaces/Others';
import { CarriageResource, TrainsetResource } from '@/Support/Interfaces/Resources';
import { ServiceFilterOptions } from '@/Support/Interfaces/Others/ServiceFilterOptions';
import { useLoading } from '@/Contexts/LoadingContext';
import { withLoading } from '@/Utils/withLoading';
import { trainsetService } from '@/Services/trainsetService';
import { useSuccessToast } from '@/Hooks/useToast';
import { useLaravelReactI18n } from 'laravel-react-i18n';

const AddCarriage = ({
    trainset,
    carriageResponse,
    handleSyncCarriages,
    carriageFilters,
    setCarriageFilters,
    debouncedCarriageFilters,
    handleSyncTrainset,
}: {
    trainset: TrainsetResource;
    carriageResponse: PaginateResponse<CarriageResource>;
    handleSyncCarriages: () => void;
    carriageFilters: ServiceFilterOptions;
    setCarriageFilters: (e: ServiceFilterOptions) => void;
    debouncedCarriageFilters: ServiceFilterOptions;
    handleSyncTrainset: () => Promise<void>;
}) => {
    const { t } = useLaravelReactI18n();
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState('');

    const { data, setData } = useForm({
        new_carriage_id: 0,
        new_carriage_preset_name: '',
        new_carriage_type: 'Gerbong',
        new_carriage_description: '',
        new_carriage_qty: 1,
    });

    const { loading } = useLoading();

    const handleChangeSearchCarriageType = async (e: string) => {
        const search = e;
        setCarriageFilters({ ...carriageFilters, search });
        // await handleSyncCarriages();
    };

    const handleSearchCarriages = (carriageResponse: PaginateResponse<CarriageResource> | undefined) => {
        let carriage = carriageResponse?.data.find(carriage => `${carriage.type} : ${carriage.description}` === value);
        return `${carriage?.type} : ${carriage?.description}`;
    };

    const handleResetAddCarriageSelection = () => {
        setData('new_carriage_id', 0);
    };

    useEffect(() => {
        void handleSyncCarriages();
    }, [debouncedCarriageFilters]);

    const handleAddCarriageTrainset = withLoading(async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await trainsetService.addCarriageTrainset(
            trainset.id,
            data.new_carriage_id,
            data.new_carriage_type,
            data.new_carriage_description,
            data.new_carriage_qty,
        );
        void useSuccessToast(t('pages.project.trainset.carriage.partials.add_carriage.messages.carriage_added'));
        await handleSyncTrainset();
    });

    return (
        <Dialog>
            <DialogTrigger
                className={buttonVariants({
                    className: 'w-full',
                })}
            >
                {t('pages.project.trainset.carriage.partials.add_carriage.buttons.add_carriage')}
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{data.new_carriage_type}</DialogTitle>
                    <DialogDescription></DialogDescription>
                    <form onSubmit={handleAddCarriageTrainset} className="flex flex-col gap-4">
                        {/* TODO: Refactor using GenericDataSelector */}
                        <SelectGroup className="space-y-2">
                            <div className="flex flex-col bg-background-2 gap-4 p-4">
                                <Label htmlFor="carriage">
                                    {t('pages.project.trainset.carriage.partials.add_carriage.dialogs.fields.carriage')}
                                </Label>
                                {/* <Input
                                                placeholder="Cari gerbong"
                                                value={carriageFilters.search}
                                                onChange={handleChangeSearchCarriageType}
                                                disabled={loading}
                                            /> */}
                                <div className="flex gap-4">
                                    {/* <Select
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
                                                                {carriage.type}{' '}
                                                                {carriage.description && `: ${carriage.description}`}
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
                                                </Button> */}
                                    <Popover open={open} onOpenChange={setOpen}>
                                        <PopoverTrigger asChild>
                                            <Button
                                                variant="outline"
                                                role="combobox"
                                                aria-expanded={open}
                                                className="w-full justify-between"
                                            >
                                                {value
                                                    ? handleSearchCarriages(carriageResponse)
                                                    : t(
                                                          'pages.project.trainset.carriage.partials.add_carriage.dialogs.fields.carriage',
                                                      )}
                                                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-full p-0">
                                            <Command>
                                                <CommandInput
                                                    onValueChange={e => handleChangeSearchCarriageType(e)}
                                                    placeholder={t(
                                                        'pages.project.trainset.carriage.partials.add_carriage.dialogs.fields.carriage_search',
                                                    )}
                                                />
                                                <CommandList>
                                                    <CommandEmpty>No Result Found</CommandEmpty>
                                                    <CommandGroup>
                                                        {carriageResponse?.data.map(carriage => (
                                                            <CommandItem
                                                                key={carriage.type}
                                                                value={`${carriage.type} : ${carriage.description}`}
                                                                onSelect={currentValue => {
                                                                    setData('new_carriage_id', +carriage.id);
                                                                    // alert(currentValue);
                                                                    setValue(
                                                                        currentValue === value ? '' : currentValue,
                                                                    );
                                                                    setOpen(false);
                                                                }}
                                                            >
                                                                {carriage.type} : {carriage.description}
                                                                <br />
                                                                {/* {carriage.carriage_panels?.map((c, i) => (
                                                                    <span key={c.id}>
                                                                        <br />
                                                                        {c.panel.name}
                                                                    </span>
                                                                ))} */}
                                                                {/* <Check
                                                                    className={cn(
                                                                        'mr-2 h-4 w-4',
                                                                        value === carriage.type
                                                                            ? 'opacity-100'
                                                                            : 'opacity-0',
                                                                    )}
                                                                /> */}
                                                                {/* {carriage.type} */}
                                                            </CommandItem>
                                                        ))}
                                                    </CommandGroup>
                                                </CommandList>
                                            </Command>
                                        </PopoverContent>
                                    </Popover>
                                </div>
                            </div>
                        </SelectGroup>

                        <div className="flex gap-4 items-center">
                            <div className=" flex-1">
                                <Separator />
                            </div>
                            {t('pages.project.trainset.carriage.partials.add_carriage.dialogs.fields.or')}
                            <div className=" flex-1">
                                <Separator />
                            </div>
                        </div>
                        <div className="flex flex-col gap-4 bg-background-2 p-4">
                            <Label>
                                {t(
                                    'pages.project.trainset.carriage.partials.add_carriage.dialogs.fields.new_carriage_type',
                                )}
                            </Label>
                            <Input
                                type="text"
                                value={data.new_carriage_type}
                                onChange={e => setData('new_carriage_type', e.target.value)}
                                disabled={data.new_carriage_id !== 0}
                                required
                            />
                            <Label htmlFor="new-carriage-description">
                                {t(
                                    'pages.project.trainset.carriage.partials.add_carriage.dialogs.fields.new_carriage_description',
                                )}
                            </Label>
                            <Textarea
                                id="new-carriage-description"
                                className="p-2 rounded"
                                value={data.new_carriage_description}
                                onChange={e => setData('new_carriage_description', e.target.value)}
                                disabled={data.new_carriage_id !== 0}
                            />
                            <Label htmlFor="new-carriage-qty">
                                {t(
                                    'pages.project.trainset.carriage.partials.add_carriage.dialogs.fields.new_carriage_qty',
                                )}
                            </Label>
                            <Input
                                id="new-carriage-qty"
                                type="number"
                                min={1}
                                value={data.new_carriage_qty}
                                onChange={e => setData('new_carriage_qty', +e.target.value)}
                                required
                            />
                        </div>

                        <Button type="submit" disabled={loading}>
                            {loading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    {t(
                                        'pages.project.trainset.carriage.partials.add_carriage.dialogs.actions.adding_carriage',
                                    )}
                                </>
                            ) : (
                                t('pages.project.trainset.carriage.partials.add_carriage.dialogs.buttons.add_carriage')
                            )}
                        </Button>
                    </form>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
};

export default memo(AddCarriage);
