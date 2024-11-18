<?php

namespace App\Support\Interfaces\Services;

use Adobrovolsky97\LaravelRepositoryServicePattern\Services\Contracts\BaseCrudServiceInterface;
use App\Models\Panel;
use Illuminate\Http\UploadedFile;
use Symfony\Component\HttpFoundation\BinaryFileResponse;

interface PanelServiceInterface extends BaseCrudServiceInterface {
    /**
     * Import panels from file.
     */
    public function importData(UploadedFile $file): bool;

    /**
     * Export panels to file.
     */
    public function exportData(): BinaryFileResponse;

    /*
     * Serve the panel template.
     */
    public function getImportDataTemplate(): BinaryFileResponse;

    public function getImportDataRawMaterialAndProgressTemplate(Panel $panel): BinaryFileResponse;
}
