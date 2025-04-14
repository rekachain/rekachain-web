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
import { ReturnedProductNoteResource } from '@/Support/Interfaces/Resources';
import { useForm, usePage } from '@inertiajs/react';
import { RiEdit2Line } from '@remixicon/react';
import { useLaravelReactI18n } from 'laravel-react-i18n';
import { memo } from 'react';

const AddReturnedProductNote = ({
    returnedProductId,
    returnedProductNote,
    handleSyncReturnedProduct,
}: {
    returnedProductId: number;
    returnedProductNote?: ReturnedProductNoteResource;
    handleSyncReturnedProduct: () => Promise<void>;
}) => {
    const { t, tChoice } = useLaravelReactI18n();
    const { loading } = useLoading();
    const auth = usePage().props.auth;

    const { data, setData } = useForm({
        returned_product_id: returnedProductId,
        note: returnedProductNote?.note ?? '',
        user_id: auth.user.id,
    });

    const handleAddNote = async () => {
        try {
            await returnedProductNoteService.create(data);
            await handleSyncReturnedProduct();
            void useSuccessToast(
                t('pages.returned_product.partials.add_returned_product_note.messages.created'),
            );
        } catch (error) {
            console.error('Failed to add note:', error);
        }
    };
    const handleUpdateNote = async () => {
        try {
            if (returnedProductNote?.id) {
                await returnedProductNoteService.update(returnedProductNote.id, data);
                await handleSyncReturnedProduct();
                void useSuccessToast(
                    t('pages.returned_product.partials.add_returned_product_note.messages.updated'),
                );
            }
        } catch (error) {
            console.error('Failed to update note:', error);
        }
    };

    return (
        <Dialog>
            {returnedProductNote ? (
                <DialogTrigger>
                    <RiEdit2Line size={15} />
                </DialogTrigger>
            ) : (
                <DialogTrigger
                    className={buttonVariants({
                        className: 'w-fit',
                    })}
                >
                    {t(
                        'pages.returned_product.partials.add_returned_product_note.buttons.add_note',
                    )}
                </DialogTrigger>
            )}
            <DialogContent className='sm:max-w-lg'>
                <DialogHeader>
                    <DialogTitle>
                        {tChoice(
                            'pages.returned_product.partials.add_returned_product_note.dialog.title',
                            returnedProductNote ? 1 : 0,
                        )}
                    </DialogTitle>
                    <DialogDescription>
                        {tChoice(
                            'pages.returned_product.partials.add_returned_product_note.dialog.description',
                            returnedProductNote ? 1 : 0,
                        )}
                    </DialogDescription>
                </DialogHeader>

                <form
                    onSubmit={returnedProductNote ? handleUpdateNote : handleAddNote}
                    id='add-note-form'
                    className='flex flex-col gap-4'
                ></form>
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
                    <Button type='submit' form='add-note-form' disabled={loading}>
                        {loading
                            ? t('action.loading')
                            : returnedProductNote
                              ? t('action.update')
                              : t('action.add')}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default memo(AddReturnedProductNote);
