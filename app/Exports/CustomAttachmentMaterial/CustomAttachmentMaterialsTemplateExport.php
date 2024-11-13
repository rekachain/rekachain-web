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
use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;

class CustomAttachmentMaterialsTemplateExport implements FromArray, WithHeadings, ShouldAutoSize {
    use Exportable;

    public function __construct(protected Model $attachmentModel) {}

    public function headings(): array {
        return [
            'Kode Material',
            'Desktripsi',
            'Spesifikasi',
            'Unit',
            'Qty',
        ];
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
