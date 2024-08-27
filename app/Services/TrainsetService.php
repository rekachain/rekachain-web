<?php

namespace App\Services;

use Adobrovolsky97\LaravelRepositoryServicePattern\Services\BaseCrudService;
use App\Models\Trainset;
use App\Support\Interfaces\Repositories\TrainsetRepositoryInterface;
use App\Support\Interfaces\Services\CarriageServiceInterface;
use App\Support\Interfaces\Services\PresetTrainsetServiceInterface;
use App\Support\Interfaces\Services\TrainsetServiceInterface;
use Illuminate\Support\Facades\DB;

class TrainsetService extends BaseCrudService implements TrainsetServiceInterface {
    public function __construct(protected PresetTrainsetServiceInterface $presetTrainsetService, protected CarriageServiceInterface $carriageService) {
        parent::__construct();
    }

    public function updatePreset(Trainset $trainset, array $data): bool {
        return DB::transaction(function () use ($trainset, $data) {
            $preset_trainset_id = $data['preset_trainset_id'];
            $presetTrainset = $this->presetTrainsetService->findOrFail($preset_trainset_id);

            $trainset->update(['preset_trainset_id' => $preset_trainset_id]);
            // Step 1: Delete nested data related to the carriages
            $trainset->carriage_trainsets->each->delete();
            // Step 1: Detach existing carriages from the trainset
            $trainset->carriages()->detach();
            //            // Step 2: Aggregate quantities for duplicate carriage IDs
            $carriages = [];
            foreach ($presetTrainset->carriage_presets as $carriagePreset) {
                $carriageId = $carriagePreset['carriage_id'];
                $qty = $carriagePreset['qty'];

                if (isset($carriages[$carriageId])) {
                    $carriages[$carriageId]['qty'] += $qty;
                } else {
                    $carriages[$carriageId] = ['qty' => $qty];
                }
            }

            // Step 3: Sync the aggregated carriages with the trainset
            $trainset->carriages()->sync($carriages);

            return true;
        });
    }

    public function savePreset(Trainset $trainset, array $data): bool {
        return DB::transaction(function () use ($trainset, $data) {
            $presetName = $data['preset_name'];
            $projectId = $data['project_id'];

            // Step 1: Retrieve the trainset carriages
            $carriages = $trainset->carriages;

            // Step 2: Create a new preset trainset
            $presetTrainset = $this->presetTrainsetService->create([
                'name' => $presetName,
                'project_id' => $projectId,
            ]);

            // Step 3: Aggregate quantities for duplicate carriage IDs
            $carriagePresets = [];
            foreach ($carriages as $carriage) {
                $carriageId = $carriage['id'];
                $qty = $carriage['pivot']['qty'];

                if (isset($carriagePresets[$carriageId])) {
                    $carriagePresets[$carriageId]['qty'] += $qty;
                } else {
                    $carriagePresets[$carriageId] = ['carriage_id' => $carriageId, 'qty' => $qty];
                }
            }

            // Step 4: Sync the aggregated carriages with the preset trainset
            $presetTrainset->carriage_presets()->createMany(array_values($carriagePresets));

            // Step 5: Update the trainset's preset_trainset_id
            $trainset->update(['preset_trainset_id' => $presetTrainset->id]);

            return true;
        });
    }

    public function deleteCarriageTrainset(Trainset $trainset, $data): bool {
        return DB::transaction(function () use ($trainset, $data) {
            $carriageTrainsetId = $data['carriage_trainset_id'];

            // Step 1: Find the carriage in the pivot table
            $carriage = $trainset->carriages()->wherePivot('id', $carriageTrainsetId)->firstOrFail();

            // Step 2: Detach the carriage from the pivot table
            $trainset->carriages()->detach($carriage);

            // Step 3: Optionally update the trainset's preset_trainset_id to null
            $trainset->update(['preset_trainset_id' => null]);

            return true;
        });
    }

    public function addCarriageTrainset(Trainset $trainset, array $data): bool {
        return DB::transaction(function () use ($trainset, $data) {
            $carriageId = $data['carriage_id'];
            $carriageType = $data['carriage_type'];
            $carriageDescription = $data['carriage_description'];
            $carriageQty = $data['carriage_qty'];

            if ($carriageId) {
                // Step 1: Find the carriage by ID
                $carriage = $this->carriageService->findOrFail($carriageId);
            } else {
                // Step 1: Create a new carriage
                $carriage = $this->carriageService->create([
                    'type' => $carriageType,
                    'description' => $carriageDescription,
                ]);
            }

            // Step 2: Attach or update the carriage with the specified quantity
            $existingCarriage = $trainset->carriages()->where('carriage_id', $carriage->id)->first();
            if ($existingCarriage) {
                $trainset->carriages()->updateExistingPivot($carriage->id, [
                    'qty' => $existingCarriage->pivot->qty + $carriageQty,
                ]);
            } else {
                $trainset->carriages()->attach($carriage, ['qty' => $carriageQty]);
            }

            // Step 3: Optionally update the trainset's preset_trainset_id to null
            $trainset->update(['preset_trainset_id' => null]);

            return true;
        });
    }

    public function updateCarriageTrainset(Trainset $trainset, array $data): bool {
        return DB::transaction(function () use ($trainset, $data) {
            $carriageTrainsetId = $data['carriage_trainset_id'];
            $carriage = $trainset->carriages()->wherePivot('id', $carriageTrainsetId)->firstOrFail();

            $updateData = [];
            if (isset($data['qty'])) {
                $updateData['qty'] = $data['qty'];
            }
            if (isset($data['carriage_id'])) {
                $updateData['carriage_id'] = $data['carriage_id'];
            }

            $trainset->carriages()->updateExistingPivot($carriage->id, $updateData);

            $trainset->update(['preset_trainset_id' => null]);

            return true;
        });
    }

    protected function getRepositoryClass(): string {
        return TrainsetRepositoryInterface::class;
    }
}
