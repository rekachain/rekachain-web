import { Button } from '@/Components/UI/button';
import AnimateIn from '@/Lib/AnimateIn';
import { TrainsetStatusEnum } from '@/Support/Enums/trainsetStatusEnum';
import {
    CarriagePanelComponentResource,
    CarriagePanelResource,
    CarriageTrainsetResource,
    TrainsetResource,
} from '@/Support/Interfaces/Resources';
import React from 'react';
import { useLaravelReactI18n } from 'laravel-react-i18n';
import ComponentMaterialQty from '@/Pages/Project/Trainset/CarriageTrainset/CarriagePanel/CarriagePanelComponent/ComponentMaterial/Partials/Partials/Components/ComponentMaterialQty';

export default function ComponentMaterialCardView({
    trainset,
    carriageTrainset,
    carriagePanel,
    carriagePanelComponent,
    handleSyncCarriagePanel,
    handleComponentMaterialDeletion,
}: {
    trainset: TrainsetResource;
    carriageTrainset: CarriageTrainsetResource;
    carriagePanel: CarriagePanelResource;
    carriagePanelComponent: CarriagePanelComponentResource;
    handleSyncCarriagePanel: () => Promise<void>;
    handleComponentMaterialDeletion: (id: number) => void;
}) {
    const { t } = useLaravelReactI18n();
    return (
        <div>
            <>
                {carriagePanelComponent.component_materials?.map(componentMaterial => (
                    <div key={componentMaterial.id}>
                        <AnimateIn
                            from="opacity-0 -translate-y-4"
                            to="opacity-100 translate-y-0 translate-x-0"
                            duration={300}
                            key={componentMaterial.id}
                        >
                            <div className="border-black dark:border-white border-2 rounded-md p-2 flex flex-col gap-2 mt-3">
                                <div className="flex  justify-between items-scenter">
                                    <h4 className="font-bold text-sm">
                                        {componentMaterial.raw_material.material_code}
                                    </h4>
                                    <div className="text-end w-1/2">
                                        <h5 className="font-bold text-sm ">
                                            {componentMaterial.raw_material.description}
                                        </h5>
                                    </div>
                                </div>
                                <h5 className="text-sm">
                                    {trainset.status === TrainsetStatusEnum.PROGRESS ? (
                                        <span>{componentMaterial.qty}</span>
                                    ) : (
                                        <ComponentMaterialQty
                                            handleSyncCarriagePanel={handleSyncCarriagePanel}
                                            componentMaterial={componentMaterial}
                                        />
                                    )}
                                </h5>
                                <div className="flex items-center justify-end w-full">
                                    {trainset.status !== TrainsetStatusEnum.PROGRESS && (
                                        <Button
                                            variant="link"
                                            onClick={() => handleComponentMaterialDeletion(componentMaterial.id)}
                                        >
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
