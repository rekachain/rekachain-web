import { Button, buttonVariants } from '@/Components/UI/button';
import { checkPermission } from '@/Helpers/permissionHelper';
import AnimateIn from '@/Lib/AnimateIn';
import CarriagePanelComponentProgress from '@/Pages/Project/Trainset/CarriageTrainset/CarriagePanel/CarriagePanelComponent/Partials/Partials/Components/CarriagePanelComponentProgress';
import CarriagePanelComponentQty from '@/Pages/Project/Trainset/CarriageTrainset/CarriagePanel/CarriagePanelComponent/Partials/Partials/Components/CarriagePanelComponentQty';
import { ROUTES } from '@/Support/Constants/routes';
import { PERMISSION_ENUM } from '@/Support/Enums/permissionEnum';
import { TrainsetStatusEnum } from '@/Support/Enums/trainsetStatusEnum';
import {
    CarriagePanelResource,
    CarriageTrainsetResource,
    TrainsetResource,
} from '@/Support/Interfaces/Resources';
import { Link } from '@inertiajs/react';
import { useLaravelReactI18n } from 'laravel-react-i18n';

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
                {carriagePanel.carriage_panel_components?.map((carriagePanelComponent) => (
                    <div key={carriagePanelComponent.id}>
                        <AnimateIn
                            to='opacity-100 translate-y-0 translate-x-0'
                            key={carriagePanelComponent.id}
                            from='opacity-0 -translate-y-4'
                            duration={300}
                        >
                            <div className='mt-3 flex flex-col gap-2 rounded-md border-2 border-black p-2 dark:border-white'>
                                <div className='items-scenter flex justify-between'>
                                    <h4 className='text-sm font-bold'>
                                        {carriagePanelComponent.component.name}
                                    </h4>
                                    <div className='w-1/2 text-end'>
                                        <h5 className='text-sm font-bold'>
                                            {carriagePanelComponent.component.description}
                                        </h5>
                                    </div>
                                </div>
                                <h5 className='text-sm'>
                                    {trainset.status === TrainsetStatusEnum.PROGRESS ? (
                                        <span>{carriagePanelComponent.qty}</span>
                                    ) : (
                                        <CarriagePanelComponentQty
                                            handleSyncCarriagePanel={handleSyncCarriagePanel}
                                            carriagePanelComponent={carriagePanelComponent}
                                        />
                                    )}
                                </h5>
                                <p className='text-sm'>
                                    {carriagePanelComponent.component.description}
                                </p>
                                <div className='flex w-full items-center justify-end'>
                                    {checkPermission(
                                        PERMISSION_ENUM.PROJECT_TRAINSET_CARRIAGE_TRAINSET_PANEL_COMPONENT_DELETE,
                                    ) &&
                                        trainset.status !== TrainsetStatusEnum.PROGRESS && (
                                            <Button
                                                variant='link'
                                                onClick={() =>
                                                    handlePanelComponentDeletion(
                                                        carriagePanelComponent.id,
                                                    )
                                                }
                                            >
                                                {t('action.delete')}
                                            </Button>
                                        )}

                                    {checkPermission(
                                        PERMISSION_ENUM.PROJECT_TRAINSET_CARRIAGE_TRAINSET_PANEL_COMPONENT_MATERIAL_READ,
                                    ) && (
                                        <Link
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
                                            className={buttonVariants({ variant: 'link' })}
                                        >
                                            {t(
                                                'pages.project.trainset.carriage_trainset.carriage_panel.carriage_panel_component.partials.partials.carriage_panel_component_card.actions.materials',
                                            )}
                                        </Link>
                                    )}
                                    {checkPermission(
                                        PERMISSION_ENUM.PROJECT_TRAINSET_CARRIAGE_TRAINSET_PANEL_COMPONENT_PROGRESS_UPDATE,
                                    ) && (
                                        <CarriagePanelComponentProgress
                                            progress={carriagePanelComponent.progress}
                                            handleSyncCarriagePanel={handleSyncCarriagePanel}
                                            carriagePanelComponent={carriagePanelComponent}
                                        />
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
