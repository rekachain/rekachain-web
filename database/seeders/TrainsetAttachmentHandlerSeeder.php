<?php

namespace Database\Seeders;

use App\Models\TrainsetAttachmentHandler;
use Database\Seeders\Helpers\CsvReader;
use Illuminate\Database\Seeder;

class TrainsetAttachmentHandlerSeeder extends Seeder {
    /**
     * Run the database seeds.
     */
    public function run(): void {
        $csvReader = new CsvReader('trainset_attachment_handler');
        $csvData = $csvReader->getCsvData();

        if ($csvData) {
            foreach ($csvData as $data) {
                TrainsetAttachmentHandler::create($data);
            }
        } else {
            TrainsetAttachmentHandler::factory(1)->create();
        }
    }
}