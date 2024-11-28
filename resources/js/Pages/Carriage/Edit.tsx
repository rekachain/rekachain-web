import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router, useForm } from '@inertiajs/react';
import { ROUTES } from '@/Support/Constants/routes';
import { Input } from '@/Components/UI/input';
import { FormEventHandler } from 'react';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';
import { Button } from '@/Components/UI/button';
import { CarriageResource } from '@/Support/Interfaces/Resources';
import { carriageService } from '@/Services/carriageService';
import { useSuccessToast } from '@/Hooks/useToast';
import { withLoading } from '@/Utils/withLoading';
import { useLaravelReactI18n } from 'laravel-react-i18n';

export default function ({ carriage }: { carriage: CarriageResource }) {
    const { t } = useLaravelReactI18n();
    const { data, setData, post, processing, errors, reset, progress } = useForm({
        id: carriage.id,
        type: carriage.type,
        description: carriage.description,
    });

    const submit: FormEventHandler = withLoading(async (e) => {
        e.preventDefault();
        await carriageService.update(carriage.id, data);
        router.visit(route(`${ROUTES.CARRIAGES}.index`));
        void useSuccessToast(t('pages.carriage.edit.messages.updated'));
    });

    return (
        <>
            <Head
                title={t('pages.carriage.edit.title', {
                    name: carriage.type,
                })}
            />
            <AuthenticatedLayout>
                <div className='p-4'>
                    <div className='flex items-center gap-5'>
                        <h1 className='text-page-header my-4'>
                            {t('pages.carriage.edit.title', {
                                name: carriage.type,
                            })}
                        </h1>
                    </div>

                    <form onSubmit={submit} encType='multipart/form-data'>
                        <div className='mt-4'>
                            <InputLabel
                                value={t('pages.carriage.edit.fields.type')}
                                htmlFor='type'
                            />
                            <Input
                                value={data.type}
                                type='text'
                                onChange={(e) => setData('type', e.target.value)}
                                name='type'
                                id='type'
                                className='mt-1'
                                autoComplete='type'
                            />
                            <InputError message={errors.type} className='mt-2' />
                        </div>

                        <div className='mt-4'>
                            <InputLabel
                                value={t('pages.carriage.edit.fields.description')}
                                htmlFor='description'
                            />
                            <Input
                                value={data.description}
                                type='text'
                                onChange={(e) => setData('description', e.target.value)}
                                name='description'
                                id='description'
                                className='mt-1'
                                autoComplete='description'
                            />
                            <InputError message={errors.description} className='mt-2' />
                        </div>

                        <Button disabled={processing} className='mt-4'>
                            {t('pages.carriage.edit.buttons.submit')}
                        </Button>
                    </form>
                </div>
            </AuthenticatedLayout>
        </>
    );
}
