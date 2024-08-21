<?php

namespace App\Services;

use Adobrovolsky97\LaravelRepositoryServicePattern\Services\BaseCrudService;
use App\Models\Trainset;
use App\Support\Interfaces\TrainsetRepositoryInterface;
use App\Support\Interfaces\TrainsetServiceInterface;

class TrainsetService extends BaseCrudService implements TrainsetServiceInterface {
    public function updatePreset(Trainset $trainset, $preset_trainset_id): bool {
        /*
         * 1. remove all trainset carriages
         * 2. add all carriages from preset_trainset_id
         * 3. update trainset preset_trainset_id
         */
        $trainset->carriages()->delete();
        $presetTrainset = $this->repository->find($preset_trainset_id);
        $trainset->update([
            'preset_trainset_id' => $preset_trainset_id,
        ]);
        $trainset->carriages()->createMany($presetTrainset->carriages->toArray());

        return true;
    }

    protected function getRepositoryClass(): string {
        return TrainsetRepositoryInterface::class;
    }
}
