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
import { useLoading } from '@/Contexts/LoadingContext';
import { useSuccessToast } from '@/Hooks/useToast';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { componentService } from '@/Services/componentService';
import { panelService } from '@/Services/panelService';
import { returnedProductService } from '@/Services/returnedProductService';
import { ROUTES } from '@/Support/Constants/routes';
import { ServiceFilterOptions } from '@/Support/Interfaces/Others';
import { ComponentResource, PanelResource } from '@/Support/Interfaces/Resources';
import { withLoading } from '@/Utils/withLoading';
import { Head, router, useForm } from '@inertiajs/react';
import { useLaravelReactI18n } from 'laravel-react-i18n';
import { FormEventHandler, useCallback, useEffect } from 'react';
import BuyerForm from './Partials/BuyerForm';
import { FilePond } from 'react-filepond';
import { Textarea } from '@/Components/UI/textarea';
import { IntentEnum } from '@/Support/Enums/intentEnum';

export default function () {
    const { t } = useLaravelReactI18n();
    const { data, setData, progress } = useForm<{
        product_returnable_id: number | null;
        product_returnable_type: string;
        qty: number;
        serial_number: number | null;
        buyer_id: number | null;
        image_path: any[];
        note: string;
    }>({
        product_returnable_id: null,
        product_returnable_type: 'component',
        qty: 1,
        serial_number: null,
        buyer_id: null,
        image_path: [],
        note: '',
    });

    const { loading } = useLoading();
    
    const handleFileChange = (fileItems: any) => {
        setData((prevData: any) => ({
            ...prevData,
            image_path: fileItems.map((fileItem: any) => fileItem.file),
        }));
    };

    const submit: FormEventHandler = withLoading(async (e) => {
        e.preventDefault();

        const productReturnableType =
            data.product_returnable_type === 'component'
                ? 'App\\Models\\Component'
                : 'App\\Models\\Panel';

        const formData = new FormData();
        formData.append('intent', IntentEnum.WEB_RETURNED_PRODUCT_ADD_RETURNED_PRODUCT_WITH_NOTE);
        formData.append('product_returnable_id', data.product_returnable_id?.toString() ?? '');
        formData.append('product_returnable_type', productReturnableType);
        formData.append('qty', data.qty?.toString() ?? '');
        formData.append('serial_number', data.serial_number?.toString() ?? '');
        formData.append('buyer_id', data.buyer_id?.toString() ?? '');
        formData.append('image_path', data.image_path[0]);
        formData.append('note', data.note);

        await returnedProductService.create(formData);
        router.visit(route(`${ROUTES.RETURNED_PRODUCTS}.index`));
        void useSuccessToast(t('pages.returned_product.create.messages.created'));
    });

    const fetchComponents = useCallback(async (filters: ServiceFilterOptions) => {
        return await componentService.getAll(filters).then((response) => response.data);
    }, []);

    const fetchPanels = useCallback(async (filters: ServiceFilterOptions) => {
        return await panelService.getAll(filters).then((response) => response.data);
    }, []);

    useEffect(() => setData('product_returnable_id', null), [data.product_returnable_type]);

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

                    <form
                        onSubmit={submit}
                        id='returned-product-form'
                        encType='multipart/form-data'
                    >
                        {' '}
                    </form>
                    <div className='mt-4 space-y-2 rounded bg-background-2 p-4'>
                        <h2 className='text-lg font-semibold'>
                            {t('pages.returned_product.create.fields.type')}
                        </h2>
                        <RadioGroup
                            onValueChange={(v) => setData('product_returnable_type', v)}
                            defaultValue={'component'}
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
                                    selectedDataId={data.product_returnable_id ?? undefined}
                                    renderItem={(item: ComponentResource) => `${item.name}`} // Customize how to display the item
                                    popoverContentClassName='w-[400px] p-0'
                                    placeholder={'Pilih Komponen'}
                                    nullable
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
                                    selectedDataId={data.product_returnable_id ?? undefined}
                                    renderItem={(item: PanelResource) => `${item.name}`} // Customize how to display the item
                                    popoverContentClassName='w-[400px] p-0'
                                    placeholder={'Pilih Panel'}
                                    nullable
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
                    <div className='mt-4 space-y-2 rounded bg-background-2 p-4'>
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
                            allowReplace
                            allowMultiple={false}
                            required
                        />
                        {progress && (
                            <progress value={progress.percentage} max='100'>
                                {progress.percentage}%
                            </progress>
                        )}
                    </div>
                    <div className='mt-4'>
                        <InputLabel value={'Catatan'} htmlFor='note' />
                        <Textarea
                            value={data.note ?? undefined}
                            onChange={(e) => setData('note', e.target.value)}
                            name='note'
                            id='note'
                            className='mt-1'
                            autoComplete='note'
                        />
                    </div>

                    <Accordion type='single' collapsible className='mt-4'>
                        <AccordionItem value='item-1'>
                            <AccordionTrigger>
                                {t('pages.project.create.fields.buyer_selection')}
                            </AccordionTrigger>
                            <AccordionContent>
                                <BuyerForm
                                    setBuyerId={(buyer_id: number) => setData('buyer_id', buyer_id)}
                                />
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>

                    <Button form='returned-product-form' disabled={loading} className='mt-4'>
                        {t('pages.returned_product.create.buttons.submit')}
                    </Button>
                </div>
            </AuthenticatedLayout>
        </>
    );
}
