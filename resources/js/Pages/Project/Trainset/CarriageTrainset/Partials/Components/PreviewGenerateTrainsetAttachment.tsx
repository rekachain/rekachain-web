import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/Components/UI/table';
import { useLaravelReactI18n } from 'laravel-react-i18n';
import { PreviewGenerateAttachmentRawMaterialResource } from '@/Support/Interfaces/Others';

const PreviewGenerateTrainsetAttachment = ({
    rawMaterials,
}: {
    rawMaterials: PreviewGenerateAttachmentRawMaterialResource[];
}) => {
    const { t } = useLaravelReactI18n();

    return (
        <Table className='max-h-96'>
            <TableCaption>
                {t(
                    'pages.project.trainset.carriage_trainset.partials.components.preview_generate_trainset_attachment.dialogs.raw_material_table.others.captions.list_material_within_attachment',
                )}
            </TableCaption>
            <TableHeader className="sticky top-0 bg-background dark:bg-background-dark">
                <TableRow>
                    <TableHead className="">
                        {t(
                            'pages.project.trainset.carriage_trainset.partials.components.preview_generate_trainset_attachment.dialogs.raw_material_table.headers.material_code',
                        )}
                    </TableHead>
                    <TableHead>
                        {t(
                            'pages.project.trainset.carriage_trainset.partials.components.preview_generate_trainset_attachment.dialogs.raw_material_table.headers.description',
                        )}
                    </TableHead>
                    <TableHead>
                        {t(
                            'pages.project.trainset.carriage_trainset.partials.components.preview_generate_trainset_attachment.dialogs.raw_material_table.headers.specs',
                        )}
                    </TableHead>
                    <TableHead>
                        {t(
                            'pages.project.trainset.carriage_trainset.partials.components.preview_generate_trainset_attachment.dialogs.raw_material_table.headers.unit',
                        )}
                    </TableHead>
                    <TableHead>
                        {t(
                            'pages.project.trainset.carriage_trainset.partials.components.preview_generate_trainset_attachment.dialogs.raw_material_table.headers.total_qty',
                        )}
                    </TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {rawMaterials.map(rawMaterial => (
                    <TableRow key={rawMaterial.raw_material.id}>
                        <TableCell className="font-medium">{rawMaterial.raw_material.material_code}</TableCell>
                        <TableCell>{rawMaterial.raw_material.description}</TableCell>
                        <TableCell>{rawMaterial.raw_material.specs}</TableCell>
                        <TableCell>{rawMaterial.raw_material.unit}</TableCell>
                        <TableCell>{rawMaterial.total_qty}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};

export default PreviewGenerateTrainsetAttachment;
