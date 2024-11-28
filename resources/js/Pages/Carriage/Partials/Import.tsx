import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/Components/UI/dialog';
import { Button } from '@/Components/UI/button';
import { Label } from '@/Components/UI/label';
import { Input } from '@/Components/UI/input';
import { ROUTES } from '@/Support/Constants/routes';
import { router, useForm } from '@inertiajs/react';
import { carriageService } from '@/Services/carriageService';
import { useSuccessToast } from '@/Hooks/useToast';
import { useLoading } from '@/Contexts/LoadingContext';
import { withLoading } from '@/Utils/withLoading';
import { ChangeEvent, FormEvent } from 'react';
import { useLaravelReactI18n } from 'laravel-react-i18n';

export default function () {
    const { t } = useLaravelReactI18n();

    const { data, setData } = useForm<{
        file: File | null;
    }>({
        file: null,
    });
    const { loading } = useLoading();

    const handleImportData = withLoading(async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        await carriageService.importData(data.file as File);
        router.visit(route(`${ROUTES.CARRIAGES}.index`));
        void useSuccessToast(t('pages.carriage.partials.import.messages.imported'));
    });

    const handleChangeImportFile = (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.currentTarget.files;
        if (files) setData('file', files[0]);
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant='tertiary'>
                    {t('pages.carriage.partials.import.buttons.import')}
                </Button>
            </DialogTrigger>
            <DialogContent className='sm:max-w-[425px]'>
                <DialogHeader>
                    <DialogTitle>{t('pages.carriage.partials.import.dialogs.title')}</DialogTitle>
                    <DialogDescription>
                        {t('pages.carriage.partials.import.dialogs.description')}
                    </DialogDescription>
                </DialogHeader>
                {/*Download template button*/}
                <div className='flex flex-col space-y-4'>
                    <Label>
                        {t('pages.carriage.partials.import.dialogs.fields.download_template')}
                    </Label>
                    <Button
                        variant='secondary'
                        type='button'
                        onClick={carriageService.downloadImportDataTemplate}
                        disabled={loading}
                    >
                        {loading
                            ? t('action.loading')
                            : t('pages.carriage.partials.import.dialogs.buttons.download_template')}
                    </Button>
                </div>
                <form onSubmit={handleImportData} className='space-y-4'>
                    <div className='space-y-4'>
                        <Label htmlFor='file'>
                            {t('pages.carriage.partials.import.dialogs.fields.file')}
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
                                : t('pages.carriage.partials.import.dialogs.buttons.import')}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
