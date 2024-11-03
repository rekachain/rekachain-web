import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/Components/UI/table';
import { useEffect, useState } from 'react';
import { Head } from '@inertiajs/react';
import { Separator } from '@/Components/UI/separator';
import { PanelAttachmentResource, RawMaterialResource } from '@/Support/Interfaces/Resources';
import { panelAttachmentService } from '@/Services/panelAttachmentService';
import { IntentEnum } from '@/Support/Enums/intentEnum';

const DocumentAttachment = ({
    panelAttachment,
    title,
}: {
    panelAttachment: PanelAttachmentResource;
    title: string;
}) => {
    const [selectedPanelRawMaterials, setSelectedPanelRawMaterials] = useState<RawMaterialResource[]>([]);

    const temporaryChangeThemeToLightMode = () => {
        document.documentElement.classList.remove('dark');
        document.documentElement.style.colorScheme = 'light';
    };

    useEffect(() => {
        setTimeout(() => {
            temporaryChangeThemeToLightMode();

            window.onafterprint = () => {
                history.back();
            };
            window.print();
        }, 500);
    }, []);

    useEffect(() => {
        panelAttachmentService
            .get(panelAttachment.id, {
                intent: IntentEnum.WEB_PANEL_ATTACHMENT_GET_PANEL_MATERIALS_WITH_QTY,
            })
            .then(response => {
                setSelectedPanelRawMaterials(response as unknown as RawMaterialResource[]);
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
            <Head title={'Document Panel Attachment'} />
            <div className="text-black dark:text-white" key={panelAttachment.id}>
                <h1 className="text-xl font-bold">{title}</h1>
                <div className="grid grid-cols-3">
                    <div className="flex flex-col gap-3 mt-5">
                        <div className="">
                            <p className="font-bold">No Lampiran :</p>
                            <p>{panelAttachment.attachment_number}</p>
                        </div>
                        <div className="">
                            <p className="font-bold">No Reservasi :</p>
                            <p>-</p>
                        </div>
                        <div className="">
                            <p className="font-bold">Serial Number :</p>
                            <p>{showSerialPanels()}</p>
                        </div>
                    </div>
                    <div className="flex flex-col gap-3 mt-5">
                        <div className="">
                            <p className="font-bold">Nomor Referensi :</p>
                            <p>-</p>
                        </div>
                        <div className="">
                            <p className="font-bold">Tanggal :</p>
                            <p>{panelAttachment.formatted_created_at}</p>
                        </div>
                    </div>
                    {panelAttachment?.qr && (
                        <div className="flex flex-col gap-3 mt-5 text-white items-center">
                            <img src={panelAttachment.qr} alt="QR Code" width={200} />
                        </div>
                    )}
                </div>
                <Separator className="h-1 my-6" />
                <h1 className="text-xl font-bold mt-3">List Material</h1>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="">Kode Material</TableHead>
                            <TableHead>Deskripsi</TableHead>
                            <TableHead>Spesifikasi</TableHead>
                            <TableHead>Unit</TableHead>
                            <TableHead>Jumlah</TableHead>
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
