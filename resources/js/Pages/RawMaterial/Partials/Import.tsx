import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/Components/ui/dialog';
import { Button } from '@/Components/ui/button';
import { Label } from '@/Components/ui/label';
import { Input } from '@/Components/ui/input';
import { ROUTES } from '@/support/constants/routes';
import { IntentEnum } from '@/support/enums/intentEnum';
import { router, useForm } from '@inertiajs/react';
import { rawMaterialService } from '@/services/rawMaterialService';
import { useState } from 'react';

export default function () {
    const [isLoading, setIsLoading] = useState(false);
    const { data, setData } = useForm<{
        file: File | null;
    }>({
        file: null,
    });
    const handleGetImportDataTemplate = async () => {
        const response = await window.axios.get(
            route(`${ROUTES.RAW_MATERIALS}.index`, {
                intent: IntentEnum.WEB_RAW_MATERIAL_IMPORT_RAW_MATERIAL,
            }),
            { responseType: 'blob' },
        );

        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'rawMaterials.xlsx');
        document.body.appendChild(link);
        link.click();
        link.remove();
    };

    const handleImportData = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsLoading(true);
        await rawMaterialService.importData(data.file as File);
        router.visit(route(`${ROUTES.RAW_MATERIALS}.index`));
        setIsLoading(false);
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
                    <Button type="button" variant="secondary" onClick={handleGetImportDataTemplate}>
                        Download
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
                        <Button type="submit" disabled={isLoading}>
                            {isLoading ? 'Processing' : 'Import'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
