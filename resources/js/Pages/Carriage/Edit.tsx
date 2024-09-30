import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router, useForm } from '@inertiajs/react';
import { ROUTES } from '@/Support/Constants/routes';
import { Input } from '@/Components/UI/input';
import { FormEventHandler } from 'react';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';
import { Button } from '@/Components/UI/button';
import { CarriageResource } from '@/Support/Interfaces/Resources';
import { carriageService } from '@/Services/carriageService';
import { useSuccessToast } from '@/Hooks/useToast';
import { useLoading } from '@/Contexts/LoadingContext';

export default function ({ carriage }: { carriage: CarriageResource }) {
    const { data, setData, post, processing, errors, reset, progress } = useForm({
        id: carriage.id,
        type: carriage.type,
        description: carriage.description,
    });
    const { setLoading } = useLoading();
    const submit: FormEventHandler = async e => {
        e.preventDefault();

        setLoading(true);
        const redirectToIndex = () => router.visit(route(`${ROUTES.CARRIAGES}.index`));
        await carriageService.update(carriage.id, data);
        useSuccessToast('Carriage deleted successfully');
        setLoading(false);
        redirectToIndex();
    };

    return (
        <>
            <Head title="Ubah Carriage" />
            <AuthenticatedLayout>
                <div className="p-4">
                    <div className="flex gap-5 items-center">
                        <h1 className="text-page-header my-4">Ubah Carriage: {carriage.type}</h1>
                    </div>

                    <form onSubmit={submit} encType="multipart/form-data">
                        <div className="mt-4">
                            <InputLabel htmlFor="type" value="Tipe" />
                            <Input
                                id="type"
                                type="text"
                                name="type"
                                value={data.type}
                                className="mt-1"
                                autoComplete="type"
                                onChange={e => setData('type', e.target.value)}
                            />
                            <InputError message={errors.type} className="mt-2" />
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
                            Ubah Carriage
                        </Button>
                    </form>
                </div>
            </AuthenticatedLayout>
        </>
    );
}
