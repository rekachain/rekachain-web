<?php

namespace Database\Seeders;

use App\Models\Feedback;
use Illuminate\Database\Seeder;

class FeedbackSeeder extends Seeder {
    /**
     * Run the database seeds.
     */
    public function run(): void {
        $this->createAuthenticatedFeedback();
        $this->createUnauthenticatedFeedback();
    }

    private function createAuthenticatedFeedback(): void {
        Feedback::factory()->count(5)->authenticated()->create();
    }

    private function createUnauthenticatedFeedback(): void {
        Feedback::factory()->count(5)->unauthenticated()->create();
    }
}
