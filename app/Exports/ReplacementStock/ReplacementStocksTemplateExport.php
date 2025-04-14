<?php

namespace App\Exports\ReplacementStock;

use Maatwebsite\Excel\Concerns\Exportable;
use Maatwebsite\Excel\Concerns\FromArray;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;
use Maatwebsite\Excel\Concerns\WithEvents;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithStyles;
use Maatwebsite\Excel\Events\AfterSheet;
use PhpOffice\PhpSpreadsheet\Worksheet\Table;
use PhpOffice\PhpSpreadsheet\Worksheet\Table\TableStyle;
use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;

class ReplacementStocksTemplateExport implements FromArray, ShouldAutoSize, WithEvents, WithHeadings, WithStyles {
    use Exportable;

    public function headings(): array {
        return [
            'Nama Komponen',
            'Threshold',
            'Jumlah',
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

                $table = new Table('A1:C' . $highestRow, 'ReplacementStocks');
                $tableStyle = new TableStyle(TableStyle::TABLE_STYLE_LIGHT15);
                $tableStyle->setShowRowStripes(true);
                $table->setStyle($tableStyle);
                $sheet->addTable($table);
            },
        ];
    }

    public function array(): array {
        return [
            ['Example Component Name', 1, 1],
        ];
    }
}
