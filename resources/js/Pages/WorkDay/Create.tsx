import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router, useForm } from '@inertiajs/react';
import { Input } from '@/Components/UI/input';
import { FormEventHandler } from 'react';
import InputLabel from '@/Components/InputLabel';
import { Button } from '@/Components/UI/button';
import { workDayService } from '@/Services/workDayService';
import { ROUTES } from '@/Support/Constants/routes';
import { useSuccessToast } from '@/Hooks/useToast';
import { useLoading } from '@/Contexts/LoadingContext';
import { withLoading } from '@/Utils/withLoading';

export default function () {
    const { data, setData } = useForm({
        day: '',
    });

    const { loading } = useLoading();

    const submit: FormEventHandler = withLoading(async e => {
        e.preventDefault();

        await workDayService.create(data);
        router.visit(route(`${ROUTES.WORK_DAYS}.index`));
        void useSuccessToast('WorkDay created successfully');
    });

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
                        </div>

                        <Button className="mt-4" disabled={loading}>
                            Tambah WorkDay
                        </Button>
                    </form>
                </div>
            </AuthenticatedLayout>
        </>
    );
}
