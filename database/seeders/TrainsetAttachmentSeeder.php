<?php

namespace Database\Seeders;

use App\Helpers\NumberHelper;
use App\Models\Trainset;
use App\Models\TrainsetAttachment;
use Illuminate\Database\Seeder;

class TrainsetAttachmentSeeder extends Seeder {
    /**
     * Run the database seeds.
     */
    public function run(): void {
        $trainsetAttachments = TrainsetAttachment::factory(1)->create();
        $trainsetAttachments->each(function ($trainsetAttachment) {
            $trainsetAttachments = TrainsetAttachment::whereIn('trainset_id', Trainset::find($trainsetAttachment->trainset_id)->pluck('id'))->get();
            $i = $trainsetAttachments->where('id', '<', $trainsetAttachment->id)->count() + 1;
            $attachmentNumber = $trainsetAttachment->id . '/PPC/KPM/' . NumberHelper::intToRoman($i) . '/' . date('Y', strtotime($trainsetAttachment->created_at));
            $trainsetAttachment->update([
                'attachment_number' => $attachmentNumber,
                'qr_code' => 'KPM:' . $attachmentNumber . ';P:' . $trainsetAttachment->trainset->project->name . ';TS:' . $trainsetAttachment->trainset->name . ';;',
            ]);
        });
    }
}
