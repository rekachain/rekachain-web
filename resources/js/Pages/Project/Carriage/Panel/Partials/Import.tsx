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
import { useSuccessToast } from '@/Hooks/useToast';
import { useLoading } from '@/Contexts/LoadingContext';
import { ChangeEvent, FormEvent } from 'react';
import { withLoading } from '@/Utils/withLoading';
import { projectService } from '@/Services/projectService';
import { useLaravelReactI18n } from 'laravel-react-i18n';
import { panelService } from '@/Services/panelService';

export default function ({
    project,
    carriage,
    panel,
    hasMaterials = false,
}: {
    project: any;
    carriage: any;
    panel: any;
    hasMaterials?: boolean;
}) {
    const { t } = useLaravelReactI18n();
    const { data, setData } = useForm<{
        file: File | null;
        panel_id: number;
    }>({
        file: null,
        panel_id: panel.id,
    });
    const { loading } = useLoading();

    const handleImportData = withLoading(async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        await projectService.importCarriagePanelsProgressRawMaterial(
            project.id,
            carriage.id,
            data.file as File,
            panel.id,
        );
        await useSuccessToast(t('pages.project.carriage.panel.partials.import.messages.imported'));
        router.visit(route(`${ROUTES.PROJECTS_CARRIAGES_PANELS}.index`, [project.id, carriage.id]));
    });

    const handleChangeImportFile = (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.currentTarget.files;
        if (files) setData('file', files[0]);
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant={hasMaterials ? 'warning' : 'tertiary'}>
                    {t('pages.project.carriage.panel.partials.import.buttons.import')}
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>{t('pages.project.partials.import.dialogs.title')}</DialogTitle>
                    <DialogDescription>
                        {t('pages.project.carriage.panel.partials.import.dialogs.description', {
                            panel_name: panel.name,
                            project_name: project.name,
                        })}
                    </DialogDescription>
                </DialogHeader>
                <div className="flex flex-col space-y-4">
                    <Label>{t('pages.project.carriage.panel.partials.import.dialogs.fields.download_template')}</Label>
                    <Button
                        type="button"
                        variant="secondary"
                        onClick={panelService.downloadImportProgressRawMaterialTemplate.bind(null, panel.id)}
                        disabled={loading}
                    >
                        {loading
                            ? t('action.loading')
                            : t('pages.project.carriage.panel.partials.import.dialogs.buttons.download_template')}
                    </Button>
                </div>
                <form onSubmit={handleImportData} className="space-y-4">
                    <div className="space-y-4">
                        <Label htmlFor="file">
                            {t('pages.project.carriage.panel.partials.import.dialogs.buttons.import')}
                        </Label>
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
                                ? t('action.loading')
                                : t('pages.project.carriage.panel.partials.import.dialogs.buttons.submit')}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
