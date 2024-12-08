import { Avatar, AvatarImage } from '@/Components/UI/avatar';
import { Button, buttonVariants } from '@/Components/UI/button';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/Components/UI/table';
import { checkPermission } from '@/Helpers/sidebarHelper';
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
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead></TableHead>
                    <TableHead>
                        {t('pages.user.partials.partials.user_table.headers.nip')}
                    </TableHead>
                    <TableHead>
                        {t('pages.user.partials.partials.user_table.headers.name')}
                    </TableHead>
                    <TableHead>
                        {t('pages.user.partials.partials.user_table.headers.email')}
                    </TableHead>
                    <TableHead>
                        {t('pages.user.partials.partials.user_table.headers.phone_number')}
                    </TableHead>
                    <TableHead>
                        {t('pages.user.partials.partials.user_table.headers.role')}
                    </TableHead>
                    <TableHead>
                        {t('pages.user.partials.partials.user_table.headers.workstation')}
                    </TableHead>
                    <TableHead>
                        {t('pages.user.partials.partials.user_table.headers.step')}
                    </TableHead>
                    <TableHead></TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {userResponse?.data.map((user) => (
                    <TableRow key={user.id}>
                        <TableCell>
                            {user.image_path && (
                                <Avatar>
                                    <AvatarImage
                                        src={user.image}
                                        className='object-cover'
                                        alt={user.name}
                                    />
                                </Avatar>
                            )}
                        </TableCell>
                        <TableCell>{user.nip}</TableCell>
                        <TableCell>{user.name}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{user.phone_number}</TableCell>
                        <TableCell>{user.role?.name}</TableCell>
                        <TableCell>{user.workstation?.name}</TableCell>
                        <TableCell>{user.step?.name}</TableCell>
                        {canEditOrDelete(user) ? (
                            <TableCell>
                                {checkPermission(PERMISSION_ENUM.USER_UPDATE) && (
                                    <Link
                                    href={route(`${ROUTES.USERS}.edit`, user.id)}
                                    className={buttonVariants({ variant: 'link' })}
                                    >
                                    {t('action.edit')}
                                </Link>
                                )}
                                {checkPermission(PERMISSION_ENUM.USER_DELETE) && user.is_trashed && user.can_be_deleted ? (
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
                            </TableCell>
                        ) : (
                            <TableCell></TableCell>
                        )}
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}
