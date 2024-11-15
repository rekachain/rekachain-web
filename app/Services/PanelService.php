<?php

namespace App\Services;

use Adobrovolsky97\LaravelRepositoryServicePattern\Services\BaseCrudService;
use App\Exports\Panel\PanelsExport;
use App\Exports\Panel\PanelsTemplateExport;
use App\Exports\RawMaterialProgressStep\RawMaterialProgressStepsTemplateExport;
use App\Imports\Panel\PanelsImport;
use App\Models\Panel;
use App\Support\Interfaces\Repositories\PanelRepositoryInterface;
use App\Support\Interfaces\Services\PanelServiceInterface;
use Illuminate\Http\UploadedFile;
use Maatwebsite\Excel\Facades\Excel;
use Symfony\Component\HttpFoundation\BinaryFileResponse;

class PanelService extends BaseCrudService implements PanelServiceInterface {
    public function importData(UploadedFile $file): bool {
        Excel::import(new PanelsImport, $file);

        return true;
    }

    public function exportData(): BinaryFileResponse {
        return Excel::download(new PanelsExport, 'panels.xlsx');
    }

    public function getImportDataTemplate(): BinaryFileResponse {
        return (new PanelsTemplateExport)->download('panels_template.xlsx');
    }

    public function getImportDataRawMaterialAndProgressTemplate(Panel $panel): BinaryFileResponse {
        return (new RawMaterialProgressStepsTemplateExport($panel))->download($panel->name . '-Raw Material & Progress.xlsx');
    }

    protected function getRepositoryClass(): string {
        return PanelRepositoryInterface::class;
    }
}
