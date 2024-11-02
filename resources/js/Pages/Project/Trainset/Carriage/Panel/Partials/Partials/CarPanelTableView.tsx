import { CarriageTrainsetResource, TrainsetResource } from '@/Support/Interfaces/Resources';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/Components/UI/table';
import { TrainsetStatusEnum } from '@/Support/Enums/trainsetStatusEnum';
import { Button } from '@/Components/UI/button';
import PanelQty from '../Components/PanelQty';
import { useLaravelReactI18n } from 'laravel-react-i18n';

export default function CarPanelTableView({
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
                    {carriageTrainset?.carriage_panels?.map(carriage_panel => (
                        <TableRow key={carriage_panel.id}>
                            <TableCell>{carriage_panel.panel.name}</TableCell>
                            <TableCell>
                                {trainset.status === TrainsetStatusEnum.PROGRESS ? (
                                    <span>{carriage_panel.qty}</span>
                                ) : (
                                    <PanelQty handleSyncCarriage={handleSyncCarriage} carriage_panel={carriage_panel} />
                                )}
                            </TableCell>
                            <TableCell>{carriage_panel.panel.description}</TableCell>
                            <TableCell>{carriage_panel.carriage_panel_components?.map(
                                component => (
                                    <div key={component.id}>
                                        <span>
                                            {component.qty} x {component.component.name}
                                        </span>
                                    </div>
                                )
                            )}</TableCell>
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

                                {/*<Link*/}
                                {/*    className={buttonVariants({ variant: 'link' })}*/}
                                {/*    href={route(`${ROUTES.PROJECTS_TRAINSETS_CARRIAGES_PANELS}.index`, [*/}
                                {/*        carriage_panel.project_id,*/}
                                {/*        carriage_panel.id,*/}
                                {/*        carriage_panel.id,*/}
                                {/*    ])}*/}
                                {/*>*/}
                                {/*    Detail*/}
                                {/*</Link>*/}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
