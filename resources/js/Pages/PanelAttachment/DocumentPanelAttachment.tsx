import { Separator } from '@/Components/UI/separator';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/Components/UI/table';
import { panelAttachmentService } from '@/Services/panelAttachmentService';
import { IntentEnum } from '@/Support/Enums/intentEnum';
import { PanelAttachmentHandlerHandlesEnum } from '@/Support/Enums/panelAttachmentHandlerHandlesEnum';
import { PanelAttachmentResource, RawMaterialResource } from '@/Support/Interfaces/Resources';
import { Head } from '@inertiajs/react';
import { useLaravelReactI18n } from 'laravel-react-i18n';
import { useEffect, useState } from 'react';

const DocumentAttachment = ({
    panelAttachment,
    title,
}: {
    panelAttachment: PanelAttachmentResource;
    title?: string;
}) => {
    const { t } = useLaravelReactI18n();
    const [pageTitle, setPageTitle] = useState<string | undefined>(title);
    const [selectedPanelRawMaterials, setselectedPanelRawMaterials] = useState<
        RawMaterialResource[]
    >([]);

    const temporaryChangeThemeToLightMode = () => {
        document.documentElement.classList.remove('dark');
        document.documentElement.style.colorScheme = 'light';
    };

    useEffect(() => {
        panelAttachmentService
            .get(panelAttachment.id, {
                intent: IntentEnum.WEB_PANEL_ATTACHMENT_GET_PANEL_MATERIALS_WITH_QTY,
            })
            .then((response) => {
                setselectedPanelRawMaterials(response as unknown as RawMaterialResource[]);

                if (!pageTitle)
                    setPageTitle(
                        t('pages.panel_attachment.document_panel_attachment.title'),
                    );

                setTimeout(() => {
                    temporaryChangeThemeToLightMode();

                    window.onafterprint = () => {
                        history.back();
                    };
                    window.print();
                }, 500);
            });
    }, []);

    const showSerialPanels = () => {
        if (!panelAttachment?.serial_numbers) return;

        if (panelAttachment?.serial_numbers?.length > 1) {
            return `${panelAttachment?.serial_numbers[0]} - ${panelAttachment?.serial_numbers[panelAttachment?.serial_numbers.length - 1]}`;
        } else {
            return panelAttachment?.serial_numbers[0];
        }
    };
    return (
        <>
            <Head title={pageTitle} />
            <div key={panelAttachment.id} className='text-black dark:text-white'>
                <div className='flex items-center justify-center'>
                    <h1 className='text-xl font-bold'>{pageTitle}</h1>
                </div>
                <div className='grid grid-cols-3'>
                    <div className='mt-5 flex flex-col gap-3'>
                        <div className=''>
                            <p className='font-bold'>
                                {t(
                                    'pages.panel_attachment.document_panel_attachment.headers.attachment_number',
                                )}
                            </p>
                            <p>{panelAttachment.attachment_number}</p>
                        </div>
                        <div className=''>
                            <p className='font-bold'>
                                {t(
                                    'pages.panel_attachment.document_panel_attachment.headers.reservation_number',
                                )}
                            </p>
                            <p>-</p>
                        </div>
                        <div className=''>
                            <p className='font-bold'>
                                {t(
                                    'pages.panel_attachment.document_panel_attachment.headers.serial_number',
                                )}
                            </p>
                            <p>{showSerialPanels()}</p>
                        </div>
                        <div className=''>
                            <p className='font-bold'>
                                {t(
                                    'pages.panel_attachment.document_panel_attachment.headers.source_workstation',
                                )}
                            </p>
                            <p>{panelAttachment.source_workstation?.name} {panelAttachment.source_workstation?.location}, {panelAttachment.source_workstation?.workshop.name}</p>
                        </div>
                        <div className=''>
                            <p className='font-bold'>
                                {t(
                                    'pages.panel_attachment.document_panel_attachment.headers.destination_workstation',
                                )}
                            </p>
                            <p>{panelAttachment.destination_workstation?.name} {panelAttachment.destination_workstation?.location}, {panelAttachment.destination_workstation?.workshop.name}</p>
                        </div>
                        <div className=''>
                            <p className='font-bold'>
                                {t(
                                    'pages.panel_attachment.document_panel_attachment.headers.description',
                                )}
                            </p>
                            <p>{panelAttachment.carriage_panel?.panel.name} {panelAttachment?.serial_numbers?.length}{panelAttachment.carriage_panel?.carriage_trainset?.carriage.type}</p>
                        </div>
                    </div>
                    <div className='mt-5 flex flex-col gap-3'>
                        <div className=''>
                            <p className='font-bold'>
                                {t(
                                    'pages.panel_attachment.document_panel_attachment.headers.reference_number',
                                )}
                            </p>
                            <p>-</p>
                        </div>
                        <div className=''>
                            <p className='font-bold'>
                                {t('pages.panel_attachment.document_panel_attachment.headers.date')}
                            </p>
                            <p>{panelAttachment.formatted_created_at}</p>
                        </div>
                    </div>
                    {panelAttachment?.qr && (
                        <div className='mt-5 flex flex-col items-center gap-3 text-white'>
                            <img width={200} src={panelAttachment.qr} alt='QR Code' />
                        </div>
                    )}
                </div>
                <Separator className='my-6 h-1' />
                <h1 className='mt-3 text-xl font-bold'>
                    {t('pages.panel_attachment.document_panel_attachment.headers.material_list')}
                </h1>
                <Table>
                <TableHeader>
                        <TableRow className='divide-x divide-black border-black text-base'>
                            <TableHead className='text-black'>
                                {t(
                                    'pages.panel_attachment.document_panel_attachment.raw_material_table.headers.number',
                                )}
                            </TableHead>
                            <TableHead className='text-black'>
                                {t(
                                    'pages.panel_attachment.document_panel_attachment.raw_material_table.headers.material_code',
                                )}
                            </TableHead>
                            <TableHead className='text-black'>
                                {t(
                                    'pages.panel_attachment.document_panel_attachment.raw_material_table.headers.description',
                                )}
                            </TableHead>
                            <TableHead className='text-black'>
                                {t(
                                    'pages.panel_attachment.document_panel_attachment.raw_material_table.headers.specs',
                                )}
                            </TableHead>
                            <TableHead className='text-black'>
                                {t(
                                    'pages.panel_attachment.document_panel_attachment.raw_material_table.headers.total_required',
                                )}
                            </TableHead>
                            <TableHead className='text-black'>
                                {t(
                                    'pages.panel_attachment.document_panel_attachment.raw_material_table.headers.total_received',
                                )}
                            </TableHead>
                            <TableHead className='text-black'>
                                {t(
                                    'pages.panel_attachment.document_panel_attachment.raw_material_table.headers.unit',
                                )}
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {selectedPanelRawMaterials.map((rawMaterial, index) => (
                            <TableRow key={rawMaterial.id} className='divide-x divide-black border-black'>
                                <TableCell>
                                    {index+1}
                                </TableCell>
                                <TableCell className='font-medium'>
                                    {rawMaterial.material_code}
                                </TableCell>
                                <TableCell>{rawMaterial.description}</TableCell>
                                <TableCell>{rawMaterial.specs}</TableCell>
                                <TableCell>{rawMaterial.total_qty}</TableCell>
                                <TableCell></TableCell>
                                <TableCell>{rawMaterial.unit}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <div className='grid grid-cols-3 gap-4 mt-10' style={{pageBreakInside: 'avoid'}}>
                    <div className='flex flex-col items-center gap-1'>
                        <div className='w-full'>
                            <div className='border-b border-gray-500 h-10' />
                        </div>
                        <div className='w-full text-center'>
                            <p className='font-semibold'>{t('pages.panel_attachment.document_panel_attachment.props.signatures.prepare')}:</p>
                        </div>
                        <div className='w-full'>
                            <div className='border-b border-gray-500 h-32' />
                        </div>
                        {panelAttachment.panel_attachment_handlers
                            ?.filter((handler) => handler.handles === PanelAttachmentHandlerHandlesEnum.PREPARE)
                            .map((panelAttachmentHandler) => (
                                <div key={panelAttachmentHandler.id} className='w-full text-center'>
                                    <p className='font-semibold'>{panelAttachmentHandler.user?.name}</p>
                                    <p className='font-semibold'>{`(${t('pages.panel_attachment.document_panel_attachment.props.signatures.identifier')}: ${panelAttachmentHandler.user?.nip})`}</p>
                                </div>
                            ))}
                    </div>
                    <div className='flex flex-col items-center gap-1'>
                        <div className='w-full'>
                            <div className='border-b border-gray-500 h-10' />
                        </div>
                        <div className='w-full text-center'>
                            <p className='font-semibold'>{t('pages.panel_attachment.document_panel_attachment.props.signatures.send')}:</p>
                        </div>
                        <div className='w-full'>
                            <div className='border-b border-gray-500 h-32' />
                        </div>
                        {panelAttachment.panel_attachment_handlers
                            ?.filter((handler) => handler.handles === PanelAttachmentHandlerHandlesEnum.SEND)
                            .map((panelAttachmentHandler) => (
                                <div key={panelAttachmentHandler.id} className='w-full text-center'>
                                    <p className='font-semibold'>{panelAttachmentHandler.user?.name}</p>
                                    <p className='font-semibold'>{`(${t('pages.panel_attachment.document_panel_attachment.props.signatures.identifier')}: ${panelAttachmentHandler.user?.nip})`}</p>
                                </div>
                            ))}
                    </div>
                    <div className='flex flex-col items-center gap-1'>
                        <div className='w-full'>
                            <div className='border-b border-gray-500 h-10' />
                        </div>
                        <div className='w-full text-center'>
                            <p className='font-semibold'>{t('pages.panel_attachment.document_panel_attachment.props.signatures.receive')}:</p>
                        </div>
                        <div className='w-full'>
                            <div className='border-b border-gray-500 h-32' />
                        </div>
                        {panelAttachment.panel_attachment_handlers
                            ?.filter((handler) => handler.handles === PanelAttachmentHandlerHandlesEnum.RECEIVE)
                            .map((panelAttachmentHandler) => (
                                <div key={panelAttachmentHandler.id} className='w-full text-center'>
                                    <p className='font-semibold'>{panelAttachmentHandler.user?.name}</p>
                                    <p className='font-semibold'>{`(${t('pages.panel_attachment.document_panel_attachment.props.signatures.identifier')}: ${panelAttachmentHandler.user?.nip})`}</p>
                                </div>
                            ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default DocumentAttachment;
