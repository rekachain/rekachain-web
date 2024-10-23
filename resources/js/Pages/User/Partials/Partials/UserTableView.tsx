import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/Components/UI/table';
import { Avatar, AvatarImage } from '@/Components/UI/avatar';
import { Link, usePage } from '@inertiajs/react';
import { Button, buttonVariants } from '@/Components/UI/button';
import { ROUTES } from '@/Support/Constants/routes';
import { PaginateResponse } from '@/Support/Interfaces/Others';
import { UserResource } from '@/Support/Interfaces/Resources';

export default function ({
    userResponse,
    handleUserDeletion,
}: {
    userResponse: PaginateResponse<UserResource>;
    handleUserDeletion: (id: number) => void;
}) {
    const { auth } = usePage().props;

    const canEditOrDelete = (user: UserResource) => {
        return user.id !== auth.user.id && (auth.user.role === 'Super Admin' || user.role.name !== 'Super Admin');
    };

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead></TableHead>
                    <TableHead>NIP</TableHead>
                    <TableHead>Nama</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>No. Hp</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Workstation</TableHead>
                    <TableHead>Step</TableHead>
                    <TableHead></TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {userResponse?.data.map(user => (
                    <TableRow key={user.id}>
                        <TableCell>
                            {user.image_path && (
                                <Avatar>
                                    <AvatarImage className="object-cover" src={user.image} alt={user.name} />
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
                                <Link
                                    className={buttonVariants({ variant: 'link' })}
                                    href={route(`${ROUTES.USERS}.edit`, user.id)}
                                >
                                    Edit
                                </Link>
                                <Button variant="link" onClick={() => handleUserDeletion(user.id)}>
                                    Delete
                                </Button>
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
