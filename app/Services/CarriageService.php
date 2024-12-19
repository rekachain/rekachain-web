<?php

namespace App\Services;

use App\Exports\Carriage\CarriagesExport;
use App\Exports\Carriage\CarriagesTemplateExport;
use App\Imports\Carriage\CarriagesImport;
use App\Support\Interfaces\Repositories\CarriageRepositoryInterface;
use App\Support\Interfaces\Services\CarriageServiceInterface;
use Illuminate\Http\UploadedFile;
use Maatwebsite\Excel\Facades\Excel;
use Symfony\Component\HttpFoundation\BinaryFileResponse;

class CarriageService extends BaseCrudService implements CarriageServiceInterface {
    public function importData(UploadedFile $file): bool {
        Excel::import(new CarriagesImport, $file);

        return true;
    }

    public function exportData(): BinaryFileResponse {
        return Excel::download(new CarriagesExport, 'carriages.xlsx');
    }

    public function getImportDataTemplate(): BinaryFileResponse {
        return (new CarriagesTemplateExport)->download('carriages_template.xlsx');
    }

    protected function getRepositoryClass(): string {
        return CarriageRepositoryInterface::class;
    }
}
