import GenericDataSelector from '@/Components/GenericDataSelector';
import InputLabel from '@/Components/InputLabel';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/Components/UI/accordion';
import { Button } from '@/Components/UI/button';
import { Input } from '@/Components/UI/input';
import { Label } from '@/Components/UI/label';
import { RadioGroup, RadioGroupItem } from '@/Components/UI/radio-group';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from '@/Components/UI/select';
import { useLoading } from '@/Contexts/LoadingContext';
import { useSuccessToast } from '@/Hooks/useToast';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { componentService } from '@/Services/componentService';
import { panelService } from '@/Services/panelService';
import { returnedProductService } from '@/Services/returnedProductService';
import { ROUTES } from '@/Support/Constants/routes';
import { ReturnedProductStatusEnum } from '@/Support/Enums/returnedProductStatusEnum';
import { ServiceFilterOptions } from '@/Support/Interfaces/Others';
import {
    ComponentResource,
    PanelResource,
    ReturnedProductResource,
} from '@/Support/Interfaces/Resources';
import { withLoading } from '@/Utils/withLoading';
import { Head, router, useForm } from '@inertiajs/react';
import { useLaravelReactI18n } from 'laravel-react-i18n';
import { FormEventHandler, useCallback, useEffect } from 'react';
import { FilePond } from 'react-filepond';
import BuyerForm from './Partials/BuyerForm';

