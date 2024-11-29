import GenericDataSelector from '@/Components/GenericDataSelector';
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
import { Separator } from '@/Components/UI/separator';
import { Textarea } from '@/Components/UI/textarea';
import { useLoading } from '@/Contexts/LoadingContext';
import { useSuccessToast } from '@/Hooks/useToast';
import { carriageService } from '@/Services/carriageService';
import { trainsetService } from '@/Services/trainsetService';
import { ServiceFilterOptions } from '@/Support/Interfaces/Others/ServiceFilterOptions';
import { CarriageResource, TrainsetResource } from '@/Support/Interfaces/Resources';
import { withLoading } from '@/Utils/withLoading';
import { useForm } from '@inertiajs/react';
import { useLaravelReactI18n } from 'laravel-react-i18n';
import { Loader2 } from 'lucide-react';
import { FormEvent, memo, useCallback, useEffect } from 'react';

const AddCarriage = ({
    trainset,
    handleSyncCarriages,
    debouncedCarriageFilters,
    handleSyncTrainset,
}: {
    trainset: TrainsetResource;
    handleSyncCarriages: () => void;
    debouncedCarriageFilters: ServiceFilterOptions;
    handleSyncTrainset: () => Promise<void>;
}) => {
    const { t } = useLaravelReactI18n();

    const { data, setData } = useForm({
        new_carriage_id: null as number | null,
        new_carriage_preset_name: '',
        new_carriage_type: 'Gerbong',
        new_carriage_description: '',
        new_carriage_qty: 1,
    });

    const { loading } = useLoading();

    const fetchCarriages = useCallback(async (filters: ServiceFilterOptions) => {
        return await carriageService.getAll(filters).then((response) => response.data);
    }, []);

    useEffect(() => {
        void handleSyncCarriages();
    }, [debouncedCarriageFilters]);

    const handleAddCarriageTrainset = withLoading(async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await trainsetService.addCarriageTrainset(
            trainset.id,
            data.new_carriage_id!,
            data.new_carriage_type,
            data.new_carriage_description,
            data.new_carriage_qty,
        );
        void useSuccessToast(
            t(
                'pages.project.trainset.carriage_trainset.partials.add_carriage.messages.carriage_added',
            ),
        );
        await handleSyncTrainset();
    });

    return (
        <Dialog>
            <DialogTrigger
                className={buttonVariants({
                    className: 'w-full',
                })}
            >
                {t(
                    'pages.project.trainset.carriage_trainset.partials.add_carriage.buttons.add_carriage',
                )}
            </DialogTrigger>
            <DialogContent className='sm:max-w-[425px]'>
                <DialogHeader>
                    <DialogTitle>{data.new_carriage_type}</DialogTitle>
                    <DialogDescription></DialogDescription>
                    <form onSubmit={handleAddCarriageTrainset} className='flex flex-col gap-4'>
                        <div className='flex flex-col gap-4 bg-background-2 p-4'>
                            <Label htmlFor='carriage'>
                                {t(
                                    'pages.project.trainset.carriage_trainset.partials.add_carriage.dialogs.fields.carriage',
                                )}
                            </Label>
                            <GenericDataSelector
                                setSelectedData={(id) => setData('new_carriage_id', id)}
                                selectedDataId={data.new_carriage_id ?? undefined}
                                renderItem={(item: CarriageResource) =>
                                    `${item.type} : ${item.description}`
                                }
                                placeholder={t(
                                    'pages.project.trainset.carriage_trainset.partials.add_carriage.dialogs.fields.carriage_placeholder',
                                )}
                                nullable
                                id='new_carriage_id'
                                fetchData={fetchCarriages}
                                customLabel={(item: CarriageResource) =>
                                    `${item.type} : ${item.description}`
                                }
                            />
                        </div>

                        <div className='flex items-center gap-4'>
                            <div className='flex-1'>
                                <Separator />
                            </div>
                            {t(
                                'pages.project.trainset.carriage_trainset.partials.add_carriage.dialogs.fields.or',
                            )}
                            <div className='flex-1'>
                                <Separator />
                            </div>
                        </div>
                        <div className='flex flex-col gap-4 bg-background-2 p-4'>
                            <Label>
                                {t(
                                    'pages.project.trainset.carriage_trainset.partials.add_carriage.dialogs.fields.new_carriage_type',
                                )}
                            </Label>
                            <Input
                                value={data.new_carriage_type}
                                type='text'
                                required
                                onChange={(e) => setData('new_carriage_type', e.target.value)}
                                disabled={data.new_carriage_id !== null}
                            />
                            <Label htmlFor='new-carriage-description'>
                                {t(
                                    'pages.project.trainset.carriage_trainset.partials.add_carriage.dialogs.fields.new_carriage_description',
                                )}
                            </Label>
                            <Textarea
                                value={data.new_carriage_description}
                                onChange={(e) =>
                                    setData('new_carriage_description', e.target.value)
                                }
                                id='new-carriage-description'
                                disabled={data.new_carriage_id !== null}
                                className='rounded p-2'
                            />
                            <Label htmlFor='new-carriage-qty'>
                                {t(
                                    'pages.project.trainset.carriage_trainset.partials.add_carriage.dialogs.fields.new_carriage_qty',
                                )}
                            </Label>
                            <Input
                                value={data.new_carriage_qty}
                                type='number'
                                required
                                onChange={(e) => setData('new_carriage_qty', +e.target.value)}
                                min={1}
                                id='new-carriage-qty'
                            />
                        </div>

                        <Button type='submit' disabled={loading}>
                            {loading ? (
                                <>
                                    <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                                    {t(
                                        'pages.project.trainset.carriage_trainset.partials.add_carriage.dialogs.actions.adding_carriage',
                                    )}
                                </>
                            ) : (
                                t(
                                    'pages.project.trainset.carriage_trainset.partials.add_carriage.dialogs.buttons.add_carriage',
                                )
                            )}
                        </Button>
                    </form>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
};

export default memo(AddCarriage);
