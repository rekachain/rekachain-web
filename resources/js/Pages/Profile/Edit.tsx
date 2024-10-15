import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';
import { Head } from '@inertiajs/react';
import { PageProps } from '@/Types';

export default function Edit({
    auth,
    mustVerifyEmail,
    status,
}: PageProps<{
    mustVerifyEmail: boolean;
    status?: string;
}>) {
    return (
        <AuthenticatedLayout>
            <Head title="Profile" />

            <div className="p-5 space-y-6">
                <div className="p-4 sm:p-8 bg-background-2 shadow sm:rounded-lg">
                    <UpdateProfileInformationForm mustVerifyEmail={mustVerifyEmail} status={status} />
                </div>

                <div className="p-4 sm:p-8 bg-background-2 shadow sm:rounded-lg">
                    <UpdatePasswordForm />
                </div>

                <div className="p-4 sm:p-8 bg-background-2 shadow sm:rounded-lg">
                    <DeleteUserForm />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
