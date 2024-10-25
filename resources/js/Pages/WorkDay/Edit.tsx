import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router, useForm } from '@inertiajs/react';
import { ROUTES } from '@/Support/Constants/routes';
import { Input } from '@/Components/UI/input';
import { FormEventHandler } from 'react';
import InputLabel from '@/Components/InputLabel';
import { Button } from '@/Components/UI/button';
import { WorkDayResource } from '@/Support/Interfaces/Resources';
import { workDayService } from '@/Services/workDayService';
import { useSuccessToast } from '@/Hooks/useToast';
import { useLoading } from '@/Contexts/LoadingContext';
import { withLoading } from '@/Utils/withLoading';

export default function ({ workDay }: { workDay: WorkDayResource }) {
    const { data, setData } = useForm({
        id: workDay.id,
        day: workDay.day,
    });

    const { loading } = useLoading();

    const submit: FormEventHandler = withLoading(async e => {
        e.preventDefault();

        await workDayService.update(workDay.id, data);
        router.visit(route(`${ROUTES.WORK_DAYS}.index`));
        void useSuccessToast('WorkDay deleted successfully');
    });

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
                        </div>

                        <Button className="mt-4" disabled={loading}>
                            Ubah Hari Kerja
                        </Button>
                    </form>
                </div>
            </AuthenticatedLayout>
        </>
    );
}
