import GenericDataSelector from '@/Components/GenericDataSelector';
import { Button, buttonVariants } from '@/Components/UI/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/Components/UI/dialog';
import { Input } from '@/Components/UI/input';
import { Label } from '@/Components/UI/label';
import { Separator } from '@/Components/UI/separator';
import { Textarea } from '@/Components/UI/textarea';
import { useLoading } from '@/Contexts/LoadingContext';
import { useSuccessToast } from '@/Hooks/useToast';
import { carriagePanelComponentService } from '@/Services/carriagePanelComponentService';
import { rawMaterialService } from '@/Services/rawMaterialService';
import { STYLING } from '@/Support/Constants/styling';
import { PaginateResponse } from '@/Support/Interfaces/Others';
import { ServiceFilterOptions } from '@/Support/Interfaces/Others/ServiceFilterOptions';
import {
    CarriagePanelComponentResource,
    CarriagePanelResource,
    ComponentResource,
} from '@/Support/Interfaces/Resources';
import { withLoading } from '@/Utils/withLoading';
import { useForm } from '@inertiajs/react';
import { useLaravelReactI18n } from 'laravel-react-i18n';
import { Loader2, RefreshCcw } from 'lucide-react';
import { ChangeEvent, FormEvent, memo, useCallback } from 'react';

const AddNewComponentRawMaterial = ({
    componentResource,
    setComponentResource,
    carriagePanel,
    carriagePanelComponent,
    handleSyncCarriagePanelComponent,
}: {
    componentResource: PaginateResponse<ComponentResource>;
    setComponentResource: (componentResponse: PaginateResponse<ComponentResource>) => void;
    carriagePanel: CarriagePanelResource;
    carriagePanelComponent: CarriagePanelComponentResource;
    handleSyncCarriagePanelComponent: () => Promise<void>;
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

    const handleChangeNewComponentName = (e: ChangeEvent<HTMLInputElement>) => {
        setData('new_raw_material_code', e.target.value);
    };

    const handleAddComponetRawMaterial = withLoading(async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        await carriagePanelComponentService.addRawMaterial(
            carriagePanelComponent.id,
            data.raw_material_id,
            data.new_raw_material_code,
            data.new_raw_material_description,
            data.new_raw_material_unit,
            data.new_raw_material_specs,
            data.new_raw_material_qty,
        );
        await handleSyncCarriagePanelComponent();
        reset();
        void useSuccessToast(
            t(
                'pages.project.trainset.carriage_trainset.carriage_panel.carriage_panel_component.component_material.partials.add_new_component_raw_material.messages.created',
            ),
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
                })}
            >
                {t(
                    'pages.project.trainset.carriage_trainset.carriage_panel.carriage_panel_component.component_material.partials.add_new_component_raw_material.buttons.add_new_component_raw_material',
                )}
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{data.new_raw_material_code}</DialogTitle>
                    <DialogDescription></DialogDescription>
                    <form onSubmit={handleAddComponetRawMaterial} className='flex flex-col gap-4'>
                        <div className='flex flex-col gap-4 bg-background-2 p-4'>
                            <Label htmlFor='raw_material_id'>
                                {t(
                                    'pages.project.trainset.carriage_trainset.carriage_panel.carriage_panel_component.component_material.partials.add_new_component_raw_material.dialogs.fields.raw_material',
                                )}
                            </Label>
                            <div className='flex gap-2'>
                                <GenericDataSelector
                                    setSelectedData={(id) => setData('raw_material_id', id)}
                                    selectedDataId={data.raw_material_id}
                                    renderItem={(item) => item.description}
                                    placeholder={t(
                                        'pages.project.trainset.carriage_trainset.carriage_panel.carriage_panel_component.component_material.partials.add_new_component_raw_material.dialogs.fields.raw_material_placeholder',
                                    )}
                                    nullable
                                    labelKey={'description'}
                                    id='raw_material_id'
                                    fetchData={fetchRawMaterials}
                                />
                                <Button
                                    variant='ghost'
                                    type='button'
                                    onClick={handleResetRawMaterialId}
                                >
                                    <RefreshCcw size={STYLING.ICON.SIZE.SMALL} />
                                </Button>
                            </div>
                        </div>

                        <Separator />

                        <div className='flex flex-col gap-4 bg-background-2 p-4'>
                            <div className='flex flex-col gap-2'>
                                <Label>
                                    {t(
                                        'pages.project.trainset.carriage_trainset.carriage_panel.carriage_panel_component.component_material.partials.add_new_component_raw_material.dialogs.fields.new_raw_material_code',
                                    )}
                                </Label>
                                <Input
                                    value={data.new_raw_material_code}
                                    type='text'
                                    required
                                    onChange={handleChangeNewComponentName}
                                    disabled={data.raw_material_id !== null}
                                />
                            </div>

                            <Label htmlFor='new-component-description'>
                                {t(
                                    'pages.project.trainset.carriage_trainset.carriage_panel.carriage_panel_component.component_material.partials.add_new_component_raw_material.dialogs.fields.new_raw_material_description',
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
                                    'pages.project.trainset.carriage_trainset.carriage_panel.carriage_panel_component.component_material.partials.add_new_component_raw_material.dialogs.fields.new_raw_material_unit',
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
                                    'pages.project.trainset.carriage_trainset.carriage_panel.carriage_panel_component.component_material.partials.add_new_component_raw_material.dialogs.fields.new_raw_material_specs',
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
                                    'pages.project.trainset.carriage_trainset.carriage_panel.carriage_panel_component.component_material.partials.add_new_component_raw_material.dialogs.fields.new_raw_material_qty',
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

export default memo(AddNewComponentRawMaterial);
