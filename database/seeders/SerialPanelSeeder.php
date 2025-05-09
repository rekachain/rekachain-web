<?php

namespace Database\Seeders;

use App\Models\PanelAttachment;
use App\Models\SerialPanel;
use Illuminate\Database\Seeder;

class SerialPanelSeeder extends Seeder {
    /**
     * Run the database seeds.
     */
    public function run(): void {
        // deprecated has been created on PanelAttachmentSeeder
        // $panelAttachments = PanelAttachment::all();
        // foreach ($panelAttachments as $panelAttachment) {
        //     $qty = $panelAttachment->carriage_panel->carriage_trainset->qty;
        //     $serialForPanel = [];
        //     foreach (range(1, $qty) as $_) {
        //         $serialPanel = SerialPanel::create([
        //             'panel_attachment_id' => $panelAttachment->id,
        //         ]);
        //         $qrcode = 'KPM:' . $panelAttachment->attachment_number . ';SN:' . $serialPanel->id . ';P:' . $panelAttachment->carriage_panel->carriage_trainset->trainset->project->name . ';TS:' . $panelAttachment->carriage_panel->carriage_trainset->trainset->name . ';;';
        //         $serialPanel->update(['qr_code' => $qrcode]);
        //         array_push($serialForPanel, $serialPanel->id);
        //     }
        //     $serialPanels = implode(',', $serialForPanel);
        //     $panelAttachment->update([
        //         'qr_code' => 'KPM:' . $panelAttachment->attachment_number . ';SN:[' . $serialPanels . '];P:' . $panelAttachment->carriage_panel->carriage_trainset->trainset->project->name . ';TS:' . $panelAttachment->carriage_panel->carriage_trainset->trainset->name . ';;',
        //     ]);
        // }
    }
}
