import { Button, buttonVariants } from '@/Components/UI/button';
import AnimateIn from '@/Lib/AnimateIn';
import { ROUTES } from '@/Support/Constants/routes';
import { TrainsetStatusEnum } from '@/Support/Enums/trainsetStatusEnum';
import { TrainsetResource } from '@/Support/Interfaces/Resources';
import { Link } from '@inertiajs/react';
import React from 'react';
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
    return (
        <div>
            {trainset?.carriage_trainsets?.map(carriage_trainset => (
                <div>
                    <AnimateIn
                        from="opacity-0 -translate-y-4"
                        to="opacity-100 translate-y-0 translate-x-0"
                        duration={300}
                        key={carriage_trainset.id}
                    >
                        <div className="border-black dark:border-white border-2 rounded-md p-2 flex flex-col gap-2 mt-3">
                            <div className="flex w-full justify-between items-scenter">
                                <h4 className="font-bold text-xl">{carriage_trainset.carriage.type}</h4>
                                <div className="text-center">
                                    {/* <h5 className="font-bold text-xs items-center "> {division.role?.name}</h5> */}
                                </div>
                            </div>

                            <h5 className="  text-base ">Jumlah : </h5>
                            <div className="text-sm">
                                {trainset.status === TrainsetStatusEnum.PROGRESS ? (
                                    <span>{carriage_trainset.qty}</span>
                                ) : (
                                    <CarriageQty
                                        trainset={trainset}
                                        carriage_trainset={carriage_trainset}
                                        handleSyncTrainset={handleSyncTrainset}
                                    />
                                )}
                            </div>
                            <h5 className="  text-base ">Panel dalam susunan kereta : </h5>
                            <div className="text-sm">
                                {carriage_trainset.carriage_panels?.map(panel => (
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

                            <div className="flex items-center justify-end w-full">
                                <Button
                                    variant="link"
                                    // disabled={loading || !trainset.can_be_deleted}
                                    onClick={() => handleTrainsetDeletion(trainset.id)}
                                >
                                    Delete
                                </Button>
                                <Link
                                    className={buttonVariants({ variant: 'link' })}
                                    href={route(`${ROUTES.PROJECTS_TRAINSETS_CARRIAGE_TRAINSETS_PANELS}.index`, [
                                        trainset.project_id,
                                        trainset.id,
                                        carriage_trainset.id,
                                    ])}
                                >
                                    Panel
                                </Link>
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
