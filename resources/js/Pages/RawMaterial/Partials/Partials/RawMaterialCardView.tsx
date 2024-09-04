import { Button } from '@/Components/ui/button';
import AnimateIn from '@/lib/AnimateIn';
import { PaginateResponse } from '@/support/interfaces/others';
import { RawMaterialResource } from '@/support/interfaces/resources';
import { Link } from '@inertiajs/react';
import React from 'react';

export default function RawMaterialCardView({
    rawMaterialResponse,
    handleRawMaterialDeletion,
    // auth,
}: {
    rawMaterialResponse: PaginateResponse<RawMaterialResource>;
    handleRawMaterialDeletion: (id: number) => void;
    // auth: any; // sementara
}) {
    return (
        <div>
            {rawMaterialResponse?.data.map(rawMaterial => (
                <AnimateIn
                    from="opacity-0 -translate-y-4"
                    to="opacity-100 translate-y-0 translate-x-0 mt-3"
                    duration={300}
                >
                    <div
                        // key={permission.id}
                        className="border-black dark:border-white border-2 rounded-md p-2 flex flex-col gap-2"
                    >
                        <div className="flex w-full justify-between items-scenter">
                            <h4 className="font-bold text-xl">{rawMaterial.material_code}</h4>
                            <h5 className="font-bold text-base items-center ">Unit : {rawMaterial.unit}</h5>
                        </div>
                        {/* <h4 className="font-bold text-xl">{permission.group}</h4> */}
                        {/* <h4 className="font-bold text-xl">50349259</h4> */}
                        {/* <h4 className="text-md">{permission.name}</h4> */}
                        <h4 className="text-md w-[80%]">{rawMaterial.description}</h4>
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
        </div>
    );
}
