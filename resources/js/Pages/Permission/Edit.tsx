import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router, useForm } from '@inertiajs/react';
import { ROUTES } from '@/Support/constants/routes';
import { Input } from '@/Components/ui/input';
import { FormEventHandler, useState } from 'react';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';
import { Button } from '@/Components/ui/button';
import {
    DivisionResource,
    PermissionResource,
    PermissionResourceGrouped,
    RoleResource,
} from '@/Support/interfaces/resources';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/Components/ui/select';
import { Checkbox } from '@/Components/ui/checkbox';
import { roleService } from '@/Services/roleService';
import { useSuccessToast } from '@/Hooks/useToast';
import { useLoading } from '@/Contexts/LoadingContext';

export default function (props: {
    role: RoleResource;
    permissions: PermissionResourceGrouped[];
    divisions: DivisionResource[];
}) {
    const { data, setData, post, processing, errors, reset, progress } = useForm({
        name: props.role.name,
        division_id: props.role.division_id?.toString(),
        level: props.role.level,
        permissions: props.role.permissions as unknown as number[],
    });

    const [permissions] = useState<PermissionResourceGrouped[]>(props.permissions);
    const { setLoading } = useLoading();

    const submit: FormEventHandler = async e => {
        e.preventDefault();

        setLoading(true);
        const redirectToIndex = () => router.visit(route(`${ROUTES.ROLES}.index`));
        await roleService.update(props.role.id, data);
        useSuccessToast('Role updated successfully');
        setLoading(false);
        redirectToIndex();
    };

    const handlePermissionChange = (checked: string | boolean, permission: PermissionResource) => {
        if (checked) {
            setData('permissions', [...data.permissions, permission.id]);
        } else {
            setData(
                'permissions',
                data.permissions.filter(id => id !== permission.id),
            );
        }
    };

    return (
        <>
            <Head title="Tambah Role" />
            <AuthenticatedLayout>
                <div className="p-4">
                    <div className="flex gap-5 items-center">
                        <h1 className="text-page-header my-4">Ubah Role: {props.role.name}</h1>
                    </div>

                    <form onSubmit={submit} encType="multipart/form-data">
                        <div className="mt-4">
                            <InputLabel htmlFor="name" value="Nama" />
                            <Input
                                id="name"
                                type="text"
                                name="name"
                                value={data.name}
                                className="mt-1"
                                autoComplete="name"
                                placeholder={props.role.name}
                                onChange={e => setData('name', e.target.value)}
                            />
                            <InputError message={errors.name} className="mt-2" />
                        </div>

                        <div className="mt-4">
                            <InputLabel htmlFor="division" value="Divisi" />
                            <Select
                                name="division"
                                value={data.division_id}
                                onValueChange={v => setData('division_id', v !== 'none' ? v : '')}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Pilih divisi" />
                                </SelectTrigger>
                                <SelectContent>
                                    {/*none*/}
                                    <SelectItem value="none">none</SelectItem>
                                    {props.divisions.map(division => (
                                        <SelectItem
                                            defaultChecked={division.id == props.role.division_id}
                                            key={division.id}
                                            value={division.id.toString()}
                                        >
                                            {division.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="mt-4">
                            <InputLabel htmlFor="level" value="Level" />
                            <Input
                                id="level"
                                type="text"
                                name="level"
                                value={data.level}
                                className="mt-1"
                                autoComplete="level"
                                onChange={e => setData('level', e.target.value)}
                                required
                            />
                        </div>

                        <div className="mt-4 rounded bg-background-2 p-5">
                            <h1>Permissions</h1>
                            <div className="mt-1">
                                <div className="flex flex-wrap">
                                    {permissions.map(permission => (
                                        <div key={permission.group} className="w-full mt-2">
                                            <h2 className="font-semibold">{permission.group}</h2>
                                            <div className="grid grid-cols-4 gap-4 mt-2">
                                                {permission.permissions.map(p => (
                                                    <div key={p.id} className="flex items-center">
                                                        <Checkbox
                                                            id={`permission-${p.id}`}
                                                            checked={data.permissions.includes(p.id)}
                                                            onCheckedChange={checked =>
                                                                handlePermissionChange(checked, p)
                                                            }
                                                            name="permissions"
                                                        />
                                                        <label htmlFor={`permission-${p.id}`} className="ml-2">
                                                            {p.name}
                                                        </label>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <Button className="mt-4" disabled={processing}>
                            Ubah Role
                        </Button>
                    </form>
                </div>
            </AuthenticatedLayout>
        </>
    );
}
