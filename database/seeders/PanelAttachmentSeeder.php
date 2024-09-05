<?php

namespace Database\Seeders;

use App\Helpers\NumberHelper;
use App\Models\PanelAttachment;
use Database\Seeders\Helpers\CsvReader;
use Illuminate\Database\Seeder;

class PanelAttachmentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $csvReader = new CsvReader('panel_attachment');
        $csvData = $csvReader->getCsvData();

        if ($csvData) {
            foreach ($csvData as $data) {
                $panelAttcahment = PanelAttachment::create($data);
                $panelAttachments = PanelAttachment::whereCarriageTrainsetId($panelAttcahment->carriage_trainset_id)->get();
                $i = $panelAttachments->where('id', '<', $panelAttcahment->id)->count() + 1;
                $panelAttcahment->update([
                    'attachment_number' => $panelAttcahment->id . '/PPC/KPM/' . NumberHelper::intToRoman($i) . '/' . date('Y', strtotime($panelAttcahment->created_at)),
                ]);
                $panelAttcahment->update([
                    'qr_code' => 'KPM:' . $panelAttcahment->attachment_number . ';P:'. $panelAttcahment->carriage_trainset->trainset->project->name . ';TS:' . $panelAttcahment->carriage_trainset->trainset->name . ';;'
                ]);
            }
        } else {
            PanelAttachment::factory(1)->create();
        }
    }
}
