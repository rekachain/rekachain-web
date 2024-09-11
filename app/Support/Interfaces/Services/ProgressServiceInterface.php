<?php

namespace App\Support\Interfaces\Services;

use Symfony\Component\HttpFoundation\File\UploadedFile;
use Symfony\Component\HttpFoundation\BinaryFileResponse;
use Adobrovolsky97\LaravelRepositoryServicePattern\Services\Contracts\BaseCrudServiceInterface;

interface ProgressServiceInterface extends BaseCrudServiceInterface {
    /**
     * Import Progress from file.
     */
    public function importData(UploadedFile $file): bool;

    /**
     * Export Progress to file.
     */
    public function exportData(): BinaryFileResponse;

    /*
     * Serve the Progress template.
     */
    public function getImportDataTemplate(): BinaryFileResponse;
}