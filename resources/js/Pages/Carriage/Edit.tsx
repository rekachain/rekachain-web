import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import { Button } from '@/Components/UI/button';
import { Input } from '@/Components/UI/input';
import { useSuccessToast } from '@/Hooks/useToast';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { carriageService } from '@/Services/carriageService';
import { ROUTES } from '@/Support/Constants/routes';
import { CarriageResource } from '@/Support/Interfaces/Resources';
import { withLoading } from '@/Utils/withLoading';
import { Head, router, useForm } from '@inertiajs/react';
import { useLaravelReactI18n } from 'laravel-react-i18n';
import { FormEventHandler } from 'react';

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
