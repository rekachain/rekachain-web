import { Button } from '@/Components/UI/button';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/Components/UI/table';
import { checkPermission } from '@/Helpers/permissionHelper';
import PanelMaterialQty from '@/Pages/Project/Trainset/CarriageTrainset/CarriagePanel/PanelMaterial/Partials/Partials/Components/PanelMaterialQty';
import { PERMISSION_ENUM } from '@/Support/Enums/permissionEnum';
import { TrainsetStatusEnum } from '@/Support/Enums/trainsetStatusEnum';
import {
    CarriagePanelResource,
    CarriageTrainsetResource,
    TrainsetResource,
} from '@/Support/Interfaces/Resources';
import { useLaravelReactI18n } from 'laravel-react-i18n';

export default function PanelMaterialTableView({
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
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>
                            {t(
                                'pages.project.trainset.carriage_trainset.carriage_panel.panel_material.partials.partials.panel_material_table.headers.material_code',
                            )}
                        </TableHead>
                        <TableHead>
                            {t(
                                'pages.project.trainset.carriage_trainset.carriage_panel.panel_material.partials.partials.panel_material_table.headers.qty',
                            )}
                        </TableHead>
                        <TableHead>
                            {t(
                                'pages.project.trainset.carriage_trainset.carriage_panel.panel_material.partials.partials.panel_material_table.headers.description',
                            )}
                        </TableHead>
                        <TableHead></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {carriagePanel.panel_materials?.map((panelMaterial) => (
                        <TableRow key={panelMaterial.id}>
                            <TableCell>{panelMaterial.raw_material?.material_code}</TableCell>
                            <TableCell>
                                {trainset.status === TrainsetStatusEnum.PROGRESS ? (
                                    <span>{panelMaterial.qty}</span>
                                ) : (
                                    <PanelMaterialQty
                                        panelMaterial={panelMaterial}
                                        handleSyncCarriagePanel={handleSyncCarriagePanel}
                                    />
                                )}
                            </TableCell>
                            <TableCell>{panelMaterial.raw_material.description}</TableCell>
                            <TableCell>
                                {/*<Link*/}
                                {/*    className={buttonVariants({ variant: 'link' })}*/}
                                {/*    href={route(`${ROUTES.PROJECTS_TRAINSETS}.edit`, carriage_panel.id)}*/}
                                {/*>*/}
                                {/*    Edit*/}
                                {/*</Link>*/}

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
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
