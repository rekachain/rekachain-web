import { Button } from '@/Components/UI/button';
import AnimateIn from '@/Lib/AnimateIn';
import { PaginateResponse } from '@/Support/Interfaces/Others';
import { PermissionResource } from '@/Support/Interfaces/Resources';
import { Link } from '@inertiajs/react';
import React from 'react';

export default function PermissionsCardView({
    permissionResponse,
    handlePermissionDeletion,
}: {
    permissionResponse: PaginateResponse<PermissionResource>;
    handlePermissionDeletion: (id: number) => void;
}) {
    return (
        <>
            {permissionResponse?.data.map(permission => (
                <AnimateIn
                    from="opacity-0 -translate-y-4"
                    to="opacity-100 translate-y-0 translate-x-0 mt-3"
                    duration={300}
                    key={permission.id}
                >
                    <div className="border-black dark:border-white border-2 rounded-md p-2 flex flex-col gap-2">
                        <div className="flex w-full justify-between items-center">
                            <div className="text-center">
                                {/* <h5 className="font-bold text-xs items-center "> {division.role?.name}</h5> */}
                            </div>
                        </div>
                        <h4 className="font-bold text-xl">{permission.group}</h4>
                        <h4 className="text-md">{permission.name}</h4>
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
                </AnimateIn>
            ))}
        </>
    );
}
