import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/Components/ui/table';
import { Link, usePage } from '@inertiajs/react';
import { userService } from '@/services/userService';
import { useEffect, useState } from 'react';
import { UserResource } from '@/support/interfaces/resources';
import { PaginateResponse } from '@/support/interfaces/others';
import { Avatar, AvatarImage } from '@/Components/ui/avatar';
import { Button, buttonVariants } from '@/Components/ui/button';
import { ROUTES } from '@/support/constants/routes';
import GenericPagination from '@/Components/GenericPagination';
import { ServiceFilterOptions } from '@/support/interfaces/others/ServiceFilterOptions';
import { useConfirmation } from '@/hooks/useConfirmation';

export default function () {
    const [userResponse, setUserResponse] = useState<PaginateResponse<UserResource>>();
    const [filters, setFilters] = useState<ServiceFilterOptions>({
        page: 1,
        per_page: 10,
    });

    const { auth } = usePage().props;

    const syncUsers = async () => {
        userService.getAll(filters).then(res => {
            console.log(res);
            setUserResponse(res);
        });
    };

    useEffect(() => {
        console.log('first render, or filters changed');
        syncUsers();
    }, [filters]);

    const handleUserDeletion = (id: number) => {
        const isConfirmed = useConfirmation().then(async ({ isConfirmed }) => {
            if (isConfirmed) {
                window.Swal.fire({
                    icon: 'success',
                    title: 'User deleted successfully',
                });
                await userService.delete(id);
                await syncUsers();
            }
        });
    };

    const handlePageChange = (page: number) => {
        setFilters({ ...filters, page });
    };

    return (
        <div className="space-y-4">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead></TableHead>
                        <TableHead>NIP</TableHead>
                        <TableHead>Nama</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>No. Hp</TableHead>
                        <TableHead>Divisi</TableHead>
                        <TableHead>Level</TableHead>
                        <TableHead></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {userResponse?.data.map(user => (
                        <TableRow key={user.id}>
                            <TableCell>
                                {user.photo_path && (
                                    <Avatar>
                                        <AvatarImage src={user.photo_path} alt={user.name} />
                                    </Avatar>
                                )}
                            </TableCell>
                            <TableCell>{user.nip}</TableCell>
                            <TableCell>{user.name}</TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell>{user.phone_number}</TableCell>
                            <TableCell className="text-destructive">Pay 25$ to unlock this dlc</TableCell>
                            <TableCell className="text-destructive">Pay 50$ to unlock this feature</TableCell>

                            {user.id !== auth.user.id && (
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
                            )}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            <GenericPagination meta={userResponse?.meta} handleChangePage={handlePageChange} />
        </div>
    );
}
