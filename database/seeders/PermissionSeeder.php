<?php

namespace Database\Seeders;

use App\Models\Role;
use App\Support\Enums\PermissionEnum;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;

class PermissionSeeder extends Seeder {
    /**
     * Run the database seeds.
     */
    public function run(): void {
        foreach (PermissionEnum::cases() as $permission) {
            Permission::create(['name' => $permission]);
        }

        Role::findByName('Super Admin')->givePermissionTo([
            PermissionEnum::ROLE_CREATE,
            PermissionEnum::ROLE_READ,
            PermissionEnum::ROLE_UPDATE,
            PermissionEnum::ROLE_DELETE,

            PermissionEnum::USER_CREATE,
            PermissionEnum::USER_READ,
            PermissionEnum::USER_UPDATE,
            PermissionEnum::USER_DELETE,
        ]);
    }
}
