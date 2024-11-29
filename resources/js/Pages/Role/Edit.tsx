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
import {
    DivisionResource,
    PermissionResource,
    PermissionResourceGrouped,
    RoleResource,
} from '@/Support/Interfaces/Resources';
import { withLoading } from '@/Utils/withLoading';
import { Head, router, useForm } from '@inertiajs/react';
import { useLaravelReactI18n } from 'laravel-react-i18n';
import { FormEventHandler, useCallback, useState } from 'react';

export default function (props: {
    role: RoleResource;
    permissions: PermissionResourceGrouped[];
    divisions: DivisionResource[];
}) {
    const { t } = useLaravelReactI18n();
    const { data, setData } = useForm({
        name: props.role.name,
        division_id: props.role.division_id as number | null,
        level: props.role?.level ?? '',
        permissions: props.role.permissions as unknown as number[],
    });
    const { loading } = useLoading();

    const [permissions] = useState<PermissionResourceGrouped[]>(props.permissions);
    const submit: FormEventHandler = withLoading(async (e) => {
        e.preventDefault();
        await roleService.update(props.role.id, data);
        router.visit(route(`${ROUTES.ROLES}.index`));
        void useSuccessToast(t('pages.role.edit.messages.updated'));
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

    const fetchDivisions = useCallback(async (filters: ServiceFilterOptions) => {
        return await divisionService.getAll(filters).then((response) => response.data);
    }, []);

    return (
        <>
            <Head title={t('pages.role.edit.title', { name: props.role.name })} />
            <AuthenticatedLayout>
                <div className='p-4'>
                    <div className='flex items-center gap-5'>
                        <h1 className='text-page-header my-4'>
                            {t('pages.role.edit.title', { name: props.role.name })}
                        </h1>
                    </div>

                    <form onSubmit={submit} encType='multipart/form-data'>
                        <div className='mt-4'>
                            <InputLabel
                                value={t('pages.role.edit.fields.name', { name: props.role.name })}
                                htmlFor='name'
                            />
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
                            <InputLabel
                                value={t('pages.role.edit.fields.division')}
                                htmlFor='division'
                            />
                            <GenericDataSelector
                                setSelectedData={(id) => setData('division_id', id)}
                                selectedDataId={data.division_id ?? undefined}
                                renderItem={(item: DivisionResource) => item.name}
                                placeholder={t('pages.role.edit.fields.division_placeholder')}
                                nullable
                                initialSearch={props.role?.division?.name}
                                id='division_id'
                                fetchData={fetchDivisions}
                                buttonClassName='mt-1'
                            />
                        </div>

                        <div className='mt-4'>
                            <InputLabel
                                value={t('pages.role.edit.fields.level', {
                                    level: props.role?.level ?? '',
                                })}
                                htmlFor='level'
                            />
                            <Input
                                value={data.level}
                                type='text'
                                onChange={(e) => setData('level', e.target.value)}
                                name='level'
                                id='level'
                                className='mt-1'
                                autoComplete='level'
                            />
                        </div>

                        <div className='mt-4 rounded bg-background-2 p-5'>
                            <h1>{t('pages.role.edit.fields.permissions')}</h1>
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
                            {t('pages.role.edit.buttons.submit')}
                        </Button>
                    </form>
                </div>
            </AuthenticatedLayout>
        </>
    );
}
