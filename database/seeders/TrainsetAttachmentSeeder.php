<?php

namespace Database\Seeders;

use App\Models\Trainset;
use App\Models\TrainsetAttachment;
use App\Support\Enums\TrainsetAttachmentTypeEnum;
use Illuminate\Database\Seeder;

class TrainsetAttachmentSeeder extends Seeder {
    /**
     * Run the database seeds.
     */
    public function run(): void {
        $trainsets = Trainset::limit(5)->get();
        foreach ($trainsets as $trainset) {
            $attachment = TrainsetAttachment::factory()->create([
                'trainset_id' => $trainset->id,
                'type' => TrainsetAttachmentTypeEnum::MEKANIK->value,
            ]);
            $attachmentNumber = $attachment->id . '/PPC/KPM/I/' . date('Y', strtotime($attachment->created_at));
            $attachment->update([
                'attachment_number' => $attachmentNumber,
                'qr_code' => 'KPM:' . $attachmentNumber . ';P:' . $attachment->trainset->project->name . ';TS:' . $attachment->trainset->name . ';;',
            ]);
            $attachment = TrainsetAttachment::factory()->create([
                'trainset_id' => $trainset->id,
                'type' => TrainsetAttachmentTypeEnum::ELEKTRIK->value,
            ]);
            $attachmentNumber = $attachment->id . '/PPC/KPM/I/' . date('Y', strtotime($attachment->created_at));
            $attachment->update([
                'attachment_number' => $attachmentNumber,
                'qr_code' => 'KPM:' . $attachmentNumber . ';P:' . $attachment->trainset->project->name . ';TS:' . $attachment->trainset->name . ';;',
            ]);
        }
    }
}
