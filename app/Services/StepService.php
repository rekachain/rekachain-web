<?php

namespace App\Services;

use Adobrovolsky97\LaravelRepositoryServicePattern\Services\BaseCrudService;
use App\Exports\Step\StepsExport;
use App\Exports\Step\StepsTemplateExport;
use App\Imports\Step\StepsImport;
use App\Support\Interfaces\Repositories\StepRepositoryInterface;
use App\Support\Interfaces\Services\StepServiceInterface;
use Illuminate\Http\UploadedFile;
use Maatwebsite\Excel\Facades\Excel;
use Symfony\Component\HttpFoundation\BinaryFileResponse;

class StepService extends BaseCrudService implements StepServiceInterface {
    public function importData(UploadedFile $file): bool {
        Excel::import(new StepsImport, $file);

        return true;
    }

    public function exportData(): BinaryFileResponse {
        return Excel::download(new StepsExport, 'steps.xlsx');
    }

    public function getImportDataTemplate(): BinaryFileResponse {
        return (new StepsTemplateExport)->download('steps_template.xlsx');
    }

    protected function getRepositoryClass(): string {
        return StepRepositoryInterface::class;
    }
}