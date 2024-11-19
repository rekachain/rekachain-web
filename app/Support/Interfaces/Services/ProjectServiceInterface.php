<?php

namespace App\Support\Interfaces\Services;

use Adobrovolsky97\LaravelRepositoryServicePattern\Services\Contracts\BaseCrudServiceInterface;
use App\Models\Carriage;
use App\Models\Project;
use App\Models\Trainset;
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

    public function importProjectPanelProgressMaterial(Project $project, UploadedFile $file, array $data): bool;

    public function importProjectComponentProgressMaterial(Project $project, UploadedFile $file, array $data): bool;

    public function importProjectCarriagePanelProgressMaterial(Project $project, Carriage $carriage, UploadedFile $file, array $data): bool;

    public function importProjectCarriageComponentProgressMaterial(Project $project, Carriage $carriage, UploadedFile $file, array $data): bool;

    public function importProjectTrainsetPanelProgressMaterial(Project $project, Trainset $trainset, UploadedFile $file, array $data): bool;
    
    public function importProjectTrainsetComponentProgressMaterial(Project $project, Trainset $trainset, UploadedFile $file, array $data): bool;
}
