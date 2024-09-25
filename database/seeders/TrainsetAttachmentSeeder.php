<?php

namespace Database\Seeders;

use App\Helpers\NumberHelper;
use App\Models\CarriageTrainset;
use App\Models\TrainsetAttachment;
use Illuminate\Database\Seeder;

class TrainsetAttachmentSeeder extends Seeder {
    /**
     * Run the database seeds.
     */
    public function run(): void {
        $trainsetAttachments = TrainsetAttachment::factory(1)->create();
        $trainsetAttachments->each(function ($trainsetAttachment) {
            $trainsetAttachments = TrainsetAttachment::whereIn('carriage_trainset_id', CarriageTrainset::whereId($trainsetAttachment->carriage_trainset_id)->pluck('id'))->get();
            $i = $trainsetAttachments->where('id', '<', $trainsetAttachment->id)->count() + 1;
            $attachmentNumber = $trainsetAttachment->id . '/PPC/KPM/' . NumberHelper::intToRoman($i) . '/' . date('Y', strtotime($trainsetAttachment->created_at));
            $trainsetAttachment->update([
                'attachment_number' => $attachmentNumber,
                'qr_code' => 'KPM:' . $attachmentNumber . ';P:' . $trainsetAttachment->carriage_trainset->trainset->project->name . ';TS:' . $trainsetAttachment->carriage_trainset->trainset->name . ';;',
            ]);
        });
    }
}
