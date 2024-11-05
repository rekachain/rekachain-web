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
import { componentService } from '@/Services/componentService';
import { useSuccessToast } from '@/Hooks/useToast';
import { useLoading } from '@/Contexts/LoadingContext';
import { ChangeEvent, FormEvent, useCallback, useState } from 'react';
import { withLoading } from '@/Utils/withLoading';
import { projectService } from '@/Services/projectService';
import GenericDataSelector from '@/Components/GenericDataSelector';
import { ServiceFilterOptions } from '@/Support/Interfaces/Others/ServiceFilterOptions';
import { workAspectService } from '@/Services/workAspectService';

export default function ({ project, component }: { project: any, component: any }) {
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
            division_id: [
                1,2
            ],
        },
    });

    const { loading } = useLoading();

    const handleImportData = withLoading(async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // console.log(data);
        await projectService.importComponentsProgressRawMaterial(project.id, data.file as File, component.id, data.work_aspect_id as number);
        await useSuccessToast('Data imported successfully');
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
                <Button variant="tertiary">Import Data</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Import Component Data</DialogTitle>
                    <DialogDescription>Import progress and raw material data of {component.name} on Project {project.name}.</DialogDescription>
                </DialogHeader>
                <div className="flex flex-col space-y-4">
                    <Label>Download Template</Label>
                    <Button type="button" variant="secondary" onClick={projectService.downloadImportProgressRawMaterialTemplate} disabled={loading}>
                        {loading ? 'Processing' : 'Download'}
                    </Button>
                </div>
                <div className="space-y-4">
                    <Label htmlFor="work_aspect_id">Work Aspect</Label>
                    <GenericDataSelector
                        id="work_aspect_id"
                        fetchData={fetchWorkAspects}
                        setSelectedData={id => setData('work_aspect_id',id)
                        }
                        selectedDataId={
                            data.work_aspect_id ?? null
                        }
                        placeholder={"Choose"}
                        renderItem={item => `${item.name}${item.division?.name ? ` - ${item.division.name}` : ''}`}
                        buttonClassName="mt-1"
                        nullable

                        // TODO: possible minor issue: perform pre-search on the workstation if trainset attachment created
                        // initialSearch={}
                    />
                </div>
                <form onSubmit={handleImportData} className="space-y-4">
                    <div className="space-y-4">
                        <Label htmlFor="file">File</Label>
                        <Input
                            id="file"
                            type="file"
                            accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                            onChange={handleChangeImportFile}
                        />
                    </div>
                    <DialogFooter>
                        <Button type="submit" disabled={loading}>
                            {loading ? 'Processing' : 'Import'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}

