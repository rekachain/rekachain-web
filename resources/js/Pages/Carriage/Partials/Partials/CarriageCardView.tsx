import React from 'react';
import { CarriageResource } from '../../../../Support/Interfaces/Resources';
import { PaginateResponse } from '../../../../Support/Interfaces/Others';
import { Link } from '@inertiajs/react';
import { Button, buttonVariants } from '@/Components/UI/button';
import { ROUTES } from '@/Support/Constants/routes';

export default function CarriageCardView({
    carriageResponse,
    handleCarriageDeletion,
    // auth,
}: {
    carriageResponse: PaginateResponse<CarriageResource>;

    handleCarriageDeletion: (id: number) => void;
    // auth: any; // sementara
}) {
    return (
        <div>
            {carriageResponse?.data.map(carriage => (
                // <AnimateIn
                //     from="opacity-0 -translate-y-4"
                //     to="opacity-100 translate-y-0 translate-x-0"
                //     duration={300}
                //     key={carriage.id}
                // >
                <div className="border-black dark:border-white border-2 rounded-md p-2 flex flex-col gap-2 mt-3">
                    <div className="flex w-full justify-between items-scenter">
                        {/* <h4 className="font-bold text-base">{carriage.name}</h4> */}
                        {/* <div className="text-center">
                                <h4 className="font-bold text-base">Proses : {carriage.name}</h4> */}
                        {/* <h5 className="font-bold text-md items-center ">
                                    Divisi:
                                    {carriage.division.name}
                                </h5> */}
                        {/* </div> */}
                    </div>
                    {/* <p className="text-sm">Proses Standar : {carriage.progress?.name}</p> */}

                    {/* <h5 className="font-bold text-sm ">Workshop : {carriage.workshop.name}</h5>
                        <h5 className=" text-sm ">Lokasi : {carriage.location}</h5> */}
                    <div className="flex items-center justify-end w-full">
                        <Link
                            className={buttonVariants({ variant: 'link' })}
                            href={route(`${ROUTES.COMPONENTS}.edit`, carriage.id)}
                        >
                            Edit
                        </Link>
                        {/* <Button variant="link" onClick={() => handleComponentDeletion(carriage.id)}>
                            Delete
                        </Button> */}
                    </div>
                </div>
                // </AnimateIn>
            ))}
        </div>
    );
}
