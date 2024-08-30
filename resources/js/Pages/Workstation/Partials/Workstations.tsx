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
import WorkstationTableView from './Partials/WorkstationTableView';
import WorkstationCardView from './Partials/WorkstationCardView';

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
    // function handleWorkstationDeletion(id: any): void {
    //     throw new Error('Function not implemented.');
    // }

    return (
        <div className="space-y-4">
            {workstationResponse && (
                <>
                    <div className="hidden md:block">
                        <WorkstationTableView
                            workstationResponse={workstationResponse}
                            handleWorkstationDeletion={handleWorkstationDeletion}
                            // auth={auth}
                        ></WorkstationTableView>
                        {/* <UserTableView
                            userResponse={userResponse}
                            handleUserDeletion={handleUserDeletion}
                            auth={auth}
                        /> */}
                    </div>

                    <div className="block md:hidden">
                        <WorkstationCardView
                            workstationResponse={workstationResponse}
                            handleWorkstationDeletion={handleWorkstationDeletion}
                            // auth={auth}
                        ></WorkstationCardView>
                        {/* <UserCardView userResponse={userResponse} handleUserDeletion={handleUserDeletion} auth={auth} /> */}
                    </div>
                </>
            )}
            <GenericPagination meta={workstationResponse?.meta} handleChangePage={handlePageChange} />
        </div>
    );
}
