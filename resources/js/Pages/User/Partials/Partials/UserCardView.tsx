import { Avatar, AvatarImage } from '@/Components/ui/avatar';
import { Link } from '@inertiajs/react';
import { Button, buttonVariants } from '@/Components/ui/button';
import { ROUTES } from '@/support/constants/routes';
import { PaginateResponse } from '@/support/interfaces/others';
import { UserResource } from '@/support/interfaces/resources';

export default function ({
    userResponse,
    handleUserDeletion,
    auth,
}: {
    userResponse: PaginateResponse<UserResource>;
    handleUserDeletion: (id: number) => void;
    auth: any; // sementara
}) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {userResponse?.data.map(user => (
                <div key={user.id} className="bg-background-2 shadow rounded-lg p-6 flex flex-col justify-between">
                    <div className="flex items-center mb-4 gap-4 justify-center md:justify-start flex-wrap">
                        <div className="flex flex-col items-center gap-4">
                            {user.image_path && (
                                <Avatar className="w-16 h-16">
                                    <AvatarImage className="object-cover" src={user.image} alt={user.name} />
                                </Avatar>
                            )}
                            <div className="text-md font-semibold">{user.name}</div>
                        </div>
                        <div className="flex ml-4 gap-4 flex-wrap">
                            <div className="flex flex-col gap-4">
                                <div className="text-danger">{user.role?.name}</div>
                                <div className="text-sm text-gray-500">{user.nip}</div>
                                <div className="text-sm text-gray-500">{user.email}</div>
                                <div className="text-sm text-gray-500">{user.phone_number}</div>
                            </div>
                            {user.id !== auth.user.id &&
                                (auth.user.role === 'Super Admin' || user.role.name !== 'Super Admin') && (
                                    <div className="flex gap-4 items-center flex-wrap">
                                        <Link
                                            className={buttonVariants({ variant: 'link' })}
                                            href={route(`${ROUTES.USERS}.edit`, user.id)}
                                        >
                                            Edit
                                        </Link>
                                        <Button variant="link" onClick={() => handleUserDeletion(user.id)}>
                                            Delete
                                        </Button>
                                    </div>
                                )}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}