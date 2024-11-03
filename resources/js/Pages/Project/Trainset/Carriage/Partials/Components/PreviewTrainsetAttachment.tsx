import { TrainsetAttachmentResource } from '@/Support/Interfaces/Resources';
import { buttonVariants } from '@/Components/UI/button';
import { Separator } from '@/Components/UI/separator';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/Components/UI/table';
import { ROUTES } from '@/Support/Constants/routes';
import { Link } from '@inertiajs/react';
import { IntentEnum } from '@/Support/Enums/intentEnum';
import { useLaravelReactI18n } from 'laravel-react-i18n';

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

    return (
        <div className="text-black dark:text-white" key={attachment.id}>
            <h1 className="text-xl font-bold">{title}</h1>
            <Link
                className={buttonVariants({
                    className: 'my-2',
                })}
                href={`${route(`${ROUTES.TRAINSET_ATTACHMENTS}.show`, [attachment.id])}?intent=${IntentEnum.WEB_TRAINSET_ATTACHMENT_DOWNLOAD_TRAINSET_ATTACHMENT}`}
                target="_blank"
            >
                {t('pages.project.trainset.carriage.partials.components.preview_trainset_attachment.buttons.download')}
            </Link>
            <div className="grid grid-cols-3">
                <div className="flex flex-col gap-3 mt-5">
                    <div className="">
                        <p className="font-bold">
                            {' '}
                            {t(
                                'pages.project.trainset.carriage.partials.components.preview_trainset_attachment.dialogs.headers.attachment_number',
                            )}
                        </p>
                        <p>{attachment.attachment_number}</p>
                    </div>
                    <div className="">
                        <p className="font-bold">
                            {t(
                                'pages.project.trainset.carriage.partials.components.preview_trainset_attachment.dialogs.headers.reservation_number',
                            )}
                        </p>
                        <p>-</p>
                    </div>
                    <div className="">
                        <p className="font-bold">
                            {t(
                                'pages.project.trainset.carriage.partials.components.preview_trainset_attachment.dialogs.headers.serial_number',
                            )}
                        </p>
                        <p>-</p>
                    </div>
                </div>
                <div className="flex flex-col gap-3 mt-5">
                    <div className="">
                        <p className="font-bold">
                            {t(
                                'pages.project.trainset.carriage.partials.components.preview_trainset_attachment.dialogs.headers.reference_number',
                            )}
                        </p>
                        <p>-</p>
                    </div>
                    <div className="">
                        <p className="font-bold">
                            {t(
                                'pages.project.trainset.carriage.partials.components.preview_trainset_attachment.dialogs.headers.date',
                            )}
                        </p>
                        <p>{attachment.formatted_created_at}</p>
                    </div>
                </div>
                {attachment?.qr && (
                    <div className="flex flex-col gap-3 mt-5 text-white items-center">
                        <div className="bg-white p-3">
                            <img src={attachment.qr} alt="QR Code" width={200} />
                        </div>
                        <button className={buttonVariants()} onClick={() => openImageAndPrint(attachment.qr!)}>
                            {t(
                                'pages.project.trainset.carriage.partials.components.preview_trainset_attachment.dialogs.buttons.print_qr',
                            )}
                        </button>
                    </div>
                )}
            </div>
            <Separator className="h-1 my-6" />
            <h1 className="text-xl font-bold mt-3">
                {t(
                    'pages.project.trainset.carriage.partials.components.preview_trainset_attachment.dialogs.headers.material_list',
                )}
            </h1>
            <Table>
                <TableCaption>
                    {t(
                        'pages.project.trainset.carriage.partials.components.preview_trainset_attachment.dialogs.raw_material_table.others.captions.list_material_within_attachment',
                    )}
                </TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="">
                            {t(
                                'pages.project.trainset.carriage.partials.components.preview_trainset_attachment.dialogs.raw_material_table.headers.material_code',
                            )}
                        </TableHead>
                        <TableHead>
                            {t(
                                'pages.project.trainset.carriage.partials.components.preview_trainset_attachment.dialogs.raw_material_table.headers.description',
                            )}
                        </TableHead>
                        <TableHead>
                            {t(
                                'pages.project.trainset.carriage.partials.components.preview_trainset_attachment.dialogs.raw_material_table.headers.specs',
                            )}
                        </TableHead>
                        <TableHead>
                            {t(
                                'pages.project.trainset.carriage.partials.components.preview_trainset_attachment.dialogs.raw_material_table.headers.unit',
                            )}
                        </TableHead>
                        <TableHead>
                            {t(
                                'pages.project.trainset.carriage.partials.components.preview_trainset_attachment.dialogs.raw_material_table.headers.total_qty',
                            )}
                        </TableHead>
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
