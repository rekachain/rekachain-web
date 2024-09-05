import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import { ROUTES } from '@/support/constants/routes';
import { Input } from '@/Components/ui/input';
import { FormEventHandler } from 'react';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';
import { Button } from '@/Components/ui/button';
import { DivisionResource } from '@/support/interfaces/resources';
import { divisionService } from '@/services/divisionService';
import { useLoading } from '@/contexts/LoadingContext';
import { useSuccessToast } from '@/hooks/useToast';

export default function ({ division }: { division: DivisionResource }) {
    const { data, setData, post, processing, errors, reset, progress } = useForm({
        id: division.id,
        name: division.name,
    });
    const { setLoading } = useLoading();

    const submit: FormEventHandler = async e => {
        e.preventDefault();

        setLoading(true);
        const redirectToIndex = () => location.assign(route(`${ROUTES.DIVISIONS}.index`));
        await divisionService.update(division.id, data);
        useSuccessToast('Division updated successfully');
        setLoading(false);
        redirectToIndex();
    };

    return (
        <>
            <Head title="Ubah Division" />
            <AuthenticatedLayout>
                <div className="p-4">
                    <div className="flex gap-5 items-center">
                        <h1 className="text-page-header my-4">Ubah Division: {division.name}</h1>
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
                            Ubah Division
                        </Button>
                    </form>
                </div>
            </AuthenticatedLayout>
        </>
    );
}
