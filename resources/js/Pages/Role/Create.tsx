import GenericDataSelector from '@/Components/GenericDataSelector';
import InputLabel from '@/Components/InputLabel';
import { Button } from '@/Components/UI/button';
import { Checkbox } from '@/Components/UI/checkbox';
import { Input } from '@/Components/UI/input';
import { useLoading } from '@/Contexts/LoadingContext';
import { useSuccessToast } from '@/Hooks/useToast';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { divisionService } from '@/Services/divisionService';
import { roleService } from '@/Services/roleService';
import { ROUTES } from '@/Support/Constants/routes';
import { ServiceFilterOptions } from '@/Support/Interfaces/Others/ServiceFilterOptions';
import { DivisionResource } from '@/Support/Interfaces/Resources';
import {
    PermissionResource,
    PermissionResourceGrouped,
} from '@/Support/Interfaces/Resources/PermissionResource';
import { withLoading } from '@/Utils/withLoading';
import { Head, router, useForm } from '@inertiajs/react';
import { useLaravelReactI18n } from 'laravel-react-i18n';
import { FormEventHandler, useCallback, useState } from 'react';

export default function (props: {
    permissions: PermissionResourceGrouped[];
    divisions: DivisionResource[];
}) {
    const { t } = useLaravelReactI18n();
    const { loading } = useLoading();

    const { data, setData } = useForm({
        name: '',
        division_id: null as number | null,
        level: '',
        permissions: [] as number[],
    });

    const [permissions, setPermissions] = useState<PermissionResourceGrouped[]>(props.permissions);

    const submit: FormEventHandler = withLoading(async (e) => {
        e.preventDefault();

        await roleService.create({
            name: data.name,
            division_id: data.division_id,
            level: data.level,
            permissions: data.permissions,
        });
        router.visit(route(`${ROUTES.ROLES}.index`));
        void useSuccessToast(t('pages.role.create.messages.created'));
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

    const handlePermissionGroupChange = (
        checked: boolean,
        permissionGroup: PermissionResourceGrouped,
    ) => {
        const updatedPermissions = [...permissions];
        const groupIndex = updatedPermissions.findIndex(
            (group) => group.group === permissionGroup.group,
        );

        if (groupIndex > -1) {
            updatedPermissions[groupIndex].permissions = updatedPermissions[
                groupIndex
            ].permissions.map((permission) => ({
                ...permission,
                checked: checked,
            }));

            setPermissions(updatedPermissions);

            const permissionIds = updatedPermissions[groupIndex].permissions.map((p) => p.id);
            if (checked) {
                setData('permissions', [...new Set([...data.permissions, ...permissionIds])]);
            } else {
                setData(
                    'permissions',
                    data.permissions.filter((id) => !permissionIds.includes(id)),
                );
            }
        }
    };

    const fetchDivisions = useCallback(async (filters: ServiceFilterOptions) => {
        return await divisionService.getAll(filters).then((response) => response.data);
    }, []);

    return (
        <>
            <Head title={t('pages.role.create.title')} />
            <AuthenticatedLayout>
                <div className='p-4'>
                    <div className='flex items-center gap-5'>
                        <h1 className='text-page-header my-4'>{t('pages.role.create.title')}</h1>
                    </div>

                    <form onSubmit={submit}>
                        <div className='mt-4'>
                            <InputLabel value={t('pages.role.create.fields.name')} htmlFor='name' />
                            <Input
                                value={data.name}
                                type='text'
                                required
                                onChange={(e) => setData('name', e.target.value)}
                                name='name'
                                id='name'
                                className='mt-1'
                                autoComplete='name'
                            />
                        </div>

                        <div className='mt-4'>
                            <InputLabel
                                value={t('pages.role.create.fields.division')}
                                htmlFor='division'
                            />
                            <GenericDataSelector
                                setSelectedData={(id) => setData('division_id', id)}
                                selectedDataId={data.division_id ?? undefined}
                                renderItem={(item: DivisionResource) => item.name}
                                placeholder={t('pages.role.create.fields.division_placeholder')}
                                nullable
                                id='division_id'
                                fetchData={fetchDivisions}
                                buttonClassName='mt-1'
                            />
                        </div>

                        <div className='mt-4'>
                            <InputLabel
                                value={t('pages.role.create.fields.level')}
                                htmlFor='level'
                            />
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
                            <h1>{t('pages.role.create.fields.permissions')}</h1>
                            <div className='mt-1'>
                                <div className='flex flex-wrap gap-4'>
                                    {permissions.map((permissionGroup) => (
                                        <div key={permissionGroup.group} className='mt-2 w-full'>
                                            <div className='flex items-center'>
                                                <Checkbox
                                                    onCheckedChange={(checked: boolean) =>
                                                        handlePermissionGroupChange(
                                                            checked,
                                                            permissionGroup,
                                                        )
                                                    }
                                                    name={permissionGroup.group}
                                                    id={`permission-group-${permissionGroup.group}`}
                                                    checked={permissionGroup.permissions.every(
                                                        (p) => data.permissions.includes(p.id),
                                                    )}
                                                />
                                                <label
                                                    htmlFor={`permission-group-${permissionGroup.group}`}
                                                    className='ml-2 font-semibold'
                                                >
                                                    {permissionGroup.group}
                                                </label>
                                            </div>
                                            <div className='mt-2 grid grid-cols-4 gap-4'>
                                                {permissionGroup.permissions.map((p) => (
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
                            {t('pages.role.create.buttons.submit')}
                        </Button>
                    </form>
                </div>
            </AuthenticatedLayout>
        </>
    );
}
