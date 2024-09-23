import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router, useForm } from '@inertiajs/react';
import { ROUTES } from '@/Support/constants/routes';
import { Input } from '@/Components/ui/input';
import { FormEventHandler } from 'react';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';
import { Button } from '@/Components/ui/button';
import { RawMaterialResource } from '@/Support/interfaces/resources';
import { rawMaterialService } from '@/Services/rawMaterialService';
import { useLoading } from '@/Contexts/LoadingContext';
import { useSuccessToast } from '@/Hooks/useToast';

export default function ({ rawMaterial }: { rawMaterial: RawMaterialResource }) {
    const { data, setData, post, processing, errors, reset, progress } = useForm({
        id: rawMaterial.id,
        material_code: rawMaterial.material_code,
        description: rawMaterial.description,
        specs: rawMaterial.specs,
        unit: rawMaterial.unit,
    });
    const { setLoading } = useLoading();

    const submit: FormEventHandler = async e => {
        e.preventDefault();
        setLoading(true);
        const redirectToIndex = () => router.visit(route(`${ROUTES.RAW_MATERIALS}.index`));
        await rawMaterialService.update(rawMaterial.id, data);
        useSuccessToast('Raw Material berhasil diubah');
        setLoading(false);
        redirectToIndex();
    };

    return (
        <>
            <Head title="Ubah RawMaterial" />
            <AuthenticatedLayout>
                <div className="p-4">
                    <div className="flex gap-5 items-center">
                        <h1 className="text-page-header my-4">Ubah Raw Material: {rawMaterial.material_code}</h1>
                    </div>

                    <form onSubmit={submit}>
                        <div className="mt-4">
                            <InputLabel htmlFor="material_code" value="Kode Material" />
                            <Input
                                id="material_code"
                                type="text"
                                name="material_code"
                                value={data.material_code}
                                className="mt-1"
                                autoComplete="material_code"
                                onChange={e => setData('material_code', e.target.value)}
                            />
                            <InputError message={errors.material_code} className="mt-2" />
                        </div>

                        <div className="mt-4">
                            <InputLabel htmlFor="description" value="Deskripsi" />
                            <Input
                                id="description"
                                type="text"
                                name="description"
                                value={data.description}
                                className="mt-1"
                                autoComplete="description"
                                onChange={e => setData('description', e.target.value)}
                            />
                            <InputError message={errors.description} className="mt-2" />
                        </div>

                        <div className="mt-4">
                            <InputLabel htmlFor="specs" value="Spesifikasi" />
                            <Input
                                id="specs"
                                type="text"
                                name="specs"
                                value={data.specs}
                                className="mt-1"
                                autoComplete="specs"
                                onChange={e => setData('specs', e.target.value)}
                            />
                            <InputError message={errors.specs} className="mt-2" />
                        </div>

                        <div className="mt-4">
                            <InputLabel htmlFor="unit" value="Unit" />
                            <Input
                                id="unit"
                                type="text"
                                name="unit"
                                value={data.unit}
                                className="mt-1"
                                autoComplete="unit"
                                onChange={e => setData('unit', e.target.value)}
                            />
                            <InputError message={errors.unit} className="mt-2" />
                        </div>

                        <Button className="mt-4" disabled={processing}>
                            Ubah Raw Material
                        </Button>
                    </form>
                </div>
            </AuthenticatedLayout>
        </>
    );
}
