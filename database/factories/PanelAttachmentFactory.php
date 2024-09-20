<?php

namespace Database\Factories;

use App\Models\CarriagePanel;
use App\Models\CarriageTrainset;
use App\Models\Workstation;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\PanelAttachment>
 */
class PanelAttachmentFactory extends Factory {
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array {
        return [
            'carriage_panel_id' => CarriagePanel::inRandomOrder()->first()->id,
            'source_workstation_id' => Workstation::inRandomOrder()->first()->id,
            'destination_workstation_id' => Workstation::inRandomOrder()->first()->id,
            'attachment_number' => $this->faker->text(10),
            'qr_code' => $this->faker->text(10),
            'qr_path' => $this->faker->imageUrl(),
            'current_step' => $this->faker->text(10),
            'elapsed_time' => $this->faker->numberBetween(1, 10),
            'status' => $this->faker->randomElement(['active', 'inactive']),
            'panel_attachment_id' => null,
            'supervisor_id' => null,
        ];
    }
}
