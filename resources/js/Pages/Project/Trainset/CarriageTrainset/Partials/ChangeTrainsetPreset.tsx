import { SelectGroup } from '@/Components/UI/select';
import { Button } from '@/Components/UI/button';
import { Loader2 } from 'lucide-react';
import { FormEvent, useCallback, useEffect } from 'react';
import { PresetTrainsetResource, TrainsetResource } from '@/Support/Interfaces/Resources';
import { withLoading } from '@/Utils/withLoading';
import { trainsetService } from '@/Services/trainsetService';
import { useSuccessToast } from '@/Hooks/useToast';
import { presetTrainsetService } from '@/Services/presetTrainsetService';
import { useForm } from '@inertiajs/react';
import { ServiceFilterOptions } from '@/Support/Interfaces/Others/ServiceFilterOptions';
import { useLoading } from '@/Contexts/LoadingContext';
import { useLaravelReactI18n } from 'laravel-react-i18n';
import GenericDataSelector from '@/Components/GenericDataSelector';

const ChangeTrainsetPreset = ({
    trainset,
    presetTrainset,
    handleSyncTrainset,
}: {
    trainset: TrainsetResource;
    presetTrainset: PresetTrainsetResource[];
    handleSyncTrainset: () => Promise<void>;
}) => {
    const { t } = useLaravelReactI18n();
    const { loading } = useLoading();
    const { data, setData } = useForm({
        preset_trainset_id: trainset.preset_trainset_id as number | null,
    });

    useEffect(() => {
        setData('preset_trainset_id', trainset.preset_trainset_id ?? 0);
    }, [trainset]);

    const selectedPreset = presetTrainset.find(preset => preset.id === data.preset_trainset_id);

    const handleChangePreset = withLoading(async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (data.preset_trainset_id) {
            await trainsetService.changePreset(trainset.id, data.preset_trainset_id);
            await handleSyncTrainset();
            void useSuccessToast(
                t('pages.project.trainset.carriage_trainset.partials.change_trainset_preset.messages.changed'),
            );
        }
    });

    const fetchPresetTrainsets = useCallback(async (filters: ServiceFilterOptions) => {
        return await presetTrainsetService
            .getAll({
                ...filters,
                relations: 'carriage_presets.carriage',
            })
            .then(response => response.data);
    }, []);

    const handleDeletePresetTrainset = withLoading(async () => {
        if (data.preset_trainset_id) {
            await presetTrainsetService.delete(data.preset_trainset_id);
            void useSuccessToast(
                t('pages.project.trainset.carriage_trainset.partials.change_trainset_preset.messages.preset_deleted'),
            );
            await handleSyncTrainset();
        }
    }, true);

    return (
        <form onSubmit={handleChangePreset} className="flex gap-2">
            <SelectGroup>
                <div className="md:flex w-full md:flex-row gap-2">
                    <GenericDataSelector
                        id="preset-trainset_id"
                        fetchData={fetchPresetTrainsets}
                        setSelectedData={id => setData('preset_trainset_id', id)}
                        selectedDataId={data.preset_trainset_id}
                        placeholder={t(
                            'pages.project.trainset.carriage_trainset.partials.change_trainset_preset.fields.preset_trainset_placeholder',
                        )}
                        renderItem={(item: PresetTrainsetResource) => {
                            return `${item.name} (${item.carriage_presets.map((c, i) => {
                                return `${c.qty} ${c.carriage.type}${i < item.carriage_presets!.length - 1 ? ' + ' : ''}`;
                            })})`;
                        }}
                        customLabel={(item: PresetTrainsetResource) => {
                            return `${item.name} (${item.carriage_presets.map((c, i) => {
                                return `${c.qty} ${c.carriage.type}${i < item.carriage_presets!.length - 1 ? ' + ' : ''}`;
                            })})`;
                        }}
                        initialSearch={trainset?.preset_name}
                        nullable
                    />

                    <div className="flex gap-2 mt-3 md:mt-0 items-center ">
                        <Button
                            type="submit"
                            disabled={
                                loading ||
                                !data.preset_trainset_id ||
                                data.preset_trainset_id === trainset.preset_trainset_id
                            }
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    {t('action.loading')}
                                </>
                            ) : (
                                t(
                                    'pages.project.trainset.carriage_trainset.partials.change_trainset_preset.buttons.change_preset',
                                )
                            )}
                        </Button>
                        <Button
                            type="button"
                            variant="destructive"
                            disabled={
                                loading || !data.preset_trainset_id || (selectedPreset && selectedPreset.has_trainsets)
                            }
                            onClick={handleDeletePresetTrainset}
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    {t('action.loading')}
                                </>
                            ) : (
                                t(
                                    'pages.project.trainset.carriage_trainset.partials.change_trainset_preset.buttons.delete_preset',
                                )
                            )}
                        </Button>
                    </div>
                </div>
            </SelectGroup>
        </form>
    );
};

export default ChangeTrainsetPreset;