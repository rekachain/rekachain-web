import { Button, buttonVariants } from '@/Components/UI/button';
import { checkPermission } from '@/Helpers/sidebarHelper';
import AnimateIn from '@/Lib/AnimateIn';
import { ROUTES } from '@/Support/Constants/routes';
import { PERMISSION_ENUM } from '@/Support/Enums/permissionEnum';
import { ProjectResource } from '@/Support/Interfaces/Resources';
import { Link } from '@inertiajs/react';
import { useLaravelReactI18n } from 'laravel-react-i18n';

export default function TrainsetCardView({
    project,
    handleTrainsetDeletion,
    loading,
}: {
    project: ProjectResource;
    handleTrainsetDeletion: (id: number) => void;
    loading: boolean;
}) {
    const { t } = useLaravelReactI18n();
    return (
        <div>
            {project.trainsets.map((trainset) => (
                <div key={trainset.id}>
                    <AnimateIn
                        to='opacity-100 translate-y-0 translate-x-0'
                        key={trainset.id}
                        from='opacity-0 -translate-y-4'
                        duration={300}
                    >
                        <div className='mt-3 flex flex-col gap-2 rounded-md border-2 border-black p-2 dark:border-white'>
                            <div className='items-scenter flex w-full justify-between'>
                                <h4 className='text-xl font-bold'>{trainset.name}</h4>
                                <div className='text-center'>
                                    {/* <h5 className="font-bold text-xs items-center "> {division.role?.name}</h5> */}
                                </div>
                            </div>

                            <h5 className='text-base'>
                                {t(
                                    'pages.project.trainset.partials.partials.trainset_table.headers.trainset_carriage',
                                )}
                            </h5>
                            <p className='text-sm'>
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

                            <div className='flex w-full items-center justify-end'>
                                {checkPermission(PERMISSION_ENUM.PROJECT_TRAINSET_DELETE) && (
                                <Button
                                    variant='link'
                                    onClick={() => handleTrainsetDeletion(trainset.id)}
                                    disabled={loading || !trainset.can_be_deleted}
                                >
                                    {t('action.delete')}
                                </Button>
                                )}
                                {checkPermission(PERMISSION_ENUM.PROJECT_TRAINSET_CARRIAGE_TRAINSET_READ) && (
                                <Link
                                    href={route(`${ROUTES.PROJECTS_TRAINSETS_CARRIAGES}.index`, [
                                        project.id,
                                        trainset.id,
                                    ])}
                                    className={buttonVariants({ variant: 'link' })}
                                >
                                    {t(
                                        'pages.project.trainset.partials.partials.trainset_table.actions.carriages',
                                    )}
                                </Link>
                                )}
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
