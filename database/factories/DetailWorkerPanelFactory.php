<?php

namespace Database\Factories;

use App\Models\Step;
use App\Models\User;
use App\Models\SerialPanel;
use Illuminate\Database\Eloquent\Factories\Factory;
use App\Support\Enums\DetailWorkerPanelWorkStatusEnum;
use App\Support\Enums\DetailWorkerPanelAcceptanceStatusEnum;

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
            'worker_id' => User::inRandomOrder()->first()->id,
            'progress_step_id' => Step::inRandomOrder()->first()->id,
            'estimated_time' => $this->faker->numberBetween(20, 60),
            'work_status' => DetailWorkerPanelWorkStatusEnum::IN_PROGRESS->value,
            'acceptance_status' => DetailWorkerPanelAcceptanceStatusEnum::ACCEPTED->value,
        ];
    }
}
