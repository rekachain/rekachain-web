import { CarriageTrainsetResource, TrainsetResource } from '@/Support/Interfaces/Resources';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/Components/UI/table';
import { TrainsetStatusEnum } from '@/Support/Enums/trainsetStatusEnum';
import { Button, buttonVariants } from '@/Components/UI/button';
import PanelQty from '@/Pages/Project/Trainset/Carriage/CarriagePanel/Partials/Partials/Components/PanelQty';
import { useLaravelReactI18n } from 'laravel-react-i18n';
import { ROUTES } from '@/Support/Constants/routes';
import { Link } from '@inertiajs/react';
import PanelProgress from '@/Pages/Project/Trainset/Carriage/CarriagePanel/Partials/Partials/Components/PanelProgress';

export default function CarPanelTableView({
    trainset,
    carriageTrainset,
    handleSyncCarriagePanel,
    handlePanelDeletion,
}: {
    trainset: TrainsetResource;
    carriageTrainset: CarriageTrainsetResource;
    handleSyncCarriagePanel: () => Promise<void>;
    handlePanelDeletion: (id: number) => void;
}) {
    const { t } = useLaravelReactI18n();
    return (
        <div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>
                            {t(
                                'pages.project.trainset.carriage.panel.partials.partials.carriage_panel_table.headers.panel',
                            )}
                        </TableHead>
                        <TableHead>
                            {t(
                                'pages.project.trainset.carriage.panel.partials.partials.carriage_panel_table.headers.qty',
                            )}
                        </TableHead>
                        <TableHead>
                            {t(
                                'pages.project.trainset.carriage.panel.partials.partials.carriage_panel_table.headers.description',
                            )}
                        </TableHead>
                        <TableHead>
                            {t(
                                'pages.project.trainset.carriage.panel.partials.partials.carriage_panel_table.headers.components',
                            )}
                        </TableHead>
                        <TableHead>
                            {t(
                                'pages.project.trainset.carriage.panel.partials.partials.carriage_panel_table.headers.progress',
                            )}
                        </TableHead>
                        <TableHead></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {carriageTrainset?.carriage_panels?.map(carriage_panel => {
                        return (
                            <TableRow key={carriage_panel.id}>
                                <TableCell>{carriage_panel.panel.name}</TableCell>
                                <TableCell>
                                    {trainset.status === TrainsetStatusEnum.PROGRESS ? (
                                        <span>{carriage_panel.qty}</span>
                                    ) : (
                                        <PanelQty
                                            handleSyncCarriagePanel={handleSyncCarriagePanel}
                                            carriage_panel={carriage_panel}
                                        />
                                    )}
                                </TableCell>
                                <TableCell>{carriage_panel.panel.description}</TableCell>
                                <TableCell>
                                    {carriage_panel.carriage_panel_components?.map(component => (
                                        <div key={component.id}>
                                            <span>
                                                {component.qty} x {component.component.name}
                                            </span>
                                        </div>
                                    ))}
                                </TableCell>
                                <TableCell>{carriage_panel.progress?.name}</TableCell>
                                <TableCell>
                                    {/*<Link*/}
                                    {/*    className={buttonVariants({ variant: 'link' })}*/}
                                    {/*    href={route(`${ROUTES.PROJECTS_TRAINSETS}.edit`, carriage_panel.id)}*/}
                                    {/*>*/}
                                    {/*    Edit*/}
                                    {/*</Link>*/}

                                    {trainset.status !== TrainsetStatusEnum.PROGRESS && (
                                        <Button variant="link" onClick={() => handlePanelDeletion(carriage_panel.id)}>
                                            {t('action.delete')}
                                        </Button>
                                    )}

                                    <Link
                                        className={buttonVariants({ variant: 'link' })}
                                        href={route(
                                            `${ROUTES.PROJECTS_TRAINSETS_CARRIAGE_TRAINSETS_CARRIAGE_PANELS_CARRIAGE_PANEL_COMPONENTS}.index`,
                                            [trainset.project_id, trainset.id, carriageTrainset.id, carriage_panel.id],
                                        )}
                                    >
                                        Components
                                    </Link>

                                    <Link
                                        className={buttonVariants({ variant: 'link' })}
                                        href={route(
                                            `${ROUTES.PROJECTS_TRAINSETS_CARRIAGE_TRAINSETS_CARRIAGE_PANELS_PANEL_MATERIALS}.index`,
                                            [trainset.project_id, trainset.id, carriageTrainset.id, carriage_panel.id],
                                        )}
                                    >
                                        Materials
                                    </Link>

                                    <PanelProgress
                                        progress={carriage_panel.progress}
                                        carriagePanel={carriage_panel}
                                        handleSyncCarriagePanel={handleSyncCarriagePanel}
                                    />
                                </TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </div>
    );
}
