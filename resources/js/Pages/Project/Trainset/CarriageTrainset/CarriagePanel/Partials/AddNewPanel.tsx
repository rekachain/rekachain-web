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
import { carriageTrainsetService } from '@/Services/carriageTrainsetService';
import { panelService } from '@/Services/panelService';
import { progressService } from '@/Services/progressService';
import { STYLING } from '@/Support/Constants/styling';
import { PaginateResponse } from '@/Support/Interfaces/Others';
import { ServiceFilterOptions } from '@/Support/Interfaces/Others/ServiceFilterOptions';
import {
    CarriageTrainsetResource,
    PanelResource,
    ProgressResource,
} from '@/Support/Interfaces/Resources';
import { withLoading } from '@/Utils/withLoading';
import { useForm } from '@inertiajs/react';
import { useDebounce } from '@uidotdev/usehooks';
import { useLaravelReactI18n } from 'laravel-react-i18n';
import { Loader2, RefreshCcw } from 'lucide-react';
import { ChangeEvent, FormEvent, memo, useCallback, useEffect, useState } from 'react';

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
    const [value, setValue] = useState('');
    const [progressResponse, setProgressResponse] = useState<PaginateResponse<ProgressResource>>();
    const { t } = useLaravelReactI18n();
    const { loading } = useLoading();

    const { data, setData, reset } = useForm({
        search_progress: '',
        search_panel: '',
        trainsetNeeded: 0,
        new_panel_id: null as number | null,
        progress_id: null as number | null,
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

    const fetchPanels = useCallback(async (filters: ServiceFilterOptions) => {
        const res = await panelService.getAll(filters);
        return res.data;
    }, []);

    const handleChangeSearchProgressName = async (e: string) => {
        setData('search_progress', e);
    };

    const handleResetAddCarriageSelection = () => {
        setData('new_panel_id', 0);
    };

    const handleResetProgressSearch = () => {
        setData('search_progress', '');
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

        if (!data.progress_id) return;

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
        void useSuccessToast(
            t(
                'pages.project.trainset.carriage_trainset.carriage_panel.partials.add_new_panel.messages.panel_added',
            ),
        );
    });

    const fetchPanelProgress = withLoading(async (panelId: number) => {
        const res = await panelService.get(panelId);
        setData((prevData) => ({
            ...prevData,
            new_panel_id: panelId,
            search_progress: res.progress?.name || '',
            progress_id: res.progress_id || null,
        }));
        setValue(res.progress?.name || ''); // Update the progress selection
    });

    useEffect(() => {
        if (data.new_panel_id) {
            void fetchPanelProgress(data.new_panel_id);
        }
    }, [data.new_panel_id]);

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
                {t(
                    'pages.project.trainset.carriage_trainset.carriage_panel.partials.add_new_panel.buttons.add_new_panel',
                )}
            </DialogTrigger>
            <DialogContent className='sm:max-w-[425px]'>
                <DialogHeader>
                    <DialogTitle>{data.new_panel_name}</DialogTitle>
                    <DialogDescription></DialogDescription>
                    <form onSubmit={handleAddPanelCarriage} className='flex flex-col gap-4'>
                        <div className='flex flex-col gap-4 bg-background-2 p-4'>
                            <Label htmlFor='progress'>
                                {t(
                                    'pages.project.trainset.carriage_trainset.carriage_panel.partials.add_new_panel.dialogs.fields.progress',
                                )}
                            </Label>
                            <div className='flex gap-2'>
                                <GenericDataSelector
                                    setSelectedData={(id) => setData('progress_id', id)}
                                    selectedDataId={data.progress_id}
                                    renderItem={(item) => item.name}
                                    placeholder={t(
                                        'pages.project.trainset.carriage_trainset.carriage_panel.partials.add_new_panel.dialogs.fields.progress_placeholder',
                                    )}
                                    onSearchChange={handleChangeSearchProgressName}
                                    id='progress_id'
                                    data={progressResponse?.data}
                                    customSearchPlaceholder={t(
                                        'pages.project.trainset.carriage_trainset.carriage_panel.partials.add_new_panel.dialogs.fields.progress_search',
                                    )}
                                />
                                <Button
                                    variant='ghost'
                                    type='button'
                                    onClick={handleResetProgressSearch}
                                >
                                    <RefreshCcw size={STYLING.ICON.SIZE.SMALL} />
                                </Button>
                            </div>

                            <Label htmlFor='panel'>
                                {t(
                                    'pages.project.trainset.carriage_trainset.carriage_panel.partials.add_new_panel.dialogs.fields.panel',
                                )}
                            </Label>
                            <GenericDataSelector
                                setSelectedData={(id) => setData('new_panel_id', id)}
                                selectedDataId={data.new_panel_id}
                                renderItem={(item) => item.name}
                                placeholder={t(
                                    'pages.project.trainset.carriage_trainset.carriage_panel.partials.add_new_panel.dialogs.fields.panel_placeholder',
                                )}
                                nullable
                                id='panel_id'
                                fetchData={fetchPanels}
                            />
                        </div>

                        <Separator />

                        <div className='flex flex-col gap-4 bg-background-2 p-4'>
                            <div className='flex flex-col gap-2'>
                                <Label>
                                    {t(
                                        'pages.project.trainset.carriage_trainset.carriage_panel.partials.add_new_panel.dialogs.fields.new_panel_name',
                                    )}
                                </Label>
                                <Input
                                    value={data.new_panel_name}
                                    type='text'
                                    required
                                    onChange={handleChangeNewPanelName}
                                    disabled={data.new_panel_id !== null}
                                />
                            </div>
                            <Label htmlFor='new-panel-description'>
                                {t(
                                    'pages.project.trainset.carriage_trainset.carriage_panel.partials.add_new_panel.dialogs.fields.new_panel_description',
                                )}
                            </Label>
                            <Textarea
                                value={data.new_panel_description}
                                onChange={handleChangeNewPanelDescription}
                                id='new-panel-description'
                                disabled={data.new_panel_id !== null}
                                className='rounded p-2'
                            />
                            <Label htmlFor='new-panel-qty'>
                                {t(
                                    'pages.project.trainset.carriage_trainset.carriage_panel.partials.add_new_panel.dialogs.fields.new_panel_qty',
                                )}
                            </Label>
                            <Input
                                value={data.new_panel_qty}
                                type='number'
                                required
                                onChange={handleChangeNewPanelQty}
                                min={1}
                                id='new-panel-qty'
                            />
                        </div>

                        <Button type='submit' disabled={loading}>
                            {loading ? (
                                <>
                                    <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                                    {t('action.loading')}
                                </>
                            ) : (
                                t(
                                    'pages.project.trainset.carriage_trainset.carriage_panel.partials.add_new_panel.dialogs.buttons.add_panel',
                                )
                            )}
                        </Button>
                    </form>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
};

export default memo(AddNewPanel);
