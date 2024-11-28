import { buttonVariants } from '@/Components/UI/button';
import AnimateIn from '@/Lib/AnimateIn';
import { ROUTES } from '@/Support/Constants/routes';
import { WorkDayTimeEnum } from '@/Support/Enums/workDayTimeEnum';
import { PaginateResponse } from '@/Support/Interfaces/Others';
import { WorkDayResource } from '@/Support/Interfaces/Resources';
import { Link } from '@inertiajs/react';
import React from 'react';
import { useLaravelReactI18n } from 'laravel-react-i18n';

export default function WDCardView({
    workDayResponse,
    handleWorkDayDeletion,
}: {
    workDayResponse: PaginateResponse<WorkDayResource>;
    handleWorkDayDeletion: (id: number) => void;
}) {
    const { t } = useLaravelReactI18n();
    return (
        <>
            {workDayResponse?.data.map((workDay) => (
                <div key={workDay.id}>
                    <AnimateIn
                        to='opacity-100 translate-y-0 translate-x-0'
                        key={workDay.id}
                        from='opacity-0 -translate-y-4'
                        duration={300}
                    >
                        <div className='mt-3 flex flex-col gap-2 rounded-md border-2 border-black p-2 dark:border-white'>
                            <div className='items-scenter flex w-full justify-between'>
                                <h4 className='text-xl font-bold'>{workDay.day}</h4>
                                <div className='text-center'>
                                    {/* <h5 className="font-bold text-xs items-center "> {division.role?.name}</h5> */}
                                </div>
                            </div>

                            <h5 className='text-sm'>
                                {t('pages.work_day.partials.partials.work_day_card.headers.name')} :{' '}
                                {workDay.start_time}
                            </h5>
                            <h5 className='text-sm'>
                                {t(
                                    'pages.work_day.partials.partials.work_day_card.headers.break_time',
                                )}
                                :
                                {workDay.work_day_times
                                    .filter((time) => time.status === WorkDayTimeEnum.BREAK)
                                    .map((time) => (
                                        <div key={time.id}>
                                            {time.start_time} - {time.end_time}
                                        </div>
                                    ))}
                            </h5>
                            <h5 className='text-sm'>
                                {t(
                                    'pages.work_day.partials.partials.work_day_card.headers.end_date',
                                )}
                                : {workDay.end_time}
                            </h5>

                            <div className='flex w-full items-center justify-end'>
                                <Link
                                    href={route(`${ROUTES.WORK_DAYS}.edit`, workDay.id)}
                                    className={buttonVariants({ variant: 'link' })}
                                >
                                    {t('action.edit')}
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
