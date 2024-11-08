import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router, useForm } from '@inertiajs/react';
import { ROUTES } from '@/Support/Constants/routes';
import { Input } from '@/Components/UI/input';
import { FormEventHandler, useCallback, useState } from 'react';
import InputLabel from '@/Components/InputLabel';
import { Button } from '@/Components/UI/button';
import { roleService } from '@/Services/roleService';
import { PermissionResource, PermissionResourceGrouped } from '@/Support/Interfaces/Resources/PermissionResource';
import { Checkbox } from '@/Components/UI/checkbox';
import { DivisionResource } from '@/Support/Interfaces/Resources';
import { useLoading } from '@/Contexts/LoadingContext';
import { useSuccessToast } from '@/Hooks/useToast';
import { withLoading } from '@/Utils/withLoading';
import { useLaravelReactI18n } from 'laravel-react-i18n';
import GenericDataSelector from '@/Components/GenericDataSelector';
import { divisionService } from '@/Services/divisionService';
import { ServiceFilterOptions } from '@/Support/Interfaces/Others/ServiceFilterOptions';

export default function (props: { permissions: PermissionResourceGrouped[]; divisions: DivisionResource[] }) {
    const { t } = useLaravelReactI18n();
    const { data, setData } = useForm({
        name: '',
        division_id: null as number | null,
        level: '',
        permissions: [] as number[],
    });
    const { loading } = useLoading();

    const [permissions] = useState<PermissionResourceGrouped[]>(props.permissions);
    const [divisions] = useState<DivisionResource[]>(props.divisions);
    const [selectedPermissions, setSelectedPermissions] = useState<number[]>([]);

    const submit: FormEventHandler = withLoading(async e => {
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
                data.permissions.filter(id => id !== permission.id),
            );
        }
    };

    const fetchDivisions = useCallback(async (filters: ServiceFilterOptions) => {
        return await divisionService.getAll(filters).then(response => response.data);
    }, []);

    return (
        <>
            <Head title={t('pages.role.create.title')} />
            <AuthenticatedLayout>
                <div className="p-4">
                    <div className="flex gap-5 items-center">
                        <h1 className="text-page-header my-4">{t('pages.role.create.title')}</h1>
                    </div>

                    <form onSubmit={submit}>
                        <div className="mt-4">
                            <InputLabel htmlFor="name" value={t('pages.role.create.fields.name')} />
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
                            <InputLabel htmlFor="division" value={t('pages.role.create.fields.division')} />
                            <GenericDataSelector
                                id="division_id"
                                fetchData={fetchDivisions}
                                setSelectedData={id => setData('division_id', id)}
                                selectedDataId={data.division_id ?? undefined}
                                placeholder={t('pages.role.create.fields.division_placeholder')}
                                renderItem={(item: DivisionResource) => item.name}
                                buttonClassName="mt-1"
                                nullable
                            />
                        </div>

                        <div className="mt-4">
                            <InputLabel htmlFor="level" value={t('pages.role.create.fields.level')} />
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
                            <h1>{t('pages.role.create.fields.permissions')}</h1>
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
                        <Button className="mt-4" disabled={loading}>
                            {t('pages.role.create.buttons.submit')}
                        </Button>
                    </form>
                </div>
            </AuthenticatedLayout>
        </>
    );
}
