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
                {carriagePanelComponent.component_materials?.map((componentMaterial) => (
                    <div key={componentMaterial.id}>
                        <AnimateIn
                            to='opacity-100 translate-y-0 translate-x-0'
                            key={componentMaterial.id}
                            from='opacity-0 -translate-y-4'
                            duration={300}
                        >
                            <div className='mt-3 flex flex-col gap-2 rounded-md border-2 border-black p-2 dark:border-white'>
                                <div className='items-scenter flex justify-between'>
                                    <h4 className='text-sm font-bold'>
                                        {componentMaterial.raw_material.material_code}
                                    </h4>
                                    <div className='w-1/2 text-end'>
                                        <h5 className='text-sm font-bold'>
                                            {componentMaterial.raw_material.description}
                                        </h5>
                                    </div>
                                </div>
                                <h5 className='text-sm'>
                                    {trainset.status === TrainsetStatusEnum.PROGRESS ? (
                                        <span>{componentMaterial.qty}</span>
                                    ) : (
                                        <ComponentMaterialQty
                                            handleSyncCarriagePanel={handleSyncCarriagePanel}
                                            componentMaterial={componentMaterial}
                                        />
                                    )}
                                </h5>
                                <div className='flex w-full items-center justify-end'>
                                    {trainset.status !== TrainsetStatusEnum.PROGRESS && (
                                        <Button
                                            variant='link'
                                            onClick={() =>
                                                handleComponentMaterialDeletion(
                                                    componentMaterial.id,
                                                )
                                            }
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
