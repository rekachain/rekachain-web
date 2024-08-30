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
import RoleCardView from './Partials/RoleCardView';
import RoleTableView from './Partials/RoleTableView';

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
            {roleResponse && (
                <>
                    <div className="hidden md:block">
                        <RoleTableView
                            roleResponse={roleResponse}
                            handleRoleDeletion={handleRoleResourceDeletion}
                            auth={auth}
                        ></RoleTableView>
                        {/* <UserTableView
                            userResponse={userResponse}
                            handleUserDeletion={handleUserDeletion}
                            auth={auth}
                        /> */}
                    </div>

                    <div className="block md:hidden">
                        <RoleCardView
                            roleResponse={roleResponse}
                            handleRoleDeletion={handleRoleResourceDeletion}
                            auth={auth}
                        ></RoleCardView>
                        {/* <UserCardView userResponse={userResponse} handleUserDeletion={handleUserDeletion} auth={auth} /> */}
                    </div>
                </>
            )}
            <GenericPagination meta={roleResponse?.meta} handleChangePage={handlePageChange} />
        </div>
    );
}
