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
import { projectService } from '@/Services/projectService';
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
        await projectService.importProject(data.file as File);
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
                <Button variant="tertiary">{t('pages.project.partials.import.buttons.import')}</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>{t('pages.project.partials.import.dialogs.title')}</DialogTitle>
                    <DialogDescription>{t('pages.project.partials.import.dialogs.description')}</DialogDescription>
                </DialogHeader>
                {/*Download template button*/}
                <div className="flex flex-col space-y-4">
                    <Label>{t('pages.project.partials.import.dialogs.fields.download_template')}</Label>
                    <Button
                        type="button"
                        variant="secondary"
                        onClick={projectService.downloadImportProjectTemplate}
                        disabled={loading}
                    >
                        {loading
                            ? t('action.loading')
                            : t('pages.project.partials.import.dialogs.buttons.download_template')}
                    </Button>
                </div>
                <form onSubmit={handleImportData} className="space-y-4">
                    <div className="space-y-4">
                        <Label htmlFor="file">{t('pages.project.partials.import.dialogs.fields.file')}</Label>
                        <Input
                            id="file"
                            type="file"
                            accept="application/vnd.ms-excel.sheet.macroEnabled.12"
                            onChange={handleChangeImportFile}
                        />
                    </div>
                    <DialogFooter>
                        <Button type="submit" disabled={loading}>
                            {loading ? t('action.loading') : t('pages.project.partials.import.dialogs.buttons.import')}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}