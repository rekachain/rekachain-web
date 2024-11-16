import {
    CarriagePanelComponentResource,
    CarriagePanelResource,
    ComponentResource,
} from '@/Support/Interfaces/Resources';
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
import { ChangeEvent, FormEvent, memo, useCallback } from 'react';
import { PaginateResponse } from '@/Support/Interfaces/Others';
import { withLoading } from '@/Utils/withLoading';
import { useLoading } from '@/Contexts/LoadingContext';
import { useForm } from '@inertiajs/react';
import { ServiceFilterOptions } from '@/Support/Interfaces/Others/ServiceFilterOptions';
import { Separator } from '@/Components/UI/separator';
import { useLaravelReactI18n } from 'laravel-react-i18n';
import GenericDataSelector from '@/Components/GenericDataSelector';
import { rawMaterialService } from '@/Services/rawMaterialService';
import { STYLING } from '@/Support/Constants/styling';
import { carriagePanelComponentService } from '@/Services/carriagePanelComponentService';
import { useSuccessToast } from '@/Hooks/useToast';

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
        void useSuccessToast('Komponen berhasil ditambahkan');
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
                Tambah Raw Material
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{data.new_raw_material_code}</DialogTitle>
                    <DialogDescription></DialogDescription>
                    <form onSubmit={handleAddComponetRawMaterial} className="flex flex-col gap-4">
                        <div className="flex flex-col bg-background-2 gap-4 p-4">
                            <Label htmlFor="raw_material_id">Raw Material</Label>
                            <div className="flex gap-2">
                                <GenericDataSelector
                                    id="raw_material_id"
                                    fetchData={fetchRawMaterials}
                                    setSelectedData={id => setData('raw_material_id', id)}
                                    selectedDataId={data.raw_material_id}
                                    placeholder={'Pilih Raw Material'}
                                    renderItem={item => item.description}
                                    labelKey={'description'}
                                    nullable
                                />
                                <Button type="button" variant="ghost" onClick={handleResetRawMaterialId}>
                                    <RefreshCcw size={STYLING.ICON.SIZE.SMALL} />
                                </Button>
                            </div>
                        </div>

                        <Separator />

                        <div className="flex flex-col gap-4 bg-background-2 p-4">
                            <div className="flex flex-col gap-2">
                                <Label>Nama Raw Material</Label>
                                <Input
                                    type="text"
                                    value={data.new_raw_material_code}
                                    onChange={handleChangeNewComponentName}
                                    disabled={data.raw_material_id !== null}
                                    required
                                />
                            </div>
                            
                            <div className="flex flex-col gap-2">
                                <Label>Nama Raw Material</Label>
                                <Input
                                    type="text"
                                    value={data.new_raw_material_code}
                                    onChange={handleChangeNewComponentName}
                                    disabled={data.raw_material_id !== null}
                                    required
                                />
                            </div>
                            <Label htmlFor="new-component-description">Deskripsi Raw Material</Label>
                            <Textarea
                                id="new-component-description"
                                className="p-2 rounded"
                                value={data.new_raw_material_description}
                                onChange={e => setData('new_raw_material_description', e.target.value)}
                                disabled={data.raw_material_id !== null}
                            />
                            <Label htmlFor="new-component-unit">Satuan</Label>
                            <Input
                                id="new-component-unit"
                                type="text"
                                value={data.new_raw_material_unit}
                                onChange={e => setData('new_raw_material_unit', e.target.value)}
                                disabled={data.raw_material_id !== null}
                            />
                            <Label htmlFor="new-component-specs">Spesifikasi</Label>
                            <Textarea
                                id="new-component-specs"
                                className="p-2 rounded"
                                value={data.new_raw_material_specs}
                                onChange={e => setData('new_raw_material_specs', e.target.value)}
                                disabled={data.raw_material_id !== null}
                            />
                            <Label htmlFor="new-component-qty">Jumlah Komponen</Label>
                            <Input
                                id="new-component-qty"
                                type="number"
                                min={1}
                                value={data.new_raw_material_qty}
                                onChange={e => setData('new_raw_material_qty', +e.target.value)}
                                required
                            />
                        </div>

                        <Button type="submit" disabled={loading}>
                            {loading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
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
