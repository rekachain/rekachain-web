<?php

namespace Database\Seeders;

use App\Models\RawMaterial;
use Illuminate\Database\Seeder;

class RawMaterialSeeder extends Seeder {
    /**
     * Run the database seeds.
     */
    public function run(): void {

        $datas = [
            [
                'kode_material' => '22B58H00000XXG01',
                'description' => 'LdK1Lp, LdK2Lp (Power Ready',
                'specs' => 'Indicator Lamp, Green 220VAC',
                'unit' => 18,
            ],
            [
                'kode_material' => '22B58H00000XXW01',
                'description' => 'LdK1Lp, LdK2Lp',
                'specs' => 'Indicator Lamp, White 220VAC',
                'unit' => 18,
            ],
            [
                'kode_material' => '22B58H00000AAR04',
                'description' => 'Operation Lamp for Manual Mode, Power On',
                'specs' => 'Indicator Lamp, ABB CL2-502C24VDC/AC',
                'unit' => 27,
            ],
        ];

        foreach ($datas as $data) {
            RawMaterial::create($data);
        }
    }
}
