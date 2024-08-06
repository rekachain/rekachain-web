import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import { ROUTES } from '@/support/constants/routes';
import { Input } from '@/Components/ui/input';
import { FormEventHandler, useState } from 'react';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';
import { userService } from '@/services/userService';
import { Button } from '@/Components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/Components/ui/radio-group';
import { Label } from '@/Components/ui/label';
import { RoleResource } from '@/support/interfaces/resources';

export default function (props: { roles: RoleResource[] }) {
    const { data, setData, post, processing, errors, reset, progress } = useForm({
        nip: '',
        name: '',
        email: '',
        password: '',
        role_id: '',
    });

    const [photo, setPhoto] = useState<Blob | null>(null);

    const submit: FormEventHandler = async e => {
        e.preventDefault();
        const redirectToIndex = () => location.assign(route(`${ROUTES.USERS}.index`));

        const formData = new FormData();
        formData.append('nip', data.nip);
        formData.append('name', data.name);
        formData.append('email', data.email);
        formData.append('password', data.password);
        formData.append('role_id', data.role_id);
        if (photo) formData.append('photo', photo);
        await userService.create(formData);
        redirectToIndex();

        // post(route(`${ROUTES.USERS}.store`), {
        //     onFinish: redirectToIndex, onError: console.log});
    };

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
                            <InputError message={errors.nip} className="mt-2" />
                        </div>
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
                            <RadioGroup onValueChange={v => setData('role_id', v)}>
                                {props.roles?.map(role => (
                                    <div key={role.id} className="flex items-center space-x-2">
                                        <RadioGroupItem value={role.id.toString()} id={`role.${role.id.toString()}`} />
                                        <Label htmlFor={`role.${role.id.toString()}`}>{role.name}</Label>
                                    </div>
                                ))}
                            </RadioGroup>
                        </div>

                        <Button className="mt-4" disabled={processing}>
                            Tambah Staff
                        </Button>
                    </form>
                </div>
            </AuthenticatedLayout>
        </>
    );
}
