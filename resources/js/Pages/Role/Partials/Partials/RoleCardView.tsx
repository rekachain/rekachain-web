import { Button } from '@/Components/ui/button';
import AnimateIn from '@/lib/AnimateIn';
import { PaginateResponse } from '@/support/interfaces/others';
import { RoleResource } from '@/support/interfaces/resources';
import { Link } from '@inertiajs/react';
import React from 'react';

export default function RoleCardView({
    roleResponse,
    handleRoleDeletion,
    auth,
}: {
    roleResponse: PaginateResponse<RoleResource>;
    handleRoleDeletion: (id: number) => void;
    auth: any; // sementara
}) {
    return (
        <>
            {roleResponse?.data.map(role => (
                <AnimateIn from="opacity-0 -translate-y-4" to="opacity-100 translate-y-0 translate-x-0" duration={300}>
                    <div
                        key={role.id}
                        className="border-black dark:border-white border-2 rounded-md p-2 flex flex-col gap-2 mt-5"
                    >
                        <div className="flex w-full justify-between items-center">
                            <h4 className="font-bold text-xl">{role.name}</h4>
                            <div className="text-center">
                                <h5 className="font-bold text-md items-center ">Divisi : {role.division?.name}</h5>
                            </div>
                        </div>
                        <h4 className="text-base">Level : {role.level}</h4>
                        <p>Jumlah User :{role.users_count}</p>
                        <p>Jumlah Izin :{role.permissions_count}</p>
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
                        <div className="flex items-center justify-end w-full">
                            <Link
                                href=""
                                // className={buttonVariants({ variant: 'link' })}
                                // href={route(`${ROUTES.DIVISIONS}.edit`, division.id)}
                            >
                                Edit
                            </Link>
                            <Button variant="link">Delete</Button>
                        </div>
                    </div>
                    {/* </div> */}
                </AnimateIn>
            ))}
        </>
    );
}