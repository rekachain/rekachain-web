import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router, useForm } from '@inertiajs/react';
import { ROUTES } from '@/Support/Constants/routes';
import { Input } from '@/Components/UI/input';
import { FormEventHandler } from 'react';
import InputLabel from '@/Components/InputLabel';
import { Button } from '@/Components/UI/button';
import { divisionService } from '@/Services/divisionService';
import { useSuccessToast } from '@/Hooks/useToast';
import { withLoading } from '@/Utils/withLoading';
import { useLoading } from '@/Contexts/LoadingContext';
import { useLaravelReactI18n } from 'laravel-react-i18n';

export default function Create() {
    const { t } = useLaravelReactI18n();
    const { data, setData } = useForm({ name: '' });
    const { loading } = useLoading();
    const submit: FormEventHandler = withLoading(async e => {
        e.preventDefault();
        await divisionService.create(data);
        void useSuccessToast(t('pages.division.create.messages.created'));
        router.visit(route(`${ROUTES.DIVISIONS}.index`));
    });

    return (
        <AuthenticatedLayout>
            <Head title={t('pages.division.create.title')} />
            <div className="p-4">
                <div className="flex gap-5 items-center">
                    <h1 className="text-page-header my-4">{t('pages.division.create.title')}</h1>
                </div>

                <form onSubmit={submit} encType="multipart/form-data">
                    <div className="mt-4">
                        <InputLabel htmlFor="name" value={t('pages.division.create.fields.name')} />
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

                    <Button className="mt-4" disabled={loading}>
                        {t('pages.division.create.buttons.submit')}
                    </Button>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
