import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router, useForm } from '@inertiajs/react';
import { ROUTES } from '@/support/constants/routes';
import { Input } from '@/Components/ui/input';
import { FormEventHandler } from 'react';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';
import { Button } from '@/Components/ui/button';
import { WorkshopResource } from '@/support/interfaces/resources';
import { workshopService } from '@/services/workshopService';
import { useLoading } from '@/Contexts/LoadingContext';
import { useSuccessToast } from '@/hooks/useToast';

export default function ({ workshop }: { workshop: WorkshopResource }) {
    const { data, setData, post, processing, errors, reset, progress } = useForm({
        id: workshop.id,
        name: workshop.name,
        address: workshop.address,
    });
    const { setLoading } = useLoading();

    const submit: FormEventHandler = async e => {
        e.preventDefault();
        const redirectToIndex = () => router.visit(route(`${ROUTES.WORKSHOPS}.index`));

        setLoading(true);
        await workshopService.update(workshop.id, data);
        setLoading(false);
        useSuccessToast('Workshop berhasil diubah');
        redirectToIndex();
    };

    return (
        <>
            <Head title="Ubah Workshop" />
            <AuthenticatedLayout>
                <div className="p-4">
                    <div className="flex gap-5 items-center">
                        <h1 className="text-page-header my-4">Ubah Workshop: {workshop.name}</h1>
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
                            <InputError message={errors.name} className="mt-2" />
                        </div>

                        <Button className="mt-4" disabled={processing}>
                            Ubah Workshop
                        </Button>
                    </form>
                </div>
            </AuthenticatedLayout>
        </>
    );
}
