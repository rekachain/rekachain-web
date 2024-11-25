import { Button } from '@/Components/UI/button';
import { Label } from '@/Components/UI/label';
import { CarriagePanelComponentResource, ProgressResource, StepResource } from '@/Support/Interfaces/Resources';
import { FormEvent, useCallback, useEffect, useState } from 'react';
import { progressService } from '@/Services/progressService';
import { useForm } from '@inertiajs/react';
import { Input } from '@/Components/UI/input';
import { useLaravelReactI18n } from 'laravel-react-i18n';
import { withLoading } from '@/Utils/withLoading';
import { progressStepService } from '@/Services/progressStepService';
import { PaginateResponse, ServiceFilterOptions } from '@/Support/Interfaces/Others';
import { stepService } from '@/Services/stepService';
import GenericDataSelector from '@/Components/GenericDataSelector';
import { RefreshCcw } from 'lucide-react';
import { useSuccessToast } from '@/Hooks/useToast';
import { useDebounce } from '@uidotdev/usehooks';

export default function ({
    carriagePanelComponent,
    handleSyncCarriagePanel,
    progress,
}: {
    carriagePanelComponent: CarriagePanelComponentResource;
    handleSyncCarriagePanel: () => Promise<void>;
    progress: ProgressResource;
}) {
    const { t } = useLaravelReactI18n();

    const { data, setData } = useForm({
        progress_id: null as number | null,
        step_id: null as number | null,
        step_name: '',
        step_process: '',
        step_estimated_time: 0,
    });

    const [stepResponse, setStepResponse] = useState<PaginateResponse<StepResource>>();
    const [searchStep, setSearchStep] = useState<string>('');

    const handleSyncSteps = useCallback(async (filters: ServiceFilterOptions) => {
        const res = await stepService.getAll(filters);
        setStepResponse(res);
    }, []);

    const debouncedSearchStep = useDebounce(searchStep, 300);

    useEffect(() => {
        void handleSyncSteps({ search: debouncedSearchStep });
    }, [debouncedSearchStep, handleSyncSteps]);

    useEffect(() => {
        const step = stepResponse?.data.find(step => step.id === data.step_id);
        if (step) {
            setData(previousData => ({
                ...previousData,
                step_name: step.name,
                step_process: step.process,
                step_estimated_time: step.estimated_time,
            }));
        } else {
            setData(previousData => ({
                ...previousData,
                step_name: '',
                step_process: '',
                step_estimated_time: 0,
            }));
        }
    }, [data.step_id]);

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
        void useSuccessToast(
            t(
                'pages.project.trainset.carriage_trainset.carriage_panel.carriage_panel_component.partials.partials.components.partials.carriage_panel_component_progress_steps.messages.created',
            ),
        );
    }, true);

    const handleProgressStepDeletion = withLoading(async (progressStepId: number) => {
        await progressStepService.delete(progressStepId);
        await handleSyncCarriagePanel();
        void useSuccessToast(
            t(
                'pages.project.trainset.carriage_trainset.carriage_panel.carriage_panel_component.partials.partials.components.partials.carriage_panel_component_progress_steps.messages.deleted',
            ),
        );
    }, true);

    const handleResetStepSelectionId = () => {
        setData('step_id', null);
    };

    return (
        <>
            <form onSubmit={handleAddStep}>
                <div className="flex flex-col gap-4">
                    {progress.progress_steps.map((progressStep, i) => (
                        <div key={progressStep.id}>
                            <Label
                                className="hover:line-through cursor-pointer decoration-red-500 decoration-2"
                                onClick={handleProgressStepDeletion.bind(null, progressStep)}
                            >
                                {i + 1}. {progressStep.step.name}
                            </Label>
                        </div>
                    ))}
                </div>
                <div className="flex flex-col gap-4 bg-background-2 p-4 mt-4">
                    <Label htmlFor="name">Step</Label>
                    <div className="flex items-center">
                        <GenericDataSelector
                            id="step_id"
                            onSearchChange={setSearchStep}
                            data={stepResponse?.data}
                            setSelectedData={id => setData('step_id', id)}
                            selectedDataId={data.step_id ?? undefined}
                            placeholder={t(
                                'pages.project.trainset.carriage_trainset.carriage_panel.carriage_panel_component.partials.partials.components.partials.carriage_panel_component_progress_steps.fields.step_placeholder',
                            )}
                            renderItem={(item: StepResource) => item.name}
                            nullable
                        />
                        <Button type="button" variant="ghost" onClick={handleResetStepSelectionId}>
                            <RefreshCcw />
                        </Button>
                    </div>

                    <Label htmlFor="name">
                        {t(
                            'pages.project.trainset.carriage_trainset.carriage_panel.carriage_panel_component.partials.partials.components.partials.carriage_panel_component_progress_steps.fields.name',
                        )}
                    </Label>
                    <Input
                        id="name"
                        placeholder={t(
                            'pages.project.trainset.carriage_trainset.carriage_panel.carriage_panel_component.partials.partials.components.partials.carriage_panel_component_progress_steps.fields.name_placeholder',
                        )}
                        value={data.step_name}
                        onChange={e => setData('step_name', e.target.value)}
                        disabled={data.step_id !== null}
                    />

                    <Label htmlFor="process">
                        {t(
                            'pages.project.trainset.carriage_trainset.carriage_panel.carriage_panel_component.partials.partials.components.partials.carriage_panel_component_progress_steps.fields.process',
                        )}
                    </Label>
                    <Input
                        id="process"
                        placeholder={t(
                            'pages.project.trainset.carriage_trainset.carriage_panel.carriage_panel_component.partials.partials.components.partials.carriage_panel_component_progress_steps.fields.process_placeholder',
                        )}
                        value={data.step_process}
                        onChange={e => setData('step_process', e.target.value)}
                        disabled={data.step_id !== null}
                    />

                    <Label htmlFor="estimated_time">
                        {t(
                            'pages.project.trainset.carriage_trainset.carriage_panel.carriage_panel_component.partials.partials.components.partials.carriage_panel_component_progress_steps.fields.estimated_time',
                        )}
                    </Label>
                    <Input
                        type="number"
                        id="estimated_time"
                        placeholder={t(
                            'pages.project.trainset.carriage_trainset.carriage_panel.carriage_panel_component.partials.partials.components.partials.carriage_panel_component_progress_steps.fields.estimated_time_placeholder',
                        )}
                        value={data.step_estimated_time}
                        onChange={e => setData('step_estimated_time', parseInt(e.target.value))}
                        disabled={data.step_id !== null}
                    />

                    <div className="flex ml-auto">
                        <Button>
                            {t(
                                'pages.project.trainset.carriage_trainset.carriage_panel.carriage_panel_component.partials.partials.components.partials.carriage_panel_component_progress_steps.buttons.add_step',
                            )}
                        </Button>
                    </div>
                </div>
            </form>
        </>
    );
}
