<?php

namespace Database\Factories;

use App\Models\CarriagePanelComponent;
use App\Models\TrainsetAttachment;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\TrainsetAttachmentComponent>
 */
class TrainsetAttachmentComponentFactory extends Factory
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
            'carriage_panel_component_id' => CarriagePanelComponent::inRandomOrder()->first()->id,
            'total_required' => $this->faker->numberBetween(1, 10),
            'total_fulfilled' => $this->faker->numberBetween(1, 10),
            'total_failed' => $this->faker->numberBetween(1, 10),
        ];
    }
}
