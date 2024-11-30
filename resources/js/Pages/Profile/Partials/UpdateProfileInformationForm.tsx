import InputError from '@/Components/InputError';
import { Button } from '@/Components/UI/button';
import { Input } from '@/Components/UI/input';
import { Label } from '@/Components/UI/label';
import { useSuccessToast } from '@/Hooks/useToast';
import { ROUTES } from '@/Support/Constants/routes';
import { PageProps } from '@/Types';
import { withLoading } from '@/Utils/withLoading';
import { Transition } from '@headlessui/react';
import { Link, router, useForm, usePage } from '@inertiajs/react';
import { useLaravelReactI18n } from 'laravel-react-i18n';
import { FormEventHandler, useEffect } from 'react';
import { FilePond } from 'react-filepond';

export default function UpdateProfileInformation({
    mustVerifyEmail,
    status,
    className = '',
}: {
    mustVerifyEmail: boolean;
    status?: string;
    className?: string;
}) {
    const { t } = useLaravelReactI18n();
    const user = usePage<PageProps>().props.auth.user;

    const { data, setData, errors, processing, recentlySuccessful } = useForm({
        name: user.name,
        email: user.email,
        image_path: [] as any[],
    });

    useEffect(() => {
        if (user.image) {
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
        }
    }, [user.image]);

    const submit: FormEventHandler = withLoading(async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('_method', 'PATCH');
        formData.append('name', data.name);
        formData.append('email', data.email);

        if (data.image_path.length > 0) {
            formData.append('image_path', data.image_path[0]);
        }

        await window.axios.post(route(`${ROUTES.PROFILE}.update`), formData);

        router.reload();

        void useSuccessToast(
            t('pages.profile.partials.update_profile_information_form.messages.updated'),
        );
    });

    const handleFileChange = (fileItems: any) => {
        setData(
            'image_path',
            fileItems.map((fileItem: any) => fileItem.file),
        );
    };

    return (
        <section className={className}>
            <header>
                <h2 className='text-lg font-medium'>
                    {t('pages.profile.partials.update_profile_information_form.title')}
                </h2>

                <p className='mt-1 text-sm text-gray-600 dark:text-gray-400'>
                    {t('pages.profile.partials.update_profile_information_form.description')}
                </p>
            </header>

            <form onSubmit={submit} className='mt-6 space-y-4'>
                <div>
                    <Label htmlFor='name'>
                        {t('pages.profile.partials.update_profile_information_form.fields.name')}
                    </Label>

                    <Input
                        value={data.name}
                        required
                        onChange={(e) => setData('name', e.target.value)}
                        id='name'
                        autoFocus
                        autoComplete='name'
                    />

                    <InputError message={errors.name} className='mt-2' />
                </div>

                <div>
                    <Label htmlFor='email'>
                        {t('pages.profile.partials.update_profile_information_form.fields.email')}
                    </Label>

                    <Input
                        value={data.email}
                        type='email'
                        required
                        onChange={(e) => setData('email', e.target.value)}
                        id='email'
                        autoComplete='username'
                    />

                    <InputError message={errors.email} className='mt-2' />
                </div>

                <div>
                    <Label htmlFor='image_path'>
                        {t('pages.profile.partials.update_profile_information_form.fields.avatar')}
                    </Label>
                    <FilePond
                        onupdatefiles={handleFileChange}
                        labelIdle={t(
                            'pages.profile.partials.update_profile_information_form.fields.avatar_filepond_placeholder',
                        )}
                        imagePreviewMaxHeight={400}
                        files={data.image_path}
                        filePosterMaxHeight={400}
                        allowReplace
                        allowMultiple={false}
                    />
                    {errors.image_path && `${errors.image_path}`}
                </div>

                {mustVerifyEmail && user.email_verified_at === null && (
                    <div>
                        <p className='mt-2 text-sm text-gray-800 dark:text-gray-200'>
                            {t(
                                'pages.profile.partials.update_profile_information_form.messages.verify_email',
                            )}
                            <Link
                                method='post'
                                href={route('verification.send')}
                                className='rounded-md text-sm underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:hover:text-gray-100 dark:focus:ring-offset-gray-800'
                                as='button'
                            >
                                {t(
                                    'pages.profile.partials.update_profile_information_form.messages.resend_verification_email',
                                )}
                            </Link>
                        </p>

                        {status === 'verification-link-sent' && (
                            <div className='mt-2 text-sm font-medium text-green-600 dark:text-green-400'>
                                {t(
                                    'pages.profile.partials.update_profile_information_form.messages.verification_email_sent',
                                )}
                            </div>
                        )}
                    </div>
                )}

                <div className='flex items-center gap-4'>
                    <Button disabled={processing}>
                        {t('pages.profile.partials.update_profile_information_form.buttons.submit')}
                    </Button>

                    <Transition
                        show={recentlySuccessful}
                        leaveTo='opacity-0'
                        leave='transition ease-in-out'
                        enterFrom='opacity-0'
                        enter='transition ease-in-out'
                    >
                        <p className='text-sm'>
                            {t(
                                'pages.profile.partials.update_profile_information_form.messages.updated',
                            )}
                        </p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}
