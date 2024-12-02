import InputLabel from '@/Components/InputLabel';
import { Button } from '@/Components/UI/button';
import { Input } from '@/Components/UI/input';
import { useLoading } from '@/Contexts/LoadingContext';
import { useSuccessToast } from '@/Hooks/useToast';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { workDayService } from '@/Services/workDayService';
import { ROUTES } from '@/Support/Constants/routes';
import { withLoading } from '@/Utils/withLoading';
import { Head, router, useForm } from '@inertiajs/react';
import { useLaravelReactI18n } from 'laravel-react-i18n';
import { FormEventHandler } from 'react';

export default function () {
    const { data, setData } = useForm({
        day: '',
    });

    const { loading } = useLoading();

    const { t } = useLaravelReactI18n();

    const submit: FormEventHandler = withLoading(async (e) => {
        e.preventDefault();

        await workDayService.create(data);
        router.visit(route(`${ROUTES.WORK_DAYS}.index`));
        void useSuccessToast(t('pages.work_day.create.messages.created'));
    });

    return (
        <>
            <Head title={t('pages.work_day.create.title')} />
            <AuthenticatedLayout>
                <div className='p-4'>
                    <div className='flex items-center gap-5'>
                        <h1 className='text-page-header my-4'>
                            {t('pages.work_day.create.title')}
                        </h1>
                    </div>

                    <form onSubmit={submit} encType='multipart/form-data'>
                        <div className='mt-4'>
                            <InputLabel
                                value={t('pages.work_day.create.fields.name')}
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
                            {t('pages.work_day.create.buttons.submit')}
                        </Button>
                    </form>
                </div>
            </AuthenticatedLayout>
        </>
    );
}
