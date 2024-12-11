<?php

namespace App\Support\Interfaces\Services;

use Adobrovolsky97\LaravelRepositoryServicePattern\Services\Contracts\BaseCrudServiceInterface;
use App\Models\Trainset;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\UploadedFile;
use Symfony\Component\HttpFoundation\BinaryFileResponse;

interface TrainsetServiceInterface extends BaseCrudServiceInterface {
    /*
     * Update trainset preset
     *
     * Required data:
     * $data['preset_trainset_id'] - ID of the preset trainset
     */
    public function updatePreset(Trainset $trainset, array $data): bool;

    /*
     * Save trainset preset
     *
     * Required data:
     * $data['preset_name'] - name of the preset
     * $data['project_id'] - project ID
     */
    public function savePreset(Trainset $trainset, array $data): bool;

    /*
     * Delete carriage trainset pivot
     *
     * Required data:
     * $data['carriage_trainset_id'] - ID of the carriage trainset pivot
     */
    public function deleteCarriageTrainset(Trainset $trainset, array $data): bool;

    /*
     * Add carriage to trainset
     *
     * Required data:
     * $data['carriage_type'] - type of the carriage
     * $data['carriage_description'] - description of the carriage
     * $data['carriage_qty'] - quantity of the carriage
     *
     * Optional data:
     * $data['carriage_id'] - ID of the carriage
     */
    public function addCarriageTrainset(Trainset $trainset, array $data): bool;

    /*
     * Update carriage trainset pivot
     *
     * Required data:
     * $data['carriage_trainset_id'] - ID of the carriage trainset pivot
     * $data['carriage_type'] - type of the carriage
     * $data['carriage_description'] - description of the carriage
     * $data['carriage_qty'] - quantity of the carriage
     */
    public function updateCarriageTrainset(Trainset $trainset, array $data): bool;

    /**
     * Import trainsets from file.
     */
    public function importData(UploadedFile $file): bool;

    /**
     * Export trainsets to file.
     */
    public function exportData(): BinaryFileResponse;

    /*
     * Serve the trainset template.
     */
    public function getImportDataTemplate(): BinaryFileResponse;

    /**
     * generate panel attachment
     *
     * Required data:
     * $data['source_workstation_id'] - source workstation ID
     * $data['destination_workstation_id'] - destination workstation ID
     */
    public function generatePanelAttachment(Trainset $trainset, array $data): bool|array;

    /**
     * generate trainset attachment
     *
     * Required data:
     * $data['source_workstation_id'] - source workstation ID
     * $data['destination_workstation_id'] - destination workstation ID
     */
    public function generateTrainsetAttachment(Trainset $trainset, array $data): bool|array;

    public function generateAttachmentNumber(Model $model);

    /**
     * Export serial numbers
     */
    public function exportSerialNumbers(Trainset $trainset): BinaryFileResponse;

    public function calculateEstimatedTime($trainset_id = null);

    public function getInitialDate(Trainset $trainset);
}
