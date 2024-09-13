<?php

namespace App\Support\Interfaces\Services;

use Adobrovolsky97\LaravelRepositoryServicePattern\Services\Contracts\BaseCrudServiceInterface;
use Illuminate\Http\UploadedFile;
use Symfony\Component\HttpFoundation\BinaryFileResponse;

interface StepServiceInterface extends BaseCrudServiceInterface {
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
}
