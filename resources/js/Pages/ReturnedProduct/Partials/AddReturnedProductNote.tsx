import { Button, buttonVariants } from '@/Components/UI/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/Components/UI/dialog';
import { Label } from '@/Components/UI/label';
import { Textarea } from '@/Components/UI/textarea';
import { useLoading } from '@/Contexts/LoadingContext';
import { useSuccessToast } from '@/Hooks/useToast';
import { returnedProductNoteService } from '@/Services/returnedProductNoteService';
import { useForm, usePage } from '@inertiajs/react';
import { useLaravelReactI18n } from 'laravel-react-i18n';
import { memo } from 'react';

const AddReturnedProductNote = ({
    returnedProductId,
    handleSyncReturnedProduct,
}: {
    returnedProductId: number;
    handleSyncReturnedProduct: () => Promise<void>;
}) => {
    const { t } = useLaravelReactI18n();
    const { loading } = useLoading();
    const auth = usePage().props.auth;

    const { data, setData } = useForm({
        returned_product_id: returnedProductId,
        note: '',
        user_id: auth?.user?.id,
    });

    const handleAddNote = async () => {
        try {
            await returnedProductNoteService.create(data);
            await handleSyncReturnedProduct();
            void useSuccessToast(
                t('pages.returned_product.partials.add_returned_product_note.messages.updated'),
            );
        } catch (error) {
            console.error('Failed to add note:', error);
        }
    };

    return (
        <Dialog>
            <DialogTrigger className={buttonVariants({
                    className: 'w-fit',
                })}>
                {t(
                    'pages.returned_product.partials.add_returned_product_note.buttons.add_note',
                )}
            </DialogTrigger>
            <DialogContent className='sm:max-w-lg'>
                <DialogHeader>
                    <DialogTitle>
                        {t(
                            'pages.returned_product.partials.add_returned_product_note.dialog.title',
                        )}
                    </DialogTitle>
                    <DialogDescription>
                        {t(
                            'pages.returned_product.partials.add_returned_product_note.dialog.description',
                        )}
                    </DialogDescription>
                </DialogHeader>
                
                <form onSubmit={handleAddNote} className='flex flex-col gap-4' id='add-note-form'></form>
                <div className='flex flex-col gap-4'>
                    <div className='flex flex-col gap-2'>
                        <Label htmlFor='note'>
                            {t(
                                'pages.returned_product.partials.add_returned_product_note.dialog.fields.note',
                            )}
                        </Label>
                        <Textarea
                            value={data.note}
                            onChange={(e) => setData('note', e.target.value)}
                            id='note'
                            className='rounded p-2'
                        />
                    </div>
                    <Button type='submit' disabled={loading} form='add-note-form'>
                        {loading ? t('action.loading') : t('action.add')}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default memo(AddReturnedProductNote);
