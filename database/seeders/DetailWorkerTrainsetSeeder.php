<?php

namespace Database\Seeders;

use App\Models\DetailWorkerTrainset;
use App\Models\ProgressStep;
use App\Models\TrainsetAttachment;
use App\Models\User;
use App\Support\Enums\RoleEnum;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DetailWorkerTrainsetSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $trainsetAttachments = TrainsetAttachment::all();
        foreach ($trainsetAttachments as $trainsetAttachment) {
            $randomCount = rand(1, 5);
            $mekanikUsers = User::role(RoleEnum::WORKER_MEKANIK->value)->inRandomOrder()->take($randomCount)->get();
            foreach ($mekanikUsers as $user) {
                // $progress_ids = [];
                // $trainsets = $trainsetAttachment->trainset->carriage_trainsets()->get();
                // foreach ($trainsets as $trainset) {
                //     $panels = $trainset->carriage_panels()->get();
                //     foreach ($panels as $panel) {
                //         $progress_ids = array_merge($progress_ids, [$panel->progress_id]);
                //     }
                // }
                // $progressSteps = ProgressStep::whereIn('progress_id', array_unique($progress_ids))
                //     ->whereStepId($elektrikUser->step->id)->get();
                DetailWorkerTrainset::factory()->create([
                    'trainset_attachment_id' => $trainsetAttachment->id,
                    'worker_id' => $user->id,
                    'progress_step_id' => ProgressStep::whereStepId($user->step->id)->inRandomOrder()->first()->id,
                ]);
            }
            // DetailWorkerTrainset::factory()->create([
            //     'trainset_attachment_id' => $trainsetAttachment->id,
            //     'worker_id' => 1,
            //     'progress_step_id' => 1,
            // ]);
        }
        $roles = [
            // RoleEnum::WORKER_MEKANIK->value,
            RoleEnum::WORKER_ELEKTRIK->value,
            RoleEnum::QC_MEKANIK->value,
            RoleEnum::QC_ELEKTRIK->value,
        ];

        foreach ($trainsetAttachments as $trainsetAttachment) {
            foreach ($roles as $role) {
                $randomCount = rand(1, 5);
                $users = User::role($role)->inRandomOrder()->take($randomCount)->get();
                foreach ($users as $user) {
                    DetailWorkerTrainset::factory()->create([
                        'trainset_attachment_id' => $trainsetAttachment->id,
                        'worker_id' => $user->id,
                        'progress_step_id' => ProgressStep::whereStepId($user->step->id)->inRandomOrder()->first()->id,
                    ]);
                }
            }
        }
        $query = "select * from detail_worker_trainsets join progress_steps on progress_steps.id = detail_worker_trainsets.progress_step_id join progress on progress.id = progress_steps.progress_id";
        // DetailWorkerTrainset::factory()->create([
        //     'trainset_attachment_id' => 1,
        //     'worker_id' => 7,
        //     'progress_step_id' => 1,
        // ]);
        // DetailWorkerTrainset::factory()->create([
        //     'trainset_attachment_id' => 1,
        //     'worker_id' => 10,
        //     'progress_step_id' => 3,
        // ]);
        // DetailWorkerTrainset::factory()->create([
        //     'trainset_attachment_id' => 1,
        //     'worker_id' => 8,
        //     'progress_step_id' => 4,
        // ]);
        // DetailWorkerTrainset::factory()->create([
        //     'trainset_attachment_id' => 1,
        //     'worker_id' => 11,
        //     'progress_step_id' => 7,
        // ]);
    }
}
