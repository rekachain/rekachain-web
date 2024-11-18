<?php

namespace Database\Seeders;

use App\Models\Role;
use App\Support\Enums\PermissionEnum;
use App\Support\Enums\RoleEnum;
use Illuminate\Database\Seeder;

class RoleSeeder extends Seeder {
    /**
     * Run the database seeds.
     */
    public function run(): void {
        $roles = [
            ['name' => RoleEnum::SUPER_ADMIN->value],
            ['name' => RoleEnum::PPC_PERENCANAAN->value, 'level' => 'PPC'],
            ['name' => RoleEnum::PPC_PENGENDALIAN->value, 'level' => 'PPC'],
            ['name' => RoleEnum::SUPERVISOR_MEKANIK->value, 'level' => 'Supervisor', 'division_id' => 1],
            ['name' => RoleEnum::SUPERVISOR_ELEKTRIK->value, 'level' => 'Supervisor', 'division_id' => 2],
            ['name' => RoleEnum::SUPERVISOR_ASSEMBLY->value, 'level' => 'Supervisor', 'division_id' => 3],
            ['name' => RoleEnum::WORKER_MEKANIK->value, 'level' => 'Worker', 'division_id' => 1],
            ['name' => RoleEnum::WORKER_ELEKTRIK->value, 'level' => 'Worker', 'division_id' => 2],
            ['name' => RoleEnum::WORKER_ASSEMBLY->value, 'level' => 'Worker', 'division_id' => 3],
            ['name' => RoleEnum::QC_MEKANIK->value, 'level' => 'QC', 'division_id' => 1],
            ['name' => RoleEnum::QC_ELEKTRIK->value, 'level' => 'QC', 'division_id' => 2],
            ['name' => RoleEnum::QC_ASSEMBLY->value, 'level' => 'QC', 'division_id' => 3],
        ];

        foreach ($roles as $role) {
            Role::create($role);
        }

        Role::findById(2)->givePermissionTo([
            PermissionEnum::USER_CREATE->value,
            PermissionEnum::USER_READ->value,
            PermissionEnum::USER_UPDATE->value,
            PermissionEnum::USER_DELETE->value,
        ]);
    }
}
