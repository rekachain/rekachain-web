import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router, useForm } from '@inertiajs/react';
import { ROUTES } from '@/Support/Constants/routes';
import { Input } from '@/Components/UI/input';
import { FormEventHandler } from 'react';
import InputLabel from '@/Components/InputLabel';
import { Button } from '@/Components/UI/button';
import { DivisionResource, WorkshopResource } from '@/Support/Interfaces/Resources';
import { workshopService } from '@/Services/workshopService';
import { useLoading } from '@/Contexts/LoadingContext';
import { useSuccessToast } from '@/Hooks/useToast';
import { withLoading } from '@/Utils/withLoading';
import { useLaravelReactI18n } from 'laravel-react-i18n';

export default function ({ workshops, divisions }: { workshops: WorkshopResource[]; divisions: DivisionResource[] }) {
    const { t } = useLaravelReactI18n();
    const { data, setData } = useForm({
        name: '',
        address: '',
    });

    const { loading } = useLoading();

    const submit: FormEventHandler = withLoading(async e => {
        e.preventDefault();

        await workshopService.create(data);
        router.visit(route(`${ROUTES.WORKSHOPS}.index`));
        void useSuccessToast(t('pages.workshops.create.messages.created'));
    });

    return (
        <>
            <Head title={t('pages.workshops.create.title')} />
            <AuthenticatedLayout>
                <div className="p-4">
                    <div className="flex gap-5 items-center">
                        <h1 className="text-page-header my-4">{t('pages.workshops.create.title')}</h1>
                    </div>

                    <form onSubmit={submit} encType="multipart/form-data">
                        <div className="mt-4">
                            <InputLabel htmlFor="name" value={t('pages.workshops.create.fields.name')} />
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
                            <InputLabel htmlFor="address" value={t('pages.workshops.create.fields.address')} />
                            <Input
                                id="address"
                                type="text"
                                name="address"
                                value={data.address}
                                className="mt-1"
                                autoComplete="address"
                                onChange={e => setData('address', e.target.value)}
                            />
                        </div>

                        <Button className="mt-4" disabled={loading}>
                            {t('pages.workshops.create.buttons.submit')}
                        </Button>
                    </form>
                </div>
            </AuthenticatedLayout>
        </>
    );
}
