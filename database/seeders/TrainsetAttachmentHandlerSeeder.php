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
        $faker = Faker::create();
        
        $datas = TrainsetAttachment::all();

        $handles = ['prepare', 'send', 'receive'];
        
        foreach ($datas as $data){
            foreach ($handles as $handle){
                if ($handle == 'receive'){
                    if ($data->type == TrainsetAttachmentTypeEnum::MECHANIC){
                        TrainsetAttachmentHandler::create([
                            'user_id' => User::role(RoleEnum::SUPERVISOR_MEKANIK)->inRandomOrder()->first()->id, 
                            'handler_name' => User::role(RoleEnum::SUPERVISOR_MEKANIK)->inRandomOrder()->first()->name,
                            'trainset_attachment_id' => $data->id,
                            'handles' => $handle,
                        ]);
                    }else {
                        TrainsetAttachmentHandler::create([
                            'user_id' => User::role(RoleEnum::SUPERVISOR_ELEKTRIK)->inRandomOrder()->first()->id, 
                            'handler_name' => User::role(RoleEnum::SUPERVISOR_ELEKTRIK)->inRandomOrder()->first()->name,
                            'trainset_attachment_id' => $data->id,
                            'handles' => $handle,
                        ]);    
                    }
                } else {
                    TrainsetAttachmentHandler::create([
                        'user_id' => User::role(RoleEnum::PPC_PENGENDALIAN)->inRandomOrder()->first()->id, 
                        'handler_name' => User::role(RoleEnum::PPC_PENGENDALIAN)->inRandomOrder()->first()->name,
                        'trainset_attachment_id' => $data->id,
                        'handles' => $handle,
                    ]); 
                } 
            }
        }
    } 
}