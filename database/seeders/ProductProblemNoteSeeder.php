<?php

namespace Database\Seeders;

use App\Models\ProductProblem;
use App\Models\ProductProblemNote;
use Illuminate\Database\Seeder;

class ProductProblemNoteSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        foreach (ProductProblem::all() as $problem) {
            ProductProblemNote::factory()->create([
                'product_problem_id' => $problem->id,
            ]);
        }
    }
}
