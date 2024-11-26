import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router, useForm } from '@inertiajs/react';
import { Input } from '@/Components/UI/input';
import { FormEventHandler, useCallback } from 'react';
import InputLabel from '@/Components/InputLabel';
import { Button } from '@/Components/UI/button';
import { componentService } from '@/Services/componentService';
import { ROUTES } from '@/Support/Constants/routes';
import { useSuccessToast } from '@/Hooks/useToast';
import { ComponentResource, ProgressResource } from '@/Support/Interfaces/Resources';
import { withLoading } from '@/Utils/withLoading';
import { ServiceFilterOptions } from '@/Support/Interfaces/Others/ServiceFilterOptions';
import { progressService } from '@/Services/progressService';
import { useLaravelReactI18n } from 'laravel-react-i18n';
import GenericDataSelector from '@/Components/GenericDataSelector';
import { Textarea } from '@/Components/UI/textarea';

export default function ({ component }: { component: ComponentResource }) {
    const { t } = useLaravelReactI18n();
    console.log(component);
    const { data, setData, processing } = useForm({
        progress_id: component.progress_id as number | null,
        description: component.description,
        name: component.name,
    });

    const fetchProgress = useCallback(async (filters: ServiceFilterOptions) => {
        return await progressService.getAll(filters).then(response => response.data);
    }, []);

    const submit: FormEventHandler = withLoading(async event => {
        event.preventDefault();
        await componentService.update(component.id, data);
        router.visit(route(`${ROUTES.COMPONENTS}.index`));
        void useSuccessToast(t('pages.component.edit.messages.updated'));
    });

    return (
        <>
            <Head
                title={t('pages.component.edit.title', {
                    name: component.name,
                })}
            />
            <AuthenticatedLayout>
                <div className="p-4">
                    <div className="flex gap-5 items-center">
                        <h1 className="text-page-header my-4">
                            {t('pages.component.edit.title', {
                                name: component.name,
                            })}
                        </h1>
                    </div>

                    <form onSubmit={submit} encType="multipart/form-data">
                        <div className="mt-4">
                            <InputLabel htmlFor="progress">{t('pages.component.create.fields.progress')}</InputLabel>
                            <div className="mt-4">
                                <GenericDataSelector
                                    setSelectedData={id => setData('progress_id', id)}
                                    selectedDataId={data.progress_id ?? undefined}
                                    renderItem={(item: ProgressResource) => item.name}
                                    placeholder={t('pages.component.create.fields.progress_placeholder')}
                                    nullable
                                    initialSearch={component.progress?.name}
                                    id="progress_id"
                                    fetchData={fetchProgress}
                                    buttonClassName="mt-1"
                                />
                            </div>
                        </div>

                        <div className="mt-4">
                            <InputLabel value={t('pages.component.edit.fields.description')} htmlFor="description" />
                            <Textarea
                                value={data.description}
                                onChange={e => setData('description', e.target.value)}
                                name="description"
                                id="description"
                                className="mt-1"
                                autoComplete="description"
                            />
                        </div>

                        <div className="mt-4">
                            <InputLabel value={t('pages.component.edit.fields.name')} htmlFor="name" />
                            <Input
                                value={data.name}
                                type="text"
                                onChange={e => setData('name', e.target.value)}
                                name="name"
                                id="name"
                                className="mt-1"
                                autoComplete="name"
                            />
                        </div>

                        <Button disabled={processing} className="mt-4">
                            {t('pages.component.edit.buttons.submit')}
                        </Button>
                    </form>
                </div>
            </AuthenticatedLayout>
        </>
    );
}
