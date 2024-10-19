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

        void useSuccessToast(t('pages.projects.create.messages.created'), description);

        redirectToDetails();
    };

    return (
        <>
            <Head title={t('pages.projects.create.title')} />
            <AuthenticatedLayout>
                <div className="p-4">
                    <div className="flex gap-5 items-center">
                        <h1 className="text-page-header my-4">{t('pages.projects.create.title')}</h1>
                    </div>

                    <form onSubmit={submit} encType="multipart/form-data">
                        <div className="mt-4">
                            <InputLabel htmlFor="name" value={t('pages.projects.create.fields.name')} />
                            <Input
                                id="name"
                                type="text"
                                name="name"
                                value={data.name}
                                className="mt-1"
                                autoComplete="name"
                                onChange={e => setData('name', e.target.value)}
                                required
                            />
                        </div>

                        <div className="mt-4">
                            <InputLabel
                                htmlFor="trainset_needed"
                                value={t('pages.projects.create.fields.trainset_needed')}
                            />
                            <Input
                                id="trainset_needed"
                                type="number"
                                name="trainset_needed"
                                value={data.trainset_needed}
                                className="mt-1"
                                autoComplete="trainset_needed"
                                onChange={e => setData('trainset_needed', +e.target.value)}
                                required
                            />
                        </div>

                        <div className="mt-4">
                            <InputLabel htmlFor="initial_date" value={t('pages.projects.create.fields.initial_date')} />
                            <Input
                                id="initial_date"
                                type="date"
                                name="initial_date"
                                value={data.initial_date}
                                className="mt-1"
                                autoComplete="initial_date"
                                onChange={e => setData('initial_date', e.target.value)}
                                required
                            />
                        </div>

                        <Button className="mt-4" disabled={loading}>
                            {t('pages.projects.create.buttons.submit')}
                        </Button>
                    </form>
                </div>
            </AuthenticatedLayout>
        </>
    );
}
