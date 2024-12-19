import InputLabel from '@/Components/InputLabel';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/Components/UI/accordion';
import { Button } from '@/Components/UI/button';
import { Input } from '@/Components/UI/input';
import { Textarea } from '@/Components/UI/textarea';
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
import BuyerForm from './Partials/Partials/BuyerForm';

export default function ({ project }: { project: ProjectResource }) {
    console.log(project);
    const { t } = useLaravelReactI18n();
    const { data, setData } = useForm({
        id: project.id,
        name: project.name,
        description: project.description,
        initial_date: project.initial_date,
        estimated_start_date: project.estimated_start_date,
        estimated_end_date: project.estimated_end_date,
        buyer_id: project.buyer_id,
        buyer: project.buyer ?? null,
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

                    <form
                        onSubmit={submit}
                        id='form-project-edit'
                        encType='multipart/form-data'
                    ></form>
                    <div className='mt-4'>
                        <InputLabel value={t('pages.project.edit.fields.name')} htmlFor='name' />
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
                            value={t('pages.project.edit.fields.description')}
                            htmlFor='description'
                        />
                        <Textarea
                            value={data.description || ''}
                            onChange={(e) => setData('description', e.target.value)}
                            name='description'
                            id='description'
                            className='mt-1'
                            autoComplete='description'
                        />
                    </div>

                    <div className='mt-4 flex flex-row gap-4'>
                        <div className='w-1/3'>
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

                        <div className='w-1/3'>
                            <InputLabel
                                value={t('pages.project.edit.fields.estimated_start_date')}
                                htmlFor='estimated_start_date'
                            />
                            <Input
                                value={data.estimated_start_date || ''}
                                type='date'
                                onChange={(e) => setData('estimated_start_date', e.target.value)}
                                name='estimated_start_date'
                                id='estimated_start_date'
                                className='mt-1'
                                autoComplete='estimated_start_date'
                            />
                        </div>

                        <div className='w-1/3'>
                            <InputLabel
                                value={t('pages.project.edit.fields.estimated_end_date')}
                                htmlFor='estimated_end_date'
                            />
                            <Input
                                value={data.estimated_end_date || ''}
                                type='date'
                                onChange={(e) => setData('estimated_end_date', e.target.value)}
                                name='estimated_end_date'
                                id='estimated_end_date'
                                className='mt-1'
                                autoComplete='estimated_end_date'
                            />
                        </div>
                    </div>

                    <Accordion
                        type='single'
                        defaultValue={data.buyer_id ? 'item-1' : ''}
                        collapsible
                        className='mt-4'
                    >
                        <AccordionItem value='item-1'>
                            <AccordionTrigger>
                                {t('pages.project.edit.fields.buyer_selection')}
                            </AccordionTrigger>
                            <AccordionContent>
                                <BuyerForm
                                    setBuyerId={(buyer_id: number) => setData('buyer_id', buyer_id)}
                                    buyer={data.buyer}
                                />
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>

                    <Button form='form-project-edit' disabled={loading} className='mt-4'>
                        {t('pages.project.edit.buttons.submit')}
                    </Button>
                </div>
            </AuthenticatedLayout>
        </>
    );
}
