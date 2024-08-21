<?php

namespace App\Services;

use Adobrovolsky97\LaravelRepositoryServicePattern\Services\BaseCrudService;
use App\Support\Interfaces\ProjectRepositoryInterface;
use App\Support\Interfaces\ProjectServiceInterface;
use App\Support\Interfaces\TrainsetServiceInterface;
use Illuminate\Database\Eloquent\Model;

class ProjectService extends BaseCrudService implements ProjectServiceInterface {
    public function __construct(protected TrainsetServiceInterface $trainsetService) {
        parent::__construct();
    }

    public function create(array $data): ?Model {
        $prefixTrainsetName = 'TS ';
        $project = parent::create($data);

        $trainsets = [];
        if ($data['trainset_needed'] > 0) {
            $trainsets = collect(range(1, $data['trainset_needed']))
                ->map(fn ($i) => ['project_id' => $project->id, 'name' => $prefixTrainsetName . $i])
                ->toArray();

            $this->trainsetService->createMany($trainsets);
        }

        return $project;
    }

    protected function getRepositoryClass(): string {
        return ProjectRepositoryInterface::class;
    }
}
