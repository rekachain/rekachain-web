import { usePage } from '@inertiajs/react';
import { userService } from '@/services/userService';
import { useEffect, useState } from 'react';
import { UserResource } from '@/support/interfaces/resources';
import { PaginateResponse } from '@/support/interfaces/others';
import GenericPagination from '@/Components/GenericPagination';
import { ServiceFilterOptions } from '@/support/interfaces/others/ServiceFilterOptions';
import { useConfirmation } from '@/hooks/useConfirmation';
import UserTableView from '@/Pages/User/Partials/Partials/UserTableView';
import UserCardView from '@/Pages/User/Partials/Partials/UserCardView';

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

    return (
        <div className="space-y-4">
            {userResponse && (
                <>
                    <div className="hidden md:block">
                        <UserTableView
                            userResponse={userResponse}
                            handleUserDeletion={handleUserDeletion}
                            auth={auth}
                        />
                    </div>

                    <div className="block md:hidden">
                        <UserCardView userResponse={userResponse} handleUserDeletion={handleUserDeletion} auth={auth} />
                    </div>
                </>
            )}

            <GenericPagination meta={userResponse?.meta} handleChangePage={handlePageChange} />
        </div>
    );
}
