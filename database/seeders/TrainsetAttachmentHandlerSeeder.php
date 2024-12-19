<?php

namespace Database\Seeders;

use App\Models\TrainsetAttachment;
use App\Models\TrainsetAttachmentHandler;
use App\Models\User;
use App\Support\Enums\RoleEnum;
use App\Support\Enums\TrainsetAttachmentStatusEnum;
use App\Support\Enums\TrainsetAttachmentTypeEnum;
use Illuminate\Database\Seeder;

class TrainsetAttachmentHandlerSeeder extends Seeder {
    /**
     * Run the database seeds.
     */
    public function run(): void {
        $datas = TrainsetAttachment::all();
        $handles = ['send', 'receive'];

        foreach ($datas as $data) {
            foreach ($handles as $handle) {
                if ($handle == 'receive') {
                    $user = $data->type == TrainsetAttachmentTypeEnum::MECHANIC
                        ? User::role(RoleEnum::SUPERVISOR_MEKANIK)->inRandomOrder()->first()
                        : User::role(RoleEnum::SUPERVISOR_ELEKTRIK)->inRandomOrder()->first();
                } else {
                    $user = User::role(RoleEnum::PPC_PENGENDALIAN)->inRandomOrder()->first();
                }

                if ($data->status == TrainsetAttachmentStatusEnum::MATERIAL_IN_TRANSIT && $handle == 'receive') {
                    continue;
                }

                if (is_null($data->status) && $handle == 'send') {
                    continue;
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
