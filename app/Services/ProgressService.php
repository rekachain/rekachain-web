<?php

namespace App\Services;

use Adobrovolsky97\LaravelRepositoryServicePattern\Services\BaseCrudService;
use App\Exports\Progress\ProgressExport;
use App\Exports\Progress\ProgressTemplateExport;
use App\Imports\Progress\ProgressImport;
use App\Support\Interfaces\Repositories\ProgressRepositoryInterface;
use App\Support\Interfaces\Services\ProgressServiceInterface;
use Maatwebsite\Excel\Facades\Excel;
use Symfony\Component\HttpFoundation\BinaryFileResponse;
use Symfony\Component\HttpFoundation\File\UploadedFile;

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
