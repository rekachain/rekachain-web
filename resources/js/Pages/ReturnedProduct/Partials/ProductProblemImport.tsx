import { Button } from '@/Components/UI/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/Components/UI/dialog';
import { Input } from '@/Components/UI/input';
import { Label } from '@/Components/UI/label';
import { useLoading } from '@/Contexts/LoadingContext';
import { useSuccessToast } from '@/Hooks/useToast';
import { returnedProductService } from '@/Services/returnedProductService';
import { ROUTES } from '@/Support/Constants/routes';
import { withLoading } from '@/Utils/withLoading';
import { router, useForm } from '@inertiajs/react';
import { useLaravelReactI18n } from 'laravel-react-i18n';
import { ChangeEvent, FormEvent } from 'react';

export default function ({returnedProductId}: {returnedProductId: number}) {
    const { t } = useLaravelReactI18n();

    const { data, setData } = useForm<{
        file: File | null;
    }>({
        file: null,
    });
    const { loading } = useLoading();

    const handleImportData = withLoading(async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        await returnedProductService.importProductProblemData(returnedProductId, data.file as File);
        router.visit(route(`${ROUTES.RETURNED_PRODUCTS}.show`, returnedProductId));
        void useSuccessToast(t('pages.returned_product.partials.product_problem_import.messages.imported'));
    });

    const handleChangeImportFile = (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.currentTarget.files;
        if (files) setData('file', files[0]);
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant='tertiary'>
                    {t('pages.returned_product.partials.product_problem_import.buttons.import')}
                </Button>
            </DialogTrigger>
            <DialogContent className='sm:max-w-[425px]'>
                <DialogHeader>
                    <DialogTitle>{t('pages.returned_product.partials.product_problem_import.dialogs.title')}</DialogTitle>
                    <DialogDescription>
                        {t('pages.returned_product.partials.product_problem_import.dialogs.description')}
                    </DialogDescription>
                </DialogHeader>
                {/*Download template button*/}
                <div className='flex flex-col space-y-4'>
                    <Label>
                        {t('pages.returned_product.partials.product_problem_import.dialogs.fields.download_template')}
                    </Label>
                    <Button
                        variant='secondary'
                        type='button'
                        onClick={returnedProductService.downloadImportReturnedProductProblemTemplate}
                        disabled={loading}
                    >
                        {loading
                            ? t('action.loading')
                            : t('pages.returned_product.partials.product_problem_import.dialogs.buttons.download_template')}
                    </Button>
                </div>
                <form onSubmit={handleImportData} className='space-y-4'>
                    <div className='space-y-4'>
                        <Label htmlFor='file'>
                            {t('pages.returned_product.partials.product_problem_import.dialogs.fields.file')}
                        </Label>
                        <Input
                            type='file'
                            onChange={handleChangeImportFile}
                            id='file'
                            accept='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
                        />
                    </div>
                    <DialogFooter>
                        <Button type='submit' disabled={loading}>
                            {loading
                                ? t('action.loading')
                                : t('pages.returned_product.partials.product_problem_import.dialogs.buttons.import')}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
