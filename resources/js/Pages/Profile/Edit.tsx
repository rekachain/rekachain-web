import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { RoleEnum } from '@/Support/Enums/roleEnum';
import { PageProps } from '@/Types';
import { Head } from '@inertiajs/react';
import { useLaravelReactI18n } from 'laravel-react-i18n';
import UpdateAssetForm from './Partials/UpdateAssetForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';

export default function Edit({
    auth,
    mustVerifyEmail,
    status,
}: PageProps<{
    mustVerifyEmail: boolean;
    status?: string;
}>) {
    const { t } = useLaravelReactI18n();
    return (
        <AuthenticatedLayout>
            <Head title={t('pages.profile.edit.title')} />

            <div className='space-y-6 p-5'>
                {auth.user.role === RoleEnum.SUPER_ADMIN && (
                    <div className='bg-background-2 p-4 shadow sm:rounded-lg sm:p-8'>
                        <UpdateAssetForm />
                    </div>
                )}
                <div className='bg-background-2 p-4 shadow sm:rounded-lg sm:p-8'>
                    <UpdateProfileInformationForm
                        status={status}
                        mustVerifyEmail={mustVerifyEmail}
                    />
                </div>

                <div className='bg-background-2 p-4 shadow sm:rounded-lg sm:p-8'>
                    <UpdatePasswordForm />
                </div>

                {/*<div className="p-4 sm:p-8 bg-background-2 shadow sm:rounded-lg">*/}
                {/*    <DeleteUserForm />*/}
                {/*</div>*/}
            </div>
        </AuthenticatedLayout>
    );
}
