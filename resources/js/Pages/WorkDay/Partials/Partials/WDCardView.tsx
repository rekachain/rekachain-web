import { Button, buttonVariants } from '@/Components/UI/button';
import AnimateIn from '@/Lib/AnimateIn';
import { ROUTES } from '@/Support/Constants/routes';
import { WorkDayTimeEnum } from '@/Support/Enums/workDayTimeEnum';
import { PaginateResponse } from '@/Support/Interfaces/Others';
import { WorkDayResource } from '@/Support/Interfaces/Resources';
import { Link } from '@inertiajs/react';
import React from 'react';

export default function WDCardView({
    workDayResponse,
    handleWorkDayDeletion,
}: {
    workDayResponse: PaginateResponse<WorkDayResource>;
    handleWorkDayDeletion: (id: number) => void;
}) {
    return (
        <>
            {workDayResponse?.data.map(workDay => (
                <div>
                    <AnimateIn
                        from="opacity-0 -translate-y-4"
                        to="opacity-100 translate-y-0 translate-x-0"
                        duration={300}
                        key={workDay.id}
                    >
                        <div className="border-black dark:border-white border-2 rounded-md p-2 flex flex-col gap-2 mt-3">
                            <div className="flex w-full justify-between items-scenter">
                                <h4 className="font-bold text-xl">{workDay.day}</h4>
                                <div className="text-center">
                                    {/* <h5 className="font-bold text-xs items-center "> {division.role?.name}</h5> */}
                                </div>
                            </div>

                            <h5 className="  text-sm ">Waktu Mulai : {workDay.start_time}</h5>
                            <h5 className="  text-sm ">
                                Waktu Istirahat :
                                {workDay.work_day_times
                                    .filter(time => time.status === WorkDayTimeEnum.BREAK)
                                    .map(time => (
                                        <div key={time.id}>
                                            {time.start_time} - {time.end_time}
                                        </div>
                                    ))}
                            </h5>
                            <h5 className="  text-sm ">Waktu Selesai : {workDay.end_time}</h5>

                            <div className="flex items-center justify-end w-full">
                                <Link
                                    className={buttonVariants({ variant: 'link' })}
                                    href={route(`${ROUTES.WORK_DAYS}.edit`, workDay.id)}
                                >
                                    Edit
                                </Link>
                                {/* <Button variant="link" onClick={() => handleWorkshopDeletion(workshop.id)}>
                            Delete
                        </Button> */}
                            </div>
                        </div>
                    </AnimateIn>
                </div>
            ))}
        </>
    );
}