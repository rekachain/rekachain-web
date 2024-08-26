import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/Components/ui/table';
import { Link, usePage } from '@inertiajs/react';
import { permissionService } from '@/services/permissionService';
import { useEffect, useState } from 'react';
import { PaginateResponse } from '@/support/interfaces/others';
import { Button, buttonVariants } from '@/Components/ui/button';
import { ROUTES } from '@/support/constants/routes';
import GenericPagination from '@/Components/GenericPagination';
import { ServiceFilterOptions } from '@/support/interfaces/others/ServiceFilterOptions';
import { useConfirmation } from '@/hooks/useConfirmation';
import { PermissionResource } from '@/support/interfaces/resources/PermissionResource';
import { useMediaQuery } from 'react-responsive';
import AnimateIn from '@/lib/AnimateIn';

export default function () {
    const [permissionResponse, setPermissionResponse] = useState<PaginateResponse<PermissionResource>>();
    const [filters, setFilters] = useState<ServiceFilterOptions>({
        page: 1,
        per_page: 10,
    });

    const { auth } = usePage().props;

    const syncPermissionResources = async () => {
        permissionService.getAll(filters).then(res => {
            console.log(res);
            setPermissionResponse(res);
        });
    };

    useEffect(() => {
        console.log('first render, or filters changed');
        syncPermissionResources();
    }, [filters]);

    const handlePermissionResourceDeletion = (id: number) => {
        const isConfirmed = useConfirmation().then(async ({ isConfirmed }) => {
            if (isConfirmed) {
                window.Swal.fire({
                    icon: 'success',
                    title: 'PermissionResource deleted successfully',
                });
                await permissionService.delete(id);
                await syncPermissionResources();
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
                    {permissionResponse?.data.map(permission => (
                        <AnimateIn
                            from="opacity-0 -translate-y-4"
                            to="opacity-100 translate-y-0 translate-x-0"
                            duration={300}
                        >
                            <div
                                key={permission.id}
                                className="border-black dark:border-white border-2 rounded-md p-2 flex flex-col gap-2"
                            >
                                <div className="flex w-full justify-between items-scenter">
                                    <div className="text-center">
                                        {/* <h5 className="font-bold text-xs items-center "> {division.role?.name}</h5> */}
                                    </div>
                                </div>
                                <h4 className="font-bold text-xl">{permission.group}</h4>
                                <h4 className="text-md">{permission.name}</h4>

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
                                <TableHead>Group</TableHead>
                                <TableHead>Nama</TableHead>
                                <TableHead></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {permissionResponse?.data.map(permission => (
                                <TableRow key={permission.id}>
                                    <TableCell>{permission.group}</TableCell>
                                    <TableCell>{permission.name}</TableCell>
                                    <TableCell>
                                        {/*<Link*/}
                                        {/*    className={buttonVariants({ variant: 'link' })}*/}
                                        {/*    href={route(`${ROUTES.ROLES}.edit`, permission.id)}*/}
                                        {/*>*/}
                                        {/*    Edit*/}
                                        {/*</Link>*/}

                                        {/*<Button*/}
                                        {/*    variant="link"*/}
                                        {/*    onClick={() => handlePermissionResourceDeletion(permission.id)}*/}
                                        {/*>*/}
                                        {/*    Delete*/}
                                        {/*</Button>*/}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </>
            )}
            <GenericPagination meta={permissionResponse?.meta} handleChangePage={handlePageChange} />
        </div>
    );
}
