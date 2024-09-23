import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router, useForm } from '@inertiajs/react';
import { ROUTES } from '@/support/constants/routes';
import { Input } from '@/Components/ui/input';
import { FormEventHandler } from 'react';
import InputLabel from '@/Components/InputLabel';
import { Button } from '@/Components/ui/button';
import { divisionService } from '@/services/divisionService';
import { useSuccessToast } from '@/hooks/useToast';
import { withLoading } from '@/utils/withLoading';
import { useLoading } from '@/Contexts/LoadingContext';

export default function Create() {
    const { data, setData } = useForm({ name: '' });
    const { loading } = useLoading();
    const submit: FormEventHandler = withLoading(async e => {
        e.preventDefault();
        await divisionService.create(data);
        useSuccessToast('Division created successfully');
        router.visit(route(`${ROUTES.DIVISIONS}.index`));
    });

    return (
        <AuthenticatedLayout>
            <Head title="Tambah Division" />
            <div className="p-4">
                <div className="flex gap-5 items-center">
                    <h1 className="text-page-header my-4">Tambah Division</h1>
                </div>

                <form onSubmit={submit} encType="multipart/form-data">
                    <div className="mt-4">
                        <InputLabel htmlFor="nama" value="Nama" />
                        <Input
                            id="nama"
                            type="text"
                            name="nama"
                            value={data.name}
                            className="mt-1"
                            autoComplete="nama"
                            onChange={e => setData('name', e.target.value)}
                        />
                    </div>

                    <Button className="mt-4" disabled={loading}>
                        Tambah Division
                    </Button>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
