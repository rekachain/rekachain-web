<?php

namespace App\Services;

use Adobrovolsky97\LaravelRepositoryServicePattern\Services\BaseCrudService;
use App\Models\Project;
use App\Support\Interfaces\ProjectRepositoryInterface;
use App\Support\Interfaces\ProjectServiceInterface;
use App\Support\Interfaces\TrainsetServiceInterface;
use Illuminate\Database\Eloquent\Model;

class ProjectService extends BaseCrudService implements ProjectServiceInterface {
    public function __construct(protected TrainsetServiceInterface $trainsetService) {
        parent::__construct();
    }

    private function createTrainsets(Project $project, $trainsetNeeded): void {
        if ($trainsetNeeded <= 0) {
            return;
        }

        $trainsets = collect(range(1, $trainsetNeeded))
            ->map(fn ($i) => ['project_id' => $project->id])
            ->toArray();

        $this->trainsetService->createMany($trainsets);
    }

    public function create(array $data): ?Model {
        $project = parent::create($data);

        $this->createTrainsets($project, $data['trainset_needed']);

        return $project;
    }

    public function addTrainsets(Project $project, $trainsetNeeded): void {
        $this->createTrainsets($project, $trainsetNeeded);
    }

    protected function getRepositoryClass(): string {
        return ProjectRepositoryInterface::class;
    }
}
