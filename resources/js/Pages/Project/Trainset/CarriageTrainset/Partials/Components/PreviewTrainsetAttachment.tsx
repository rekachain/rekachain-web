import { TrainsetAttachmentResource } from '@/Support/Interfaces/Resources';
import { buttonVariants } from '@/Components/UI/button';
import { Separator } from '@/Components/UI/separator';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/Components/UI/table';
import { ROUTES } from '@/Support/Constants/routes';
import { Link } from '@inertiajs/react';
import { IntentEnum } from '@/Support/Enums/intentEnum';
import { useLaravelReactI18n } from 'laravel-react-i18n';
import ImportTrainsetCustomMaterial from '@/Pages/Project/Trainset/CarriageTrainset/Partials/Components/Components/ImportTrainsetCustomMaterial';
import { useEffect, useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/Components/UI/select';
import { trainsetAttachmentService } from '@/Services/trainsetAttachmentService';
import { withLoading } from '@/Utils/withLoading';

const PreviewTrainsetAttachment = ({
    attachment,
    title,
}: {
    attachment: TrainsetAttachmentResource;
    title: string;
}) => {
    const { t } = useLaravelReactI18n();
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

    const [trainsetAttachment, setTrainsetAttachment] = useState<TrainsetAttachmentResource>(attachment);
    const [selectedAttachment, setSelectedAttachment] = useState<number | null>(attachment.id);

    const loadAttachment = withLoading(async () => {
        if (selectedAttachment) {
            const attachment = await trainsetAttachmentService.get(selectedAttachment, {
                intent: IntentEnum.WEB_TRAINSET_ATTACHMENT_GET_COMPONENT_MATERIALS_WITH_QTY,
            });
            setTrainsetAttachment(attachment);
        }
    });

    useEffect(() => {
        loadAttachment();
    }, [selectedAttachment]);

    return (
        <div key={attachment.id} className="text-black dark:text-white">
            <h1 className="text-xl font-bold">{title}</h1>
            <div className="flex gap-4 my-4">
                <Link
                    target="_blank"
                    href={`${route(`${ROUTES.TRAINSET_ATTACHMENTS}.show`, [attachment.id])}?intent=${IntentEnum.WEB_TRAINSET_ATTACHMENT_DOWNLOAD_TRAINSET_ATTACHMENT}`}
                    className={buttonVariants()}
                >
                    {t(
                        'pages.project.trainset.carriage_trainset.partials.components.preview_trainset_attachment.buttons.download',
                    )}
                </Link>
                <ImportTrainsetCustomMaterial trainsetAttachment={trainsetAttachment} loadAttachment={loadAttachment} />
                {(trainsetAttachment.is_parent || trainsetAttachment.is_child) && (
                    <div className="flex flex-col gap-2">
                        <Select
                            value={selectedAttachment?.toString()}
                            onValueChange={value => setSelectedAttachment(+value)}
                        >
                            <SelectTrigger id="selected-carriage-id" className="w-[180px]">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                {trainsetAttachment.parent && (
                                    <SelectItem
                                        value={trainsetAttachment.parent.id?.toString()}
                                        key={trainsetAttachment.parent.id}
                                    >
                                        {trainsetAttachment.parent.attachment_number}
                                    </SelectItem>
                                )}
                                <SelectItem value={trainsetAttachment.id.toString()} key={trainsetAttachment.id}>
                                    {trainsetAttachment.attachment_number}
                                </SelectItem>
                                {trainsetAttachment.childs?.map(childAttachment => (
                                    <SelectItem value={childAttachment.id?.toString()} key={childAttachment.id}>
                                        {childAttachment.attachment_number}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                )}
            </div>
            <div className="grid grid-cols-3">
                <div className="flex flex-col gap-3 mt-5">
                    <div className="">
                        <p className="font-bold">
                            {' '}
                            {t(
                                'pages.project.trainset.carriage_trainset.partials.components.preview_trainset_attachment.dialogs.headers.attachment_number',
                            )}
                        </p>
                        <p>{trainsetAttachment.attachment_number}</p>
                    </div>
                    <div className="">
                        <p className="font-bold">
                            {t(
                                'pages.project.trainset.carriage_trainset.partials.components.preview_trainset_attachment.dialogs.headers.reservation_number',
                            )}
                        </p>
                        <p>-</p>
                    </div>
                    <div className="">
                        <p className="font-bold">
                            {t(
                                'pages.project.trainset.carriage_trainset.partials.components.preview_trainset_attachment.dialogs.headers.serial_number',
                            )}
                        </p>
                        <p>-</p>
                    </div>
                </div>
                <div className="flex flex-col gap-3 mt-5">
                    <div className="">
                        <p className="font-bold">
                            {t(
                                'pages.project.trainset.carriage_trainset.partials.components.preview_trainset_attachment.dialogs.headers.reference_number',
                            )}
                        </p>
                        <p>{trainsetAttachment.parent?.attachment_number ?? '-'}</p>
                    </div>
                    <div className="">
                        <p className="font-bold">
                            {t(
                                'pages.project.trainset.carriage_trainset.partials.components.preview_trainset_attachment.dialogs.headers.date',
                            )}
                        </p>
                        <p>{trainsetAttachment.formatted_created_at}</p>
                    </div>
                </div>
                {trainsetAttachment?.qr && (
                    <div className="flex flex-col gap-3 mt-5 text-white items-center">
                        <div className="bg-white p-3">
                            <img width={200} src={trainsetAttachment.qr} alt="QR Code" />
                        </div>
                        <button onClick={() => openImageAndPrint(trainsetAttachment.qr!)} className={buttonVariants()}>
                            {t(
                                'pages.project.trainset.carriage_trainset.partials.components.preview_trainset_attachment.dialogs.buttons.print_qr',
                            )}
                        </button>
                    </div>
                )}
            </div>
            <Separator className="h-1 my-6" />
            <h1 className="text-xl font-bold mt-3">
                {t(
                    'pages.project.trainset.carriage_trainset.partials.components.preview_trainset_attachment.dialogs.headers.material_list',
                )}
            </h1>
            <Table>
                <TableCaption>
                    {t(
                        'pages.project.trainset.carriage_trainset.partials.components.preview_trainset_attachment.dialogs.raw_material_table.others.captions.list_material_within_attachment',
                    )}
                </TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="">
                            {t(
                                'pages.project.trainset.carriage_trainset.partials.components.preview_trainset_attachment.dialogs.raw_material_table.headers.material_code',
                            )}
                        </TableHead>
                        <TableHead>
                            {t(
                                'pages.project.trainset.carriage_trainset.partials.components.preview_trainset_attachment.dialogs.raw_material_table.headers.description',
                            )}
                        </TableHead>
                        <TableHead>
                            {t(
                                'pages.project.trainset.carriage_trainset.partials.components.preview_trainset_attachment.dialogs.raw_material_table.headers.specs',
                            )}
                        </TableHead>
                        <TableHead>
                            {t(
                                'pages.project.trainset.carriage_trainset.partials.components.preview_trainset_attachment.dialogs.raw_material_table.headers.unit',
                            )}
                        </TableHead>
                        <TableHead>
                            {t(
                                'pages.project.trainset.carriage_trainset.partials.components.preview_trainset_attachment.dialogs.raw_material_table.headers.total_qty',
                            )}
                        </TableHead>
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
    );
};

export default PreviewTrainsetAttachment;
