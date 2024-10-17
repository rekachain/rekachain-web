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
import { useLaravelReactI18n } from 'laravel-react-i18n';

export default function () {
    const { data, setData } = useForm({
        day: '',
    });

    const { loading } = useLoading();

    const { t } = useLaravelReactI18n();

    const submit: FormEventHandler = withLoading(async e => {
        e.preventDefault();

        await workDayService.create(data);
        router.visit(route(`${ROUTES.WORK_DAYS}.index`));
        void useSuccessToast(t('pages.work_days.create.messages.created'));
    });

    return (
        <>
            <Head title={t('pages.work_days.create.title')} />
            <AuthenticatedLayout>
                <div className="p-4">
                    <div className="flex gap-5 items-center">
                        <h1 className="text-page-header my-4">{t('pages.work_days.create.title')}</h1>
                    </div>

                    <form onSubmit={submit} encType="multipart/form-data">
                        <div className="mt-4">
                            <InputLabel htmlFor="type" value={t('pages.work_days.create.fields.name')} />
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
                            {t('pages.work_days.create.buttons.submit')}
                        </Button>
                    </form>
                </div>
            </AuthenticatedLayout>
        </>
    );
}
