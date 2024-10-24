import { FormEventHandler, useRef } from 'react';
import InputError from '@/Components/InputError';
import { useForm } from '@inertiajs/react';
import { Transition } from '@headlessui/react';
import { Input } from '@/Components/UI/input';
import { Label } from '@/Components/UI/label';
import { Button } from '@/Components/UI/button';
import { useLaravelReactI18n } from 'laravel-react-i18n';

export default function UpdatePasswordForm({ className = '' }: { className?: string }) {
    const { t } = useLaravelReactI18n();
    const passwordInput = useRef<HTMLInputElement>(null);
    const currentPasswordInput = useRef<HTMLInputElement>(null);

    const { data, setData, errors, put, reset, processing, recentlySuccessful } = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    const updatePassword: FormEventHandler = e => {
        e.preventDefault();

        put(route('password.update'), {
            preserveScroll: true,
            onSuccess: () => reset(),
            onError: errors => {
                if (errors.password) {
                    reset('password', 'password_confirmation');
                    passwordInput.current?.focus();
                }

                if (errors.current_password) {
                    reset('current_password');
                    currentPasswordInput.current?.focus();
                }
            },
        });
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                    {t('pages.profile.partials.update_password_form.title')}
                </h2>

                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    {t('pages.profile.partials.update_password_form.description')}
                </p>
            </header>

            <form onSubmit={updatePassword} className="mt-6 space-y-4">
                <div>
                    <Label htmlFor="current_password">
                        {t('pages.profile.partials.update_password_form.fields.current_password')}
                    </Label>

                    <Input
                        id="current_password"
                        ref={currentPasswordInput}
                        value={data.current_password}
                        onChange={e => setData('current_password', e.target.value)}
                        type="password"
                        autoComplete="current-password"
                    />

                    <InputError message={errors.current_password} className="mt-2" />
                </div>

                <div>
                    <Label htmlFor="password">{t('pages.profile.partials.update_password_form.fields.password')}</Label>

                    <Input
                        id="password"
                        ref={passwordInput}
                        value={data.password}
                        onChange={e => setData('password', e.target.value)}
                        type="password"
                        autoComplete="new-password"
                    />

                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div>
                    <Label htmlFor="password_confirmation">
                        {t('pages.profile.partials.update_password_form.fields.password_confirmation')}
                    </Label>

                    <Input
                        id="password_confirmation"
                        value={data.password_confirmation}
                        onChange={e => setData('password_confirmation', e.target.value)}
                        type="password"
                        autoComplete="new-password"
                    />

                    <InputError message={errors.password_confirmation} className="mt-2" />
                </div>

                <div className="flex items-center gap-4">
                    <Button disabled={processing}>
                        {t('pages.profile.partials.update_password_form.buttons.submit')}
                    </Button>

                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            {t('pages.profile.partials.update_password_form.messages.updated')}
                        </p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}
