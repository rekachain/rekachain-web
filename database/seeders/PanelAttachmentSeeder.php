<?php

namespace Database\Seeders;

use App\Helpers\NumberHelper;
use App\Models\CarriagePanel;
use App\Models\PanelAttachment;
use App\Models\Trainset;
use App\Support\Enums\TrainsetStatusEnum;
use Database\Seeders\Helpers\CsvReader;
use Illuminate\Database\Seeder;

class PanelAttachmentSeeder extends Seeder {
    /**
     * Run the database seeds.
     */
    public function run(): void {
        // $csvReader = new CsvReader('panel_attachment');
        // $csvData = $csvReader->getCsvData();

        $trainsets = Trainset::limit(5)->get();
        foreach ($trainsets as $trainset) {
            foreach ($trainset->carriage_trainsets as $carriageTrainset) {
                foreach ($carriageTrainset->carriage_panels as $carriagePanel) {
                    $panelAttachment = PanelAttachment::factory()->create([
                        'carriage_panel_id' => $carriagePanel->id,
                    ]);
                    $panelAttachments = PanelAttachment::whereIn('carriage_panel_id', CarriagePanel::whereCarriageTrainsetId($panelAttachment->carriage_panel->carriage_trainset_id)->pluck('id'))->get();
                    $i = $panelAttachments->where('id', '<', $panelAttachment->id)->count() + 1;
                    $panelAttachment->update([
                        'attachment_number' => $panelAttachment->id . '/PPC/KPM/' . NumberHelper::intToRoman($i) . '/' . date('Y', strtotime($panelAttachment->created_at)),
                    ]);
                    $panelAttachment->trainset()->update(['status' => TrainsetStatusEnum::PROGRESS->value]);
                }
            }
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
