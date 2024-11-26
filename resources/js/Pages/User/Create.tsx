import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router, useForm } from '@inertiajs/react';
import { ROUTES } from '@/Support/Constants/routes';
import { Input } from '@/Components/UI/input';
import { FormEventHandler, useCallback } from 'react';
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
import { FilePond } from 'react-filepond';
import { useLaravelReactI18n } from 'laravel-react-i18n';
import { ServiceFilterOptions } from '@/Support/Interfaces/Others/ServiceFilterOptions';

export default function (props: { roles: RoleResource[] }) {
    const { t } = useLaravelReactI18n();
    const { data, setData, progress } = useForm<{
        nip: string;
        name: string;
        email: string;
        phone_number: string;
        password: string;
        role_id: number | null;
        workstation_id: number | null;
        step_id: number | null;
        image_path: any[];
    }>({
        nip: '',
        name: '',
        email: '',
        phone_number: '',
        password: '',
        role_id: null,
        workstation_id: null,
        step_id: null,
        image_path: [],
    });

    const { loading } = useLoading();

    const fetchWorkstations = useCallback(async (filters: ServiceFilterOptions) => {
        return await workstationService.getAll(filters).then(response => response.data);
    }, []);

    const fetchSteps = useCallback(async (filters: ServiceFilterOptions) => {
        return await stepService.getAll(filters).then(response => response.data);
    }, []);

    const handleFileChange = (fileItems: any) => {
        setData((prevData: any) => ({
            ...prevData,
            image_path: fileItems.map((fileItem: any) => fileItem.file),
        }));
    };

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
        if (data.image_path.length > 0) formData.append('image_path', data.image_path[0]);
        await userService.create(formData);
        router.visit(route(`${ROUTES.USERS}.index`));
        void useSuccessToast(t('pages.user.create.messages.created'));
    });

    return (
        <>
            <Head title={t('pages.user.create.title')} />
            <AuthenticatedLayout>
                <div className="p-4">
                    <div className="flex gap-5 items-center">
                        <h1 className="text-page-header my-4">{t('pages.user.create.title')}</h1>
                    </div>

                    <form onSubmit={submit} encType="multipart/form-data">
                        <div className="mt-4">
                            <InputLabel value={t('pages.user.create.fields.nip')} htmlFor="nip" />
                            <Input
                                value={data.nip}
                                type="number"
                                required
                                onChange={e => setData('nip', e.target.value)}
                                name="nip"
                                maxLength={18}
                                id="nip"
                                className="mt-1"
                                autoComplete="nip"
                            />
                        </div>
                        <div className="mt-4">
                            <InputLabel value={t('pages.user.create.fields.name')} htmlFor="name" />
                            <Input
                                value={data.name}
                                type="text"
                                required
                                onChange={e => setData('name', e.target.value)}
                                name="name"
                                id="name"
                                className="mt-1"
                                autoComplete="name"
                            />
                        </div>
                        <div className="mt-4">
                            <InputLabel value={t('pages.user.create.fields.email')} htmlFor="email" />
                            <Input
                                value={data.email}
                                type="email"
                                required
                                onChange={e => setData('email', e.target.value)}
                                name="email"
                                id="email"
                                className="mt-1"
                                autoComplete="email"
                            />
                        </div>

                        <div className="mt-4">
                            <InputLabel value={t('pages.user.create.fields.phone_number')} htmlFor="phone_number" />
                            <Input
                                value={data.phone_number}
                                type="text"
                                required
                                onChange={e => setData('phone_number', e.target.value)}
                                name="phone_number"
                                id="phone_number"
                                className="mt-1"
                                autoComplete="phone_number"
                            />
                        </div>

                        <div className="mt-4">
                            <InputLabel value={t('pages.user.create.fields.workstation')} htmlFor="workstation_id" />
                            <GenericDataSelector
                                setSelectedData={id => setData('workstation_id', id)}
                                selectedDataId={data.workstation_id ?? undefined}
                                renderItem={(item: WorkstationResource) => `${item.name} - ${item.location}`} // Customize how to display the item
                                placeholder={t('pages.user.create.fields.workstation_placeholder')}
                                nullable
                                id="workstation_id"
                                fetchData={fetchWorkstations}
                                buttonClassName="mt-1"
                            />
                        </div>

                        <div className="mt-4">
                            <InputLabel value={t('pages.user.create.fields.step')} htmlFor="step_id" />
                            <GenericDataSelector
                                setSelectedData={id => setData('step_id', id)}
                                selectedDataId={data.step_id}
                                renderItem={item => item.name}
                                placeholder={t('pages.user.create.fields.step_placeholder')}
                                id="step_id"
                                fetchData={fetchSteps}
                                buttonClassName="mt-1"
                            />
                        </div>

                        <div className="mt-4">
                            <InputLabel value={t('pages.user.create.fields.password')} htmlFor="password" />
                            <Input
                                value={data.password}
                                type="password"
                                required
                                onChange={e => setData('password', e.target.value)}
                                name="password"
                                id="password"
                                className="mt-1"
                                autoComplete="password"
                            />
                        </div>
                        <div className="mt-4 rounded bg-background-2 p-4 space-y-2">
                            <InputLabel value={t('pages.user.create.fields.avatar')} htmlFor="avatar" />
                            <FilePond
                                onupdatefiles={handleFileChange}
                                labelIdle={t('pages.user.create.fields.avatar_filepond_placeholder')}
                                imagePreviewMaxHeight={400}
                                files={data.image_path}
                                filePosterMaxHeight={400}
                                allowReplace
                                allowMultiple={false}
                            />
                            {progress && (
                                <progress value={progress.percentage} max="100">
                                    {progress.percentage}%
                                </progress>
                            )}
                        </div>

                        <div className="mt-4 rounded bg-background-2 p-4 space-y-2">
                            <h2 className="text-lg font-semibold">{t('pages.user.create.fields.role')}</h2>
                            <RadioGroup onValueChange={v => setData('role_id', +v)}>
                                {props.roles?.map(role => (
                                    <div key={role.id} className="flex items-center space-x-2">
                                        <RadioGroupItem value={role.id.toString()} id={`role.${role.id.toString()}`} />
                                        <Label htmlFor={`role.${role.id.toString()}`}>{role.name}</Label>
                                    </div>
                                ))}
                            </RadioGroup>
                        </div>

                        <Button disabled={loading} className="mt-4">
                            {t('pages.user.create.buttons.submit')}
                        </Button>
                    </form>
                </div>
            </AuthenticatedLayout>
        </>
    );
}
