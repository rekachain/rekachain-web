import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router, useForm } from '@inertiajs/react';
import { Input } from '@/Components/UI/input';
import { FormEventHandler } from 'react';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';
import { Button } from '@/Components/UI/button';
import { panelService } from '@/Services/panelService';
import { ROUTES } from '@/Support/Constants/routes';
import { useSuccessToast } from '@/Hooks/useToast';
import { useLoading } from '@/Contexts/LoadingContext';
import { withLoading } from '@/Utils/withLoading';

export default function () {
    const { data, setData } = useForm({
        name: '',
        description: '',
    });

    const { loading } = useLoading();

    const submit: FormEventHandler = withLoading(async e => {
        e.preventDefault();

        await panelService.create(data);
        router.visit(route(`${ROUTES.PANELS}.index`));
        void useSuccessToast('Panel created successfully');
    });

    return (
        <>
            <Head title="Tambah Panel" />
            <AuthenticatedLayout>
                <div className="p-4">
                    <div className="flex gap-5 items-center">
                        <h1 className="text-page-header my-4">Tambah Panel</h1>
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

                        <div className="mt-4">
                            <InputLabel htmlFor="deskripsi" value="Deskripsi" />
                            <Input
                                id="deskripsi"
                                type="text"
                                name="deskripsi"
                                value={data.description}
                                className="mt-1"
                                autoComplete="deskripsi"
                                onChange={e => setData('description', e.target.value)}
                            />
                        </div>

                        <Button className="mt-4" disabled={loading}>
                            Tambah Panel
                        </Button>
                    </form>
                </div>
            </AuthenticatedLayout>
        </>
    );
}
