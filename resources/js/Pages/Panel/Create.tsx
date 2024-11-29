import GenericDataSelector from '@/Components/GenericDataSelector';
import InputLabel from '@/Components/InputLabel';
import { Button } from '@/Components/UI/button';
import { Input } from '@/Components/UI/input';
import { useLoading } from '@/Contexts/LoadingContext';
import { useSuccessToast } from '@/Hooks/useToast';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { panelService } from '@/Services/panelService';
import { progressService } from '@/Services/progressService';
import { ROUTES } from '@/Support/Constants/routes';
import { ServiceFilterOptions } from '@/Support/Interfaces/Others';
import { ProgressResource } from '@/Support/Interfaces/Resources';
import { withLoading } from '@/Utils/withLoading';
import { Head, router, useForm } from '@inertiajs/react';
import { useLaravelReactI18n } from 'laravel-react-i18n';
import { FormEventHandler, useCallback } from 'react';

export default function () {
    const { t } = useLaravelReactI18n();
    const { data, setData } = useForm({
        name: '',
        progress_id: null as number | null,
        description: '',
    });

    const { loading } = useLoading();
    const fetchProgress = useCallback(async (filters: ServiceFilterOptions) => {
        return await progressService.getAll(filters).then((response) => response.data);
    }, []);

    const submit: FormEventHandler = withLoading(async (e) => {
        e.preventDefault();

        await panelService.create(data);
        router.visit(route(`${ROUTES.PANELS}.index`));
        void useSuccessToast(t('pages.panel.create.messages.created'));
    });

    return (
        <>
            <Head title={t('pages.panel.create.title')} />
            <AuthenticatedLayout>
                <div className='p-4'>
                    <div className='flex items-center gap-5'>
                        <h1 className='text-page-header my-4'>{t('pages.panel.create.title')}</h1>
                    </div>

                    <form onSubmit={submit} encType='multipart/form-data'>
                        <div className='mt-4'>
                            <InputLabel htmlFor='progress'>
                                {t('pages.panel.create.fields.progress')}
                            </InputLabel>
                            <div className='mt-4'>
                                <GenericDataSelector
                                    setSelectedData={(id) => setData('progress_id', id)}
                                    selectedDataId={data.progress_id ?? undefined}
                                    renderItem={(item: ProgressResource) => item.name}
                                    placeholder={t(
                                        'pages.panel.create.fields.progress_placeholder',
                                    )}
                                    nullable
                                    id='progress_id'
                                    fetchData={fetchProgress}
                                    buttonClassName='mt-1'
                                />
                            </div>
                        </div>

                        <div className='mt-4'>
                            <InputLabel
                                value={t('pages.panel.create.fields.name')}
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
                                value={t('pages.panel.create.fields.description')}
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
                        </div>

                        <Button disabled={loading} className='mt-4'>
                            {t('pages.panel.create.buttons.submit')}
                        </Button>
                    </form>
                </div>
            </AuthenticatedLayout>
        </>
    );
}
