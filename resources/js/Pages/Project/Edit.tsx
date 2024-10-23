import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router, useForm } from '@inertiajs/react';
import { ROUTES } from '@/Support/Constants/routes';
import { Input } from '@/Components/UI/input';
import { FormEventHandler } from 'react';
import InputLabel from '@/Components/InputLabel';
import { Button } from '@/Components/UI/button';
import { ProjectResource } from '@/Support/Interfaces/Resources';
import { projectService } from '@/Services/projectService';
import { useLoading } from '@/Contexts/LoadingContext';
import { useSuccessToast } from '@/Hooks/useToast';
import { withLoading } from '@/Utils/withLoading';

export default function ({ project }: { project: ProjectResource }) {
    const { data, setData } = useForm({
        id: project.id,
        name: project.name,
        initial_date: project.initial_date,
    });

    const { loading } = useLoading();

    const submit: FormEventHandler = withLoading(async e => {
        e.preventDefault();

        await projectService.update(project.id, data);
        router.visit(route(`${ROUTES.PROJECTS}.index`));
        void useSuccessToast('Proyek berhasil diubah');
    });

    return (
        <>
            <Head title="Ubah Proyek" />
            <AuthenticatedLayout>
                <div className="p-4">
                    <div className="flex gap-5 items-center">
                        <h1 className="text-page-header my-4">Ubah Proyek: {project.name}</h1>
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
                            <InputLabel htmlFor="initial_date" value="Tanggal inisiasi proyek" />
                            <Input
                                id="initial_date"
                                type="date"
                                name="initial_date"
                                value={data.initial_date}
                                className="mt-1"
                                autoComplete="initial_date"
                                onChange={e => setData('initial_date', e.target.value)}
                            />
                        </div>

                        <Button className="mt-4" disabled={loading}>
                            Ubah Proyek
                        </Button>
                    </form>
                </div>
            </AuthenticatedLayout>
        </>
    );
}
