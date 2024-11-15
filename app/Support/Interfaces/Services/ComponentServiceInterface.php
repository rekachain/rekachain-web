<?php

namespace App\Support\Interfaces\Services;

use Adobrovolsky97\LaravelRepositoryServicePattern\Services\Contracts\BaseCrudServiceInterface;
use App\Models\Component;
use Illuminate\Http\UploadedFile;
use Symfony\Component\HttpFoundation\BinaryFileResponse;

interface ComponentServiceInterface extends BaseCrudServiceInterface {
    /**
     * Import components from file.
     */
    public function importData(UploadedFile $file): bool;

    /**
     * Export components to file.
     */
    public function exportData(): BinaryFileResponse;

    /*
     * Serve the component template.
     */
    public function getImportDataTemplate(): BinaryFileResponse;

    public function getImportDataRawMaterialAndProgressTemplate(Component $component): BinaryFileResponse;
}
