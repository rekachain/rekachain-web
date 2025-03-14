import { Button } from '@/Components/UI/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/Components/UI/dialog';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/Components/UI/select';
import { useLoading } from '@/Contexts/LoadingContext';
import { fetchEnumLabels } from '@/Helpers/enumHelper';
import { useSuccessToast } from '@/Hooks/useToast';
import { productProblemService } from '@/Services/productProblemService';
import { ProductProblemStatusEnum } from '@/Support/Enums/productProblemStatusEnum';
import { useLaravelReactI18n } from 'laravel-react-i18n';
import { memo, useEffect, useState } from 'react';

const UpdateProductProblemStatus = ({
    productProblemId,
    currentStatus,
    handleSyncReturnedProduct,
}: {
    productProblemId: number;
    currentStatus: ProductProblemStatusEnum;
    handleSyncReturnedProduct: () => Promise<void>;
}) => {
    const { t } = useLaravelReactI18n();
    const { loading } = useLoading();
    const [status, setStatus] = useState<ProductProblemStatusEnum>(currentStatus);
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

    const handleUpdateStatus = async () => {
        try {
            await productProblemService.update(productProblemId, {
                status: status,
            });
            await handleSyncReturnedProduct();
            void useSuccessToast(
                t('pages.returned_product.partials.update_product_problem_status.messages.updated'),
            );
        } catch (error) {
            console.error('Failed to update status:', error);
        }
    };

    return (
        <Dialog>
            <DialogTrigger className={'w-fit'}>
                {t(
                    'pages.returned_product.partials.update_product_problem_status.buttons.update_status',
                )}
            </DialogTrigger>
            <DialogContent className='sm:max-w-lg'>
                <DialogHeader>
                    <DialogTitle>
                        {t(
                            'pages.returned_product.partials.update_product_problem_status.dialog.title',
                        )}
                    </DialogTitle>
                    <DialogDescription>
                        {t(
                            'pages.returned_product.partials.update_product_problem_status.dialog.description',
                        )}
                    </DialogDescription>
                </DialogHeader>
                <div className='flex flex-col gap-4'>
                    <div className='flex flex-col gap-2'>
                        <Select
                            value={status}
                            onValueChange={(value) => setStatus(value as ProductProblemStatusEnum)}
                        >
                            <SelectTrigger>
                                <SelectValue>
                                    {localizedStatuses[status] ||
                                        t(
                                            'pages.returned_product.partials.update_product_problem_status.dialog.select_placeholder',
                                        )}
                                </SelectValue>
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    {Object.entries(localizedStatuses).map(([key, label]) => (
                                        <SelectItem value={key} key={key}>
                                            {label}
                                        </SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                    <Button onClick={handleUpdateStatus} disabled={loading}>
                        {loading ? t('action.loading') : t('action.update')}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default memo(UpdateProductProblemStatus);
