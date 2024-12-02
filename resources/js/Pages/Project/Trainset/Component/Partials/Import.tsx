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
import { ChangeEvent, FormEvent, useCallback, useState } from 'react';
import { withLoading } from '@/Utils/withLoading';
import { projectService } from '@/Services/projectService';
import GenericDataSelector from '@/Components/GenericDataSelector';
import { ServiceFilterOptions } from '@/Support/Interfaces/Others/ServiceFilterOptions';
import { workAspectService } from '@/Services/workAspectService';
import { useLaravelReactI18n } from 'laravel-react-i18n';
import { componentService } from '@/Services/componentService';

export default function ({
    project,
    trainset,
    component,
    hasMaterials = false,
}: {
    project: any;
    trainset: any;
    component: any;
    hasMaterials?: boolean;
}) {
    const { t } = useLaravelReactI18n();
    const { data, setData } = useForm<{
        file: File | null;
        component_id: number;
        work_aspect_id: number | null;
    }>({
        file: null,
        component_id: component.id,
        work_aspect_id: null,
    });

    const [filters, setFilters] = useState<ServiceFilterOptions>({
        column_filters: {
            division_id: [1, 2],
        },
    });

    const { loading } = useLoading();

    const handleImportData = withLoading(async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        await projectService.importTrainsetComponentsProgressRawMaterial(
            project.id,
            trainset.id,
            data.file as File,
            component.id,
            data.work_aspect_id as number,
        );
        await useSuccessToast(t('pages.project.component.partials.import.messages.imported'));
        router.visit(route(`${ROUTES.PROJECTS_COMPONENTS}.index`, [project.id]));
    });
    const fetchWorkAspects = useCallback(async () => {
        return await workAspectService
            .getAll({
                ...filters,
                relations: 'division',
            })
            .then(response => response.data);
    }, []);

    const handleChangeImportFile = (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.currentTarget.files;
        if (files) setData('file', files[0]);
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant={hasMaterials ? 'warning' : 'tertiary'}>
                    {t('pages.project.component.partials.import.buttons.import')}
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>{'Import Komponen'}</DialogTitle>
                    <DialogDescription>
                        {/* Import komponen dan progress untuk trainset */}
                        {t('pages.project.component.partials.import.dialogs.description', {
                            component_name: component.name,
                            project_name: project.name,
                        })}
                    </DialogDescription>
                </DialogHeader>
                <div className="flex flex-col space-y-4">
                    <Label>{t('pages.project.component.partials.import.dialogs.fields.download_template')}</Label>
                    <Button
                        type="button"
                        variant="secondary"
                        onClick={componentService.downloadImportProgressRawMaterialTemplate.bind(null, component.id)}
                        disabled={loading}
                    >
                        {loading
                            ? t('action.loading')
                            : t('pages.project.component.partials.import.dialogs.buttons.download_template')}
                    </Button>
                </div>
                <div className="space-y-4">
                    <Label htmlFor="work_aspect_id">
                        {t('pages.project.component.partials.import.dialogs.fields.work_aspect')}
                    </Label>
                    <GenericDataSelector
                        id="work_aspect_id"
                        fetchData={fetchWorkAspects}
                        setSelectedData={id => setData('work_aspect_id', id)}
                        selectedDataId={data.work_aspect_id ?? null}
                        placeholder={'Choose'}
                        renderItem={item => `${item.name}${item.division?.name ? ` - ${item.division.name}` : ''}`}
                        buttonClassName="mt-1"
                        nullable

                        // TODO: possible minor issue: perform pre-search on the workstation if trainset attachment created
                        // initialSearch={}
                    />
                </div>
                <form onSubmit={handleImportData} className="space-y-4">
                    <div className="space-y-4">
                        <Label htmlFor="file">{t('pages.project.component.partials.import.dialogs.fields.file')}</Label>
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
                                : t('pages.project.component.partials.import.dialogs.buttons.submit')}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
