import InputLabel from '@/Components/InputLabel';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/Components/UI/accordion';
import { Button } from '@/Components/UI/button';
import { Input } from '@/Components/UI/input';
import { Textarea } from '@/Components/UI/textarea';
import { useLoading } from '@/Contexts/LoadingContext';
import { useSuccessToast } from '@/Hooks/useToast';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { projectService } from '@/Services/projectService';
import { ROUTES } from '@/Support/Constants/routes';
import { Head, router, useForm } from '@inertiajs/react';
import { useLaravelReactI18n } from 'laravel-react-i18n';
import { FormEventHandler } from 'react';
import BuyerForm from './Partials/Partials/BuyerForm';

export default function () {
    const { t } = useLaravelReactI18n();
    const { data, setData } = useForm<{
            name: string;
            description: string | null;
            trainset_needed: number;
            initial_date: string;
            estimated_start_date: string | null;
            estimated_end_date: string | null;
            buyer_id: number | null;
    }>({
        name: '',
        description: '',
        trainset_needed: 0,
        initial_date: '',
        estimated_start_date: '',
        estimated_end_date: '',
        buyer_id: null,
    });
    const { loading } = useLoading();

    function getCurrentDate() {
        const newDate = new Date();
        const date = newDate.getDate();
        const month = newDate.getMonth() + 1;
        const year = newDate.getFullYear();
        return `${date} / ${month < 10 ? `0${month}` : `${month}`} / ${year}`;
    }

    const submit: FormEventHandler = async (e) => {
        e.preventDefault();

        const redirectToDetails = () =>
            router.visit(route(`${ROUTES.PROJECTS_TRAINSETS}.index`, [res.id]));

        const res = await projectService.create(data);

        const description = getCurrentDate();

        void useSuccessToast(t('pages.project.create.messages.created'), description);

        redirectToDetails();
    };

    return (
        <>
            <Head title={t('pages.project.create.title')} />
            <AuthenticatedLayout>
                <div className='p-4'>
                    <div className='flex items-center gap-5'>
                        <h1 className='text-page-header my-4'>{t('pages.project.create.title')}</h1>
                    </div>

                    <form onSubmit={submit} encType='multipart/form-data' id='project-form'></form>
                    <div className='mt-4'>
                        <InputLabel
                            value={t('pages.project.create.fields.name')}
                            htmlFor='name'
                        />
                        <Input
                            value={data.name}
                            type='text'
                            required
                            onChange={(e) => setData('name', e.target.value)}
                            name='name'
                            id='name'
                            className='mt-1'
                            autoComplete='name'
                        />
                    </div>

                    <div className='mt-4'>
                        <InputLabel
                            value={t('pages.project.create.fields.description')}
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

                    <div className='mt-4'>
                        <InputLabel
                            value={t('pages.project.create.fields.trainset_needed')}
                            htmlFor='trainset_needed'
                        />
                        <Input
                            value={data.trainset_needed}
                            type='number'
                            required
                            onChange={(e) => setData('trainset_needed', +e.target.value)}
                            name='trainset_needed'
                            id='trainset_needed'
                            className='mt-1'
                            autoComplete='trainset_needed'
                        />
                    </div>

                    <div className='mt-4'>
                        <InputLabel
                            value={t('pages.project.create.fields.initial_date')}
                            htmlFor='initial_date'
                        />
                        <Input
                            value={data.initial_date}
                            type='date'
                            required
                            onChange={(e) => setData('initial_date', e.target.value)}
                            name='initial_date'
                            id='initial_date'
                            className='mt-1'
                            autoComplete='initial_date'
                        />
                    </div>

                    <div className='mt-4'>
                        <InputLabel
                            value={t('pages.project.create.fields.estimated_start_date')}
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

                    <div className='mt-4'>
                        <InputLabel
                            value={t('pages.project.create.fields.estimated_end_date')}
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
                    <Accordion type='single' collapsible>
                        <AccordionItem value='item-1'>
                            <AccordionTrigger>{'Pembeli (OPSIONAL)'}</AccordionTrigger>
                            <AccordionContent>
                                <BuyerForm
                                    setBuyerId={(buyer_id: number) => setData('buyer_id', buyer_id)}
                                />
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                    <Button disabled={loading} className='mt-4' type='submit' form='project-form' >
                        {t('pages.project.create.buttons.submit')}
                    </Button>
                </div>
            </AuthenticatedLayout>
        </>
    );
}
