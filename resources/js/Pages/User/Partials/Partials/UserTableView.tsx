import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/Components/ui/table';
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
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead></TableHead>
                    <TableHead>NIP</TableHead>
                    <TableHead>Nama</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>No. Hp</TableHead>
                    <TableHead>Role</TableHead>
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

                        {user.id !== auth.user.id ? (
                            (auth.user.role === 'Super Admin' || user.role.name !== 'Super Admin') && (
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
                            )
                        ) : (
                            <TableCell></TableCell>
                        )}
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}
