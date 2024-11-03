import { TrainsetAttachmentResource } from '@/Support/Interfaces/Resources';
import { buttonVariants } from '@/Components/UI/button';
import { Separator } from '@/Components/UI/separator';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/Components/UI/table';

const PreviewTrainsetAttachment = ({
    attachment,
    title,
}: {
    attachment: TrainsetAttachmentResource;
    title: string;
}) => {
    return (
        <div className="text-black dark:text-white" key={attachment.id}>
            <h1 className="text-xl font-bold">{title}</h1>
            <div className="grid grid-cols-3">
                <div className="flex flex-col gap-3 mt-5">
                    <div className="">
                        <p className="font-bold">No Lampiran :</p>
                        <p>{attachment.attachment_number}</p>
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
                        <p>{attachment.formatted_created_at}</p>
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
                    {attachment.raw_materials.map(rawMaterial => (
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
    );
};

export default PreviewTrainsetAttachment;
