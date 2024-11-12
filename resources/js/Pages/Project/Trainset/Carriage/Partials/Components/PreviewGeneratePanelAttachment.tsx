import { PanelAttachmentResource, TrainsetResource } from '@/Support/Interfaces/Resources';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/Components/UI/table';
import { useCallback, useEffect, useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/Components/UI/select';
import InputLabel from '@/Components/InputLabel';
import { IntentEnum } from '@/Support/Enums/intentEnum';
import { buttonVariants } from '@/Components/UI/button';
import { ROUTES } from '@/Support/Constants/routes';
import { Link } from '@inertiajs/react';
import { useLaravelReactI18n } from 'laravel-react-i18n';
import { trainsetService } from '@/Services/trainsetService';
import { PreviewGenerateAttachmentRawMaterialResource } from '@/Support/Interfaces/Others';

const PreviewGeneratePanelAttachment = ({ trainset }: { trainset: TrainsetResource }) => {
    console.log(trainset);
    const { t } = useLaravelReactI18n();

    const [attachment, setAttachment] = useState<PanelAttachmentResource>();

    const [selectedCarriage, setSelectedCarriage] = useState<number | null>(null);

    const [selectedPanel, setSelectedPanel] = useState<number | null>(null);

    const [selectedPanelRawMaterials, setSelectedPanelRawMaterials] = useState<
        PreviewGenerateAttachmentRawMaterialResource[]
    >([]);

    const fetchPanelRawMaterials = useCallback(async () => {
        if (!selectedCarriage || !selectedPanel) return;
        const res = await trainsetService.getPanelRawMaterials(trainset.id, selectedCarriage, selectedPanel);
        setSelectedPanelRawMaterials(res.data);
    }, [selectedCarriage, selectedPanel, trainset.id]);

    useEffect(() => {
        void fetchPanelRawMaterials();
    }, [fetchPanelRawMaterials]);

    return (
        <div className="text-black dark:text-white" key={trainset.id}>
            {attachment && (
                <Link
                    className={buttonVariants({
                        className: 'my-2',
                    })}
                    href={`${route(`${ROUTES.PANEL_ATTACHMENTS}.show`, [attachment.id])}?intent=${IntentEnum.WEB_PANEL_ATTACHMENT_DOWNLOAD_PANEL_ATTACHMENT}`}
                    target="_blank"
                >
                    {t(
                        'pages.project.trainset.carriage.partials.components.preview_generate_panel_attachment.buttons.download',
                    )}
                </Link>
            )}
            <div className="flex gap-4 mt-4">
                {trainset?.carriage_trainsets?.length > 0 && (
                    <div className="flex flex-col gap-2">
                        <InputLabel htmlFor="selected-carriage-id">
                            {t(
                                'pages.project.trainset.carriage.partials.components.preview_generate_panel_attachment.dialogs.fields.carriage',
                            )}
                        </InputLabel>
                        <Select
                            value={selectedCarriage?.toString()}
                            onValueChange={value => setSelectedCarriage(+value)}
                        >
                            <SelectTrigger id="selected-carriage-id" className="w-[180px]">
                                <SelectValue
                                    placeholder={t(
                                        'pages.project.trainset.carriage.partials.components.preview_generate_panel_attachment.dialogs.fields.carriage_placeholder',
                                    )}
                                />
                            </SelectTrigger>
                            <SelectContent>
                                {trainset.carriage_trainsets.map(carriageTrainset => (
                                    <SelectItem
                                        value={carriageTrainset.carriage.id?.toString()}
                                        key={carriageTrainset.id}
                                    >
                                        {carriageTrainset.carriage.type}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                )}

                {selectedCarriage && (
                    <div className="flex flex-col gap-2">
                        <InputLabel htmlFor="selected-panel-id">
                            {t(
                                'pages.project.trainset.carriage.partials.components.preview_generate_panel_attachment.dialogs.fields.panel',
                            )}
                        </InputLabel>
                        <Select value={selectedPanel?.toString()} onValueChange={value => setSelectedPanel(+value)}>
                            <SelectTrigger id="selected-panel-id" className="w-[180px]">
                                <SelectValue
                                    placeholder={t(
                                        'pages.project.trainset.carriage.partials.components.preview_generate_panel_attachment.dialogs.fields.panel_placeholder',
                                    )}
                                />
                            </SelectTrigger>
                            <SelectContent>
                                {trainset.carriage_trainsets
                                    .find(carriageTrainset => carriageTrainset.carriage.id === selectedCarriage)
                                    ?.carriage_panels?.map(carriagePanel => (
                                        <SelectItem value={carriagePanel.panel.id?.toString()} key={carriagePanel.id}>
                                            {carriagePanel.panel.name}
                                        </SelectItem>
                                    ))}
                            </SelectContent>
                        </Select>
                    </div>
                )}
            </div>

            {selectedPanelRawMaterials.length ? (
                <>
                    <h1 className="text-xl font-bold mt-3">
                        {t(
                            'pages.project.trainset.carriage.partials.components.preview_generate_panel_attachment.dialogs.headers.material_list',
                        )}
                    </h1>
                    <Table>
                        <TableCaption>
                            {t(
                                'pages.project.trainset.carriage.partials.components.preview_generate_panel_attachment.dialogs.raw_material_table.others.captions.list_material_within_attachment',
                            )}
                        </TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="">
                                    {t(
                                        'pages.project.trainset.carriage.partials.components.preview_generate_panel_attachment.dialogs.raw_material_table.headers.material_code',
                                    )}
                                </TableHead>
                                <TableHead>
                                    {t(
                                        'pages.project.trainset.carriage.partials.components.preview_generate_panel_attachment.dialogs.raw_material_table.headers.description',
                                    )}
                                </TableHead>
                                <TableHead>
                                    {t(
                                        'pages.project.trainset.carriage.partials.components.preview_generate_panel_attachment.dialogs.raw_material_table.headers.specs',
                                    )}
                                </TableHead>
                                <TableHead>
                                    {t(
                                        'pages.project.trainset.carriage.partials.components.preview_generate_panel_attachment.dialogs.raw_material_table.headers.unit',
                                    )}
                                </TableHead>
                                <TableHead>
                                    {t(
                                        'pages.project.trainset.carriage.partials.components.preview_generate_panel_attachment.dialogs.raw_material_table.headers.total_qty',
                                    )}
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {selectedPanelRawMaterials?.map(rawMaterial => (
                                <TableRow key={rawMaterial.raw_material.id}>
                                    <TableCell className="font-medium">
                                        {rawMaterial.raw_material.material_code}
                                    </TableCell>
                                    <TableCell>{rawMaterial.raw_material.description}</TableCell>
                                    <TableCell>{rawMaterial.raw_material.specs}</TableCell>
                                    <TableCell>{rawMaterial.raw_material.unit}</TableCell>
                                    <TableCell>{rawMaterial.total_qty}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </>
            ) : (
                <h1 className="text-red-500 font-bold mt-3">
                    {t(
                        'pages.project.trainset.carriage.partials.components.preview_generate_panel_attachment.dialogs.messages.no_materials',
                    )}
                </h1>
            )}
        </div>
    );
};

export default PreviewGeneratePanelAttachment;
