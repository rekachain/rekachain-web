import { FormEventHandler, useEffect } from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation');
        };
    }, []);

    const submit: FormEventHandler = e => {
        e.preventDefault();

        post(route('register'));
    };

    return (
        <GuestLayout>
            <Head title="Register" />

            <form onSubmit={submit}>
                <div>
                    <InputLabel value="Name" htmlFor="name" />

                    <TextInput
                        value={data.name}
                        required
                        onChange={e => setData('name', e.target.value)}
                        name="name"
                        isFocused={true}
                        id="name"
                        className="mt-1 block w-full"
                        autoComplete="name"
                    />

                    <InputError message={errors.name} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel value="Email" htmlFor="email" />

                    <TextInput
                        value={data.email}
                        type="email"
                        required
                        onChange={e => setData('email', e.target.value)}
                        name="email"
                        id="email"
                        className="mt-1 block w-full"
                        autoComplete="username"
                    />

                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel value="Password" htmlFor="password" />

                    <TextInput
                        value={data.password}
                        type="password"
                        required
                        onChange={e => setData('password', e.target.value)}
                        name="password"
                        id="password"
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                    />

                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel value="Confirm Password" htmlFor="password_confirmation" />

                    <TextInput
                        value={data.password_confirmation}
                        type="password"
                        required
                        onChange={e => setData('password_confirmation', e.target.value)}
                        name="password_confirmation"
                        id="password_confirmation"
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                    />

                    <InputError message={errors.password_confirmation} className="mt-2" />
                </div>

                <div className="flex items-center justify-end mt-4">
                    <Link
                        href={route('login')}
                        className="underline text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800"
                    >
                        Already registered?
                    </Link>

                    <PrimaryButton disabled={processing} className="ms-4">
                        Register
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}
