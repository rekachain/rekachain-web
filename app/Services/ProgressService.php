<?php

namespace App\Services;

use Maatwebsite\Excel\Facades\Excel;
use App\Exports\Progress\ProgressExport;
use App\Imports\Progress\ProgressImport;
use App\Exports\Progress\ProgressTemplateExport;
use Symfony\Component\HttpFoundation\File\UploadedFile;
use Symfony\Component\HttpFoundation\BinaryFileResponse;
use App\Support\Interfaces\Services\ProgressServiceInterface;
use App\Support\Interfaces\Repositories\ProgressRepositoryInterface;
use Adobrovolsky97\LaravelRepositoryServicePattern\Services\BaseCrudService;

class ProgressService extends BaseCrudService implements ProgressServiceInterface {
    public function importData(UploadedFile $file): bool {
        Excel::import(new ProgressImport, $file);

        return true;
    }

    public function exportData(): BinaryFileResponse {
        return Excel::download(new ProgressExport, 'progress.xlsx');
    }

    public function getImportDataTemplate(): BinaryFileResponse {
        return (new ProgressTemplateExport)->download('progress_template.xlsx');
    }
    
    protected function getRepositoryClass(): string {
        return ProgressRepositoryInterface::class;
    }
}