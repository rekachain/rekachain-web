import { Button } from '@/Components/UI/button';
import AnimateIn from '@/Lib/AnimateIn';
import { TrainsetStatusEnum } from '@/Support/Enums/trainsetStatusEnum';
import { CarriageTrainsetResource, TrainsetResource } from '@/Support/Interfaces/Resources';
import React from 'react';
import PanelQty from '@/Pages/Project/Trainset/Carriage/CarriagePanel/Partials/Partials/Components/PanelQty';
import { useLaravelReactI18n } from 'laravel-react-i18n';

export default function CarPanelCardView({
    trainset,
    carriageTrainset,
    handleSyncCarriage,
    handlePanelDeletion,
}: {
    trainset: TrainsetResource;
    carriageTrainset: CarriageTrainsetResource;
    handleSyncCarriage: () => Promise<void>;
    handlePanelDeletion: (id: number) => void;
}) {
    const { t } = useLaravelReactI18n();
    return (
        <div>
            <>
                {carriageTrainset?.carriage_panels?.map(carriage_panel => (
                    <div key={carriage_panel.id}>
                        <AnimateIn
                            from="opacity-0 -translate-y-4"
                            to="opacity-100 translate-y-0 translate-x-0"
                            duration={300}
                            key={carriage_panel.id}
                        >
                            <div className="border-black dark:border-white border-2 rounded-md p-2 flex flex-col gap-2 mt-3">
                                <div className="flex  justify-between items-scenter">
                                    <h4 className="font-bold text-sm">{carriage_panel.panel.name}</h4>
                                    <div className="text-end w-1/2">
                                        <h5 className="font-bold text-sm ">{carriage_panel.panel.description}</h5>
                                    </div>
                                </div>
                                <h5 className="text-sm">
                                    {trainset.status === TrainsetStatusEnum.PROGRESS ? (
                                        <span>{carriage_panel.qty}</span>
                                    ) : (
                                        <PanelQty
                                            handleSyncCarriage={handleSyncCarriage}
                                            carriage_panel={carriage_panel}
                                        />
                                    )}
                                </h5>
                                <p className="text-sm">{carriage_panel.panel.description}</p>
                                <h5 className="text-base">
                                    {t(
                                        'pages.project.trainset.carriage.panel.partials.partials.carriage_panel_card.headers.components',
                                    )}{' '}
                                    :
                                </h5>
                                <div className="text-sm">
                                    {carriage_panel.carriage_panel_components?.map(component => (
                                        <div key={component.id}>
                                            <span>
                                                {component.qty} x {component.component.name}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                                {/* <h5 className="  text-sm ">Waktu Mulai : {workDay.start_time}</h5>
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
                                <h5 className="  text-sm ">Waktu Selesai : {workDay.end_time}</h5> */}

                                <div className="flex items-center justify-end w-full">
                                    {trainset.status !== TrainsetStatusEnum.PROGRESS && (
                                        <Button variant="link" onClick={() => handlePanelDeletion(carriage_panel.id)}>
                                            {t('action.delete')}
                                        </Button>
                                    )}
                                </div>
                            </div>
                        </AnimateIn>
                    </div>
                ))}
            </>
        </div>
    );
}
