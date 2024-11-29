import InputLabel from '@/Components/InputLabel';
import { Button } from '@/Components/UI/button';
import { Input } from '@/Components/UI/input';
import { useLoading } from '@/Contexts/LoadingContext';
import { useSuccessToast } from '@/Hooks/useToast';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { feedbackService } from '@/Services/feedbackService';
import { ROUTES } from '@/Support/Constants/routes';
import { withLoading } from '@/Utils/withLoading';
import { Head, router, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

export default function () {
    const { data, setData } = useForm({
        name: '',
        description: '',
    });

    const { loading } = useLoading();

    const submit: FormEventHandler = withLoading(async (e) => {
        e.preventDefault();

        await feedbackService.create(data);
        router.visit(route(`${ROUTES.FEEDBACK}.index`));
        void useSuccessToast('Feedback created successfully');
    });

    return (
        <>
            <Head title='Tambah Feedback' />
            <AuthenticatedLayout>
                <div className='p-4'>
                    <div className='flex items-center gap-5'>
                        <h1 className='text-page-header my-4'>Tambah Feedback</h1>
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

                        <div className='mt-4'>
                            <InputLabel value='Deskripsi' htmlFor='deskripsi' />
                            <Input
                                value={data.description}
                                type='text'
                                onChange={(e) => setData('description', e.target.value)}
                                name='deskripsi'
                                id='deskripsi'
                                className='mt-1'
                                autoComplete='deskripsi'
                            />
                        </div>

                        <Button disabled={loading} className='mt-4'>
                            Tambah Feedback
                        </Button>
                    </form>
                </div>
            </AuthenticatedLayout>
        </>
    );
}
