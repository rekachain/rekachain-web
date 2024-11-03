import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/Components/UI/table';
import { useEffect } from 'react';
import { Head } from '@inertiajs/react';
import { Separator } from '@/Components/UI/separator';
import { TrainsetAttachmentResource } from '@/Support/Interfaces/Resources';

const DocumentAttachment = ({
    trainsetAttachment,
    title,
}: {
    trainsetAttachment: TrainsetAttachmentResource;
    title: string;
}) => {
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

    return (
        <>
            <Head title={'Document Attachment'} />
            <div className="text-black dark:text-white" key={trainsetAttachment.id}>
                <h1 className="text-xl font-bold">{title}</h1>
                <div className="grid grid-cols-3">
                    <div className="flex flex-col gap-3 mt-5">
                        <div className="">
                            <p className="font-bold">No Lampiran :</p>
                            <p>{trainsetAttachment.attachment_number}</p>
                        </div>
                        <div className="">
                            <p className="font-bold">No Reservasi :</p>
                            <p>-</p>
                        </div>
                        <div className="">
                            <p className="font-bold">Serial Number :</p>
                            <p>-</p>
                        </div>
                    </div>
                    <div className="flex flex-col gap-3 mt-5">
                        <div className="">
                            <p className="font-bold">Nomor Referensi :</p>
                            <p>-</p>
                        </div>
                        <div className="">
                            <p className="font-bold">Tanggal :</p>
                            <p>{trainsetAttachment.formatted_created_at}</p>
                        </div>
                    </div>
                    {trainsetAttachment?.qr && (
                        <div className="flex flex-col gap-3 mt-5 text-white items-center">
                            <img src={trainsetAttachment.qr} alt="QR Code" width={200} />
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
                        {trainsetAttachment.raw_materials.map(rawMaterial => (
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
