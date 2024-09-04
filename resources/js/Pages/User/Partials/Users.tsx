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
import { useLoading } from '@/contexts/LoadingContext';
import { useSuccessToast } from '@/hooks/useToast';

export default function () {
    const [userResponse, setUserResponse] = useState<PaginateResponse<UserResource>>();
    const [filters, setFilters] = useState<ServiceFilterOptions>({
        page: 1,
        per_page: 10,
        relations: 'roles',
    });

    const { auth } = usePage().props;
    const { setLoading } = useLoading();

    const syncUsers = async () => {
        setLoading(true);
        userService.getAll(filters).then(res => {
            console.log(res);
            setUserResponse(res);
        });
        setLoading(false);
    };

    useEffect(() => {
        console.log('first render, or filters changed');
        syncUsers();
    }, [filters]);

    const handleUserDeletion = (id: number) => {
        const isConfirmed = useConfirmation().then(async ({ isConfirmed }) => {
            if (isConfirmed) {
                setLoading(true);
                await userService.delete(id);
                await syncUsers();
                useSuccessToast('User deleted successfully');
                setLoading(false);
            }
        });
    };

    const handlePageChange = (page: number) => {
        setFilters({ ...filters, page });
    };
    // const isTabletOrMobile = useMediaQuery({ query: '(max-width: 900px)' });

    // const isDesktopOrLaptop = useMediaQuery({
    //     query: '(min-width: 900px)',
    // });
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
            {/* 
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
                </> */}
            {/* )} */}
            <GenericPagination meta={userResponse?.meta} handleChangePage={handlePageChange} />
        </div>
    );
}
