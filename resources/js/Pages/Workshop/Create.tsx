import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import { ROUTES } from '@/support/constants/routes';
import { Input } from '@/Components/ui/input';
import { FormEventHandler } from 'react';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';
import { Button } from '@/Components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/Components/ui/radio-group';
import { Label } from '@/Components/ui/label';
import { DivisionResource, WorkshopResource } from '@/support/interfaces/resources';
import { workshopService } from '@/services/workshopService';

export default function ({ workshops, divisions }: { workshops: WorkshopResource[]; divisions: DivisionResource[] }) {
    const { data, setData, post, processing, errors, reset, progress } = useForm({
        name: '',
        address: '',
    });

    const submit: FormEventHandler = async e => {
        e.preventDefault();
        const redirectToIndex = () => location.assign(route(`${ROUTES.WORKSHOPS}.index`));

        await workshopService.create(data);
        redirectToIndex();
    };

    return (
        <>
            <Head title="Tambah Workshop" />
            <AuthenticatedLayout>
                <div className="p-4">
                    <div className="flex gap-5 items-center">
                        <h1 className="text-page-header my-4">Tambah Workshop</h1>
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
                            <InputLabel htmlFor="address" value="Alamat" />
                            <Input
                                id="address"
                                type="text"
                                name="address"
                                value={data.address}
                                className="mt-1"
                                autoComplete="address"
                                onChange={e => setData('address', e.target.value)}
                            />
                            <InputError message={errors.address} className="mt-2" />
                        </div>

                        <Button className="mt-4" disabled={processing}>
                            Tambah Workshop
                        </Button>
                    </form>
                </div>
            </AuthenticatedLayout>
        </>
    );
}