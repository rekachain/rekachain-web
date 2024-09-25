<?php

namespace Database\Factories;

use App\Models\ProgressStep;
use App\Models\TrainsetAttachment;
use App\Models\User;
use App\Support\Enums\DetailWorkerTrainsetAcceptanceStatusEnum;
use App\Support\Enums\DetailWorkerTrainsetWorkStatusEnum;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\DetailWorkerTrainset>
 */
class DetailWorkerTrainsetFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'trainset_attachment_id' => TrainsetAttachment::inRandomOrder()->first()->id,
            'worker_id' => User::inRandomOrder()->first()->id,
            'progress_step_id' => ProgressStep::inRandomOrder()->first()->id,
            'estimated_time' => $this->faker->numberBetween(1, 10),
            'work_status' => DetailWorkerTrainsetWorkStatusEnum::IN_PROGRESS->value,
            'acceptance_status' => DetailWorkerTrainsetAcceptanceStatusEnum::ACCEPTED->value
        ];
    }
}
