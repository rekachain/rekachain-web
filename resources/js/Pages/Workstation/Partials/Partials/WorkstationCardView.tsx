import { Button, buttonVariants } from '@/Components/ui/button';
import AnimateIn from '@/lib/AnimateIn';
import { ROUTES } from '@/support/constants/routes';
import { PaginateResponse } from '@/support/interfaces/others';
import { WorkstationResource } from '@/support/interfaces/resources';
import { Link } from '@inertiajs/react';
import React from 'react';

export default function WorkstationCardView({
    workstationResponse,
    handleWorkstationDeletion,
    // auth,
}: {
    workstationResponse: PaginateResponse<WorkstationResource>;
    handleWorkstationDeletion: (id: number) => void;
    // auth: any; // sementara
}) {
    return (
        <>
            {workstationResponse?.data.map(workstation => (
                <AnimateIn
                    from="opacity-0 -translate-y-4"
                    to="opacity-100 translate-y-0 translate-x-0"
                    duration={300}
                    key={workstation.id}
                >
                    <div className="border-black dark:border-white border-2 rounded-md p-2 flex flex-col gap-2">
                        <div className="flex w-full justify-between items-scenter">
                            <h4 className="font-bold text-xl">{workstation.name}</h4>
                            <div className="text-center">
                                <h5 className="font-bold text-md items-center ">
                                    Divisi:
                                    {workstation.division.name}
                                </h5>
                            </div>
                        </div>

                        <h5 className="font-bold text-sm ">Workshop : {workstation.workshop.name}</h5>
                        <h5 className=" text-sm ">Lokasi : {workstation.location}</h5>
                        <div className="flex items-center justify-end w-full">
                            <Link
                                className={buttonVariants({ variant: 'link' })}
                                href={route(`${ROUTES.WORKSTATIONS}.edit`, workstation.id)}
                            >
                                Edit
                            </Link>
                            <Button variant="link" onClick={() => handleWorkstationDeletion(workstation.id)}>
                                Delete
                            </Button>
                        </div>
                    </div>
                </AnimateIn>
            ))}
        </>
    );
}
