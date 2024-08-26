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
import { useMediaQuery } from 'react-responsive';
import AnimateIn from '@/lib/AnimateIn';

export default function () {
    const [userResponse, setUserResponse] = useState<PaginateResponse<UserResource>>();
    const [filters, setFilters] = useState<ServiceFilterOptions>({
        page: 1,
        per_page: 10,
        relations: 'roles',
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
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 900px)' });

    const isDesktopOrLaptop = useMediaQuery({
        query: '(min-width: 900px)',
    });
    return (
        <div className="space-y-4 px-2">
            {isTabletOrMobile && (
                <>
                    {userResponse?.data.map(user => {
                        return (
                            <AnimateIn
                                from="opacity-0 -translate-y-4"
                                to="opacity-100 translate-y-0 translate-x-0"
                                duration={300}
                            >
                                <div
                                    key={user.id}
                                    className="border-black dark:border-white border-2 rounded-md p-2 flex flex-col gap-2"
                                >
                                    <div className="flex w-full justify-between items-scenter">
                                        <h4 className="font-bold text-xl">{user.name}</h4>
                                        <div className="text-center">
                                            <h5 className="font-bold text-xs items-center "> {user.role?.name}</h5>
                                        </div>
                                    </div>

                                    <h5 className="font-bold text-sm ">NIP : {user.nip}</h5>
                                    <div className="flex">
                                        <div className="">
                                            <p className="text-xs">Email </p>
                                            <p className="text-xs">No.Hp</p>
                                        </div>
                                        <div className="pl-4">
                                            <p className="text-xs">: </p>
                                            <p className="text-xs">: </p>
                                        </div>
                                        <div className="pl-4 ">
                                            <p className="text-xs">{user.email}</p>
                                            <p className="text-xs">{user.phone_number}</p>
                                        </div>
                                        {user.id !== auth.user.id &&
                                            (auth.user.role === 'Super Admin' || user.role.name !== 'Super Admin') && (
                                                <div className="flex items-center justify-end w-full">
                                                    <Link href={route(`${ROUTES.USERS}.edit`, user.id)}>
                                                        <p className="text-xs">Edit</p>
                                                    </Link>
                                                    <Button
                                                        variant={'link'}
                                                        onClick={() => handleUserDeletion(user.id)}
                                                    >
                                                        <p className="text-xs">Delete</p>
                                                    </Button>
                                                </div>
                                            )}
                                    </div>
                                </div>
                            </AnimateIn>
                        );
                    })}
                    <GenericPagination meta={userResponse?.meta} handleChangePage={handlePageChange} />
                </>
            )}
            {isDesktopOrLaptop && (
                <>
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
                                                <AvatarImage
                                                    className="object-cover"
                                                    src={user.image}
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

                                    {user.id !== auth.user.id &&
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
                                        )}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    <GenericPagination meta={userResponse?.meta} handleChangePage={handlePageChange} />
                </>
            )}
        </div>
    );
}
