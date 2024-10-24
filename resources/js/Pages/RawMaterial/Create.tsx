import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router, useForm } from '@inertiajs/react';
import { ROUTES } from '@/Support/Constants/routes';
import { Input } from '@/Components/UI/input';
import { FormEventHandler } from 'react';
import InputLabel from '@/Components/InputLabel';
import { Button } from '@/Components/UI/button';
import { rawMaterialService } from '@/Services/rawMaterialService';
import { useLoading } from '@/Contexts/LoadingContext';
import { useSuccessToast } from '@/Hooks/useToast';
import { withLoading } from '@/Utils/withLoading';
import { useLaravelReactI18n } from 'laravel-react-i18n';

export default function () {
    const { t } = useLaravelReactI18n();
    const { loading } = useLoading();

    const { data, setData } = useForm({
        name: '',
        material_code: '',
        description: '',
        specs: '',
        unit: '',
    });

    const submit: FormEventHandler = withLoading(async e => {
        e.preventDefault();

        await rawMaterialService.create(data);
        router.visit(route(`${ROUTES.RAW_MATERIALS}.index`));
        void useSuccessToast(t('pages.raw_material.create.messages.created'));
    });

    return (
        <>
            <Head title={t('pages.raw_material.create.title')} />
            <AuthenticatedLayout>
                <div className="p-4">
                    <div className="flex gap-5 items-center">
                        <h1 className="text-page-header my-4">{t('pages.raw_material.create.title')}</h1>
                    </div>

                    <form onSubmit={submit}>
                        <div className="mt-4">
                            <InputLabel
                                htmlFor="material_code"
                                value={t('pages.raw_material.create.fields.material_code')}
                            />
                            <Input
                                id="material_code"
                                type="text"
                                name="material_code"
                                value={data.material_code}
                                className="mt-1"
                                autoComplete="material_code"
                                onChange={e => setData('material_code', e.target.value)}
                            />
                        </div>

                        <div className="mt-4">
                            <InputLabel
                                htmlFor="description"
                                value={t('pages.raw_material.create.fields.description')}
                            />
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

                        <div className="mt-4">
                            <InputLabel htmlFor="specs" value={t('pages.raw_material.create.fields.specs')} />
                            <Input
                                id="specs"
                                type="text"
                                name="specs"
                                value={data.specs}
                                className="mt-1"
                                autoComplete="specs"
                                onChange={e => setData('specs', e.target.value)}
                            />
                        </div>

                        <div className="mt-4">
                            <InputLabel htmlFor="unit" value={t('pages.raw_material.create.fields.unit')} />
                            <Input
                                id="unit"
                                type="text"
                                name="unit"
                                value={data.unit}
                                className="mt-1"
                                autoComplete="unit"
                                onChange={e => setData('unit', e.target.value)}
                            />
                        </div>

                        <Button className="mt-4" disabled={loading}>
                            {t('pages.raw_material.create.buttons.submit')}
                        </Button>
                    </form>
                </div>
            </AuthenticatedLayout>
        </>
    );
}
