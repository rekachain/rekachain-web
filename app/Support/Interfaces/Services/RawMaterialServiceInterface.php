<?php

namespace App\Support\Interfaces\Services;

use Adobrovolsky97\LaravelRepositoryServicePattern\Services\Contracts\BaseCrudServiceInterface;
use Illuminate\Http\UploadedFile;
use Symfony\Component\HttpFoundation\BinaryFileResponse;

interface RawMaterialServiceInterface extends BaseCrudServiceInterface {
    /**
     * Import rawMaterials from file.
     */
    public function importData(UploadedFile $file): bool;

    /**
     * Export rawMaterials to file.
     */
    public function exportData(): BinaryFileResponse;

    /*
     * Serve the rawMaterial template.
     */
    public function getImportDataTemplate(): BinaryFileResponse;
}
