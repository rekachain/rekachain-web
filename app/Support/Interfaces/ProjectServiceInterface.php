<?php

namespace App\Support\Interfaces;

use Adobrovolsky97\LaravelRepositoryServicePattern\Services\Contracts\BaseCrudServiceInterface;
use App\Models\Project;

interface ProjectServiceInterface extends BaseCrudServiceInterface {
    public function addTrainsets(Project $project, int $trainsetNeeded): void;
}
