import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router, useForm } from '@inertiajs/react';
import { ROUTES } from '@/Support/Constants/routes';
import { Input } from '@/Components/UI/input';
import { FormEventHandler, useState } from 'react';
import InputLabel from '@/Components/InputLabel';
import { Button } from '@/Components/UI/button';
import {
    DivisionResource,
    PermissionResource,
    PermissionResourceGrouped,
    RoleResource,
} from '@/Support/Interfaces/Resources';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/Components/UI/select';
import { Checkbox } from '@/Components/UI/checkbox';
import { roleService } from '@/Services/roleService';
import { useSuccessToast } from '@/Hooks/useToast';
import { useLoading } from '@/Contexts/LoadingContext';
import { withLoading } from '@/Utils/withLoading';

export default function (props: {
    role: RoleResource;
    permissions: PermissionResourceGrouped[];
    divisions: DivisionResource[];
}) {
    const { data, setData } = useForm({
        name: props.role.name,
        division_id: props.role.division_id?.toString(),
        level: props.role.level,
        permissions: props.role.permissions as unknown as number[],
    });

    const { loading } = useLoading();

    const [permissions] = useState<PermissionResourceGrouped[]>(props.permissions);

    const submit: FormEventHandler = withLoading(async (e) => {
        e.preventDefault();

        await roleService.update(props.role.id, data);
        void useSuccessToast('Role updated successfully');
        router.visit(route(`${ROUTES.ROLES}.index`));
    });

    const handlePermissionChange = (checked: string | boolean, permission: PermissionResource) => {
        if (checked) {
            setData('permissions', [...data.permissions, permission.id]);
        } else {
            setData(
                'permissions',
                data.permissions.filter((id) => id !== permission.id),
            );
        }
    };

    return (
        <>
            <Head title='Tambah Role' />
            <AuthenticatedLayout>
                <div className='p-4'>
                    <div className='flex items-center gap-5'>
                        <h1 className='text-page-header my-4'>Ubah Role: {props.role.name}</h1>
                    </div>

                    <form onSubmit={submit} encType='multipart/form-data'>
                        <div className='mt-4'>
                            <InputLabel value='Nama' htmlFor='name' />
                            <Input
                                value={data.name}
                                type='text'
                                placeholder={props.role.name}
                                onChange={(e) => setData('name', e.target.value)}
                                name='name'
                                id='name'
                                className='mt-1'
                                autoComplete='name'
                            />
                        </div>

                        <div className='mt-4'>
                            <InputLabel value='Divisi' htmlFor='division' />
                            <Select
                                value={data.division_id}
                                onValueChange={(v) => setData('division_id', v !== 'none' ? v : '')}
                                name='division'
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder='Pilih divisi' />
                                </SelectTrigger>
                                <SelectContent>
                                    {/*none*/}
                                    <SelectItem value='none'>none</SelectItem>
                                    {props.divisions.map((division) => (
                                        <SelectItem
                                            value={division.id.toString()}
                                            key={division.id}
                                            defaultChecked={division.id == props.role.division_id}
                                        >
                                            {division.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className='mt-4'>
                            <InputLabel value='Level' htmlFor='level' />
                            <Input
                                value={data.level}
                                type='text'
                                required
                                onChange={(e) => setData('level', e.target.value)}
                                name='level'
                                id='level'
                                className='mt-1'
                                autoComplete='level'
                            />
                        </div>

                        <div className='mt-4 rounded bg-background-2 p-5'>
                            <h1>Permissions</h1>
                            <div className='mt-1'>
                                <div className='flex flex-wrap'>
                                    {permissions.map((permission) => (
                                        <div key={permission.group} className='mt-2 w-full'>
                                            <h2 className='font-semibold'>{permission.group}</h2>
                                            <div className='mt-2 grid grid-cols-4 gap-4'>
                                                {permission.permissions.map((p) => (
                                                    <div key={p.id} className='flex items-center'>
                                                        <Checkbox
                                                            onCheckedChange={(checked) =>
                                                                handlePermissionChange(checked, p)
                                                            }
                                                            name='permissions'
                                                            id={`permission-${p.id}`}
                                                            checked={data.permissions.includes(
                                                                p.id,
                                                            )}
                                                        />
                                                        <label
                                                            htmlFor={`permission-${p.id}`}
                                                            className='ml-2'
                                                        >
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

                        <Button disabled={loading} className='mt-4'>
                            Ubah Role
                        </Button>
                    </form>
                </div>
            </AuthenticatedLayout>
        </>
    );
}
