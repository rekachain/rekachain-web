<?php

namespace Database\Seeders;

use App\Models\Trainset;
use App\Models\Workstation;
use App\Support\Enums\TrainsetAttachmentStatusEnum;
use App\Support\Interfaces\Services\TrainsetServiceInterface;
use Illuminate\Database\Seeder;

class PanelAttachmentSeeder extends Seeder {
    public function __construct(protected TrainsetServiceInterface $trainsetService) {}
    /**
     * Run the database seeds.
     */
    public function run(): void {
        $user = \App\Models\User::role(\App\Support\Enums\RoleEnum::PPC_PENGENDALIAN)->first();
        \Illuminate\Support\Facades\Auth::login($user);
        $trainsets = Trainset::limit(10)->get();
        foreach ($trainsets as $trainset) {
            $checkTrainsetAttachmentProgress = $trainset->trainset_attachments->every(function ($trainsetAttachment) {
                return $trainsetAttachment->status == TrainsetAttachmentStatusEnum::DONE;
            });
            if (!$checkTrainsetAttachmentProgress) {
                continue;
            }
            $data = [
                'assembly_source_workstation_id' => Workstation::whereNotIn('id', [3])->inRandomOrder()->first()->id,
                'assembly_destination_workstation_id' => Workstation::whereId(3)->value('id'),
            ];
            $this->trainsetService->generatePanelAttachment($trainset, $data);
        }
    }
}
