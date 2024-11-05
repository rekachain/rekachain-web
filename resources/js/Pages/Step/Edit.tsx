import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router, useForm } from '@inertiajs/react';
import { Input } from '@/Components/UI/input';
import { FormEventHandler, useCallback, useEffect, useState } from 'react';
import InputLabel from '@/Components/InputLabel';
import { Button } from '@/Components/UI/button';
import { stepService } from '@/Services/stepService';
import { ROUTES } from '@/Support/Constants/routes';
import { useSuccessToast } from '@/Hooks/useToast';
import { useLoading } from '@/Contexts/LoadingContext';
import { ProgressResource, StepResource } from '@/Support/Interfaces/Resources';
import { PaginateResponse } from '@/Support/Interfaces/Others';
import { withLoading } from '@/Utils/withLoading';
import { useDebounce } from '@uidotdev/usehooks';
import { ServiceFilterOptions } from '@/Support/Interfaces/Others/ServiceFilterOptions';
import { progressService } from '@/Services/progressService';
import { useLaravelReactI18n } from 'laravel-react-i18n';

export default function ({ step }: { step: StepResource }) {
    const { t } = useLaravelReactI18n();
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState('');
    const [progressResponse, setProgressResponse] = useState<PaginateResponse<ProgressResource>>();
    const [searchProgress, setSearchProgress] = useState(step.progress?.name);
    const { data, setData } = useForm({
        progress_id: step.progress_id as number | null,
        name: step.name,
        estimated_time: step.estimated_time ?? 0,
        process: step.process,
    });

    const { loading } = useLoading();

    const debouncedSearchProgress = useDebounce(searchProgress, 300);

    const handleSyncProgress = withLoading(async () => {
        const filters: ServiceFilterOptions = { search: debouncedSearchProgress };
        const res = await progressService.getAll(filters);
        setProgressResponse(res);
    });

    useEffect(() => {
        void handleSyncProgress();
    }, [debouncedSearchProgress]);

    const submit: FormEventHandler = withLoading(async event => {
        event.preventDefault();
        await stepService.update(step.id, data);
        router.visit(route(`${ROUTES.STEPS}.index`));
        void useSuccessToast(t('pages.step.edit.messages.updated'));
    });

    const fetchProgress = useCallback(async (filters: ServiceFilterOptions) => {
        return await progressService.getAll(filters).then(response => response.data);
    }, []);

    return (
        <>
            <Head title={t('pages.step.edit.title', { name: step.name })} />
            <AuthenticatedLayout>
                <div className="p-4">
                    <div className="flex gap-5 items-center">
                        <h1 className="text-page-header my-4">{t('pages.step.edit.title', { name: step.name })}</h1>
                    </div>

                    <form onSubmit={submit} encType="multipart/form-data">
                        {/*<div className="mt-4">*/}
                        {/*    <GenericDataSelector*/}
                        {/*        id="workstation_id"*/}
                        {/*        fetchData={fetchProgress}*/}
                        {/*        setSelectedData={id => setData('progress_id', id)}*/}
                        {/*        selectedDataId={data.progress_id}*/}
                        {/*        placeholder={t('pages.step.edit.fields.progress_placeholder')}*/}
                        {/*        renderItem={item => item.name}*/}
                        {/*        initialSearch={step.progress?.name}*/}
                        {/*        buttonClassName="mt-1"*/}
                        {/*        nullable*/}
                        {/*    />*/}
                        {/*</div>*/}

                        <div className="mt-4">
                            <InputLabel htmlFor="name" value={t('pages.step.edit.fields.name')} />
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
                            <InputLabel htmlFor="process" value={t('pages.step.edit.fields.process')} />
                            <Input
                                id="process"
                                type="text"
                                name="process"
                                value={data.process}
                                className="mt-1"
                                autoComplete="process"
                                onChange={e => setData('process', e.target.value)}
                            />
                        </div>

                        <div className="mt-4">
                            <InputLabel
                                htmlFor="estimated_time"
                                value={t('pages.step.edit.fields.estimated_manufacturing_time')}
                            />
                            <Input
                                id="estimated_time"
                                type="number"
                                name="estimated_time"
                                value={data.estimated_time}
                                className="mt-1"
                                autoComplete="estimated_time"
                                onChange={e => setData('estimated_time', +e.target.value)}
                            />
                        </div>

                        <Button className="mt-4" disabled={loading}>
                            {t('pages.step.edit.buttons.submit')}
                        </Button>
                    </form>
                </div>
            </AuthenticatedLayout>
        </>
    );
}
