<?php

namespace Database\Seeders;

use App\Models\ScanFace;
use App\Models\Workshop;
use Illuminate\Database\Seeder;
use Carbon\Carbon;

class ScanFaceSeeder extends Seeder {
    /**
     * Run the database seeds.
     */
    public function run(): void {

        $datas = [
            [
                'user_id' => '7',
                'image_path' => 'well2.png',
                'status' => 'SUKSES',
                'kpm' => 'Jawa Tengah',
                'panel' => 'Jawa Tengah',
                'created_at' => Carbon::createFromFormat('d/m/Y H:i:s', '24/04/2025 10:11:12'),
            ],
            [
                'user_id' => '8',
                'image_path' => 'well1.png',
                'status' => 'Jawa Tengah',
                'kpm' => 'GAGAL',
                'panel' => 'Jawa Tengah',
                'created_at' => Carbon::createFromFormat('d/m/Y H:i:s', '24/04/2025 10:11:12'),
            ],
            [
                'user_id' => '7',
                'image_path' => 'well3.png',
                'status' => 'SUKSES',
                'kpm' => 'Jawa Tengah',
                'panel' => 'Jawa Tengah',
                'created_at' => Carbon::createFromFormat('d/m/Y H:i:s', '21/04/2025 10:11:12'),
            ],
            [
                'user_id' => '8',
                'image_path' => 'well4.png',
                'status' => 'Jawa Tengah',
                'kpm' => 'GAGAL',
                'panel' => 'Jawa Tengah',
                'created_at' => Carbon::createFromFormat('d/m/Y H:i:s', '22/04/2025 10:11:12'),
            ],
            [
                'user_id' => '7',
                'image_path' => 'well5.png',
                'status' => 'SUKSES',
                'kpm' => 'Jawa Tengah',
                'panel' => 'Jawa Tengah',
                'created_at' => Carbon::createFromFormat('d/m/Y H:i:s', '01/04/2025 10:11:12'),
            ],
            [
                'user_id' => '8',
                'image_path' => 'well6.png',
                'status' => 'Jawa Tengah',
                'kpm' => 'GAGAL',
                'panel' => 'Jawa Tengah',
                'created_at' => Carbon::createFromFormat('d/m/Y H:i:s', '01/04/2025 10:11:12'),
            ],
            [
                'user_id' => '7',
                'image_path' => 'well7.png',
                'status' => 'SUKSES',
                'kpm' => 'Jawa Tengah',
                'panel' => 'Jawa Tengah',
                'created_at' => Carbon::createFromFormat('d/m/Y H:i:s', '02/04/2025 10:11:12'),
            ],
            [
                'user_id' => '8',
                'image_path' => 'well8.png',
                'status' => 'Jawa Tengah',
                'kpm' => 'GAGAL',
                'panel' => 'Jawa Tengah',
                'created_at' => Carbon::createFromFormat('d/m/Y H:i:s', '03/04/2025 10:11:12'),
            ],
        ];

        foreach ($datas as $data) {
            ScanFace::create($data);
        }
    }
}