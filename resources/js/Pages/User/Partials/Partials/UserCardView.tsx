import { Avatar, AvatarImage } from '@/Components/UI/avatar';
import { Link, usePage } from '@inertiajs/react';
import { Button, buttonVariants } from '@/Components/UI/button';
import { ROUTES } from '@/Support/Constants/routes';
import { PaginateResponse } from '@/Support/Interfaces/Others';
import { UserResource } from '@/Support/Interfaces/Resources';
import { useLaravelReactI18n } from 'laravel-react-i18n';

export default function ({
    userResponse,
    handleUserDeletion,
}: {
    userResponse: PaginateResponse<UserResource>;
    handleUserDeletion: (id: number) => void;
}) {
    const { t } = useLaravelReactI18n();
    const { auth } = usePage().props;

    const canEditOrDelete = (user: UserResource) => {
        return user.id !== auth.user.id && (auth.user.role === 'Super Admin' || user.role.name !== 'Super Admin');
    };

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {userResponse?.data.map(user => (
                <div key={user.id} className="bg-background-2 shadow rounded-lg p-6 flex flex-col justify-between">
                    <div className="flex items-center mb-4 gap-4 justify-between md:justify-start flex-wrap">
                        <div className="flex flex-col items-center gap-4">
                            {user.image_path && (
                                <Avatar className="w-16 h-16">
                                    <AvatarImage className="object-cover" src={user.image} alt={user.name} />
                                </Avatar>
                            )}
                            <div className="flex flex-col items-start">
                                <div className="text-md font-semibold">{user.name}</div>
                                <div className="text-sm text-red-500">{user.role?.name}</div>
                                <div className="text-sm text-gray-500">{user.nip}</div>
                            </div>
                        </div>
                        <div className="flex ml-4 gap-4 flex-wrap">
                            <div className="flex flex-col gap-4">
                                <div className="text-sm text-gray-500">{user.email}</div>
                                <div className="text-sm text-gray-500">{user.phone_number}</div>
                            </div>
                            {canEditOrDelete(user) && (
                                <div className="flex gap-4 items-center flex-wrap">
                                    <Link
                                        className={buttonVariants({ variant: 'link' })}
                                        href={route(`${ROUTES.USERS}.edit`, user.id)}
                                    >
                                        {t('action.edit')}
                                    </Link>
                                    {user.can_be_deleted && (
                                        <Button variant="link" onClick={() => handleUserDeletion(user.id)}>
                                            {t('action.delete')}
                                        </Button>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
