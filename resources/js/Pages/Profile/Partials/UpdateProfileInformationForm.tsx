import InputError from '@/Components/InputError';
import { Link, router, useForm, usePage } from '@inertiajs/react';
import { Transition } from '@headlessui/react';
import { FormEventHandler } from 'react';
import { PageProps } from '../../../Types';
import { Input } from '@/Components/UI/input';
import { Button } from '@/Components/UI/button';
import { Label } from '@/Components/UI/label';
import { FilePond } from 'react-filepond';
import { withLoading } from '@/Utils/withLoading';
import { useSuccessToast } from '@/Hooks/useToast';

export default function UpdateProfileInformation({
    mustVerifyEmail,
    status,
    className = '',
}: {
    mustVerifyEmail: boolean;
    status?: string;
    className?: string;
}) {
    const user = usePage<PageProps>().props.auth.user;

    const { data, setData, patch, errors, processing, recentlySuccessful } = useForm({
        name: user.name,
        email: user.email,
        image_path: [] as any[],
    });

    const submit: FormEventHandler = withLoading(async e => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('_method', 'PATCH'); // Append the method override for Inertia
        formData.append('name', data.name);
        formData.append('email', data.email);

        if (data.image_path.length > 0) {
            formData.append('image_path', data.image_path[0]); // Append the image file
        }

        await window.axios.post(route('profile.update'), formData);

        useSuccessToast('Profile updated successfully.');

        router.reload();
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
                <h2 className="text-lg font-medium ">Profile Information</h2>

                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    Update your account's profile information and email address.
                </p>
            </header>

            <form onSubmit={submit} className="mt-6 space-y-4">
                <div>
                    <Label htmlFor="name">Name</Label>

                    <Input
                        id="name"
                        value={data.name}
                        onChange={e => setData('name', e.target.value)}
                        required
                        autoFocus
                        autoComplete="name"
                    />

                    <InputError className="mt-2" message={errors.name} />
                </div>

                <div>
                    <Label htmlFor="email">Email</Label>

                    <Input
                        id="email"
                        type="email"
                        value={data.email}
                        onChange={e => setData('email', e.target.value)}
                        required
                        autoComplete="username"
                    />

                    <InputError className="mt-2" message={errors.email} />
                </div>

                <div>
                    <Label htmlFor="image_path">Image</Label>
                    <FilePond
                        allowMultiple={false}
                        files={data.image_path}
                        onupdatefiles={handleFileChange}
                        labelIdle="Drop files here or click to upload"
                    />
                    {errors.image_path && `${errors.image_path}`}
                </div>

                {mustVerifyEmail && user.email_verified_at === null && (
                    <div>
                        <p className="text-sm mt-2 text-gray-800 dark:text-gray-200">
                            Your email address is unverified.
                            <Link
                                href={route('verification.send')}
                                method="post"
                                as="button"
                                className="underline text-sm hover:text-gray-900 dark:hover:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800"
                            >
                                Click here to re-send the verification email.
                            </Link>
                        </p>

                        {status === 'verification-link-sent' && (
                            <div className="mt-2 font-medium text-sm text-green-600 dark:text-green-400">
                                A new verification link has been sent to your email address.
                            </div>
                        )}
                    </div>
                )}

                <div className="flex items-center gap-4">
                    <Button disabled={processing}>Save</Button>

                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm">Saved.</p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}
