import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router, useForm } from '@inertiajs/react';
import { ROUTES } from '@/Support/Constants/routes';
import { Input } from '@/Components/UI/input';
import { FormEventHandler } from 'react';
import InputLabel from '@/Components/InputLabel';
import { Button } from '@/Components/UI/button';
import { RawMaterialResource } from '@/Support/Interfaces/Resources';
import { rawMaterialService } from '@/Services/rawMaterialService';
import { useLoading } from '@/Contexts/LoadingContext';
import { useSuccessToast } from '@/Hooks/useToast';
import { withLoading } from '@/Utils/withLoading';
import { useLaravelReactI18n } from 'laravel-react-i18n';

export default function ({ rawMaterial }: { rawMaterial: RawMaterialResource }) {
    const { t } = useLaravelReactI18n();
    const { loading } = useLoading();

    const { data, setData } = useForm({
        id: rawMaterial.id,
        material_code: rawMaterial.material_code,
        description: rawMaterial.description,
        specs: rawMaterial.specs,
        unit: rawMaterial.unit,
    });

    const submit: FormEventHandler = withLoading(async e => {
        e.preventDefault();
        await rawMaterialService.update(rawMaterial.id, data);
        router.visit(route(`${ROUTES.RAW_MATERIALS}.index`));
        void useSuccessToast(t('pages.raw_material.edit.messages.updated'));
    });

    return (
        <>
            <Head title={t('pages.raw_material.edit.title', { name: rawMaterial.material_code })} />
            <AuthenticatedLayout>
                <div className="p-4">
                    <div className="flex gap-5 items-center">
                        <h1 className="text-page-header my-4">
                            {t('pages.raw_material.edit.title', { name: rawMaterial.material_code })}
                        </h1>
                    </div>

                    <form onSubmit={submit}>
                        <div className="mt-4">
                            <InputLabel
                                value={t('pages.raw_material.edit.fields.material_code')}
                                htmlFor="material_code"
                            />
                            <Input
                                value={data.material_code}
                                type="text"
                                onChange={e => setData('material_code', e.target.value)}
                                name="material_code"
                                id="material_code"
                                className="mt-1"
                                autoComplete="material_code"
                            />
                        </div>

                        <div className="mt-4">
                            <InputLabel value={t('pages.raw_material.edit.fields.description')} htmlFor="description" />
                            <Input
                                value={data.description}
                                type="text"
                                onChange={e => setData('description', e.target.value)}
                                name="description"
                                id="description"
                                className="mt-1"
                                autoComplete="description"
                            />
                        </div>

                        <div className="mt-4">
                            <InputLabel value={t('pages.raw_material.edit.fields.specs')} htmlFor="specs" />
                            <Input
                                value={data.specs}
                                type="text"
                                onChange={e => setData('specs', e.target.value)}
                                name="specs"
                                id="specs"
                                className="mt-1"
                                autoComplete="specs"
                            />
                        </div>

                        <div className="mt-4">
                            <InputLabel value={t('pages.raw_material.edit.fields.unit')} htmlFor="unit" />
                            <Input
                                value={data.unit}
                                type="text"
                                onChange={e => setData('unit', e.target.value)}
                                name="unit"
                                id="unit"
                                className="mt-1"
                                autoComplete="unit"
                            />
                        </div>

                        <Button disabled={loading} className="mt-4">
                            {t('pages.raw_material.edit.buttons.submit')}
                        </Button>
                    </form>
                </div>
            </AuthenticatedLayout>
        </>
    );
}
