import GenericDataSelector from '@/Components/GenericDataSelector';
import InputLabel from '@/Components/InputLabel';
import { Button } from '@/Components/UI/button';
import { Input } from '@/Components/UI/input';
import { Label } from '@/Components/UI/label';
import { RadioGroup, RadioGroupItem } from '@/Components/UI/radio-group';
import { useLoading } from '@/Contexts/LoadingContext';
import { useSuccessToast } from '@/Hooks/useToast';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { componentService } from '@/Services/componentService';
import { panelService } from '@/Services/panelService';
import { returnedProductService } from '@/Services/returnedProductService';
import { userService } from '@/Services/userService';
import { ROUTES } from '@/Support/Constants/routes';
import { ServiceFilterOptions } from '@/Support/Interfaces/Others';
import { ComponentResource, PanelResource } from '@/Support/Interfaces/Resources';
import { withLoading } from '@/Utils/withLoading';
import { Head, router, useForm } from '@inertiajs/react';
import { useLaravelReactI18n } from 'laravel-react-i18n';
import { FormEventHandler, useCallback } from 'react';

export default function () {
    const { t } = useLaravelReactI18n();
    const { data, setData } = useForm<{
        product_returnable_id: number | null;
        product_returnable_type: string;
        qty: number;
        serial_number: number | null;
        buyer_id: number | null;
    }>({
        product_returnable_id: null,
        product_returnable_type: 'component',
        qty: 1,
        serial_number: null,
        buyer_id: null,
    });

    const { loading } = useLoading();

    const submit: FormEventHandler = withLoading(async (e) => {
        e.preventDefault();

        const productReturnableType =
            data.product_returnable_type === 'component'
                ? 'App\\Models\\Component'
                : 'App\\Models\\Panel';

        await returnedProductService.create({
            ...data,
            product_returnable_type: productReturnableType,
        });
        router.visit(route(`${ROUTES.RETURNED_PRODUCTS}.index`));
        void useSuccessToast(t('pages.returned_product.create.messages.created'));
    });

    const fetchComponents = useCallback(async (filters: ServiceFilterOptions) => {
        return await componentService.getAll(filters).then((response) => response.data);
    }, []);

    const fetchPanels = useCallback(async (filters: ServiceFilterOptions) => {
        return await panelService.getAll(filters).then((response) => response.data);
    }, []);

    const fetchBuyers = useCallback(async (filters: ServiceFilterOptions) => {
        return await userService.getAll(filters).then((response) => response.data);
    }, []);

    return (
        <>
            <Head title={t('pages.returned_product.create.title')} />
            <AuthenticatedLayout>
                <div className='p-4'>
                    <div className='flex items-center gap-5'>
                        <h1 className='text-page-header my-4'>
                            {t('pages.returned_product.create.title')}
                        </h1>
                    </div>

                    <form onSubmit={submit} encType='multipart/form-data'>
                        <div className='mt-4 space-y-2 rounded bg-background-2 p-4'>
                            <h2 className='text-lg font-semibold'>
                                {t('pages.returned_product.create.fields.type')}
                            </h2>
                            <RadioGroup
                                defaultValue={'component'}
                                onValueChange={(v) => {
                                    setData('product_returnable_type', v);
                                    setData('product_returnable_id', null);
                                }}
                            >
                                <div key={'component_type'} className='flex items-center space-x-2'>
                                    <RadioGroupItem
                                        value={'component'}
                                        id={`type.component`}
                                    />
                                    <Label htmlFor={`type.component`}>
                                        {'Komponen'}
                                    </Label>
                                </div>
                                <div key={'panel_type'} className='flex items-center space-x-2'>
                                    <RadioGroupItem
                                        value={'panel'}
                                        id={`type.panel`}
                                    />
                                    <Label htmlFor={`type.panel`}>
                                        {'Panel'}
                                    </Label>
                                </div>
                            </RadioGroup>
                        </div>
                        <div className='mt-4'>
                            {data.product_returnable_type === 'component' ? (
                                <>
                                    <InputLabel
                                        value={'Pilih Komponen'}
                                        htmlFor='component_product_returnable_id'
                                    />
                                    <GenericDataSelector
                                        setSelectedData={(id) => setData('product_returnable_id', id)}
                                        selectedDataId={data.product_returnable_id ?? undefined}
                                        renderItem={(item: ComponentResource) =>
                                            `${item.name}`
                                        } // Customize how to display the item
                                        placeholder={'Pilih Komponen'}
                                        nullable
                                        id='component_product_returnable_id'
                                        fetchData={fetchComponents}
                                        buttonClassName='mt-1'
                                        popoverContentClassName='w-[400px] p-0'
                                    />
                                </>
                            ) : (
                                <>
                                    <InputLabel
                                        value={'Pilih Panel'}
                                        htmlFor='panel_product_returnable_id'
                                    />
                                    <GenericDataSelector
                                        setSelectedData={(id) => setData('product_returnable_id', id)}
                                        selectedDataId={data.product_returnable_id ?? undefined}
                                        renderItem={(item: PanelResource) =>
                                            `${item.name}`
                                        } // Customize how to display the item
                                        placeholder={'Pilih Panel'}
                                        nullable
                                        id='panel_product_returnable_id'
                                        fetchData={fetchPanels}
                                        buttonClassName='mt-1'
                                        popoverContentClassName='w-[400px] p-0'
                                    />
                                </>
                            )}
                        </div>

                        <div className='mt-4'>
                            <InputLabel
                                value={'Jumlah'}
                                htmlFor='qty'
                            />
                            <Input
                                value={data.qty}
                                type='number'
                                onChange={(e) => setData('qty', +e.target.value)}
                                name='qty'
                                id='qty'
                                className='mt-1'
                                autoComplete='qty'
                            />
                        </div>

                        <div className='mt-4'>
                            <InputLabel
                                value={'Nomor Seri'}
                                htmlFor='serial_number'
                            />
                            <Input
                                value={data.serial_number ?? undefined}
                                type='number'
                                onChange={(e) => setData('serial_number', +e.target.value)}
                                name='serial_number'
                                id='serial_number'
                                className='mt-1'
                                autoComplete='serial_number'
                            />
                        </div>

                        <Button disabled={loading} className='mt-4'>
                            {t('pages.returned_product.create.buttons.submit')}
                        </Button>
                    </form>
                </div>
            </AuthenticatedLayout>
        </>
    );
}
