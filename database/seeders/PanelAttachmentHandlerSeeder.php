<?php

namespace Database\Seeders;

use App\Models\PanelAttachmentHandler;
use Database\Seeders\Helpers\CsvReader;
use Illuminate\Database\Seeder;

class PanelAttachmentHandlerSeeder extends Seeder {
    /**
     * Run the database seeds.
     */
    public function run(): void {
        $csvReader = new CsvReader('panel_attachment_handler');
        $csvData = $csvReader->getCsvData();

        if ($csvData) {
            foreach ($csvData as $data) {
                PanelAttachmentHandler::create($data);
            }
        } else {
            PanelAttachmentHandler::factory(1)->create();
        }
    }
}
