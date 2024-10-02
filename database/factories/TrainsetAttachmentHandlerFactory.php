<?php

namespace Database\Factories;

use App\Models\User;
use App\Models\TrainsetAttachment;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\TrainsetAttachmentHandler>
 */
class TrainsetAttachmentHandlerFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => User::inRandomOrder()->first()->id,
            'trainset_attachment_id' => TrainsetAttachment::inRandomOrder()->first()->id,
            'handles' => $this->faker->unique()->randomElement(['prepare', 'send', 'receive']),
        ];
    }
}