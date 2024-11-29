import { CarriagePanelResource } from '@/Support/Interfaces/Resources';
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
import { Input } from '@/Components/UI/input';
import { Textarea } from '@/Components/UI/textarea';
import { FormEvent, memo, useCallback } from 'react';
import { withLoading } from '@/Utils/withLoading';
import { useLoading } from '@/Contexts/LoadingContext';
import { useForm } from '@inertiajs/react';
import { ServiceFilterOptions } from '@/Support/Interfaces/Others/ServiceFilterOptions';
import { Separator } from '@/Components/UI/separator';
import { useLaravelReactI18n } from 'laravel-react-i18n';
import GenericDataSelector from '@/Components/GenericDataSelector';
import { rawMaterialService } from '@/Services/rawMaterialService';
import { STYLING } from '@/Support/Constants/styling';
import { useSuccessToast } from '@/Hooks/useToast';
import { carriagePanelService } from '@/Services/carriagePanelService';

const AddNewPanelRawMaterial = ({
    carriagePanel,
    handleSyncCarriagePanel,
}: {
    carriagePanel: CarriagePanelResource;
    handleSyncCarriagePanel: () => Promise<void>;
}) => {
    const { t } = useLaravelReactI18n();
    const { loading } = useLoading();

    const { data, setData, reset } = useForm({
        raw_material_id: null as number | null,
        new_raw_material_code: '',
        new_raw_material_description: '',
        new_raw_material_unit: '',
        new_raw_material_specs: '',
        new_raw_material_qty: 1,
    });

    const fetchRawMaterials = useCallback(async (filters: ServiceFilterOptions) => {
        const res = await rawMaterialService.getAll({ perPage: 10 });
        return res.data;
    }, []);

    const handleAddCarriagePanelRawMaterial = withLoading(async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        await carriagePanelService.addRawMaterial(
            carriagePanel.id,
            data.raw_material_id,
            data.new_raw_material_code,
            data.new_raw_material_description,
            data.new_raw_material_unit,
            data.new_raw_material_specs,
            data.new_raw_material_qty
        );
        await handleSyncCarriagePanel();
        reset();
        void useSuccessToast(
            t(
                'pages.project.trainset.carriage_trainset.carriage_panel.panel_material.partials.add_new_panel_raw_material.messages.panel_material_added'
            )
        );
    });

    const handleResetRawMaterialId = () => {
        setData('raw_material_id', null);
    };

    return (
        <Dialog>
            <DialogTrigger
                className={buttonVariants({
                    className: 'w-full',
                })}>
                {t(
                    'pages.project.trainset.carriage_trainset.carriage_panel.panel_material.partials.add_new_panel_raw_material.dialogs.title'
                )}
            </DialogTrigger>
            <DialogContent className='sm:max-w-[425px]'>
                <DialogHeader>
                    <DialogTitle>{data.new_raw_material_code}</DialogTitle>
                    <DialogDescription></DialogDescription>
                    <form
                        onSubmit={handleAddCarriagePanelRawMaterial}
                        className='flex flex-col gap-4'>
                        <div className='flex flex-col gap-4 bg-background-2 p-4'>
                            <Label htmlFor='raw_material_id'>
                                {t(
                                    'pages.project.trainset.carriage_trainset.carriage_panel.panel_material.partials.add_new_panel_raw_material.dialogs.fields.raw_material'
                                )}
                            </Label>
                            <div className='flex gap-2'>
                                <GenericDataSelector
                                    setSelectedData={(id) => setData('raw_material_id', id)}
                                    selectedDataId={data.raw_material_id}
                                    renderItem={(item) => item.description}
                                    placeholder={t(
                                        'pages.project.trainset.carriage_trainset.carriage_panel.panel_material.partials.add_new_panel_raw_material.dialogs.fields.raw_material_placeholder'
                                    )}
                                    nullable
                                    labelKey={'description'}
                                    id='raw_material_id'
                                    fetchData={fetchRawMaterials}
                                />
                                <Button
                                    variant='ghost'
                                    type='button'
                                    onClick={handleResetRawMaterialId}>
                                    <RefreshCcw size={STYLING.ICON.SIZE.SMALL} />
                                </Button>
                            </div>
                        </div>

                        <Separator />

                        <div className='flex flex-col gap-4 bg-background-2 p-4'>
                            <div className='flex flex-col gap-2'>
                                <Label>
                                    {t(
                                        'pages.project.trainset.carriage_trainset.carriage_panel.panel_material.partials.add_new_panel_raw_material.dialogs.fields.new_raw_material_code'
                                    )}
                                </Label>
                                <Input
                                    value={data.new_raw_material_code}
                                    type='text'
                                    required
                                    onChange={(e) =>
                                        setData('new_raw_material_code', e.target.value)
                                    }
                                    disabled={data.raw_material_id !== null}
                                />
                            </div>

                            <Label htmlFor='new-component-description'>
                                {t(
                                    'pages.project.trainset.carriage_trainset.carriage_panel.panel_material.partials.add_new_panel_raw_material.dialogs.fields.new_raw_material_description'
                                )}
                            </Label>
                            <Textarea
                                value={data.new_raw_material_description}
                                onChange={(e) =>
                                    setData('new_raw_material_description', e.target.value)
                                }
                                id='new-component-description'
                                disabled={data.raw_material_id !== null}
                                className='rounded p-2'
                            />
                            <Label htmlFor='new-component-unit'>
                                {t(
                                    'pages.project.trainset.carriage_trainset.carriage_panel.panel_material.partials.add_new_panel_raw_material.dialogs.fields.new_raw_material_unit'
                                )}
                            </Label>
                            <Input
                                value={data.new_raw_material_unit}
                                type='text'
                                onChange={(e) => setData('new_raw_material_unit', e.target.value)}
                                id='new-component-unit'
                                disabled={data.raw_material_id !== null}
                            />
                            <Label htmlFor='new-component-specs'>
                                {t(
                                    'pages.project.trainset.carriage_trainset.carriage_panel.panel_material.partials.add_new_panel_raw_material.dialogs.fields.new_raw_material_specs'
                                )}
                            </Label>
                            <Textarea
                                value={data.new_raw_material_specs}
                                onChange={(e) => setData('new_raw_material_specs', e.target.value)}
                                id='new-component-specs'
                                disabled={data.raw_material_id !== null}
                                className='rounded p-2'
                            />
                            <Label htmlFor='new-component-qty'>
                                {t(
                                    'pages.project.trainset.carriage_trainset.carriage_panel.panel_material.partials.add_new_panel_raw_material.dialogs.fields.new_raw_material_qty'
                                )}
                            </Label>
                            <Input
                                value={data.new_raw_material_qty}
                                type='number'
                                required
                                onChange={(e) => setData('new_raw_material_qty', +e.target.value)}
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

export default memo(AddNewPanelRawMaterial);
