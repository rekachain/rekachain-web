import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router, useForm } from '@inertiajs/react';
import { Input } from '@/Components/ui/input';
import { FormEventHandler } from 'react';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';
import { Button } from '@/Components/ui/button';
import { workDayService } from '@/services/workDayService';
import { ROUTES } from '@/support/constants/routes';
import { useSuccessToast } from '@/hooks/useToast';
import { useLoading } from '@/Contexts/LoadingContext';

export default function () {
    const { data, setData, processing, errors } = useForm({
        day: '',
    });
    const { setLoading } = useLoading();

    const submit: FormEventHandler = async e => {
        e.preventDefault();

        setLoading(true);
        const redirectToIndex = () => router.visit(route(`${ROUTES.WORK_DAYS}.index`));
        await workDayService.create(data);
        useSuccessToast('WorkDay created successfully');
        setLoading(false);
        redirectToIndex();
    };

    return (
        <>
            <Head title="Tambah WorkDay" />
            <AuthenticatedLayout>
                <div className="p-4">
                    <div className="flex gap-5 items-center">
                        <h1 className="text-page-header my-4">Tambah WorkDay</h1>
                    </div>

                    <form onSubmit={submit} encType="multipart/form-data">
                        <div className="mt-4">
                            <InputLabel htmlFor="type" value="Tipe" />
                            <Input
                                id="type"
                                type="text"
                                name="type"
                                value={data.day}
                                className="mt-1"
                                autoComplete="type"
                                onChange={e => setData('day', e.target.value)}
                            />
                            <InputError message={errors.day} className="mt-2" />
                        </div>

                        <Button className="mt-4" disabled={processing}>
                            Tambah WorkDay
                        </Button>
                    </form>
                </div>
            </AuthenticatedLayout>
        </>
    );
}
