import GenericDataSelector from '@/Components/GenericDataSelector';
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
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/Components/UI/dropdown-menu';
import { Input } from '@/Components/UI/input';
import { Label } from '@/Components/UI/label';
import { RadioGroup, RadioGroupItem } from '@/Components/UI/radio-group';
import { useLoading } from '@/Contexts/LoadingContext';
import { useSuccessToast } from '@/Hooks/useToast';
import { projectService } from '@/Services/projectService';
import { workAspectService } from '@/Services/workAspectService';
import { ROUTES } from '@/Support/Constants/routes';
import { ServiceFilterOptions } from '@/Support/Interfaces/Others/ServiceFilterOptions';
import { ProjectImportProgressMaterialOverride } from '@/Support/Interfaces/Types';
import { withLoading } from '@/Utils/withLoading';
import { router, useForm } from '@inertiajs/react';
import { useLaravelReactI18n } from 'laravel-react-i18n';
import { OctagonAlert } from 'lucide-react';
import { ChangeEvent, FormEvent, useCallback, useState } from 'react';

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/Components/UI/tooltip';
import { componentService } from '@/Services/componentService';

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
        await useSuccessToast(
            t('pages.project.carriage.component.partials.import.messages.imported'),
        );
        router.visit(
            route(`${ROUTES.PROJECTS_CARRIAGES_COMPONENTS}.index`, [project.id, carriage.id]),
        );
    });
    const fetchWorkAspects = useCallback(async () => {
        return await workAspectService
            .getAll({
                ...filters,
                relations: 'division',
            })
            .then((response) => response.data);
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
            <DialogContent className='sm:max-w-[425px]'>
                <DialogHeader>
                    <DialogTitle>{t('pages.project.partials.import.dialogs.title')}</DialogTitle>
                    <DialogDescription>
                        {t('pages.project.carriage.component.partials.import.dialogs.description', {
                            component_name: component.name,
                            project_name: project.name,
                        })}
                    </DialogDescription>
                </DialogHeader>
                <div className='flex flex-col space-y-4'>
                    <Label>
                        {t(
                            'pages.project.carriage.component.partials.import.dialogs.fields.download_template',
                        )}
                    </Label>
                    <Button
                        variant='secondary'
                        type='button'
                        onClick={componentService.downloadImportProgressRawMaterialTemplate.bind(
                            null,
                            component.id,
                        )}
                        disabled={loading}
                    >
                        {loading
                            ? t('action.loading')
                            : t(
                                  'pages.project.carriage.component.partials.import.dialogs.buttons.download_template',
                              )}
                    </Button>
                </div>
                <div className='space-y-4'>
                    <Label htmlFor='work_aspect_id'>
                        {t(
                            'pages.project.carriage.component.partials.import.dialogs.fields.work_aspect',
                        )}
                    </Label>
                    <GenericDataSelector
                        setSelectedData={(id) => setData('work_aspect_id', id)}
                        selectedDataId={data.work_aspect_id ?? null}
                        renderItem={(item) =>
                            `${item.name}${item.division?.name ? ` - ${item.division.name}` : ''}`
                        }
                        placeholder={'Choose'}
                        nullable
                        id='work_aspect_id'
                        fetchData={fetchWorkAspects}
                        buttonClassName='mt-1'

                        // TODO: possible minor issue: perform pre-search on the workstation if trainset attachment created
                        // initialSearch={}
                    />
                </div>
                <form onSubmit={handleImportData} className='space-y-4'>
                    <div className='space-y-4'>
                        <Label htmlFor='file'>
                            {t(
                                'pages.project.carriage.component.partials.import.dialogs.fields.file',
                            )}
                        </Label>
                        <Input
                            type='file'
                            onChange={handleChangeImportFile}
                            id='file'
                            accept='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
                        />
                        {hasMaterials ? (
                            <div className='rounded text-black'>
                                {/* <div className="flex items-center px-2 py-3 gap-2 bg-warning rounded-md">
                                    <OctagonAlert className="h-[30px]"></OctagonAlert>
                                    <p className="">
                                        {t(
                                            'pages.project.carriage.component.partials.import.dialogs.description_already_has_material',
                                        )}
                                    </p>
                                </div> */}

                                {/* <div className="bg-white dark:bg-transparent dark:text-white text-black p-3 space-y-2 rounded-b">
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
                                                className="border-black text-black dark:border-white dark:text-white"
                                            />
                                            <Label htmlFor="default">
                                                {t(
                                                    'pages.project.carriage.component.partials.import.dialogs.fields.override_merge',
                                                )}
                                            </Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem
                                                value="merge"
                                                id="merge"
                                                color="crimson"
                                                className="border-black text-black dark:border-white dark:text-white"
                                            />
                                            <Label htmlFor="merge">
                                                {t(
                                                    'pages.project.carriage.component.partials.import.dialogs.fields.override_default',
                                                )}
                                            </Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem
                                                value="override"
                                                id="override"
                                                className="border-black text-black dark:border-white dark:text-white"
                                            />
                                            <Label htmlFor="override">
                                                {t(
                                                    'pages.project.carriage.component.partials.import.dialogs.fields.override_override',
                                                )}
                                            </Label>
                                        </div>
                                    </RadioGroup>
                                </div> */}
                                <DropdownMenu>
                                    <DropdownMenuTrigger className='w-full'>
                                        <div className='flex items-center gap-2 rounded-md bg-warning px-2 py-3'>
                                            <OctagonAlert className='h-[30px]'></OctagonAlert>
                                            <p className=''>
                                                {t(
                                                    'pages.project.carriage.component.partials.import.dialogs.description_already_has_material',
                                                )}
                                            </p>
                                        </div>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent className='w-[450px]'>
                                        <DropdownMenuLabel>
                                            {t(
                                                'pages.project.carriage.component.partials.import.dialogs.fields.override',
                                            )}
                                        </DropdownMenuLabel>
                                        <DropdownMenuSeparator />
                                        <RadioGroup
                                            value={data.override}
                                            onValueChange={(value) =>
                                                setData('override', value as any)
                                            }
                                            id='import-override'
                                            className='mt-5 flex justify-between'
                                        >
                                            <div className='flex items-center space-x-2'>
                                                <RadioGroupItem
                                                    value='default'
                                                    id='default'
                                                    className='border-black text-black dark:border-white dark:text-white'
                                                />
                                                <TooltipProvider delayDuration={70}>
                                                    <Tooltip>
                                                        <TooltipTrigger className='w-full text-left'>
                                                            <Label htmlFor='default'>
                                                                {t(
                                                                    'pages.project.carriage.component.partials.import.dialogs.fields.override_merge',
                                                                )}
                                                            </Label>
                                                        </TooltipTrigger>
                                                        <TooltipContent>
                                                            <p>
                                                                Gabungkan antara komponen sebelum
                                                                dan sesudah
                                                            </p>
                                                        </TooltipContent>
                                                    </Tooltip>
                                                </TooltipProvider>
                                            </div>
                                            <div className='flex items-center space-x-2'>
                                                <RadioGroupItem
                                                    value='merge'
                                                    id='merge'
                                                    color='crimson'
                                                    className='border-black text-black dark:border-white dark:text-white'
                                                />
                                                <TooltipProvider delayDuration={70}>
                                                    <Tooltip>
                                                        <TooltipTrigger className='w-full text-left'>
                                                            <Label htmlFor='merge'>
                                                                {t(
                                                                    'pages.project.carriage.component.partials.import.dialogs.fields.override_default',
                                                                )}
                                                            </Label>
                                                        </TooltipTrigger>
                                                        <TooltipContent>
                                                            <p>Import kembali seluruh komponen</p>
                                                        </TooltipContent>
                                                    </Tooltip>
                                                </TooltipProvider>
                                            </div>
                                            <div className='flex items-center space-x-2'>
                                                <RadioGroupItem
                                                    value='override'
                                                    id='override'
                                                    className='border-black text-black dark:border-white dark:text-white'
                                                />
                                                <TooltipProvider delayDuration={70}>
                                                    <Tooltip>
                                                        <TooltipTrigger className='w-full text-left'>
                                                            <Label htmlFor='override'>
                                                                {t(
                                                                    'pages.project.carriage.component.partials.import.dialogs.fields.override_override',
                                                                )}
                                                            </Label>
                                                        </TooltipTrigger>
                                                        <TooltipContent>
                                                            <p>Menimpa Import</p>
                                                        </TooltipContent>
                                                    </Tooltip>
                                                </TooltipProvider>
                                            </div>
                                        </RadioGroup>
                                        <div className='mt-5 flex w-full justify-center'>
                                            <Button type='submit' disabled={loading}>
                                                {loading
                                                    ? t('action.loading')
                                                    : t(
                                                          'pages.project.carriage.component.partials.import.dialogs.buttons.submit',
                                                      )}
                                            </Button>
                                        </div>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                        ) : (
                            <div className='flex w-full justify-center'>
                                <Button type='submit' disabled={loading}>
                                    {loading
                                        ? t('action.loading')
                                        : t(
                                              'pages.project.carriage.component.partials.import.dialogs.buttons.submit',
                                          )}
                                </Button>
                            </div>
                        )}
                    </div>
                    <DialogFooter></DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
