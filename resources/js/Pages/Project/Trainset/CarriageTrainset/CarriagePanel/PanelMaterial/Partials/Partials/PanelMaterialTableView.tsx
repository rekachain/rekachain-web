import { CarriagePanelResource, CarriageTrainsetResource, TrainsetResource } from '@/Support/Interfaces/Resources';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/Components/UI/table';
import { TrainsetStatusEnum } from '@/Support/Enums/trainsetStatusEnum';
import { Button } from '@/Components/UI/button';
import { useLaravelReactI18n } from 'laravel-react-i18n';
import PanelMaterialQty from '@/Pages/Project/Trainset/CarriageTrainset/CarriagePanel/PanelMaterial/Partials/Partials/Components/PanelMaterialQty';

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
                        <TableHead>Material</TableHead>
                        <TableHead>Qty</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {carriagePanel.panel_materials?.map(panelMaterial => (
                        <TableRow key={panelMaterial.id}>
                            <TableCell>{panelMaterial.raw_material?.material_code}</TableCell>
                            <TableCell>
                                {trainset.status === TrainsetStatusEnum.PROGRESS ? (
                                    <span>{panelMaterial.qty}</span>
                                ) : (
                                    <PanelMaterialQty
                                        handleSyncCarriagePanel={handleSyncCarriagePanel}
                                        panelMaterial={panelMaterial}
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

                                {trainset.status !== TrainsetStatusEnum.PROGRESS && (
                                    <Button
                                        variant="link"
                                        onClick={() => handlePanelMaterialDeletion(panelMaterial.id)}
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
