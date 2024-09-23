import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router, useForm } from '@inertiajs/react';
import { ROUTES } from '@/Support/constants/routes';
import { Input } from '@/Components/ui/input';
import { FormEventHandler } from 'react';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';
import { Button } from '@/Components/ui/button';
import { PanelResource } from '@/Support/interfaces/resources';
import { panelService } from '@/Services/panelService';
import { useSuccessToast } from '@/Hooks/useToast';
import { useLoading } from '@/Contexts/LoadingContext';

export default function ({ panel }: { panel: PanelResource }) {
    const { data, setData, post, processing, errors, reset, progress } = useForm({
        id: panel.id,
        name: panel.name,
        description: panel.description,
    });
    const { setLoading } = useLoading();
    const submit: FormEventHandler = async e => {
        e.preventDefault();

        setLoading(true);
        const redirectToIndex = () => router.visit(route(`${ROUTES.PANELS}.index`));
        await panelService.update(panel.id, data);
        useSuccessToast('Panel deleted successfully');
        setLoading(false);
        redirectToIndex();
    };

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
                            <InputError message={errors.name} className="mt-2" />
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
                            <InputError message={errors.description} className="mt-2" />
                        </div>

                        <Button className="mt-4" disabled={processing}>
                            Ubah Panel
                        </Button>
                    </form>
                </div>
            </AuthenticatedLayout>
        </>
    );
}
