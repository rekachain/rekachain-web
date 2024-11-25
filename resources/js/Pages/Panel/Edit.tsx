import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router, useForm } from '@inertiajs/react';
import { ROUTES } from '@/Support/Constants/routes';
import { Input } from '@/Components/UI/input';
import { FormEventHandler, useCallback } from 'react';
import InputLabel from '@/Components/InputLabel';
import { Button } from '@/Components/UI/button';
import { PanelResource, ProgressResource } from '@/Support/Interfaces/Resources';
import { panelService } from '@/Services/panelService';
import { useSuccessToast } from '@/Hooks/useToast';
import { withLoading } from '@/Utils/withLoading';
import { useLoading } from '@/Contexts/LoadingContext';
import { useLaravelReactI18n } from 'laravel-react-i18n';
import GenericDataSelector from '@/Components/GenericDataSelector';
import { ServiceFilterOptions } from '@/Support/Interfaces/Others';
import { progressService } from '@/Services/progressService';

export default function ({ panel }: { panel: PanelResource }) {
    const { t } = useLaravelReactI18n();
    const { loading } = useLoading();

    const { data, setData } = useForm({
        id: panel.id,
        progress_id: panel.progress_id as number | null,
        name: panel.name,
        description: panel.description,
    });

    const fetchProgress = useCallback(async (filters: ServiceFilterOptions) => {
        return await progressService.getAll(filters).then(response => response.data);
    }, []);

    const submit: FormEventHandler = withLoading(async e => {
        e.preventDefault();
        await panelService.update(panel.id, data);
        router.visit(route(`${ROUTES.PANELS}.index`));
        void useSuccessToast(t('pages.panel.edit.messages.updated'));
    });

    return (
        <>
            <Head
                title={t('pages.panel.edit.title', {
                    name: panel.name,
                })}
            />
            <AuthenticatedLayout>
                <div className="p-4">
                    <div className="flex gap-5 items-center">
                        <h1 className="text-page-header my-4">
                            {t('pages.panel.edit.title', {
                                name: panel.name,
                            })}
                        </h1>
                    </div>

                    <form onSubmit={submit} encType="multipart/form-data">
                        <div className="mt-4">
                            <InputLabel htmlFor="progress">{t('pages.panel.edit.fields.progress')}</InputLabel>
                            <div className="mt-4">
                                <GenericDataSelector
                                    id="progress_id"
                                    fetchData={fetchProgress}
                                    setSelectedData={id => setData('progress_id', id)}
                                    selectedDataId={data.progress_id ?? undefined}
                                    placeholder={t('pages.panel.edit.fields.progress_placeholder')}
                                    renderItem={(item: ProgressResource) => item.name}
                                    initialSearch={panel.progress?.name}
                                    buttonClassName="mt-1"
                                    nullable
                                />
                            </div>
                        </div>

                        <div className="mt-4">
                            <InputLabel htmlFor="name" value={t('pages.panel.edit.fields.name')} />
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
                            <InputLabel htmlFor="description" value={t('pages.panel.edit.fields.description')} />
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
                            {t('pages.panel.edit.buttons.submit')}
                        </Button>
                    </form>
                </div>
            </AuthenticatedLayout>
        </>
    );
}
