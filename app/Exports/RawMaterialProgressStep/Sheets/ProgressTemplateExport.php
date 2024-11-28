<?php

namespace App\Exports\RawMaterialProgressStep\Sheets;

use App\Models\Progress;
use Maatwebsite\Excel\Concerns\Exportable;
use Maatwebsite\Excel\Concerns\FromArray;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;
use Maatwebsite\Excel\Concerns\WithEvents;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithStyles;
use Maatwebsite\Excel\Concerns\WithTitle;
use Maatwebsite\Excel\Events\AfterSheet;
use PhpOffice\PhpSpreadsheet\Worksheet\Table;
use PhpOffice\PhpSpreadsheet\Worksheet\Table\TableStyle;
use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;

class ProgressTemplateExport implements FromArray, ShouldAutoSize, WithEvents, WithHeadings, WithStyles, WithTitle {
    use Exportable;

    public function __construct(protected ?Progress $progress) {}

    public function title(): string {
        return 'Progress';
    }

    public function headings(): array {
        return [
            'Urutan',
            'Nama Proses',
            'Deskripsi',
        ];
    }

    public function styles(Worksheet $sheet) {
        $sheet->getStyle('A1:C1')->applyFromArray([
            'font' => [
                'bold' => true,
                'color' => ['rgb' => 'FFFFFF'],
            ],
            'fill' => [
                'fillType' => \PhpOffice\PhpSpreadsheet\Style\Fill::FILL_SOLID,
                'startColor' => ['rgb' => '4F81BD'],
            ],
        ]);

    }

    public function registerEvents(): array {
        return [
            AfterSheet::class => function (AfterSheet $event) {
                $sheet = $event->sheet->getDelegate();
                $highestRow = $sheet->getHighestRow();

                $table = new Table('A1:C' . $highestRow, 'Progress');
                $tableStyle = new TableStyle(TableStyle::TABLE_STYLE_LIGHT15);
                $tableStyle->setShowRowStripes(true);
                $table->setStyle($tableStyle);
                $sheet->addTable($table);

                // Apply the formula for the rest of the rows in "Urutan"
                for ($row = 2; $row <= $highestRow; $row++) {
                    $sheet->setCellValue(
                        "A{$row}",
                        '=ROW()-ROW(Progress[[#Headers],[Urutan]])'
                    );
                }
            },
        ];
    }

    public function array(): array {
        return $this->progress
            ? $this->progress->progress_steps->map(fn ($progressStep, $key) => [
                $key + 1,
                $progressStep->step->name,
                $progressStep->step->process,
            ])->toArray()
            : [
                ['1', 'Contoh Proses Cutting', 'Pemotongan contoh bahan'],
            ];

    }
}
