<?php

namespace Database\Seeders;

use App\Models\PanelAttachment;
use App\Models\PanelAttachmentHandler;
use App\Models\User;
use App\Support\Enums\PanelAttachmentStatusEnum;
use App\Support\Enums\RoleEnum;
use Illuminate\Database\Seeder;

class PanelAttachmentHandlerSeeder extends Seeder {
    /**
     * Run the database seeds.
     */
    public function run(): void {
        $datas = PanelAttachment::all();
        $handles = ['send', 'receive'];

        foreach ($datas as $data) {
            foreach ($handles as $handle) {
                if ($handle == 'receive') {
                    $user = User::role(RoleEnum::SUPERVISOR_ASSEMBLY)->inRandomOrder()->first();
                } else {
                    $user = User::role(RoleEnum::PPC_PENGENDALIAN)->inRandomOrder()->first();
                }

                if ($data->status == PanelAttachmentStatusEnum::MATERIAL_IN_TRANSIT && $handle == 'receive') {
                    continue;
                }

                if (is_null($data->status) && $handle == 'send') {
                    continue;
                }

                PanelAttachmentHandler::create([
                    'user_id' => $user->id,
                    'handler_name' => $user->name,
                    'panel_attachment_id' => $data->id,
                    'handles' => $handle,
                ]);
            }
        }
    }
}
