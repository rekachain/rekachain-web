import InputLabel from '@/Components/InputLabel';
import { Button } from '@/Components/UI/button';
import { Input } from '@/Components/UI/input';
import { useLoading } from '@/Contexts/LoadingContext';
import { useSuccessToast } from '@/Hooks/useToast';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { workshopService } from '@/Services/workshopService';
import { ROUTES } from '@/Support/Constants/routes';
import { WorkshopResource } from '@/Support/Interfaces/Resources';
import { withLoading } from '@/Utils/withLoading';
import { Head, router, useForm } from '@inertiajs/react';
import { useLaravelReactI18n } from 'laravel-react-i18n';
import { FormEventHandler } from 'react';

export default function ({ workshop }: { workshop: WorkshopResource }) {
    const { t } = useLaravelReactI18n();
    const { data, setData } = useForm({
        id: workshop.id,
        name: workshop.name,
        address: workshop.address,
    });

    const { loading } = useLoading();

    const submit: FormEventHandler = withLoading(async (e) => {
        e.preventDefault();

        await workshopService.update(workshop.id, data);
        router.visit(route(`${ROUTES.WORKSHOPS}.index`));
        void useSuccessToast(t('pages.workshop.edit.messages.updated'));
    });

    return (
        <>
            <Head
                title={t('pages.workshop.edit.title', {
                    name: workshop.name,
                })}
            />
            <AuthenticatedLayout>
                <div className='p-4'>
                    <div className='flex items-center gap-5'>
                        <h1 className='text-page-header my-4'>
                            {t('pages.workshop.edit.title', {
                                name: workshop.name,
                            })}
                        </h1>
                    </div>

                    <form onSubmit={submit} encType='multipart/form-data'>
                        <div className='mt-4'>
                            <InputLabel
                                value={t('pages.workshop.edit.fields.name')}
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
                                value={t('pages.workshop.edit.fields.address')}
                                htmlFor='address'
                            />
                            <Input
                                value={data.address}
                                type='text'
                                onChange={(e) => setData('address', e.target.value)}
                                name='address'
                                id='address'
                                className='mt-1'
                                autoComplete='address'
                            />
                        </div>

                        <Button disabled={loading} className='mt-4'>
                            {t('pages.workshop.edit.buttons.submit')}
                        </Button>
                    </form>
                </div>
            </AuthenticatedLayout>
        </>
    );
}
