<?php

namespace Database\Seeders;

use App\Models\PanelAttachment;
use App\Models\SerialPanel;
use Database\Seeders\Helpers\CsvReader;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SerialPanelSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $panelAttachments = PanelAttachment::all();
        foreach ($panelAttachments as $panelAttachment) {
            $qty = $panelAttachment->carriage_trainset->qty;
            $serialForPanel = [];
            foreach (range(1, $qty) as $_) {
                $serialPanel = SerialPanel::create([
                    'panel_attachment_id' => $panelAttachment->id,
                ]);
                $qrcode = 'KPM:'.$panelAttachment->attachment_number.';S:'. $serialPanel->id .';P:'.$panelAttachment->carriage_trainset->trainset->project->name.';TS:'.$panelAttachment->carriage_trainset->trainset->name.';;';
                $serialPanel->update(['qr_code' => $qrcode]);
                array_push($serialForPanel, $serialPanel->id);
            }
            $serialPanels = implode(',', $serialForPanel);
            $panelAttachment->update([
                'qr_code' => 'KPM:' . $panelAttachment->attachment_number . 'S:[' . $serialPanels . '];P:'. $panelAttachment->carriage_trainset->trainset->project->name . ';TS:' . $panelAttachment->carriage_trainset->trainset->name . ';;'
            ]);
        }
    }
}
