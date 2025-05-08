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
import { projectService } from '@/Services/projectService';
import { returnedProductService } from '@/Services/returnedProductService';
import { ROUTES } from '@/Support/Constants/routes';
import { ReturnedProductStatusEnum } from '@/Support/Enums/returnedProductStatusEnum';
import { ServiceFilterOptions } from '@/Support/Interfaces/Others/ServiceFilterOptions';
import { ComponentResource, PanelResource, ProjectResource } from '@/Support/Interfaces/Resources';
import { withLoading } from '@/Utils/withLoading';
import { router, useForm, usePage } from '@inertiajs/react';
import { useLaravelReactI18n } from 'laravel-react-i18n';
import { FormEventHandler, memo, useCallback, useEffect } from 'react';
import {
    Accordion,
    AccordionItem,
    AccordionTrigger,
    AccordionContent,
} from '@/Components/UI/accordion';

const AddRequest = () => {
    const { t } = useLaravelReactI18n();
    const auth = usePage().props.auth;
    const { data, setData } = useForm<{
        product_returnable_id: number | null;
        product_returnable_type: string;
        qty: number;
        serial_number: number | null;
        buyer_id: number | null;
        status: ReturnedProductStatusEnum;
    }>({
        product_returnable_id: null,
        product_returnable_type: 'component',
        qty: 1,
        serial_number: null,
        buyer_id: auth.user.id,
        status: ReturnedProductStatusEnum.REQUESTED,
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
        void useSuccessToast(
            t('pages.returned_product.requested_return.partials.add_request.messages.created'),
        );
    });

    const fetchProjects = useCallback(async (filters: ServiceFilterOptions) => {
        filters.column_filters = {
            ...filters.column_filters,
            buyer_id: auth.user.id,
        }
        return await projectService.getAll(filters).then((response) => response.data);
    }, []);

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
                    {t('pages.returned_product.requested_return.partials.add_request.title')}
                </DialogTrigger>
                <DialogContent className='sm:max-w-[425px]'>
                    <DialogHeader>
                        <DialogTitle>
                            {t(
                                'pages.returned_product.requested_return.partials.add_request.title',
                            )}
                        </DialogTitle>
                        <DialogDescription>{t('pages.returned_product.requested_return.partials.add_request.description')}</DialogDescription>
                        <form
                            onSubmit={submit}
                            id='returned-product-form'
                            encType='multipart/form-data'
                            className='hidden'
                        >
                        </form>
                        <Accordion type='single' collapsible className='mt-4' defaultValue={auth.user.has_project ? 'item-1' : 'item-2'}>
                            {auth.user.has_project && (<>
                                {/* Component or Panel Selection */}
                                <AccordionItem value='item-1'>
                                    <AccordionTrigger>
                                        {t(
                                            'pages.returned_product.requested_return.partials.add_request.fields.type_selection',
                                        )}
                                    </AccordionTrigger>
                                    <AccordionContent>
                                        <GenericDataSelector
                                            setSelectedData={(id) =>
                                                console.log(id)
                                            }
                                            // selectedDataId={
                                            //     data.product_returnable_id ?? undefined
                                            // }
                                            renderItem={(item: ProjectResource) =>
                                                `${item.name}`
                                            }
                                            popoverContentClassName='w-[400px] p-0'
                                            placeholder={t(
                                                'pages.returned_product.requested_return.partials.add_request.fields.project_placeholder',
                                            )}
                                            nullable
                                            id='component_product_returnable_id'
                                            fetchData={fetchProjects}
                                            buttonClassName='mt-1'
                                        />
                                        <RadioGroup
                                            className='mt-4'
                                            onValueChange={(v) =>
                                                setData('product_returnable_type', v)
                                            }
                                            defaultValue={data.product_returnable_type}
                                        >
                                            <div
                                                key={'component_type'}
                                                className='flex items-center space-x-2'
                                            >
                                                <RadioGroupItem
                                                    value={'component'}
                                                    id={`type.component`}
                                                />
                                                <Label htmlFor={`type.component`}>
                                                    {t(
                                                        'pages.returned_product.requested_return.partials.add_request.fields.component',
                                                    )}
                                                </Label>
                                            </div>
                                            <div
                                                key={'panel_type'}
                                                className='flex items-center space-x-2'
                                            >
                                                <RadioGroupItem value={'panel'} id={`type.panel`} />
                                                <Label htmlFor={`type.panel`}>
                                                    {t(
                                                        'pages.returned_product.requested_return.partials.add_request.fields.panel',
                                                    )}
                                                </Label>
                                            </div>
                                        </RadioGroup>
                                        {data.product_returnable_type === 'component' ? (
                                            <GenericDataSelector
                                                setSelectedData={(id) =>
                                                    setData('product_returnable_id', id)
                                                }
                                                selectedDataId={
                                                    data.product_returnable_id ?? undefined
                                                }
                                                renderItem={(item: ComponentResource) =>
                                                    `${item.name}`
                                                }
                                                popoverContentClassName='w-[400px] p-0'
                                                placeholder={t(
                                                    'pages.returned_product.requested_return.partials.add_request.fields.component_placeholder',
                                                )}
                                                nullable
                                                id='component_product_returnable_id'
                                                fetchData={fetchComponents}
                                                buttonClassName='mt-4'
                                            />
                                        ) : (
                                            <GenericDataSelector
                                                setSelectedData={(id) =>
                                                    setData('product_returnable_id', id)
                                                }
                                                selectedDataId={
                                                    data.product_returnable_id ?? undefined
                                                }
                                                renderItem={(item: PanelResource) => `${item.name}`}
                                                popoverContentClassName='w-[400px] p-0'
                                                placeholder={t(
                                                    'pages.returned_product.requested_return.partials.add_request.fields.panel_placeholder',
                                                )}
                                                nullable
                                                id='panel_product_returnable_id'
                                                fetchData={fetchPanels}
                                                buttonClassName='mt-4'
                                            />
                                        )}
                                    </AccordionContent>
                                </AccordionItem>
                            </>
                            )}

                            {/* Quantity and Serial Number */}
                            <AccordionItem value='item-2'>
                                <AccordionTrigger>
                                    {t(
                                        'pages.returned_product.requested_return.partials.add_request.fields.qty_serial_number',
                                    )}
                                </AccordionTrigger>
                                <AccordionContent>
                                    <div className='mt-0'>
                                        <InputLabel
                                            value={t(
                                                'pages.returned_product.requested_return.partials.add_request.fields.qty',
                                            )}
                                            htmlFor='qty'
                                        />
                                        <Input
                                            value={data.qty}
                                            type='number'
                                            onChange={(e) =>
                                                setData('qty', +e.target.value)
                                            }
                                            name='qty'
                                            id='qty'
                                            className='mt-1'
                                            autoComplete='qty'
                                        />
                                    </div>
                                    <div className='mt-4'>
                                        <InputLabel
                                            value={t(
                                                'pages.returned_product.requested_return.partials.add_request.fields.serial_number',
                                            )}
                                            htmlFor='serial_number'
                                        />
                                        <Input
                                            value={data.serial_number ?? undefined}
                                            type='number'
                                            onChange={(e) =>
                                                setData('serial_number', +e.target.value)
                                            }
                                            name='serial_number'
                                            id='serial_number'
                                            className='mt-1'
                                            autoComplete='serial_number'
                                        />
                                    </div>
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                        <Button form='returned-product-form' disabled={loading} className='mt-4'>
                            {t(
                                'pages.returned_product.requested_return.partials.add_request.buttons.submit',
                            )}
                        </Button>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default memo(AddRequest);
