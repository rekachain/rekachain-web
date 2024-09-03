import { FormEventHandler, useEffect } from 'react';
import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import { Head, Link, useForm } from '@inertiajs/react';
import { Input } from '@/Components/ui/input';
import { Button } from '@/Components/ui/button';
import { useLocalStorage } from '@uidotdev/usehooks';
import { STYLING } from '@/support/constants/styling';
import { RiMoonClearLine, RiNotification4Line, RiSearchLine } from '@remixicon/react';
import { Sun } from 'lucide-react';

export default function Login({ status, canResetPassword }: { status?: string; canResetPassword: boolean }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        nip: '',
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
    const [darkMode, setDarkMode] = useLocalStorage('darkMode', false);

    const changeHtmlClass = () => {
        if (darkMode) {
            document.documentElement.classList.add('dark');
            document.documentElement.style.colorScheme = 'dark';
        } else {
            document.documentElement.classList.remove('dark');
            document.documentElement.style.colorScheme = 'light';
        }
    };

    useEffect(() => {
        changeHtmlClass();
    }, [darkMode]);

    const handleDarkMode = () => {
        setDarkMode(!darkMode);
        changeHtmlClass();
    };
    return (
        <>
            <Head title="Log in" />
            <section className="login min-h-screen flex flex-col md:flex-row  items-center ">
                <div className="hero flex-1 ">
                    <img
                        className=" hidden md:block h-screen "
                        id="login-hero"
                        src="/assets/images/login-hero.jpeg"
                        alt="login-hero.png"
                    />
                </div>
                <div id="login-icon" className=" ">
                    <img
                        className="hidden h-44 md:block mb-[27rem]"
                        id="login-top-left"
                        src="/assets/images/login-top-left.png"
                        alt="login-top-left.png"
                    />
                    <img
                        className="hidden h-44 md:block"
                        id="login-bottom-left"
                        src="/assets/images/login-bottom-left.png"
                        alt="login-bottom-left.png"
                    />
                </div>
                <img
                    className="lg:hidden md:hidden"
                    id="login-top-left-sm"
                    src="/assets/images/login-top-left.png"
                    alt="login-top-left.png"
                />
                <img
                    className="lg:hidden md:hidden"
                    id="login-bottom-left-sm"
                    src="/assets/images/login-bottom-left.png"
                    alt="login-bottom-left.png"
                />
                <img id="login-bottom-right" src="/assets/images/login-bottom-right.png" alt="login-bottom-right.png" />

                <div className="flex-1 flex flex-col z-10 md:px-16 justify-start md:gap-20 sm:gap-10  h-screen md:py-16">
                    <div className="">
                        <div className="flex flex-row justify-between">
                            <img
                                src="/assets/images/Logo REKA.svg"
                                alt="login-form-header"
                                className="md:mb-10 h-16 object-contain align-content-lg-start"
                            />
                            <Button variant="ghost" size="icon" onClick={handleDarkMode}>
                                {darkMode ? (
                                    <Sun size={STYLING.ICON.SIZE.SMALL} />
                                ) : (
                                    <RiMoonClearLine size={STYLING.ICON.SIZE.SMALL} />
                                )}
                            </Button>
                        </div>
                    </div>
                    <div className="">
                        <div className=" text-5xl sm:text-4xl mb-16 text-center ">Welcome Back...</div>
                        {status && <div className="mb-4 font-medium text-sm text-green-600">{status}</div>}
                        <form onSubmit={submit}>
                            <div>
                                <InputLabel htmlFor="nip" value="NIP" />

                                <Input
                                    id="nip"
                                    type="text"
                                    name="nip"
                                    value={data.nip}
                                    className="mt-1"
                                    autoComplete="nip"
                                    autoFocus
                                    onChange={e => setData('nip', e.target.value)}
                                />

                                <InputError message={errors.nip} className="mt-2" />
                            </div>

                            <div className="mt-4">
                                <InputLabel htmlFor="password" value="Password" />

                                <Input
                                    id="password"
                                    type="password"
                                    name="password"
                                    value={data.password}
                                    className="mt-1"
                                    autoComplete="current-password"
                                    onChange={e => setData('password', e.target.value)}
                                />

                                <InputError message={errors.password} className="mt-2" />
                            </div>

                            <div className="flex mt-4 justify-between flex-col md:flex-row gap-4">
                                <label className="flex items-center">
                                    <Checkbox
                                        name="remember"
                                        checked={data.remember}
                                        onChange={e => setData('remember', e.target.checked)}
                                    />
                                    <span className="ms-2 text-sm text-gray-600 dark:text-gray-400">Remember me</span>
                                </label>

                                {canResetPassword && (
                                    <Link
                                        href={route('password.request')}
                                        className="underline text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800"
                                    >
                                        Forgot your password?
                                    </Link>
                                )}
                            </div>

                            <div className="flex items-center justify-end mt-4">
                                <Button className="w-full" disabled={processing}>
                                    SIGN IN
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </>
    );
}
