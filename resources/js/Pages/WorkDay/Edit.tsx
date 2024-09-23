import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router, useForm } from '@inertiajs/react';
import { ROUTES } from '@/Support/Constants/routes';
import { Input } from '@/Components/UI/input';
import { FormEventHandler } from 'react';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';
import { Button } from '@/Components/UI/button';
import { WorkDayResource } from '../../Support/Interfaces/Resources';
import { workDayService } from '@/Services/workDayService';
import { useSuccessToast } from '@/Hooks/useToast';
import { useLoading } from '@/Contexts/LoadingContext';

export default function ({ workDay }: { workDay: WorkDayResource }) {
    const { data, setData, processing, errors } = useForm({
        id: workDay.id,
        day: workDay.day,
    });
    const { setLoading } = useLoading();
    const submit: FormEventHandler = async e => {
        e.preventDefault();

        setLoading(true);
        const redirectToIndex = () => router.visit(route(`${ROUTES.WORK_DAYS}.index`));
        await workDayService.update(workDay.id, data);
        useSuccessToast('WorkDay deleted successfully');
        setLoading(false);
        redirectToIndex();
    };

    return (
        <>
            <Head title="Ubah WorkDay" />
            <AuthenticatedLayout>
                <div className="p-4">
                    <div className="flex gap-5 items-center">
                        <h1 className="text-page-header my-4">Ubah WorkDay: {workDay.day}</h1>
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
                            Ubah WorkDay
                        </Button>
                    </form>
                </div>
            </AuthenticatedLayout>
        </>
    );
}
