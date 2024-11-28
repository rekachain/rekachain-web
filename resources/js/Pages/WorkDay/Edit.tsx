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

    const submit: FormEventHandler = withLoading(async (e) => {
        e.preventDefault();

        await workDayService.update(workDay.id, data);
        router.visit(route(`${ROUTES.WORK_DAYS}.index`));
        void useSuccessToast(t('pages.work_day.edit.messages.updated'));
    });

    return (
        <>
            <Head title={t('pages.work_day.edit.title')} />
            <AuthenticatedLayout>
                <div className='p-4'>
                    <div className='flex items-center gap-5'>
                        <h1 className='text-page-header my-4'>
                            {t('pages.work_day.edit.title', { name: workDay.day })}
                        </h1>
                    </div>

                    <form onSubmit={submit} encType='multipart/form-data'>
                        <div className='mt-4'>
                            <InputLabel
                                value={t('pages.work_day.edit.fields.name')}
                                htmlFor='type'
                            />
                            <Input
                                value={data.day}
                                type='text'
                                onChange={(e) => setData('day', e.target.value)}
                                name='type'
                                id='type'
                                className='mt-1'
                                autoComplete='type'
                            />
                        </div>

                        <Button disabled={loading} className='mt-4'>
                            {t('pages.work_day.edit.buttons.submit')}
                        </Button>
                    </form>
                </div>
            </AuthenticatedLayout>
        </>
    );
}
