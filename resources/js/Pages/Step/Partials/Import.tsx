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
import { IntentEnum } from '@/Support/Enums/intentEnum';
import { router, useForm } from '@inertiajs/react';
import { stepService } from '@/Services/stepService';
import { useSuccessToast } from '@/Hooks/useToast';
import { useLoading } from '@/Contexts/LoadingContext';

export default function () {
    const { data, setData } = useForm<{
        file: File | null;
    }>({
        file: null,
    });
    const { setLoading, loading } = useLoading();
    const handleGetImportDataTemplate = async () => {
        setLoading(true);
        const response = await window.axios.get(
            route(`${ROUTES.STEPS}.index`, {
                intent: IntentEnum.WEB_STEP_GET_TEMPLATE_IMPORT_STEP,
            }),
            { responseType: 'blob' },
        );

        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'steps.xlsx');
        document.body.appendChild(link);
        link.click();
        link.remove();
        setLoading(false);
    };

    const handleImportData = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true);
        const redirectToIndex = () => router.visit(route(`${ROUTES.STEPS}.index`));
        await stepService.importData(data.file as File);
        await useSuccessToast('Data imported successfully');
        redirectToIndex();
        setLoading(false);
    };

    const handleChangeImportFile = (e: React.ChangeEvent<HTMLInputElement>) => {
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
                    <DialogTitle>Import Data</DialogTitle>
                    <DialogDescription>Import data from a file to populate the table.</DialogDescription>
                </DialogHeader>
                {/*Download template button*/}
                <div className="flex flex-col space-y-4">
                    <Label>Download Template</Label>
                    <Button type="button" variant="secondary" onClick={handleGetImportDataTemplate} disabled={loading}>
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
