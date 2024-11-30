import GenericDataSelector from '@/Components/GenericDataSelector';
import InputLabel from '@/Components/InputLabel';
import { Button } from '@/Components/UI/button';
import { Input } from '@/Components/UI/input';
import { Label } from '@/Components/UI/label';
import { RadioGroup, RadioGroupItem } from '@/Components/UI/radio-group';
import { useLoading } from '@/Contexts/LoadingContext';
import { useSuccessToast } from '@/Hooks/useToast';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { parseFormData } from '@/Lib/Utils';
import { stepService } from '@/Services/stepService';
import { userService } from '@/Services/userService';
import { workstationService } from '@/Services/workstationService';
import { ROUTES } from '@/Support/Constants/routes';
import { ServiceFilterOptions } from '@/Support/Interfaces/Others/ServiceFilterOptions';
import { RoleResource, UserResource } from '@/Support/Interfaces/Resources';
import { withLoading } from '@/Utils/withLoading';
import { Head, router, useForm } from '@inertiajs/react';
import { useLaravelReactI18n } from 'laravel-react-i18n';
import { FormEventHandler, useCallback, useEffect } from 'react';
import { FilePond } from 'react-filepond';

export default function EditUser(props: { user: UserResource; roles: RoleResource[] }) {
    const { t } = useLaravelReactI18n();
    const { user } = props;

    const { data, setData } = useForm({
        nip: user.nip as string | null,
        name: user.name,
        email: user.email as string | null,
        phone_number: user.phone_number,
        role_id: user.role_id as number | null,
        workstation_id: user.workstation_id as number | null,
        step_id: user.step_id as number | null,
        image_path: [] as any[],
        password: '',
    });

    useEffect(() => {
        if (user.image)
            setData('image_path', [
                {
                    source: user.image,
                    options: {
                        type: 'local',
                        file: {
                            name: 'User Avatar',
                            size: null,
                            type: 'image/jpeg',
                        },
                        metadata: {
                            poster: user.image,
                        },
                    },
                },
            ]);
    }, [user.image]);

    const { loading } = useLoading();

    const fetchWorkstations = useCallback(async (filters: ServiceFilterOptions) => {
        return await workstationService.getAll(filters).then((response) => response.data);
    }, []);

    const fetchSteps = useCallback(async (filters: ServiceFilterOptions) => {
        return await stepService.getAll(filters).then((response) => response.data);
    }, []);

    const handleFileChange = (fileItems: any) => {
        setData((prevData: any) => ({
            ...prevData,
            image_path: fileItems.map((fileItem: any) => fileItem.file),
        }));
    };

    const submit: FormEventHandler = withLoading(async (e) => {
        e.preventDefault();
        const validImageTypes = ['image/jpeg', 'image/png', 'image/gif'];
        const validImages = data.image_path.filter(
            (file) => file.size !== null && validImageTypes.includes(file.type),
        );

        const formData = new FormData();
        data.nip && formData.append('nip', data.nip);
        data.name && formData.append('name', data.name);
        data.email && formData.append('email', data.email);
        data.phone_number && formData.append('phone_number', data.phone_number);
        data.password && formData.append('password', data.password);
        data.role_id && formData.append('role_id', data.role_id.toString());
        formData.append('workstation_id', data.workstation_id?.toString() ?? '');
        formData.append('step_id', data.step_id?.toString() ?? '');
        validImages.length > 0 && formData.append('image_path', validImages[0]);
        console.log(parseFormData(formData));
        await userService.update(user.id, formData);
        router.visit(route(`${ROUTES.USERS}.index`));
        void useSuccessToast(t('pages.user.edit.messages.updated'));
    });

    return (
        <>
            <Head
                title={t('pages.user.edit.title', {
                    name: user.name,
                })}
            />
            <AuthenticatedLayout>
                <div className='p-4'>
                    <div className='flex items-center gap-5'>
                        <h1 className='text-page-header my-4'>
                            {t('pages.user.edit.title', {
                                name: user.name,
                            })}
                        </h1>
                    </div>

                    <form onSubmit={submit} encType='multipart/form-data'>
                        <div className='mt-4'>
                            <InputLabel value={t('pages.user.edit.fields.nip')} htmlFor='nip' />
                            <Input
                                value={data.nip ?? ''}
                                type='number'
                                onChange={(e) => setData('nip', e.target.value)}
                                name='nip'
                                maxLength={18}
                                id='nip'
                                className='mt-1'
                                autoComplete='nip'
                            />
                        </div>
                        <div className='mt-4'>
                            <InputLabel value={t('pages.user.edit.fields.name')} htmlFor='name' />
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
                            <InputLabel value={t('pages.user.edit.fields.email')} htmlFor='email' />
                            <Input
                                value={data.email ?? ''}
                                type='email'
                                onChange={(e) => setData('email', e.target.value)}
                                name='email'
                                id='email'
                                className='mt-1'
                                autoComplete='email'
                            />
                        </div>

                        <div className='mt-4'>
                            <InputLabel
                                value={t('pages.user.edit.fields.phone_number')}
                                htmlFor='phone_number'
                            />
                            <Input
                                value={data.phone_number}
                                type='text'
                                required
                                onChange={(e) => setData('phone_number', e.target.value)}
                                name='phone_number'
                                id='phone_number'
                                className='mt-1'
                                autoComplete='phone_number'
                            />
                        </div>

                        <div className='mt-4'>
                            <InputLabel
                                value={t('pages.user.edit.fields.workstation')}
                                htmlFor='workstation_id'
                            />
                            <GenericDataSelector
                                setSelectedData={(id) => setData('workstation_id', id)}
                                selectedDataId={data.workstation_id}
                                renderItem={(item) => `${item.name} - ${item.location}`}
                                placeholder='Select Workstation'
                                nullable
                                initialSearch={user.workstation?.name}
                                id='workstation_id'
                                fetchData={fetchWorkstations}
                                buttonClassName='mt-1'
                            />
                        </div>

                        <div className='mt-4'>
                            <InputLabel
                                value={t('pages.user.edit.fields.step')}
                                htmlFor='step_id'
                            />
                            <GenericDataSelector
                                setSelectedData={(id) => setData('step_id', id)}
                                selectedDataId={data.step_id}
                                renderItem={(item) => item.name}
                                placeholder='Select Step'
                                nullable
                                initialSearch={user.step?.name}
                                id='step_id'
                                fetchData={fetchSteps}
                                buttonClassName='mt-1'
                            />
                        </div>

                        <div className='mt-4'>
                            <InputLabel
                                value={t('pages.user.edit.fields.password')}
                                htmlFor='password'
                            />
                            <Input
                                value={data.password}
                                type='password'
                                placeholder='Leave empty to keep current password'
                                onChange={(e) => setData('password', e.target.value)}
                                name='password'
                                id='password'
                                className='mt-1'
                                autoComplete='password'
                            />
                        </div>

                        <div className='mt-4'>
                            <InputLabel
                                value={t('pages.user.edit.fields.avatar')}
                                htmlFor='avatar'
                            />
                            <FilePond
                                onupdatefiles={handleFileChange}
                                labelIdle={t('pages.user.edit.fields.avatar_filepond_placeholder')}
                                imagePreviewMaxHeight={400}
                                files={data.image_path}
                                filePosterMaxHeight={400}
                                allowReplace
                                allowMultiple={false}
                            />
                        </div>

                        <div className='mt-4 space-y-2 rounded bg-background-2 p-4'>
                            <h2 className='text-lg font-semibold'>
                                {t('pages.user.edit.fields.role')}
                            </h2>
                            <RadioGroup
                                value={data.role_id?.toString()}
                                onValueChange={(v) => setData('role_id', +v)}
                            >
                                {props.roles?.map((role) => (
                                    <div key={role.id} className='flex items-center space-x-2'>
                                        <RadioGroupItem
                                            value={role.id.toString()}
                                            id={`role.${role.id.toString()}`}
                                        />
                                        <Label htmlFor={`role.${role.id.toString()}`}>
                                            {role.name}
                                        </Label>
                                    </div>
                                ))}
                            </RadioGroup>
                        </div>

                        <Button disabled={loading} className='mt-4'>
                            {t('pages.user.edit.buttons.submit')}
                        </Button>
                    </form>
                </div>
            </AuthenticatedLayout>
        </>
    );
}
