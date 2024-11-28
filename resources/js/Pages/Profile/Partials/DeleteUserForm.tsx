import { FormEventHandler, useRef, useState } from 'react';
import DangerButton from '@/Components/DangerButton';
import InputError from '@/Components/InputError';
import Modal from '@/Components/Modal';
import { useForm } from '@inertiajs/react';
import { Label } from '@/Components/UI/label';
import { Input } from '@/Components/UI/input';
import { Button } from '@/Components/UI/button';
import { useLaravelReactI18n } from 'laravel-react-i18n';

export default function DeleteUserForm({ className = '' }: { className?: string }) {
    const { t } = useLaravelReactI18n();
    const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);
    const passwordInput = useRef<HTMLInputElement>(null);

    const {
        data,
        setData,
        delete: destroy,
        processing,
        reset,
        errors,
    } = useForm({
        password: '',
    });

    const confirmUserDeletion = () => {
        setConfirmingUserDeletion(true);
    };

    const deleteUser: FormEventHandler = (e) => {
        e.preventDefault();

        destroy(route('profile.destroy'), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onError: () => passwordInput.current?.focus(),
            onFinish: () => reset(),
        });
    };

    const closeModal = () => {
        setConfirmingUserDeletion(false);

        reset();
    };

    return (
        <section className={`space-y-6 ${className}`}>
            <header>
                <h2 className='text-lg font-medium text-gray-900 dark:text-gray-100'>
                    {t('pages.profile.partials.delete_user_form.title')}
                </h2>

                <p className='mt-1 text-sm text-gray-600 dark:text-gray-400'>
                    {t('pages.profile.partials.delete_user_form.description')}
                </p>
            </header>

            <DangerButton onClick={confirmUserDeletion}>
                {t('pages.profile.partials.delete_user_form.buttons.delete_account')}
            </DangerButton>

            <Modal show={confirmingUserDeletion} onClose={closeModal}>
                <form onSubmit={deleteUser} className='p-6'>
                    <h2 className='text-lg font-medium text-gray-900 dark:text-gray-100'>
                        {t('pages.profile.partials.delete_user_form.dialogs.title')}
                    </h2>

                    <p className='mt-1 text-sm text-gray-600 dark:text-gray-400'>
                        {t('pages.profile.partials.delete_user_form.dialogs.description')}
                    </p>

                    <div className='mt-6'>
                        <Label htmlFor='password' className='sr-only'>
                            {t('pages.profile.partials.delete_user_form.dialogs.fields.password')}
                        </Label>

                        <Input
                            value={data.password}
                            type='password'
                            ref={passwordInput}
                            placeholder={t(
                                'pages.profile.partials.delete_user_form.dialogs.fields.password_placeholder',
                            )}
                            onChange={(e) => setData('password', e.target.value)}
                            name='password'
                            id='password'
                            autoFocus
                        />

                        <InputError message={errors.password} className='mt-2' />
                    </div>

                    <div className='mt-6 flex justify-end'>
                        <Button onClick={closeModal}>{t('action.cancel')}</Button>

                        <Button variant='destructive' disabled={processing} className='ms-3'>
                            {t(
                                'pages.profile.partials.delete_user_form.dialogs.buttons.delete_account',
                            )}
                        </Button>
                    </div>
                </form>
            </Modal>
        </section>
    );
}
