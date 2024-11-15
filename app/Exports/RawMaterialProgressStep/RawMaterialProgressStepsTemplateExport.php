<?php

namespace App\Exports\RawMaterialProgressStep;

use App\Exports\RawMaterialProgressStep\Sheets\ProgressTemplateExport;
use App\Exports\RawMaterialProgressStep\Sheets\RawMaterialsTemplateExport;
use Illuminate\Database\Eloquent\Model;
use Maatwebsite\Excel\Concerns\Exportable;
use Maatwebsite\Excel\Concerns\WithMultipleSheets;

class RawMaterialProgressStepsTemplateExport implements WithMultipleSheets {
    use Exportable;

    public function __construct(protected Model $model) {}

    public function sheets(): array
    {
        return [
            new RawMaterialsTemplateExport($this->model),
            new ProgressTemplateExport($this->model->progress),
        ];
    }
}
