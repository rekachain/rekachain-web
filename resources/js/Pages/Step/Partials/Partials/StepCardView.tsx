import { Button, buttonVariants } from '@/Components/UI/button';
import AnimateIn from '@/Lib/AnimateIn';
import { ROUTES } from '@/Support/Constants/routes';
import { PaginateResponse } from '@/Support/Interfaces/Others';
import { StepResource } from '@/Support/Interfaces/Resources';
import { Link } from '@inertiajs/react';
import React from 'react';

export default function StepCardView({
    stepResponse,
    handleStepDeletion,
    // auth,
}: {
    stepResponse: PaginateResponse<StepResource>;

    handleStepDeletion: (id: number) => void;
    // auth: any; // sementara
}) {
    return (
        <>
            {stepResponse?.data.map(step => (
                <AnimateIn
                    from="opacity-0 -translate-y-4"
                    to="opacity-100 translate-y-0 translate-x-0"
                    duration={300}
                    key={step.id}
                >
                    <div className="border-black dark:border-white border-2 rounded-md p-2 flex flex-col gap-2 mt-3">
                        <div className="flex w-full justify-between items-scenter">
                            <h4 className="font-bold text-base">{step.name}</h4>
                            <div className="text-center">
                                <h4 className="font-bold text-base">Proses : {step.name}</h4>
                                {/* <h5 className="font-bold text-md items-center ">
                                    Divisi:
                                    {step.division.name}
                                </h5> */}
                            </div>
                        </div>
                        <p className="text-sm">Estimasi Manufaktur : {step.estimated_time}</p>

                        {/* <h5 className="font-bold text-sm ">Workshop : {step.workshop.name}</h5>
                        <h5 className=" text-sm ">Lokasi : {step.location}</h5> */}
                        <div className="flex items-center justify-end w-full">
                            <Link
                                className={buttonVariants({ variant: 'link' })}
                                href={route(`${ROUTES.WORKSTATIONS}.edit`, step.id)}
                            >
                                Edit
                            </Link>
                            <Button variant="link" onClick={() => handleStepDeletion(step.id)}>
                                Delete
                            </Button>
                        </div>
                    </div>
                </AnimateIn>
            ))}
        </>
    );
}
