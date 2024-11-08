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
import { panelService } from '@/Services/panelService';
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
        await panelService.importData(data.file as File);
        router.visit(route(`${ROUTES.PANELS}.index`));
        await useSuccessToast(t('pages.panel.partials.import.messages.imported'));
    });

    const handleChangeImportFile = (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.currentTarget.files;
        if (files) setData('file', files[0]);
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="tertiary">{t('pages.panel.partials.import.buttons.import')}</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>{t('pages.panel.partials.import.title')}</DialogTitle>
                    <DialogDescription>{t('pages.panel.partials.import.description')}</DialogDescription>
                </DialogHeader>
                <div className="flex flex-col space-y-4">
                    <Label>{t('pages.panel.partials.import.dialogs.fields.file')}</Label>
                    <Button
                        type="button"
                        variant="secondary"
                        onClick={panelService.downloadImportDataTemplate}
                        disabled={loading}
                    >
                        {loading
                            ? t('pages.panel.partials.import.dialogs.buttons.processing')
                            : t('pages.panel.partials.import.dialogs.buttons.download_template')}
                    </Button>
                </div>
                <form onSubmit={handleImportData} className="space-y-4">
                    <div className="space-y-4">
                        <Label htmlFor="file">{t('pages.panel.partials.import.dialogs.fields.file')}</Label>
                        <Input
                            id="file"
                            type="file"
                            accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                            onChange={handleChangeImportFile}
                        />
                    </div>
                    <DialogFooter>
                        <Button type="submit" disabled={loading}>
                            {loading
                                ? t('pages.panel.partials.import.dialogs.buttons.processing')
                                : t('pages.panel.partials.import.dialogs.buttons.import')}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
