import { Avatar, AvatarImage } from '@/Components/UI/avatar';
import { Button, buttonVariants } from '@/Components/UI/button';
import { checkPermission } from '@/Helpers/permissionHelper';
import { ROUTES } from '@/Support/Constants/routes';
import { PERMISSION_ENUM } from '@/Support/Enums/permissionEnum';
import { PaginateResponse } from '@/Support/Interfaces/Others';
import { UserResource } from '@/Support/Interfaces/Resources';
import { Link, usePage } from '@inertiajs/react';
import { useLaravelReactI18n } from 'laravel-react-i18n';

export default function ({
    userResponse,
    handleUserDeletion,
    handleUserForceDeletion,
}: {
    userResponse: PaginateResponse<UserResource>;
    handleUserDeletion: (id: number) => void;
    handleUserForceDeletion: (id: number) => void;
}) {
    const { t } = useLaravelReactI18n();
    const { auth } = usePage().props;

    const canEditOrDelete = (user: UserResource) => {
        return (
            user.id !== auth.user.id &&
            (auth.user.role === 'Super Admin' || user.role.name !== 'Super Admin')
        );
    };

    return (
        <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
            {userResponse?.data.map((user) => (
                <div
                    key={user.id}
                    className='flex flex-col justify-between rounded-lg bg-background-2 p-6 shadow'
                >
                    <div className='mb-4 flex flex-wrap items-center justify-between gap-4 md:justify-start'>
                        <div className='flex flex-col items-center gap-4'>
                            {user.image_path && (
                                <Avatar className='h-16 w-16'>
                                    <AvatarImage
                                        src={user.image}
                                        className='object-cover'
                                        alt={user.name}
                                    />
                                </Avatar>
                            )}
                            <div className='flex flex-col items-start'>
                                <div className='text-md font-semibold'>{user.name}</div>
                                <div className='text-sm text-red-500'>{user.role?.name}</div>
                                <div className='text-sm text-gray-500'>{user.nip}</div>
                            </div>
                        </div>
                        <div className='ml-4 flex flex-wrap gap-4'>
                            <div className='flex flex-col gap-4'>
                                <div className='text-sm text-gray-500'>{user.email}</div>
                                <div className='text-sm text-gray-500'>{user.phone_number}</div>
                            </div>
                            {canEditOrDelete(user) && (
                                <div className='flex flex-wrap items-center gap-4'>
                                    {checkPermission(PERMISSION_ENUM.USER_UPDATE) && (
                                        <Link
                                            href={route(`${ROUTES.USERS}.edit`, user.id)}
                                            className={buttonVariants({ variant: 'link' })}
                                        >
                                            {t('action.edit')}
                                        </Link>
                                    )}
                                    {checkPermission(PERMISSION_ENUM.USER_DELETE) &&
                                    user.is_trashed &&
                                    user.can_be_deleted ? (
                                        <Button
                                            variant='link'
                                            onClick={() => handleUserForceDeletion(user.id)}
                                            disabled
                                        >
                                            {t('action.delete_permanently')}
                                        </Button>
                                    ) : (
                                        <Button
                                            variant='link'
                                            onClick={() => handleUserDeletion(user.id)}
                                        >
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
