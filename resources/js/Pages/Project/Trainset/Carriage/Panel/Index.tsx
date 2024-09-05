import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { lazy, memo, Suspense, useEffect, useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import { Button, buttonVariants } from '@/Components/ui/button';
import StaticLoadingOverlay from '@/Components/StaticLoadingOverlay';
import {
    CarriageTrainsetResource,
    PanelResource,
    ProgressResource,
    ProjectResource,
    TrainsetResource,
} from '@/support/interfaces/resources';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from '@/Components/ui/breadcrumb';
import { ROUTES } from '@/support/constants/routes';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/Components/ui/dialog';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/Components/ui/select';
import { Label } from '@/Components/ui/label';
import { Input } from '@/Components/ui/input';
import { Loader2, RefreshCcw } from 'lucide-react';
import { STYLING } from '@/support/constants/styling';
import { Separator } from '@/Components/ui/separator';
import { Textarea } from '@/Components/ui/textarea';
import { panelService } from '@/services/panelService';
import { ServiceFilterOptions } from '@/support/interfaces/others/ServiceFilterOptions';
import { PaginateResponse } from '@/support/interfaces/others';
import { useDebounce } from '@uidotdev/usehooks';
import { progressService } from '@/services/progressService';
import { carriageTrainsetService } from '@/services/carriageTrainsetService';
import { fetchGenericData } from '@/helpers/dataManagementHelper';
import { useLoading } from '@/contexts/LoadingContext';
import { useSuccessToast } from '@/hooks/useToast';

const Panels = memo(lazy(() => import('./Partials/Panels')));

export default function ({
    project,
    trainset,
    carriageTrainset: initialCarriageTrainset,
}: {
    project: ProjectResource;
    trainset: TrainsetResource;
    carriageTrainset: CarriageTrainsetResource;
}) {
    const [carriageTrainset, setCarriageTrainset] = useState<CarriageTrainsetResource>(initialCarriageTrainset);
    const [panelResponse, setPanelResponse] = useState<PaginateResponse<PanelResource>>();
    const [progressResponse, setProgressResponse] = useState<PaginateResponse<ProgressResource>>();
    const { data, setData, post, processing, errors, reset } = useForm({
        search_progress: '',
        search_panel: '',
        trainsetNeeded: 0,
        new_panel_id: 0,
        progress_id: 0,
        new_panel_name: '',
        new_panel_description: '',
        new_panel_qty: 1,
    });
    const { setLoading, loading } = useLoading();
    const debouncedSearchProgress = useDebounce(data.search_progress, 300);
    const debouncedSearchPanel = useDebounce(data.search_panel, 300);

    useEffect(() => {
        setLoading(true);
        panelService.getAll().then(response => {
            setPanelResponse(response);
        });
        setLoading(false);
    }, []);

    const handleChangeSearchPanelName = async (e: React.ChangeEvent<HTMLInputElement>) => {
        setData('search_panel', e.target.value);
    };

    const handleChangeSearchprogressName = async (e: React.ChangeEvent<HTMLInputElement>) => {
        setData('search_progress', e.target.value);
    };

    const handleResetAddCarriageSelection = () => {
        setData('new_panel_id', 0);
    };

    const handleResetProgressSearch = () => {
        setData('search_progress', '');
        // setProgressFilters({ ...progressFilters, search: '' });
    };

    const handleSyncPanels = async () => {
        setLoading(true);
        const filters: ServiceFilterOptions = { search: debouncedSearchPanel };
        const res = await panelService.getAll(filters);
        setPanelResponse(res);
        setLoading(false);
    };

    const handleChangeNewPanelName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setData('new_panel_name', e.target.value);
    };

    const handleChangeNewPanelDescription = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setData('new_panel_description', e.target.value);
    };

    const handleChangeNewPanelQty = (e: React.ChangeEvent<HTMLInputElement>) => {
        setData('new_panel_qty', +e.target.value);
    };

    const handleSyncProgress = async () => {
        setLoading(true);
        const filters: ServiceFilterOptions = { search: debouncedSearchProgress };
        const res = await progressService.getAll(filters);
        setProgressResponse(res);
        setLoading(false);
    };

    const handleSyncCarriage = async () => {
        setLoading(true);
        const data = await fetchGenericData<{ carriageTrainset: CarriageTrainsetResource }>();
        setCarriageTrainset(data.carriageTrainset);
        setLoading(false);
    };

    const handleAddPanelCarriage = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            setLoading(true);
            await carriageTrainsetService.addPanel(
                carriageTrainset.id,
                data.progress_id,
                data.new_panel_id,
                data.new_panel_name,
                data.new_panel_description,
                data.new_panel_qty,
            );
            useSuccessToast('Panel berhasil ditambahkan');
        } catch (error) {
        } finally {
            handleResetAddCarriageSelection();
            handleResetProgressSearch();
            await handleSyncCarriage();
            setLoading(false);
        }
    };

    const handleChangePanel = async (v: string) => {
        const res = await panelService.get(+v);
        setData(prevData => ({
            ...prevData,
            new_panel_id: +v,
            search_progress: res.progress?.name || '',
            progress_id: res.progress_id || 0,
        }));
    };

    useEffect(() => {
        handleSyncPanels();
    }, [debouncedSearchPanel]);

    useEffect(() => {
        handleSyncProgress();
    }, [debouncedSearchProgress]);

    return (
        <>
            <Head title={`Carriage: ${carriageTrainset?.carriage.type}`} />
            <AuthenticatedLayout>
                <div className="p-4 space-y-4">
                    <div className="flex flex-col gap-2">
                        <Breadcrumb>
                            <BreadcrumbList>
                                <BreadcrumbItem>
                                    <Link href={route(`${ROUTES.PROJECTS}.index`)}>Home</Link>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator />
                                <BreadcrumbItem>
                                    <Link href={route(`${ROUTES.PROJECTS_TRAINSETS}.index`, [project.id])}>
                                        Proyek {project?.name}
                                    </Link>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator />
                                <BreadcrumbItem>
                                    <Link
                                        href={route(`${ROUTES.PROJECTS_TRAINSETS_CARRIAGES}.index`, [
                                            project.id,
                                            trainset.id,
                                        ])}
                                    >
                                        Trainset {trainset?.name}
                                    </Link>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator />
                                <BreadcrumbItem>
                                    <BreadcrumbPage>Carriage {carriageTrainset?.carriage.type}</BreadcrumbPage>
                                </BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb>
                        <div className="flex items-center gap-4">
                            <h1 className="text-page-header my-4">Carriage {carriageTrainset?.carriage.type}</h1>
                        </div>
                    </div>

                    <Suspense fallback={<StaticLoadingOverlay />}>
                        <Panels carriageTrainset={carriageTrainset} handleSyncCarriage={handleSyncCarriage} />
                    </Suspense>

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
                                    <SelectGroup className="space-y-2">
                                        <div className="flex flex-col bg-background-2 gap-4 p-4">
                                            <Label htmlFor="progress">Pilih progress yang sudah ada</Label>
                                            <div className="flex gap-4">
                                                <Input
                                                    placeholder="Cari progress"
                                                    value={data.search_progress}
                                                    onChange={handleChangeSearchprogressName}
                                                    disabled={loading}
                                                />
                                                <Button
                                                    type="button"
                                                    variant="ghost"
                                                    onClick={handleResetProgressSearch}
                                                >
                                                    <RefreshCcw size={STYLING.ICON.SIZE.SMALL} />
                                                </Button>
                                            </div>
                                            <div className="flex gap-4">
                                                <Select
                                                    key={data.progress_id} // Force re-render when new_panel_progress_id changes
                                                    onValueChange={v => setData('progress_id', +v)}
                                                    value={data.progress_id?.toString()}
                                                    disabled={loading}
                                                    required
                                                >
                                                    <SelectTrigger id="progress">
                                                        <SelectValue placeholder="progress" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="0" defaultChecked disabled>
                                                            {loading ? 'Loading' : 'Pilih progress'}
                                                        </SelectItem>
                                                        {progressResponse?.data.map(progress => (
                                                            <SelectItem
                                                                key={progress.id}
                                                                value={progress.id.toString()}
                                                            >
                                                                {progress.name}
                                                                <br />
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            </div>

                                            <Label htmlFor="panel">Pilih panel yang sudah ada</Label>
                                            <Input
                                                placeholder="Cari panel"
                                                value={data.search_panel}
                                                onChange={handleChangeSearchPanelName}
                                                disabled={loading}
                                            />
                                            <div className="flex gap-4">
                                                <Select
                                                    key={data.new_panel_id} // Force re-render when new_panel_id changes
                                                    onValueChange={handleChangePanel}
                                                    value={data.new_panel_id?.toString()}
                                                    disabled={loading}
                                                    required
                                                >
                                                    <SelectTrigger id="panel">
                                                        <SelectValue placeholder="Panel" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="0" defaultChecked disabled>
                                                            {loading ? 'Loading' : 'Pilih panel'}
                                                        </SelectItem>
                                                        {panelResponse?.data.map(panel => (
                                                            <SelectItem key={panel.id} value={panel.id.toString()}>
                                                                {panel.name}
                                                                <br />
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
                </div>
            </AuthenticatedLayout>
        </>
    );
}
