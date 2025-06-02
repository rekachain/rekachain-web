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
import { useSuccessToast } from '@/Hooks/useToast';
import { componentService } from '@/Services/componentService';
import { replacementStockService } from '@/Services/replacementStockService';
import { ServiceFilterOptions } from '@/Support/Interfaces/Others/ServiceFilterOptions';
import { ComponentResource, ReplacementStockResource } from '@/Support/Interfaces/Resources';
import { withLoading } from '@/Utils/withLoading';
import { useForm } from '@inertiajs/react';
import { useLaravelReactI18n } from 'laravel-react-i18n';
import { FormEventHandler, memo, useCallback } from 'react';

const AddStock = ({
    replacementStock,
    handleSyncReplacementStocks,
}: {
    replacementStock: ReplacementStockResource | null;
    handleSyncReplacementStocks: () => Promise<void>;
}) => {
    const { t, tChoice } = useLaravelReactI18n();
    const { data, setData, processing } = useForm({
        component_id: replacementStock ? undefined : 0,
        qty: replacementStock?.qty ?? 0,
        threshold: replacementStock?.threshold ?? 0,
    });

    const fetchComponents = useCallback(async (filters: ServiceFilterOptions) => {
        return await componentService.getAll(filters).then((response) => response.data);
    }, []);

    const submit: FormEventHandler = withLoading(async (e) => {
        e.preventDefault();
        replacementStock
            ? await replacementStockService.update(replacementStock.id, data)
            : await replacementStockService.create(data);
        handleSyncReplacementStocks();
        void useSuccessToast(t('pages.replacement_stock.partials.add_stock.messages.created'));
    });

    return (
        <Dialog>
            <DialogTrigger
                className={buttonVariants({
                    className: 'w-fit',
                    variant: replacementStock ? 'outline' : 'default',
                })}
            >
                {tChoice(
                    'pages.replacement_stock.partials.add_stock.title',
                    replacementStock ? 1 : 0,
                )}
            </DialogTrigger>
            <DialogContent className='sm:max-w-lg'>
                <DialogHeader>
                    <DialogTitle>
                        {tChoice(
                            'pages.replacement_stock.partials.add_stock.title',
                            replacementStock ? 1 : 0,
                        )}
                    </DialogTitle>
                    <DialogDescription></DialogDescription>
                    <form
                        onSubmit={submit}
                        id='replacement-stock-form'
                        encType='multipart/form-data'
                        className='hidden'
                    ></form>
                    {!replacementStock && (
                        <>
                            <div className='mt-4'>
                                <InputLabel value={'Pilih Komponen'} htmlFor='component_id' />
                                <GenericDataSelector
                                    setSelectedData={(id) => setData('component_id', id ?? 0)}
                                    selectedDataId={data.component_id ?? undefined}
                                    renderItem={(item: ComponentResource) => `${item.name}`} // Customize how to display the item
                                    popoverContentClassName='w-[400px] p-0'
                                    placeholder={'Pilih Komponen'}
                                    // initialSearch={replacementStock?.component?.name ?? ''}
                                    id='component_id'
                                    fetchData={fetchComponents}
                                    buttonClassName='mt-1'
                                />
                            </div>
                        </>
                    )}
                    <div className='mt-4'>
                        <InputLabel
                            value={t('pages.replacement_stock.partials.add_stock.fields.qty')}
                            htmlFor='qty'
                        />
                        <Input
                            value={data.qty}
                            type='number'
                            onChange={(e) => setData('qty', +e.target.value)}
                            name='qty'
                            id='qty'
                            className='mt-1'
                            autoComplete='1'
                        />
                    </div>

                    <div className='mt-4'>
                        <InputLabel
                            value={t('pages.replacement_stock.partials.add_stock.fields.threshold')}
                            htmlFor='threshold'
                        />
                        <Input
                            value={data.threshold}
                            type='number'
                            onChange={(e) => setData('threshold', +e.target.value)}
                            name='threshold'
                            id='threshold'
                            className='mt-1'
                            autoComplete='threshold'
                        />
                    </div>

                    <Button form='replacement-stock-form' disabled={processing} className='mt-4'>
                        {tChoice(
                            'pages.replacement_stock.partials.add_stock.buttons.submit',
                            replacementStock ? 1 : 0,
                        )}
                    </Button>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
};

export default memo(AddStock);
