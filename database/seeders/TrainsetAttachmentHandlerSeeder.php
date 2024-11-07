<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\TrainsetAttachment;
use Database\Seeders\Helpers\CsvReader;
use App\Models\TrainsetAttachmentHandler;
use App\Support\Enums\TrainsetAttachmentTypeEnum;
use Faker\Factory as Faker;

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
                            'user_id' => '4',
                            'handler_name' => 'Supervisor Mekanik',
                            'trainset_attachment_id' => $data->id,
                            'handles' => $handle,
                        ]);
                    }else {
                        TrainsetAttachmentHandler::create([
                            'user_id' => '5',
                            'handler_name' => 'Supervisor Elektrik',
                            'trainset_attachment_id' => $data->id,
                            'handles' => $handle,
                        ]);    
                    }
                } else {
                    TrainsetAttachmentHandler::create([
                        'user_id' => '3',
                        'handler_name' => 'PPC_Pengendalian',
                        'trainset_attachment_id' => $data->id,
                        'handles' => $handle,
                    ]); 
                } 
            }
        }
    }
}