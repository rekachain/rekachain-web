<?php

namespace App\Services;

use App\Exports\Component\ComponentsExport;
use App\Exports\Component\ComponentsTemplateExport;
use App\Exports\RawMaterialProgressStep\RawMaterialProgressStepsTemplateExport;
use App\Imports\Component\ComponentsImport;
use App\Models\Component;
use App\Support\Interfaces\Repositories\ComponentRepositoryInterface;
use App\Support\Interfaces\Services\ComponentServiceInterface;
use Illuminate\Http\UploadedFile;
use Maatwebsite\Excel\Facades\Excel;
use Symfony\Component\HttpFoundation\BinaryFileResponse;

class ComponentService extends BaseCrudService implements ComponentServiceInterface {
    protected function getRepositoryClass(): string {
        return ComponentRepositoryInterface::class;
    }

    public function importData(UploadedFile $file): bool {
        Excel::import(new ComponentsImport, $file);

        return true;
    }

    public function exportData(): BinaryFileResponse {
        return Excel::download(new ComponentsExport, 'component.xlsx');
    }

    public function getImportDataTemplate(): BinaryFileResponse {
        return (new ComponentsTemplateExport)->download('component_template.xlsx');
    }

    public function getImportDataRawMaterialAndProgressTemplate(Component $component): BinaryFileResponse {
        return (new RawMaterialProgressStepsTemplateExport($component))->download($component->name . '-Raw Material & Progress.xlsx');
    }
}
