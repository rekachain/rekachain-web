import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import { ROUTES } from '@/support/constants/routes';
import { Input } from '@/Components/ui/input';
import { FormEventHandler } from 'react';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';
import { Button } from '@/Components/ui/button';
import { projectService } from '@/services/projectService';

export default function () {
    const { data, setData, post, processing, errors, reset, progress } = useForm({
        name: '',
        trainset_needed: 0,
        initial_date: '',
    });

    const submit: FormEventHandler = async e => {
        e.preventDefault();

        const res = await projectService.create(data);

        const redirectToDetails = () => location.assign(route(`${ROUTES.PROJECTS_TRAINSETS}.index`, [res.id]));

        redirectToDetails();
    };

    return (
        <>
            <Head title="Tambah Proyek" />
            <AuthenticatedLayout>
                <div className="p-4">
                    <div className="flex gap-5 items-center">
                        <h1 className="text-page-header my-4">Tambah Proyek</h1>
                    </div>

                    <form onSubmit={submit} encType="multipart/form-data">
                        <div className="mt-4">
                            <InputLabel htmlFor="name" value="Nama" />
                            <Input
                                id="name"
                                type="text"
                                name="name"
                                value={data.name}
                                className="mt-1"
                                autoComplete="name"
                                onChange={e => setData('name', e.target.value)}
                                required
                            />
                            <InputError message={errors.name} className="mt-2" />
                        </div>

                        <div className="mt-4">
                            <InputLabel htmlFor="trainset_needed" value="Jumlah Trainset" />
                            <Input
                                id="trainset_needed"
                                type="number"
                                name="trainset_needed"
                                value={data.trainset_needed}
                                className="mt-1"
                                autoComplete="trainset_needed"
                                onChange={e => setData('trainset_needed', +e.target.value)}
                                required
                            />
                            <InputError message={errors.trainset_needed} className="mt-2" />
                        </div>

                        <div className="mt-4">
                            <InputLabel htmlFor="initial_date" value="Tanggal Mulai" />
                            <Input
                                id="initial_date"
                                type="date"
                                name="initial_date"
                                value={data.initial_date}
                                className="mt-1"
                                autoComplete="initial_date"
                                onChange={e => setData('initial_date', e.target.value)}
                                required
                            />
                            <InputError message={errors.initial_date} className="mt-2" />
                        </div>

                        <Button className="mt-4" disabled={processing}>
                            Tambah Proyek
                        </Button>
                    </form>
                </div>
            </AuthenticatedLayout>
        </>
    );
}
