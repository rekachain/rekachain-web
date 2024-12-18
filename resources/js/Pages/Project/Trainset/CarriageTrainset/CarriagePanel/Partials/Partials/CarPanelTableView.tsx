import { Button, buttonVariants } from '@/Components/UI/button';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/Components/UI/table';
import { checkPermission } from '@/Helpers/permissionHelper';
import PanelProgress from '@/Pages/Project/Trainset/CarriageTrainset/CarriagePanel/Partials/Partials/Components/PanelProgress';
import PanelQty from '@/Pages/Project/Trainset/CarriageTrainset/CarriagePanel/Partials/Partials/Components/PanelQty';
import { ROUTES } from '@/Support/Constants/routes';
import { PERMISSION_ENUM } from '@/Support/Enums/permissionEnum';
import { TrainsetStatusEnum } from '@/Support/Enums/trainsetStatusEnum';
import { CarriageTrainsetResource, TrainsetResource } from '@/Support/Interfaces/Resources';
import { Link } from '@inertiajs/react';
import { useLaravelReactI18n } from 'laravel-react-i18n';

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
                                'pages.project.trainset.carriage_trainset.carriage_panel.partials.partials.carriage_panel_table.headers.panel',
                            )}
                        </TableHead>
                        <TableHead>
                            {t(
                                'pages.project.trainset.carriage_trainset.carriage_panel.partials.partials.carriage_panel_table.headers.qty',
                            )}
                        </TableHead>
                        <TableHead>
                            {t(
                                'pages.project.trainset.carriage_trainset.carriage_panel.partials.partials.carriage_panel_table.headers.description',
                            )}
                        </TableHead>
                        <TableHead>
                            {t(
                                'pages.project.trainset.carriage_trainset.carriage_panel.partials.partials.carriage_panel_table.headers.components',
                            )}
                        </TableHead>
                        <TableHead>
                            {t(
                                'pages.project.trainset.carriage_trainset.carriage_panel.partials.partials.carriage_panel_table.headers.progress',
                            )}
                        </TableHead>
                        <TableHead></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {carriageTrainset?.carriage_panels?.map((carriage_panel) => {
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
                                    {carriage_panel.carriage_panel_components?.map((component) => (
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

                                    {checkPermission(
                                        PERMISSION_ENUM.PROJECT_TRAINSET_CARRIAGE_TRAINSET_PANEL_DELETE,
                                    ) &&
                                        trainset.status !== TrainsetStatusEnum.PROGRESS && (
                                            <Button
                                                variant='link'
                                                onClick={() =>
                                                    handlePanelDeletion(carriage_panel.id)
                                                }
                                            >
                                                {t('action.delete')}
                                            </Button>
                                        )}

                                    {checkPermission(
                                        PERMISSION_ENUM.PROJECT_TRAINSET_CARRIAGE_TRAINSET_PANEL_COMPONENT_READ,
                                    ) && (
                                        <Link
                                            href={route(
                                                `${ROUTES.PROJECTS_TRAINSETS_CARRIAGE_TRAINSETS_CARRIAGE_PANELS_CARRIAGE_PANEL_COMPONENTS}.index`,
                                                [
                                                    trainset.project_id,
                                                    trainset.id,
                                                    carriageTrainset.id,
                                                    carriage_panel.id,
                                                ],
                                            )}
                                            className={buttonVariants({ variant: 'link' })}
                                        >
                                            Components
                                        </Link>
                                    )}

                                    {checkPermission(
                                        PERMISSION_ENUM.PROJECT_TRAINSET_CARRIAGE_TRAINSET_PANEL_MATERIAL_READ,
                                    ) && (
                                        <Link
                                            href={route(
                                                `${ROUTES.PROJECTS_TRAINSETS_CARRIAGE_TRAINSETS_CARRIAGE_PANELS_PANEL_MATERIALS}.index`,
                                                [
                                                    trainset.project_id,
                                                    trainset.id,
                                                    carriageTrainset.id,
                                                    carriage_panel.id,
                                                ],
                                            )}
                                            className={buttonVariants({ variant: 'link' })}
                                        >
                                            Materials
                                        </Link>
                                    )}

                                    {checkPermission(
                                        PERMISSION_ENUM.PROJECT_TRAINSET_CARRIAGE_TRAINSET_PANEL_PROGRESS_UPDATE,
                                    ) && (
                                        <PanelProgress
                                            progress={carriage_panel.progress}
                                            handleSyncCarriagePanel={handleSyncCarriagePanel}
                                            carriagePanel={carriage_panel}
                                        />
                                    )}
                                </TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </div>
    );
}
