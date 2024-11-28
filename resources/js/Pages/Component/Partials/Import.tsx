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
import { componentService } from '@/Services/componentService';
import { useSuccessToast } from '@/Hooks/useToast';
import { useLoading } from '@/Contexts/LoadingContext';
import { ChangeEvent, FormEvent } from 'react';
import { withLoading } from '@/Utils/withLoading';

export default function () {
    const { data, setData } = useForm<{
        file: File | null;
    }>({
        file: null,
    });
    const { loading } = useLoading();

    const handleImportData = withLoading(async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // await componentService.importData(data.file as File);
        await useSuccessToast('Data imported successfully');
        router.visit(route(`${ROUTES.COMPONENTS}.index`));
    });

    const handleChangeImportFile = (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.currentTarget.files;
        if (files) setData('file', files[0]);
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant='tertiary'>Import Data</Button>
            </DialogTrigger>
            <DialogContent className='sm:max-w-[425px]'>
                <DialogHeader>
                    <DialogTitle>Import Data</DialogTitle>
                    <DialogDescription>
                        Import data from a file to populate the table.
                    </DialogDescription>
                </DialogHeader>
                <div className='flex flex-col space-y-4'>
                    <Label>Download Template</Label>
                    <Button
                        variant='secondary'
                        type='button'
                        onClick={componentService.downloadImportDataTemplate}
                        disabled={loading}
                    >
                        {loading ? 'Processing' : 'Download'}
                    </Button>
                </div>
                <form onSubmit={handleImportData} className='space-y-4'>
                    <div className='space-y-4'>
                        <Label htmlFor='file'>File</Label>
                        <Input
                            type='file'
                            onChange={handleChangeImportFile}
                            id='file'
                            accept='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
                        />
                    </div>
                    <DialogFooter>
                        <Button type='submit' disabled={loading}>
                            {loading ? 'Processing' : 'Import'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
