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
import { RadioGroup, RadioGroupItem } from '@/Components/UI/radio-group';
import { ProjectImportProgressMaterialOverride } from '@/Support/Interfaces/Types';

export default function ({
    project,
    carriage,
    component,
    hasMaterials = false,
}: {
    project: any;
    carriage: any;
    component: any;
    hasMaterials?: boolean;
}) {
    const { t } = useLaravelReactI18n();
    const { data, setData } = useForm<{
        file: File | null;
        component_id: number;
        work_aspect_id: number | null;
        override: ProjectImportProgressMaterialOverride;
    }>({
        file: null,
        component_id: component.id,
        work_aspect_id: null,
        override: 'default',
    });

    const [filters, setFilters] = useState<ServiceFilterOptions>({
        column_filters: {
            division_id: [1, 2],
        },
    });

    const { loading } = useLoading();

    const handleImportData = withLoading(async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        await projectService.importCarriageComponentsProgressRawMaterial(
            project.id,
            carriage.id,
            data.file as File,
            component.id,
            data.work_aspect_id as number,
            data.override,
        );
        await useSuccessToast(t('pages.project.carriage.component.partials.import.messages.imported'));
        router.visit(route(`${ROUTES.PROJECTS_CARRIAGES_COMPONENTS}.index`, [project.id, carriage.id]));
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
                    {t('pages.project.carriage.component.partials.import.buttons.import')}
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>{t('pages.project.partials.import.dialogs.title')}</DialogTitle>
                    <DialogDescription>
                        {t('pages.project.carriage.component.partials.import.dialogs.description', {
                            component_name: component.name,
                            project_name: project.name,
                        })}
                    </DialogDescription>
                </DialogHeader>
                <div className="flex flex-col space-y-4">
                    <Label>
                        {t('pages.project.carriage.component.partials.import.dialogs.fields.download_template')}
                    </Label>
                    <Button
                        type="button"
                        variant="secondary"
                        onClick={projectService.downloadImportProgressRawMaterialTemplate}
                        disabled={loading}
                    >
                        {loading
                            ? t('action.loading')
                            : t('pages.project.carriage.component.partials.import.dialogs.buttons.download_template')}
                    </Button>
                </div>
                <div className="space-y-4">
                    <Label htmlFor="work_aspect_id">
                        {t('pages.project.carriage.component.partials.import.dialogs.fields.work_aspect')}
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
                        <Label htmlFor="file">
                            {t('pages.project.carriage.component.partials.import.dialogs.fields.file')}
                        </Label>
                        <Input
                            id="file"
                            type="file"
                            accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                            onChange={handleChangeImportFile}
                        />
                        {hasMaterials && (
                            <div className="bg-warning text-black rounded">
                                <p className="p-3">
                                    {t(
                                        'pages.project.carriage.component.partials.import.dialogs.description_already_has_material',
                                    )}
                                </p>

                                <div className="bg-white text-black p-3 space-y-2 rounded-b">
                                    <Label htmlFor="import-override">
                                        {t('pages.project.carriage.component.partials.import.dialogs.fields.override')}
                                    </Label>
                                    <RadioGroup
                                        id="import-override"
                                        className="flex justify-between"
                                        value={data.override}
                                        onValueChange={value => setData('override', value as any)}
                                    >
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem
                                                value="default"
                                                id="default"
                                                color="crimson"
                                                className="border-black text-black"
                                            />
                                            <Label htmlFor="default">
                                                {t(
                                                    'pages.project.carriage.component.partials.import.dialogs.fields.override_default',
                                                )}
                                            </Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem
                                                value="override"
                                                id="override"
                                                className="border-black text-black"
                                            />
                                            <Label htmlFor="override">
                                                {t(
                                                    'pages.project.carriage.component.partials.import.dialogs.fields.override_override',
                                                )}
                                            </Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem
                                                value="merge"
                                                id="merge"
                                                className="border-black text-black"
                                            />
                                            <Label htmlFor="merge">
                                                {t(
                                                    'pages.project.carriage.component.partials.import.dialogs.fields.override_merge',
                                                )}
                                            </Label>
                                        </div>
                                    </RadioGroup>
                                </div>
                            </div>
                        )}
                    </div>
                    <DialogFooter>
                        <Button type="submit" disabled={loading}>
                            {loading
                                ? t('action.loading')
                                : t('pages.project.carriage.component.partials.import.dialogs.buttons.submit')}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
