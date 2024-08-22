<?php

namespace App\Services;

use Adobrovolsky97\LaravelRepositoryServicePattern\Services\BaseCrudService;
use App\Models\Trainset;
use App\Support\Interfaces\PresetTrainsetServiceInterface;
use App\Support\Interfaces\TrainsetRepositoryInterface;
use App\Support\Interfaces\TrainsetServiceInterface;

class TrainsetService extends BaseCrudService implements TrainsetServiceInterface {
    public function __construct(protected PresetTrainsetServiceInterface $presetTrainsetService) {
        parent::__construct();
    }

    public function updatePreset(Trainset $trainset, array $data): bool {
        // Step 1: Retrieve the preset trainset ID from the input data
        $preset_trainset_id = $data['preset_trainset_id'];

        // Step 2: Find the preset trainset using the preset trainset service
        $presetTrainset = $this->presetTrainsetService->findOrFail($preset_trainset_id);

        // Step 3: Update the trainset's preset_trainset_id
        $trainset->update(['preset_trainset_id' => $preset_trainset_id]);

        // Step 4: Map the carriages from the preset trainset to include carriage_id and qty
        $carriages = $presetTrainset->carriagePresets->mapWithKeys(function ($carriagePreset) {
            return [
                $carriagePreset['carriage_id'] => ['qty' => $carriagePreset['qty']],
            ];
        })->toArray();

        // Step 5: Sync the carriages with their respective quantities to the trainset
        $trainset->carriageTrainset()->sync($carriages);

        return true;
    }

    public function savePreset(Trainset $trainset, array $data): bool {
        $presetName = $data['preset_name'];
        $projectId = $data['project_id'];

        // Step 1: Retrieve the trainset carriages
        $carriages = $trainset->carriageTrainset;

        // Step 2: Create a new preset trainset
        $presetTrainset = $this->presetTrainsetService->create([
            'name' => $presetName,
            'project_id' => $projectId,
        ]);

        // Step 3: Map the carriages to include carriage_id and qty
        $carriagePresets = $carriages->map(function ($carriage) {
            return [
                'carriage_id' => $carriage['id'],
                'qty' => $carriage['pivot']['qty'],
            ];
        });

        // Step 4: Sync the carriages with their respective quantities to the preset trainset
        $presetTrainset->carriagePresets()->createMany($carriagePresets);

        // Step 5: Update the trainset's preset_trainset_id
        $trainset->update(['preset_trainset_id' => $presetTrainset->id]);

        return true;
    }

    protected function getRepositoryClass(): string {
        return TrainsetRepositoryInterface::class;
    }
}
