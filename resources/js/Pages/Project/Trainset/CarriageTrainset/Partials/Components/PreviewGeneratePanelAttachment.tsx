import InputLabel from '@/Components/InputLabel';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/Components/UI/select';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/Components/UI/table';
import { trainsetService } from '@/Services/trainsetService';
import { PreviewGenerateAttachmentRawMaterialResource } from '@/Support/Interfaces/Others';
import { TrainsetResource } from '@/Support/Interfaces/Resources';
import { useLaravelReactI18n } from 'laravel-react-i18n';
import { useCallback, useEffect, useState } from 'react';

const PreviewGeneratePanelAttachment = ({ trainset }: { trainset: TrainsetResource }) => {
    console.log(trainset);
    const { t } = useLaravelReactI18n();

    const [selectedCarriage, setSelectedCarriage] = useState<number | null>(
        Object.values(trainset?.carriage_trainsets)[0]?.carriage.id,
    );

    const [selectedPanel, setSelectedPanel] = useState<number | null>(
        Object.values(Object.values(trainset?.carriage_trainsets)[0]?.carriage_panels)[0]?.panel.id,
    );

    const [selectedPanelRawMaterials, setSelectedPanelRawMaterials] = useState<
        PreviewGenerateAttachmentRawMaterialResource[]
    >([]);

    const fetchPanelRawMaterials = useCallback(async () => {
        if (!selectedCarriage || !selectedPanel) return;
        const res = await trainsetService.getPanelRawMaterials(
            trainset.id,
            selectedCarriage,
            selectedPanel,
        );
        setSelectedPanelRawMaterials(res.data);
    }, [selectedCarriage, selectedPanel, trainset.id]);

    useEffect(() => {
        void fetchPanelRawMaterials();
    }, [fetchPanelRawMaterials]);

    return (
        <div key={trainset.id} className='text-black dark:text-white'>
            <div className='ml-3 mt-4 flex gap-4'>
                {trainset?.carriage_trainsets?.length > 0 && (
                    <div className='flex flex-col gap-2'>
                        <InputLabel htmlFor='selected-carriage-id'>
                            {t(
                                'pages.project.trainset.carriage_trainset.partials.components.preview_generate_panel_attachment.dialogs.fields.carriage',
                            )}
                        </InputLabel>
                        <Select
                            value={selectedCarriage?.toString()}
                            onValueChange={(value) => setSelectedCarriage(+value)}
                        >
                            <SelectTrigger id='selected-carriage-id' className='w-[180px]'>
                                <SelectValue
                                    placeholder={t(
                                        'pages.project.trainset.carriage_trainset.partials.components.preview_generate_panel_attachment.dialogs.fields.carriage_placeholder',
                                    )}
                                />
                            </SelectTrigger>
                            <SelectContent>
                                {trainset.carriage_trainsets.map((carriageTrainset) => (
                                    <SelectItem
                                        value={carriageTrainset.carriage.id?.toString()}
                                        key={carriageTrainset.id}
                                    >
                                        {carriageTrainset.carriage.type}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                )}

                {selectedCarriage && (
                    <div className='flex flex-col gap-2'>
                        <InputLabel htmlFor='selected-panel-id'>
                            {t(
                                'pages.project.trainset.carriage_trainset.partials.components.preview_generate_panel_attachment.dialogs.fields.panel',
                            )}
                        </InputLabel>
                        <Select
                            value={selectedPanel?.toString()}
                            onValueChange={(value) => setSelectedPanel(+value)}
                        >
                            <SelectTrigger id='selected-panel-id' className='w-[180px]'>
                                <SelectValue
                                    placeholder={t(
                                        'pages.project.trainset.carriage_trainset.partials.components.preview_generate_panel_attachment.dialogs.fields.panel_placeholder',
                                    )}
                                />
                            </SelectTrigger>
                            <SelectContent>
                                {trainset.carriage_trainsets
                                    .find(
                                        (carriageTrainset) =>
                                            carriageTrainset.carriage.id === selectedCarriage,
                                    )
                                    ?.carriage_panels?.map((carriagePanel) => (
                                        <SelectItem
                                            value={carriagePanel.panel.id?.toString()}
                                            key={carriagePanel.id}
                                        >
                                            {carriagePanel.panel.name}
                                        </SelectItem>
                                    ))}
                            </SelectContent>
                        </Select>
                    </div>
                )}
            </div>

            {selectedPanelRawMaterials.length ? (
                <>
                    <h1 className='mt-3 text-xl font-bold'>
                        {t(
                            'pages.project.trainset.carriage_trainset.partials.components.preview_generate_panel_attachment.dialogs.headers.material_list',
                        )}
                    </h1>
                    <Table className='max-h-96'>
                        <TableCaption>
                            {t(
                                'pages.project.trainset.carriage_trainset.partials.components.preview_generate_panel_attachment.dialogs.raw_material_table.others.captions.list_material_within_attachment',
                            )}
                        </TableCaption>
                        <TableHeader className='dark:bg-background-dark sticky top-0 bg-background'>
                            <TableRow>
                                <TableHead className=''>
                                    {t(
                                        'pages.project.trainset.carriage_trainset.partials.components.preview_generate_panel_attachment.dialogs.raw_material_table.headers.material_code',
                                    )}
                                </TableHead>
                                <TableHead>
                                    {t(
                                        'pages.project.trainset.carriage_trainset.partials.components.preview_generate_panel_attachment.dialogs.raw_material_table.headers.description',
                                    )}
                                </TableHead>
                                <TableHead>
                                    {t(
                                        'pages.project.trainset.carriage_trainset.partials.components.preview_generate_panel_attachment.dialogs.raw_material_table.headers.specs',
                                    )}
                                </TableHead>
                                <TableHead>
                                    {t(
                                        'pages.project.trainset.carriage_trainset.partials.components.preview_generate_panel_attachment.dialogs.raw_material_table.headers.unit',
                                    )}
                                </TableHead>
                                <TableHead>
                                    {t(
                                        'pages.project.trainset.carriage_trainset.partials.components.preview_generate_panel_attachment.dialogs.raw_material_table.headers.total_qty',
                                    )}
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {selectedPanelRawMaterials?.map((rawMaterial) => (
                                <TableRow key={rawMaterial.raw_material.id}>
                                    <TableCell className='font-medium'>
                                        {rawMaterial.raw_material.material_code}
                                    </TableCell>
                                    <TableCell>{rawMaterial.raw_material.description}</TableCell>
                                    <TableCell>{rawMaterial.raw_material.specs}</TableCell>
                                    <TableCell>{rawMaterial.raw_material.unit}</TableCell>
                                    <TableCell>{rawMaterial.total_qty}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </>
            ) : (
                <h1 className='mt-3 font-bold text-red-500'>
                    {t(
                        'pages.project.trainset.carriage_trainset.partials.components.preview_generate_panel_attachment.dialogs.messages.no_materials',
                    )}
                </h1>
            )}
        </div>
    );
};

export default PreviewGeneratePanelAttachment;
