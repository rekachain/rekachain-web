import GenericPagination from '@/Components/GenericPagination';
import { useSuccessToast } from '@/Hooks/useToast';
import Filters from '@/Pages/User/Partials/Partials/Filters';
import UserCardView from '@/Pages/User/Partials/Partials/UserCardView';
import UserTableView from '@/Pages/User/Partials/Partials/UserTableView';
import { userService } from '@/Services/userService';
import { PaginateResponse } from '@/Support/Interfaces/Others';
import { ServiceFilterOptions } from '@/Support/Interfaces/Others/ServiceFilterOptions';
import { UserResource } from '@/Support/Interfaces/Resources';
import { withLoading } from '@/Utils/withLoading';
import { useLaravelReactI18n } from 'laravel-react-i18n';
import { useEffect, useState } from 'react';

export default function () {
    const { t } = useLaravelReactI18n();
    const [userResponse, setUserResponse] = useState<PaginateResponse<UserResource>>();
    const [filters, setFilters] = useState<ServiceFilterOptions>({
        page: 1,
        per_page: 10,
        relations: 'roles,workstation,step',
    });

    const syncUsers = withLoading(async () => {
        const res = await userService.getAll(filters);
        setUserResponse(res);
    });

    useEffect(() => {
        void syncUsers();
    }, [filters]);

    const handleUserDeletion = withLoading(async (id: number) => {
        await userService.softDelete(id);
        await syncUsers();
        void useSuccessToast(t('pages.user.partials.users.messages.deleted'));
    }, true);

    const handleUserForceDeletion = withLoading(
        async (id: number) => {
            await userService.delete(id);
            await syncUsers();
            void useSuccessToast(t('pages.user.partials.users.messages.deleted'));
        },
        true,
        {
            title: t('pages.user.partials.users.messages.delete_permanently'),
            text: t('pages.user.partials.users.messages.delete_permanently_description'),
        },
    );

    const handlePageChange = (page: number) => {
        setFilters({ ...filters, page });
    };

    // const isTabletOrMobile = useMediaQuery({ query: '(max-width: 900px)' });

    // const isDesktopOrLaptop = useMediaQuery({
    //     query: '(min-width: 900px)',
    // });
    return (
        <div className='space-y-4'>
            <Filters setFilters={setFilters} filters={filters} />
            {userResponse && (
                <>
                    <div className='hidden md:block'>
                        <UserTableView
                            userResponse={userResponse}
                            handleUserForceDeletion={handleUserForceDeletion}
                            handleUserDeletion={handleUserDeletion}
                        />
                    </div>

                    <div className='block md:hidden'>
                        <UserCardView
                            userResponse={userResponse}
                            handleUserForceDeletion={handleUserForceDeletion}
                            handleUserDeletion={handleUserDeletion}
                        />
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
