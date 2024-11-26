import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router, useForm } from '@inertiajs/react';
import { ROUTES } from '@/Support/Constants/routes';
import { Input } from '@/Components/UI/input';
import { FormEventHandler } from 'react';
import InputLabel from '@/Components/InputLabel';
import { Button } from '@/Components/UI/button';
import { projectService } from '@/Services/projectService';
import { useLoading } from '@/Contexts/LoadingContext';
import { useSuccessToast } from '@/Hooks/useToast';
import { useLaravelReactI18n } from 'laravel-react-i18n';

export default function () {
    const { t } = useLaravelReactI18n();
    const { data, setData } = useForm({
        name: '',
        trainset_needed: 0,
        initial_date: '',
    });
    const { loading } = useLoading();

    function getCurrentDate() {
        const newDate = new Date();
        const date = newDate.getDate();
        const month = newDate.getMonth() + 1;
        const year = newDate.getFullYear();
        return `${date} / ${month < 10 ? `0${month}` : `${month}`} / ${year}`;
    }

    const submit: FormEventHandler = async e => {
        e.preventDefault();

        const redirectToDetails = () => router.visit(route(`${ROUTES.PROJECTS_TRAINSETS}.index`, [res.id]));

        const res = await projectService.create(data);

        const description = getCurrentDate();

        void useSuccessToast(t('pages.project.create.messages.created'), description);

        redirectToDetails();
    };

    return (
        <>
            <Head title={t('pages.project.create.title')} />
            <AuthenticatedLayout>
                <div className="p-4">
                    <div className="flex gap-5 items-center">
                        <h1 className="text-page-header my-4">{t('pages.project.create.title')}</h1>
                    </div>

                    <form onSubmit={submit} encType="multipart/form-data">
                        <div className="mt-4">
                            <InputLabel value={t('pages.project.create.fields.name')} htmlFor="name" />
                            <Input
                                value={data.name}
                                type="text"
                                required
                                onChange={e => setData('name', e.target.value)}
                                name="name"
                                id="name"
                                className="mt-1"
                                autoComplete="name"
                            />
                        </div>

                        <div className="mt-4">
                            <InputLabel
                                value={t('pages.project.create.fields.trainset_needed')}
                                htmlFor="trainset_needed"
                            />
                            <Input
                                value={data.trainset_needed}
                                type="number"
                                required
                                onChange={e => setData('trainset_needed', +e.target.value)}
                                name="trainset_needed"
                                id="trainset_needed"
                                className="mt-1"
                                autoComplete="trainset_needed"
                            />
                        </div>

                        <div className="mt-4">
                            <InputLabel value={t('pages.project.create.fields.initial_date')} htmlFor="initial_date" />
                            <Input
                                value={data.initial_date}
                                type="date"
                                required
                                onChange={e => setData('initial_date', e.target.value)}
                                name="initial_date"
                                id="initial_date"
                                className="mt-1"
                                autoComplete="initial_date"
                            />
                        </div>

                        <Button disabled={loading} className="mt-4">
                            {t('pages.project.create.buttons.submit')}
                        </Button>
                    </form>
                </div>
            </AuthenticatedLayout>
        </>
    );
}
