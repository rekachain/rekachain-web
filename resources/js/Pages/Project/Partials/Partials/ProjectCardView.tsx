import { Button } from '@/Components/ui/button';
import AnimateIn from '@/lib/AnimateIn';
import { PaginateResponse } from '@/support/interfaces/others';
import { ProjectResource } from '@/support/interfaces/resources';
import { Link } from '@inertiajs/react';
import React from 'react';

export default function ProjectCardView({
    projectResponse,
    handleProjectDeletion,
    auth,
}: {
    projectResponse: PaginateResponse<ProjectResource>;
    handleProjectDeletion: (id: number) => void;
    auth: any; // sementara
}) {
    return (
        <div>
            {projectResponse.data.map(project => (
                <AnimateIn
                    from="opacity-0 -translate-y-4"
                    to="opacity-100 translate-y-0 translate-x-0"
                    duration={300}
                    key={project.id}
                >
                    <div className="border-black dark:border-white border-2 rounded-md p-2 flex flex-col gap-2 mt-5">
                        <div className="flex w-full justify-between items-center">
                            <h4 className="font-bold text-lg">{project.name}</h4>
                            <div className="text-center">
                                <h5
                                    className="font-bold text-base
                             items-center "
                                >
                                    {project.initial_date}
                                </h5>
                            </div>
                        </div>
                        <h4 className="text-base">Jumlah Trainset : {project.trainset_count}</h4>
                        {/* <p>Jumlah User :{project.users_count}</p>
                        <p>Jumlah Izin :{project.permissions_count}</p> */}
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