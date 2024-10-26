import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router, useForm } from '@inertiajs/react';
import { Input } from '@/Components/UI/input';
import { FormEventHandler, useCallback, useEffect, useState } from 'react';
import InputLabel from '@/Components/InputLabel';
import { Button } from '@/Components/UI/button';
import { componentService } from '@/Services/componentService';
import { ROUTES } from '@/Support/Constants/routes';
import { useSuccessToast } from '@/Hooks/useToast';
import { ProgressResource } from '@/Support/Interfaces/Resources';
import { PaginateResponse } from '@/Support/Interfaces/Others';
import { withLoading } from '@/Utils/withLoading';
import { useDebounce } from '@uidotdev/usehooks';
import { ServiceFilterOptions } from '@/Support/Interfaces/Others/ServiceFilterOptions';
import { progressService } from '@/Services/progressService';
import { useLaravelReactI18n } from 'laravel-react-i18n';
import GenericDataSelector from '@/Components/GenericDataSelector';

export default function () {
    const { t } = useLaravelReactI18n();
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState('');
    const [progressResponse, setProgressResponse] = useState<PaginateResponse<ProgressResource>>();
    const [searchProgress, setSearchProgress] = useState('');
    const { data, setData, post, processing, errors, reset, progress } = useForm<{
        progress_id: number | null;
        name: string;
    }>({
        progress_id: null,
        name: '',
    });

    const debouncedSearchProgress = useDebounce(searchProgress, 300);

    const handleSyncProgress = withLoading(async () => {
        const filters: ServiceFilterOptions = { search: debouncedSearchProgress };
        const res = await progressService.getAll(filters);
        setProgressResponse(res);
    });

    const fetchProgress = useCallback(async (filters: ServiceFilterOptions) => {
        return await progressService.getAll(filters).then(response => response.data);
    }, []);

    useEffect(() => {
        void handleSyncProgress();
    }, [debouncedSearchProgress]);

    const submit: FormEventHandler = withLoading(async event => {
        event.preventDefault();
        await componentService.create(data);
        void useSuccessToast(t('pages.component.create.messages.created'));
        router.visit(route(`${ROUTES.COMPONENTS}.index`));
    });

    return (
        <>
            <Head title={t('pages.component.create.title')} />
            <AuthenticatedLayout>
                <div className="p-4">
                    <div className="flex gap-5 items-center">
                        <h1 className="text-page-header my-4">{t('pages.component.create.title')}</h1>
                    </div>

                    <form onSubmit={submit} encType="multipart/form-data">
                        <div className="mt-4">
                            <InputLabel htmlFor="progress">{t('pages.component.create.fields.progress')}</InputLabel>
                            <div className="mt-4">
                                <GenericDataSelector
                                    id="progress_id"
                                    fetchData={fetchProgress}
                                    setSelectedData={id => setData('progress_id', id)}
                                    selectedDataId={data.progress_id ?? undefined}
                                    placeholder={t('pages.component.create.fields.progress_placeholder')}
                                    renderItem={(item: ProgressResource) => item.name}
                                    buttonClassName="mt-1"
                                    nullable
                                />
                            </div>
                        </div>

                        <div className="mt-4">
                            <InputLabel htmlFor="name" value={t('pages.component.create.fields.name')} />
                            <Input
                                id="name"
                                type="text"
                                name="name"
                                value={data.name}
                                className="mt-1"
                                autoComplete="name"
                                required
                                onChange={e => setData('name', e.target.value)}
                            />
                        </div>

                        <Button className="mt-4" disabled={processing}>
                            {t('pages.component.create.buttons.submit')}
                        </Button>
                    </form>
                </div>
            </AuthenticatedLayout>
        </>
    );
}
