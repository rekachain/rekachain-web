<?php

namespace Database\Seeders;

use App\Models\DetailWorkerPanel;
use App\Models\PanelAttachment;
use App\Models\ProgressStep;
use App\Models\User;
use App\Support\Enums\RoleEnum;
use Database\Seeders\Helpers\CsvReader;
use Illuminate\Database\Seeder;

class DetailWorkerPanelSeeder extends Seeder {
    /**
     * Run the database seeds.
     */
    public function run(): void {
        // $csvReader = new CsvReader('detail_worker_panel');
        // $csvData = $csvReader->getCsvData();

        // if ($csvData) {
        //     foreach ($csvData as $data) {
        //         DetailWorkerPanel::factory()->create($data);
        //     }
        //     return;
        // }

        $roles = [
            RoleEnum::WORKER_ASSEMBLY->value,
            RoleEnum::QC_ASSEMBLY->value,
        ];

        PanelAttachment::all()->each(function (PanelAttachment $panelAttachment) use ($roles) {
            $serialPanels = $panelAttachment->serial_panels()->get();
            foreach ($serialPanels as $serialPanel) {
                foreach ($roles as $role) {
                    $randomCount = rand(1, 5);
                    $users = User::role($role)->inRandomOrder()->take($randomCount)->get();
                    foreach ($users as $user) {
                        $progressStep = ProgressStep::whereProgressId($panelAttachment->carriage_panel->progress->id)
                            ->whereStepId($user->step->id)->first();
                        if (!$progressStep) {
                            continue;
                        }
                        
                        DetailWorkerPanel::factory()->create([
                            'serial_panel_id' => $serialPanel->id,
                            'worker_id' => $user->id,
                            'progress_step_id' => $progressStep->id
                        ]);
                    }
                }
            }
        });
    }
}
