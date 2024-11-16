import { Accordion } from '@radix-ui/react-accordion';
import { AccordionContent, AccordionItem, AccordionTrigger } from '@/Components/UI/accordion';
import { CarriagePanelComponentResource, ProgressResource, StepResource } from '@/Support/Interfaces/Resources';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/Components/UI/dialog';
import { Button } from '@/Components/UI/button';
import { useForm } from '@inertiajs/react';
import { FormEvent, useCallback, useEffect, useState } from 'react';
import { PaginateResponse, ServiceFilterOptions } from '@/Support/Interfaces/Others';
import { useDebounce } from '@uidotdev/usehooks';
import { withLoading } from '@/Utils/withLoading';
import { progressService } from '@/Services/progressService';
import { workAspectService } from '@/Services/workAspectService';
import { carriagePanelComponentService } from '@/Services/carriagePanelComponentService';
import { useSuccessToast } from '@/Hooks/useToast';
import { useLaravelReactI18n } from 'laravel-react-i18n';
import { stepService } from '@/Services/stepService';
import { progressStepService } from '@/Services/progressStepService';
import CarriagePanelComponentProgress from '@/Pages/Project/Trainset/Carriage/CarriagePanel/CarriagePanelComponent/Partials/Partials/Components/CarriagePanelComponentProgress';
import CarriagePanelComponentProgressSteps from '@/Pages/Project/Trainset/Carriage/CarriagePanel/CarriagePanelComponent/Partials/Partials/Components/CarriagePanelComponentProgressSteps';

export default function ({
    progress,
    carriagePanelComponent,
    handleSyncCarriagePanel,
}: {
    progress: ProgressResource;
    carriagePanelComponent: CarriagePanelComponentResource;
    handleSyncCarriagePanel: () => Promise<void>;
}) {
    const { t } = useLaravelReactI18n();

    const { data, setData } = useForm({
        progress_id: null as number | null,
        progress_name: '',
        progress_work_aspect_id: null as number | null,
        panelComponentQty: carriagePanelComponent.qty,

        step_id: null as number | null,
        step_name: '',
        step_process: '',
        step_estimated_time: 0,
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
        await carriagePanelComponentService.changeProgress(
            carriagePanelComponent.id,
            data.progress_id,
            data.progress_name,
            data.progress_work_aspect_id,
        );
        await handleSyncCarriagePanel();
        void useSuccessToast('Progress has been changed');
    };

    const fetchSteps = useCallback(async (filters: ServiceFilterOptions) => {
        return await stepService.getAll(filters).then(response => response.data);
    }, []);

    const handleAddStep = withLoading(async (e: FormEvent<HTMLDivElement>) => {
        e.preventDefault();
        await progressService.createStep(
            progress.id,
            data.step_id,
            data.step_name,
            data.step_process,
            data.step_estimated_time,
        );
        await handleSyncCarriagePanel();
        void useSuccessToast('Step added');
    }, true);

    const handleProgressStepDeletion = withLoading(async (progressStepId: number) => {
        await progressStepService.delete(progressStepId);
        await handleSyncCarriagePanel();
        void useSuccessToast('Step deleted');
    }, true);

    const handleResetStepSelectionId = () => {
        setData('step_id', null);
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="link">CC</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>{progress.name}</DialogTitle>
                    <DialogDescription></DialogDescription>
                </DialogHeader>
                <Accordion type="single" collapsible>
                    <AccordionItem value="item-1">
                        <AccordionTrigger>Progress</AccordionTrigger>
                        <AccordionContent>
                            <CarriagePanelComponentProgress
                                progress={progress}
                                handleSyncCarriagePanel={handleSyncCarriagePanel}
                                carriagePanelComponent={carriagePanelComponent}
                            />
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                        <AccordionTrigger>Progress Steps</AccordionTrigger>
                        <AccordionContent>
                            <CarriagePanelComponentProgressSteps
                                progress={progress}
                                handleSyncCarriagePanel={handleSyncCarriagePanel}
                                carriagePanelComponent={carriagePanelComponent}
                            />
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </DialogContent>
        </Dialog>
    );
}
