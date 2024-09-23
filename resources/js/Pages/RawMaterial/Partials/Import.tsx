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
import { rawMaterialService } from '@/Services/rawMaterialService';
import { useState } from 'react';

export default function () {
    const [isLoading, setIsLoading] = useState(false);
    const { data, setData } = useForm<{
        file: File | null;
    }>({
        file: null,
    });

    const handleImportData = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsLoading(true);
        try {
            await rawMaterialService.importData(data.file as File);
            setIsLoading(false);
            router.visit(route(`${ROUTES.RAW_MATERIALS}.index`));
        } catch (error) {
        } finally {
            setIsLoading(false);
        }
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
                <div className="flex flex-col space-y-4">
                    <Label>Download Template</Label>
                    <Button type="button" variant="secondary" onClick={rawMaterialService.downloadImportDataTemplate}>
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
