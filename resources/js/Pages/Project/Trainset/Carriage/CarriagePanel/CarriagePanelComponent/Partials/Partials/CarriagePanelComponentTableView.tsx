import { CarriagePanelResource, CarriageTrainsetResource, TrainsetResource } from '@/Support/Interfaces/Resources';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/Components/UI/table';
import { TrainsetStatusEnum } from '@/Support/Enums/trainsetStatusEnum';
import { Button, buttonVariants } from '@/Components/UI/button';
import CarriagePanelComponentQty from '@/Pages/Project/Trainset/Carriage/CarriagePanel/CarriagePanelComponent/Partials/Partials/Components/CarriagePanelComponentQty';
import { useLaravelReactI18n } from 'laravel-react-i18n';
import { Link } from '@inertiajs/react';
import { ROUTES } from '@/Support/Constants/routes';
import CarriagePanelComponentProgress from '@/Pages/Project/Trainset/Carriage/CarriagePanel/CarriagePanelComponent/Partials/Partials/Components/CarriagePanelComponentProgress';

export default function CarriagePanelComponentTableView({
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
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Component</TableHead>
                        <TableHead>Qty</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Progress</TableHead>
                        <TableHead></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {carriagePanel.carriage_panel_components?.map(carriagePanelComponent => (
                        <TableRow key={carriagePanelComponent.id}>
                            <TableCell>{carriagePanelComponent.component?.name}</TableCell>
                            <TableCell>
                                {trainset.status === TrainsetStatusEnum.PROGRESS ? (
                                    <span>{carriagePanelComponent.qty}</span>
                                ) : (
                                    <CarriagePanelComponentQty
                                        handleSyncCarriagePanel={handleSyncCarriagePanel}
                                        carriagePanelComponent={carriagePanelComponent}
                                    />
                                )}
                            </TableCell>
                            <TableCell>{carriagePanelComponent.component.description}</TableCell>
                            <TableCell>{carriagePanelComponent.progress?.name}</TableCell>
                            <TableCell>
                                {/*<Link*/}
                                {/*    className={buttonVariants({ variant: 'link' })}*/}
                                {/*    href={route(`${ROUTES.PROJECTS_TRAINSETS}.edit`, carriage_panel.id)}*/}
                                {/*>*/}
                                {/*    Edit*/}
                                {/*</Link>*/}

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
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}