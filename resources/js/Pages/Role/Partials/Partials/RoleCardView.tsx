import { Button, buttonVariants } from '@/Components/UI/button';
import AnimateIn from '@/Lib/AnimateIn';
import { ROUTES } from '@/Support/Constants/routes';
import { PaginateResponse } from '@/Support/Interfaces/Others';
import { RoleResource } from '@/Support/Interfaces/Resources';
import { Link } from '@inertiajs/react';
import React from 'react';

export default function RoleCardView({
    roleResponse,
    handleRoleDeletion,
}: {
    roleResponse: PaginateResponse<RoleResource>;
    handleRoleDeletion: (id: number) => void;
}) {
    return (
        <>
            {roleResponse?.data.map(role => (
                <AnimateIn
                    from="opacity-0 -translate-y-4"
                    to="opacity-100 translate-y-0 translate-x-0"
                    duration={300}
                    key={role.id}
                >
                    <div className="border-black dark:border-white border-2 rounded-md p-2 flex flex-col gap-2 mt-5">
                        <div className="flex w-full justify-between items-center">
                            <h4 className="font-bold text-lg">{role.name}</h4>
                            <div className="text-center">
                                <h5
                                    className="font-bold text-base
                                 items-center "
                                >
                                    Divisi : {role.division?.name}
                                </h5>
                            </div>
                        </div>
                        <h4 className="text-base">Level : {role.level}</h4>
                        <p>Jumlah User :{role.users_count}</p>
                        <p>Jumlah Izin :{role.permissions_count}</p>
                        <div className="flex items-center justify-end w-full">
                            <Link
                                className={buttonVariants({ variant: 'link' })}
                                href={route(`${ROUTES.ROLES}.edit`, role.id)}
                            >
                                Edit
                            </Link>
                            <Button variant="link" onClick={() => handleRoleDeletion(role.id)}>
                                Delete
                            </Button>
                        </div>
                    </div>
                    {/* </div> */}
                </AnimateIn>
            ))}
        </>
    );
}
