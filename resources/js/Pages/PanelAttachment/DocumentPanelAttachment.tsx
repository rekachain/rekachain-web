import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/Components/UI/table';
import { useEffect, useState } from 'react';
import { Head } from '@inertiajs/react';
import { Separator } from '@/Components/UI/separator';
import { PanelAttachmentResource, RawMaterialResource } from '@/Support/Interfaces/Resources';
import { panelAttachmentService } from '@/Services/panelAttachmentService';
import { IntentEnum } from '@/Support/Enums/intentEnum';
import { useLaravelReactI18n } from 'laravel-react-i18n';

const DocumentAttachment = ({
    panelAttachment,
    title,
}: {
    panelAttachment: PanelAttachmentResource;
    title?: string;
}) => {
    const { t } = useLaravelReactI18n();
    const [pageTitle, setPageTitle] = useState<string | undefined>(title);
    const [selectedPanelRawMaterials, setselectedPanelRawMaterials] = useState<RawMaterialResource[]>([]);

    const temporaryChangeThemeToLightMode = () => {
        document.documentElement.classList.remove('dark');
        document.documentElement.style.colorScheme = 'light';
    };

    useEffect(() => {
        panelAttachmentService
            .get(panelAttachment.id, {
                intent: IntentEnum.WEB_PANEL_ATTACHMENT_GET_PANEL_MATERIALS_WITH_QTY,
            })
            .then(response => {
                setselectedPanelRawMaterials(response as unknown as RawMaterialResource[]);

                if (!pageTitle)
                    setPageTitle(t('pages.panel_attachment.document_panel_attachment.headers.kpm_assembly'));

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
            <div key={panelAttachment.id} className="text-black dark:text-white">
                <h1 className="text-xl font-bold">{pageTitle}</h1>
                <div className="grid grid-cols-3">
                    <div className="flex flex-col gap-3 mt-5">
                        <div className="">
                            <p className="font-bold">
                                {t('pages.panel_attachment.document_panel_attachment.headers.attachment_number')}
                            </p>
                            <p>{panelAttachment.attachment_number}</p>
                        </div>
                        <div className="">
                            <p className="font-bold">
                                {t('pages.panel_attachment.document_panel_attachment.headers.reservation_number')}
                            </p>
                            <p>-</p>
                        </div>
                        <div className="">
                            <p className="font-bold">
                                {t('pages.panel_attachment.document_panel_attachment.headers.serial_number')}
                            </p>
                            <p>{showSerialPanels()}</p>
                        </div>
                    </div>
                    <div className="flex flex-col gap-3 mt-5">
                        <div className="">
                            <p className="font-bold">
                                {t('pages.panel_attachment.document_panel_attachment.headers.reference_number')}
                            </p>
                            <p>-</p>
                        </div>
                        <div className="">
                            <p className="font-bold">
                                {t('pages.panel_attachment.document_panel_attachment.headers.date')}
                            </p>
                            <p>{panelAttachment.formatted_created_at}</p>
                        </div>
                    </div>
                    {panelAttachment?.qr && (
                        <div className="flex flex-col gap-3 mt-5 text-white items-center">
                            <img width={200} src={panelAttachment.qr} alt="QR Code" />
                        </div>
                    )}
                </div>
                <Separator className="h-1 my-6" />
                <h1 className="text-xl font-bold mt-3">
                    {t('pages.panel_attachment.document_panel_attachment.headers.material_list')}
                </h1>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>
                                {t(
                                    'pages.panel_attachment.document_panel_attachment.raw_material_table.headers.material_code',
                                )}
                            </TableHead>
                            <TableHead>
                                {t(
                                    'pages.panel_attachment.document_panel_attachment.raw_material_table.headers.description',
                                )}
                            </TableHead>
                            <TableHead>
                                {t('pages.panel_attachment.document_panel_attachment.raw_material_table.headers.specs')}
                            </TableHead>
                            <TableHead>
                                {t('pages.panel_attachment.document_panel_attachment.raw_material_table.headers.unit')}
                            </TableHead>
                            <TableHead>
                                {t(
                                    'pages.panel_attachment.document_panel_attachment.raw_material_table.headers.total_qty',
                                )}
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {selectedPanelRawMaterials.map(rawMaterial => (
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
            </div>
        </>
    );
};

export default DocumentAttachment;
