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
import { ProgressResource } from '@/Support/Interfaces/Resources';
import { PaginateResponse } from '@/Support/Interfaces/Others';
import { withLoading } from '@/Utils/withLoading';
import { useDebounce } from '@uidotdev/usehooks';
import { ServiceFilterOptions } from '@/Support/Interfaces/Others/ServiceFilterOptions';
import { progressService } from '@/Services/progressService';
import { useLaravelReactI18n } from 'laravel-react-i18n';

export default function () {
    const { t } = useLaravelReactI18n();
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState('');
    const [progressResponse, setProgressResponse] = useState<PaginateResponse<ProgressResource>>();
    const [searchProgress, setSearchProgress] = useState('');
    const { data, setData } = useForm({
        progress_id: 0 as number | null,
        name: '',
        estimated_time: 0,
        process: '',
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

    const submit: FormEventHandler = withLoading(async (event) => {
        event.preventDefault();
        await stepService.create(data);
        router.visit(route(`${ROUTES.STEPS}.index`));
        void useSuccessToast(t('pages.step.create.messages.created'));
    });

    const fetchProgress = useCallback(async (filters: ServiceFilterOptions) => {
        return await progressService.getAll(filters).then((response) => response.data);
    }, []);

    return (
        <>
            <Head title={t('pages.step.create.title')} />
            <AuthenticatedLayout>
                <div className='p-4'>
                    <div className='flex items-center gap-5'>
                        <h1 className='text-page-header my-4'>{t('pages.step.create.title')}</h1>
                    </div>

                    <form onSubmit={submit} encType='multipart/form-data'>
                        {/*<div className="mt-4">*/}
                        {/*    <GenericDataSelector*/}
                        {/*        id="progress_id"*/}
                        {/*        fetchData={fetchProgress}*/}
                        {/*        setSelectedData={id => setData('progress_id', id)}*/}
                        {/*        selectedDataId={data.progress_id ?? undefined}*/}
                        {/*        placeholder={t('pages.step.create.fields.progress_placeholder')}*/}
                        {/*        renderItem={(item: ProgressResource) => item.name}*/}
                        {/*        buttonClassName="mt-1"*/}
                        {/*        nullable*/}
                        {/*    />*/}
                        {/*</div>*/}

                        <div className='mt-4'>
                            <InputLabel value={t('pages.step.create.fields.name')} htmlFor='name' />
                            <Input
                                value={data.name}
                                type='text'
                                required
                                onChange={(e) => setData('name', e.target.value)}
                                name='name'
                                id='name'
                                className='mt-1'
                                autoComplete='name'
                            />
                        </div>

                        <div className='mt-4'>
                            <InputLabel
                                value={t('pages.step.create.fields.process')}
                                htmlFor='process'
                            />
                            <Input
                                value={data.process}
                                type='text'
                                required
                                onChange={(e) => setData('process', e.target.value)}
                                name='process'
                                id='process'
                                className='mt-1'
                                autoComplete='process'
                            />
                        </div>

                        <div className='mt-4'>
                            <InputLabel
                                value={t('pages.step.create.fields.estimated_manufacturing_time')}
                                htmlFor='estimated_time'
                            />
                            <Input
                                value={data.estimated_time}
                                type='number'
                                onChange={(e) => setData('estimated_time', +e.target.value)}
                                name='estimated_time'
                                id='estimated_time'
                                className='mt-1'
                                autoComplete='estimated_time'
                            />
                        </div>

                        <Button disabled={loading} className='mt-4'>
                            {t('pages.step.create.buttons.submit')}
                        </Button>
                    </form>
                </div>
            </AuthenticatedLayout>
        </>
    );
}
