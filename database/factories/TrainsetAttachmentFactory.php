<?php

namespace Database\Factories;

use App\Models\CarriageTrainset;
use App\Models\User;
use App\Models\Workstation;
use App\Support\Enums\RoleEnum;
use App\Support\Enums\TrainsetAttachmentStatusEnum;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\TrainsetAttachment>
 */
class TrainsetAttachmentFactory extends Factory {
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array {
        return [
            'carriage_trainset_id' => CarriageTrainset::inRandomOrder()->first()->id,
            'source_workstation_id' => $sourceWorkstationId = Workstation::inRandomOrder()->first()->id,
            'destination_workstation_id' => Workstation::where('id', '!=', $sourceWorkstationId)->inRandomOrder()->first()->id,
            'status' => TrainsetAttachmentStatusEnum::IN_PROGRESS->value,
            'supervisor_id' => User::role(RoleEnum::SUPERVISOR_MEKANIK)->inRandomOrder()->first()->id,
        ];
    }
}
