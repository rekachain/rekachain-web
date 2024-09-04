<?php

namespace App\Services;

use Adobrovolsky97\LaravelRepositoryServicePattern\Services\BaseCrudService;
use App\Support\Interfaces\Repositories\RawMaterialRepositoryInterface;
use App\Support\Interfaces\Services\RawMaterialServiceInterface;
use Symfony\Component\HttpFoundation\BinaryFileResponse;
use App\Exports\RawMaterial\RawMaterialsExport;
use App\Exports\RawMaterial\RawMaterialsTemplateExport;
use App\Imports\RawMaterial\RawMaterialsImport;
use Illuminate\Http\UploadedFile;
use Maatwebsite\Excel\Facades\Excel;

class RawMaterialService extends BaseCrudService implements RawMaterialServiceInterface {
    public function importData(UploadedFile $file): bool {
        Excel::import(new RawMaterialsImport, $file);

        return true;
    }

    public function exportData(): BinaryFileResponse {
        return Excel::download(new RawMaterialsExport, 'rawMaterials.xlsx');
    }

    public function getImportDataTemplate(): BinaryFileResponse {
        return (new RawMaterialsTemplateExport)->download('rawMaterials_template.xlsx');
    }
    
    protected function getRepositoryClass(): string {
        return RawMaterialRepositoryInterface::class;
    }
}