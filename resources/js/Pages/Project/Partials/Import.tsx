import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/Components/UI/accordion';
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
import { projectService } from '@/Services/projectService';
import { ROUTES } from '@/Support/Constants/routes';
import { withLoading } from '@/Utils/withLoading';
import { router, useForm } from '@inertiajs/react';
import { useLaravelReactI18n } from 'laravel-react-i18n';
import { ChangeEvent, FormEvent } from 'react';
import BuyerForm from './Partials/BuyerForm';

export default function () {
    const { t } = useLaravelReactI18n();

    const { data, setData } = useForm<{
        file: File | null;
        buyer_id: number | null;
    }>({
        file: null,
        buyer_id: null,
    });
    const { loading } = useLoading();

    const handleImportData = withLoading(async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        await projectService.importProject(data.file as File, data.buyer_id);
        router.visit(route(`${ROUTES.PROJECTS}.index`));
        void useSuccessToast(t('pages.project.partials.import.messages.imported'));
    });

    const handleChangeImportFile = (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.currentTarget.files;
        if (files) setData('file', files[0]);
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant='tertiary'>
                    {t('pages.project.partials.import.buttons.import')}
                </Button>
            </DialogTrigger>
            <DialogContent className='sm:max-w-[425px]'>
                <DialogHeader>
                    <DialogTitle>{t('pages.project.partials.import.dialogs.title')}</DialogTitle>
                    <DialogDescription>
                        {t('pages.project.partials.import.dialogs.description')}
                    </DialogDescription>
                </DialogHeader>
                {/*Download template button*/}
                <div className='flex flex-col space-y-4'>
                    <Label>
                        {t('pages.project.partials.import.dialogs.fields.download_template')}
                    </Label>
                    <Button
                        variant='secondary'
                        type='button'
                        onClick={projectService.downloadImportProjectTemplate}
                        disabled={loading}
                    >
                        {loading
                            ? t('action.loading')
                            : t('pages.project.partials.import.dialogs.buttons.download_template')}
                    </Button>
                </div>
                <form onSubmit={handleImportData} id='import-form' className='hidden'></form>
                <div className='space-y-4'>
                    <Label htmlFor='file'>
                        {t('pages.project.partials.import.dialogs.fields.file')}
                    </Label>
                    <Input
                        type='file'
                        onChange={handleChangeImportFile}
                        id='file'
                        accept='application/vnd.ms-excel.sheet.macroEnabled.12'
                    />
                </div>
                <Accordion type='single' collapsible>
                    <AccordionItem value='item-1'>
                        <AccordionTrigger>{'Pembeli (OPSIONAL)'}</AccordionTrigger>
                        <AccordionContent>
                            <BuyerForm
                                setBuyerId={(buyer_id: number) => setData('buyer_id', buyer_id)}
                            />
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
                <DialogFooter>
                    <Button type='submit' form='import-form' disabled={loading}>
                        {loading
                            ? t('action.loading')
                            : t('pages.project.partials.import.dialogs.buttons.import')}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
