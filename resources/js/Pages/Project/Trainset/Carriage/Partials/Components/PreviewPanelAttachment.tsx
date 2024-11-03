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

const PreviewTrainsetAttachment = ({ trainset }: { trainset: TrainsetResource }) => {
    const [attachment, setAttachment] = useState<PanelAttachmentResource>();

    const [selectedCarriage, setSelectedCarriage] = useState<number | null>(null);

    const [selectedPanel, setSelectedPanel] = useState<number | null>(null);

    const [selectedPanelRawMaterials, setSelectedPanelRawMaterials] = useState<RawMaterialResource[]>([]);

    useEffect(() => {
        if (selectedPanel) {
            const panelAttachment = trainset.carriage_trainsets
                .find(carriage => carriage.id === selectedCarriage)
                ?.carriage_panels.find(panel => panel.id === selectedPanel)?.panel_attachment;

            setAttachment(panelAttachment);

            if (panelAttachment) {
                panelAttachmentService
                    .get(panelAttachment.id, {
                        intent: IntentEnum.WEB_PANEL_ATTACHMENT_GET_PANEL_MATERIALS_WITH_QTY,
                    })
                    .then(response => {
                        setSelectedPanelRawMaterials(response as unknown as RawMaterialResource[]);
                    });
            }
        }
    }, [selectedPanel]);

    const showSerialPanels = () => {
        if (!attachment?.serial_numbers) return;

        if (attachment?.serial_numbers?.length > 1) {
            return `${attachment?.serial_numbers[0]} - ${attachment?.serial_numbers[attachment?.serial_numbers.length - 1]}`;
        } else {
            return attachment?.serial_numbers[0];
        }
    };

    return (
        <div className="text-black dark:text-white" key={trainset.id}>
            <h1 className="text-xl font-bold">Panel Attachment</h1>
            {attachment && (
                <Link
                    className={buttonVariants({
                        className: 'my-2',
                    })}
                    href={`${route(`${ROUTES.PANEL_ATTACHMENTS}.show`, [attachment.id])}?intent=${IntentEnum.WEB_PANEL_ATTACHMENT_DOWNLOAD_PANEL_ATTACHMENT}`}
                    target="_blank"
                >
                    Download Attachment
                </Link>
            )}
            <div className="flex gap-4 mt-4">
                {trainset?.carriage_trainsets?.length > 0 && (
                    <div className="flex flex-col gap-2">
                        <InputLabel htmlFor="selected-carriage-id">Carriage</InputLabel>
                        <Select
                            value={selectedCarriage?.toString()}
                            onValueChange={value => setSelectedCarriage(+value)}
                        >
                            <SelectTrigger id="selected-carriage-id" className="w-[180px]">
                                <SelectValue placeholder="Carriage" />
                            </SelectTrigger>
                            <SelectContent>
                                {trainset.carriage_trainsets.map(carriage => (
                                    <SelectItem value={carriage.id?.toString()} key={carriage.id}>
                                        {carriage.carriage.type}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                )}

                {selectedCarriage && (
                    <div className="flex flex-col gap-2">
                        <InputLabel htmlFor="selected-panel-id">Panel</InputLabel>
                        <Select value={selectedPanel?.toString()} onValueChange={value => setSelectedPanel(+value)}>
                            <SelectTrigger id="selected-panel-id" className="w-[180px]">
                                <SelectValue placeholder="Panel" />
                            </SelectTrigger>
                            <SelectContent>
                                {trainset.carriage_trainsets
                                    .find(carriage => carriage.id === selectedCarriage)
                                    ?.carriage_panels?.map(carriagePanel => (
                                        <SelectItem value={carriagePanel.id?.toString()} key={carriagePanel.id}>
                                            {carriagePanel.panel.name}
                                        </SelectItem>
                                    ))}
                            </SelectContent>
                        </Select>
                    </div>
                )}
            </div>

            {attachment && (
                <>
                    <div className="grid grid-cols-3">
                        <div className="flex flex-col gap-3 mt-5">
                            <div className="">
                                <p className="font-bold">No Lampiran :</p>
                                <p>{attachment?.attachment_number}</p>
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
                                <p>{attachment?.formatted_created_at}</p>
                            </div>
                        </div>
                        {attachment?.qr && (
                            <div className="flex flex-col gap-3 mt-5 text-white items-center">
                                <div className="bg-white p-3">
                                    <img src={attachment.qr} alt="QR Code" width={200} />
                                </div>
                                <button className={buttonVariants()}>Cetak QR Code</button>
                            </div>
                        )}
                    </div>
                    <Separator className="h-1 my-6" />
                    <h1 className="text-xl font-bold mt-3">List Material</h1>
                    <Table>
                        <TableCaption>List Material dalam KPM</TableCaption>
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
            )}
        </div>
    );
};

export default PreviewTrainsetAttachment;
