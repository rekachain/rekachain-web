import { Button } from '@/Components/ui/button';
import AnimateIn from '@/Lib/AnimateIn';
import { PaginateResponse } from '@/Support/interfaces/others';
import { PanelResource, RoleResource } from '@/Support/interfaces/resources';
import { Link } from '@inertiajs/react';
import React from 'react';

export default function PanelTableView({
    panelResponse,
    handlePanelDeletion,
    auth,
}: {
    panelResponse: PaginateResponse<PanelResource>;
    handlePanelDeletion: (id: number) => void;
    auth: any; // sementara
}) {
    return (
        <div>
            {panelResponse?.data.map(panel => (
                <AnimateIn
                    from="opacity-0 -translate-y-4"
                    to="opacity-100 translate-y-0 translate-x-0"
                    duration={300}
                    key={panel.id}
                >
                    <div className="border-black dark:border-white border-2 rounded-md p-2 flex flex-col gap-2 mt-5">
                        <div className="flex w-full justify-between items-center">
                            <h4 className="font-bold text-lg">{panel.name}</h4>
                            {/* <div className="text-center">
                                <h5
                                    className="font-bold text-base
                             items-center "
                                >
                                    Divisi : {panel.division?.name}
                                </h5>
                            </div> */}
                        </div>
                        <h4 className="text-base">Level : {panel.description}</h4>
                        {/* <p>Jumlah User :{panel.users_count}</p>
                        <p>Jumlah Izin :{panel.permissions_count}</p> */}
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
        </div>
    );
}
