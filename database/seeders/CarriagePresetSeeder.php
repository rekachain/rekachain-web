<?php

namespace Database\Seeders;

use App\Models\Carriage;
use App\Models\CarriagePreset;
use Illuminate\Database\Seeder;

class CarriagePresetSeeder extends Seeder {
    private function createPreset($preset_trainset_id, $arr) {
        foreach ($arr as $data) {
            CarriagePreset::create([
                'preset_trainset_id' => $preset_trainset_id,
                'carriage_id' => $data['carriage_id'],
                'qty' => $data['qty'],
            ]);
        }
    }

    /**
     * Run the database seeds.
     */
    public function run(): void {
        $k1 = Carriage::whereType('K1')->first();
        $k3 = Carriage::whereType('K3')->first();
        $m = Carriage::whereType('M')->first();
        $p = Carriage::whereType('P')->first();

        $tsa = [
            [
                'carriage_id' => $k1->id,
                'qty' => 9,
            ], [
                'carriage_id' => $m->id,
                'qty' => 1,
            ], [
                'carriage_id' => $p->id,
                'qty' => 1,
            ],
        ];

        $this->createPreset(1, $tsa);

        $tsb = [
            [
                'carriage_id' => $k1->id,
                'qty' => 4,
            ],
            [
                'carriage_id' => $k3->id,
                'qty' => 5,
            ],
            [
                'carriage_id' => $m->id,
                'qty' => 1,
            ],
            [
                'carriage_id' => $p->id,
                'qty' => 1,
            ],
        ];

        $this->createPreset(2, $tsb);

        $tsc = [
            [
                'carriage_id' => $k3->id,
                'qty' => 8,
            ],
            [
                'carriage_id' => $m->id,
                'qty' => 1,
            ],
            [
                'carriage_id' => $p->id,
                'qty' => 1,
            ],
        ];

        $this->createPreset(3, $tsc);
    }
}
