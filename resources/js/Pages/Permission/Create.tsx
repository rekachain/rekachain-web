import InputLabel from '@/Components/InputLabel';
import { Button } from '@/Components/UI/button';
import { Checkbox } from '@/Components/UI/checkbox';
import { Input } from '@/Components/UI/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/Components/UI/select';
import { useLoading } from '@/Contexts/LoadingContext';
import { useSuccessToast } from '@/Hooks/useToast';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { roleService } from '@/Services/roleService';
import { ROUTES } from '@/Support/Constants/routes';
import { DivisionResource } from '@/Support/Interfaces/Resources';
import {
    PermissionResource,
    PermissionResourceGrouped,
} from '@/Support/Interfaces/Resources/PermissionResource';
import { withLoading } from '@/Utils/withLoading';
import { Head, router, useForm } from '@inertiajs/react';
import { FormEventHandler, useState } from 'react';

export default function (props: {
    permissions: PermissionResourceGrouped[];
    divisions: DivisionResource[];
}) {
    const { data, setData } = useForm({
        name: '',
        division_id: '',
        level: '',
        permissions: [] as number[],
    });

    const [permissions] = useState<PermissionResourceGrouped[]>(props.permissions);
    const [divisions] = useState<DivisionResource[]>(props.divisions);
    const [selectedPermissions, setSelectedPermissions] = useState<number[]>([]);
    const { loading } = useLoading();

    const submit: FormEventHandler = withLoading(async (e) => {
        e.preventDefault();

        await roleService.create({
            name: data.name,
            division_id: data.division_id,
            level: data.level,
            permissions: data.permissions,
        });
        void useSuccessToast('Role created successfully');
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
                        <h1 className='text-page-header my-4'>Tambah Role</h1>
                    </div>

                    <form onSubmit={submit}>
                        <div className='mt-4'>
                            <InputLabel value='Nama' htmlFor='nama' />
                            <Input
                                value={data.name}
                                type='text'
                                required
                                onChange={(e) => setData('name', e.target.value)}
                                name='nama'
                                id='nama'
                                className='mt-1'
                                autoComplete='nama'
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
                                    <SelectItem value='none'>none</SelectItem>
                                    {divisions.map((division) => (
                                        <SelectItem
                                            value={division.id.toString()}
                                            key={division.id}
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
                            Tambah Role
                        </Button>
                    </form>
                </div>
            </AuthenticatedLayout>
        </>
    );
}
