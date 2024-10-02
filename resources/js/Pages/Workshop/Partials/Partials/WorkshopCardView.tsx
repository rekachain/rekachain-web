import { Button, buttonVariants } from '@/Components/UI/button';
import AnimateIn from '@/Lib/AnimateIn';
import { ROUTES } from '@/Support/Constants/routes';
import { PaginateResponse } from '@/Support/Interfaces/Others';
import { WorkshopResource } from '@/Support/Interfaces/Resources';
import { Link } from '@inertiajs/react';
import React from 'react';

export default function WorkshopCardView({
    workshopResponse,
    handleWorkshopDeletion,
}: {
    workshopResponse: PaginateResponse<WorkshopResource>;
    handleWorkshopDeletion: (id: number) => void;
}) {
    return (
        <>
            {workshopResponse?.data.map(workshop => (
                <AnimateIn
                    from="opacity-0 -translate-y-4"
                    to="opacity-100 translate-y-0 translate-x-0"
                    duration={300}
                    key={workshop.id}
                >
                    <div className="border-black dark:border-white border-2 rounded-md p-2 flex flex-col gap-2 mt-3">
                        <div className="flex w-full justify-between items-scenter">
                            <h4 className="font-bold text-xl">{workshop.name}</h4>
                            <div className="text-center">
                                {/* <h5 className="font-bold text-xs items-center "> {division.role?.name}</h5> */}
                            </div>
                        </div>

                        <h5 className="  text-sm ">Alamat : {workshop.address}</h5>

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
                </AnimateIn>
            ))}
        </>
    );
}
