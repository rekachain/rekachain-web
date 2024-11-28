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
        if ($csvData) {
            foreach ($csvData as $row) {
                $trainset = Trainset::whereId($row['trainset_id'])->first();
                if (is_null($trainset)) {
                    continue;
                }
                $data = [
                    'division' => $row['division'],
                    $row['division'] . '_source_workstation_id' => $row['source_workstation_id'],
                    $row['division'] . '_destination_workstation_id' => $row['destination_workstation_id'],
                ];
                $this->trainsetService->generateTrainsetAttachment($trainset, $data);
            }

            return;
        }
        $trainsets = Trainset::limit(10)->get();
        foreach ($trainsets as $key => $trainset) {
            $data = [
                'division' => TrainsetAttachmentTypeEnum::MECHANIC->value,
                'mechanic_source_workstation_id' => $sourceWorkstationId = Workstation::inRandomOrder()->first()->id,
                'mechanic_destination_workstation_id' => Workstation::whereNotIn('name', ['Gudang', 'Ws. Harmonika'])->whereNot('id', $sourceWorkstationId)->inRandomOrder()->value('id'),
            ];
            $this->trainsetService->generateTrainsetAttachment($trainset, $data);
            $data = [
                'division' => TrainsetAttachmentTypeEnum::ELECTRIC->value,
                'electric_source_workstation_id' => $sourceWorkstationId = Workstation::inRandomOrder()->first()->id,
                'electric_destination_workstation_id' => Workstation::whereNotIn('name', ['Gudang', 'Ws. Harmonika'])->whereNot('id', $sourceWorkstationId)->inRandomOrder()->value('id'),
            ];
            $this->trainsetService->generateTrainsetAttachment($trainset, $data);
        }
    }
}
