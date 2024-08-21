import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { lazy, Suspense } from 'react';
import { Head, Link } from '@inertiajs/react';
import { ROUTES } from '@/support/constants/routes';
import { buttonVariants } from '@/Components/ui/button';
import StaticLoadingOverlay from '@/Components/StaticLoadingOverlay';
import { useMediaQuery } from 'react-responsive';

export default function () {
    const Users = lazy(() => import('./Partials/Users'));

    const isDesktopOrLaptop = useMediaQuery({
        query: '(min-width: 900px)',
    });
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 900px)' });
    return (
        <>
            <Head title="Users" />
            <AuthenticatedLayout>
                <div className="p-2 md:p-4">
                    <div className="flex gap-5 items-center">
                        <h1 className="text-page-header my-4">Staff</h1>
                        <Link className={buttonVariants({ variant: 'default' })} href={route(`${ROUTES.USERS}.create`)}>
                            Tambah Staff
                        </Link>
                    </div>
                    {isTabletOrMobile && (
                        <>
                            <div className="border-black border-2 rounded-md p-2 flex flex-col gap-2">
                                <div className="flex w-full justify-between">
                                    <h4 className="font-bold text-xl">John Doe</h4>
                                    <h5 className="font-bold text-md items-center ">QC Assembly</h5>
                                </div>
                                <h5 className="font-bold text-md items-center ">NIP : 12</h5>
                                <div className="flex">
                                    <div className="">
                                        <p className="text-sm">Email </p>
                                        <p className="text-sm">No.Hp</p>
                                    </div>
                                    <div className="pl-4">
                                        <p className="text-sm">:</p>
                                        <p className="text-sm">:</p>
                                    </div>
                                    <div className="pl-4">
                                        <p className="text-sm">user@example.com</p>
                                        <p className="text-sm">02392013218</p>
                                    </div>
                                    <div className="flex justify-end w-full gap-2 items-center">
                                        <p className="text-xs">Edit</p>
                                        <p className="text-xs">Delete</p>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                    {isDesktopOrLaptop && (
                        <>
                            <Suspense fallback={<StaticLoadingOverlay />}>
                                <Users />
                            </Suspense>
                        </>
                    )}
                </div>
            </AuthenticatedLayout>
        </>
    );
}
