import GenericDataSelector from '@/Components/GenericDataSelector';
import InputLabel from '@/Components/InputLabel';
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
import { RadioGroup, RadioGroupItem } from '@/Components/UI/radio-group';
import { useLoading } from '@/Contexts/LoadingContext';
import { useSuccessToast } from '@/Hooks/useToast';
import { componentService } from '@/Services/componentService';
import { panelService } from '@/Services/panelService';
import { returnedProductService } from '@/Services/returnedProductService';
import { ROUTES } from '@/Support/Constants/routes';
import { ServiceFilterOptions } from '@/Support/Interfaces/Others/ServiceFilterOptions';
import { ComponentResource, PanelResource } from '@/Support/Interfaces/Resources';
import { withLoading } from '@/Utils/withLoading';
import { router, useForm } from '@inertiajs/react';
import { useLaravelReactI18n } from 'laravel-react-i18n';
import { FormEventHandler, memo, useCallback, useEffect } from 'react';

const AddRequest = () => {
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
        router.visit(route(`${ROUTES.REQUESTED_RETURNS}.index`));
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
            <Dialog>
                <DialogTrigger
                    className={buttonVariants({
                        className: '',
                    })}
                >
                    {'Make Reuqest'}
                </DialogTrigger>
                <DialogContent className='sm:max-w-[425px]'>
                    <DialogHeader>
                        <DialogTitle>{t('pages.returned_product.create.title')}</DialogTitle>
                        <DialogDescription></DialogDescription>
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
                                        setSelectedData={(id) =>
                                            setData('product_returnable_id', id)
                                        }
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
                                        setSelectedData={(id) =>
                                            setData('product_returnable_id', id)
                                        }
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

                        <Button form='returned-product-form' disabled={loading} className='mt-4'>
                            {t('pages.returned_product.create.buttons.submit')}
                        </Button>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default memo(AddRequest);
