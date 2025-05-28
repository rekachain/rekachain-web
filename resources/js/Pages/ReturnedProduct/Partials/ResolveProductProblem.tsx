import { Button, buttonVariants } from '@/Components/UI/button';
import { Checkbox } from '@/Components/UI/checkbox';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/Components/UI/dialog';
import { Separator } from '@/Components/UI/separator';
import { useLoading } from '@/Contexts/LoadingContext';
import { useSuccessToast } from '@/Hooks/useToast';
import { replacementStockService } from '@/Services/replacementStockService';
import { returnedProductService } from '@/Services/returnedProductService';
import { ROUTES } from '@/Support/Constants/routes';
import { PaginateResponse } from '@/Support/Interfaces/Others';
import {
    ComponentResource,
    ProductProblemResource,
    ReplacementStockResource,
    ReturnedProductResource,
} from '@/Support/Interfaces/Resources';
import { withLoading } from '@/Utils/withLoading';
import { router, useForm, usePage } from '@inertiajs/react';
import { useLaravelReactI18n } from 'laravel-react-i18n';
import { FormEvent, memo, useEffect, useState } from 'react';

const ResolveProductProblem = ({
    returnedProduct,
    isScrapping = false,
    handleSyncReturnedProduct,
}: {
    returnedProduct: ReturnedProductResource;
    isScrapping?: boolean;
    handleSyncReturnedProduct: () => Promise<void>;
}) => {
    const { t, tChoice } = useLaravelReactI18n();
    const { loading } = useLoading();
    const auth = usePage().props.auth;

    const [componentResources, setComponentResources] =
        useState<PaginateResponse<ComponentResource>>();
    const [productProblemsResources, setProductProblemsResources] = useState<
        ProductProblemResource[]
    >(returnedProduct.product_problems || []);
    const [replacementStockResource, setReplacementStockResource] = useState<
        PaginateResponse<ReplacementStockResource>
    >();

    const { data, setData } = useForm({
        component_ids: [] as number[], // Explicitly define the type as number[]
        req_production: false,
    });

    const handleComponentsCheckedChange = (componentId: number, isChecked: boolean) => {
        setData((prevData) => ({
            ...prevData,
            component_ids: isChecked
                ? [...prevData.component_ids, componentId]
                : prevData.component_ids.filter((id: number) => id !== componentId),
        }));
    };

    const fetchComponentResources = withLoading(async () => {
        try {
            const resources = await returnedProductService.getComponents(
                returnedProduct.id,
                isScrapping,
            );
            setComponentResources(resources);
        } catch (error) {
            console.error('Failed to fetch component resources:', error);
        }
    });

    const fetchReplacementStockData = withLoading(async () => {
        const filters = {
            column_filters: {
                component_id: productProblemsResources.map((productProblem) => productProblem.component_id),
            }
        }
        const res = await replacementStockService.getAll(filters);
        setReplacementStockResource(res);
    });

    useEffect(() => {
        void fetchComponentResources();
        void fetchReplacementStockData();
    }, []);

    const submit = async (e: FormEvent) => {
        try {
            e.preventDefault();
            isScrapping
                ? await returnedProductService.scrapStocks(returnedProduct.id, data)
                : returnedProductService.retrieveStocks(returnedProduct.id, data);
            data.req_production
                ? router.visit(route(`${ROUTES.PRODUCT_RESTOCKS}.index`))
                : router.visit(route(`${ROUTES.RETURNED_PRODUCTS}.show`, returnedProduct.id));
            void useSuccessToast(
                isScrapping
                    ? t('pages.returned_product.partials.resolve_product_problem.messages.scrapped')
                    : t(
                          'pages.returned_product.partials.resolve_product_problem.messages.resolved',
                      ),
            );
        } catch (error) {
            console.error('Failed:', error);
        }
    };

    const isComponentDisabled = (componentResource: ComponentResource) => {
        if (isScrapping) {
            return productProblemsResources.some(
                (problem) => problem.component_id === componentResource.id,
            );
        }
        return !replacementStockResource?.data.some(
            (stock) => stock.component_id === componentResource.id && stock.qty >= 1,
        );
    };

    return (
        <Dialog>
            <DialogTrigger
                className={buttonVariants({
                    className: 'w-fit',
                })}
            >
                {tChoice(
                    'pages.returned_product.partials.resolve_product_problem.buttons.resolve',
                    isScrapping ? 1 : 0,
                )}
            </DialogTrigger>
            <DialogContent className='sm:max-w-lg'>
                <DialogHeader>
                    <DialogTitle>
                        {tChoice(
                            'pages.returned_product.partials.resolve_product_problem.dialog.title',
                            isScrapping ? 1 : 0,
                        )}
                    </DialogTitle>
                    <DialogDescription>
                        {tChoice(
                            'pages.returned_product.partials.resolve_product_problem.dialog.description',
                            isScrapping ? 1 : 0,
                        )}
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={submit} id='add-note-form' className='hidden'></form>
                <div className='flex flex-col gap-4'>
                    <div className='flex flex-col gap-2'>
                        {productProblemsResources &&
                            componentResources?.data?.map((component) => (
                                <div key={component.id} className='w-full'>
                                    <div className='flex items-center'>
                                        <Checkbox
                                            value={component.id}
                                            onCheckedChange={(checked: boolean) => {
                                                handleComponentsCheckedChange(
                                                    component.id,
                                                    checked,
                                                );
                                            }}
                                            name={`components[${component.id}]`}
                                            id={`component-${component.id}`}
                                            disabled={isComponentDisabled(component)}
                                            // checked={isScrapping && !isComponentDisabled(component)}
                                        />
                                        <label
                                            htmlFor={`component-${component.id}`}
                                            className='ml-2'
                                        >
                                            {isComponentDisabled(component) ? (
                                                <span className='text-muted-foreground line-through'>
                                                    {component.name}
                                                </span>
                                            ) : (
                                                component.name
                                            )}
                                        </label>
                                    </div>
                                </div>
                            ))}
                    </div>
                    <Separator></Separator>
                    <div className='flex flex-col gap-1'>
                        <div className='flex items-center'>
                            <label htmlFor='req_production' className='mr-2'>
                                {t(
                                    'pages.returned_product.partials.resolve_product_problem.dialog.req_production',
                                )}
                            </label>
                            <Checkbox
                                value={data.req_production.toString()}
                                onCheckedChange={(checked: boolean) =>
                                    setData('req_production', checked)
                                }
                                name='req_production'
                                id='req_production'
                            />
                        </div>
                        <span className='ml-1 text-sm text-muted-foreground'>
                            (
                            {t(
                                'pages.returned_product.partials.resolve_product_problem.dialog.req_production_description',
                            )}
                            )
                        </span>
                    </div>
                    <Button type='submit' form='add-note-form' disabled={loading}>
                        {loading
                            ? t('action.loading')
                            : isScrapping
                              ? t('action.update')
                              : t('action.add')}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default memo(ResolveProductProblem);
