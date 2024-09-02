import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/Components/ui/table';
import { Link } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { DivisionResource } from '@/support/interfaces/resources';
import { PaginateResponse } from '@/support/interfaces/others';
import { Button, buttonVariants } from '@/Components/ui/button';
import { ROUTES } from '@/support/constants/routes';
import GenericPagination from '@/Components/GenericPagination';
import { ServiceFilterOptions } from '@/support/interfaces/others/ServiceFilterOptions';
import { useConfirmation } from '@/hooks/useConfirmation';
import { divisionService } from '@/services/divisionService';
import { useMediaQuery } from 'react-responsive';
import AnimateIn from '@/lib/AnimateIn';
import DivisionTableView from './Partials/DivisionTableView';
import DivisionCardView from './Partials/DivisionCardView';

export default function () {
    const [divisionResponse, setDivisionResponse] = useState<PaginateResponse<DivisionResource>>();
    const [filters, setFilters] = useState<ServiceFilterOptions>({
        page: 1,
        perPage: 10,
    });

    const syncDivisions = async () => {
        divisionService.getAll(filters).then(res => {
            setDivisionResponse(res);
        });
    };

    useEffect(() => {
        syncDivisions();
    }, [filters]);

    const handleDivisionDeletion = (id: number) => {
        const isConfirmed = useConfirmation().then(async ({ isConfirmed }) => {
            if (isConfirmed) {
                window.Swal.fire({
                    icon: 'success',
                    title: 'Division deleted successfully',
                });
                await divisionService.delete(id);
                await syncDivisions();
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
            {divisionResponse && (
                <>
                    <div className="hidden md:block">
                        <DivisionTableView
                            divisionResponse={divisionResponse}
                            handleDivisionDeletion={handleDivisionDeletion}
                            auth={''}
                        ></DivisionTableView>
                        {/* <UserTableView
                            userResponse={userResponse}
                            handleUserDeletion={handleUserDeletion}
                            auth={auth}
                        /> */}
                    </div>

                    <div className="block md:hidden">
                        <DivisionCardView
                            divisionResponse={divisionResponse}
                            // handleRoleDeletion={handleRoleResourceDeletion}
                            handleDivisionDeletion={handleDivisionDeletion}
                            auth={''}
                            // auth={auth}
                        ></DivisionCardView>
                        {/* <UserCardView userResponse={userResponse} handleUserDeletion={handleUserDeletion} auth={auth} /> */}
                    </div>
                </>
            )}
            {/* {isTabletOrMobile && (
                <>
                    {divisionResponse?.data.map(division => (
                        <AnimateIn
                            from="opacity-0 -translate-y-4"
                            to="opacity-100 translate-y-0 translate-x-0"
                            duration={300}
                        >
                            <div
                                key={division.id}
                                className="border-black dark:border-white border-2 rounded-md p-2 flex flex-col gap-2"
                            >
                                <div className="flex w-full justify-between items-scenter">
                                    <h4 className="font-bold text-xl">{division.name}</h4>
                                    <div className="text-center">
                                    </div>
                                </div> */}

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
            {/* <div className="flex items-center justify-end w-full">
                                    <Link
                                        className={buttonVariants({ variant: 'link' })}
                                        href={route(`${ROUTES.DIVISIONS}.edit`, division.id)}
                                    >
                                        Edit
                                    </Link>
                                    <Button variant="link" onClick={() => handleDivisionDeletion(division.id)}>
                                        Delete
                                    </Button>
                                </div>
                            </div>
                        </AnimateIn>
                    ))}
                </>
            )} */}
            {/* {isDesktopOrLaptop && (
                <div className="">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Nama</TableHead>
                                <TableHead></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {divisionResponse?.data.map(division => (
                                <TableRow key={division.id}>
                                    <TableCell>{division.name}</TableCell>
                                    <TableCell>
                                        <Link
                                            className={buttonVariants({ variant: 'link' })}
                                            href={route(`${ROUTES.DIVISIONS}.edit`, division.id)}
                                        >
                                            Edit
                                        </Link>
                                        <Button variant="link" onClick={() => handleDivisionDeletion(division.id)}>
                                            Delete
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table> */}

            <GenericPagination meta={divisionResponse?.meta} handleChangePage={handlePageChange} />
        </div>
    );
}
