import { Button } from '@/Components/UI/button';
import { checkPermission } from '@/Helpers/permissionHelper';
import AnimateIn from '@/Lib/AnimateIn';
import PanelQty from '@/Pages/Project/Trainset/CarriageTrainset/CarriagePanel/Partials/Partials/Components/PanelQty';
import { PERMISSION_ENUM } from '@/Support/Enums/permissionEnum';
import { TrainsetStatusEnum } from '@/Support/Enums/trainsetStatusEnum';
import { CarriageTrainsetResource, TrainsetResource } from '@/Support/Interfaces/Resources';
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
                {carriageTrainset?.carriage_panels?.map((carriage_panel) => (
                    <div key={carriage_panel.id}>
                        <AnimateIn
                            to='opacity-100 translate-y-0 translate-x-0'
                            key={carriage_panel.id}
                            from='opacity-0 -translate-y-4'
                            duration={300}
                        >
                            <div className='mt-3 flex flex-col gap-2 rounded-md border-2 border-black p-2 dark:border-white'>
                                <div className='items-scenter flex justify-between'>
                                    <h4 className='text-sm font-bold'>
                                        {carriage_panel.panel.name}
                                    </h4>
                                    <div className='w-1/2 text-end'>
                                        <h5 className='text-sm font-bold'>
                                            {carriage_panel.panel.description}
                                        </h5>
                                    </div>
                                </div>
                                <h5 className='text-sm'>
                                    {trainset.status === TrainsetStatusEnum.PROGRESS ? (
                                        <span>{carriage_panel.qty}</span>
                                    ) : (
                                        <PanelQty
                                            handleSyncCarriagePanel={handleSyncCarriage}
                                            carriage_panel={carriage_panel}
                                        />
                                    )}
                                </h5>
                                <p className='text-sm'>{carriage_panel.panel.description}</p>
                                <h5 className='text-base'>
                                    {t(
                                        'pages.project.trainset.carriage_trainset.carriage_panel.partials.partials.carriage_panel_card.headers.components',
                                    )}{' '}
                                    :
                                </h5>
                                <div className='text-sm'>
                                    {carriage_panel.carriage_panel_components?.map((component) => (
                                        <div key={component.id}>
                                            <span>
                                                {component.qty} x {component.component.name}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                                <div className='flex w-full items-center justify-end'>
                                    {checkPermission(PERMISSION_ENUM.PROJECT_TRAINSET_CARRIAGE_TRAINSET_PANEL_DELETE) &&
                                        trainset.status !== TrainsetStatusEnum.PROGRESS && (
                                        <Button
                                            variant='link'
                                            onClick={() => handlePanelDeletion(carriage_panel.id)}
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
