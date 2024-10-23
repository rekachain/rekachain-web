import { Button, buttonVariants } from '@/Components/UI/button';
import AnimateIn from '@/Lib/AnimateIn';
import { ROUTES } from '@/Support/Constants/routes';
import { ProjectResource } from '@/Support/Interfaces/Resources';
import { Link } from '@inertiajs/react';
import React from 'react';
export default function TrainsetCardView({
    project,
    handleTrainsetDeletion,
    loading,
}: {
    project: ProjectResource;
    handleTrainsetDeletion: (id: number) => void;
    loading: boolean;
}) {
    return (
        <div>
            {project.trainsets.map(trainset => (
                <div>
                    <AnimateIn
                        from="opacity-0 -translate-y-4"
                        to="opacity-100 translate-y-0 translate-x-0"
                        duration={300}
                        key={trainset.id}
                    >
                        <div className="border-black dark:border-white border-2 rounded-md p-2 flex flex-col gap-2 mt-3">
                            <div className="flex w-full justify-between items-scenter">
                                <h4 className="font-bold text-xl">{trainset.name}</h4>
                                <div className="text-center">
                                    {/* <h5 className="font-bold text-xs items-center "> {division.role?.name}</h5> */}
                                </div>
                            </div>

                            <h5 className="  text-base ">Susunan Kereta : </h5>
                            <p className="text-sm">
                                {trainset.preset_name && `(${trainset.preset_name}) `}

                                {trainset.carriages &&
                                    trainset.carriages.length > 0 &&
                                    trainset.carriages.map((carriage, index) => (
                                        <span key={carriage.id}>
                                            {carriage.pivot?.qty} {carriage.type}
                                            {index < trainset.carriages!.length - 1 && ' + '}
                                        </span>
                                    ))}
                            </p>
                            {/* <h5 className="  text-sm ">
                                Waktu Istirahat :
                                {trainset.work_day_times
                                    .filter(time => time.status === WorkDayTimeEnum.BREAK)
                                    .map(time => (
                                        <div key={time.id}>
                                            {time.start_time} - {time.end_time}
                                        </div>
                                    ))}
                            </h5> */}
                            {/* <h5 className="  text-sm ">Waktu Selesai : {trainset.end_time}</h5> */}

                            <div className="flex items-center justify-end w-full">
                                <Button
                                    variant="link"
                                    disabled={loading || !trainset.can_be_deleted}
                                    onClick={() => handleTrainsetDeletion(trainset.id)}
                                >
                                    Delete
                                </Button>
                                <Link
                                    className={buttonVariants({ variant: 'link' })}
                                    href={route(`${ROUTES.PROJECTS_TRAINSETS_CARRIAGES}.index`, [
                                        project.id,
                                        trainset.id,
                                    ])}
                                >
                                    Carriage
                                </Link>
                                {/* <Button variant="link" onClick={() => handleWorkshopDeletion(workshop.id)}>
                            Delete
                        </Button> */}
                            </div>
                        </div>
                    </AnimateIn>
                </div>
            ))}
        </div>
    );
}
