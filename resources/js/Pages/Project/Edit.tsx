import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import { ROUTES } from '@/support/constants/routes';
import { Input } from '@/Components/ui/input';
import { FormEventHandler } from 'react';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';
import { Button } from '@/Components/ui/button';
import { ProjectResource } from '@/support/interfaces/resources';
import { projectService } from '@/services/projectService';

export default function ({ project }: { project: ProjectResource }) {
    const { data, setData, post, processing, errors, reset, progress } = useForm({
        id: project.id,
        name: project.name,
        initial_date: project.initial_date,
    });

    const submit: FormEventHandler = async e => {
        e.preventDefault();
        const redirectToIndex = () => location.assign(route(`${ROUTES.PROJECTS}.index`));
        await projectService.update(project.id, data);
        redirectToIndex();
    };

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
                            <InputError message={errors.name} className="mt-2" />
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
                            <InputError message={errors.name} className="mt-2" />
                        </div>

                        <Button className="mt-4" disabled={processing}>
                            Ubah Proyek
                        </Button>
                    </form>
                </div>
            </AuthenticatedLayout>
        </>
    );
}
