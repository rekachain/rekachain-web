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
        $roles = [
            RoleEnum::WORKER_MEKANIK->value,
            RoleEnum::WORKER_ELEKTRIK->value,
            RoleEnum::QC_MEKANIK->value,
            RoleEnum::QC_ELEKTRIK->value,
        ];
        $trainsetAttachments = TrainsetAttachment::all();

        foreach ($trainsetAttachments as $trainsetAttachment) {
            $trainsetAttachmentComponents = $trainsetAttachment->trainset_attachment_components()->get();
            if (count($trainsetAttachmentComponents) == 0) {
                continue;
            }
            foreach ($trainsetAttachmentComponents as $trainsetAttachmentComponent) {
                foreach ($roles as $role) {
                    $randomCount = rand(1, 5);
                    $users = User::role($role)->inRandomOrder()->take($randomCount)->get();
                    foreach ($users as $user) {
                        // $progressStep = ProgressStep::whereIn('progress_id', array_unique($progress_ids))
                        //     ->whereStepId($user->step->id)->first();
                        $progressStep = ProgressStep::whereProgressId($trainsetAttachmentComponent->carriage_panel_component->progress_id)
                            ->whereStepId($user->step->id)->first();
                        if (!$progressStep) {
                            continue;
                        }
                        DetailWorkerTrainset::factory()->create([
                            'trainset_attachment_component_id' => $trainsetAttachmentComponent->id,
                            'worker_id' => $user->id,
                            'progress_step_id' => $progressStep->id,
                        ]);
                    }
                }
            }
        }
    }
}
