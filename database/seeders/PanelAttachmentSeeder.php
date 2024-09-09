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
                $panelAttachment = PanelAttachment::create($data);
                $panelAttachments = PanelAttachment::whereCarriageTrainsetId($panelAttachment->carriage_trainset_id)->get();
                $i = $panelAttachments->where('id', '<', $panelAttachment->id)->count() + 1;
                $panelAttachment->update([
                    'attachment_number' => $panelAttachment->id . '/PPC/KPM/' . NumberHelper::intToRoman($i) . '/' . date('Y', strtotime($panelAttachment->created_at)),
                ]);
            }
        } else {
            PanelAttachment::factory(1)->create();
        }
    }
}
