import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/Components/UI/table';
import { useEffect, useState } from 'react';
import { Head } from '@inertiajs/react';
import { Separator } from '@/Components/UI/separator';
import { RawMaterialResource, TrainsetAttachmentResource } from '@/Support/Interfaces/Resources';
import { IntentEnum } from '@/Support/Enums/intentEnum';
import { trainsetAttachmentService } from '@/Services/trainsetAttachmentService';
import { TrainsetAttachmentTypeEnum } from '@/Support/Enums/trainsetAttachmentTypeEnum';
import { useLaravelReactI18n } from 'laravel-react-i18n';

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
            .then(response => {
                setRawMaterials(response.raw_materials);

                if (response.type === TrainsetAttachmentTypeEnum.MECHANIC) {
                    setPageTitle(
                        t('pages.trainset_attachment.document_trainset_attachment.headers.mechanic_attachment'),
                    );
                } else if (response.type === TrainsetAttachmentTypeEnum.ELECTRIC) {
                    setPageTitle(
                        t('pages.trainset_attachment.document_trainset_attachment.headers.electric_attachment'),
                    );
                }

                // setTimeout(() => {
                //     temporaryChangeThemeToLightMode();
                //
                //     window.onafterprint = () => {
                //         history.back();
                //     };
                //     window.print();
                // }, 500);
            });
    }, []);

    return (
        <>
            <Head title={pageTitle} />
            <div className="text-black dark:text-white" key={trainsetAttachment.id}>
                <h1 className="text-xl font-bold">{pageTitle}</h1>
                <div className="grid grid-cols-3">
                    <div className="flex flex-col gap-3 mt-5">
                        <div className="">
                            <p className="font-bold">
                                {t('pages.trainset_attachment.document_trainset_attachment.headers.attachment_number')}
                            </p>
                            <p>{trainsetAttachment.attachment_number}</p>
                        </div>
                        <div className="">
                            <p className="font-bold">
                                {t('pages.trainset_attachment.document_trainset_attachment.headers.reservation_number')}
                            </p>
                            <p>-</p>
                        </div>
                        <div className="">
                            <p className="font-bold">
                                {t('pages.trainset_attachment.document_trainset_attachment.headers.serial_number')}
                            </p>
                            <p>-</p>
                        </div>
                    </div>
                    <div className="flex flex-col gap-3 mt-5">
                        <div className="">
                            <p className="font-bold">
                                {t('pages.trainset_attachment.document_trainset_attachment.headers.reference_number')}
                            </p>
                            <p>-</p>
                        </div>
                        <div className="">
                            <p className="font-bold">
                                {t('pages.trainset_attachment.document_trainset_attachment.headers.date')}
                            </p>
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
                <h1 className="text-xl font-bold mt-3">
                    {t('pages.trainset_attachment.document_trainset_attachment.headers.material_list')}
                </h1>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>
                                {t(
                                    'pages.trainset_attachment.document_trainset_attachment.raw_material_table.headers.material_code',
                                )}
                            </TableHead>
                            <TableHead>
                                {t(
                                    'pages.trainset_attachment.document_trainset_attachment.raw_material_table.headers.description',
                                )}
                            </TableHead>
                            <TableHead>
                                {t(
                                    'pages.trainset_attachment.document_trainset_attachment.raw_material_table.headers.specs',
                                )}
                            </TableHead>
                            <TableHead>
                                {t(
                                    'pages.trainset_attachment.document_trainset_attachment.raw_material_table.headers.unit',
                                )}
                            </TableHead>
                            <TableHead>
                                {t(
                                    'pages.trainset_attachment.document_trainset_attachment.raw_material_table.headers.total_qty',
                                )}
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {rawMaterials.map(rawMaterial => (
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

export default DocumentTrainsetAttachment;
