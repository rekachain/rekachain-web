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
import { carriagePanelService } from '@/Services/carriagePanelService';
import { componentService } from '@/Services/componentService';
import { progressService } from '@/Services/progressService';
import { STYLING } from '@/Support/Constants/styling';
import { PaginateResponse } from '@/Support/Interfaces/Others';
import { ServiceFilterOptions } from '@/Support/Interfaces/Others/ServiceFilterOptions';
import {
    CarriagePanelResource,
    ComponentResource,
    ProgressResource,
} from '@/Support/Interfaces/Resources';
import { withLoading } from '@/Utils/withLoading';
import { useForm } from '@inertiajs/react';
import { useDebounce } from '@uidotdev/usehooks';
import { useLaravelReactI18n } from 'laravel-react-i18n';
import { Loader2, RefreshCcw } from 'lucide-react';
import { ChangeEvent, FormEvent, memo, useCallback, useEffect, useState } from 'react';

const AddNewComponent = ({
    componentResource,
    setComponentResource,
    carriagePanel,
    handleSyncCarriagePanel,
}: {
    componentResource: PaginateResponse<ComponentResource>;
    setComponentResource: (componentResponse: PaginateResponse<ComponentResource>) => void;
    carriagePanel: CarriagePanelResource;
    handleSyncCarriagePanel: () => Promise<void>;
}) => {
    const [value, setValue] = useState('');
    const [progressResponse, setProgressResponse] = useState<PaginateResponse<ProgressResource>>();
    const { t } = useLaravelReactI18n();
    const { loading } = useLoading();

    const { data, setData, reset } = useForm({
        search_progress: '',
        search_component: '',
        trainsetNeeded: 0,
        new_component_id: null as number | null,
        progress_id: null as number | null,
        new_component_name: '',
        new_component_description: '',
        new_component_qty: 1,
    });
    const debouncedSearchProgress = useDebounce(data.search_progress, 300);
    const debouncedSearchComponent = useDebounce(data.search_component, 300);

    const handleSyncComponents = withLoading(async () => {
        const filters: ServiceFilterOptions = { search: debouncedSearchComponent };
        const res = await componentService.getAll(filters);
        setComponentResource(res);
    });

    useEffect(() => {
        void handleSyncComponents();
    }, [debouncedSearchComponent]);

    const fetchComponents = useCallback(async (filters: ServiceFilterOptions) => {
        const res = await componentService.getAll(filters);
        return res.data;
    }, []);

    const handleChangeSearchProgressName = async (e: string) => {
        setData('search_progress', e);
    };

    const handleResetAddCarriageSelection = () => {
        setData('new_component_id', 0);
    };

    const handleResetProgressSearch = () => {
        setData('search_progress', '');
    };

    const handleChangeNewComponentName = (e: ChangeEvent<HTMLInputElement>) => {
        setData('new_component_name', e.target.value);
    };

    const handleChangeNewComponentDescription = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setData('new_component_description', e.target.value);
    };

    const handleChangeNewComponentQty = (e: ChangeEvent<HTMLInputElement>) => {
        setData('new_component_qty', +e.target.value);
    };

    const handleSyncProgress = withLoading(async () => {
        const filters: ServiceFilterOptions = { search: debouncedSearchProgress };
        const res = await progressService.getAll(filters);
        setProgressResponse(res);
    });

    const handleAddComponentCarriage = withLoading(async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!data.progress_id) return;

        await carriagePanelService.addComponent(
            carriagePanel.id,
            data.progress_id,
            data.new_component_id,
            data.new_component_name,
            data.new_component_description,
            data.new_component_qty,
        );
        handleResetAddCarriageSelection();
        handleResetProgressSearch();
        await handleSyncCarriagePanel();
        reset();
        void useSuccessToast(
            t(
                'pages.project.trainset.carriage_trainset.carriage_panel.carriage_panel_component.partials.add_new_component.messages.created',
            ),
        );
    });

    const fetchComponentProgress = withLoading(async (componentId: number) => {
        const res = await componentService.get(componentId);
        setData((prevData) => ({
            ...prevData,
            new_component_id: componentId,
            search_progress: res.progress?.name || '',
            progress_id: res.progress_id || null,
        }));
        setValue(res.progress?.name || ''); // Update the progress selection
    });

    useEffect(() => {
        if (data.new_component_id) {
            void fetchComponentProgress(data.new_component_id);
        }
    }, [data.new_component_id]);

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
                    'pages.project.trainset.carriage_trainset.carriage_panel.carriage_panel_component.partials.add_new_component.buttons.add_component',
                )}
            </DialogTrigger>
            <DialogContent className='sm:max-w-[425px]'>
                <DialogHeader>
                    <DialogTitle>{data.new_component_name}</DialogTitle>
                    <DialogDescription></DialogDescription>
                    <form onSubmit={handleAddComponentCarriage} className='flex flex-col gap-4'>
                        <div className='flex flex-col gap-4 bg-background-2 p-4'>
                            <Label htmlFor='progress'>
                                {t(
                                    'pages.project.trainset.carriage_trainset.carriage_panel.carriage_panel_component.partials.add_new_component.dialogs.fields.progress',
                                )}
                            </Label>
                            <div className='flex gap-2'>
                                <GenericDataSelector
                                    setSelectedData={(id) => setData('progress_id', id)}
                                    selectedDataId={data.progress_id}
                                    renderItem={(item) => item.name}
                                    placeholder={t(
                                        'pages.project.trainset.carriage_trainset.carriage_panel.carriage_panel_component.partials.add_new_component.dialogs.fields.progress_placeholder',
                                    )}
                                    onSearchChange={handleChangeSearchProgressName}
                                    id='progress_id'
                                    data={progressResponse?.data}
                                    customSearchPlaceholder={t(
                                        'pages.project.trainset.carriage_trainset.carriage_panel.carriage_panel_component.partials.add_new_component.dialogs.fields.progress_search_placeholder',
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

                            <Label htmlFor='component'>
                                {t(
                                    'pages.project.trainset.carriage_trainset.carriage_panel.carriage_panel_component.partials.add_new_component.dialogs.fields.component',
                                )}
                            </Label>
                            <GenericDataSelector
                                setSelectedData={(id) => setData('new_component_id', id)}
                                selectedDataId={data.new_component_id}
                                renderItem={(item) => item.name}
                                placeholder={t(
                                    'pages.project.trainset.carriage_trainset.carriage_panel.carriage_panel_component.partials.add_new_component.dialogs.fields.component_placeholder',
                                )}
                                nullable
                                id='component_id'
                                fetchData={fetchComponents}
                            />
                        </div>

                        <Separator />

                        <div className='flex flex-col gap-4 bg-background-2 p-4'>
                            <div className='flex flex-col gap-2'>
                                <Label>
                                    {t(
                                        'pages.project.trainset.carriage_trainset.carriage_panel.carriage_panel_component.partials.add_new_component.dialogs.fields.component_name',
                                    )}
                                </Label>
                                <Input
                                    value={data.new_component_name}
                                    type='text'
                                    required
                                    onChange={handleChangeNewComponentName}
                                    disabled={data.new_component_id !== null}
                                />
                            </div>
                            <Label htmlFor='new-component-description'>
                                {t(
                                    'pages.project.trainset.carriage_trainset.carriage_panel.carriage_panel_component.partials.add_new_component.dialogs.fields.component_description',
                                )}
                            </Label>
                            <Textarea
                                value={data.new_component_description}
                                onChange={handleChangeNewComponentDescription}
                                id='new-component-description'
                                disabled={data.new_component_id !== null}
                                className='rounded p-2'
                            />
                            <Label htmlFor='new-component-qty'>
                                {t(
                                    'pages.project.trainset.carriage_trainset.carriage_panel.carriage_panel_component.partials.add_new_component.dialogs.fields.component_qty',
                                )}
                            </Label>
                            <Input
                                value={data.new_component_qty}
                                type='number'
                                required
                                onChange={handleChangeNewComponentQty}
                                min={1}
                                id='new-component-qty'
                            />
                        </div>

                        <Button type='submit' disabled={loading}>
                            {loading ? (
                                <>
                                    <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                                    {t('action.loading')}
                                </>
                            ) : (
                                t('action.save')
                            )}
                        </Button>
                    </form>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
};

export default memo(AddNewComponent);
