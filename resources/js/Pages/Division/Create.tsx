import InputLabel from '@/Components/InputLabel';
import { Button } from '@/Components/UI/button';
import { Input } from '@/Components/UI/input';
import { useLoading } from '@/Contexts/LoadingContext';
import { useSuccessToast } from '@/Hooks/useToast';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { divisionService } from '@/Services/divisionService';
import { ROUTES } from '@/Support/Constants/routes';
import { withLoading } from '@/Utils/withLoading';
import { Head, router, useForm } from '@inertiajs/react';
import { useLaravelReactI18n } from 'laravel-react-i18n';
import { FormEventHandler } from 'react';

export default function Create() {
    const { t } = useLaravelReactI18n();
    const { data, setData } = useForm({ name: '' });
    const { loading } = useLoading();
    const submit: FormEventHandler = withLoading(async (e) => {
        e.preventDefault();
        await divisionService.create(data);
        void useSuccessToast(t('pages.division.create.messages.created'));
        router.visit(route(`${ROUTES.DIVISIONS}.index`));
    });

    return (
        <AuthenticatedLayout>
            <Head title={t('pages.division.create.title')} />
            <div className='p-4'>
                <div className='flex items-center gap-5'>
                    <h1 className='text-page-header my-4'>{t('pages.division.create.title')}</h1>
                </div>

                <form onSubmit={submit} encType='multipart/form-data'>
                    <div className='mt-4'>
                        <InputLabel value={t('pages.division.create.fields.name')} htmlFor='name' />
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

                    <Button disabled={loading} className='mt-4'>
                        {t('pages.division.create.buttons.submit')}
                    </Button>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
