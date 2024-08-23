<?php

namespace App\Support\Interfaces;

use Adobrovolsky97\LaravelRepositoryServicePattern\Services\Contracts\BaseCrudServiceInterface;
use App\Models\Project;

interface ProjectServiceInterface extends BaseCrudServiceInterface {
    /**
     * add trainsets to project
     *
     * required data:
     * - trainset_needed
     */
    public function addTrainsets(Project $project, array $data): bool;
}
