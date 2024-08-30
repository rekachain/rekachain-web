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
    const [panelFilters, setPanelFilters] = useState<ServiceFilterOptions>({
        page: 1,
        perPage: 10,
    });
    const [progressFilters, setProgressFilters] = useState<ServiceFilterOptions>({
        page: 1,
        perPage: 10,
    });

    const { data, setData, post, processing, errors, reset } = useForm({
        trainsetNeeded: 0,
        isLoading: false,
        new_panel_id: 0,
        progress_id: 0,
        new_panel_name: '',
        new_panel_description: '',
        new_panel_qty: 1,
    });

    const debouncedPanelFilters = useDebounce(panelFilters, 300);
    const debouncedProgressFilters = useDebounce(progressFilters, 300);

    useEffect(() => {
        panelService.getAll().then(response => {
            setPanelResponse(response);
        });
    }, []);

    const handleChangeSearchPanelName = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const name = e.target.value;
        setPanelFilters({ ...panelFilters, name });
        // await handleSyncCarriages();
    };

    const handleChangeSearchprogressName = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const name = e.target.value;
        setProgressFilters({ ...progressFilters, name });
        // await handleSyncCarriages();
    };

    const handleResetAddCarriageSelection = () => {
        setData('new_panel_id', 0);
    };

    const handleResetAddProgressSelection = () => {
        setData('progress_id', 0);
    };

    const handleSyncPanels = async () => {
        await panelService.getAll(debouncedPanelFilters).then(res => {
            setPanelResponse(res);
        });
    };

    const handleSyncProgress = async () => {
        await progressService.getAll(debouncedProgressFilters).then(res => {
            setProgressResponse(res);
        });
    };

    const handleSyncCarriage = async () => {
        setData('isLoading', true);
        const response = await window.axios.get(location.href);
        setCarriageTrainset(response.data.carriageTrainset);
        setData('isLoading', false);
    };

    const handleAddPanelCarriage = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            setData('isLoading', true);
            await carriageTrainsetService.addPanel(
                carriageTrainset.id,
                data.progress_id,
                data.new_panel_id,
                data.new_panel_name,
                data.new_panel_description,
                data.new_panel_qty,
            );
        } catch (error) {
        } finally {
            handleResetAddCarriageSelection();
            handleResetAddProgressSelection();
            await handleSyncCarriage();
            setData('isLoading', false);
        }
    };

    useEffect(() => {
        setData('isLoading', true);
        handleSyncPanels().then(() => {
            setData('isLoading', false);
        });
    }, [debouncedPanelFilters]);

    useEffect(() => {
        setData('isLoading', true);
        handleSyncProgress().then(() => {
            setData('isLoading', false);
        });
    }, [debouncedProgressFilters]);

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
                                            <Input
                                                placeholder="Cari progress"
                                                value={progressFilters.type}
                                                onChange={handleChangeSearchprogressName}
                                                disabled={data.isLoading}
                                            />
                                            <div className="flex gap-4">
                                                <Select
                                                    key={data.progress_id} // Force re-render when new_panel_progress_id changes
                                                    onValueChange={v => setData('progress_id', +v)}
                                                    value={data.progress_id?.toString()}
                                                    disabled={data.isLoading}
                                                    required
                                                >
                                                    <SelectTrigger id="progress">
                                                        <SelectValue placeholder="progress" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="0" defaultChecked disabled>
                                                            {data.isLoading ? 'Loading' : 'Pilih progress'}
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
                                                {/*<Button*/}
                                                {/*    type="button"*/}
                                                {/*    variant="ghost"*/}
                                                {/*    onClick={handleResetAddProgressSelection}*/}
                                                {/*>*/}
                                                {/*    <RefreshCcw size={STYLING.ICON.SIZE.SMALL} />*/}
                                                {/*</Button>*/}
                                            </div>

                                            <Label htmlFor="panel">Pilih panel yang sudah ada</Label>
                                            <Input
                                                placeholder="Cari panel"
                                                value={panelFilters.type}
                                                onChange={handleChangeSearchPanelName}
                                                disabled={data.isLoading}
                                            />
                                            <div className="flex gap-4">
                                                <Select
                                                    key={data.new_panel_id} // Force re-render when new_panel_id changes
                                                    onValueChange={v => setData('new_panel_id', +v)}
                                                    value={data.new_panel_id?.toString()}
                                                    disabled={data.isLoading}
                                                    required
                                                >
                                                    <SelectTrigger id="panel">
                                                        <SelectValue placeholder="Panel" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="0" defaultChecked disabled>
                                                            {data.isLoading ? 'Loading' : 'Pilih panel'}
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
                                                onChange={e => setData('new_panel_name', e.target.value)}
                                                disabled={data.new_panel_id !== 0}
                                                required
                                            />
                                        </div>
                                        <Label htmlFor="new-panel-description">Deskripsi Panel</Label>
                                        <Textarea
                                            id="new-panel-description"
                                            className="p-2 rounded"
                                            value={data.new_panel_description}
                                            onChange={e => setData('new_panel_description', e.target.value)}
                                            disabled={data.new_panel_id !== 0}
                                        />
                                        <Label htmlFor="new-panel-qty">Jumlah Panel</Label>
                                        <Input
                                            id="new-panel-qty"
                                            type="number"
                                            min={1}
                                            value={data.new_panel_qty}
                                            onChange={e => setData('new_panel_qty', +e.target.value)}
                                            required
                                        />
                                    </div>

                                    <Button type="submit" disabled={data.isLoading}>
                                        {data.isLoading ? (
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
