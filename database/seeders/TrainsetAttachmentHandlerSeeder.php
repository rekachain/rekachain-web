<?php

namespace Database\Seeders;

use App\Models\User;
use Faker\Factory as Faker;
use App\Support\Enums\RoleEnum;
use Illuminate\Database\Seeder;
use App\Models\TrainsetAttachment;
use Database\Seeders\Helpers\CsvReader;
use App\Models\TrainsetAttachmentHandler;
use App\Support\Enums\TrainsetAttachmentTypeEnum;

class TrainsetAttachmentHandlerSeeder extends Seeder {
    /**
     * Run the database seeds.
     */
    public function run(): void {
        $datas = TrainsetAttachment::all();
        $handles = ['prepare', 'send', 'receive'];
        
        foreach ($datas as $data){
            foreach ($handles as $handle){
                if ($handle == 'receive'){
                    $user = $data->type == TrainsetAttachmentTypeEnum::MECHANIC 
                        ? User::role(RoleEnum::SUPERVISOR_MEKANIK)->inRandomOrder()->first()
                        : User::role(RoleEnum::SUPERVISOR_ELEKTRIK)->inRandomOrder()->first();
                } else {
                    $user = User::role(RoleEnum::PPC_PENGENDALIAN)->inRandomOrder()->first();
                }

                TrainsetAttachmentHandler::create([
                    'user_id' => $user->id,
                    'handler_name' => $user->name,
                    'trainset_attachment_id' => $data->id,
                    'handles' => $handle,
                ]);
            }
        }
    }
}