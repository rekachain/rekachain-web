<?php

namespace App\Services;

use App\Exports\RawMaterial\RawMaterialsExport;
use App\Exports\RawMaterial\RawMaterialsTemplateExport;
use App\Imports\RawMaterial\RawMaterialsImport;
use App\Support\Interfaces\Repositories\RawMaterialRepositoryInterface;
use App\Support\Interfaces\Services\RawMaterialServiceInterface;
use Illuminate\Http\UploadedFile;
use Maatwebsite\Excel\Facades\Excel;
use Symfony\Component\HttpFoundation\BinaryFileResponse;

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
