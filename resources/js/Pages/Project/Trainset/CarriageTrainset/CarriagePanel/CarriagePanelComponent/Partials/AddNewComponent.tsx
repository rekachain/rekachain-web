import { CarriagePanelResource, ComponentResource, ProgressResource } from '@/Support/Interfaces/Resources';
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
import { Loader2, RefreshCcw } from 'lucide-react';
import { STYLING } from '@/Support/Constants/styling';
import { Input } from '@/Components/UI/input';
import { Textarea } from '@/Components/UI/textarea';
import { ChangeEvent, FormEvent, memo, useCallback, useEffect, useState } from 'react';
import { PaginateResponse } from '@/Support/Interfaces/Others';
import { withLoading } from '@/Utils/withLoading';
import { componentService } from '@/Services/componentService';
import { useSuccessToast } from '@/Hooks/useToast';
import { useLoading } from '@/Contexts/LoadingContext';
import { useForm } from '@inertiajs/react';
import { useDebounce } from '@uidotdev/usehooks';
import { ServiceFilterOptions } from '@/Support/Interfaces/Others/ServiceFilterOptions';
import { progressService } from '@/Services/progressService';
import { Separator } from '@/Components/UI/separator';
import { useLaravelReactI18n } from 'laravel-react-i18n';
import GenericDataSelector from '@/Components/GenericDataSelector';
import { carriagePanelService } from '@/Services/carriagePanelService';

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
        void useSuccessToast('Komponen berhasil ditambahkan');
    });

    const fetchComponentProgress = withLoading(async (componentId: number) => {
        const res = await componentService.get(componentId);
        setData(prevData => ({
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
                Tambah Komponen
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{data.new_component_name}</DialogTitle>
                    <DialogDescription></DialogDescription>
                    <form onSubmit={handleAddComponentCarriage} className="flex flex-col gap-4">
                        <div className="flex flex-col bg-background-2 gap-4 p-4">
                            <Label htmlFor="progress">Progress</Label>
                            <div className="flex gap-2">
                                <GenericDataSelector
                                    id="progress_id"
                                    data={progressResponse?.data}
                                    onSearchChange={handleChangeSearchProgressName}
                                    setSelectedData={id => setData('progress_id', id)}
                                    selectedDataId={data.progress_id}
                                    customSearchPlaceholder={'Cari Progress'}
                                    placeholder={'Pilih Progress'}
                                    renderItem={item => item.name}
                                />
                                <Button type="button" variant="ghost" onClick={handleResetProgressSearch}>
                                    <RefreshCcw size={STYLING.ICON.SIZE.SMALL} />
                                </Button>
                            </div>

                            <Label htmlFor="component">Komponen</Label>
                            <GenericDataSelector
                                id="component_id"
                                fetchData={fetchComponents}
                                setSelectedData={id => setData('new_component_id', id)}
                                selectedDataId={data.new_component_id}
                                placeholder={'Pilih Komponen'}
                                renderItem={item => item.name}
                                nullable
                            />
                        </div>

                        <Separator />

                        <div className="flex flex-col gap-4 bg-background-2 p-4">
                            <div className="flex flex-col gap-2">
                                <Label>Nama Komponen</Label>
                                <Input
                                    type="text"
                                    value={data.new_component_name}
                                    onChange={handleChangeNewComponentName}
                                    disabled={data.new_component_id !== null}
                                    required
                                />
                            </div>
                            <Label htmlFor="new-component-description">Deskripsi Komponen</Label>
                            <Textarea
                                id="new-component-description"
                                className="p-2 rounded"
                                value={data.new_component_description}
                                onChange={handleChangeNewComponentDescription}
                                disabled={data.new_component_id !== null}
                            />
                            <Label htmlFor="new-component-qty">Jumlah Komponen</Label>
                            <Input
                                id="new-component-qty"
                                type="number"
                                min={1}
                                value={data.new_component_qty}
                                onChange={handleChangeNewComponentQty}
                                required
                            />
                        </div>

                        <Button type="submit" disabled={loading}>
                            {loading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
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