export default function ({ returnedProduct }: { returnedProduct: ReturnedProductResource }) {
    const { t } = useLaravelReactI18n();
    const { data, setData } = useForm({
        product_returnable_id: returnedProduct.product_returnable_id as number | null,
        product_returnable_type:
            returnedProduct.product_returnable_type === 'App\\Models\\Component'
                ? 'component'
                : ('panel' as string),
        qty: returnedProduct.qty as number,
        serial_number: returnedProduct.serial_number as number | null,
        buyer_id: returnedProduct.buyer_id as number | null,
        image_path: [] as any[],
        status: returnedProduct.status as string,
    });

    useEffect(() => {
        if (returnedProduct.image_path)
            setData('image_path', [
                {
                    source: returnedProduct.image,
                    options: {
                        type: 'local',
                        file: {
                            name: 'Returned Product Evidence',
                            size: null,
                            type: 'image/jpeg',
                        },
                        metadata: {
                            poster: returnedProduct.image,
                        },
                    },
                },
            ]);
    }, [returnedProduct.image]);

    const { loading } = useLoading();

    const handleFileChange = (fileItems: any) => {
        setData((prevData: any) => ({
            ...prevData,
            image_path: fileItems.map((fileItem: any) => fileItem.file),
        }));
    };

    const submit: FormEventHandler = withLoading(async (e) => {
        e.preventDefault();
        const validImageTypes = ['image/jpeg', 'image/png', 'image/gif'];
        const validImages = data.image_path.filter(
            (file) => file.size !== null && validImageTypes.includes(file.type),
        );

        const productReturnableType =
            data.product_returnable_type === 'component'
                ? 'App\\Models\\Component'
                : 'App\\Models\\Panel';

        const formData = new FormData();
        formData.append('product_returnable_id', data.product_returnable_id?.toString() || '');
        formData.append('product_returnable_type', productReturnableType);
        data.qty && formData.append('qty', data.qty.toString());
        data.serial_number &&
            formData.append('serial_number', data.serial_number?.toString() || '');
        formData.append('buyer_id', data.buyer_id?.toString() || '');
        validImages.length > 0 && formData.append('image_path', validImages[0]);
        formData.append('status', data.status);

        await returnedProductService.update(returnedProduct.id, formData);
        router.visit(route(`${ROUTES.RETURNED_PRODUCTS}.show`, returnedProduct.id));
        void useSuccessToast(t('pages.returned_product.edit.messages.updated'));
    });

    const fetchComponents = useCallback(async (filters: ServiceFilterOptions) => {
        return await componentService.getAll(filters).then((response) => response.data);
    }, []);

    const fetchPanels = useCallback(async (filters: ServiceFilterOptions) => {
        return await panelService.getAll(filters).then((response) => response.data);
    }, []);

    return (
        <>
            <Head
                title={t('pages.returned_product.edit.title', {
                    name: returnedProduct.product_return?.name || '',
                })}
            />
            <AuthenticatedLayout>
                <div className='p-4'>
                    <div className='flex items-center gap-5'>
                        <h1 className='text-page-header my-4'>
                            {t('pages.returned_product.edit.title', {
                                name: returnedProduct.product_return?.name || '',
                            })}
                        </h1>
                    </div>

                    <form
                        onSubmit={submit}
                        id='returned-product-form'
                        encType='multipart/form-data'
                    >
                        {' '}
                    </form>
                    <div className='mt-4 space-y-2 rounded bg-background-2 p-4'>
                        <h2 className='text-lg font-semibold'>
                            {t('pages.returned_product.edit.fields.type')}
                        </h2>
                        <RadioGroup
                            onValueChange={(v) => setData('product_returnable_type', v)}
                            defaultValue={data.product_returnable_type}
                        >
                            <div key={'component_type'} className='flex items-center space-x-2'>
                                <RadioGroupItem value={'component'} id={`type.component`} />
                                <Label htmlFor={`type.component`}>{'Komponen'}</Label>
                            </div>
                            <div key={'panel_type'} className='flex items-center space-x-2'>
                                <RadioGroupItem value={'panel'} id={`type.panel`} />
                                <Label htmlFor={`type.panel`}>{'Panel'}</Label>
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
                                    selectedDataId={data.product_returnable_id}
                                    renderItem={(item: ComponentResource) => `${item.name}`} // Customize how to display the item
                                    popoverContentClassName='w-[400px] p-0'
                                    placeholder={'Pilih Komponen'}
                                    nullable
                                    initialSearch={returnedProduct.product_return?.name}
                                    id='component_product_returnable_id'
                                    fetchData={fetchComponents}
                                    buttonClassName='mt-1'
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
                                    selectedDataId={data.product_returnable_id}
                                    renderItem={(item: PanelResource) => `${item.name}`} // Customize how to display the item
                                    popoverContentClassName='w-[400px] p-0'
                                    placeholder={'Pilih Panel'}
                                    nullable
                                    initialSearch={returnedProduct.product_return?.name}
                                    id='panel_product_returnable_id'
                                    fetchData={fetchPanels}
                                    buttonClassName='mt-1'
                                />
                            </>
                        )}
                    </div>

                    <div className='mt-4'>
                        <InputLabel value={'Jumlah'} htmlFor='qty' />
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
                        <InputLabel value={'Nomor Seri'} htmlFor='serial_number' />
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
                    <div className='mt-4'>
                        <InputLabel
                            value={t('pages.returned_product.create.fields.evidence')}
                            htmlFor='evidence'
                        />
                        <FilePond
                            onupdatefiles={handleFileChange}
                            labelIdle={t(
                                'pages.returned_product.create.fields.evidence_filepond_placeholder',
                            )}
                            imagePreviewMaxHeight={400}
                            files={data.image_path}
                            filePosterMaxHeight={400}
                        />
                    </div>
                    <div className='mt-4'>
                        <InputLabel
                            value={t(
                                'pages.product_restock.partials.partials.filters.status.title',
                            )}
                            htmlFor='status'
                        />
                        <Select
                            value={data.status as string}
                            onValueChange={(value) =>
                                setData('status', value as ReturnedProductStatusEnum)
                            }
                        >
                            <SelectTrigger className='w-full'>
                                <SelectValue
                                    placeholder={t(
                                        'pages.product_restock.partials.partials.filters.status.title',
                                    )}
                                />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>
                                        {t(
                                            'pages.product_restock.partials.partials.filters.status.title',
                                        )}
                                    </SelectLabel>
                                    {Object.entries(ReturnedProductStatusEnum)
                                        .filter(([key, status]) =>
                                            returnedProduct.status !==
                                            ReturnedProductStatusEnum.REQUESTED
                                                ? ![ReturnedProductStatusEnum.REQUESTED].includes(
                                                      status,
                                                  )
                                                : true,
                                        )
                                        .map(([key, status]) => (
                                            <SelectItem value={status} key={key}>
                                                {t(
                                                    `enums.App\\Support\\Enums\\ReturnedProductStatusEnum.${status}`,
                                                )}
                                            </SelectItem>
                                        ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>

                    <Accordion
                        type='single'
                        defaultValue={data.buyer_id ? 'item-1' : ''}
                        collapsible
                        className='mt-4'
                    >
                        <AccordionItem value='item-1'>
                            <AccordionTrigger>
                                {t('pages.project.create.fields.buyer_selection')}
                            </AccordionTrigger>
                            <AccordionContent>
                                <BuyerForm
                                    setBuyerId={(buyer_id: number) => setData('buyer_id', buyer_id)}
                                    buyer={returnedProduct.buyer}
                                />
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>

                    <Button form='returned-product-form' disabled={loading} className='mt-4'>
                        {t('pages.returned_product.edit.buttons.submit')}
                    </Button>
                </div>
            </AuthenticatedLayout>
        </>
    );
}
