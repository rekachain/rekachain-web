import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router, useForm } from '@inertiajs/react';
import { ROUTES } from '@/Support/Constants/routes';
import { Input } from '@/Components/UI/input';
import { FormEventHandler } from 'react';
import InputLabel from '@/Components/InputLabel';
import { Button } from '@/Components/UI/button';
import { ProjectResource } from '@/Support/Interfaces/Resources';
import { projectService } from '@/Services/projectService';
import { useLoading } from '@/Contexts/LoadingContext';
import { useSuccessToast } from '@/Hooks/useToast';
import { withLoading } from '@/Utils/withLoading';
import { useLaravelReactI18n } from 'laravel-react-i18n';

export default function ({ project }: { project: ProjectResource }) {
    const { t } = useLaravelReactI18n();
    const { data, setData } = useForm({
        id: project.id,
        name: project.name,
        initial_date: project.initial_date,
    });

    const { loading } = useLoading();

    const submit: FormEventHandler = withLoading(async e => {
        e.preventDefault();

        await projectService.update(project.id, data);
        router.visit(route(`${ROUTES.PROJECTS}.index`));
        void useSuccessToast(t('pages.projects.edit.messages.updated'));
    });

    return (
        <>
            <Head
                title={t('pages.projects.edit.title', {
                    name: project.name,
                })}
            />
            <AuthenticatedLayout>
                <div className="p-4">
                    <div className="flex gap-5 items-center">
                        <h1 className="text-page-header my-4">
                            {t('pages.projects.edit.title', {
                                name: project.name,
                            })}
                        </h1>
                    </div>

                    <form onSubmit={submit} encType="multipart/form-data">
                        <div className="mt-4">
                            <InputLabel htmlFor="name" value={t('pages.projects.edit.fields.name')} />
                            <Input
                                id="name"
                                type="text"
                                name="name"
                                value={data.name}
                                className="mt-1"
                                autoComplete="name"
                                onChange={e => setData('name', e.target.value)}
                            />
                        </div>

                        <div className="mt-4">
                            <InputLabel htmlFor="initial_date" value={t('pages.projects.edit.fields.initial_date')} />
                            <Input
                                id="initial_date"
                                type="date"
                                name="initial_date"
                                value={data.initial_date}
                                className="mt-1"
                                autoComplete="initial_date"
                                onChange={e => setData('initial_date', e.target.value)}
                            />
                        </div>

                        <Button className="mt-4" disabled={loading}>
                            {t('pages.projects.edit.buttons.submit')}
                        </Button>
                    </form>
                </div>
            </AuthenticatedLayout>
        </>
    );
}
