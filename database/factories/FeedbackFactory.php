<?php

namespace Database\Factories;

use App\Models\User;
use App\Support\Enums\FeedbackStatusEnum;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Feedback>
 */
class FeedbackFactory extends Factory {
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array {
        return [
            'user_id' => null,
            'name' => $this->faker->name,
            'email' => $this->faker->email,
            'message' => $this->faker->text,
            'rating' => $this->faker->numberBetween(1, 5),
            'status' => $this->faker->randomElement(FeedbackStatusEnum::toArray()),
        ];
    }

    /**
     * Create authenticated feedback.
     */
    public function authenticated(): Factory {
        return $this->state(function (array $attributes) {
            $user = User::inRandomOrder()->first();

            return [
                'user_id' => $user->id,
                'name' => null,
                'email' => null,
            ];
        });
    }

    /**
     * Create unauthenticated feedback.
     */
    public function unauthenticated(): Factory {
        return $this->state(function (array $attributes) {
            return [
                'user_id' => null,
                'name' => $this->faker->name,
                'email' => $this->faker->email,
            ];
        });
    }
}
