import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router, useForm } from '@inertiajs/react';
import { ROUTES } from '@/Support/Constants/routes';
import { Input } from '@/Components/UI/input';
import { FormEventHandler } from 'react';
import InputLabel from '@/Components/InputLabel';
import { Button } from '@/Components/UI/button';
import { PanelResource } from '@/Support/Interfaces/Resources';
import { panelService } from '@/Services/panelService';
import { useSuccessToast } from '@/Hooks/useToast';
import { withLoading } from '@/Utils/withLoading';
import { useLoading } from '@/Contexts/LoadingContext';

export default function ({ panel }: { panel: PanelResource }) {
    const { loading } = useLoading();

    const { data, setData } = useForm({
        id: panel.id,
        name: panel.name,
        description: panel.description,
    });

    const submit: FormEventHandler = withLoading(async e => {
        e.preventDefault();
        await panelService.update(panel.id, data);
        router.visit(route(`${ROUTES.PANELS}.index`));
        void useSuccessToast('Panel deleted successfully');
    });

    return (
        <>
            <Head title="Ubah Panel" />
            <AuthenticatedLayout>
                <div className="p-4">
                    <div className="flex gap-5 items-center">
                        <h1 className="text-page-header my-4">Ubah Panel: {panel.name}</h1>
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
                            Ubah Panel
                        </Button>
                    </form>
                </div>
            </AuthenticatedLayout>
        </>
    );
}
