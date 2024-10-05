<?php

namespace Database\Seeders;

use App\Models\TrainsetAttachment;
use App\Models\TrainsetAttachmentComponent;
use Illuminate\Database\Seeder;

class TrainsetAttachmentComponentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $trainsetAttachmentTypes = ['mekanik'=>'1', 'elektrik'=>'2'];
        TrainsetAttachment::all()->each(function ($trainsetAttachment) use ($trainsetAttachmentTypes) {
            $trainsetAttachment->trainset->carriage_trainsets->each(function ($carriageTrainset) use ($trainsetAttachment, $trainsetAttachmentTypes) {
                $carriageTrainset->carriage_panels->each(function ($carriagePanel) use ($trainsetAttachment, $carriageTrainset, $trainsetAttachmentTypes) {
                    $carriagePanel->carriage_panel_components->each(function ($carriagePanelComponent) use ($trainsetAttachment, $carriagePanel, $carriageTrainset, $trainsetAttachmentTypes) {
                        if ($carriagePanelComponent->progress->work_aspect->id == $trainsetAttachmentTypes[$trainsetAttachment->type]) {
                            TrainsetAttachmentComponent::updateOrCreate(
                                [
                                    'trainset_attachment_id' => $trainsetAttachment->id,
                                    'carriage_panel_component_id' => $carriagePanelComponent->id,
                                ],
                                [
                                    'total_required' => $carriageTrainset->qty * $carriagePanel->qty * $carriagePanelComponent->qty,
                                ]
                            );
                        }
                    });
                });
            });
        });
    }
}
