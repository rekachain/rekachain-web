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
import { useLaravelReactI18n } from 'laravel-react-i18n';

export default function ({ workDay }: { workDay: WorkDayResource }) {
    const { t } = useLaravelReactI18n();
    const { data, setData } = useForm({
        id: workDay.id,
        day: workDay.day,
    });

    const { loading } = useLoading();

    const submit: FormEventHandler = withLoading(async e => {
        e.preventDefault();

        await workDayService.update(workDay.id, data);
        router.visit(route(`${ROUTES.WORK_DAYS}.index`));
        void useSuccessToast(t('pages.work_days.edit.messages.updated'));
    });

    return (
        <>
            <Head title={t('pages.work_days.edit.title')} />
            <AuthenticatedLayout>
                <div className="p-4">
                    <div className="flex gap-5 items-center">
                        <h1 className="text-page-header my-4">
                            {t('pages.work_days.edit.title', { name: workDay.day })}
                        </h1>
                    </div>

                    <form onSubmit={submit} encType="multipart/form-data">
                        <div className="mt-4">
                            <InputLabel htmlFor="type" value={t('pages.work_days.edit.fields.name')} />
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
                            {t('pages.work_days.edit.buttons.submit')}
                        </Button>
                    </form>
                </div>
            </AuthenticatedLayout>
        </>
    );
}
