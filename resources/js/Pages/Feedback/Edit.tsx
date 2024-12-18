import InputLabel from '@/Components/InputLabel';
import { Button } from '@/Components/UI/button';
import { Input } from '@/Components/UI/input';
import { useLoading } from '@/Contexts/LoadingContext';
import { useSuccessToast } from '@/Hooks/useToast';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { feedbackService } from '@/Services/feedbackService';
import { ROUTES } from '@/Support/Constants/routes';
import { FeedbackResource } from '@/Support/Interfaces/Resources';
import { withLoading } from '@/Utils/withLoading';
import { Head, router, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

export default function ({ feedback }: { feedback: FeedbackResource }) {
    const { loading } = useLoading();

    const { data, setData } = useForm({
        id: feedback.id,
        name: feedback.name,
    });

    const submit: FormEventHandler = withLoading(async (e) => {
        e.preventDefault();
        await feedbackService.update(feedback.id, data);
        router.visit(route(`${ROUTES.FEEDBACK}.index`));
        void useSuccessToast('Feedback deleted successfully');
    });

    return (
        <>
            <Head title='Ubah Feedback' />
            <AuthenticatedLayout>
                <div className='p-4'>
                    <div className='flex items-center gap-5'>
                        <h1 className='text-page-header my-4'>Ubah Feedback: {feedback.name}</h1>
                    </div>

                    <form onSubmit={submit} encType='multipart/form-data'>
                        <div className='mt-4'>
                            <InputLabel value='Nama' htmlFor='nama' />
                            <Input
                                value={data.name}
                                type='text'
                                onChange={(e) => setData('name', e.target.value)}
                                name='nama'
                                id='nama'
                                className='mt-1'
                                autoComplete='nama'
                            />
                        </div>

                        <Button disabled={loading} className='mt-4'>
                            Ubah Feedback
                        </Button>
                    </form>
                </div>
            </AuthenticatedLayout>
        </>
    );
}
