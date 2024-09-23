import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router, useForm } from '@inertiajs/react';
import { ROUTES } from '@/support/constants/routes';
import { Input } from '@/Components/ui/input';
import { FormEventHandler } from 'react';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';
import { Button } from '@/Components/ui/button';
import { DivisionResource, WorkshopResource, WorkstationResource } from '@/support/interfaces/resources';
import { RadioGroup, RadioGroupItem } from '@/Components/ui/radio-group';
import { Label } from '@/Components/ui/label';
import { workstationService } from '@/services/workstationService';
import { useLoading } from '@/Contexts/LoadingContext';
import { useSuccessToast } from '@/hooks/useToast';

export default function ({
    workstation,
    workshops,
    divisions,
}: {
    workstation: WorkstationResource;
    workshops: WorkshopResource[];
    divisions: DivisionResource[];
}) {
    const { data, setData, post, processing, errors, reset, progress } = useForm({
        name: workstation.name,
        location: workstation.location,
        workshop_id: workstation.workshop_id.toString(),
        division_id: workstation.division_id.toString(),
    });
    const { setLoading } = useLoading();

    const submit: FormEventHandler = async e => {
        e.preventDefault();
        const redirectToIndex = () => router.visit(route(`${ROUTES.WORKSTATIONS}.index`));

        setLoading(true);
        await workstationService.update(workstation.id, data);
        setLoading(false);
        useSuccessToast('Workstation berhasil diubah');
        redirectToIndex();
    };

    return (
        <>
            <Head title="Ubah Workstation" />
            <AuthenticatedLayout>
                <div className="p-4">
                    <div className="flex gap-5 items-center">
                        <h1 className="text-page-header my-4">Ubah Workstation: {workstation.name}</h1>
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
                            <InputError message={errors.name} className="mt-2" />
                        </div>

                        <div className="mt-4">
                            <InputLabel htmlFor="location" value="Lokasi" />
                            <Input
                                id="location"
                                type="text"
                                name="location"
                                value={data.location}
                                className="mt-1"
                                autoComplete="location"
                                onChange={e => setData('location', e.target.value)}
                            />
                            <InputError message={errors.name} className="mt-2" />
                        </div>

                        <div className="mt-4 rounded bg-background-2 p-4 space-y-2">
                            <h2 className="text-lg font-semibold">Workshop</h2>
                            <RadioGroup
                                defaultValue={workstation.workshop_id.toString()}
                                onValueChange={v => setData('workshop_id', v)}
                            >
                                {workshops?.map(role => (
                                    <div key={role.id} className="flex items-center space-x-2">
                                        <RadioGroupItem value={role.id.toString()} id={`role.${role.id.toString()}`} />
                                        <Label htmlFor={`role.${role.id.toString()}`}>{role.name}</Label>
                                    </div>
                                ))}
                            </RadioGroup>
                        </div>

                        <div className="mt-4 rounded bg-background-2 p-4 space-y-2">
                            <h2 className="text-lg font-semibold">Divisi</h2>
                            <RadioGroup
                                defaultValue={workstation.division_id.toString()}
                                onValueChange={v => setData('division_id', v)}
                            >
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

                        <Button className="mt-4" disabled={processing}>
                            Ubah Workstation
                        </Button>
                    </form>
                </div>
            </AuthenticatedLayout>
        </>
    );
}
