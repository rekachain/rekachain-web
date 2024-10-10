import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router, useForm } from '@inertiajs/react';
import { Input } from '@/Components/UI/input';
import { FormEventHandler } from 'react';
import InputLabel from '@/Components/InputLabel';
import { Button } from '@/Components/UI/button';
import { feedbackService } from '@/Services/feedbackService';
import { ROUTES } from '@/Support/Constants/routes';
import { useSuccessToast } from '@/Hooks/useToast';
import { useLoading } from '@/Contexts/LoadingContext';
import { withLoading } from '@/Utils/withLoading';

export default function () {
    const { data, setData } = useForm({
        name: '',
        description: '',
    });

    const { loading } = useLoading();

    const submit: FormEventHandler = withLoading(async e => {
        e.preventDefault();

        await feedbackService.create(data);
        router.visit(route(`${ROUTES.FEEDBACKS}.index`));
        void useSuccessToast('Feedback created successfully');
    });

    return (
        <>
            <Head title="Tambah Feedback" />
            <AuthenticatedLayout>
                <div className="p-4">
                    <div className="flex gap-5 items-center">
                        <h1 className="text-page-header my-4">Tambah Feedback</h1>
                    </div>

                    <form onSubmit={submit} encType="multipart/form-data">
                        <div className="mt-4">
                            <InputLabel htmlFor="nama" value="Nama" />
                            <Input
                                id="nama"
                                type="text"
                                name="nama"
                                value={data.name}
                                className="mt-1"
                                autoComplete="nama"
                                onChange={e => setData('name', e.target.value)}
                            />
                        </div>

                        <div className="mt-4">
                            <InputLabel htmlFor="deskripsi" value="Deskripsi" />
                            <Input
                                id="deskripsi"
                                type="text"
                                name="deskripsi"
                                value={data.description}
                                className="mt-1"
                                autoComplete="deskripsi"
                                onChange={e => setData('description', e.target.value)}
                            />
                        </div>

                        <Button className="mt-4" disabled={loading}>
                            Tambah Feedback
                        </Button>
                    </form>
                </div>
            </AuthenticatedLayout>
        </>
    );
}
