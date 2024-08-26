import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/Components/ui/table';
import { Link } from '@inertiajs/react';
import { workshopService } from '@/services/workshopService';
import { useEffect, useState } from 'react';
import { WorkshopResource } from '@/support/interfaces/resources';
import { PaginateResponse } from '@/support/interfaces/others';
import { Button, buttonVariants } from '@/Components/ui/button';
import { ROUTES } from '@/support/constants/routes';
import GenericPagination from '@/Components/GenericPagination';
import { ServiceFilterOptions } from '@/support/interfaces/others/ServiceFilterOptions';
import { useConfirmation } from '@/hooks/useConfirmation';
import { useMediaQuery } from 'react-responsive';
import AnimateIn from '@/lib/AnimateIn';

export default function () {
    const [workshopResponse, setWorkshopResponse] = useState<PaginateResponse<WorkshopResource>>();
    const [filters, setFilters] = useState<ServiceFilterOptions>({
        page: 1,
        perPage: 10,
    });

    const syncWorkshops = async () => {
        workshopService.getAll(filters).then(res => {
            setWorkshopResponse(res);
        });
    };

    useEffect(() => {
        syncWorkshops();
    }, [filters]);
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 900px)' });

    const isDesktopOrLaptop = useMediaQuery({
        query: '(min-width: 900px)',
    });

    const handleWorkshopDeletion = (id: number) => {
        const isConfirmed = useConfirmation().then(async ({ isConfirmed }) => {
            if (isConfirmed) {
                window.Swal.fire({
                    icon: 'success',
                    title: 'Workshop deleted successfully',
                });
                await workshopService.delete(id);
                await syncWorkshops();
            }
        });
    };

    const handlePageChange = (page: number) => {
        setFilters({ ...filters, page });
    };

    return (
        <div className="space-y-4 pt-4">
            {isTabletOrMobile && (
                <>
                    {workshopResponse?.data.map(workshop => (
                        <AnimateIn
                            from="opacity-0 -translate-y-4"
                            to="opacity-100 translate-y-0 translate-x-0"
                            duration={300}
                        >
                            <div
                                key={workshop.id}
                                className="border-black dark:border-white border-2 rounded-md p-2 flex flex-col gap-2"
                            >
                                <div className="flex w-full justify-between items-scenter">
                                    <h4 className="font-bold text-xl">{workshop.name}</h4>
                                    <div className="text-center">
                                        {/* <h5 className="font-bold text-xs items-center "> {division.role?.name}</h5> */}
                                    </div>
                                </div>

                                <h5 className="  text-sm ">Alamat : {workshop.address}</h5>
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
                                        href={route(`${ROUTES.WORKSHOPS}.edit`, workshop.id)}
                                    >
                                        Edit
                                    </Link>
                                    <Button variant="link" onClick={() => handleWorkshopDeletion(workshop.id)}>
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
                                <TableHead>Alamat</TableHead>
                                <TableHead></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {workshopResponse?.data.map(workshop => (
                                <TableRow key={workshop.id}>
                                    <TableCell>{workshop.name}</TableCell>
                                    <TableCell>{workshop.address}</TableCell>
                                    <TableCell>
                                        <Link
                                            className={buttonVariants({ variant: 'link' })}
                                            href={route(`${ROUTES.WORKSHOPS}.edit`, workshop.id)}
                                        >
                                            Edit
                                        </Link>
                                        <Button variant="link" onClick={() => handleWorkshopDeletion(workshop.id)}>
                                            Delete
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>

                    <GenericPagination meta={workshopResponse?.meta} handleChangePage={handlePageChange} />
                </>
            )}
        </div>
    );
}
