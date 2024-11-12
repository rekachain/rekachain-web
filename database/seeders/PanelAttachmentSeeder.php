<?php

namespace Database\Seeders;

use App\Helpers\NumberHelper;
use App\Models\CarriagePanel;
use App\Models\PanelAttachment;
use App\Models\Trainset;
use App\Models\Workstation;
use App\Support\Enums\TrainsetAttachmentStatusEnum;
use App\Support\Enums\TrainsetStatusEnum;
use App\Support\Interfaces\Services\TrainsetServiceInterface;
use Database\Seeders\Helpers\CsvReader;
use Illuminate\Database\Seeder;

class PanelAttachmentSeeder extends Seeder {
    public function __construct(protected TrainsetServiceInterface $trainsetService) {}
    /**
     * Run the database seeds.
     */
    public function run(): void {
        $user = \App\Models\User::role(\App\Support\Enums\RoleEnum::PPC_PENGENDALIAN)->first();
        \Illuminate\Support\Facades\Auth::login($user);
        $trainsets = Trainset::limit(5)->get();
        foreach ($trainsets as $trainset) {
            $checkTrainsetAttachmentProgress = $trainset->trainset_attachments->every(function ($trainsetAttachment) {
                return $trainsetAttachment->status == TrainsetAttachmentStatusEnum::DONE;
            });
            if (!$checkTrainsetAttachmentProgress) {
                continue;
            }
            $data = [
                'assembly_source_workstation_id' => $sourceWorkstationId = Workstation::inRandomOrder()->first()->id,
                'assembly_destination_workstation_id' => Workstation::where('id', '!=', $sourceWorkstationId)->inRandomOrder()->first()->id,
            ];
            $this->trainsetService->generatePanelAttachment($trainset, $data);
        }

        // if ($csvData) {
        //     foreach ($csvData as $data) {
        //         $panelAttachment = PanelAttachment::factory()->create($data);
        //         $panelAttachments = PanelAttachment::whereIn('carriage_panel_id', CarriagePanel::whereCarriageTrainsetId($panelAttachment->carriage_panel->carriage_trainset_id)->pluck('id'))->get();
        //         $i = $panelAttachments->where('id', '<', $panelAttachment->id)->count() + 1;
        //         $panelAttachment->update([
        //             'attachment_number' => $panelAttachment->id . '/PPC/KPM/' . NumberHelper::intToRoman($i) . '/' . date('Y', strtotime($panelAttachment->created_at)),
        //         ]);
        //         $panelAttachment->trainset()->update(['status' => TrainsetStatusEnum::PROGRESS->value]);
        //     }
        // } else {
        //     PanelAttachment::factory(1)->create();
        // }
    }
}
