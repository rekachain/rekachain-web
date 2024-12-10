import { Button } from '@/Components/UI/button';
import { checkPermission } from '@/Helpers/permissionHelper';
import AnimateIn from '@/Lib/AnimateIn';
import PanelMaterialQty from '@/Pages/Project/Trainset/CarriageTrainset/CarriagePanel/PanelMaterial/Partials/Partials/Components/PanelMaterialQty';
import { PERMISSION_ENUM } from '@/Support/Enums/permissionEnum';
import { TrainsetStatusEnum } from '@/Support/Enums/trainsetStatusEnum';
import {
    CarriagePanelResource,
    CarriageTrainsetResource,
    TrainsetResource,
} from '@/Support/Interfaces/Resources';
import { useLaravelReactI18n } from 'laravel-react-i18n';

export default function PanelMaterialCardView({
    trainset,
    carriageTrainset,
    carriagePanel,
    handleSyncCarriagePanel,
    handlePanelMaterialDeletion,
}: {
    trainset: TrainsetResource;
    carriageTrainset: CarriageTrainsetResource;
    carriagePanel: CarriagePanelResource;
    handleSyncCarriagePanel: () => Promise<void>;
    handlePanelMaterialDeletion: (id: number) => void;
}) {
    const { t } = useLaravelReactI18n();
    return (
        <div>
            <>
                {carriagePanel.panel_materials?.map((panelMaterial) => (
                    <div key={panelMaterial.id}>
                        <AnimateIn
                            to='opacity-100 translate-y-0 translate-x-0'
                            key={panelMaterial.id}
                            from='opacity-0 -translate-y-4'
                            duration={300}
                        >
                            <div className='mt-3 flex flex-col gap-2 rounded-md border-2 border-black p-2 dark:border-white'>
                                <div className='items-scenter flex justify-between'>
                                    <h4 className='text-sm font-bold'>
                                        {panelMaterial.raw_material.material_code}
                                    </h4>
                                    <div className='w-1/2 text-end'>
                                        <h5 className='text-sm font-bold'>
                                            {panelMaterial.raw_material.description}
                                        </h5>
                                    </div>
                                </div>
                                <h5 className='text-sm'>
                                    {trainset.status === TrainsetStatusEnum.PROGRESS ? (
                                        <span>{panelMaterial.qty}</span>
                                    ) : (
                                        <PanelMaterialQty
                                            panelMaterial={panelMaterial}
                                            handleSyncCarriagePanel={handleSyncCarriagePanel}
                                        />
                                    )}
                                </h5>
                                <div className='flex w-full items-center justify-end'>
                                    {checkPermission(
                                        PERMISSION_ENUM.PROJECT_TRAINSET_CARRIAGE_TRAINSET_PANEL_MATERIAL_DELETE,
                                    ) &&
                                        trainset.status !== TrainsetStatusEnum.PROGRESS && (
                                            <Button
                                                variant='link'
                                                onClick={() =>
                                                    handlePanelMaterialDeletion(panelMaterial.id)
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
