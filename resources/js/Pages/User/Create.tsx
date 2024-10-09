import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router, useForm } from '@inertiajs/react';
import { ROUTES } from '@/Support/Constants/routes';
import { Input } from '@/Components/UI/input';
import { FormEventHandler, useCallback, useState } from 'react';
import InputLabel from '@/Components/InputLabel';
import { userService } from '@/Services/userService';
import { Button } from '@/Components/UI/button';
import { RadioGroup, RadioGroupItem } from '@/Components/UI/radio-group';
import { Label } from '@/Components/UI/label';
import { RoleResource, WorkstationResource } from '@/Support/Interfaces/Resources';
import { useLoading } from '@/Contexts/LoadingContext';
import { useSuccessToast } from '@/Hooks/useToast';
import { withLoading } from '@/Utils/withLoading';
import { workstationService } from '@/Services/workstationService';
import { stepService } from '@/Services/stepService';
import GenericDataSelector from '@/Components/GenericDataSelector';

export default function (props: { roles: RoleResource[] }) {
    const { data, setData, progress } = useForm<{
        nip: string;
        name: string;
        email: string;
        phone_number: string;
        password: string;
        role_id: number | undefined;
        workstation_id: number | undefined;
        step_id: number | undefined;
    }>({
        nip: '',
        name: '',
        email: '',
        phone_number: '',
        password: '',
        role_id: undefined,
        workstation_id: undefined,
        step_id: undefined,
    });

    const [photo, setPhoto] = useState<Blob | null>(null);
    const { loading } = useLoading();

    const fetchWorkstations = useCallback(async (filters: { search: string }) => {
        return await workstationService.getAll(filters).then(response => response.data);
    }, []);

    const fetchSteps = useCallback(async (filters: { search: string }) => {
        return await stepService.getAll(filters).then(response => response.data);
    }, []);

    const submit: FormEventHandler = withLoading(async e => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('nip', data.nip);
        formData.append('name', data.name);
        formData.append('email', data.email);
        formData.append('phone_number', data.phone_number);
        formData.append('password', data.password);
        formData.append('role_id', data.role_id?.toString() ?? '');
        formData.append('workstation_id', data.workstation_id?.toString() ?? '');
        formData.append('step_id', data.step_id?.toString() ?? '');
        if (photo) formData.append('image_path', photo);
        await userService.create(formData);
        router.visit(route(`${ROUTES.USERS}.index`));
        void useSuccessToast('User created successfully');
    });

    return (
        <>
            <Head title="Tambah Staff" />
            <AuthenticatedLayout>
                <div className="p-4">
                    <div className="flex gap-5 items-center">
                        <h1 className="text-page-header my-4">Tambah Staff</h1>
                    </div>

                    <form onSubmit={submit} encType="multipart/form-data">
                        <div className="mt-4">
                            <InputLabel htmlFor="nip" value="NIP" />
                            <Input
                                id="nip"
                                type="number"
                                name="nip"
                                value={data.nip}
                                className="mt-1"
                                autoComplete="nip"
                                maxLength={18}
                                onChange={e => setData('nip', e.target.value)}
                                required
                            />
                        </div>
                        <div className="mt-4">
                            <InputLabel htmlFor="name" value="Nama" />
                            <Input
                                id="name"
                                type="text"
                                name="name"
                                value={data.name}
                                className="mt-1"
                                autoComplete="name"
                                onChange={e => setData('name', e.target.value)}
                                required
                            />
                        </div>
                        <div className="mt-4">
                            <InputLabel htmlFor="email" value="Email" />
                            <Input
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                className="mt-1"
                                autoComplete="email"
                                onChange={e => setData('email', e.target.value)}
                                required
                            />
                        </div>

                        <div className="mt-4">
                            <InputLabel htmlFor="phone_number" value="Nomor Telepon" />
                            <Input
                                id="phone_number"
                                type="text"
                                name="phone_number"
                                value={data.phone_number}
                                className="mt-1"
                                autoComplete="phone_number"
                                onChange={e => setData('phone_number', e.target.value)}
                                required
                            />
                        </div>

                        <div className="mt-4">
                            <InputLabel htmlFor="workstation_id" value="Workstation" />
                            <GenericDataSelector
                                id="workstation_id"
                                fetchData={fetchWorkstations}
                                setSelectedData={id => setData('workstation_id', id)}
                                selectedDataId={data.workstation_id ?? undefined}
                                placeholder="Select Workstation"
                                renderItem={(item: WorkstationResource) => `${item.name} - ${item.location}`} // Customize how to display the item
                                buttonClassName="mt-1"
                            />
                        </div>

                        <div className="mt-4">
                            <InputLabel htmlFor="step_id" value="Step" />
                            <GenericDataSelector
                                id="step_id"
                                fetchData={fetchSteps}
                                setSelectedData={id => setData('step_id', id)}
                                selectedDataId={data.step_id}
                                placeholder="Select Step"
                                renderItem={item => item.name}
                                buttonClassName="mt-1"
                            />
                        </div>

                        <div className="mt-4">
                            <InputLabel htmlFor="password" value="Password" />
                            <Input
                                id="password"
                                type="password"
                                name="password"
                                value={data.password}
                                className="mt-1"
                                autoComplete="password"
                                onChange={e => setData('password', e.target.value)}
                                required
                            />
                        </div>
                        <div className="mt-4">
                            <InputLabel htmlFor="avatar" value="Foto staff" />
                            <Input
                                id="avatar"
                                type="file"
                                accept=".jpg,.jpeg,.png,.gif,.svg"
                                name="avatar"
                                className="mt-1"
                                autoComplete="avatar"
                                onChange={e => e.target.files != null && setPhoto(e.target.files?.[0])}
                            />
                            {progress && (
                                <progress value={progress.percentage} max="100">
                                    {progress.percentage}%
                                </progress>
                            )}
                        </div>

                        <div className="mt-4 rounded bg-background-2 p-4 space-y-2">
                            <h2 className="text-lg font-semibold">Role</h2>
                            <RadioGroup onValueChange={v => setData('role_id', +v)}>
                                {props.roles?.map(role => (
                                    <div key={role.id} className="flex items-center space-x-2">
                                        <RadioGroupItem value={role.id.toString()} id={`role.${role.id.toString()}`} />
                                        <Label htmlFor={`role.${role.id.toString()}`}>{role.name}</Label>
                                    </div>
                                ))}
                            </RadioGroup>
                        </div>

                        <Button className="mt-4" disabled={loading}>
                            Tambah Staff
                        </Button>
                    </form>
                </div>
            </AuthenticatedLayout>
        </>
    );
}
