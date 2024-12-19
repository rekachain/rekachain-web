import GenericDataSelector from '@/Components/GenericDataSelector';
import { Button } from '@/Components/UI/button';
import { SelectGroup } from '@/Components/UI/select';
import { useLoading } from '@/Contexts/LoadingContext';
import { useSuccessToast } from '@/Hooks/useToast';
import { presetTrainsetService } from '@/Services/presetTrainsetService';
import { trainsetService } from '@/Services/trainsetService';
import { ServiceFilterOptions } from '@/Support/Interfaces/Others/ServiceFilterOptions';
import { PresetTrainsetResource, TrainsetResource } from '@/Support/Interfaces/Resources';
import { withLoading } from '@/Utils/withLoading';
import { useForm } from '@inertiajs/react';
import { useLaravelReactI18n } from 'laravel-react-i18n';
import { Loader2 } from 'lucide-react';
import { FormEvent, useCallback, useEffect } from 'react';

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

    const selectedPreset = presetTrainset.find((preset) => preset.id === data.preset_trainset_id);

    const handleChangePreset = withLoading(async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (data.preset_trainset_id) {
            await trainsetService.changePreset(trainset.id, data.preset_trainset_id);
            await handleSyncTrainset();
            void useSuccessToast(
                t(
                    'pages.project.trainset.carriage_trainset.partials.change_trainset_preset.messages.changed',
                ),
            );
        }
    });

    const fetchPresetTrainsets = useCallback(async (filters: ServiceFilterOptions) => {
        return await presetTrainsetService
            .getAll({
                ...filters,
                relations: 'carriage_presets.carriage',
            })
            .then((response) => response.data);
    }, []);

    const handleDeletePresetTrainset = withLoading(async () => {
        if (data.preset_trainset_id) {
            await presetTrainsetService.delete(data.preset_trainset_id);
            void useSuccessToast(
                t(
                    'pages.project.trainset.carriage_trainset.partials.change_trainset_preset.messages.preset_deleted',
                ),
            );
            await handleSyncTrainset();
        }
    }, true);

    return (
        <form onSubmit={handleChangePreset} className='flex gap-2'>
            <SelectGroup>
                <div className='w-full gap-2 md:flex md:flex-row'>
                    <GenericDataSelector
                        setSelectedData={(id) => setData('preset_trainset_id', id)}
                        selectedDataId={data.preset_trainset_id}
                        renderItem={(item: PresetTrainsetResource) => {
                            return `${item.name} (${item.carriage_presets.map((c, i) => {
                                return `${c.qty} ${c.carriage.type}${i < item.carriage_presets!.length - 1 ? ' + ' : ''}`;
                            })})`;
                        }}
                        placeholder={t(
                            'pages.project.trainset.carriage_trainset.partials.change_trainset_preset.fields.preset_trainset_placeholder',
                        )}
                        nullable
                        initialSearch={trainset?.preset_name}
                        id='preset-trainset_id'
                        fetchData={fetchPresetTrainsets}
                        customLabel={(item: PresetTrainsetResource) => {
                            return `${item.name} (${item.carriage_presets.map((c, i) => {
                                return `${c.qty} ${c.carriage.type}${i < item.carriage_presets!.length - 1 ? ' + ' : ''}`;
                            })})`;
                        }}
                    />

                    <div className='mt-3 flex items-center gap-2 md:mt-0'>
                        <Button
                            type='submit'
                            disabled={
                                loading ||
                                !data.preset_trainset_id ||
                                data.preset_trainset_id === trainset.preset_trainset_id
                            }
                        >
                            {loading ? (
                                <>
                                    <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                                    {t('action.loading')}
                                </>
                            ) : (
                                t(
                                    'pages.project.trainset.carriage_trainset.partials.change_trainset_preset.buttons.change_preset',
                                )
                            )}
                        </Button>
                        <Button
                            variant='destructive'
                            type='button'
                            onClick={handleDeletePresetTrainset}
                            disabled={
                                loading ||
                                !data.preset_trainset_id ||
                                (selectedPreset && selectedPreset.has_trainsets)
                            }
                        >
                            {loading ? (
                                <>
                                    <Loader2 className='mr-2 h-4 w-4 animate-spin' />
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
