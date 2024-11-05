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

export default function ({ project, panel }: { project: any, panel: any }) {
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
        // console.log(data);
        await projectService.importPanelsProgressRawMaterial(project.id, data.file as File, panel.id);
        await useSuccessToast('Data imported successfully');
        router.visit(route(`${ROUTES.PROJECTS_PANELS}.index`, [project.id]));
    });

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
                    <DialogTitle>Import Panel Data</DialogTitle>
                    <DialogDescription>Import progress and raw material data of {panel.name} on Project {project.name}.</DialogDescription>
                </DialogHeader>
                <div className="flex flex-col space-y-4">
                    <Label>Download Template</Label>
                    <Button type="button" variant="secondary" onClick={projectService.downloadImportProgressRawMaterialTemplate} disabled={loading}>
                        {loading ? 'Processing' : 'Download'}
                    </Button>
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

