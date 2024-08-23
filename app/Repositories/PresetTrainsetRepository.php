<?php

namespace App\Repositories;

use Adobrovolsky97\LaravelRepositoryServicePattern\Repositories\BaseRepository;
use App\Models\PresetTrainset;
use App\Support\Interfaces\PresetTrainsetRepositoryInterface;

class PresetTrainsetRepository extends BaseRepository implements PresetTrainsetRepositoryInterface {
    public function delete($keyOrModel): bool {
        // check if preset trainset has any associated trainsets, if so, just return false, otherwise delete the preset trainset and its carriage presets
        $model = $keyOrModel;
        if ($model->trainsets()->exists()) {
            return false;
        }

        $model->carriagePresets()->delete();

        return $model->delete();
    }

    protected function getModelClass(): string {
        return PresetTrainset::class;
    }
}
