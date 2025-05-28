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
import { useSuccessToast } from '@/Hooks/useToast';
import { productRestockService } from '@/Services/productRestockService';
import { ProductRestockStatusEnum } from '@/Support/Enums/productRestockStatusEnum';
import { ProductRestockResource } from '@/Support/Interfaces/Resources';
import { useForm } from '@inertiajs/react';
import { useLaravelReactI18n } from 'laravel-react-i18n';
import { useState } from 'react';

export default function ({
    localizedStatuses,
    productRestock,
    handleSyncProductRestock,
    disabled,
}: {
    localizedStatuses: Record<string, string>;
    productRestock: ProductRestockResource;
    handleSyncProductRestock: () => Promise<void>;
    disabled: boolean;
}) {
    const { t } = useLaravelReactI18n();
    const { loading } = useLoading();
    const [isDialogOpen, setIsDialogOpen] = useState(false); // Manage dialog state
    const { data, setData } = useForm({
        status: productRestock.status,
    });

    const handleUpdateStatus = async () => {
        try {
            await productRestockService.update(productRestock.id, data);
            await handleSyncProductRestock();
            void useSuccessToast(
                t(
                    'pages.product_restock.partials.partials.partials.update_product_restock_status.messages.updated',
                ),
            );
            setIsDialogOpen(false); // Close the dialog after successful update
        } catch (error) {
            console.error('Failed to update status:', error);
        }
    };

    return (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger className={`w-fit ${disabled ? 'opacity-50' : ''}`} disabled={disabled}>
                {t(
                    'pages.product_restock.partials.partials.partials.update_product_restock_status.buttons.update_status',
                )}
            </DialogTrigger>
            <DialogContent className='sm:max-w-lg'>
                <DialogHeader>
                    <DialogTitle>
                        {t(
                            'pages.product_restock.partials.partials.partials.update_product_restock_status.dialog.title',
                        )}
                    </DialogTitle>
                    <DialogDescription>
                        {t(
                            'pages.product_restock.partials.partials.partials.update_product_restock_status.dialog.description',
                        )}
                    </DialogDescription>
                </DialogHeader>
                <div className='flex flex-col gap-4'>
                    <div className='flex flex-col gap-2'>
                        <Select
                            value={data.status}
                            onValueChange={(value) =>
                                setData('status', value as ProductRestockStatusEnum)
                            }
                        >
                            <SelectTrigger>
                                <SelectValue>
                                    {localizedStatuses[data.status] ||
                                        t(
                                            'pages.product_restock.partials.partials.partials.update_product_restock_status.dialog.select_placeholder',
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
}
