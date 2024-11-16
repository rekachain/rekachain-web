<?php

namespace App\Support\Interfaces\Services;

use Adobrovolsky97\LaravelRepositoryServicePattern\Services\Contracts\BaseCrudServiceInterface;
use App\Models\Progress;
use Symfony\Component\HttpFoundation\BinaryFileResponse;
use Symfony\Component\HttpFoundation\File\UploadedFile;

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

    /**
     * Create new step for the Progress.
     *
     * required data:
     * - step_name
     * - step_process
     * - step_estimated_time
     *
     * optional data:
     * - step_id
     */
    public function createStep(Progress $progress, array $data): bool;
}
