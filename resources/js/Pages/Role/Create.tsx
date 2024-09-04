import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router, useForm } from '@inertiajs/react';
import { ROUTES } from '@/support/constants/routes';
import { Input } from '@/Components/ui/input';
import { FormEventHandler, useState } from 'react';
import InputLabel from '@/Components/InputLabel';
import { Button } from '@/Components/ui/button';
import { roleService } from '@/services/roleService';
import { PermissionResource, PermissionResourceGrouped } from '@/support/interfaces/resources/PermissionResource';
import { Checkbox } from '@/Components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/Components/ui/select';
import { DivisionResource } from '@/support/interfaces/resources';
import { useLoading } from '@/contexts/LoadingContext';
import { useSuccessToast } from '@/hooks/useToast';

export default function (props: { permissions: PermissionResourceGrouped[]; divisions: DivisionResource[] }) {
    const { data, setData, post, processing, errors, reset, progress } = useForm({
        name: '',
        division_id: '',
        level: '',
        permissions: [] as number[],
    });
    const { setLoading } = useLoading();

    const [permissions] = useState<PermissionResourceGrouped[]>(props.permissions);
    const [divisions] = useState<DivisionResource[]>(props.divisions);
    const [selectedPermissions, setSelectedPermissions] = useState<number[]>([]);
    const submit: FormEventHandler = async e => {
        e.preventDefault();
        setLoading(true);
        const redirectToIndex = () => router.visit(route(`${ROUTES.ROLES}.index`));

        await roleService.create({
            name: data.name,
            division_id: data.division_id,
            level: data.level,
            permissions: data.permissions,
        });
        setLoading(false);
        useSuccessToast('Role berhasil ditambahkan');
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
                        <h1 className="text-page-header my-4">Tambah Role</h1>
                    </div>

                    <form onSubmit={submit}>
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
                                    {divisions.map(division => (
                                        <SelectItem key={division.id} value={division.id.toString()}>
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
                            Tambah Role
                        </Button>
                    </form>
                </div>
            </AuthenticatedLayout>
        </>
    );
}
