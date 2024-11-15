<?php

namespace App\Exports\RawMaterialProgressStep\Sheets;

use App\Http\Resources\RawMaterialResource;
use App\Models\Component;
use App\Models\Panel;
use Illuminate\Database\Eloquent\Model;
use Maatwebsite\Excel\Concerns\Exportable;
use Maatwebsite\Excel\Concerns\FromArray;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithStyles;
use Maatwebsite\Excel\Concerns\WithTitle;
use PhpOffice\PhpSpreadsheet\Worksheet\Table;
use PhpOffice\PhpSpreadsheet\Worksheet\Table\TableStyle;
use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;

class RawMaterialsTemplateExport implements FromArray, WithTitle, WithHeadings, ShouldAutoSize, WithStyles {
    use Exportable;

    public function __construct(protected Model $model) {}

    public function title(): string {
        return 'Raw Material';
    }

    public function headings(): array {
        return [
            'Kode Material',
            'Deskripsi',
            'Spesifikasi',
            'Unit',
            'Qty',
        ];
    }

    public function styles(Worksheet $sheet) {
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
        $validation = $sheet->getDataValidation('A:A');
        $validation->setType( \PhpOffice\PhpSpreadsheet\Cell\DataValidation::TYPE_CUSTOM );
        $validation->setErrorStyle( \PhpOffice\PhpSpreadsheet\Cell\DataValidation::STYLE_STOP );
        $validation->setShowErrorMessage(true);
        $validation->setErrorTitle('Duplicate Entry');
        $validation->setError('Data Kode Duplikat!');
        $validation->setFormula1('=COUNTIF(A:A,A1)=1');

        $conditional = new \PhpOffice\PhpSpreadsheet\Style\Conditional();
        $conditional->setConditionType(\PhpOffice\PhpSpreadsheet\Style\Conditional::CONDITION_DUPLICATES);
        $conditional->getStyle()->getFill()->setFillType(\PhpOffice\PhpSpreadsheet\Style\Fill::FILL_SOLID);
        $conditional->getStyle()->getFill()->getStartColor()->setARGB('60E6B8B7');
        $conditionalStyles = $sheet->getStyle('A:A')->getConditionalStyles();
        $conditionalStyles[] = $conditional;
        $sheet->getStyle('A:A')->setConditionalStyles($conditionalStyles);

        
        $table = new Table('A1:E' . $sheet->getHighestRow(), 'Raw_Materials');
        $tableStyle = new TableStyle(TableStyle::TABLE_STYLE_LIGHT15);
        $tableStyle->setShowRowStripes(true);
        $table->setStyle($tableStyle);
        $sheet->addTable($table);
    }

    public function array(): array {
        if ($this->model instanceof Panel) {
            $carriagePanel = $this->model->carriage_panels()->first();
            $materialsModel = $carriagePanel ? $carriagePanel->panel_materials()->get() : collect();
        } elseif ($this->model instanceof Component) {
            $carriagePanelComponent = $this->model->carriage_panel_components()->first();
            $materialsModel = $carriagePanelComponent ? $carriagePanelComponent->component_materials()->get() : collect();
        }
        if ($materialsModel->isEmpty()) {
            return [
                ['KodeMaterialABCDE',
                'Deskripsi Material',
                'Spesifikasi Material',
                'Unit Material',
                'Jumlah Total',]
            ];
        }
        $exportData = $materialsModel->map(fn ($material) => [
            ...RawMaterialResource::make($material->raw_material)->toArray(request()),
            'qty' => $material->qty
        ])->toArray();
        $exportData = array_map(function($array) {
            unset($array['id'], $array['can_be_deleted']);
            return $array;
        }, $exportData);
        return $exportData;
    }
}
