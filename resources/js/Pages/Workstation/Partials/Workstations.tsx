import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/Components/ui/table';
import { Link, usePage } from '@inertiajs/react';
import { workstationService } from '@/services/workstationService';
import { useEffect, useState } from 'react';
import { WorkstationResource } from '@/support/interfaces/resources';
import { PaginateResponse } from '@/support/interfaces/others';
import { Button, buttonVariants } from '@/Components/ui/button';
import { ROUTES } from '@/support/constants/routes';
import GenericPagination from '@/Components/GenericPagination';
import { ServiceFilterOptions } from '@/support/interfaces/others/ServiceFilterOptions';
import { useConfirmation } from '@/hooks/useConfirmation';
import { useMediaQuery } from 'react-responsive';
import AnimateIn from '@/lib/AnimateIn';

export default function () {
    const [workstationResponse, setWorkstationResponse] = useState<PaginateResponse<WorkstationResource>>();
    const [filters, setFilters] = useState<ServiceFilterOptions>({
        page: 1,
        perPage: 10,
        relations: 'workshop,division',
    });

    const syncWorkstations = async () => {
        workstationService.getAll(filters).then(res => {
            setWorkstationResponse(res);
        });
    };

    useEffect(() => {
        syncWorkstations();
    }, [filters]);

    const handleWorkstationDeletion = (id: number) => {
        const isConfirmed = useConfirmation().then(async ({ isConfirmed }) => {
            if (isConfirmed) {
                window.Swal.fire({
                    icon: 'success',
                    title: 'Workstation deleted successfully',
                });
                await workstationService.delete(id);
                await syncWorkstations();
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
                    {workstationResponse?.data.map(workstation => (
                        <AnimateIn
                            from="opacity-0 -translate-y-4"
                            to="opacity-100 translate-y-0 translate-x-0"
                            duration={300}
                        >
                            <div
                                key={workstation.id}
                                className="border-black dark:border-white border-2 rounded-md p-2 flex flex-col gap-2"
                            >
                                <div className="flex w-full justify-between items-scenter">
                                    <h4 className="font-bold text-xl">{workstation.name}</h4>
                                    <div className="text-center">
                                        <h5 className="font-bold text-md items-center ">
                                            Divisi:
                                            {workstation.division.name}
                                        </h5>
                                    </div>
                                </div>

                                <h5 className="font-bold text-sm ">Workshop : {workstation.workshop.name}</h5>
                                <h5 className=" text-sm ">Lokasi : {workstation.location}</h5>
                                {/*<div className="flex">
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
                                        className={buttonVariants({ variant: 'link' })}
                                        href={route(`${ROUTES.WORKSTATIONS}.edit`, workstation.id)}
                                    >
                                        Edit
                                    </Link>
                                    <Button variant="link" onClick={() => handleWorkstationDeletion(workstation.id)}>
                                        Delete
                                    </Button>
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
                                <TableHead>Lokasi</TableHead>
                                <TableHead>Workshop</TableHead>
                                <TableHead>Divisi</TableHead>
                                <TableHead></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {workstationResponse?.data.map(workstation => (
                                <TableRow key={workstation.id}>
                                    <TableCell>{workstation.name}</TableCell>
                                    <TableCell>{workstation.location}</TableCell>
                                    <TableCell>{workstation.workshop.name}</TableCell>
                                    <TableCell>{workstation.division.name}</TableCell>

                                    <TableCell>
                                        <Link
                                            className={buttonVariants({ variant: 'link' })}
                                            href={route(`${ROUTES.WORKSTATIONS}.edit`, workstation.id)}
                                        >
                                            Edit
                                        </Link>
                                        <Button
                                            variant="link"
                                            onClick={() => handleWorkstationDeletion(workstation.id)}
                                        >
                                            Delete
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </>
            )}
            <GenericPagination meta={workstationResponse?.meta} handleChangePage={handlePageChange} />
        </div>
    );
}
