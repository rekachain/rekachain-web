<?php

namespace App\Exports\CustomAttachmentMaterial;

use App\Http\Resources\PanelAttachmentResource;
use App\Http\Resources\TrainsetAttachmentResource;
use App\Models\PanelAttachment;
use App\Support\Enums\IntentEnum;
use Illuminate\Database\Eloquent\Model;
use Maatwebsite\Excel\Concerns\Exportable;
use Maatwebsite\Excel\Concerns\FromArray;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithStyles;
use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;

class CustomAttachmentMaterialsTemplateExport implements FromArray, WithHeadings, ShouldAutoSize, WithStyles {
    use Exportable;

    public function __construct(protected Model $attachmentModel) {}

    public function headings(): array {
        return [
            'Kode Material',
            'Deskripsi',
            'Spesifikasi',
            'Unit',
            'Qty',
        ];
    }

    public function styles(Worksheet $sheet)
    {
        $styleArray = [
            'borders' => [
                'right' => [
                    'borderStyle' => \PhpOffice\PhpSpreadsheet\Style\Border::BORDER_THIN,
                ],
            ],
        ];

        foreach (range('A', 'E') as $column) {
            $sheet->getStyle($column . '1:' . $column . $sheet->getHighestRow())->applyFromArray($styleArray);
        }

        $sheet->getStyle('A1:E1')->applyFromArray([
            'font' => [
                'bold' => true,
                'color' => ['rgb' => 'FFFFFF'],
            ],
            'fill' => [
                'fillType' => \PhpOffice\PhpSpreadsheet\Style\Fill::FILL_SOLID,
                'startColor' => ['rgb' => '4F81BD']
            ]
        ]);
    }

    public function array(): array {
        if ($this->attachmentModel instanceof PanelAttachment) {
            $req = request()->merge(['intent' => IntentEnum::WEB_PANEL_ATTACHMENT_GET_PANEL_MATERIALS_WITH_QTY->value]);
            $exportData = PanelAttachmentResource::make($this->attachmentModel)->toArray($req);
        } else{
            $req = request()->merge(['intent' => IntentEnum::WEB_TRAINSET_ATTACHMENT_GET_COMPONENT_MATERIALS_WITH_QTY->value]);
            $exportData = TrainsetAttachmentResource::make($this->attachmentModel)->toArray($req);
        }
        $exportData = array_map(function($array) {
            unset($array['id'], $array['can_be_deleted']);
            return $array;
        }, $exportData);
        return $exportData;
    }
}
