import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router, useForm } from '@inertiajs/react';
import { ROUTES } from '@/Support/Constants/routes';
import { Input } from '@/Components/UI/input';
import { FormEventHandler, useState } from 'react';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';
import { userService } from '@/Services/userService';
import { Button } from '@/Components/UI/button';
import { RoleResource, UserResource } from '../../Support/Interfaces/Resources';
import { parseFormData } from '@/Lib/utils';
import { RadioGroup, RadioGroupItem } from '@/Components/UI/radio-group';
import { Label } from '@/Components/UI/label';
import { useLoading } from '@/Contexts/LoadingContext';
import { useSuccessToast } from '@/Hooks/useToast';

export default function ({ user, roles }: { user: UserResource; roles: RoleResource[] }) {
    console.log(user, roles);
    const { data, setData, post, processing, errors, reset, progress } = useForm({
        nip: user.nip,
        name: user.name,
        email: user.email,
        phone_number: user.phone_number ?? '',
        password: '',
        role_id: user.role_id.toString(),
    });

    const [photo, setPhoto] = useState<Blob | null>(null);
    const { setLoading } = useLoading();
    const submit: FormEventHandler = async e => {
        e.preventDefault();

        setLoading(true);
        const redirectToIndex = () => router.visit(route(`${ROUTES.USERS}.index`));

        try {
            const formData = new FormData();
            if (data.nip) formData.append('nip', data.nip);
            if (data.name) formData.append('name', data.name);
            if (data.phone_number) formData.append('phone_number', data.phone_number);
            if (data.email) formData.append('email', data.email);
            if (data.password) formData.append('password', data.password);
            if (photo) formData.append('image_path', photo);
            if (data.role_id) formData.append('role_id', data.role_id);
            console.log(parseFormData(formData));
            await userService.update(user.id, formData);
            useSuccessToast('User updated successfully');
            redirectToIndex();
        } catch {
        } finally {
            setLoading(false);
        }
        // post(route(`${ROUTES.USERS}.store`), {
        //     onFinish: redirectToIndex, onError: console.log});
    };

    return (
        <>
            <Head title="Ubah Staff" />
            <AuthenticatedLayout>
                <div className="p-4">
                    <div className="flex gap-5 items-center">
                        <h1 className="text-page-header my-4">Ubah Staff: {user.name}</h1>
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
                                placeholder={user.nip}
                                maxLength={18}
                                onChange={e => setData('nip', e.target.value)}
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
                            />
                            <InputError message={errors.name} className="mt-2" />
                        </div>
                        <div className="mt-4">
                            <InputLabel htmlFor="email" value="Email" />
                            <Input
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                placeholder={user.email}
                                className="mt-1"
                                autoComplete="email"
                                onChange={e => setData('email', e.target.value)}
                            />
                            <InputError message={errors.email} className="mt-2" />
                        </div>
                        <div className="mt-4">
                            <InputLabel htmlFor="phone" value="Phone" />
                            <Input
                                id="phone"
                                type="tel"
                                name="phone"
                                value={data.phone_number}
                                className="mt-1"
                                autoComplete="phone"
                                onChange={e => setData('phone_number', e.target.value)}
                            />
                            <InputError message={errors.phone_number} className="mt-2" />
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
                            />
                            <InputError message={errors.password} className="mt-2" />
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
                            <RadioGroup
                                defaultValue={user.role_id.toString()}
                                onValueChange={v => setData('role_id', v)}
                            >
                                {roles?.map(role => (
                                    <div key={role.id} className="flex items-center space-x-2">
                                        <RadioGroupItem value={role.id.toString()} id={`role.${role.id.toString()}`} />
                                        <Label htmlFor={`role.${role.id.toString()}`}>{role.name}</Label>
                                    </div>
                                ))}
                            </RadioGroup>
                        </div>

                        <Button className="mt-4" disabled={processing}>
                            Ubah Staff
                        </Button>
                    </form>
                </div>
            </AuthenticatedLayout>
        </>
    );
}
