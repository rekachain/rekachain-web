import { Button, buttonVariants } from '@/Components/UI/button';
import AnimateIn from '@/Lib/AnimateIn';
import { TrainsetStatusEnum } from '@/Support/Enums/trainsetStatusEnum';
import { CarriagePanelResource, CarriageTrainsetResource, TrainsetResource } from '@/Support/Interfaces/Resources';
import React from 'react';
import { useLaravelReactI18n } from 'laravel-react-i18n';
import CarriagePanelComponentQty from '@/Pages/Project/Trainset/CarriageTrainset/CarriagePanel/CarriagePanelComponent/Partials/Partials/Components/CarriagePanelComponentQty';
import { Link } from '@inertiajs/react';
import { ROUTES } from '@/Support/Constants/routes';
import CarriagePanelComponentProgress from '@/Pages/Project/Trainset/CarriageTrainset/CarriagePanel/CarriagePanelComponent/Partials/Partials/Components/CarriagePanelComponentProgress';

export default function CarriagePanelComponentCardView({
    trainset,
    carriageTrainset,
    carriagePanel,
    handleSyncCarriagePanel,
    handlePanelComponentDeletion,
}: {
    trainset: TrainsetResource;
    carriageTrainset: CarriageTrainsetResource;
    carriagePanel: CarriagePanelResource;
    handleSyncCarriagePanel: () => Promise<void>;
    handlePanelComponentDeletion: (id: number) => void;
}) {
    const { t } = useLaravelReactI18n();
    return (
        <div>
            <>
                {carriagePanel.carriage_panel_components?.map(carriagePanelComponent => (
                    <div key={carriagePanelComponent.id}>
                        <AnimateIn
                            from="opacity-0 -translate-y-4"
                            to="opacity-100 translate-y-0 translate-x-0"
                            duration={300}
                            key={carriagePanelComponent.id}
                        >
                            <div className="border-black dark:border-white border-2 rounded-md p-2 flex flex-col gap-2 mt-3">
                                <div className="flex  justify-between items-scenter">
                                    <h4 className="font-bold text-sm">{carriagePanelComponent.component.name}</h4>
                                    <div className="text-end w-1/2">
                                        <h5 className="font-bold text-sm ">
                                            {carriagePanelComponent.component.description}
                                        </h5>
                                    </div>
                                </div>
                                <h5 className="text-sm">
                                    {trainset.status === TrainsetStatusEnum.PROGRESS ? (
                                        <span>{carriagePanelComponent.qty}</span>
                                    ) : (
                                        <CarriagePanelComponentQty
                                            handleSyncCarriagePanel={handleSyncCarriagePanel}
                                            carriagePanelComponent={carriagePanelComponent}
                                        />
                                    )}
                                </h5>
                                <p className="text-sm">{carriagePanelComponent.component.description}</p>
                                <div className="flex items-center justify-end w-full">
                                    {trainset.status !== TrainsetStatusEnum.PROGRESS && (
                                        <Button
                                            variant="link"
                                            onClick={() => handlePanelComponentDeletion(carriagePanelComponent.id)}
                                        >
                                            {t('action.delete')}
                                        </Button>
                                    )}

                                    <Link
                                        className={buttonVariants({ variant: 'link' })}
                                        href={route(
                                            `${ROUTES.PROJECTS_TRAINSETS_CARRIAGE_TRAINSETS_CARRIAGE_PANELS_CARRIAGE_PANEL_COMPONENTS_COMPONENT_MATERIALS}.index`,
                                            [
                                                trainset.project_id,
                                                trainset.id,
                                                carriageTrainset.id,
                                                carriagePanel.id,
                                                carriagePanelComponent.id,
                                            ],
                                        )}
                                    >
                                        Materials
                                    </Link>

                                    <CarriagePanelComponentProgress
                                        carriagePanelComponent={carriagePanelComponent}
                                        handleSyncCarriagePanel={handleSyncCarriagePanel}
                                        progress={carriagePanelComponent.progress}
                                    />
                                </div>
                            </div>
                        </AnimateIn>
                    </div>
                ))}
            </>
        </div>
    );
}
