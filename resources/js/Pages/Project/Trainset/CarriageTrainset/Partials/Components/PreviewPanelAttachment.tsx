import InputLabel from '@/Components/InputLabel';
import { buttonVariants } from '@/Components/UI/button';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/Components/UI/select';
import { Separator } from '@/Components/UI/separator';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/Components/UI/table';
import { checkPermission } from '@/Helpers/permissionHelper';
import ImportPanelCustomMaterial from '@/Pages/Project/Trainset/CarriageTrainset/Partials/Components/Components/ImportPanelCustomMaterial';
import { panelAttachmentService } from '@/Services/panelAttachmentService';
import { ROUTES } from '@/Support/Constants/routes';
import { IntentEnum } from '@/Support/Enums/intentEnum';
import { PERMISSION_ENUM } from '@/Support/Enums/permissionEnum';
import {
    PanelAttachmentHandlerResource,
    PanelAttachmentResource,
    RawMaterialResource,
    TrainsetResource,
} from '@/Support/Interfaces/Resources';
import { withLoading } from '@/Utils/withLoading';
import { Link } from '@inertiajs/react';
import { useLaravelReactI18n } from 'laravel-react-i18n';
import { useEffect, useState } from 'react';

const PreviewPanelAttachment = ({ trainset }: { trainset: TrainsetResource }) => {
    const { t } = useLaravelReactI18n();

    const [panelAttachmentAncestor, setPanelAttachmentAncestor] =
        useState<PanelAttachmentResource>();
    const [panelAttachment, setPanelAttachment] = useState<PanelAttachmentResource>();
    const [panelAttachmentHandlers, setPanelAttachmentHandlers] =
        useState<PanelAttachmentHandlerResource[]>();

    const [selectedCarriage, setSelectedCarriage] = useState<number | null>(
        Object.values(trainset?.carriage_trainsets)[0]?.carriage.id,
    );

    const [selectedPanel, setSelectedPanel] = useState<number | null>(
        Object.values(Object.values(trainset?.carriage_trainsets)[0]?.carriage_panels)[0]?.panel.id,
    );

    const [selectedPanelRawMaterials, setSelectedPanelRawMaterials] = useState<
        RawMaterialResource[]
    >([]);

    useEffect(() => {
        setSelectedAttachment(null);
        if (selectedPanel) {
            const panelAttachment = trainset.carriage_trainsets
                .find((carriageTrainset) => carriageTrainset.carriage.id === selectedCarriage)
                ?.carriage_panels.find((carriagePanel) => carriagePanel.panel.id === selectedPanel)
                ?.panel_attachments[0];

            setPanelAttachmentAncestor(panelAttachment);
            setPanelAttachment(panelAttachment);

            if (panelAttachment) {
                setSelectedAttachment(panelAttachment.id);
                panelAttachmentService
                    .get(panelAttachment.id, {
                        intent: IntentEnum.WEB_PANEL_ATTACHMENT_GET_PANEL_MATERIALS_WITH_QTY,
                    })
                    .then((response) => {
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

    const [selectedAttachment, setSelectedAttachment] = useState<number | null>(
        panelAttachmentAncestor?.id || null,
    );

    const loadAttachment = withLoading(async () => {
        if (selectedAttachment) {
            const attachment = await panelAttachmentService.get(selectedAttachment);
            setPanelAttachment(attachment);
            if (attachment) {
                loadAttachmentHandlers(attachment);
                panelAttachmentService
                    .get(attachment.id, {
                        intent: IntentEnum.WEB_PANEL_ATTACHMENT_GET_PANEL_MATERIALS_WITH_QTY,
                    })
                    .then((response) => {
                        setSelectedPanelRawMaterials(response as unknown as RawMaterialResource[]);
                    });
            }
        }
    });

    const loadAttachmentHandlers = withLoading(async (attachment: PanelAttachmentResource) => {
        const handlers = (await panelAttachmentService.get(attachment.id, {
            intent: IntentEnum.WEB_PANEL_ATTACHMENT_GET_ATTACHMENT_HANDLERS,
        })) as unknown as PanelAttachmentHandlerResource[];
        setPanelAttachmentHandlers(handlers);
    });

    useEffect(() => {
        loadAttachment();
    }, [selectedAttachment]);

    return (
        <div key={trainset.id} className='text-black dark:text-white'>
            <div className="flex justify-between">
                <div className="">
                    <h1 className='text-xl font-bold'>
                        {t(
                            'pages.project.trainset.carriage_trainset.partials.components.preview_panel_attachment.dialogs.title',
                        )}
                    </h1>
                    {panelAttachmentAncestor && (
                        <div className='my-4 flex flex-col gap-4 md:flex-row'>
                            {checkPermission(PERMISSION_ENUM.PANEL_ATTACHMENT_DOWNLOAD) && (
                                <Link
                                    target='_blank'
                                    href={`${route(`${ROUTES.PANEL_ATTACHMENTS}.show`, [panelAttachmentAncestor.id])}?intent=${IntentEnum.WEB_PANEL_ATTACHMENT_DOWNLOAD_PANEL_ATTACHMENT}`}
                                    className={buttonVariants()}
                                >
                                    {t(
                                        'pages.project.trainset.carriage_trainset.partials.components.preview_panel_attachment.buttons.download',
                                    )}
                                </Link>
                            )}
                            {checkPermission(PERMISSION_ENUM.PANEL_ATTACHMENT_IMPORT) && (
                                <ImportPanelCustomMaterial
                                    panelAttachment={
                                        panelAttachment ? panelAttachment : panelAttachmentAncestor
                                    }
                                />
                            )}
                        </div>
                    )}
                </div>
                <div className='mt-4 flex items-center gap-4 md:flex md:items-start'>
                    {trainset?.carriage_trainsets?.length > 0 && (
                        <div className='flex flex-col gap-2'>
                            <InputLabel htmlFor='selected-carriage-id'>
                                {t(
                                    'pages.project.trainset.carriage_trainset.partials.components.preview_panel_attachment.dialogs.fields.carriage',
                                )}
                            </InputLabel>
                            <Select
                                value={selectedCarriage?.toString()}
                                onValueChange={(value) => setSelectedCarriage(+value)}
                            >
                                <SelectTrigger id='selected-carriage-id' className='w-[180px]'>
                                    <SelectValue
                                        placeholder={t(
                                            'pages.project.trainset.carriage_trainset.partials.components.preview_panel_attachment.dialogs.fields.carriage_placeholder',
                                        )}
                                    />
                                </SelectTrigger>
                                <SelectContent>
                                    {trainset.carriage_trainsets.map((carriageTrainset) => (
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
                        <div className='flex flex-col gap-2'>
                            <InputLabel htmlFor='selected-panel-id'>
                                {t(
                                    'pages.project.trainset.carriage_trainset.partials.components.preview_panel_attachment.dialogs.fields.panel',
                                )}
                            </InputLabel>
                            <Select
                                value={selectedPanel?.toString()}
                                onValueChange={(value) => setSelectedPanel(+value)}
                            >
                                <SelectTrigger id='selected-panel-id' className='w-[180px]'>
                                    <SelectValue
                                        placeholder={t(
                                            'pages.project.trainset.carriage_trainset.partials.components.preview_panel_attachment.dialogs.fields.panel_placeholder',
                                        )}
                                    />
                                </SelectTrigger>
                                <SelectContent>
                                    {trainset.carriage_trainsets
                                        .find(
                                            (carriageTrainset) =>
                                                carriageTrainset.carriage.id === selectedCarriage,
                                        )
                                        ?.carriage_panels?.map((carriagePanel) => (
                                            <SelectItem
                                                value={carriagePanel.panel.id?.toString()}
                                                key={carriagePanel.id}
                                            >
                                                {carriagePanel.panel.name}
                                            </SelectItem>
                                        ))}
                                </SelectContent>
                            </Select>
                        </div>
                    )}

                    {panelAttachmentAncestor?.is_parent && (
                        <div className='flex flex-col gap-2'>
                            <InputLabel htmlFor='selected-panel-id'>{'reference min🗿'}</InputLabel>
                            <Select
                                value={selectedAttachment?.toString()}
                                onValueChange={(value) => setSelectedAttachment(+value)}
                            >
                                <SelectTrigger id='selected-carriage-id' className='w-[180px]'>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem
                                        value={panelAttachmentAncestor.id.toString()}
                                        key={panelAttachmentAncestor.id}
                                    >
                                        {panelAttachmentAncestor.attachment_number}
                                    </SelectItem>
                                    {panelAttachmentAncestor.childs?.map((childAttachment) => (
                                        <SelectItem
                                            value={childAttachment.id?.toString()}
                                            key={childAttachment.id}
                                        >
                                            {childAttachment.attachment_number}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    )}
                </div>
            </div>

            {panelAttachment ? (
                <>
                    <div className='grid grid-cols-1 md:grid-cols-3'>
                        <div className='mt-5 flex flex-col gap-3'>
                            <div className=''>
                                <p className='font-bold'>
                                    {t(
                                        'pages.project.trainset.carriage_trainset.partials.components.preview_panel_attachment.dialogs.headers.attachment_number',
                                    )}
                                </p>
                                <p>{panelAttachment?.attachment_number}</p>
                            </div>
                            <div className=''>
                                <p className='font-bold'>
                                    {t(
                                        'pages.project.trainset.carriage_trainset.partials.components.preview_panel_attachment.dialogs.headers.reservation_number',
                                    )}
                                </p>
                                <p>-</p>
                            </div>
                            <div className='mb-2'>
                                <p className='font-bold'>
                                    {t(
                                        'pages.project.trainset.carriage_trainset.partials.components.preview_panel_attachment.dialogs.headers.serial_number',
                                    )}
                                </p>
                                <p>{showSerialPanels()}</p>
                            </div>
                            {panelAttachmentHandlers && panelAttachmentHandlers.length > 0 && (
                                <>
                                    <p className='text-lg font-bold'>
                                        {t(
                                            'pages.project.trainset.carriage_trainset.partials.components.preview_panel_attachment.dialogs.headers.handlers',
                                        )}
                                    </p>
                                    {panelAttachmentHandlers.map((handler) => (
                                        <div key={handler.id} className='flex items-center gap-1'>
                                            <span className='font-bold'>
                                                {handler.localized_handles}
                                            </span>
                                            <span className=''>:</span>
                                            <span className=''>
                                                {handler.user?.nip} - {handler.user?.name}
                                            </span>
                                        </div>
                                    ))}
                                </>
                            )}
                        </div>
                        <div className='mt-5 flex flex-col gap-3'>
                            <div className=''>
                                <p className='font-bold'>
                                    {t(
                                        'pages.project.trainset.carriage_trainset.partials.components.preview_panel_attachment.dialogs.headers.reference_number',
                                    )}
                                </p>
                                <p>{panelAttachment.parent?.attachment_number ?? '-'}</p>
                            </div>
                            <div className=''>
                                <p className='font-bold'>
                                    {t(
                                        'pages.project.trainset.carriage_trainset.partials.components.preview_panel_attachment.dialogs.headers.date',
                                    )}
                                </p>
                                <p>{panelAttachment?.formatted_created_at}</p>
                            </div>
                        </div>
                        {panelAttachment?.qr && (
                            <div className='mt-5 flex flex-col items-center gap-3 text-white'>
                                <div className='bg-white p-3'>
                                    <img width={200} src={panelAttachment.qr} alt='QR Code' />
                                </div>
                                <button
                                    onClick={() => openImageAndPrint(panelAttachment.qr!)}
                                    className={buttonVariants()}
                                >
                                    {t(
                                        'pages.project.trainset.carriage_trainset.partials.components.preview_panel_attachment.dialogs.buttons.print_qr',
                                    )}
                                </button>
                            </div>
                        )}
                    </div>
                    <Separator className='my-6 h-1' />
                    <h1 className='mt-3 text-xl font-bold'>
                        {t(
                            'pages.project.trainset.carriage_trainset.partials.components.preview_panel_attachment.dialogs.headers.material_list',
                        )}
                    </h1>
                    <div className='hidden md:block'>
                        <Table wrapperClassName='block max-h-96'>
                            <TableCaption>
                                {t(
                                    'pages.project.trainset.carriage_trainset.partials.components.preview_panel_attachment.dialogs.raw_material_table.others.captions.list_material_within_attachment',
                                )}
                            </TableCaption>
                            <TableHeader className='dark:bg-background-dark sticky top-0 bg-background'>
                                <TableRow>
                                    <TableHead className=''>
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
                                {selectedPanelRawMaterials?.map((rawMaterial) => (
                                    <TableRow key={rawMaterial.id}>
                                        <TableCell className='font-medium'>
                                            {rawMaterial.material_code}
                                        </TableCell>
                                        <TableCell>{rawMaterial.description}</TableCell>
                                        <TableCell>{rawMaterial.specs}</TableCell>
                                        <TableCell>{rawMaterial.unit}</TableCell>
                                        <TableCell>{rawMaterial.total_qty}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                    <div className='grid grid-cols-1 gap-2 md:hidden'>
                        {selectedPanelRawMaterials.map((rawMaterial) => (
                            <div
                                // key={permission.id}
                                className='flex flex-col gap-2 rounded-md border-2 border-black p-2 dark:border-white'
                            >
                                <div className='items-scenter flex w-full justify-between'>
                                    <h4 className='text-base font-bold'>
                                        {rawMaterial.material_code}
                                    </h4>
                                    <h5 className='items-center text-base font-bold'>
                                        Unit : {rawMaterial.unit}
                                    </h5>
                                </div>
                                {/* <h4 className="font-bold text-xl">{permission.group}</h4> */}
                                {/* <h4 className="font-bold text-xl">50349259</h4> */}
                                {/* <h4 className="text-md">{permission.name}</h4> */}
                                <h4 className='w-[80%] text-sm'>{rawMaterial.description}</h4>
                                <div className='flex w-full items-center justify-end'>
                                    <Link
                                        href={route(`${ROUTES.RAW_MATERIALS}.edit`, rawMaterial.id)}
                                        className={buttonVariants({ variant: 'link' })}
                                    >
                                        {t('action.edit')}
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            ) : (
                <h1 className='mt-3 font-bold text-red-500'>
                    {t(
                        'pages.project.trainset.carriage_trainset.partials.components.preview_panel_attachment.dialogs.messages.no_attachments',
                    )}
                </h1>
            )}
        </div>
    );
};

export default PreviewPanelAttachment;
