<?php

namespace App\Support\Interfaces;

use Adobrovolsky97\LaravelRepositoryServicePattern\Services\Contracts\BaseCrudServiceInterface;
use App\Models\Trainset;

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
}
