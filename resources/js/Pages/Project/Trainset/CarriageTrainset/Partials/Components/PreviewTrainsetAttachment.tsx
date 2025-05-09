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
import ImportTrainsetCustomMaterial from '@/Pages/Project/Trainset/CarriageTrainset/Partials/Components/Components/ImportTrainsetCustomMaterial';
import { trainsetAttachmentService } from '@/Services/trainsetAttachmentService';
import { ROUTES } from '@/Support/Constants/routes';
import { IntentEnum } from '@/Support/Enums/intentEnum';
import { PERMISSION_ENUM } from '@/Support/Enums/permissionEnum';
import {
    TrainsetAttachmentHandlerResource,
    TrainsetAttachmentResource,
} from '@/Support/Interfaces/Resources';
import { withLoading } from '@/Utils/withLoading';
import { Link } from '@inertiajs/react';
import { useLaravelReactI18n } from 'laravel-react-i18n';
import { useEffect, useState } from 'react';

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

    const [trainsetAttachment, setTrainsetAttachment] =
        useState<TrainsetAttachmentResource>(attachment);
    const [trainsetAttachmentHandlers, setTrainsetAttachmentHandlers] =
        useState<TrainsetAttachmentHandlerResource[]>();
    const [selectedAttachment, setSelectedAttachment] = useState<number | null>(attachment.id);

    const loadAttachment = withLoading(async () => {
        if (selectedAttachment) {
            const attachment = await trainsetAttachmentService.get(selectedAttachment, {
                intent: IntentEnum.WEB_TRAINSET_ATTACHMENT_GET_COMPONENT_MATERIALS_WITH_QTY,
            });
            setTrainsetAttachment(attachment);
        }
    });

    const loadAttachmentHandlers = withLoading(async () => {
        const handlers = (await trainsetAttachmentService.get(attachment.id, {
            intent: IntentEnum.WEB_TRAINSET_ATTACHMENT_GET_ATTACHMENT_HANDLERS,
        })) as unknown as TrainsetAttachmentHandlerResource[];
        setTrainsetAttachmentHandlers(handlers);
    });

    useEffect(() => {
        loadAttachment();
        loadAttachmentHandlers();
    }, [selectedAttachment]);

    return (
        <div key={attachment.id} className='text-black dark:text-white'>
            <h1 className='text-xl font-bold'>{title}</h1>
            <div className='my-4 flex gap-4'>
                <Link
                    target='_blank'
                    href={`${route(`${ROUTES.TRAINSET_ATTACHMENTS}.show`, [attachment.id])}?intent=${IntentEnum.WEB_TRAINSET_ATTACHMENT_DOWNLOAD_TRAINSET_ATTACHMENT}`}
                    className={buttonVariants()}
                >
                    {t(
                        'pages.project.trainset.carriage_trainset.partials.components.preview_trainset_attachment.buttons.download',
                    )}
                </Link>
                {checkPermission(PERMISSION_ENUM.TRAINSET_ATTACHMENT_IMPORT) && (
                    <ImportTrainsetCustomMaterial
                        trainsetAttachment={trainsetAttachment}
                        loadAttachment={loadAttachment}
                    />
                )}
                {(trainsetAttachment.is_parent || trainsetAttachment.is_child) && (
                    <div className='flex flex-col gap-2'>
                        <Select
                            value={selectedAttachment?.toString()}
                            onValueChange={(value) => setSelectedAttachment(+value)}
                        >
                            <SelectTrigger id='selected-carriage-id' className='w-[180px]'>
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
                                <SelectItem
                                    value={trainsetAttachment.id.toString()}
                                    key={trainsetAttachment.id}
                                >
                                    {trainsetAttachment.attachment_number}
                                </SelectItem>
                                {trainsetAttachment.childs?.map((childAttachment) => (
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
            <div className='grid grid-cols-1 md:grid-cols-3'>
                <div className='mt-5 flex flex-col gap-3'>
                    <div className=''>
                        <p className='font-bold'>
                            {' '}
                            {t(
                                'pages.project.trainset.carriage_trainset.partials.components.preview_trainset_attachment.dialogs.headers.attachment_number',
                            )}
                        </p>
                        <p>{trainsetAttachment.attachment_number}</p>
                    </div>
                    <div className='mb-2'>
                        <p className='font-bold'>
                            {t(
                                'pages.project.trainset.carriage_trainset.partials.components.preview_trainset_attachment.dialogs.headers.reservation_number',
                            )}
                        </p>
                        <p>-</p>
                    </div>
                    {trainsetAttachmentHandlers && trainsetAttachmentHandlers.length > 0 && (
                        <>
                            <p className='text-lg font-bold'>
                                {t(
                                    'pages.project.trainset.carriage_trainset.partials.components.preview_trainset_attachment.dialogs.headers.handlers',
                                )}
                            </p>
                            {trainsetAttachmentHandlers.map((handler) => (
                                <div key={handler.id} className='flex items-center gap-1'>
                                    <span className='font-bold'>{handler.localized_handles}</span>
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
                                'pages.project.trainset.carriage_trainset.partials.components.preview_trainset_attachment.dialogs.headers.reference_number',
                            )}
                        </p>
                        <p>{trainsetAttachment.parent?.attachment_number ?? '-'}</p>
                    </div>
                    <div className=''>
                        <p className='font-bold'>
                            {t(
                                'pages.project.trainset.carriage_trainset.partials.components.preview_trainset_attachment.dialogs.headers.date',
                            )}
                        </p>
                        <p>{trainsetAttachment.formatted_created_at}</p>
                    </div>
                </div>
                {trainsetAttachment?.qr && (
                    <div className='mt-5 flex flex-col items-center gap-3 text-white'>
                        <div className='bg-white p-3'>
                            <img width={200} src={trainsetAttachment.qr} alt='QR Code' />
                        </div>
                        <button
                            onClick={() => openImageAndPrint(trainsetAttachment.qr!)}
                            className={buttonVariants()}
                        >
                            {t(
                                'pages.project.trainset.carriage_trainset.partials.components.preview_trainset_attachment.dialogs.buttons.print_qr',
                            )}
                        </button>
                    </div>
                )}
            </div>
            <Separator className='my-6 h-1' />
            <h1 className='mt-3 text-xl font-bold'>
                {t(
                    'pages.project.trainset.carriage_trainset.partials.components.preview_trainset_attachment.dialogs.headers.material_list',
                )}
            </h1>
            <div className='hidden md:block'>
                <Table wrapperClassName='block max-h-96'>
                    <TableCaption>
                        {t(
                            'pages.project.trainset.carriage_trainset.partials.components.preview_trainset_attachment.dialogs.raw_material_table.others.captions.list_material_within_attachment',
                        )}
                    </TableCaption>
                    <TableHeader className='dark:bg-background-dark sticky top-0 bg-background'>
                        <TableRow>
                            <TableHead className=''>
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
                        {trainsetAttachment.raw_materials.map((rawMaterial) => (
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
                {trainsetAttachment.raw_materials.map((rawMaterial) => (
                    <div
                        // key={permission.id}
                        className='flex flex-col gap-2 rounded-md border-2 border-black p-2 dark:border-white'
                    >
                        <div className='items-scenter flex w-full justify-between'>
                            <h4 className='text-base font-bold'>{rawMaterial.material_code}</h4>
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
        </div>
    );
};

export default PreviewTrainsetAttachment;
