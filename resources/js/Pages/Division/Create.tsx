import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import { ROUTES } from '@/support/constants/routes';
import { Input } from '@/Components/ui/input';
import { FormEventHandler } from 'react';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';
import { Button } from '@/Components/ui/button';
import { divisionService } from '@/services/divisionService';

export default function () {
    const { data, setData, post, processing, errors, reset, progress } = useForm({
        name: '',
    });

    const submit: FormEventHandler = async e => {
        e.preventDefault();
        const redirectToIndex = () => location.assign(route(`${ROUTES.DIVISIONS}.index`));

        await divisionService.create(data);
        redirectToIndex();
    };

    return (
        <>
            <Head title="Tambah Division" />
            <AuthenticatedLayout>
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
                            <InputError message={errors.name} className="mt-2" />
                        </div>

                        <Button className="mt-4" disabled={processing}>
                            Tambah Division
                        </Button>
                    </form>
                </div>
            </AuthenticatedLayout>
        </>
    );
}
