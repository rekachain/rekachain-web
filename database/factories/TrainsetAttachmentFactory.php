<?php

namespace Database\Factories;

use App\Models\Trainset;
use App\Models\User;
use App\Models\Workstation;
use App\Support\Enums\RoleEnum;
use App\Support\Enums\TrainsetAttachmentStatusEnum;
use App\Support\Enums\TrainsetAttachmentTypeEnum;
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
        $type = fake()->randomElement(TrainsetAttachmentTypeEnum::toArray());

        return [
            'trainset_id' => Trainset::inRandomOrder()->first()->id,
            'source_workstation_id' => $sourceWorkstationId = Workstation::inRandomOrder()->first()->id,
            'destination_workstation_id' => Workstation::where('id', '!=', $sourceWorkstationId)->inRandomOrder()->first()->id,
            'type' => $type,
            'status' => TrainsetAttachmentStatusEnum::IN_PROGRESS->value,
            'supervisor_id' => User::role($type === TrainsetAttachmentTypeEnum::MECHANIC->value ? RoleEnum::SUPERVISOR_MEKANIK : RoleEnum::SUPERVISOR_ELEKTRIK)->inRandomOrder()->first()->id,
        ];
    }
}
