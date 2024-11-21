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
import { useEffect, useState } from 'react';
import { PaginateResponse, ServiceFilterOptions } from '@/Support/Interfaces/Others';
import { useDebounce } from '@uidotdev/usehooks';
import { withLoading } from '@/Utils/withLoading';
import { progressService } from '@/Services/progressService';
import { useLaravelReactI18n } from 'laravel-react-i18n';
import CarriagePanelComponentProgress from '@/Pages/Project/Trainset/CarriageTrainset/CarriagePanel/CarriagePanelComponent/Partials/Partials/Components/Partials/CarriagePanelComponentProgress';
import CarriagePanelComponentProgressSteps from '@/Pages/Project/Trainset/CarriageTrainset/CarriagePanel/CarriagePanelComponent/Partials/Partials/Components/Partials/CarriagePanelComponentProgressSteps';

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

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="link">
                    {t(
                        'pages.project.trainset.carriage_trainset.carriage_panel.carriage_panel_component.partials.partials.components.carriage_panel_component_progress.buttons.progress',
                    )}
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>{progress.name}</DialogTitle>
                    <DialogDescription></DialogDescription>
                </DialogHeader>
                <Accordion type="single" collapsible>
                    <AccordionItem value="item-1">
                        <AccordionTrigger>
                            {t(
                                'pages.project.trainset.carriage_trainset.carriage_panel.carriage_panel_component.partials.partials.components.carriage_panel_component_progress.accordions.progress',
                            )}
                        </AccordionTrigger>
                        <AccordionContent>
                            <CarriagePanelComponentProgress
                                progress={progress}
                                handleSyncCarriagePanel={handleSyncCarriagePanel}
                                carriagePanelComponent={carriagePanelComponent}
                            />
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                        <AccordionTrigger>
                            {t(
                                'pages.project.trainset.carriage_trainset.carriage_panel.carriage_panel_component.partials.partials.components.carriage_panel_component_progress.accordions.progress_steps',
                            )}
                        </AccordionTrigger>
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
