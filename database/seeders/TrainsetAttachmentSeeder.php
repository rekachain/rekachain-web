<?php

namespace Database\Seeders;

use App\Models\Trainset;
use App\Models\Workstation;
use App\Support\Enums\TrainsetAttachmentTypeEnum;
use App\Support\Interfaces\Services\TrainsetServiceInterface;
use Database\Seeders\Helpers\CsvReader;
use Illuminate\Database\Seeder;

class TrainsetAttachmentSeeder extends Seeder {
    public function __construct(protected TrainsetServiceInterface $trainsetService) {}
    /**
     * Run the database seeds.
     */
    public function run(): void {
        $user = \App\Models\User::role(\App\Support\Enums\RoleEnum::PPC_PENGENDALIAN)->first();
        \Illuminate\Support\Facades\Auth::login($user);
        $csvReader = new CsvReader('trainset_attachment');
        $csvData = $csvReader->getCsvData();
        $trainsets = Trainset::limit(10)->get();
        foreach ($trainsets as $key => $trainset) {
            $data = [
                'division' => $csvData[$key*2]['division'] ?? TrainsetAttachmentTypeEnum::MECHANIC->value,
                'mechanic_source_workstation_id' => $csvData[$key*2]['source_workstation_id'] ?? $sourceWorkstationId = Workstation::inRandomOrder()->first()->id,
                'mechanic_destination_workstation_id' => $csvData[$key*2]['destination_workstation_id'] ?? Workstation::whereNotIn('name', ['Gudang','Ws. Harmonika'])->whereNot('id', $sourceWorkstationId)->inRandomOrder()->value('id'),
            ];
            $this->trainsetService->generateTrainsetAttachment($trainset, $data);
            $data = [
                'division' => $csvData[$key*2+1]['division'] ?? TrainsetAttachmentTypeEnum::ELECTRIC->value,
                'electric_source_workstation_id' => $csvData[$key*2+1]['source_workstation_id'] ?? $sourceWorkstationId = Workstation::inRandomOrder()->first()->id,
                'electric_destination_workstation_id' => $csvData[$key*2+1]['destination_workstation_id'] ?? Workstation::whereNotIn('name', ['Gudang','Ws. Harmonika'])->whereNot('id', $sourceWorkstationId)->inRandomOrder()->value('id'),
            ];
            $this->trainsetService->generateTrainsetAttachment($trainset, $data);
        }
    }
}
