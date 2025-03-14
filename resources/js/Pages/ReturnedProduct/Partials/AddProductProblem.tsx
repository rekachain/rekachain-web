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
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/Components/UI/select';
import { Separator } from '@/Components/UI/separator';
import { Textarea } from '@/Components/UI/textarea';
import { useLoading } from '@/Contexts/LoadingContext';
import { fetchEnumLabels } from '@/Helpers/enumHelper';
import { useSuccessToast } from '@/Hooks/useToast';
import { componentService } from '@/Services/componentService';
import { returnedProductService } from '@/Services/returnedProductService';
import { ProductProblemStatusEnum } from '@/Support/Enums/productProblemStatusEnum';
import { PaginateResponse } from '@/Support/Interfaces/Others';
import { ServiceFilterOptions } from '@/Support/Interfaces/Others/ServiceFilterOptions';
import { ComponentResource, ReturnedProductResource } from '@/Support/Interfaces/Resources';
import { withLoading } from '@/Utils/withLoading';
import { useForm } from '@inertiajs/react';
import { useDebounce } from '@uidotdev/usehooks';
import { useLaravelReactI18n } from 'laravel-react-i18n';
import { Loader2 } from 'lucide-react';
import { ChangeEvent, FormEvent, memo, useCallback, useEffect, useState } from 'react';

const AddProductProblem = ({
    componentResource,
    setComponentResource,
    returnedProduct,
    handleSyncReturnedProduct,
}: {
    componentResource: PaginateResponse<ComponentResource>;
    setComponentResource: (componentResponse: PaginateResponse<ComponentResource>) => void;
    returnedProduct: ReturnedProductResource;
    handleSyncReturnedProduct: () => Promise<void>;
}) => {
    const { t } = useLaravelReactI18n();
    const { loading } = useLoading();

    const { data, setData, reset } = useForm({
        search_component: '',
        component_id: null as number | null,
        new_component_name: '',
        new_component_description: '',
        status: ProductProblemStatusEnum.DRAFT,
    });
    const debouncedSearchComponent = useDebounce(data.search_component, 300);

    const handleSyncComponents = withLoading(async () => {
        const filters: ServiceFilterOptions = { search: debouncedSearchComponent };
        const res = await componentService.getAll(filters);
        setComponentResource(res);
    });

    useEffect(() => {
        void handleSyncComponents();
    }, [debouncedSearchComponent]);

    useEffect(() => {
        const selectedComponent = componentResource?.data.find(
            (component) => component.id === data.component_id,
        );
        if (selectedComponent) {
            setData((previousData) => ({
                ...previousData,
                new_component_name: selectedComponent.name,
                new_component_description: selectedComponent.description ?? '-',
            }));
        } else {
            setData((previousData) => ({
                ...previousData,
                new_component_name: '',
                new_component_description: '',
            }));
        }
    }, [data.component_id, componentResource]);

    const fetchComponents = useCallback(async (filters: ServiceFilterOptions) => {
        const res = await componentService.getAll(filters);
        setComponentResource(res);
        return res.data;
    }, []);

    const handleResetAddComponentSelection = () => {
        setData('component_id', 0);
    };

    const handleChangeNewComponentName = (e: ChangeEvent<HTMLInputElement>) => {
        setData('new_component_name', e.target.value);
    };

    const handleChangeNewComponentDescription = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setData('new_component_description', e.target.value);
    };

    const handleAddProductProblem = withLoading(async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        await returnedProductService.addProductProblem(
            returnedProduct.id,
            data.component_id,
            data.new_component_name,
            data.new_component_description,
            data.status,
        );
        handleResetAddComponentSelection();
        await handleSyncReturnedProduct();
        reset();
        void useSuccessToast(
            t('pages.returned_product.partials.add_product_problem.messages.created'),
        );
    });

    const [localizedStatuses, setLocalizedStatuses] = useState<Record<string, string>>({});

    useEffect(() => {
        const fetchLocalizedStatuses = async () => {
            try {
                const labels = await fetchEnumLabels('ProductProblemStatusEnum');
                setLocalizedStatuses(labels);
            } catch (error) {
                console.error('Failed to fetch localized statuses:', error);
            }
        };

        fetchLocalizedStatuses();
    }, [t]);

    return (
        <Dialog>
            <DialogTrigger
                className={buttonVariants({
                    className: 'w-fit',
                })}
            >
                {t('pages.returned_product.partials.add_product_problem.buttons.add_component')}
            </DialogTrigger>
            <DialogContent className='sm:max-w-lg'>
                <DialogHeader>
                    <DialogTitle>{data.new_component_name}</DialogTitle>
                    <DialogDescription></DialogDescription>
                    <form onSubmit={handleAddProductProblem} className='flex flex-col gap-4'>
                        <div className='flex flex-col gap-4 bg-background-2 p-4'>
                            <Label htmlFor='component'>
                                {t(
                                    'pages.returned_product.partials.add_product_problem.dialogs.fields.component',
                                )}
                            </Label>
                            <GenericDataSelector
                                setSelectedData={(id) => setData('component_id', id)}
                                selectedDataId={data.component_id}
                                renderItem={(item) => item.name}
                                placeholder={t(
                                    'pages.returned_product.partials.add_product_problem.dialogs.fields.component_placeholder',
                                )}
                                nullable
                                id='component_id'
                                fetchData={fetchComponents}
                                disabledSearchState={false}
                            />
                        </div>

                        <Separator />

                        <div className='flex flex-col gap-4 bg-background-2 p-4'>
                            <div className='flex flex-col gap-2'>
                                <Label>
                                    {t(
                                        'pages.returned_product.partials.add_product_problem.dialogs.fields.component_name',
                                    )}
                                </Label>
                                <Input
                                    value={data.new_component_name}
                                    type='text'
                                    required
                                    onChange={handleChangeNewComponentName}
                                    disabled={data.component_id !== null}
                                />
                            </div>
                            <Label htmlFor='new-component-description'>
                                {t(
                                    'pages.returned_product.partials.add_product_problem.dialogs.fields.component_description',
                                )}
                            </Label>
                            <Textarea
                                value={data.new_component_description}
                                onChange={handleChangeNewComponentDescription}
                                id='new-component-description'
                                disabled={data.component_id !== null}
                                className='rounded p-2'
                            />
                            <div className='flex flex-col gap-2'>
                                <Label>
                                    {t(
                                        'pages.returned_product.partials.add_product_problem.dialogs.fields.status',
                                    )}
                                </Label>
                                <div className='rounded p-2'>
                                    <Select
                                        value={data.status}
                                        onValueChange={(value) =>
                                            setData('status', value as ProductProblemStatusEnum)
                                        }
                                    >
                                        <SelectTrigger>
                                            <SelectValue>
                                                {localizedStatuses[
                                                    data.status || ProductProblemStatusEnum.DRAFT
                                                ] || 'Pilih Status'}
                                            </SelectValue>
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                {Object.entries(localizedStatuses).map(
                                                    ([status, label]) => (
                                                        <SelectItem value={status} key={status}>
                                                            {label}
                                                        </SelectItem>
                                                    ),
                                                )}
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
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

export default memo(AddProductProblem);
