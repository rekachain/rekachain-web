import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/Components/ui/table';
import { Link, usePage } from '@inertiajs/react';
import { roleService } from '@/services/roleService';
import { useEffect, useState } from 'react';
import { PaginateResponse } from '@/support/interfaces/others';
import { Button, buttonVariants } from '@/Components/ui/button';
import { ROUTES } from '@/support/constants/routes';
import GenericPagination from '@/Components/GenericPagination';
import { ServiceFilterOptions } from '@/support/interfaces/others/ServiceFilterOptions';
import { useConfirmation } from '@/hooks/useConfirmation';
import { RoleResource } from '@/support/interfaces/resources/RoleResource';
import { useMediaQuery } from 'react-responsive';
import AnimateIn from '@/lib/AnimateIn';

export default function () {
    const [roleResponse, setRoleResponse] = useState<PaginateResponse<RoleResource>>();
    const [filters, setFilters] = useState<ServiceFilterOptions>({
        page: 1,
        per_page: 10,
        relations: 'division',
    });

    const { auth } = usePage().props;

    const syncRoleResources = async () => {
        roleService.getAll(filters).then(res => {
            console.log(res);
            setRoleResponse(res);
        });
    };

    useEffect(() => {
        console.log('first render, or filters changed');
        syncRoleResources();
    }, [filters]);

    const handleRoleResourceDeletion = (id: number) => {
        const isConfirmed = useConfirmation().then(async ({ isConfirmed }) => {
            if (isConfirmed) {
                window.Swal.fire({
                    icon: 'success',
                    title: 'RoleResource deleted successfully',
                });
                await roleService.delete(id);
                await syncRoleResources();
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
        <div className="space-y-4">
            {isTabletOrMobile && (
                <>
                    {roleResponse?.data.map(role => (
                        <AnimateIn
                            from="opacity-0 -translate-y-4"
                            to="opacity-100 translate-y-0 translate-x-0"
                            duration={300}
                        >
                            <div
                                key={role.id}
                                className="border-black dark:border-white border-2 rounded-md p-2 flex flex-col gap-2"
                            >
                                <div className="flex w-full justify-between items-center">
                                    <h4 className="font-bold text-xl">{role.name}</h4>
                                    <div className="text-center">
                                        <h5 className="font-bold text-md items-center ">
                                            Divisi : {role.division?.name}
                                        </h5>
                                    </div>
                                </div>
                                <h4 className="text-base">Level : {role.level}</h4>
                                <p>Jumlah User :{role.users_count}</p>
                                <p>Jumlah Izin :{role.permissions_count}</p>
                                {/* <h5 className="font-bold text-sm ">NIP : {division.nip}</h5>
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
                                        <p className="text-xs">{division.email}</p>
                                        <p className="text-xs">{division.phone_number}</p>
                                    </div> */}
                                <div className="flex items-center justify-end w-full">
                                    <Link
                                        href=""
                                        // className={buttonVariants({ variant: 'link' })}
                                        // href={route(`${ROUTES.DIVISIONS}.edit`, division.id)}
                                    >
                                        Edit
                                    </Link>
                                    <Button variant="link">Delete</Button>
                                </div>
                            </div>
                            {/* </div> */}
                        </AnimateIn>
                    ))}
                </>
            )}
            {isDesktopOrLaptop && (
                <>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Nama</TableHead>
                                <TableHead>Divisi</TableHead>
                                <TableHead>Level</TableHead>
                                <TableHead>Jumlah User</TableHead>
                                <TableHead>Jumlah Izin</TableHead>
                                <TableHead></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {roleResponse?.data.map(role => (
                                <TableRow key={role.id}>
                                    <TableCell>{role.name}</TableCell>
                                    <TableCell>{role.division?.name}</TableCell>
                                    <TableCell>{role.level}</TableCell>
                                    <TableCell>{role.users_count}</TableCell>
                                    <TableCell>{role.permissions_count}</TableCell>
                                    <TableCell>
                                        <Link
                                            className={buttonVariants({ variant: 'link' })}
                                            href={route(`${ROUTES.ROLES}.edit`, role.id)}
                                        >
                                            Edit
                                        </Link>
                                        {role.users_count <= 0 && (
                                            <Button variant="link" onClick={() => handleRoleResourceDeletion(role.id)}>
                                                Delete
                                            </Button>
                                        )}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </>
            )}
            <GenericPagination meta={roleResponse?.meta} handleChangePage={handlePageChange} />
        </div>
    );
}
