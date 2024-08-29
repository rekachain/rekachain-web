import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import { ROUTES } from '@/support/constants/routes';
import { Input } from '@/Components/ui/input';
import { FormEventHandler } from 'react';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';
import { Button } from '@/Components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/Components/ui/radio-group';
import { Label } from '@/Components/ui/label';
import { DivisionResource, WorkshopResource, WorkstationResource } from '@/support/interfaces/resources';
import { workstationService } from '@/services/workstationService';

export default function ({ workshops, divisions }: { workshops: WorkshopResource[]; divisions: DivisionResource[] }) {
    const { data, setData, post, processing, errors, reset, progress } = useForm({
        name: '',
        location: '',
        workshop_id: '',
        division_id: '',
    });

    const submit: FormEventHandler = async e => {
        e.preventDefault();
        const redirectToIndex = () => location.assign(route(`${ROUTES.WORKSTATIONS}.index`));

        await workstationService.create(data);
        redirectToIndex();
    };

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
                            <InputError message={errors.name} className="mt-2" />
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
                            <InputError message={errors.location} className="mt-2" />
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

                        <Button className="mt-4" disabled={processing}>
                            Tambah Workstation
                        </Button>
                    </form>
                </div>
            </AuthenticatedLayout>
        </>
    );
}
