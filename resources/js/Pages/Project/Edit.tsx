import InputLabel from '@/Components/InputLabel';
import { Button } from '@/Components/UI/button';
import { Input } from '@/Components/UI/input';
import { useLoading } from '@/Contexts/LoadingContext';
import { useSuccessToast } from '@/Hooks/useToast';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { projectService } from '@/Services/projectService';
import { ROUTES } from '@/Support/Constants/routes';
import { ProjectResource } from '@/Support/Interfaces/Resources';
import { withLoading } from '@/Utils/withLoading';
import { Head, router, useForm } from '@inertiajs/react';
import { useLaravelReactI18n } from 'laravel-react-i18n';
import { FormEventHandler } from 'react';

export default function ({ project }: { project: ProjectResource }) {
    const { t } = useLaravelReactI18n();
    const { data, setData } = useForm({
        id: project.id,
        name: project.name,
        initial_date: project.initial_date,
    });

    const { loading } = useLoading();

    const submit: FormEventHandler = withLoading(async (e) => {
        e.preventDefault();

        await projectService.update(project.id, data);
        router.visit(route(`${ROUTES.PROJECTS}.index`));
        void useSuccessToast(t('pages.project.edit.messages.updated'));
    });

    return (
        <>
            <Head
                title={t('pages.project.edit.title', {
                    name: project.name,
                })}
            />
            <AuthenticatedLayout>
                <div className='p-4'>
                    <div className='flex items-center gap-5'>
                        <h1 className='text-page-header my-4'>
                            {t('pages.project.edit.title', {
                                name: project.name,
                            })}
                        </h1>
                    </div>

                    <form onSubmit={submit} encType='multipart/form-data'>
                        <div className='mt-4'>
                            <InputLabel
                                value={t('pages.project.edit.fields.name')}
                                htmlFor='name'
                            />
                            <Input
                                value={data.name}
                                type='text'
                                onChange={(e) => setData('name', e.target.value)}
                                name='name'
                                id='name'
                                className='mt-1'
                                autoComplete='name'
                            />
                        </div>

                        <div className='mt-4'>
                            <InputLabel
                                value={t('pages.project.edit.fields.initial_date')}
                                htmlFor='initial_date'
                            />
                            <Input
                                value={data.initial_date}
                                type='date'
                                onChange={(e) => setData('initial_date', e.target.value)}
                                name='initial_date'
                                id='initial_date'
                                className='mt-1'
                                autoComplete='initial_date'
                            />
                        </div>

                        <Button disabled={loading} className='mt-4'>
                            {t('pages.project.edit.buttons.submit')}
                        </Button>
                    </form>
                </div>
            </AuthenticatedLayout>
        </>
    );
}
