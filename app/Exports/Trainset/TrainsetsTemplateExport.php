<?php

namespace App\Exports\Trainset;

use Maatwebsite\Excel\Concerns\Exportable;
use Maatwebsite\Excel\Concerns\FromArray;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Tests\Feature\Http\Controllers\Helpers\Dummy;

class TrainsetsTemplateExport implements FromArray, WithHeadings {
    use Exportable;

    private $dummy;

    public function __construct() {
        $this->dummy = new Dummy;
    }

    /**
     * @return \Illuminate\Support\Collection
     */
    public function headings(): array {
        return [
            'name',
            'project_id',
            'project_trainset_id',
        ];
    }

    public function array(): array {
        return [
            ['Example name', $this->dummy->createProject()->id, $this->dummy->createPresetTrainset()->id],
        ];
    }
}
