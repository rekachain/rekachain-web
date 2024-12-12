import { Button, buttonVariants } from '@/Components/UI/button';
import { checkPermission } from '@/Helpers/permissionHelper';
import AnimateIn from '@/Lib/AnimateIn';
import { ROUTES } from '@/Support/Constants/routes';
import { PERMISSION_ENUM } from '@/Support/Enums/permissionEnum';
import { TrainsetStatusEnum } from '@/Support/Enums/trainsetStatusEnum';
import { TrainsetResource } from '@/Support/Interfaces/Resources';
import { Link } from '@inertiajs/react';
import { useLaravelReactI18n } from 'laravel-react-i18n';
import CarriageQty from '../Components/CarriageQty';

export default function CarriageCardView({
    trainset,
    handleTrainsetDeletion,
    handleSyncTrainset,
}: {
    trainset: TrainsetResource;
    handleTrainsetDeletion: (id: number) => void;
    handleSyncTrainset: () => Promise<void>;
}) {
    const { t } = useLaravelReactI18n();

    return (
        <div>
            {trainset?.carriage_trainsets?.map((carriage_trainset) => (
                <div key={carriage_trainset.id}>
                    <AnimateIn
                        to='opacity-100 translate-y-0 translate-x-0'
                        key={carriage_trainset.id}
                        from='opacity-0 -translate-y-4'
                        duration={300}
                    >
                        <div className='mt-3 flex flex-col gap-2 rounded-md border-2 border-black p-2 dark:border-white'>
                            <div className='items-scenter flex w-full justify-between'>
                                <h4 className='text-xl font-bold'>
                                    {carriage_trainset.carriage.type}
                                </h4>
                                <div className='text-center'>
                                    {/* <h5 className="font-bold text-xs items-center "> {division.role?.name}</h5> */}
                                </div>
                            </div>

                            <h5 className='text-base'>
                                {t(
                                    'pages.project.trainset.carriage_trainset.partials.partials.carriage_card.headers.qty',
                                )}{' '}
                                :
                            </h5>
                            <div className='text-sm'>
                                {trainset.status === TrainsetStatusEnum.PROGRESS ? (
                                    <span>{carriage_trainset.qty}</span>
                                ) : (
                                    <CarriageQty
                                        trainset={trainset}
                                        handleSyncTrainset={handleSyncTrainset}
                                        carriage_trainset={carriage_trainset}
                                    />
                                )}
                            </div>
                            <h5 className='text-base'>
                                {t(
                                    'pages.project.trainset.carriage_trainset.partials.partials.carriage_card.headers.panels',
                                )}{' '}
                                :
                            </h5>
                            <div className='text-sm'>
                                {carriage_trainset.carriage_panels?.map((panel) => (
                                    <div key={panel.id}>
                                        <span>
                                            {panel.qty} x {panel.panel.name}
                                        </span>
                                    </div>
                                ))}
                            </div>
                            {/* <p className="text-sm">
                                {trainset.status === TrainsetStatusEnum.PROGRESS ? (
                                    <span>{carriage_trainset.qty}</span>
                                ) : (
                                    <CarriageQty
                                        trainset={trainset}
                                        carriage_trainset={carriage_trainset}
                                        handleSyncTrainset={handleSyncTrainset}
                                    />
                                )}
                            </p> */}
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
                                {checkPermission(
                                    PERMISSION_ENUM.PROJECT_TRAINSET_CARRIAGE_TRAINSET_DELETE,
                                ) && (
                                    <Button
                                        variant='link'
                                        // disabled={loading || !trainset.can_be_deleted}
                                        onClick={() => handleTrainsetDeletion(trainset.id)}
                                    >
                                        {t('action.delete')}
                                    </Button>
                                )}
                                {checkPermission(
                                    PERMISSION_ENUM.PROJECT_TRAINSET_CARRIAGE_TRAINSET_PANEL_READ,
                                ) && (
                                    <Link
                                        href={route(
                                            `${ROUTES.PROJECTS_TRAINSETS_CARRIAGE_TRAINSETS_CARRIAGE_PANELS}.index`,
                                            [
                                                trainset.project_id,
                                                trainset.id,
                                                carriage_trainset.id,
                                            ],
                                        )}
                                        className={buttonVariants({ variant: 'link' })}
                                    >
                                        {t(
                                            'pages.project.trainset.carriage_trainset.partials.partials.carriage_card.actions.panels',
                                        )}
                                    </Link>
                                )}
                                {/* <Link
                                    className={buttonVariants({ variant: 'link' })}
                                    // href={route(`${ROUTES.PROJECTS_TRAINSETS_CARRIAGES}.index`, [project.id, trainset.id])}
                                >
                                    Carriage
                                </Link> */}
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
