import { Button, buttonVariants } from '@/Components/ui/button';
import AnimateIn from '@/lib/AnimateIn';
import { ROUTES } from '@/support/constants/routes';
import { PaginateResponse } from '@/support/interfaces/others';
import { WorkshopResource } from '@/support/interfaces/resources';
import { Link } from '@inertiajs/react';
import React from 'react';

export default function WorkshopCardView({
    workshopResponse,
    handleWorkshopDeletion,
    // auth,
}: {
    workshopResponse: PaginateResponse<WorkshopResource>;
    handleWorkshopDeletion: (id: number) => void;
    auth: any; // sementara
}) {
    return (
        <>
            {workshopResponse?.data.map(workshop => (
                <AnimateIn from="opacity-0 -translate-y-4" to="opacity-100 translate-y-0 translate-x-0" duration={300}>
                    <div
                        key={workshop.id}
                        className="border-black dark:border-white border-2 rounded-md p-2 flex flex-col gap-2"
                    >
                        <div className="flex w-full justify-between items-scenter">
                            <h4 className="font-bold text-xl">{workshop.name}</h4>
                            <div className="text-center">
                                {/* <h5 className="font-bold text-xs items-center "> {division.role?.name}</h5> */}
                            </div>
                        </div>

                        <h5 className="  text-sm ">Alamat : {workshop.address}</h5>
                        {/*<div className="flex">
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
                                className={buttonVariants({ variant: 'link' })}
                                href={route(`${ROUTES.WORKSHOPS}.edit`, workshop.id)}
                            >
                                Edit
                            </Link>
                            <Button variant="link" onClick={() => handleWorkshopDeletion(workshop.id)}>
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
