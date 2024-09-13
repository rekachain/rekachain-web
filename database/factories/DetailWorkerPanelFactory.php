<?php

namespace Database\Factories;

use App\Models\SerialPanel;
use App\Models\Step;
use App\Support\Enums\DetailWorkerPanelAcceptanceStatusEnum;
use App\Support\Enums\DetailWorkerPanelWorkStatusEnum;
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
            'worker_id' => 9,
            'step_id' => Step::inRandomOrder()->first()->id,
            'estimated_time' => $this->faker->numberBetween(20, 60),
            'work_status' => DetailWorkerPanelWorkStatusEnum::IN_PROGRESS->value,
            'status' => DetailWorkerPanelAcceptanceStatusEnum::ACCEPTED->value,
        ];
    }
}
