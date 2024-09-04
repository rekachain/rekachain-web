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
import WorkshopTableView from './Partials/WorkshopTableView';
import WorkshopCardView from './Partials/WorkshopCardView';

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
    // function handleWorkshopDeletion(id: any): void {
    //     throw new Error('Function not implemented.');
    // }

    return (
        <div className="space-y-4 pt-4">
            {workshopResponse && (
                <>
                    <div className="hidden md:block">
                        <WorkshopTableView
                            workshopResponse={workshopResponse}
                            handleWorkshopDeletion={handleWorkshopDeletion}
                            auth={''}
                        ></WorkshopTableView>
                        {/* <UserTableView
                            userResponse={userResponse}
                            handleUserDeletion={handleUserDeletion}
                            auth={auth}
                        /> */}
                    </div>

                    <div className="block md:hidden">
                        <WorkshopCardView
                            workshopResponse={workshopResponse}
                            // handleRoleDeletion={handleRoleResourceDeletion}
                            handleWorkshopDeletion={handleWorkshopDeletion}
                            auth={''}
                            // auth={auth}
                        ></WorkshopCardView>
                        {/* <UserCardView userResponse={userResponse} handleUserDeletion={handleUserDeletion} auth={auth} /> */}
                    </div>
                </>
            )}
            {/* {isDesktopOrLaptop && (
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
                </>
            )} */}
            <GenericPagination meta={workshopResponse?.meta} handleChangePage={handlePageChange} />
        </div>
    );
}
