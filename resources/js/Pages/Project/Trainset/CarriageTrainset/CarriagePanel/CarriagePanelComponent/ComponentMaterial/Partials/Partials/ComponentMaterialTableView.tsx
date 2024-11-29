import { Button } from '@/Components/UI/button';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/Components/UI/table';
import ComponentMaterialQty from '@/Pages/Project/Trainset/CarriageTrainset/CarriagePanel/CarriagePanelComponent/ComponentMaterial/Partials/Partials/Components/ComponentMaterialQty';
import { TrainsetStatusEnum } from '@/Support/Enums/trainsetStatusEnum';
import {
    CarriagePanelComponentResource,
    CarriagePanelResource,
    CarriageTrainsetResource,
    TrainsetResource,
} from '@/Support/Interfaces/Resources';
import { useLaravelReactI18n } from 'laravel-react-i18n';

export default function ComponentMaterialTableView({
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
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>
                            {t(
                                'pages.project.trainset.carriage_trainset.carriage_panel.carriage_panel_component.component_material.partials.partials.component_material_table.headers.material_code',
                            )}
                        </TableHead>
                        <TableHead>
                            {t(
                                'pages.project.trainset.carriage_trainset.carriage_panel.carriage_panel_component.component_material.partials.partials.component_material_table.headers.qty',
                            )}
                        </TableHead>
                        <TableHead>
                            {t(
                                'pages.project.trainset.carriage_trainset.carriage_panel.carriage_panel_component.component_material.partials.partials.component_material_table.headers.description',
                            )}
                        </TableHead>
                        <TableHead></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {carriagePanelComponent.component_materials?.map((componentMaterial) => (
                        <TableRow key={componentMaterial.id}>
                            <TableCell>{componentMaterial.raw_material?.material_code}</TableCell>
                            <TableCell>
                                {trainset.status === TrainsetStatusEnum.PROGRESS ? (
                                    <span>{componentMaterial.qty}</span>
                                ) : (
                                    <ComponentMaterialQty
                                        handleSyncCarriagePanel={handleSyncCarriagePanel}
                                        componentMaterial={componentMaterial}
                                    />
                                )}
                            </TableCell>
                            <TableCell>{componentMaterial.raw_material.description}</TableCell>
                            <TableCell>
                                {/*<Link*/}
                                {/*    className={buttonVariants({ variant: 'link' })}*/}
                                {/*    href={route(`${ROUTES.PROJECTS_TRAINSETS}.edit`, carriage_panel.id)}*/}
                                {/*>*/}
                                {/*    Edit*/}
                                {/*</Link>*/}

                                {trainset.status !== TrainsetStatusEnum.PROGRESS && (
                                    <Button
                                        variant='link'
                                        onClick={() =>
                                            handleComponentMaterialDeletion(componentMaterial.id)
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
