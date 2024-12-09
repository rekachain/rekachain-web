import { Separator } from '@/Components/UI/separator';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/Components/UI/table';
import { trainsetAttachmentService } from '@/Services/trainsetAttachmentService';
import { IntentEnum } from '@/Support/Enums/intentEnum';
import { TrainsetAttachmentHandlerHandlesEnum } from '@/Support/Enums/trainsetAttachmentHandlerHandlesEnum';
import { TrainsetAttachmentTypeEnum } from '@/Support/Enums/trainsetAttachmentTypeEnum';
import { RawMaterialResource, TrainsetAttachmentResource } from '@/Support/Interfaces/Resources';
import { Head } from '@inertiajs/react';
import { useLaravelReactI18n } from 'laravel-react-i18n';
import { useEffect, useState } from 'react';

const DocumentTrainsetAttachment = ({
    trainsetAttachment,
    title,
}: {
    trainsetAttachment: TrainsetAttachmentResource;
    title: string;
}) => {
    const { t } = useLaravelReactI18n();
    const [pageTitle, setPageTitle] = useState<string>(title);
    const [rawMaterials, setRawMaterials] = useState<RawMaterialResource[]>([]);

    const temporaryChangeThemeToLightMode = () => {
        document.documentElement.classList.remove('dark');
        document.documentElement.style.colorScheme = 'light';
    };

    useEffect(() => {
        trainsetAttachmentService
            .get(trainsetAttachment.id, {
                intent: IntentEnum.WEB_TRAINSET_ATTACHMENT_GET_COMPONENT_MATERIALS_WITH_QTY,
            })
            .then((response) => {
                setRawMaterials(response.raw_materials);

                if (response.type === TrainsetAttachmentTypeEnum.MECHANIC) {
                    setPageTitle(
                        t(
                            'pages.trainset_attachment.document_trainset_attachment.title',
                        ),
                    );
                } else if (response.type === TrainsetAttachmentTypeEnum.ELECTRIC) {
                    setPageTitle(
                        t(
                            'pages.trainset_attachment.document_trainset_attachment.title',
                        ),
                    );
                }

                setTimeout(() => {
                    temporaryChangeThemeToLightMode();

                    window.onafterprint = () => {
                        history.back();
                    };
                    window.print();
                }, 500);
            });
    }, []);

    return (
        <>
            <Head title={pageTitle} />
            <div key={trainsetAttachment.id} className='text-black dark:text-white'>
                <div className='flex items-center justify-center'>
                    <h1 className='text-xl font-bold'>{pageTitle}</h1>
                </div>
                <div className='grid grid-cols-3'>
                    <div className='mt-5 flex flex-col gap-3'>
                        <div className=''>
                            <p className='font-bold'>
                                {t(
                                    'pages.trainset_attachment.document_trainset_attachment.headers.attachment_number',
                                )}
                            </p>
                            <p>{trainsetAttachment.attachment_number}</p>
                        </div>
                        <div className=''>
                            <p className='font-bold'>
                                {t(
                                    'pages.trainset_attachment.document_trainset_attachment.headers.reservation_number',
                                )}
                            </p>
                            <p>-</p>
                        </div>
                        <div className=''>
                            <p className='font-bold'>
                                {t(
                                    'pages.trainset_attachment.document_trainset_attachment.headers.source_workstation',
                                )}
                            </p>
                            <p>{trainsetAttachment.source_workstation?.name} {trainsetAttachment.source_workstation?.location}, {trainsetAttachment.source_workstation?.workshop.name}</p>
                        </div>
                        <div className=''>
                            <p className='font-bold'>
                                {t(
                                    'pages.trainset_attachment.document_trainset_attachment.headers.destination_workstation',
                                )}
                            </p>
                            <p>{trainsetAttachment.destination_workstation?.name} {trainsetAttachment.destination_workstation?.location}, {trainsetAttachment.destination_workstation?.workshop.name}</p>
                        </div>
                    </div>
                    <div className='mt-5 flex flex-col gap-3'>
                        <div className=''>
                            <p className='font-bold'>
                                {t(
                                    'pages.trainset_attachment.document_trainset_attachment.headers.reference_number',
                                )}
                            </p>
                            <p>-</p>
                        </div>
                        <div className=''>
                            <p className='font-bold'>
                                {t(
                                    'pages.trainset_attachment.document_trainset_attachment.headers.date',
                                )}
                            </p>
                            <p>{trainsetAttachment.formatted_created_at}</p>
                        </div>
                    </div>
                    {trainsetAttachment?.qr && (
                        <div className='mt-5 flex flex-col items-center gap-3 text-white'>
                            <img width={200} src={trainsetAttachment.qr} alt='QR Code' />
                        </div>
                    )}
                </div>
                <Separator className='my-6 h-1' />
                <h1 className='mt-3 text-xl font-bold mb-1'>
                    {t(
                        'pages.trainset_attachment.document_trainset_attachment.headers.material_list',
                    )}
                </h1>
                <Table>
                    <TableHeader>
                        <TableRow className='divide-x divide-black border-black text-base'>
                            <TableHead className='text-black'>
                                {t(
                                    'pages.trainset_attachment.document_trainset_attachment.raw_material_table.headers.number',
                                )}
                            </TableHead>
                            <TableHead className='text-black'>
                                {t(
                                    'pages.trainset_attachment.document_trainset_attachment.raw_material_table.headers.material_code',
                                )}
                            </TableHead>
                            <TableHead className='text-black'>
                                {t(
                                    'pages.trainset_attachment.document_trainset_attachment.raw_material_table.headers.description',
                                )}
                            </TableHead>
                            <TableHead className='text-black'>
                                {t(
                                    'pages.trainset_attachment.document_trainset_attachment.raw_material_table.headers.specs',
                                )}
                            </TableHead>
                            <TableHead className='text-black'>
                                {t(
                                    'pages.trainset_attachment.document_trainset_attachment.raw_material_table.headers.total_required',
                                )}
                            </TableHead>
                            <TableHead className='text-black'>
                                {t(
                                    'pages.trainset_attachment.document_trainset_attachment.raw_material_table.headers.total_received',
                                )}
                            </TableHead>
                            <TableHead className='text-black'>
                                {t(
                                    'pages.trainset_attachment.document_trainset_attachment.raw_material_table.headers.unit',
                                )}
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {rawMaterials.map((rawMaterial, index) => (
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
                <div className='grid grid-cols-3 gap-4 mt-10'>
                    <div className='flex flex-col items-center gap-1'>
                        <div className='w-full'>
                            <div className='border-b border-gray-500 h-10' />
                        </div>
                        <div className='w-full text-center'>
                            <p className='font-semibold'>{t('pages.trainset_attachment.document_trainset_attachment.props.signatures.prepare')}:</p>
                        </div>
                        <div className='w-full'>
                            <div className='border-b border-gray-500 h-32' />
                        </div>
                        {trainsetAttachment.trainset_attachment_handlers
                            ?.filter((handler) => handler.handles === TrainsetAttachmentHandlerHandlesEnum.PREPARE)
                            .map((trainsetAttachmentHandler) => (
                                <div key={trainsetAttachmentHandler.id} className='w-full text-center'>
                                    <p className='font-semibold'>{trainsetAttachmentHandler.user?.name}</p>
                                    <p className='font-semibold'>{`(${t('pages.trainset_attachment.document_trainset_attachment.props.signatures.identifier')}: ${trainsetAttachmentHandler.user?.nip})`}</p>
                                </div>
                            ))}
                    </div>
                    <div className='flex flex-col items-center gap-1'>
                        <div className='w-full'>
                            <div className='border-b border-gray-500 h-10' />
                        </div>
                        <div className='w-full text-center'>
                            <p className='font-semibold'>{t('pages.trainset_attachment.document_trainset_attachment.props.signatures.send')}:</p>
                        </div>
                        <div className='w-full'>
                            <div className='border-b border-gray-500 h-32' />
                        </div>
                        {trainsetAttachment.trainset_attachment_handlers
                            ?.filter((handler) => handler.handles === TrainsetAttachmentHandlerHandlesEnum.SEND)
                            .map((trainsetAttachmentHandler) => (
                                <div key={trainsetAttachmentHandler.id} className='w-full text-center'>
                                    <p className='font-semibold'>{trainsetAttachmentHandler.user?.name}</p>
                                    <p className='font-semibold'>{`(${t('pages.trainset_attachment.document_trainset_attachment.props.signatures.identifier')}: ${trainsetAttachmentHandler.user?.nip})`}</p>
                                </div>
                            ))}
                    </div>
                    <div className='flex flex-col items-center gap-1'>
                        <div className='w-full'>
                            <div className='border-b border-gray-500 h-10' />
                        </div>
                        <div className='w-full text-center'>
                            <p className='font-semibold'>{t('pages.trainset_attachment.document_trainset_attachment.props.signatures.receive')}:</p>
                        </div>
                        <div className='w-full'>
                            <div className='border-b border-gray-500 h-32' />
                        </div>
                        {trainsetAttachment.trainset_attachment_handlers
                            ?.filter((handler) => handler.handles === TrainsetAttachmentHandlerHandlesEnum.RECEIVE)
                            .map((trainsetAttachmentHandler) => (
                                <div key={trainsetAttachmentHandler.id} className='w-full text-center'>
                                    <p className='font-semibold'>{trainsetAttachmentHandler.user?.name}</p>
                                    <p className='font-semibold'>{`(${t('pages.trainset_attachment.document_trainset_attachment.props.signatures.identifier')}: ${trainsetAttachmentHandler.user?.nip})`}</p>
                                </div>
                            ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default DocumentTrainsetAttachment;
