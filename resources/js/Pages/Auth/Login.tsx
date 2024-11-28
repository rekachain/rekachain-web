import { FormEventHandler, useEffect } from 'react';
import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import { Head, Link, useForm } from '@inertiajs/react';
import { Input } from '@/Components/UI/input';
import { Button } from '@/Components/UI/button';
import { STYLING } from '@/Support/Constants/styling';
import { RiMoonClearLine } from '@remixicon/react';
import { Sun } from 'lucide-react';
import AddFeedback from '@/Components/AddFeedback';
import { SetLocalization } from '@/Layouts/Partials/Partials/SetLocalization';
import { useLaravelReactI18n } from 'laravel-react-i18n';
import useDarkMode from '@/Hooks/useDarkMode';

export default function Login({ status, canResetPassword }: { status?: string; canResetPassword: boolean }) {
    const { darkMode, toggleDarkMode } = useDarkMode();
    const { data, setData, post, processing, errors, reset } = useForm({
        identifier: '',
        password: '',
        remember: false,
    });

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const submit: FormEventHandler = e => {
        e.preventDefault();

        post(route('login'));
    };

    const { t } = useLaravelReactI18n();

    return (
        <>
            <Head title="Log in" />
            <section className="login max-h-screen flex flex-col md:flex-row">
                <div className="hero flex-1 hidden md:flex">
                    <img
                        src="/assets/images/login-hero.jpeg"
                        id="login-hero"
                        className="w-full object-cover"
                        alt="login-hero.png"
                    />
                </div>

                <div className="flex-1 flex flex-col z-10 p-5 md:px-16 justify-start md:gap-20 sm:gap-10  h-screen md:py-16 relative">
                    <img
                        src="/assets/images/login-top-left.png"
                        className="hidden h-44 md:block top-0 left-0 absolute"
                        alt="login-top-left.png"
                    />
                    <img
                        src="/assets/images/login-bottom-left.png"
                        className="hidden h-44 md:block bottom-0 left-0 absolute"
                        alt="login-bottom-left.png"
                    />
                    <img
                        src="/assets/images/login-bottom-right.png"
                        className="hidden h-44 md:block bottom-0 right-0 absolute"
                        alt="login-bottom-right.png"
                    />

                    <div className="">
                        <div className="flex flex-row justify-between">
                            <img
                                src="/assets/images/Logo REKA.svg"
                                className="md:mb-10 h-16 object-contain align-content-lg-start"
                                alt="login-form-header"
                            />
                            <div className="flex">
                                <Button variant="ghost" size="icon" onClick={toggleDarkMode}>
                                    {darkMode ? (
                                        <Sun size={STYLING.ICON.SIZE.SMALL} />
                                    ) : (
                                        <RiMoonClearLine size={STYLING.ICON.SIZE.SMALL} />
                                    )}
                                </Button>
                                <AddFeedback />
                                <SetLocalization />
                            </div>
                        </div>
                    </div>
                    <div className="">
                        <div className="text-3xl md:text-4xl mb-16 text-center mt-12 sm:mt-0">
                            {t('pages.login.title')}
                        </div>
                        {status && <div className="mb-4 font-medium text-sm text-green-600">{status}</div>}
                        <form onSubmit={submit}>
                            <div>
                                <InputLabel value={t('pages.login.fields.identifier')} htmlFor="identifier" />

                                <Input
                                    value={data.identifier}
                                    type="text"
                                    onChange={e => setData('identifier', e.target.value)}
                                    name="identifier"
                                    id="identifier"
                                    className="mt-1"
                                    autoFocus
                                    autoComplete="identifier"
                                />

                                <InputError message={errors.identifier} className="mt-2" />
                            </div>

                            <div className="mt-4">
                                <InputLabel value={t('pages.login.fields.password')} htmlFor="password" />

                                <Input
                                    value={data.password}
                                    type="password"
                                    onChange={e => setData('password', e.target.value)}
                                    name="password"
                                    id="password"
                                    className="mt-1"
                                    autoComplete="current-password"
                                />

                                <InputError message={errors.password} className="mt-2" />
                            </div>

                            <div className="flex mt-4 justify-between flex-col md:flex-row gap-4">
                                <label className="flex items-center">
                                    <Checkbox
                                        onChange={e => setData('remember', e.target.checked)}
                                        name="remember"
                                        checked={data.remember}
                                    />
                                    <span className="ms-2 text-sm text-gray-600 dark:text-gray-400">
                                        {t('pages.login.fields.remember')}
                                    </span>
                                </label>

                                {canResetPassword && (
                                    <Link
                                        href={route('password.request')}
                                        className="underline text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800"
                                    >
                                        {t('pages.login.buttons.forgot_password')}
                                    </Link>
                                )}
                            </div>

                            <div className="flex items-center justify-end mt-4">
                                <Button disabled={processing} className="w-full">
                                    {t('pages.login.buttons.sign_in')}
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </>
    );
}
