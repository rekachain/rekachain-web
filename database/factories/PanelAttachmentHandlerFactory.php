<?php

namespace Database\Factories;

use App\Http\Resources\UserResource;
use App\Models\PanelAttachment;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\PanelAttachmentHandler>
 */
class PanelAttachmentHandlerFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => UserResource::inRandomOrder()->first()->id,
            'panel_attachment_id' => PanelAttachment::inRandomOrder()->first()->id,
            'handles' => $this->faker->unique()->randomElement(['prepare', 'send', 'receive']),
        ];
    }
}
