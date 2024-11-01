<?php

namespace App\Support\Interfaces\Services;

use Adobrovolsky97\LaravelRepositoryServicePattern\Services\Contracts\BaseCrudServiceInterface;
use App\Models\Project;
use Illuminate\Http\UploadedFile;

interface ProjectServiceInterface extends BaseCrudServiceInterface {
    /**
     * add trainsets to project
     *
     * required data:
     * - trainset_needed
     */
    public function addTrainsets(Project $project, array $data): bool;

    public function importProject(UploadedFile $file): bool;
}
