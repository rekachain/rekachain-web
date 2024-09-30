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

export default function () {
    const { loading } = useLoading();

    const { data, setData} = useForm({
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
        void useSuccessToast('Raw Material berhasil ditambahkan');
    });

    return (
        <>
            <Head title="Tambah Raw Material" />
            <AuthenticatedLayout>
                <div className="p-4">
                    <div className="flex gap-5 items-center">
                        <h1 className="text-page-header my-4">Tambah Raw Material</h1>
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
                        </div>

                        <Button className="mt-4" disabled={loading}>
                            Tambah Raw Material
                        </Button>
                    </form>
                </div>
            </AuthenticatedLayout>
        </>
    );
}
