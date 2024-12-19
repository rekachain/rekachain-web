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
import { panelService } from '@/Services/panelService';
import { projectService } from '@/Services/projectService';
import { ROUTES } from '@/Support/Constants/routes';
import { withLoading } from '@/Utils/withLoading';
import { router, useForm } from '@inertiajs/react';
import { useLaravelReactI18n } from 'laravel-react-i18n';
import { ChangeEvent, FormEvent } from 'react';

export default function ({
    project,
    panel,
    hasMaterials = false,
}: {
    project: any;
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
        await projectService.importPanelsProgressRawMaterial(
            project.id,
            data.file as File,
            panel.id,
        );
        await useSuccessToast(t('pages.project.panel.partials.import.messages.imported'));
        router.visit(route(`${ROUTES.PROJECTS_PANELS}.index`, [project.id]));
    });

    const handleChangeImportFile = (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.currentTarget.files;
        if (files) setData('file', files[0]);
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant={hasMaterials ? 'warning' : 'tertiary'}>
                    {t('pages.project.panel.partials.import.buttons.import')}
                </Button>
            </DialogTrigger>
            <DialogContent className='sm:max-w-[425px]'>
                <DialogHeader>
                    <DialogTitle>{t('pages.project.partials.import.dialogs.title')}</DialogTitle>
                    <DialogDescription>
                        {t('pages.project.panel.partials.import.dialogs.description', {
                            panel_name: panel.name,
                            project_name: project.name,
                        })}
                    </DialogDescription>
                </DialogHeader>
                <div className='flex flex-col space-y-4'>
                    <Label>
                        {t('pages.project.panel.partials.import.dialogs.fields.download_template')}
                    </Label>
                    <Button
                        variant='secondary'
                        type='button'
                        onClick={panelService.downloadImportProgressRawMaterialTemplate.bind(
                            null,
                            panel.id,
                        )}
                        disabled={loading}
                    >
                        {loading
                            ? t('action.loading')
                            : t(
                                  'pages.project.panel.partials.import.dialogs.buttons.download_template',
                              )}
                    </Button>
                </div>
                <form onSubmit={handleImportData} className='space-y-4'>
                    <div className='space-y-4'>
                        <Label htmlFor='file'>
                            {t('pages.project.panel.partials.import.dialogs.buttons.import')}
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
                                : t('pages.project.panel.partials.import.dialogs.buttons.submit')}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
