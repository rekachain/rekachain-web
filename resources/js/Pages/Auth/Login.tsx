import AddFeedback from '@/Components/AddFeedback';
import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import { Button } from '@/Components/UI/button';
import { Input } from '@/Components/UI/input';
import useDarkMode from '@/Hooks/useDarkMode';
import { SetLocalization } from '@/Layouts/Partials/Partials/SetLocalization';
import { STYLING } from '@/Support/Constants/styling';
import { Head, Link, useForm } from '@inertiajs/react';
import { RiMoonClearLine } from '@remixicon/react';
import { useLaravelReactI18n } from 'laravel-react-i18n';
import { Sun } from 'lucide-react';
import { FormEventHandler, useEffect } from 'react';

export default function Login({
    status,
    canResetPassword,
}: {
    status?: string;
    canResetPassword: boolean;
}) {
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

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('login'));
    };

    const { t } = useLaravelReactI18n();

    return (
        <>
            <Head title='Log in' />
            <section className='login flex max-h-screen flex-col md:flex-row'>
                <div className='hero hidden flex-1 md:flex'>
                    <img
                        src='/assets/images/login-hero.jpeg'
                        id='login-hero'
                        className='w-full object-cover'
                        alt='login-hero.png'
                    />
                </div>

                <div className='relative z-10 flex h-screen flex-1 flex-col justify-start p-5 sm:gap-10 md:gap-20 md:px-16 md:py-16'>
                    <img
                        src='/assets/images/login-top-left.png'
                        className='absolute left-0 top-0 hidden h-44 md:block'
                        alt='login-top-left.png'
                    />
                    <img
                        src='/assets/images/login-bottom-left.png'
                        className='absolute bottom-0 left-0 hidden h-44 md:block'
                        alt='login-bottom-left.png'
                    />
                    <img
                        src='/assets/images/login-bottom-right.png'
                        className='absolute bottom-0 right-0 hidden h-44 md:block'
                        alt='login-bottom-right.png'
                    />

                    <div className=''>
                        <div className='flex flex-row justify-between'>
                            <img
                                src='/assets/images/Logo REKA.svg'
                                className='align-content-lg-start h-16 object-contain md:mb-10'
                                alt='login-form-header'
                            />
                            <div className='flex'>
                                <Button variant='ghost' size='icon' onClick={toggleDarkMode}>
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
                    <div className=''>
                        <div className='mb-16 mt-12 text-center text-3xl sm:mt-0 md:text-4xl'>
                            {t('pages.login.title')}
                        </div>
                        {status && (
                            <div className='mb-4 text-sm font-medium text-green-600'>{status}</div>
                        )}
                        <form onSubmit={submit}>
                            <div>
                                <InputLabel
                                    value={t('pages.login.fields.identifier')}
                                    htmlFor='identifier'
                                />

                                <Input
                                    value={data.identifier}
                                    type='text'
                                    onChange={(e) => setData('identifier', e.target.value)}
                                    name='identifier'
                                    id='identifier'
                                    className='mt-1'
                                    autoFocus
                                    autoComplete='identifier'
                                />

                                <InputError message={errors.identifier} className='mt-2' />
                            </div>

                            <div className='mt-4'>
                                <InputLabel
                                    value={t('pages.login.fields.password')}
                                    htmlFor='password'
                                />

                                <Input
                                    value={data.password}
                                    type='password'
                                    onChange={(e) => setData('password', e.target.value)}
                                    name='password'
                                    id='password'
                                    className='mt-1'
                                    autoComplete='current-password'
                                />

                                <InputError message={errors.password} className='mt-2' />
                            </div>

                            <div className='mt-4 flex flex-col justify-between gap-4 md:flex-row'>
                                <label className='flex items-center'>
                                    <Checkbox
                                        onChange={(e) => setData('remember', e.target.checked)}
                                        name='remember'
                                        checked={data.remember}
                                    />
                                    <span className='ms-2 text-sm text-gray-600 dark:text-gray-400'>
                                        {t('pages.login.fields.remember')}
                                    </span>
                                </label>

                                {canResetPassword && (
                                    <Link
                                        href={route('password.request')}
                                        className='rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:text-gray-400 dark:hover:text-gray-100 dark:focus:ring-offset-gray-800'
                                    >
                                        {t('pages.login.buttons.forgot_password')}
                                    </Link>
                                )}
                            </div>

                            <div className='mt-4 flex items-center justify-end'>
                                <Button disabled={processing} className='w-full'>
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
