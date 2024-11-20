import { Button } from '@/Components/UI/button';
import { Label } from '@/Components/UI/label';
import { Input } from '@/Components/UI/input';
import {
    CarriagePanelResource,
    ProgressResource,
    StepResource,
    WorkAspectResource,
} from '@/Support/Interfaces/Resources';
import GenericDataSelector from '@/Components/GenericDataSelector';
import { FormEvent, useCallback, useEffect, useState } from 'react';
import { PaginateResponse, ServiceFilterOptions } from '@/Support/Interfaces/Others';
import { progressService } from '@/Services/progressService';
import { useForm } from '@inertiajs/react';
import { Separator } from '@/Components/UI/separator';
import { RefreshCcw } from 'lucide-react';
import { useLaravelReactI18n } from 'laravel-react-i18n';
import { STYLING } from '@/Support/Constants/styling';
import { workAspectService } from '@/Services/workAspectService';
import { withLoading } from '@/Utils/withLoading';
import { useDebounce } from '@uidotdev/usehooks';
import { ScrollArea } from '@/Components/UI/scroll-area';
import { useSuccessToast } from '@/Hooks/useToast';
import { carriagePanelService } from '@/Services/carriagePanelService';

export default function ({
    carriagePanel,
    handleSyncCarriagePanel,
    progress,
}: {
    carriagePanel: CarriagePanelResource;
    handleSyncCarriagePanel: () => Promise<void>;
    progress: ProgressResource;
}) {
    const { t } = useLaravelReactI18n();
    const { data, setData } = useForm({
        progress_id: null as number | null,
        progress_name: '',
        progress_work_aspect_id: null as number | null,
        panelComponentQty: carriagePanel.qty,
    });

    const [searchProgress, setSearchProgress] = useState<string>('');

    const [progressResponse, setProgressResponse] = useState<PaginateResponse<ProgressResource>>();

    const [progressSteps, setProgressSteps] = useState<StepResource[]>([]);

    const debouncedSearchProgress = useDebounce(searchProgress, 300);

    const handleSyncProgressResource = withLoading(async () => {
        const filters: ServiceFilterOptions = { perPage: 100, search: debouncedSearchProgress, relations: 'steps' };
        const res = await progressService.getAll(filters);
        setProgressResponse(res);
    });

    const fetchWorkAspects = useCallback(async (filters: ServiceFilterOptions) => {
        return await workAspectService.getAll(filters).then(response => response.data);
    }, []);

    const handleResetProgressSelectionId = () => {
        setData('progress_id', null);
    };

    const handleChangeSearchProgressName = (value: string) => {
        setSearchProgress(value);
    };

    useEffect(() => {
        progressResponse?.data.find(progress => {
            if (progress.id === data.progress_id) {
                setProgressSteps(progress.steps);
            }
        });
    }, [data.progress_id]);

    useEffect(() => {
        void handleSyncProgressResource();
    }, []);

    const handleChangeProgress = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        await carriagePanelService.changeProgress(
            carriagePanel.id,
            data.progress_id,
            data.progress_name,
            data.progress_work_aspect_id,
        );
        await handleSyncCarriagePanel();
        void useSuccessToast('Progress has been changed');
    };

    return (
        <form onSubmit={handleChangeProgress}>
            <div className="flex flex-col gap-4">
                <div className="flex gap-4 flex-col">
                    <Label htmlFor="name">Progress</Label>
                    <div className="flex items-center">
                        <GenericDataSelector
                            id="progress_id"
                            data={progressResponse?.data}
                            onSearchChange={handleChangeSearchProgressName}
                            setSelectedData={id => setData('progress_id', id)}
                            selectedDataId={data.progress_id}
                            customSearchPlaceholder={t(
                                'pages.project.trainset.carriage_trainset.panel.partials.add_new_panel.dialogs.fields.progress_search',
                            )}
                            placeholder={t(
                                'pages.project.trainset.carriage_trainset.panel.partials.add_new_panel.dialogs.fields.progress_placeholder',
                            )}
                            renderItem={item => item.name}
                        />

                        <Button type="button" variant="ghost" onClick={handleResetProgressSelectionId}>
                            <RefreshCcw size={STYLING.ICON.SIZE.SMALL} />
                        </Button>
                    </div>
                </div>
                {progressSteps.length > 0 && (
                    <ScrollArea className="max-h-[250px]">
                        {progressSteps.map((progressStep, i) => (
                            <div key={progressStep.id}>
                                <Label>
                                    {i + 1}. {progressStep.name}
                                </Label>
                            </div>
                        ))}
                    </ScrollArea>
                )}
                <div className="flex items-center gap-4">
                    <Separator className="flex-1" />
                    <p>Create New Progress</p>
                    <Separator className="flex-1" />
                </div>
                <div className="flex flex-col gap-4">
                    <Label htmlFor="name">Name</Label>
                    <Input
                        id="name"
                        value={data.progress_name}
                        onInput={e => setData('progress_name', e.currentTarget.value)}
                        disabled={data.progress_id !== null}
                    />

                    <Label htmlFor="work_aspect">Work Aspect</Label>
                    <GenericDataSelector
                        id="work_aspect"
                        fetchData={fetchWorkAspects}
                        setSelectedData={id => setData('progress_work_aspect_id', id)}
                        selectedDataId={data.progress_work_aspect_id ?? undefined}
                        placeholder={'Select a work aspect'}
                        renderItem={(item: WorkAspectResource) => item.name}
                        nullable
                    />
                </div>
                <div className="flex ml-auto gap-4">
                    <Button type="submit">{t('action.save')}</Button>
                </div>
            </div>
        </form>
    );
}
