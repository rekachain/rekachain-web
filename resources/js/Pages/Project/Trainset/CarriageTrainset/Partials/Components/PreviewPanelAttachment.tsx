import { PanelAttachmentResource, RawMaterialResource, TrainsetResource } from '@/Support/Interfaces/Resources';
import { Separator } from '@/Components/UI/separator';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/Components/UI/table';
import { useEffect, useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/Components/UI/select';
import InputLabel from '@/Components/InputLabel';
import { panelAttachmentService } from '@/Services/panelAttachmentService';
import { IntentEnum } from '@/Support/Enums/intentEnum';
import { buttonVariants } from '@/Components/UI/button';
import { ROUTES } from '@/Support/Constants/routes';
import { Link } from '@inertiajs/react';
import { useLaravelReactI18n } from 'laravel-react-i18n';
import ImportPanelCustomMaterial from '@/Pages/Project/Trainset/CarriageTrainset/Partials/Components/Components/ImportPanelCustomMaterial';
import { withLoading } from '@/Utils/withLoading';

const PreviewPanelAttachment = ({ trainset }: { trainset: TrainsetResource }) => {
    const { t } = useLaravelReactI18n();

    const [panelAttachmentAncestor, setPanelAttachmentAncestor] = useState<PanelAttachmentResource>();
    const [panelAttachment, setPanelAttachment] = useState<PanelAttachmentResource>();

    const [selectedCarriage, setSelectedCarriage] = useState<number | null>(
        Object.values(trainset?.carriage_trainsets)[0]?.carriage.id,
    );

    const [selectedPanel, setSelectedPanel] = useState<number | null>(
        Object.values(Object.values(trainset?.carriage_trainsets)[0]?.carriage_panels)[0]?.panel.id,
    );

    const [selectedPanelRawMaterials, setSelectedPanelRawMaterials] = useState<RawMaterialResource[]>([]);

    useEffect(() => {
        setSelectedAttachment(null);
        if (selectedPanel) {
            const panelAttachment = trainset.carriage_trainsets
                .find(carriageTrainset => carriageTrainset.carriage.id === selectedCarriage)
                ?.carriage_panels.find(carriagePanel => carriagePanel.panel.id === selectedPanel)?.panel_attachments[0];

            setPanelAttachmentAncestor(panelAttachment);
            setPanelAttachment(panelAttachment);

            if (panelAttachment) {
                setSelectedAttachment(panelAttachment.id);
                panelAttachmentService
                    .get(panelAttachment.id, {
                        intent: IntentEnum.WEB_PANEL_ATTACHMENT_GET_PANEL_MATERIALS_WITH_QTY,
                    })
                    .then(response => {
                        setSelectedPanelRawMaterials(response as unknown as RawMaterialResource[]);
                    });
            }
        }
    }, [selectedPanel, selectedCarriage]);

    const showSerialPanels = () => {
        if (!panelAttachmentAncestor?.serial_numbers) return;

        if (panelAttachmentAncestor?.serial_numbers?.length > 1) {
            return `${panelAttachmentAncestor?.serial_numbers[0]} - ${panelAttachmentAncestor?.serial_numbers[panelAttachmentAncestor?.serial_numbers.length - 1]}`;
        } else {
            return panelAttachmentAncestor?.serial_numbers[0];
        }
    };

    const openImageAndPrint = (imageUrl: string) => {
        const newWindow = window.open(imageUrl, '_blank');
        if (newWindow) {
            newWindow.onload = () => {
                newWindow.onafterprint = () => {
                    newWindow.close();
                };
                newWindow.print();
            };
        }
    };

    const [selectedAttachment, setSelectedAttachment] = useState<number | null>(panelAttachmentAncestor?.id || null);

    const loadAttachment = withLoading(async () => {
        if (selectedAttachment) {
            const attachment = await panelAttachmentService.get(selectedAttachment);
            setPanelAttachment(attachment);
            if (attachment) {
                panelAttachmentService
                    .get(attachment.id, {
                        intent: IntentEnum.WEB_PANEL_ATTACHMENT_GET_PANEL_MATERIALS_WITH_QTY,
                    })
                    .then(response => {
                        setSelectedPanelRawMaterials(response as unknown as RawMaterialResource[]);
                    });
            }
        }
    });

    useEffect(() => {
        loadAttachment();
    }, [selectedAttachment]);

    return (
        <div className="text-black dark:text-white" key={trainset.id}>
            <h1 className="text-xl font-bold">
                {t(
                    'pages.project.trainset.carriage_trainset.partials.components.preview_panel_attachment.dialogs.title',
                )}
            </h1>
            {panelAttachmentAncestor && (
                <div className="flex gap-4 my-4">
                    <Link
                        className={buttonVariants()}
                        href={`${route(`${ROUTES.PANEL_ATTACHMENTS}.show`, [panelAttachmentAncestor.id])}?intent=${IntentEnum.WEB_PANEL_ATTACHMENT_DOWNLOAD_PANEL_ATTACHMENT}`}
                        target="_blank"
                    >
                        {t(
                            'pages.project.trainset.carriage_trainset.partials.components.preview_panel_attachment.buttons.download',
                        )}
                    </Link>
                    <ImportPanelCustomMaterial
                        panelAttachment={panelAttachment ? panelAttachment : panelAttachmentAncestor}
                    />
                </div>
            )}
            <div className="flex gap-4 mt-4">
                {trainset?.carriage_trainsets?.length > 0 && (
                    <div className="flex flex-col gap-2">
                        <InputLabel htmlFor="selected-carriage-id">
                            {t(
                                'pages.project.trainset.carriage_trainset.partials.components.preview_panel_attachment.dialogs.fields.carriage',
                            )}
                        </InputLabel>
                        <Select
                            value={selectedCarriage?.toString()}
                            onValueChange={value => setSelectedCarriage(+value)}
                        >
                            <SelectTrigger id="selected-carriage-id" className="w-[180px]">
                                <SelectValue
                                    placeholder={t(
                                        'pages.project.trainset.carriage_trainset.partials.components.preview_panel_attachment.dialogs.fields.carriage_placeholder',
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
                                'pages.project.trainset.carriage_trainset.partials.components.preview_panel_attachment.dialogs.fields.panel',
                            )}
                        </InputLabel>
                        <Select value={selectedPanel?.toString()} onValueChange={value => setSelectedPanel(+value)}>
                            <SelectTrigger id="selected-panel-id" className="w-[180px]">
                                <SelectValue
                                    placeholder={t(
                                        'pages.project.trainset.carriage_trainset.partials.components.preview_panel_attachment.dialogs.fields.panel_placeholder',
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

                {panelAttachmentAncestor?.is_parent && (
                    <div className="flex flex-col gap-2">
                        <InputLabel htmlFor="selected-panel-id">{'reference min🗿'}</InputLabel>
                        <Select
                            value={selectedAttachment?.toString()}
                            onValueChange={value => setSelectedAttachment(+value)}
                        >
                            <SelectTrigger id="selected-carriage-id" className="w-[180px]">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem
                                    value={panelAttachmentAncestor.id.toString()}
                                    key={panelAttachmentAncestor.id}
                                >
                                    {panelAttachmentAncestor.attachment_number}
                                </SelectItem>
                                {panelAttachmentAncestor.childs?.map(childAttachment => (
                                    <SelectItem value={childAttachment.id?.toString()} key={childAttachment.id}>
                                        {childAttachment.attachment_number}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                )}
            </div>

            {panelAttachment ? (
                <>
                    <div className="grid grid-cols-3">
                        <div className="flex flex-col gap-3 mt-5">
                            <div className="">
                                <p className="font-bold">
                                    {t(
                                        'pages.project.trainset.carriage_trainset.partials.components.preview_panel_attachment.dialogs.headers.attachment_number',
                                    )}
                                </p>
                                <p>{panelAttachment?.attachment_number}</p>
                            </div>
                            <div className="">
                                <p className="font-bold">
                                    {t(
                                        'pages.project.trainset.carriage_trainset.partials.components.preview_panel_attachment.dialogs.headers.reservation_number',
                                    )}
                                </p>
                                <p>-</p>
                            </div>
                            <div className="">
                                <p className="font-bold">
                                    {t(
                                        'pages.project.trainset.carriage_trainset.partials.components.preview_panel_attachment.dialogs.headers.serial_number',
                                    )}
                                </p>
                                <p>{showSerialPanels()}</p>
                            </div>
                        </div>
                        <div className="flex flex-col gap-3 mt-5">
                            <div className="">
                                <p className="font-bold">
                                    {t(
                                        'pages.project.trainset.carriage_trainset.partials.components.preview_panel_attachment.dialogs.headers.reference_number',
                                    )}
                                </p>
                                <p>{panelAttachment.parent?.attachment_number ?? '-'}</p>
                            </div>
                            <div className="">
                                <p className="font-bold">
                                    {t(
                                        'pages.project.trainset.carriage_trainset.partials.components.preview_panel_attachment.dialogs.headers.date',
                                    )}
                                </p>
                                <p>{panelAttachment?.formatted_created_at}</p>
                            </div>
                        </div>
                        {panelAttachment?.qr && (
                            <div className="flex flex-col gap-3 mt-5 text-white items-center">
                                <div className="bg-white p-3">
                                    <img src={panelAttachment.qr} alt="QR Code" width={200} />
                                </div>
                                <button
                                    className={buttonVariants()}
                                    onClick={() => openImageAndPrint(panelAttachment.qr!)}
                                >
                                    {t(
                                        'pages.project.trainset.carriage_trainset.partials.components.preview_panel_attachment.dialogs.buttons.print_qr',
                                    )}
                                </button>
                            </div>
                        )}
                    </div>
                    <Separator className="h-1 my-6" />
                    <h1 className="text-xl font-bold mt-3">
                        {t(
                            'pages.project.trainset.carriage_trainset.partials.components.preview_panel_attachment.dialogs.headers.material_list',
                        )}
                    </h1>
                    <Table>
                        <TableCaption>
                            {t(
                                'pages.project.trainset.carriage_trainset.partials.components.preview_panel_attachment.dialogs.raw_material_table.others.captions.list_material_within_attachment',
                            )}
                        </TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="">
                                    {t(
                                        'pages.project.trainset.carriage_trainset.partials.components.preview_panel_attachment.dialogs.raw_material_table.headers.material_code',
                                    )}
                                </TableHead>
                                <TableHead>
                                    {t(
                                        'pages.project.trainset.carriage_trainset.partials.components.preview_panel_attachment.dialogs.raw_material_table.headers.description',
                                    )}
                                </TableHead>
                                <TableHead>
                                    {t(
                                        'pages.project.trainset.carriage_trainset.partials.components.preview_panel_attachment.dialogs.raw_material_table.headers.specs',
                                    )}
                                </TableHead>
                                <TableHead>
                                    {t(
                                        'pages.project.trainset.carriage_trainset.partials.components.preview_panel_attachment.dialogs.raw_material_table.headers.unit',
                                    )}
                                </TableHead>
                                <TableHead>
                                    {t(
                                        'pages.project.trainset.carriage_trainset.partials.components.preview_panel_attachment.dialogs.raw_material_table.headers.total_qty',
                                    )}
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {selectedPanelRawMaterials?.map(rawMaterial => (
                                <TableRow key={rawMaterial.id}>
                                    <TableCell className="font-medium">{rawMaterial.material_code}</TableCell>
                                    <TableCell>{rawMaterial.description}</TableCell>
                                    <TableCell>{rawMaterial.specs}</TableCell>
                                    <TableCell>{rawMaterial.unit}</TableCell>
                                    <TableCell>{rawMaterial.total_qty}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </>
            ) : (
                <h1 className="text-red-500 font-bold mt-3">
                    {t(
                        'pages.project.trainset.carriage_trainset.partials.components.preview_panel_attachment.dialogs.messages.no_attachments',
                    )}
                </h1>
            )}
        </div>
    );
};

export default PreviewPanelAttachment;