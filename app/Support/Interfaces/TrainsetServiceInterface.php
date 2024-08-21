<?php

namespace App\Support\Interfaces;

use Adobrovolsky97\LaravelRepositoryServicePattern\Services\Contracts\BaseCrudServiceInterface;
use App\Models\Trainset;

interface TrainsetServiceInterface extends BaseCrudServiceInterface {
    /*
     * Update trainset preset
     */
    public function updatePreset(Trainset $trainset, array $data): bool;
}
