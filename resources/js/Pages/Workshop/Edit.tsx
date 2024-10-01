import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router, useForm } from '@inertiajs/react';
import { ROUTES } from '@/Support/Constants/routes';
import { Input } from '@/Components/UI/input';
import { FormEventHandler } from 'react';
import InputLabel from '@/Components/InputLabel';
import { Button } from '@/Components/UI/button';
import { WorkshopResource } from '@/Support/Interfaces/Resources';
import { workshopService } from '@/Services/workshopService';
import { useLoading } from '@/Contexts/LoadingContext';
import { useSuccessToast } from '@/Hooks/useToast';
import { withLoading } from '@/Utils/withLoading';

export default function ({ workshop }: { workshop: WorkshopResource }) {
    const { data, setData } = useForm({
        id: workshop.id,
        name: workshop.name,
        address: workshop.address,
    });

    const { loading } = useLoading();

    const submit: FormEventHandler = withLoading(async e => {
        e.preventDefault();

        await workshopService.update(workshop.id, data);
        router.visit(route(`${ROUTES.WORKSHOPS}.index`));
        void useSuccessToast('Workshop berhasil diubah');
    });

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
                        </div>

                        <Button className="mt-4" disabled={loading}>
                            Ubah Workshop
                        </Button>
                    </form>
                </div>
            </AuthenticatedLayout>
        </>
    );
}
