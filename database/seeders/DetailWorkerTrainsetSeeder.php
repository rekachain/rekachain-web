<?php

namespace Database\Seeders;

use App\Models\DetailWorkerTrainset;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DetailWorkerTrainsetSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DetailWorkerTrainset::factory()->create([
            'trainset_attachment_id' => 1,
            'worker_id' => 7,
            'progress_step_id' => 1,
        ]);
        DetailWorkerTrainset::factory()->create([
            'trainset_attachment_id' => 1,
            'worker_id' => 10,
            'progress_step_id' => 3,
        ]);
        DetailWorkerTrainset::factory()->create([
            'trainset_attachment_id' => 1,
            'worker_id' => 8,
            'progress_step_id' => 4,
        ]);
        DetailWorkerTrainset::factory()->create([
            'trainset_attachment_id' => 1,
            'worker_id' => 11,
            'progress_step_id' => 7,
        ]);
    }
}
