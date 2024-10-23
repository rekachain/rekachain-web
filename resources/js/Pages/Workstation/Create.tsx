import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router, useForm } from '@inertiajs/react';
import { ROUTES } from '@/Support/Constants/routes';
import { Input } from '@/Components/UI/input';
import { FormEventHandler } from 'react';
import InputLabel from '@/Components/InputLabel';
import { Button } from '@/Components/UI/button';
import { RadioGroup, RadioGroupItem } from '@/Components/UI/radio-group';
import { Label } from '@/Components/UI/label';
import { DivisionResource, WorkshopResource } from '@/Support/Interfaces/Resources';
import { workstationService } from '@/Services/workstationService';
import { useLoading } from '@/Contexts/LoadingContext';
import { useSuccessToast } from '@/Hooks/useToast';
import { withLoading } from '@/Utils/withLoading';

export default function ({ workshops, divisions }: { workshops: WorkshopResource[]; divisions: DivisionResource[] }) {
    const { data, setData } = useForm({
        name: '',
        location: '',
        workshop_id: '',
        division_id: '',
    });

    const { loading } = useLoading();

    const submit: FormEventHandler = withLoading(async e => {
        e.preventDefault();

        await workstationService.create(data);
        router.visit(route(`${ROUTES.WORKSTATIONS}.index`));
        void useSuccessToast('Workstation berhasil ditambahkan');
    });

    return (
        <>
            <Head title="Tambah Workstation" />
            <AuthenticatedLayout>
                <div className="p-4">
                    <div className="flex gap-5 items-center">
                        <h1 className="text-page-header my-4">Tambah Workstation</h1>
                    </div>

                    <form onSubmit={submit} encType="multipart/form-data">
                        <div className="mt-4">
                            <InputLabel htmlFor="nama" value="Nama" />
                            <Input
                                id="nama"
                                type="text"
                                name="nama"
                                value={data.name}
                                className="mt-1"
                                autoComplete="nama"
                                onChange={e => setData('name', e.target.value)}
                            />
                        </div>

                        <div className="mt-4">
                            <InputLabel htmlFor="location" value="Location" />
                            <Input
                                id="location"
                                type="text"
                                name="location"
                                value={data.location}
                                className="mt-1"
                                autoComplete="location"
                                onChange={e => setData('location', e.target.value)}
                            />
                        </div>

                        <div className="mt-4 rounded bg-background-2 p-4 space-y-2">
                            <h2 className="text-lg font-semibold">Workshop</h2>
                            <RadioGroup onValueChange={v => setData('workshop_id', v)}>
                                {workshops?.map(workshop => (
                                    <div key={workshop.id} className="flex items-center space-x-2">
                                        <RadioGroupItem
                                            value={workshop.id.toString()}
                                            id={`workshop.${workshop.id.toString()}`}
                                        />
                                        <Label htmlFor={`workshop.${workshop.id.toString()}`}>{workshop.name}</Label>
                                    </div>
                                ))}
                            </RadioGroup>
                        </div>

                        <div className="mt-4 rounded bg-background-2 p-4 space-y-2">
                            <h2 className="text-lg font-semibold">Divisi</h2>
                            <RadioGroup onValueChange={v => setData('division_id', v)}>
                                {divisions?.map(division => (
                                    <div key={division.id} className="flex items-center space-x-2">
                                        <RadioGroupItem
                                            value={division.id.toString()}
                                            id={`division.${division.id.toString()}`}
                                        />
                                        <Label htmlFor={`division.${division.id.toString()}`}>{division.name}</Label>
                                    </div>
                                ))}
                            </RadioGroup>
                        </div>

                        <Button className="mt-4" disabled={loading}>
                            Tambah Workstation
                        </Button>
                    </form>
                </div>
            </AuthenticatedLayout>
        </>
    );
}
