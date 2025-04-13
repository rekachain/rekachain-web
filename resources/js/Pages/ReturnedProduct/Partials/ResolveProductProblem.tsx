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
import { useLoading } from '@/Contexts/LoadingContext';
import { useSuccessToast } from '@/Hooks/useToast';
import { returnedProductService } from '@/Services/returnedProductService';
import { PaginateResponse } from '@/Support/Interfaces/Others';
import {
    ComponentResource,
    ProductProblemResource,
    ReturnedProductResource,
} from '@/Support/Interfaces/Resources';
import { withLoading } from '@/Utils/withLoading';
import { useForm, usePage } from '@inertiajs/react';
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

    const { data, setData } = useForm({
        component_ids: [] as number[], // Explicitly define the type as number[]
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
            console.log(productProblemsResources);
            const resources = await returnedProductService.getComponents(
                returnedProduct.id,
                isScrapping,
            );
            setComponentResources(resources);
        } catch (error) {
            console.error('Failed to fetch component resources:', error);
        }
    });

    useEffect(() => {
        void fetchComponentResources();
    }, []);

    const submit = async (e: FormEvent) => {
        try {
            e.preventDefault();
            isScrapping
                ? await returnedProductService.scrapStocks(returnedProduct.id, data)
                : returnedProductService.retrieveStocks(returnedProduct.id, data);
            await handleSyncReturnedProduct();
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
        return false;
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
