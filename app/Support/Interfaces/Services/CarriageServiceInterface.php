<?php

namespace App\Support\Interfaces\Services;

use Adobrovolsky97\LaravelRepositoryServicePattern\Services\Contracts\BaseCrudServiceInterface;
use Illuminate\Http\UploadedFile;
use Symfony\Component\HttpFoundation\BinaryFileResponse;

interface CarriageServiceInterface extends BaseCrudServiceInterface {
    /**
     * Import carriages from file.
     */
    public function importData(UploadedFile $file): bool;

    /**
     * Export carriages to file.
     */
    public function exportData(): BinaryFileResponse;

    /*
     * Serve the carriage template.
     */
    public function getImportDataTemplate(): BinaryFileResponse;
    
}