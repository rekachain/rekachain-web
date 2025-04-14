import InputLabel from '@/Components/InputLabel';
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
import { Textarea } from '@/Components/UI/textarea';
import { useLoading } from '@/Contexts/LoadingContext';
import { useSuccessToast } from '@/Hooks/useToast';
import { productProblemService } from '@/Services/productProblemService';
import { ProductProblemStatusEnum } from '@/Support/Enums/productProblemStatusEnum';
import { ProductProblemResource } from '@/Support/Interfaces/Resources';
import { useForm } from '@inertiajs/react';
import { useLaravelReactI18n } from 'laravel-react-i18n';
import { useEffect, useState } from 'react';
import { FilePond } from 'react-filepond';

export default function ({
    localizedStatuses,
    productProblem,
    handleSyncReturnedProduct,
}: {
    localizedStatuses: Record<string, string>;
    productProblem: ProductProblemResource;
    handleSyncReturnedProduct: () => Promise<void>;
}) {
    const { t } = useLaravelReactI18n();
    const { loading } = useLoading();
    const [isDialogOpen, setIsDialogOpen] = useState(false); // Manage dialog state
    const { data, setData, progress } = useForm({
        status: productProblem.status,
        note: productProblem.latest_product_problem_note?.note ?? null,
        image_path: [] as any[],
    });

    useEffect(() => {
        if (productProblem.image_path)
            setData('image_path', [
                {
                    source: productProblem.image,
                    options: {
                        type: 'local',
                        file: {
                            name: 'Product Problem Evidence',
                            size: null,
                            type: 'image/jpeg',
                        },
                        metadata: {
                            poster: productProblem.image,
                        },
                    },
                },
            ]);
    }, [productProblem.image, isDialogOpen, data.status]);

    const handleFileChange = (fileItems: any) => {
        setData((prevData: any) => ({
            ...prevData,
            image_path: fileItems.map((fileItem: any) => fileItem.file),
        }));
    };

    const handleUpdateStatus = async () => {
        const validImageTypes = ['image/jpeg', 'image/png', 'image/gif'];
        const validImages = data.image_path.filter(
            (file) => file.size !== null && validImageTypes.includes(file.type),
        );
        try {
            await productProblemService.updateWithNote(
                productProblem.id,
                data.status,
                validImages,
                data.note,
            );
            await handleSyncReturnedProduct();
            void useSuccessToast(
                t('pages.returned_product.partials.update_product_problem_status.messages.updated'),
            );
            setIsDialogOpen(false); // Close the dialog after successful update
        } catch (error) {
            console.error('Failed to update status:', error);
        }
    };

    return (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
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
                            value={data.status}
                            onValueChange={(value) =>
                                setData('status', value as ProductProblemStatusEnum)
                            }
                        >
                            <SelectTrigger>
                                <SelectValue>
                                    {localizedStatuses[data.status] ||
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
                        <div className='mt-4'>
                            <InputLabel
                                value={t('pages.returned_product.create.fields.evidence')}
                                htmlFor='evidence'
                            />
                            <FilePond
                                required
                                onupdatefiles={handleFileChange}
                                labelIdle={t(
                                    'pages.returned_product.create.fields.evidence_filepond_placeholder',
                                )}
                                imagePreviewMaxHeight={200}
                                files={data.image_path}
                                filePosterMaxHeight={200}
                                allowReplace
                                allowMultiple={false}
                            />
                            {progress && (
                                <progress value={progress.percentage} max='100'>
                                    {progress.percentage}%
                                </progress>
                            )}
                        </div>
                        {data.status !== ProductProblemStatusEnum.DRAFT &&
                            data.status !== productProblem.status && (
                                <>
                                    <InputLabel value={'Catatan'} htmlFor='note' />
                                    <Textarea
                                        value={data.note ?? undefined}
                                        onChange={(e) => setData('note', e.target.value)}
                                        name='note'
                                        id='note'
                                        className='mt-1'
                                        autoComplete='note'
                                    />
                                </>
                            )}
                    </div>
                    <Button onClick={handleUpdateStatus} disabled={loading}>
                        {loading ? t('action.loading') : t('action.update')}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
