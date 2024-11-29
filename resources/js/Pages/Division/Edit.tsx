import InputLabel from '@/Components/InputLabel';
import { Button } from '@/Components/UI/button';
import { Input } from '@/Components/UI/input';
import { useLoading } from '@/Contexts/LoadingContext';
import { useSuccessToast } from '@/Hooks/useToast';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { divisionService } from '@/Services/divisionService';
import { ROUTES } from '@/Support/Constants/routes';
import { DivisionResource } from '@/Support/Interfaces/Resources';
import { withLoading } from '@/Utils/withLoading';
import { Head, router, useForm } from '@inertiajs/react';
import { useLaravelReactI18n } from 'laravel-react-i18n';
import { FormEventHandler } from 'react';

export default function ({ division }: { division: DivisionResource }) {
    const { t } = useLaravelReactI18n();
    const { data, setData } = useForm({
        id: division.id,
        name: division.name,
    });
    const { loading } = useLoading();

    const submit: FormEventHandler = withLoading(async (e) => {
        e.preventDefault();
        await divisionService.update(division.id, data);
        void useSuccessToast(t('pages.division.edit.messages.updated'));
        router.visit(route(`${ROUTES.DIVISIONS}.index`));
    }, true);

    return (
        <>
            <Head title={t('pages.division.edit.title', { name: division.name })} />
            <AuthenticatedLayout>
                <div className='p-4'>
                    <div className='flex items-center gap-5'>
                        <h1 className='text-page-header my-4'>
                            {t('pages.division.edit.title', { name: division.name })}
                        </h1>
                    </div>

                    <form onSubmit={submit} encType='multipart/form-data'>
                        <div className='mt-4'>
                            <InputLabel
                                value={t('pages.division.edit.fields.name')}
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

                        <Button disabled={loading} className='mt-4'>
                            {t('pages.division.edit.buttons.submit')}
                        </Button>
                    </form>
                </div>
            </AuthenticatedLayout>
        </>
    );
}
