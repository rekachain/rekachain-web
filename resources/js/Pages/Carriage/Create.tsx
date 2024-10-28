import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router, useForm } from '@inertiajs/react';
import { Input } from '@/Components/UI/input';
import { FormEventHandler } from 'react';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';
import { Button } from '@/Components/UI/button';
import { carriageService } from '@/Services/carriageService';
import { ROUTES } from '@/Support/Constants/routes';
import { useSuccessToast } from '@/Hooks/useToast';
import { withLoading } from '@/Utils/withLoading';
import { useLaravelReactI18n } from 'laravel-react-i18n';

export default function () {
    const { t } = useLaravelReactI18n();
    const { data, setData, post, processing, errors, reset, progress } = useForm({
        type: '',
        description: '',
    });

    const submit: FormEventHandler = withLoading(async e => {
        e.preventDefault();
        await carriageService.create(data);
        router.visit(route(`${ROUTES.CARRIAGES}.index`));
        void useSuccessToast(t('pages.carriage.create.messages.created'));
    });

    return (
        <>
            <Head title={t('pages.carriage.create.title')} />
            <AuthenticatedLayout>
                <div className="p-4">
                    <div className="flex gap-5 items-center">
                        <h1 className="text-page-header my-4">{t('pages.carriage.create.title')}</h1>
                    </div>

                    <form onSubmit={submit} encType="multipart/form-data">
                        <div className="mt-4">
                            <InputLabel htmlFor="type" value={t('pages.carriage.create.fields.type')} />
                            <Input
                                id="type"
                                type="text"
                                name="type"
                                value={data.type}
                                className="mt-1"
                                autoComplete="type"
                                onChange={e => setData('type', e.target.value)}
                            />
                            <InputError message={errors.type} className="mt-2" />
                        </div>

                        <div className="mt-4">
                            <InputLabel htmlFor="description" value={t('pages.carriage.create.fields.description')} />
                            <Input
                                id="description"
                                type="text"
                                name="description"
                                value={data.description}
                                className="mt-1"
                                autoComplete="description"
                                onChange={e => setData('description', e.target.value)}
                            />
                            <InputError message={errors.description} className="mt-2" />
                        </div>

                        <Button className="mt-4" disabled={processing}>
                            {t('pages.carriage.create.buttons.submit')}
                        </Button>
                    </form>
                </div>
            </AuthenticatedLayout>
        </>
    );
}
