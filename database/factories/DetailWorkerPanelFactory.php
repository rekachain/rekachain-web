<?php

namespace Database\Factories;

use App\Models\ProgressStep;
use App\Models\SerialPanel;
use App\Models\User;
use App\Support\Enums\DetailWorkerPanelAcceptanceStatusEnum;
use App\Support\Enums\DetailWorkerPanelWorkStatusEnum;
use App\Support\Enums\RoleEnum;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\DetailWorkerPanel>
 */
class DetailWorkerPanelFactory extends Factory {
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array {
        return [
            'serial_panel_id' => SerialPanel::inRandomOrder()->first()->id,
            'worker_id' => User::role(RoleEnum::WORKER_ASSEMBLY)->inRandomOrder()->first()->id,
            'progress_step_id' => ProgressStep::inRandomOrder()->first()->id,
            'estimated_time' => $this->faker->numberBetween(20, 60),
            'work_status' => DetailWorkerPanelWorkStatusEnum::IN_PROGRESS->value,
            'acceptance_status' => DetailWorkerPanelAcceptanceStatusEnum::ACCEPTED->value,
        ];
    }
}
