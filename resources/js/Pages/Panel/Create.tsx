import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router, useForm } from '@inertiajs/react';
import { Input } from '@/Components/UI/input';
import { FormEventHandler, useCallback } from 'react';
import InputLabel from '@/Components/InputLabel';
import { Button } from '@/Components/UI/button';
import { panelService } from '@/Services/panelService';
import { ROUTES } from '@/Support/Constants/routes';
import { useSuccessToast } from '@/Hooks/useToast';
import { useLoading } from '@/Contexts/LoadingContext';
import { withLoading } from '@/Utils/withLoading';
import { useLaravelReactI18n } from 'laravel-react-i18n';
import GenericDataSelector from '@/Components/GenericDataSelector';
import { ProgressResource } from '@/Support/Interfaces/Resources';
import { ServiceFilterOptions } from '@/Support/Interfaces/Others';
import { progressService } from '@/Services/progressService';

export default function () {
    const { t } = useLaravelReactI18n();
    const { data, setData } = useForm({
        name: '',
        progress_id: null as number | null,
        description: '',
    });

    const { loading } = useLoading();
    const fetchProgress = useCallback(async (filters: ServiceFilterOptions) => {
        return await progressService.getAll(filters).then(response => response.data);
    }, []);

    const submit: FormEventHandler = withLoading(async e => {
        e.preventDefault();

        await panelService.create(data);
        router.visit(route(`${ROUTES.PANELS}.index`));
        void useSuccessToast(t('pages.panel.create.messages.created'));
    });

    return (
        <>
            <Head title={t('pages.panel.create.title')} />
            <AuthenticatedLayout>
                <div className="p-4">
                    <div className="flex gap-5 items-center">
                        <h1 className="text-page-header my-4">{t('pages.panel.create.title')}</h1>
                    </div>

                    <form onSubmit={submit} encType="multipart/form-data">
                        <div className="mt-4">
                            <InputLabel htmlFor="progress">{t('pages.panel.create.fields.progress')}</InputLabel>
                            <div className="mt-4">
                                <GenericDataSelector
                                    id="progress_id"
                                    fetchData={fetchProgress}
                                    setSelectedData={id => setData('progress_id', id)}
                                    selectedDataId={data.progress_id ?? undefined}
                                    placeholder={t('pages.panel.create.fields.progress_placeholder')}
                                    renderItem={(item: ProgressResource) => item.name}
                                    buttonClassName="mt-1"
                                    nullable
                                />
                            </div>
                        </div>

                        <div className="mt-4">
                            <InputLabel htmlFor="name" value={t('pages.panel.create.fields.name')} />
                            <Input
                                id="name"
                                type="text"
                                name="name"
                                value={data.name}
                                className="mt-1"
                                autoComplete="name"
                                onChange={e => setData('name', e.target.value)}
                            />
                        </div>

                        <div className="mt-4">
                            <InputLabel htmlFor="description" value={t('pages.panel.create.fields.description')} />
                            <Input
                                id="description"
                                type="text"
                                name="description"
                                value={data.description}
                                className="mt-1"
                                autoComplete="description"
                                onChange={e => setData('description', e.target.value)}
                            />
                        </div>

                        <Button className="mt-4" disabled={loading}>
                            {t('pages.panel.create.buttons.submit')}
                        </Button>
                    </form>
                </div>
            </AuthenticatedLayout>
        </>
    );
}
