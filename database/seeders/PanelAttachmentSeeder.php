<?php

namespace Database\Seeders;

use App\Models\PanelAttachment;
use Database\Seeders\Helpers\CsvReader;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PanelAttachmentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $csvReader = new CsvReader('panel_attachment');
        $csvData = $csvReader->getCsvData();

        if ($csvData) {
            foreach ($csvData as $data) {
                PanelAttachment::create($data);
            }
        } else {
            PanelAttachment::factory(1)->create();
        }
    }
}
